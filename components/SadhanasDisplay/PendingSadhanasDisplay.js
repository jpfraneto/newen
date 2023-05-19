import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import SadhanaTableDisplay from './SadhanaTableDisplay';

const PendingSadhanasDisplay = ({ sadhanas }) => {
  const columns = ['Name', 'Starting Date', 'Participants', 'Target Sessions'];

  const rows = sadhanas.map((sadhana, index) => (
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
        {formatDistanceToNow(new Date(sadhana.startingTimestamp), {
          addSuffix: true,
        })}
      </td>
      <td className='px-4 py-2 text-white text-center'>
        {sadhana.participants.length}
      </td>
      <td className='px-4 py-2 text-white text-center'>
        {sadhana.targetSessions}
      </td>
    </tr>
  ));

  return <SadhanaTableDisplay columns={columns} rows={rows} />;
};

export default PendingSadhanasDisplay;
