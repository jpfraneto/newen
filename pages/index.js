import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
import Link from 'next/link';
import { useSession, signOut, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import OldTimer from '@component/components/OldTimer';
import {
  didUserCompleteWork,
  calculateDayIndex,
} from '@component/lib/functions';
import Spinner from '@component/components/Spinner';
import WelcomeScreen from '@component/components/WelcomeScreen';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const rajdhani = Rajdhani({ weight: '400', subsets: ['devanagari'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [timeRemaining, setTimeRemaining] = useState(100 * 60);
  const [userSadhanas, setUserSadhanas] = useState(null);
  const [loadingSadhanas, setLoadingSadhanas] = useState(true);
  const [chosenSadhana, setChosenSadhana] = useState({
    title: '',
    initialDuration: 60,
  });

  useEffect(() => {
    async function fetchUserSadhanas(userId) {
      try {
        const response = await fetch(`/api/userinfo`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const responnn = data.sadhanas.map(x =>
          didUserCompleteWork(
            data.user,
            x.id,
            calculateDayIndex(x.startingTimestamp)
          )
        );
        data.sadhanas = data.sadhanas.map((x, i) => {
          return { ...x, ['didTheWork']: responnn[i] };
        });
        setUserSadhanas(data.sadhanas || []);

        setLoadingSadhanas(false);
        const unfinished = data.sadhanas.filter(x => !x.didTheWork);
        setChosenSadhana(unfinished[0] || []);
        setTimeRemaining(
          unfinished[0].targetSessionDuration * 60 ||
            router.query.time ||
            100 * 60
        );
        return;
      } catch (error) {
        setUserSadhanas([]);
        return;
      }
    }
    fetchUserSadhanas();
  }, [session]);

  if (status === 'loading' || loadingSadhanas) return <WelcomeScreen />;

  return (
    <>
      <Head>
        <title>sadhana</title>
        <meta
          name='description'
          content='Deep Work timer and consistency trainer working alongside creators in challenges. '
        />
      </Head>
      <main className='bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 min-h-screen overflow-scroll'>
        <section className='hero pb-10 px-5 text-center text-white overflow-scroll'>
          <h2 className={`${russo.className} text-xl md:text-8xl font-bold`}>
            <span className='text-gray-400'></span>.sadhana.
            <span className='text-gray-400'></span>
          </h2>
          <h4
            className={`${righteous.className} text-2xl md:text-5xl w-full font-bold`}
          >
            the power of consistency
          </h4>
          <OldTimer
            timeRemaining={timeRemaining}
            setTimeRemaining={setTimeRemaining}
            session={session}
            userSadhanas={userSadhanas}
            chosenSadhana={chosenSadhana}
            setChosenSadhana={setChosenSadhana}
          />
        </section>
      </main>
    </>
  );
}
