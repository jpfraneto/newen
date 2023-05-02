import React, { useState, useEffect } from 'react';
import NewDashboardTimer from './NewDashboardTimer';
import TimerModal from './TimerModal';
import useSWR from 'swr';
import Link from 'next/link';
import { BsPatchCheck } from 'react-icons/bs';
import { formatDistanceToNow } from 'date-fns';
import { AiOutlinePlus, AiOutlineLoading3Quarters } from 'react-icons/ai';
import PendingSadhanasDisplay from './SadhanasDisplay/PendingSadhanasDisplay';
import ActiveSadhanasDisplay from './SadhanasDisplay/ActiveSadhanasDisplay';
import CompletedSadhanasDisplay from './SadhanasDisplay/CompletedSadhanasDisplay';
import { RiTimerFill } from 'react-icons/ri';
import { GoVerified } from 'react-icons/go';
import {
  didUserCompleteWork,
  calculateDayIndex,
  isValidTimeZone,
} from '@component/lib/functions';
import Spinner from './Spinner';

const fetcher = url => fetch(url).then(res => res.json());

const DashboardComponent = ({ session }) => {
  const [userSadhanas, setUserSadhanas] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [selectedSadhanaIndex, setSelectedSadhanaIndex] = useState(null);
  const [selectedSadhana, setSelectedSadhana] = useState(null);

  const [savingSessionLoading, setSavingSessionLoading] = useState(false);
  const [submittingId, setSubmittingId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loadingSadhanas, setLoadingSadhanas] = useState(true);
  const [timerModalOpen, setTimerModalOpen] = useState(false);
  const [sadhanaFilter, setSadhanaFilter] = useState('active');
  const [filteredSadhanas, setFilteredSadhanas] = useState(null);

  useEffect(() => {
    if (!session) return;
    async function fetchUserSadhanas() {
      try {
        const response = await fetch(`/api/userinfo`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        let timezoneNow = session.user.timeZone;
        if (!isValidTimeZone(session.user.timeZone)) {
          timezoneNow = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
        const responnn = data.sadhanas.map(x => {
          return didUserCompleteWork(
            data.user,
            x.id,
            calculateDayIndex(x.startingTimestamp, session.user.timeZone)
          );
        });
        data.sadhanas = data.sadhanas.map((x, i) => {
          return { ...x, ['didTheWork']: responnn[i] };
        });

        data.sadhanas = sortByStartingTimestampDescending(data.sadhanas);
        setUserSadhanas(data.sadhanas);
        setFilteredSadhanas(data.sadhanas, 'active');
        setLoadingSadhanas(false);
        return;
      } catch (error) {
        console.log('there was an error here:', error);
        setUserSadhanas([]);
        return;
      }
    }
    fetchUserSadhanas();
  }, [session]);

  useEffect(() => {
    if (!userSadhanas) return;
    setFilteredSadhanas(filterSadhanasByStatus(userSadhanas, sadhanaFilter));
  }, [userSadhanas, sadhanaFilter]);

  function filterSadhanasByStatus(sadhanas, status) {
    return sadhanas.filter(sadhana => sadhana.status === status);
  }

  function sortByStartingTimestampDescending(array) {
    return array.sort(
      (a, b) =>
        new Date(a.startingTimestamp).getTime() -
        new Date(b.startingTimestamp).getTime()
    );
  }

  function calculateCompletedSessions(sadhana) {
    // Your logic to calculate the number of completed sessions for the given sadhana
    // This may depend on your data structure and how you are storing session information

    // As an example, assuming sessions are stored as an array of objects inside the sadhana:
    if (!sadhana || !sadhana.sessions) return;
    const completedSessions = sadhana.sessions?.filter(
      session => session.completed
    );
    return completedSessions.length;
  }

  const updateCompletion = (index, completedStatus) => {
    const updatedCompleted = [...completed];
    updatedCompleted[index] = completedStatus;
    setCompleted(updatedCompleted);
  };

  const toggleCompletion = async (index, sadhana) => {
    if (new Date(sadhana.startingTimestamp).getTime() > new Date().getTime())
      return alert(
        `That challenge has not started yet. Please be patient and come back in ${Math.abs(
          calculateDayIndex(sadhana.startingTimestamp, session.user.timeZone)
        )} day(s)`
      );
    setSavingSessionLoading(true);
    setSubmittingId(index);
    const res = await handleSubmitSession(sadhana);
    if (res) {
      setSavingSessionLoading(false);
      setUserSadhanas(prev => {
        return prev.map(currentSadhana => {
          if (currentSadhana.id === sadhana.id) {
            return { ...currentSadhana, didTheWork: true };
          } else {
            return currentSadhana;
          }
        });
      });
      setSelectedSadhana(null);
      setTimerModalOpen(false);
    } else {
      alert(
        'There was a problem submitting your session. I will fix this soon.'
      );
    }
  };

  const handleSubmitSession = async sadhana => {
    try {
      const response = await fetch('/api/sadhanaSessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          sadhanaId: sadhana.id,
          completedAt: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json();
      return true;
    } catch (error) {
      console.error(
        'There was a problem submitting the sadhana session:',
        error
      );
    }
  };

  const filterSadhanas = (sadhanas, filter) => {
    switch (filter) {
      case 'pending':
        return sadhanas.filter(
          sadhana => sadhana.status.toLowerCase() === 'pending'
        );
      case 'active':
        return sadhanas.filter(
          sadhana => sadhana.status.toLowerCase() === 'active'
        );
      case 'completed':
        return sadhanas.filter(
          sadhana => sadhana.status.toLowerCase() === 'completed'
        );
      default:
        return sadhanas;
    }
  };

  const displayedSadhanas = userSadhanas
    ? filterSadhanas(userSadhanas, sadhanaFilter)
    : [];

  const openTimerModal = sadhana => {
    setSelectedSadhana(sadhana);
    setTimerModalOpen(true);
  };

  const closeTimerModal = () => {
    if (confirm('Are you sure that you want to finish the session like this?'))
      setTimerModalOpen(false);
  };

  const getCurrentDay = startDate => {
    const currentDate = new Date();
    const start = new Date(startDate);
    const diff = Math.floor((currentDate - start) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const handleSubmit = () => {
    if (completed.every(item => item)) {
      console.log('here!');
      setSubmitted(true);
    }
  };

  const evaluateSadhanaTime = startingTimestamp => {
    const now = new Date().getTime();
    return new Date(startingTimestamp).getTime() < now;
  };

  const completedCount = completed.filter(item => item).length;

  const handleChooseThisSadhanaTimer = (index, thisSadhanaInFunction) => {
    openTimerModal(thisSadhanaInFunction);
    setSelectedSadhanaIndex(index);
  };

  if (!session) return <p>Unauthorized</p>;

  if (loadingSadhanas) return <p>Loading...</p>;

  return (
    <div className='max-w md:container mx-auto md:px-4'>
      <div className='flex justify-center space-x-1 md:space-x-4 my-4'>
        <button
          className={`bg-black text-white px-4 py-2 rounded-md ${
            sadhanaFilter === 'pending' ? 'opacity-100' : 'opacity-50'
          }`}
          onClick={() => setSadhanaFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`bg-black text-white px-4 py-2 rounded-md ${
            sadhanaFilter === 'active' ? 'opacity-100' : 'opacity-50'
          }`}
          onClick={() => setSadhanaFilter('active')}
        >
          Active
        </button>
        <button
          className={`bg-black text-white px-4 py-2 rounded-md ${
            sadhanaFilter === 'completed' ? 'opacity-100' : 'opacity-50'
          }`}
          onClick={() => setSadhanaFilter('completed')}
        >
          Completed
        </button>
        <Link passHref href='/s/new'>
          <button
            className={`bg-gray-500 border-black border-2 opacity-70 hover:bg-gray-900 text-white px-4 py-2 rounded-md border-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:opacity-70`}
          >
            Add New
          </button>
        </Link>
      </div>

      {userSadhanas?.length > 0 ? (
        <div className=' overflow-x-scroll'>
          {sadhanaFilter === 'pending' && (
            <PendingSadhanasDisplay sadhanas={filteredSadhanas} />
          )}
          {sadhanaFilter === 'active' && (
            <ActiveSadhanasDisplay
              sadhanas={filteredSadhanas}
              savingSessionLoading={savingSessionLoading}
              submittingId={submittingId}
              toggleCompletion={toggleCompletion}
              evaluateSadhanaTime={evaluateSadhanaTime}
              handleChooseThisSadhanaTimer={handleChooseThisSadhanaTimer}
              calculateDayIndex={calculateDayIndex}
              session={session}
            />
          )}
          {sadhanaFilter === 'completed' && (
            <CompletedSadhanasDisplay
              sadhanas={filteredSadhanas}
              calculateCompletedSessions={calculateCompletedSessions}
            />
          )}

          {/* {!submitted ? (
            <div className='flex items-center justify-center'>
              {completedCount === userSadhanas?.length ? (
                <>
                  <p>Congratulations, you finished everything for today.</p>
                </>
              ) : (
                <p className='text-xl mr-4'>{`${completedCount}/${
                  userSadhanas.filter(
                    x => new Date(x.startingTimestamp) < new Date().getTime()
                  ).length
                } today`}</p>
              )}
            </div>
          ) : (
            <>
              <p className='text-center text-black mt-4'>
                Successfully submitted!
              </p>
              <strong>
                Because you submitted the session, now you are able to see the
                chat for today, and participate in the community conversation
                for each one of the challenges that you are part of. If you cant
                finish one days work, maybe you should commit to do less and set
                better boundaries for yourself.
              </strong>
            </>
          )} */}
        </div>
      ) : (
        <>
          <p>You don&apos;t have any challenges associated yet.</p>
          <Link
            href='/s/new'
            className='border-black border-2 inline-block bg-gradient-to-r from-green-500 via-brown-500 to-green-500 text-black font-bold text-2xl px-6 py-3  mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
          >
            Add new challenge
          </Link>
        </>
      )}
      <TimerModal isOpen={timerModalOpen} onClose={closeTimerModal}>
        {timerModalOpen && (
          <NewDashboardTimer
            session={session}
            onCompletion={() => {
              console.log('inside the oncompletion function');
              toggleCompletion(selectedSadhanaIndex, selectedSadhana);
            }}
            sadhana={selectedSadhana}
          />
        )}
      </TimerModal>
      <div className='flex flex-col items-center'>
        <Link
          className='border-black border-2 mx-3 inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-2xl px-6 py-3 mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
          href='/'
        >
          Back to Landing
        </Link>
      </div>
    </div>
  );
};

export default DashboardComponent;

const Check = ({ fillColor }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
    className='r-1cvl2hr r-4qtqp9 r-yyyyoo r-1yjpyg1 r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr'
    data-testid='verificationBadge'
    viewBox='0 0 24 24'
  >
    <path
      d='M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z'
      style={{
        fill: `#${fillColor}`,
        fillOpacity: 1,
      }}
    />
  </svg>
);
