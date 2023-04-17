import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
import Link from 'next/link';
import { useSession, signOut, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const rajdhani = Rajdhani({ weight: '400', subsets: ['devanagari'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>sadhana</title>
      </Head>
      <main className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen'>
        {/* <UserMenu /> */}
        <section className='hero pt-40 pb-20 px-5 text-center text-white'>
          <h2 className={`${russo.className} text-8xl font-bold`}>.sadhana.</h2>
          <h4 className={`${righteous.className} text-5xl font-bold`}>
            the power of consistency
          </h4>
          <div>
            {' '}
            {session ? (
              <Link
                className='mx-3 inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-2xl px-6 py-3 mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
                href='/dashboard'
              >
                Dashboard
              </Link>
            ) : (
              <Link
                className='mx-3 inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-2xl px-6 py-3 mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
                href='/guest-demo'
              >
                Guest
              </Link>
            )}
            <Link
              className='inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-2xl px-6 py-3 mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
              href='/sadhana'
            >
              Explore Sadhanas
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
