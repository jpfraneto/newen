import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import DashboardComponent from '@component/components/DashboardComponent';

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading</p>;

  if (!session) return <p>You are not allowed to be here.</p>;

  return (
    <div className='bg-green-600 min-h-screen'>
      {session ? (
        <div className=' w-8/12 m-auto py-8'>
          <div className='text-black flex flex-col justify-items-center items-center py-4'>
            <h2 className='text-2xl font-bold mb-4'>{session.user.name}</h2>
            <a>@{session.user.username}</a>
            <Image
              width={222}
              height={222}
              src={session.user.image}
              className='rounded-full'
              alt='Profile picture'
            />
          </div>
          <DashboardComponent />
        </div>
      ) : (
        <p>You are not logged in 😞</p>
      )}
    </div>
  );
};

export default Dashboard;
