import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const rajdhani = Rajdhani({ weight: '400', subsets: ['devanagari'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>sadhana # terms and conditions</title>
        <meta
          name='description'
          content='Come up with challenges for you and your friends. Stay accountable. Keep up the good work.'
        />
      </Head>
      <main className='bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 min-h-screen overflow-scroll'>
        <section className='hero pb-10 px-5 text-center text-white overflow-scroll'>
          <h2 className={`${russo.className} text-xl md:text-8xl font-bold`}>
            <span className='text-gray-400'></span>.sadhana.
            <span className='text-gray-400'></span>
          </h2>
          <h4
            className={`${russo.className} text-2xl mb-4 md:text-5xl w-full font-bold`}
          >
            terms and conditions
          </h4>
          <div
            className={`${russo.className} flex flex-col md:flex-row px-8 w-3/5 text-left font-bold`}
          >
            <ol className='flex flex-col space-y-4'>
              <li>
                1. I, jp, commit to give a prize of 250 $APE to choose randomly
                a person that finished any kind of challenge submitted by
                him/her/it self in sadhana between today, tuesday april 25th and
                the 15th of may.
              </li>
              <li>
                2. For me to be able to have money to give that price, I need to
                win the third season of Nights and Weekends. For doing that, I
                need to have the most users. For doing that, I need to build
                something awesome. For doing that, I need your feedback.
              </li>
              <li>
                3. In this app, a user is a person that uploads a challenge. You
                can invite your friends, you can participate in challenges that
                others have created, but in order to count as a user, you need
                to upload a challenge and go through it.
              </li>
              <li>
                4. I don't care if your challenge is writing a letter to your ex
                girlfriend for 3 days during 20 days, or walking down the sun,
                or whatever. The important thing is that you do it.{' '}
              </li>
              <li>
                5. The crazier, the better. 3 days is the bottom limit, but it
                can be for as long as you want. But please have in mind that you
                need to have done it for more than 3 days the 15th of may, so
                that I can add it to the pool for this prize.
              </li>
              <li>
                6. Remember, if I don't win the contest, I won't be able to
                honor my word here. I won't have any money for it.
              </li>
              <li>
                7. I'm building something really cool here, and I could use your
                help on it. And that means coming up with a challenge, and just
                doing it! The transformative power of this thing is real, and I
                want to invite you to experience it on your own world.
              </li>
            </ol>
          </div>
        </section>
      </main>
    </>
  );
}
