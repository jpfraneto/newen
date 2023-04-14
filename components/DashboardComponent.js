import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import useSWR from 'swr';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

const fetcher = url => fetch(url).then(res => res.json());

const DashboardComponent = ({ session }) => {
  const {
    data: sadhanas,
    error,
    isLoading,
  } = useSWR('/api/userSadhana', fetcher);

  console.log('the sadhanas are: ', sadhanas);

  const [completed, setCompleted] = useState([]);
  useEffect(() => {
    if (sadhanas) {
      setCompleted(new Array(sadhanas.length).fill(false));
    }
  }, [sadhanas]);

  const [submitted, setSubmitted] = useState(false);

  const toggleCompletion = index => {
    const updatedCompleted = [...completed];
    updatedCompleted[index] = !updatedCompleted[index];
    setCompleted(updatedCompleted);
  };

  const getCurrentDay = startDate => {
    const currentDate = new Date();
    const start = new Date(startDate);
    const diff = Math.floor((currentDate - start) / (1000 * 60 * 60 * 24)) + 1;
    return diff;
  };

  const handleSubmit = () => {
    alert('This is the handle submit function!');
    console.log('completed', completed);
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

  if (!session) return <p>Unauthorized</p>;

  if (isLoading) return <p className='text-black'>Loading your dashboard...</p>;

  return (
    <div className='container mx-auto px-4'>
      {sadhanas ? (
        <>
          <table className='table-auto w-full my-2 bg-green-500 shadow-md rounded-md'>
            <thead>
              <tr className='bg-green-700'>
                <th className='px-4 py-2 text-white'>Completed?</th>
                <th className='px-4 py-2 text-white'>Sadhana Name</th>
                <th className='px-4 py-2 text-white'>Participants Ready</th>
                <th className='px-4 py-2 text-white'>Sessions</th>
                <th className='px-4 py-2 text-white w-8'>Timer</th>
              </tr>
            </thead>
            <tbody>
              {sadhanas &&
                sadhanas?.map((sadhana, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-blue-400' : 'bg-blue-300'}
                  >
                    <td className='border px-4 py-2 text-center'>
                      <input
                        type='checkbox'
                        checked={completed[index]}
                        onChange={() => toggleCompletion(index)}
                      />
                    </td>
                    <td className='border px-4 py-2 text-black text-center'>
                      <Link href={`/sadhana/${sadhana.id}`}>
                        {sadhana.title}
                      </Link>
                    </td>
                    <td className='border px-4 py-2 text-black text-center'>{`${
                      completed[index] ? 1 : 0
                    }/${sadhana.participants.length}`}</td>
                    <td className='border px-4 py-2 text-black text-center'>
                      {evaluateSadhanaTime(sadhana.startingTimestamp) ? (
                        `${getCurrentDay(sadhana.startingTimestamp)}/${
                          sadhana.targetSessions
                        }`
                      ) : (
                        <p>{`Starts ${formatDistanceToNow(
                          new Date(sadhana.startingTimestamp).getTime(),
                          {
                            addSuffix: true,
                          }
                        )}`}</p>
                      )}
                    </td>
                    <td className='border px-4 py-2 text-black text-center w-48'>
                      {evaluateSadhanaTime(sadhana.startingTimestamp) ? (
                        <Timer
                          sessionTargetDuration={sadhana.targetSessionDuration}
                          onCompletion={() => {
                            if (!completed[index]) toggleCompletion(index);
                          }}
                        />
                      ) : (
                        <p>Not yet!</p>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {!submitted ? (
            <div className='flex items-center justify-center'>
              <p className='text-xl mr-4'>{`${completedCount}/${sadhanas?.length} today`}</p>
              {completedCount === sadhanas?.length && (
                <button
                  className='bg-green-500 text-white px-6 py-2 rounded'
                  onClick={handleSubmit}
                >
                  Submit a new day of work
                </button>
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
          )}
          <div>
            {' '}
            <Link
              className='inline-block bg-gradient-to-r from-green-500 via-brown-500 to-green-500 text-black font-bold text-2xl px-6 py-3  mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
              href='/sadhana/new'
            >
              Add new sadhana
            </Link>
            <Link
              className='inline-block bg-black text-green-500 font-bold text-2xl px-6 py-3 mx-2 mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
              href='/sadhana'
            >
              Explore Sadhanas
            </Link>
          </div>
        </>
      ) : (
        <>
          <p>You don't have any sadhanas associated yet.</p>
        </>
      )}
    </div>
  );
};

export default DashboardComponent;
