// LandingPage.js
import React from 'react';
import Link from 'next/link';
import { Londrina_Shadow, Luckiest_Guy } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@component/pages/api/auth/[...nextauth].js';
import Button from '@component/components/Button';
import { useRouter } from 'next/router';

const luckiestguy = Luckiest_Guy({ weight: '400', subsets: ['latin'] });
const londrinashadow = Londrina_Shadow({ weight: '400', subsets: ['latin'] });

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className='min-h-fit flex flex-col'>
      <div
        className='text-thewhite flex-grow bg-theblack bg-opacity-50 bg-cover bg-center flex flex-col items-center '
        style={{
          backgroundImage: 'url(/images/ankybg.png)',
          boxSizing: 'border-box',
          height: 'calc(100vh - 55px - 30px)',
        }}
      >
        <div className='text-center pt-16 mb-24'>
          <h1 className='text-6xl md:text-7xl font-bold space-x-4 mb-0'>
            <span className={`${luckiestguy.className}`}>DISCIPLINE IS</span>
            <span className={`${londrinashadow.className} ml-2`}>FREEDOM.</span>
          </h1>
          <p className='px-4 md:px-0 text-xl md:max-w-xl mx-auto mt-0'>
            {/* Sadhana is where consistency paves the way out of depression. Join
            like-minded people in challenges that empower you to explore your
            boundaries. */}{' '}
            Train your capacity for being consistent in community with gamified
            challenges.
          </p>
        </div>
        <div className='mt-32 text-center '>
          <p className=' text-xl'>What is your next challenge?</p>

          {/* <form className='flex flex-wrap text-sm md:text-xl mb-4 max-w-4xl justify-center space-x-8'>
            {challenges.map((x, i) => {
              return (
                <div key={i} className='flex items-center mt-2'>
                  <input
                    type='checkbox'
                    name={`checkbox-${i}`}
                    id={`checkbox-${i}`}
                    className='bg-red-300 hover:bg-pink-400 cursor-pointer
    md:w-8 md:h-8 h-4 w-4 border-3 border-rose-500 rounded-lg checked:bg-rose-600'
                  />
                  <label htmlFor={`checkbox-${i}`} className='ml-3'>
                    {x}
                  </label>
                </div>
              );
            })}
          </form> */}
          <div className='flex space-x-2'>
            {' '}
            <Button
              buttonAction={() => router.push('/s/new')}
              buttonText='Add new'
              buttonColor='bg-thepurple'
            />
            <Button
              buttonAction={() => router.push('/s')}
              buttonText='Explore'
              buttonColor='bg-thegreen'
            />
          </div>
        </div>
      </div>
      <div className='w-full bg-gray-100 py-12 px-4 md:px-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16'>
        <div className='flex flex-col items-center md:items-start text-center md:text-left'>
          <h2 className='text-3xl font-bold mb-4'>
            Meet Anky, your companion in this journey.
          </h2>
          <p className='text-xl'>
            A reincarnation of Hanuman, it brings ancient wisdom to your modern
            journey of personal evolution.
          </p>
        </div>
        <div className='w-64 h-64 relative'>
          <Image
            src='/images/anky.png'
            alt='Anky'
            layout='fill'
            objectFit='cover'
            className='rounded-full'
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

export async function getServerSideProps(context) {
  try {
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );

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
        session,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
  }
}
