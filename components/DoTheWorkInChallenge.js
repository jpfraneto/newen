import React, { useEffect, useState } from 'react';
import Timer from './Timer';
import Spinner from './Spinner';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
import { GoVerified } from 'react-icons/go';

const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

const DoTheWorkInChallenge = ({
  sadhanaForDisplay,
  completedToday,
  today,
  setCompletedToday,
  session,
  setDisplayDayInfo,
  setSadhanaForDisplay,
  setDayForDisplay,
}) => {
  const [loading, setLoading] = useState(false);
  const [savingSessionLoading, setSavingSessionLoading] = useState(false);

  useEffect(() => {
    try {
      const todayDay = sadhanaForDisplay.sadhanaDays?.filter(
        x => x.dayIndex === today
      );
      const isUserInTodaysSessions =
        todayDay[0].sessions?.filter(x => x.authorId === session.user.id)
          .length > 0;
      setCompletedToday(isUserInTodaysSessions);
    } catch (error) {
      setCompletedToday(false);
    }
  }, []);

  const evaluateSadhanaTime = startingTimestamp => {
    const now = new Date().getTime();
    return new Date(startingTimestamp).getTime() < now;
  };

  const toggleCompletion = async sadhana => {
    setSavingSessionLoading(true);
    const res = await handleSubmitSession(sadhanaForDisplay);
    if (res) {
      setSavingSessionLoading(false);
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
          sadhanaId: sadhanaForDisplay.id,
          completedAt: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setDisplayDayInfo(data.createdSadhanaDay);
      setSadhanaForDisplay(prev => {
        console.log('the prev is: ', prev);
        return {
          ...prev,
          ['sadhanaDays']: [...prev.sadhanaDays, data.createdSadhanaDay],
        };
      });
      setDayForDisplay(data.createdSadhanaDay);
      setCompletedToday(true);
      return true;
    } catch (error) {
      console.error(
        'There was a problem submitting the sadhana session:',
        error
      );
    }
  };
  return (
    <div className=''>
      <h4
        className={`${russo.className} text-2xl md:text-5xl w-full font-bold`}
      >
        It&apos;s time to do todays work!
      </h4>
      <div className='flex flex-row justify-center'>
        {' '}
        <div
          className={`hover:text-black border px-4 py-2 text-center cursor-pointer`}
        >
          {savingSessionLoading ? (
            <span className='flex justify-center w-8 items-center mx-auto'>
              <Spinner />
            </span>
          ) : (
            <>
              {completedToday ? (
                <span className='text-green-700 flex justify-center  items-center mx-auto'>
                  <GoVerified size={100} />
                </span>
              ) : (
                <span
                  onClick={() => toggleCompletion(sadhanaForDisplay)}
                  className='text-red-600 hover:text-red-700 flex justify-center items-center mx-auto'
                >
                  <GoVerified size={100} />
                </span>
              )}
            </>
          )}
        </div>
        <div className='border px-4 py-2 text-black text-center w-48'>
          {completedToday ? (
            <span className='text-green-700 flex justify-center  items-center mx-auto'>
              <GoVerified
                size={100}
                onClick={() => alert('You already did this one today.')}
              />
            </span>
          ) : (
            <>
              <Timer
                timerSize={true}
                sessionTargetDuration={sadhanaForDisplay.targetSessionDuration}
                sadhana={sadhanaForDisplay}
                onCompletion={() => {
                  toggleCompletion(sadhanaForDisplay);
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoTheWorkInChallenge;
