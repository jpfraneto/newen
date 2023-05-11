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
import {
  didUserCompleteWork,
  calculateDayIndex,
  isValidTimeZone,
  checkSessionsPercentage,
} from '@component/lib/functions';
import Spinner from './Spinner';
import Button from './Button';
import { useRouter } from 'next/router';

const fetcher = url => fetch(url).then(res => res.json());

const DashboardComponent = ({ session }) => {
  const router = useRouter();
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
  const [userSessions, setUserSessions] = useState(null);
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
        // I'm querying the data for this user inside the sadhana. Wouldnt it be better to get it from inside the user?
        // Why not check inside the sadhana sessions for this user??? instead of mapping through the data.sadhanas
        const aloja = await checkSessionsPercentage(data.sadhanas, data.user);
        setUserSessions(aloja);
        const responnn = data.sadhanas.map(x => {
          return didUserCompleteWork(
            data.user,
            x.id,
            calculateDayIndex(x.startingTimestamp, session.user.timeZone)
          );
        });
        data.sadhanas = data.sadhanas.map((x, i) => {
          return {
            ...x,
            ['didTheWork']: responnn[i],
            ['dayIndexToday']: calculateDayIndex(
              x.startingTimestamp,
              session.user.timeZone
            ),
          };
        });
        data.sadhanas = data.sadhanas.map((x, i) => {
          return {
            ...x,
            ['percentageCompleted']: `${Math.floor(
              (aloja[i].filteredSessionsForThisSadhana.length /
                x.dayIndexToday) *
                100
            )}%`,
          };
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
    return completedSessions?.length;
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
            return {
              ...currentSadhana,
              didTheWork: true,
              percentageCompleted: `${Math.floor(
                (100 *
                  ((+currentSadhana.percentageCompleted.replace('%', '') *
                    currentSadhana.dayIndexToday) /
                    100 +
                    1)) /
                  currentSadhana.dayIndexToday
              )}%`,
            };
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

  const completedCount = completed.filter(item => item)?.length;

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
          className={`${
            sadhanaFilter === 'pending' ? 'opacity-100' : 'opacity-50'
          } font-itim bg-thegreener border border-white text-xl hover:opacity-60 hover:bg-blue-700 text-black py-1 px-2 rounded focus:outline-none focus:shadow-outline`}
          onClick={() => setSadhanaFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`${
            sadhanaFilter === 'active' ? 'opacity-100' : 'opacity-50'
          } font-itim bg-thegreener border border-white hover:opacity-60 text-xl hover:bg-blue-700 text-black py-1 px-2 rounded focus:outline-none focus:shadow-outline`}
          onClick={() => setSadhanaFilter('active')}
        >
          Active
        </button>
        <button
          className={`${
            sadhanaFilter === 'completed' ? 'opacity-100' : 'opacity-50'
          } font-itim bg-thegreener border border-white text-xl hover:opacity-60 text-black py-1 px-2 rounded focus:outline-none focus:shadow-outline`}
          onClick={() => setSadhanaFilter('completed')}
        >
          Completed
        </button>
        <Button
          buttonAction={() => router.push('/s/new')}
          buttonText='Add New'
        />
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
              userSessions={userSessions}
            />
          )}
        </div>
      ) : (
        <>
          <p>You don&apos;t have any challenges associated yet.</p>

          <Button
            buttonAction={() => router.push('/s/new')}
            buttonText='Add new challenge'
          />
        </>
      )}
      <TimerModal isOpen={timerModalOpen} onClose={closeTimerModal}>
        {timerModalOpen && (
          <NewDashboardTimer
            session={session}
            onCompletion={() => {
              toggleCompletion(selectedSadhanaIndex, selectedSadhana);
            }}
            sadhana={selectedSadhana}
          />
        )}
      </TimerModal>
      <div className='flex flex-col mt-10 items-center'>
        <Button
          buttonAction={() => router.push('/')}
          buttonText='Back to landing'
        />
      </div>
    </div>
  );
};

export default DashboardComponent;
