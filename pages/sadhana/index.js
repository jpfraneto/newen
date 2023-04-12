import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default function SadhanaList({ sadhanas }) {
  return (
    <div className='text-black container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-semibold mb-4'>Sadhana List</h1>
      <table className='table-auto w-full'>
        <thead>
          <tr className='bg-gray-100 text-left'>
            <th className='px-4 py-2'>Title</th>
            <th className='px-4 py-2'>Author</th>
            <th className='px-4 py-2'>Target Sessions</th>
            <th className='px-4 py-2'>Target Session Duration</th>
            <th className='px-4 py-2'>Periodicity</th>
            <th className='px-4 py-2'>Starting Timestamp</th>
            <th className='px-4 py-2'>User Limit</th>
            <th className='px-4 py-2'>Is Private</th>
            <th className='px-4 py-2'>Link</th>
          </tr>
        </thead>
        <tbody>
          {sadhanas.map((sadhana, index) => (
            <tr
              key={sadhana.id}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              <td className='px-4 py-2'>{sadhana.title}</td>
              <td className='px-4 py-2'>{sadhana.author.name}</td>
              <td className='px-4 py-2'>{sadhana.targetSessions}</td>
              <td className='px-4 py-2'>{sadhana.targetSessionDuration}</td>
              <td className='px-4 py-2'>{sadhana.periodicity}</td>
              <td className='px-4 py-2'>
                {new Date(sadhana.startingTimestamp).getTime()}
              </td>
              <td className='px-4 py-2'>{sadhana.userLimit}</td>
              <td className='px-4 py-2'>{sadhana.isPrivate ? 'Yes' : 'No'}</td>
              <td>
                <Link href={`/sadhana/${sadhana.id}`}>Visit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps() {
  const sadhanas = await prisma.sadhana.findMany({
    include: {
      author: true,
    },
  });

  return {
    props: {
      sadhanas: JSON.parse(JSON.stringify(sadhanas)),
    },
  };
}
