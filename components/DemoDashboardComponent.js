//DemoDashboardComponent.js

import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { BsPatchCheckFill } from 'react-icons/bs';
import { GrNotes } from 'react-icons/gr';
import { formatTime } from '@component/lib/functions';

const DemoDashboardComponent = ({ session }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSadhanaIndex, setSelectedSadhanaIndex] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [sadhanas, setSadhanas] = useState(session.participatedSadhanas);
  const [showAddSadhanaModal, setShowAddSadhanaModal] = useState(false);
  const [newSadhana, setNewSadhana] = useState({
    title: '',
    userLimit: '',
    startingTimestamp: new Date(),
    targetSessions: '',
    targetSessionDuration: '',
  });

  useEffect(() => {
    if (sadhanas) {
      setCompleted(new Array(sadhanas.length).fill(false));
    }
  }, [sadhanas]);

  const [submitted, setSubmitted] = useState(false);

  const updateCompletion = (index, completedStatus) => {
    const updatedCompleted = [...completed];
    updatedCompleted[index] = completedStatus;
    setCompleted(updatedCompleted);
  };

  const handleAddSadhana = () => {
    setShowAddSadhanaModal(true);
  };

  const handleNewSadhanaChange = event => {
    const { name, value } = event.target;
    setNewSadhana({ ...newSadhana, [name]: value });
  };

  const handleNewSadhanaSubmit = event => {
    event.preventDefault();
    setSadhanas([...sadhanas, newSadhana]);
    setNewSadhana({
      title: '',
      userLimit: '',
      startingTimestamp: '',
      targetSessions: '',
      targetSessionDuration: '',
    });
    setShowAddSadhanaModal(false);
  };

  const closeAddSadhanaModal = () => {
    setShowAddSadhanaModal(false);
  };

  const toggleCompletion = index => {
    if (completed[index]) return;
    if (confirm('Do you really finished this session?')) {
      updateCompletion(index, true);
    }
  };

  const openModal = index => {
    setSelectedSadhanaIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getCurrentDay = startDate => {
    const currentDate = new Date();
    const start = new Date(startDate);
    const diff = Math.floor((currentDate - start) / (1000 * 60 * 60 * 24)) + 1;
    return diff;
  };

  const handleSubmit = () => {
    alert('This is the handle submit function!');
    if (completed.every(item => item)) {
      setSubmitted(true);
    }
  };

  const evaluateSadhanaTime = startingTimestamp => {
    const now = new Date().getTime();
    return new Date(startingTimestamp).getTime() < now;
  };

  const completedCount = completed.filter(item => item).length;

  return (
    <div className='md:container mx-auto  px-4'>
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md'></div>
      )}
      {sadhanas ? (
        <div className='overflow-x-scroll'>
          <table className='table-auto w-full my-2 bg-green-500  shadow-md rounded-md'>
            <thead>
              <tr className='bg-green-700'>
                <th className='px-4 py-2 text-white'>Sadhana Name</th>
                <th className='px-4 py-2 text-white'>
                  Target Session Duration
                </th>
                <th className='px-4 py-2 text-white w-8'>Timer</th>
                <th className='px-4 py-2 text-white'>Participants Ready</th>
                <th className='px-4 py-2 text-white'>Sessions</th>

                <th className='px-4 py-2 text-white'>Completed today?</th>

                {/* <th className='px-4 py-2 text-white w-8'>Other</th> */}
              </tr>
            </thead>
            <tbody>
              {sadhanas &&
                sadhanas?.map((sadhana, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-blue-400' : 'bg-blue-300'}
                  >
                    <td className='border px-4 py-2 text-black text-center'>
                      {sadhana.title}
                    </td>
                    <td className='border px-4 py-2 text-black text-center'>
                      {formatTime(sadhana.targetSessionDuration)}
                    </td>
                    <td className='border px-4 py-2 text-black text-center w-48'>
                      {completed[index] ? (
                        <span className='flex justify-center w-full'>
                          <BsPatchCheckFill size={30} />
                        </span>
                      ) : (
                        <>
                          {evaluateSadhanaTime(sadhana.startingTimestamp) ? (
                            <Timer
                              sessionTargetDuration={
                                sadhana.targetSessionDuration
                              }
                              sadhana={sadhana}
                              onCompletion={() => {
                                if (!completed[index])
                                  updateCompletion(index, true);
                              }}
                            />
                          ) : (
                            <p>Not yet!</p>
                          )}
                        </>
                      )}
                    </td>
                    <td className='border px-4 py-2 text-black text-center'>{`${
                      completed[index] ? 1 : 0
                    }/${sadhana.userLimit}`}</td>
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

                    <td
                      className={`hover:text-black border px-4 py-2 text-center  ${
                        completed[index]
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer'
                      }`}
                      onClick={() => toggleCompletion(index)}
                    >
                      {completed[index] ? 'Yes' : 'No'}
                    </td>
                    {/* <td className='border px-4 py-2 text-black text-center'>
                      {evaluateSadhanaTime(sadhana.startingTimestamp) && (
                        <span
                          onClick={() => openModal(index)}
                          className='flex justify-center w-full cursor-pointer'
                        >
                          <GrNotes size={24} />
                        </span>
                      )}
                    </td> */}
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
        </div>
      ) : (
        <>
          <p>You don&apos;t have any sadhanas associated yet.</p>
        </>
      )}
      {showModal && selectedSadhanaIndex !== null && (
        <div className='fixed inset-0 border flex items-center justify-center z-50'>
          <div className='bg-white w-1/2 h-fit p-4 rounded-lg'>
            <h1 className='text-black text-2xl mb-4'>
              {sadhanas[selectedSadhanaIndex].title} - Session #
              {getCurrentDay(sadhanas[selectedSadhanaIndex].startingTimestamp)}/
              {sadhanas[selectedSadhanaIndex].targetSessions} - Comments
            </h1>
            <form>
              <label htmlFor='comments' className='text-black block mb-2'>
                Comments:
              </label>
              <textarea
                id='comments'
                className='border w-full h-32 p-2 mb-4'
                placeholder="Write your comments about today's session..."
              ></textarea>
              <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded mr-4'
                onClick={() =>
                  alert(
                    'Save this comments on this particular session of the sadhana.'
                  )
                }
              >
                Save
              </button>
              <button
                type='button'
                className='bg-gray-500 text-white px-4 py-2 rounded'
                onClick={closeModal}
              >
                Close Modal
              </button>
            </form>
          </div>
        </div>
      )}

      {showAddSadhanaModal && (
        <div className='px-2 max-w-full fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50'>
          <div className='bg-white text-black md:w-1/2 h-fit p-4 rounded-lg'>
            <h1 className='text-black text-2xl mb-4'>Add New Sadhana</h1>
            <form onSubmit={handleNewSadhanaSubmit}>
              <input
                type='text'
                name='title'
                placeholder='Sadhana Name'
                value={newSadhana.title}
                onChange={handleNewSadhanaChange}
                className='border w-full p-2 mb-4'
              />
              <input
                type='number'
                name='userLimit'
                placeholder='Number of Participants'
                value={newSadhana.userLimit}
                onChange={handleNewSadhanaChange}
                className='border w-full p-2 mb-4'
              />
              <input
                type='datetime-local'
                name='startingTimestamp'
                min={new Date()}
                placeholder='Starting Date and Time'
                value={newSadhana.startingTimestamp}
                onChange={handleNewSadhanaChange}
                className='border w-full p-2 mb-4'
              />
              <input
                type='number'
                name='targetSessions'
                placeholder='Target Sessions'
                value={newSadhana.targetSessions}
                onChange={handleNewSadhanaChange}
                className='border w-full p-2 mb-4'
              />
              <input
                type='number'
                name='targetSessionDuration'
                placeholder='Target Session Duration (in minutes)'
                value={newSadhana.targetSessionDuration}
                onChange={handleNewSadhanaChange}
                className='border w-full p-2 mb-4'
              />
              <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded mr-4'
              >
                Save
              </button>
              <button
                type='button'
                className='bg-gray-500 text-white px-4 py-2 rounded'
                onClick={closeAddSadhanaModal}
              >
                Close Modal
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        className='mx-3 inline-block bg-green-600 text-white font-bold text-2xl px-6 py-3 mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
        onClick={handleAddSadhana}
      >
        Add sadhana
      </button>
      <Link
        className='mx-3 inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-2xl px-6 py-3 mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
        href='/'
      >
        Back to Landing
      </Link>
    </div>
  );
};

export default DemoDashboardComponent;
