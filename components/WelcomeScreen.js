import React from 'react';
import Spinner from './Spinner';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

const WelcomeScreen = () => {
  return (
    <main className='bg-black min-h-screen overflow-scroll'>
      <section className='welcomehero pb-10 px-5 text-center overflow-scroll'>
        <h4
          className={`${righteous.className} text-2xl mb-2 md:text-5xl w-full font-bold`}
        >
          welcome...
        </h4>

        <div class='flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-green-200 to-grenn-900 animate-spin'>
          <div class='h-9 w-9 rounded-full bg-black'></div>
        </div>
      </section>
    </main>
  );
};

export default WelcomeScreen;
