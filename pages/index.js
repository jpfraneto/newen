// LandingPage.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Londrina_Shadow, Luckiest_Guy } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@component/pages/api/auth/[...nextauth].js';
import Button from '@component/components/Button';
import { useRouter } from 'next/router';
import NewNav from '@component/components/NewNav';

const luckiestguy = Luckiest_Guy({ weight: '400', subsets: ['latin'] });
const londrinashadow = Londrina_Shadow({ weight: '400', subsets: ['latin'] });

const LandingPage = () => {
  const router = useRouter();

  return (
    <>
      {' '}
      <NewNav />{' '}
      <div className='min-h-full flex flex-col'>
        <div className='text-theblack flex-grow bg-thewhite bg-opacity-50 bg-cover bg-center flex flex-col items-center '>
          <div className='text-center pt-32 mb-8'>
            <h5 className='text-7xl font-bold mb-5'>The end of depression</h5>
            <p className='px-4 md:px-0 text-xl md:max-w-xl mx-auto mt-0'>
              Train your capacity for being consistent in community with
              gamified challenges.
            </p>
          </div>
          <div className='mt-8 text-center '>
            <div className='flex justify-center text-thewhite space-x-2'>
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
        {/* <div className='w-full bg-gray-100 py-12 px-4 md:px-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16'>
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
          fill
          cover
          className='rounded-full'
        />
      </div>
    </div> */}
      </div>
    </>
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
