import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
import Link from 'next/link';
import { useSession, signOut, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@component/pages/api/auth/[...nextauth].js';
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

export default function Home({ sadhanas }) {
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
  }, [session, router.query.time]);

  if (status === 'loading' || loadingSadhanas) return <WelcomeScreen />;

  return (
    <>
      <Head>
        <title>sadhana</title>
        <meta
          name='description'
          content='Come up with challenges for you and your friends. Stay accountable. Keep up the good work.'
        />
      </Head>
      <main className='bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 min-h-screen overflow-scroll'>
        <section className='hero pb-10 px-5 text-center text-white overflow-scroll'>
          {/* <h4
            className={`${russo.className} text-2xl md:text-5xl w-full font-bold`}
          >
            the power of consistency
          </h4> */}
          <h4 className={`${russo.className} text-white  text-2xl md:text-6xl`}>
            The power of consistency
          </h4>
          <div>
            <hr className='mb-10' />
            <h4
              className={`${russo.className} text-white  text-2xl md:text-4xl mb-2`}
            >
              last 3 uploaded challenges:
            </h4>

            <div className='flex space-x-2 space-y-2 items-center justify-center flex-wrap'>
              {sadhanas.map(sadhana => {
                return (
                  <div
                    key={sadhana.id}
                    className={`${russo.className} text-white  md:text-xl border p-8 rounded-2xl bg-black text-white`}
                  >
                    <h2 className='mb-4 text-2xl'>{sadhana.title}</h2>
                    <p className='mt-2'>
                      {sadhana.targetSessionDuration} min/day -{' '}
                      {sadhana.targetSessions} days
                    </p>
                    <p>{sadhana.participants.length} person</p>
                    <p className='text-red-200'>
                      Today is day{' '}
                      {calculateDayIndex(sadhana.startingTimestamp)}
                    </p>
                    <div className='mt-4'>
                      {' '}
                      <Link
                        href={`/s/${sadhana.id}`}
                        className=' bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mt-4'
                      >
                        go
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              href='/s/new'
              className={`${russo.className} mt-8 md:text-4xl mx-3 inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold  py-2 px-4 rounded rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:opacity-70`}
            >
              I want to challenge myself (and friends)
            </Link>
          </div>

          {/* <OldTimer
            timeRemaining={timeRemaining}
            setTimeRemaining={setTimeRemaining}
            session={session}
            userSadhanas={userSadhanas}
            chosenSadhana={chosenSadhana}
            setChosenSadhana={setChosenSadhana}
          /> */}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const sadhanas = await prisma.sadhana.findMany({
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
      participants: true,
    },
  });

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {
      sadhanas: JSON.parse(JSON.stringify(sadhanas)),
      session,
    },
  };
}
