import React from 'react';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import DashboardComponent from '@component/components/DashboardComponent';

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading</p>;

  if (!session)
    return (
      <div className='p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center'>
        <div className='bg-white p-8 rounded-lg w-full max-w-md'>
          <p className='text-black'>Sorry, but are not allowed to be here.</p>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-2'
            onClick={signIn}
          >
            Login
          </button>
          <button
            className='mx-3 inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold  py-2 px-4 rounded rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
            onClick={() => {
              router.push('/guest-demo');
            }}
          >
            Guest Demo
          </button>
        </div>
      </div>
    );

  return (
    <div className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen'>
      {session ? (
        <div className='px-2 max-w-full md:w-8/12 m-auto py-8'>
          <div className='text-black flex flex-col justify-items-center items-center py-4'>
            <h2 className='text-2xl font-bold'>
              Dashboard | @{session.user.username}
            </h2>
            <Image
              width={111}
              height={111}
              src={session.user.image}
              className='rounded-full mt-2'
              alt='Profile picture'
            />
          </div>
          <DashboardComponent session={session} />
        </div>
      ) : (
        <p>You are not logged in 😞</p>
      )}
    </div>
  );
};

export default Dashboard;
