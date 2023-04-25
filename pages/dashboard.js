import React from 'react';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { formatDate } from '@component/lib/functions';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
import Image from 'next/image';
import DashboardComponent from '@component/components/DashboardComponent';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading</p>;

  if (!session)
    return (
      <div className='p-8 linear-gradient(to right, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0)) min-h-screen flex items-center justify-center'>
        <div className='bg-white p-8 rounded-lg w-full max-w-md'>
          <p className='text-black'>Sorry, but are not allowed to be here.</p>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-2'
            onClick={signIn}
          >
            Login
          </button>
          {/* <button
            className='mx-3 inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold  py-2 px-4 rounded rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
            onClick={() => {
              router.push('/guest-demo');
            }}
          >
            Guest Demo
          </button> */}
        </div>
      </div>
    );

  return (
    <div className='bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 min-h-screen'>
      {session ? (
        <div className='md:px-2 max-w-full md:w-8/12 m-auto py-3 md:py-4'>
          <div className='text-white flex flex-col justify-items-center items-center py-4'>
            <h4
              className={`${righteous.className} text-4xl text-center md:text-5xl w-full font-bold`}
            >
              {formatDate(new Date().getTime())} |{' '}
              {session.user.username
                ? `@${session.user.username}`
                : session.user.name}
            </h4>
            <Image
              width={111}
              height={111}
              src={session.user.image}
              className='rounded-full mt-2 border-2 border-white'
              alt='Profile picture'
            />
          </div>
          <DashboardComponent session={session} />
        </div>
      ) : (
        <>
          {' '}
          <p>You are not logged in 😞</p>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-2'
            onClick={signIn}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
