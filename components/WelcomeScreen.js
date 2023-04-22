import React from 'react';
import Spinner from './Spinner';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
import Image from 'next/image';
import gm from '@component/public/vercel.svg';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

const WelcomeScreen = () => {
  return (
    <main className='bg-black min-h-screen overflow-scroll'>
      <section className='welcomehero pb-10 px-5 text-center overflow-scroll'>
        <Image src={gm} width={333} height={333} />
      </section>
    </main>
  );
};

export default WelcomeScreen;
