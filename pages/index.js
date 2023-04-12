import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
import Link from 'next/link';
import Timer from '@component/components/Timer';
import { useSession, signOut, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { BiChevronDown } from 'react-icons/bi';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const rajdhani = Rajdhani({ weight: '400', subsets: ['devanagari'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

const quotes = [
  {
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    quote: "Your time is limited, don't waste it living someone else's life.",
    author: 'Steve Jobs',
  },
  {
    quote: 'Creativity is intelligence having fun.',
    author: 'Albert Einstein',
  },
  {
    quote:
      'You can never solve a problem on the level on which it was created.',
    author: 'Albert Einstein',
  },
  {
    quote: 'The best way to predict the future is to create it.',
    author: 'Peter Drucker',
  },
  {
    quote:
      'What lies behind us and what lies before us are tiny matters compared to what lies within us.',
    author: 'Ralph Waldo Emerson',
  },
  {
    quote:
      'The only person you are destined to become is the person you decide to be.',
    author: 'Ralph Waldo Emerson',
  },
  {
    quote:
      'The greatest danger for most of us is not that our aim is too high and we miss it, but that it is too low and we reach it.',
    author: 'Michelangelo',
  },
  {
    quote:
      'The only way to achieve the impossible is to believe it is possible.',
    author: 'Charles Kingsleigh',
  },
  {
    quote: "You miss 100% of the shots you don't take.",
    author: 'Wayne Gretzky',
  },
];

const randomQuote = quotes[6];

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Newen - Remember the Future</title>
      </Head>
      <main className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen'>
        <section className='hero pt-40 pb-20 px-5 text-center text-white'>
          <h2 className={`${russo.className} text-8xl font-bold`}>
            .new<span className='mirrored'>ne</span>.
          </h2>
          <h4 className={`${righteous.className} text-5xl font-bold`}>
            remember the future
          </h4>
          <Link
            className='inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-2xl px-6 py-3 mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
            href='/sadhana/new'
          >
            lfg
          </Link>

          {/* {session ? (
            <button
              className='inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-2xl px-6 py-3 mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
              onClick={signOut}
            >
              Logout
            </button>
          ) : (
            <button
              className='inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-2xl px-6 py-3 mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
              onClick={signIn}
            >
              Log In
            </button>
          )} */}
          <div className='mt-30'>
            <BiChevronDown size={100} />
          </div>
        </section>
        <section className='bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center py-20'>
          <div className='text-black	 card mx-4 p-4 bg-gray-100 border border-gray-300 rounded-lg text-center w-1/4'>
            <h3 className='text-4xl font-bold'>Connection</h3>
            <p className='text-xl'>
              Unite with a like-minded tribe of people that follow the same
              creator.
            </p>
          </div>
          <div className='text-black	card mx-4 p-4 bg-gray-100 border border-gray-300 rounded-lg text-center w-1/4'>
            <h3 className='text-4xl font-bold'>Consistency</h3>
            <p className='text-xl'>
              Practice doing the craft that makes you admire this creator,
              alongside her and all the community.
            </p>
          </div>
          <div className='text-black	card mx-4 p-4 bg-gray-100 border border-gray-300 rounded-lg text-center w-1/4'>
            <h3 className='text-4xl font-bold'>Evolution</h3>
            <p className='text-xl'>
              Unlock your full potential by tapping into your ultimate mission
              as a human being: To create cool stuff.
            </p>
          </div>
        </section>

        <section className='flex items-center p-20'>
          <div className='w-1/2'>
            <Image
              src='/images/generated_image_2.png'
              alt='Image 3'
              width={600}
              height={400}
              className='rounded-lg'
            />
          </div>
          <div className='w-1/2 text-right px-8'>
            <h2 className='text-6xl font-bold'>A Journey Within</h2>
            <p className='text-2xl'>
              Explore the depths of your own creativity
            </p>
          </div>
        </section>
        <section className='flex items-center p-20'>
          <div className='w-1/2 text-left px-8'>
            <h2 className='text-6xl font-bold'>Community</h2>
            <p className='text-2xl'>
              Share your experiences and learn from others
            </p>
          </div>
          <div className='w-1/2'>
            <Image
              src='/images/generated_image_1.png'
              alt='Image 4'
              width={600}
              height={400}
              className='rounded-lg'
            />
          </div>
        </section>
        <section className='text-black bg-gray-100 py-20 text-center'>
          <blockquote className='text-4xl italic'>{`"${randomQuote.quote}"`}</blockquote>
          <p className='text-2xl mt-4'>{randomQuote.author}</p>
        </section>

        <section className='bg-slate-500 py-20'>
          <div className='container mx-auto px-4'>
            <h2 className='text-4xl font-bold mb-10'>Journey to the Unknown</h2>
            <Image
              src='/images/generated_image_1.png'
              alt='Image 4'
              width={600}
              height={400}
              className='rounded-lg'
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
