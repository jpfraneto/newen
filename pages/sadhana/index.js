import prisma from '../../lib/prismaClient';
import Link from 'next/link';
import Image from 'next/image';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const rajdhani = Rajdhani({ weight: '400', subsets: ['devanagari'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

export default function SadhanaList({ sadhanas }) {
  return (
    <div className='bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 min-h-screen text-black py-8 px-4 sm:px-8 md:px-16 lg:px-32'>
      <div className='flex flex-col sm:flex-row items-center mb-4'>
        <h4
          className={`${righteous.className} text-2xl md:text-5xl w-full font-bold`}
        >
          Challenges List
        </h4>
      </div>

      <div className='overflow-x-auto rounded-xl'>
        <table className='rounded-2xl table-auto w-full text-center'>
          <thead>
            <tr className='bg-gray-100 rounded-2xl text-center'>
              <th className='px-4 py-2'>Title</th>
              <th className='px-4 py-2'>Author</th>
              <th className='px-4 py-2'>Target Sessions</th>
              <th className='px-4 py-2'>Target Session Duration (minutes)</th>
              <th className='px-4 py-2'>Starting Date</th>
              <th className='px-4 py-2'>Users</th>
            </tr>
          </thead>
          <tbody>
            {sadhanas.map((sadhana, index) => (
              <tr
                key={sadhana.id}
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <td className='px-4 py-2'>
                  <Link
                    className='hover:text-blue-400 inline-block bg-gradient-to-r from-black via-black to-black text-white font-bold text-xl px-4 py-2 rounded-lg shadow-md transition-all duration-100 ease-in-out'
                    href={`/sadhana/${sadhana.id}`}
                  >
                    {sadhana.title}
                  </Link>
                </td>
                <td className='px-4 py-2'>
                  <Link
                    className='hover:text-blue-400 flex align-middle text-center justify-center sm:justify-left items-center space-x-2'
                    href={`/u/${sadhana.author.id}`}
                    passHref
                  >
                    <Image
                      src={sadhana.author.image || '/default-avatar.png'}
                      alt={sadhana.author.name}
                      width={32}
                      height={32}
                      className='rounded-full'
                    />
                    <span>@{sadhana.author.username}</span>
                  </Link>
                </td>
                <td className='px-4 py-2'>{sadhana.targetSessions}</td>
                <td className='px-4 py-2'>{sadhana.targetSessionDuration}</td>
                <td className='px-4 py-2'>
                  {new Date(sadhana.startingTimestamp).toLocaleDateString(
                    'en-US',
                    {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </td>
                <td className='px-4 py-2'>
                  {sadhana.participants.length}/{sadhana.userLimit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-3 flex flex-col sm:flex-row items-center mb-4'>
        <Link
          className='ml-0 mt-4 sm:mt-0 inline-block bg-gradient-to-r from-black via-black to-black text-white font-bold text-2xl px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
          href={`/sadhana/new`}
        >
          Add Sadhana
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps({}) {
  const sadhanas = await prisma.sadhana.findMany({
    include: {
      author: true,
      participants: true,
    },
  });

  return {
    props: {
      sadhanas: JSON.parse(JSON.stringify(sadhanas)),
    },
  };
}
