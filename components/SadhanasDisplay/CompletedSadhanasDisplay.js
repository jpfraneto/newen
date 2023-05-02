import React from 'react';
import SadhanaTableDisplay from './SadhanaTableDisplay';
import Link from 'next/link';

const CompletedSadhanasDisplay = ({ sadhanas, calculateCompletedSessions }) => {
  const columns = ['Name', 'Finished At', 'Total Completed Sessions'];

  const rows = sadhanas.map((sadhana, index) => {
    const startingDate = new Date(sadhana.startingTimestamp);
    const endingDate = new Date(
      startingDate.getTime() +
        (sadhana.targetSessions - 1) * 24 * 60 * 60 * 1000
    );

    const timeZoneOffset = endingDate.getTimezoneOffset() * 60000;
    const localEndingDate = new Date(endingDate.getTime() + timeZoneOffset);

    return (
      <tr
        key={sadhana.id}
        className={`bg-black ${
          index % 2 === 0 ? 'bg-opacity-30' : 'bg-opacity-60'
        }`}
      >
        <td className='px-4 py-2 text-blue-400 text-center'>
          <Link href={`/s/${sadhana.id}`}>{sadhana.title}</Link>
        </td>
        <td className='px-4 py-2 text-white text-center'>
          {localEndingDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </td>
        <td className='px-4 py-2 text-white text-center'>
          {calculateCompletedSessions(sadhana)}/{sadhana.targetSessions}
        </td>
      </tr>
    );
  });

  return <SadhanaTableDisplay columns={columns} rows={rows} />;
};

export default CompletedSadhanasDisplay;
