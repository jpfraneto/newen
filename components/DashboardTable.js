import React, { useState, useEffect } from 'react';
import { GoVerified } from 'react-icons/go';
import { RiTimerFill } from 'react-icons/ri';
import Link from 'next/link';
import Spinner from './Spinner';

const DashboardTable = ({
  sadhanas,
  userSessions,
  toggleCompletion,
  setUserSadhanas,
  handleChooseThisSadhanaTimer,
  submittingId,
  savingSessionLoading,
}) => {
  const [dates, setDates] = useState([]);

  // Generate the past 3 dates
  useEffect(() => {
    let tempDates = [];
    for (let i = 8; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      tempDates.push(date.getTime());
    }
    console.log('the tempdates is: ', tempDates);
    setDates(tempDates);
  }, []);
  const formatDate = timestamp => {
    const date = new Date(timestamp);
    return `${date.toLocaleString('default', {
      month: 'short',
    })} ${date.getDate()}`;
  };
  return (
    <table className=''>
      <thead>
        <tr>
          <td>Name</td>
          {dates.map((date, i, arr) => {
            const thisOne = formatDate(date);
            return (
              <td
                key={i}
                className={`text-center px-1 ${
                  i === arr.length - 1 ? 'bg-thelight' : ''
                }`}
              >
                <span>{thisOne}</span>
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

          return (
            <tr key={sadhana.id} className='border-b border-theblack'>
              <td>
                <Link href={`/s/${sadhana.id}`}>{sadhana.title}</Link>
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
                      {session ? (
                        <div>
                          <span className='text-thegreenbtn flex justify-center w-8 items-center my-1 mx-auto'>
                            <GoVerified
                              size={30}
                              onClick={() =>
                                alert('You already did this one today.')
                              }
                            />
                          </span>
                        </div>
                      ) : (
                        <div className='px-2'>
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
                        </div>
                      )}
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
                    {session ? (
                      <div>
                        {' '}
                        <span className='text-thegreenbtn flex justify-center w-8 items-center my-1 mx-auto'>
                          <GoVerified
                            size={30}
                            onClick={() =>
                              alert('You already did this one today.')
                            }
                          />
                        </span>
                      </div>
                    ) : (
                      <div>
                        {' '}
                        <span className='text-theredbtn flex justify-center w-8 items-center my-1 mx-auto'>
                          <GoVerified
                            size={40}
                            onClick={() =>
                              alert('Manage the state of this one!')
                            }
                          />
                        </span>
                      </div>
                    )}
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
              <span
                onClick={() => toggleCompletion(index, sadhana)}
                className='text-theredbtn hover:cursor-pointer hover:opacity-70 flex justify-center w-8 items-center mx-auto'
              >
                <GoVerified size={50} />
              </span>
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
