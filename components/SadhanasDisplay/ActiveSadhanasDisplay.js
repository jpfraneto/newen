import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import SadhanaTableDisplay from './SadhanaTableDisplay';
import Spinner from '../Spinner';
import Link from 'next/link';
import { RiTimerFill } from 'react-icons/ri';
import { GoVerified } from 'react-icons/go';

const ActiveSadhanasDisplay = ({
  sadhanas,
  savingSessionLoading,
  submittingId,
  toggleCompletion,
  evaluateSadhanaTime,
  handleChooseThisSadhanaTimer,
  calculateDayIndex,
  session,
}) => {
  const columns = [
    'Challenge',
    'Completed?',
    'Timer',
    'Sessions',
    '% Completed',
  ];

  const rows = sadhanas.map((sadhana, index) => (
    <tr
      key={index}
      className={`bg-thegreener ${
        index % 2 === 0 ? ' bg-opacity-30	' : 'bg-opacity-60'
      }`}
    >
      <td className=' px-4 py-2 text-blue-400 text-center'>
        <Link href={`/s/${sadhana.id}`}>{sadhana.title} </Link>
      </td>
      <td className={`hover:text-black  px-4 py-2 text-center cursor-pointer`}>
        {savingSessionLoading && submittingId === index ? (
          <span className='flex justify-center w-8  items-center mx-auto'>
            <Spinner />
          </span>
        ) : (
          <>
            {sadhana.didTheWork ? (
              <span className='text-green-700 flex justify-center w-8 items-center mx-auto'>
                <GoVerified
                  size={50}
                  className='text-green-700'
                  onClick={() => alert('You already did this one today.')}
                />
              </span>
            ) : (
              <span
                onClick={() => toggleCompletion(index, sadhana)}
                className='text-red-600 flex justify-center w-8 items-center mx-auto'
              >
                <GoVerified size={50} />
              </span>
            )}
          </>
        )}
      </td>
      <td className=' px-4 py-2 text-black text-center w-48'>
        {sadhana.didTheWork ? (
          <span className='text-green-700 flex justify-center w-8 items-center mx-auto'>
            <GoVerified
              size={50}
              className='text-green-700'
              onClick={() => alert('You already did this one today.')}
            />
          </span>
        ) : (
          <>
            {evaluateSadhanaTime(sadhana.startingTimestamp) ? (
              <div>
                <span
                  onClick={() => handleChooseThisSadhanaTimer(index, sadhana)}
                  className='text-red-600 flex justify-center w-8 items-center mx-auto hover:cursor-pointer'
                >
                  <RiTimerFill size={50} />
                </span>
              </div>
            ) : (
              <p>Not yet.</p>
            )}
          </>
        )}
      </td>

      <td className=' px-4 py-2 text-white text-center'>
        {evaluateSadhanaTime(sadhana.startingTimestamp) ? (
          `${calculateDayIndex(
            sadhana.startingTimestamp,
            session.user.timeZone
          )}/${sadhana.targetSessions}`
        ) : (
          <p>{`Starts ${formatDistanceToNow(
            new Date(sadhana.startingTimestamp).getTime(),
            {
              addSuffix: true,
            }
          )}`}</p>
        )}
      </td>
      <td className=' px-4 py-2 text-white text-center'>
        {sadhana.percentageCompleted}
      </td>
    </tr>
  ));

  return <SadhanaTableDisplay columns={columns} rows={rows} />;
};

export default ActiveSadhanasDisplay;
