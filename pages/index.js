import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Timer from '@component/components/Timer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds

  return (
    <>
      {' '}
      <Head>
        <title>
          newen - {Math.floor(timeRemaining / 60)}:
          {timeRemaining % 60 < 10 ? '0' : ''}
          {timeRemaining % 60}
        </title>
      </Head>
      <main className='mainContainer'>
        <h2>newen</h2>
        <h4>school of presence</h4>
      </main>
    </>
  );
}
