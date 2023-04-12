import React, { useState } from 'react';
import Timer from './Timer';

const dummyData = [
  {
    name: 'Sadhana 1',
    participants: 88,
    history: 100,
    sessionTargetDuration: 20,
    startDate: '2023-03-01T00:00:00',
  },
  {
    name: 'Sadhana 2',
    participants: 75,
    history: 50,
    sessionTargetDuration: 25,
    startDate: '2023-03-07T00:00:00',
  },
  {
    name: 'Sadhana 3',
    participants: 55,
    history: 30,
    sessionTargetDuration: 30,
    startDate: '2023-03-15T00:00:00',
  },
  {
    name: 'Sadhana 4',
    participants: 30,
    history: 20,
    sessionTargetDuration: 35,
    startDate: '2023-03-20T00:00:00',
  },
  {
    name: 'Sadhana 5',
    participants: 20,
    history: 10,
    sessionTargetDuration: 40,
    startDate: '2023-03-25T00:00:00',
  },
  {
    name: 'Sadhana 6',
    participants: 10,
    history: 5,
    sessionTargetDuration: 45,
    startDate: '2023-03-28T00:00:00',
  },
];

const DashboardComponent = () => {
  const [completed, setCompleted] = useState(
    new Array(dummyData.length).fill(false)
  );
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

  const completedCount = completed.filter(item => item).length;

  return (
    <div className='container mx-auto px-4'>
      <table className='table-auto w-full my-8 bg-green-500 shadow-md rounded-md'>
        <thead>
          <tr className='bg-green-700'>
            <th className='px-4 py-2 text-white'>Completed?</th>
            <th className='px-4 py-2 text-white'>Sadhana Name</th>
            <th className='px-4 py-2 text-white'>Participants Ready</th>
            <th className='px-4 py-2 text-white'>Sessions History</th>
            <th className='px-4 py-2 text-white'>Timer</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((sadhana, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-green-400' : 'bg-green-300'}
            >
              <td className='border px-4 py-2'>
                <input
                  type='checkbox'
                  checked={completed[index]}
                  onChange={() => toggleCompletion(index)}
                />
              </td>
              <td className='border px-4 py-2 text-white'>{sadhana.name}</td>
              <td className='border px-4 py-2 text-white'>{`${
                completed[index] ? 1 : 0
              }/${sadhana.participants}`}</td>
              <td className='border px-4 py-2 text-white'>{`${getCurrentDay(
                sadhana.startDate
              )}/${sadhana.history}`}</td>
              <td className='border px-4 py-2'>
                <Timer
                  sessionTargetDuration={sadhana.sessionTargetDuration}
                  onCompletion={() => {
                    if (!completed[index]) toggleCompletion(index);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!submitted ? (
        <div className='flex items-center justify-center'>
          <p className='text-xl mr-4'>{`${completedCount}/${dummyData.length} today`}</p>
          {completedCount === dummyData.length && (
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
          <p className='text-center text-black mt-4'>Successfully submitted!</p>
          <strong>
            Because you submitted the session, now you are able to see the chat
            for today, and participate in the community conversation for each
            one of the challenges that you are part of. If you cant finish one
            days work, maybe you should commit to do less and set better
            boundaries for yourself.
          </strong>
        </>
      )}
    </div>
  );
};

export default DashboardComponent;
