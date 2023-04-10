import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
import Link from 'next/link';
import Timer from '@component/components/Timer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });
const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const rajdhani = Rajdhani({ weight: '400', subsets: ['devanagari'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Newen - Remember the Future</title>
        {russo.linkTag}
        {righteous.linkTag}
      </Head>
      <main className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen'>
        <section className='hero pt-40 pb-20 px-5 text-center text-white'>
          <h2 className={`${russo.className} text-8xl font-bold`}>
            .new<span className='mirrored'>ne</span>.
          </h2>
          <h4 className={`${righteous.className} text-5xl font-bold`}>
            remember the future
          </h4>
        </section>
        <section className='bg-slate-500 py-20'>
          <div className='container mx-auto px-4'>
            <h2 className='text-4xl font-bold mb-10'>Journey to the Unknown</h2>
            <Image
              src='/images/generated_image_1.png'
              alt='Generated Image 1'
              width={500}
              className='rounded'
              height={333}
            />
            <p className='text-lg leading-relaxed mt-4'>
              Embrace the adventure of self-discovery as you step into the
              uncharted waters of creativity and consistency.
            </p>
          </div>
        </section>
        <section className='bg-slate-800 py-20'>
          <div className='container mx-auto px-4'>
            <h2 className='text-4xl font-bold mb-10'>Enter the Void</h2>
            <Image
              src='/images/generated_image_2.png'
              alt='Generated Image 2'
              width={500}
              className='rounded'
              height={333}
            />
            <p className='text-lg leading-relaxed mt-4'>
              Confront your fears and embrace the uncertainty as you journey
              through the void towards personal growth.
            </p>
          </div>
        </section>
        <section className='bg-slate-500 py-20'>
          <div className='container mx-auto px-4'>
            <h2 className='text-4xl font-bold mb-10'>Connect and Celebrate</h2>
            <Image
              src='/images/generated_image_3.png'
              alt='Generated Image 3'
              width={500}
              height={333}
              className='rounded'
            />
            <p className='text-lg leading-relaxed mt-4'>
              Experience the joy of connecting with like-minded individuals, as
              you celebrate shared experiences and collective growth.
            </p>
          </div>
        </section>
        <section className='bg-slate-800 py-20'>
          <div className='container mx-auto px-4'>
            <h2 className='text-4xl font-bold mb-10'>Climb Your Mountain</h2>
            <Image
              src='/images/generated_image_4.png'
              alt='Generated Image 4'
              width={500}
              height={333}
              className='rounded'
            />
            <p className='text-lg leading-relaxed mt-4'>
              Overcome challenges and reach new heights in your personal
              evolution as you traverse the rugged terrain of growth and
              transformation.
            </p>
          </div>
        </section>

        <section className='bg-slate-500 py-20'>
          <div className='container mx-auto px-4'>
            <h2 className='text-4xl font-bold mb-10'>
              Nurture Your Inner Flame
            </h2>
            <Image
              src='/images/generated_image_5.png'
              alt='Generated Image 5'
              width={500}
              height={333}
              className='rounded'
            />
            <p className='text-lg leading-relaxed mt-4'>
              Explore the depths of your creative spirit and fan the flames of
              your passions as you journey towards self-realization and purpose.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
