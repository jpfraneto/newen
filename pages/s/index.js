import prisma from '../../lib/prismaClient';
import Link from 'next/link';
import Image from 'next/image';
import BiggerLayout from '@component/components/BiggerLayout';
import SadhanaCard from '@component/components/SadhanaCard';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const rajdhani = Rajdhani({ weight: '400', subsets: ['devanagari'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

export default function SadhanaList({ sadhanas }) {
  return (
    <BiggerLayout>
      <div className='mb-2'>
        <h4
          className={`${righteous.className} text-blue-400 text-2xl md:text-5xl mb-2 w-full font-bold`}
        >
          Challenges
        </h4>
        <div className='my-3'>
          <Link
            href={`/s/new`}
            className='border-black border-2 opacity-70 hover:bg-gray-900 text-white px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 hover:opacity-80 to-red-500'
          >
            Add Challenge
          </Link>
        </div>
      </div>
      <div className='flex flex-wrap  mt-8 justify-around space-x-2'>
        {sadhanas.map(sadhana => (
          <SadhanaCard key={sadhana.id} sadhana={sadhana} />
        ))}
      </div>
    </BiggerLayout>
  );
}

export async function getServerSideProps({}) {
  const sadhanasCount = await prisma.sadhana.count();
  const skip = Math.floor(Math.random() * sadhanasCount);
  let sadhanas = await prisma.sadhana.findMany({
    take: 25,
    skip: skip,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
      participants: true,
    },
  });

  sadhanas = sadhanas
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return {
    props: {
      sadhanas: JSON.parse(JSON.stringify(sadhanas)),
    },
  };
}
