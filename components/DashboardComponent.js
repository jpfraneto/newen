import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import useSWR from 'swr';
import Link from 'next/link';
import { BsPatchCheck } from 'react-icons/bs';
import { formatDistanceToNow } from 'date-fns';
import { AiOutlinePlus, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { formatTime } from '@component/lib/functions';
import Spinner from './Spinner';

const fetcher = url => fetch(url).then(res => res.json());

const DashboardComponent = ({ session }) => {
  const {
    data: sadhanas,
    error,
    isLoading,
  } = useSWR('/api/userSadhana', fetcher);

  const [completed, setCompleted] = useState([]);
  const [selectedSadhanaIndex, setSelectedSadhanaIndex] = useState(null);
  const [savingSessionLoading, setSavingSessionLoading] = useState(false);
  const [submittingId, setSubmittingId] = useState(null);

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

  const toggleCompletion = async (index, sadhana) => {
    console.log('in here, ', index);
    setSavingSessionLoading(true);
    setSubmittingId(index);
    const res = await handleSubmitSession(sadhana);
    if (res) {
      setSavingSessionLoading(false);
      const updatedCompleted = [...completed];
      updatedCompleted[index] = !updatedCompleted[index];
      setCompleted(updatedCompleted);
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
    <div className='max-w- md:container mx-auto px-4'>
      {sadhanas?.length > 0 ? (
        <div className=' overflow-x-scroll'>
          <table className='table-auto w-full my-2 bg-black text-white  shadow-md rounded-md'>
            <thead>
              <tr className='bg-black text-white'>
                <th className='px-4 py-2 text-white'>Completed?</th>

                <th className='px-4 py-2 text-white'>Sadhana Name</th>

                <th className='px-4 py-2 text-white'>Ready Today</th>
                <th className='px-4 py-2 text-white'>Sessions</th>
                <th className='px-4 py-2 text-white w-8'>Timer</th>

                {/* <th className='px-4 py-2 text-white w-8'>Other</th> */}
              </tr>
            </thead>
            <tbody>
              {sadhanas &&
                sadhanas?.map((sadhana, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? 'bg-neutral-400' : 'bg-neutral-300'
                    }
                  >
                    <td
                      className={`hover:text-black border px-4 py-2 text-center  cursor-pointer`}
                    >
                      {savingSessionLoading && submittingId === index ? (
                        <span className='flex justify-center w-8 items-center mx-auto'>
                          <Spinner />
                        </span>
                      ) : (
                        <>
                          {completed[index] ? (
                            <span className='flex justify-center w-8 items-center mx-auto'>
                              <Check fillColor='238739' />
                            </span>
                          ) : (
                            <span
                              onClick={() => toggleCompletion(index, sadhana)}
                              className='flex justify-center w-8 items-center mx-auto'
                            >
                              <Check fillColor='bf1736' />
                            </span>
                          )}
                        </>
                      )}
                    </td>
                    <td className='border px-4 py-2 text-black text-center'>
                      <Link href={`/sadhana/${sadhana.id}`}>
                        {sadhana.title}{' '}
                      </Link>
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
                    <td className='border px-4 py-2 text-black text-center w-48'>
                      {completed[index] ? (
                        <span className='flex justify-center w-8 items-center mx-auto'>
                          <Check fillColor='238739' />
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
                            <p>Not yet.</p>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
            <tr>
              <td className='p-2 hover:text-yellow-300 '>
                <Link
                  href='/sadhana/new'
                  className='flex items-center space-x-2'
                  passHref
                >
                  <AiOutlinePlus /> <span className=''>Create new sadhana</span>
                </Link>
              </td>
            </tr>
          </table>

          {!submitted ? (
            <div className='flex items-center justify-center'>
              {completedCount === sadhanas?.length ? (
                <>
                  {' '}
                  {/* <button
                  className='bg-green-500 text-white px-6 py-2 rounded'
                  onClick={handleSubmit}
                >
                  Submit a new day of work
                </button> */}
                  <p>Congratulations, you finished everything for today.</p>
                </>
              ) : (
                <p className='text-xl mr-4'>{`${completedCount}/${sadhanas?.length} today`}</p>
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
      <div className='flex flex-col items-center'>
        {' '}
        {/* <Link className='border-black border-2 inline-block bg-gradient-to-r from-green-500 via-brown-500 to-green-500 text-black font-bold text-2xl px-6 py-3  mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'>
          Add new sadhana
        </Link> */}
        <Link
          className='border-black border-2 mx-3 inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-2xl px-6 py-3 mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
          href='/'
        >
          Back to Landing
        </Link>
      </div>
    </div>
  );

  // return (
  //   <div className='container mx-auto px-4'>
  //     {sadhanas ? (
  //       <>
  //         <table className='table-auto w-full my-2 bg-green-500 shadow-md rounded-md'>
  //           <thead>
  //             <tr className='bg-green-700'>
  //               <th className='px-4 py-2 text-white'>Completed?</th>
  //               <th className='px-4 py-2 text-white'>Sadhana Name</th>
  //               <th className='px-4 py-2 text-white'>Participants Ready</th>
  //               <th className='px-4 py-2 text-white'>Sessions</th>
  //               <th className='px-4 py-2 text-white w-8'>Timer</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {sadhanas &&
  //               sadhanas?.map((sadhana, index) => (
  //                 <tr
  //                   key={index}
  //                   className={index % 2 === 0 ? 'bg-blue-400' : 'bg-blue-300'}
  //                 >
  //                   <td className='border px-4 py-2 text-center'>
  //                     <input
  //                       type='checkbox'
  //                       checked={completed[index]}
  //                       onChange={() => toggleCompletion(index)}
  //                     />
  //                   </td>
  //                   <td className='border px-4 py-2 text-black text-center'>
  //                     <Link href={`/sadhana/${sadhana.id}`}>
  //                       {sadhana.title}
  //                     </Link>
  //                   </td>
  //                   <td className='border px-4 py-2 text-black text-center'>{`${
  //                     completed[index] ? 1 : 0
  //                   }/${sadhana.participants.length}`}</td>
  //                   <td className='border px-4 py-2 text-black text-center'>
  //                     {evaluateSadhanaTime(sadhana.startingTimestamp) ? (
  //                       `${getCurrentDay(sadhana.startingTimestamp)}/${
  //                         sadhana.targetSessions
  //                       }`
  //                     ) : (
  //                       <p>{`Starts ${formatDistanceToNow(
  //                         new Date(sadhana.startingTimestamp).getTime(),
  //                         {
  //                           addSuffix: true,
  //                         }
  //                       )}`}</p>
  //                     )}
  //                   </td>
  //                   <td className='border px-4 py-2 text-black text-center w-48'>
  //                     {evaluateSadhanaTime(sadhana.startingTimestamp) ? (
  //                       <Timer
  //                         sessionTargetDuration={sadhana.targetSessionDuration}
  //                         onCompletion={() => {
  //                           if (!completed[index]) toggleCompletion(index);
  //                         }}
  //                       />
  //                     ) : (
  //                       <p>Not yet!</p>
  //                     )}
  //                   </td>
  //                 </tr>
  //               ))}
  //           </tbody>
  //         </table>

  //         {!submitted ? (
  //           <div className='flex items-center justify-center'>
  //             <p className='text-xl mr-4'>{`${completedCount}/${sadhanas?.length} today`}</p>
  //             {completedCount === sadhanas?.length && (
  //               <button
  //                 className='bg-green-500 text-white px-6 py-2 rounded'
  //                 onClick={handleSubmit}
  //               >
  //                 Submit a new day of work
  //               </button>
  //             )}
  //           </div>
  //         ) : (
  //           <>
  //             <p className='text-center text-black mt-4'>
  //               Successfully submitted!
  //             </p>
  //             <strong>
  //               Because you submitted the session, now you are able to see the
  //               chat for today, and participate in the community conversation
  //               for each one of the challenges that you are part of. If you cant
  //               finish one days work, maybe you should commit to do less and set
  //               better boundaries for yourself.
  //             </strong>
  //           </>
  //         )}
  //         <div>
  //           {' '}
  //           <Link
  //             className='inline-block bg-gradient-to-r from-green-500 via-brown-500 to-green-500 text-black font-bold text-2xl px-6 py-3  mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
  //             href='/sadhana/new'
  //           >
  //             Add new sadhana
  //           </Link>
  //           <Link
  //             className='inline-block bg-black text-green-500 font-bold text-2xl px-6 py-3 mx-2 mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
  //             href='/sadhana'
  //           >
  //             Explore Sadhanas
  //           </Link>
  //         </div>
  //       </>
  //     ) : (
  //       <>
  //         <p>You don&apos;t have any sadhanas associated yet.</p>
  //       </>
  //     )}
  //   </div>
  // );
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
