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
                1. I, jp, commit to give a prize of 250 $APE to a randomnly
                choosen person. The pool of options will be gathered from all of
                those users of this platform that finished any kind of challenge
                submitted by him/her/it self in it between today, tuesday april
                25th and the 15th of may.
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
                4. I don&apos;t care if your challenge is writing a letter to
                your ex girlfriend for 3 days during 20 days, or walking down
                the sun, or whatever. The important thing is that you do it.{' '}
              </li>
              <li>
                5. The crazier, the better. It won&apos;t give you more chances
                of winning, but it will be funnier. 3 days is the bottom limit,
                but it can be for as long as you want. But please have in mind
                that you need to have done it for more than 3 days the 15th of
                may, so that I can add it to the pool for this prize.
              </li>
              <li>
                6. Remember, if I don&apos;t win the contest, I won&apos;t be
                able to honor my word here. I won&apos;t have any money for it.
              </li>
              <li>
                7. I&apos;m building something really cool here, and I could use
                your help on it. And that means coming up with a challenge, and
                just doing it! The transformative power of this thing is real,
                and I want to invite you to experience it on your own world.
              </li>
              <li>
                8. I hope that you are able to see that what is going to happen
                here will be awesome. A lot of people will benefit from that,
                because the world right now is built upon people that think they
                are not creative. They have that door closed. And consistency
                opens up that door, because it is the invitation to realize that
                creativity is not a characteristic of &apos;some humans&apos;.
                It doesn&apos;t work like that. Creativity is a consequence of
                showing up, doing the thing, and just sharing what you came up
                with. It is a process, it is what comes at the other side of
                showing up. And this app will help you show up. You will help
                you show up, because you will realize the deep impact that it
                will have in your life. And you will talk to others. And the
                internet is a funny place. It will go viral. People will spread
                the word. And we will all have fun together. Something big is
                coming, and you are at the genesis of it.
              </li>
            </ol>
          </div>
        </section>
      </main>
    </>
  );
}
