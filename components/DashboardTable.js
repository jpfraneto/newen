import React, { useState, useEffect } from 'react';
import { GoVerified } from 'react-icons/go';
import { RiTimerFill } from 'react-icons/ri';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import { IoIosPeople } from 'react-icons/io';
import { GiStairsGoal } from 'react-icons/gi';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { AiFillClockCircle, AiTwotoneDelete } from 'react-icons/ai';
import { calculateDayIndex } from '@component/lib/functions';

const DashboardTable = ({
  sadhanas,
  userSessions,
  toggleCompletion,
  setUserSadhanas,
  handleChooseThisSadhanaTimer,
  submittingId,
  savingSessionLoading,
  daysDisplayed,
}) => {
  const [dates, setDates] = useState([]);
  const [loadingDeletion, setLoadingDeletion] = useState(false);

  useEffect(() => {
    let tempDates = [];
    for (let i = daysDisplayed; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      tempDates.push(date.getTime());
    }
    setDates(tempDates);
  }, [daysDisplayed]);
  const formatDate = timestamp => {
    const date = new Date(timestamp);
    return `${date.toLocaleString('default', {
      month: 'short',
    })} ${date.getDate()}`;
  };

  const deleteThisSadhanaFroUser = async sadhanaId => {
    try {
      setLoadingDeletion(true);
      toast.warning('The sadhana is going to be deleted');
      const response = await fetch(`/api/sadhana/${sadhanaId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('The sadhana was deleted!');
        setUserSadhanas(prev => {
          const newUserSadhanas = prev.filter(
            sadhana => sadhana.id !== sadhanaId
          );
          return newUserSadhanas;
        });
        setLoadingDeletion(false);
      } else {
        const data = await response.json();
        console.log('the response was: ', data);
        toast.error('The response is not ok.');
      }
    } catch (error) {
      console.log('the error is: ', error);
      toast.error('There was an error');
    }
  };

  if (!sadhanas) return;

  return (
    <table className='px-1 md:w-fit w-screen overflow-x-scroll'>
      <thead>
        <tr>
          <td className='hidden md:block'></td>
          <td></td>
          {dates.map((date, i, arr) => {
            const thisOne = formatDate(date);
            return (
              <td
                key={i}
                className={`text-center px-1 ${
                  i === arr.length - 1 ? 'bg-thelight' : ''
                }`}
              >
                <div className='flex flex-col items-center text-bold'>
                  {thisOne.split(' ').map((x, i) => {
                    return <span key={i}>{x}</span>;
                  })}
                </div>
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sadhanas.map(sadhana => {
          // Find the corresponding user session
          const userFilteredSessions = userSessions.filter(
            session => session.sadhanaId === sadhana.id
          );
          const date = new Date(sadhana.startingTimestamp);
          const timeZoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
          const localDate = new Date(date.getTime() + timeZoneOffset);

          return (
            <tr
              key={sadhana.id}
              className='border-b hover:bg-thelight border-theblack'
            >
              <td className='text-theredbtn hidden md:block mt-auto hover:text-thered items-center justify-center px-3 '>
                <span className=' flex justify-center  items-center hover:cursor-pointer '>
                  {loadingDeletion ? (
                    <Spinner />
                  ) : (
                    <AiTwotoneDelete
                      size={30}
                      onClick={() => deleteThisSadhanaFroUser(sadhana.id)}
                    />
                  )}
                </span>
              </td>
              <td className=''>
                <Link
                  className='text-bold hover:text-orange'
                  href={`/s/${sadhana.id}`}
                  passHref
                >
                  <div className='relative flex flex-col md:justify-between w-full'>
                    <div className='mb-8 text-thegreenbtn text-left overflow-x-'>
                      <p
                        href={`/s/${sadhana.id}`}
                        className='absolute whitespace-nowrap overflow-visible z-2 font-bold text-xl text-black mb-0'
                      >
                        {sadhana.title}
                      </p>
                    </div>
                    <div className='flex mt-1 justify-start items-center md:pr-2'>
                      <div className='flex flex-col items-center'>
                        <AiFillClockCircle size={30} />
                        {sadhana.targetSessionDuration}
                      </div>
                      <div className='flex ml-2 flex-col items-center'>
                        <GiStairsGoal size={30} />
                        {calculateDayIndex(sadhana.startingTimestamp)}/
                        {sadhana.targetSessions}
                      </div>
                      <div className='flex ml-2 flex-col items-center'>
                        <IoIosPeople size={30} />
                        {sadhana.participants.length}
                      </div>

                      {/* <div className='flex ml-4 flex-col items-center text-center'>
                        <span className='px-4 py-2 w-24 border-theblack border rounded-xl'>
                          {calculateDayIndex(sadhana.startingTimestamp)}/
                          {sadhana.targetSessions}
                        </span>
                      </div> */}
                    </div>
                  </div>
                </Link>
              </td>
              {dates.map((date, index, arr) => {
                // Check if there's a session for this date
                const session = userFilteredSessions.find(
                  session =>
                    formatDate(new Date(session.completedAt)) ===
                    formatDate(new Date(date))
                );

                if (index === arr.length - 1) {
                  return (
                    <td
                      className={`text-center px-1 ${
                        index === arr.length - 1 ? 'bg-thelight' : ''
                      }`}
                      key={index}
                    >
                      {' '}
                      <div className='px-2 pt-4'>
                        {session ? (
                          <span className='text-thegreenbtn flex justify-center w-8 items-center my-1 mx-auto'>
                            <GoVerified
                              size={30}
                              onClick={() =>
                                alert('You already did this one today.')
                              }
                            />
                          </span>
                        ) : (
                          <span className='text-theredbtn flex justify-center items-center my-1 mx-auto'>
                            <NewSessionButtons
                              toggleCompletion={toggleCompletion}
                              index={index}
                              sadhana={sadhana}
                              handleChooseThisSadhanaTimer={
                                handleChooseThisSadhanaTimer
                              }
                              submittingId={submittingId}
                              savingSessionLoading={savingSessionLoading}
                            />
                          </span>
                        )}{' '}
                      </div>
                    </td>
                  );
                }
                return (
                  <td
                    className={`text-center px-1 ${
                      index === arr.length - 1 ? 'bg-thelight' : ''
                    }`}
                    key={index}
                  >
                    {
                      <div className='pt-4'>
                        {session ? (
                          <span className='text-thegreenbtn flex justify-center w-8 items-center my-1 mx-auto'>
                            <GoVerified size={30} />
                          </span>
                        ) : (
                          <span className='text-theredbtn flex justify-center w-8 items-center my-1 mx-auto'>
                            <GoVerified size={40} />
                          </span>
                        )}
                      </div>
                    }
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DashboardTable;

const NewSessionButtons = ({
  toggleCompletion,
  index,
  sadhana,
  handleChooseThisSadhanaTimer,
  submittingId,
  savingSessionLoading,
}) => {
  return (
    <div className='flex space-x-1'>
      {savingSessionLoading && submittingId === index ? (
        <span className='flex justify-center w-8 items-center mx-auto'>
          <Spinner />
        </span>
      ) : (
        <>
          {sadhana.didTheWork ? (
            <span className='text-thegreenbtn flex justify-center w-8 items-center mx-auto'>
              <GoVerified
                size={50}
                onClick={() => alert('You already did this one today.')}
              />
            </span>
          ) : (
            <div className='flex flex-row space-x-1'>
              {' '}
              {/* <span
                onClick={() => toggleCompletion(index, sadhana)}
                className='text-theredbtn hover:cursor-pointer hover:opacity-70 flex justify-center w-8 items-center mx-auto'
              >
                <GoVerified size={50} />
              </span> */}
              <span
                onClick={() => handleChooseThisSadhanaTimer(index, sadhana)}
                className='text-theredbtn hover:opacity-70 flex justify-center w-8 items-center mx-auto hover:cursor-pointer'
              >
                <RiTimerFill size={50} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
