import prisma from '../../lib/prismaClient';
import Link from 'next/link';
import Image from 'next/image';
import BiggerLayout from '@component/components/BiggerLayout';
import SadhanaCard from '@component/components/SadhanaCard';
import AllSadhanasDisplay from '@component/components/AllSadhanasDisplay';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const rajdhani = Rajdhani({ weight: '400', subsets: ['devanagari'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

export default function SadhanaList({ sadhanas }) {
  return (
    <BiggerLayout>
      <AllSadhanasDisplay sadhanas={sadhanas} />
    </BiggerLayout>
  );
}

export async function getServerSideProps({}) {
  let sadhanas = await prisma.sadhana.findMany({
    orderBy: {
      createdAt: 'desc',
    },
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
