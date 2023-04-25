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

const Logo = () => {
  return (
    <main className='bg-gradient-to-r pt-40 from-slate-900 via-purple-900 to-slate-900 min-h-screen flex flex-col items-center justify-center overflow-scroll'>
      <section className='hero pb-10 px-5 text-center text-white overflow-scroll'>
        <h2
          className={`${russo.className} text-xl md:text-8xl font-bold animate-fade-in-blurry transition duration-1500`}
        >
          <span
            className={`${russo.className} blocktext-gray-700 text-5xl text-white animate-dust-appear transition duration-1000 delay-1500`}
          >
            www
          </span>
          .sadhana.
          <span
            className={`${russo.className} blocktext-gray-700 text-5xl text-white animate-dust-appear transition duration-1000 delay-1500`}
          >
            lat
          </span>
        </h2>

        <h4
          className={`${russo.className} text-2xl md:text-5xl  font-bold animate-fade-in-blurry transition duration-2000 delay-1500`}
        >
          the power of consistency
        </h4>
      </section>

      <style jsx>{`
        .animate-fade-in-blurry {
          animation: fadeInBlurry 1.5s ease-in forwards;
          opacity: 0;
        }

        @keyframes fadeInBlurry {
          0% {
            opacity: 0;
            filter: blur(12px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
          }
        }

        .animate-flying-text {
          overflow: hidden;
          position: relative;
          white-space: nowrap;
        }

        .animate-flying-text::before,
        .animate-flying-text::after {
          content: 'the power of consistency';
          position: absolute;
          top: 0;
          width: 50%;
          overflow: hidden;
          animation: arrangeText 2s ease-in-out forwards;
        }

        .animate-flying-text::before {
          left: 0;
          text-align: right;
          animation-delay: 1.5s;
          clip-path: polygon(0 0, 0 100%, 100% 100%, 50% 0);
        }

        .animate-flying-text::after {
          right: 0;
          text-align: left;
          animation-delay: 1.7s;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, 0 100%);
        }

        @keyframes arrangeText {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-dust-appear {
          opacity: 0;
          animation: dustAppear 2s ease-in-out forwards;
          animation-delay: 2s;
        }

        @keyframes dustAppear {
          0% {
            opacity: 0;
            transform: translateY(30px);
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0));
          }
        }
      `}</style>
    </main>
  );
};

export default Logo;
