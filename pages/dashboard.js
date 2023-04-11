import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading</p>;

  if (!session) return <p>You are not allowed to be here.</p>;
  console.log('the session is: ', session);
  return (
    <div>
      {session ? (
        <div className='text-black flex flex-col justify-items-center items-center'>
          <h2>{session.user.name}</h2>
          <Image
            width={222}
            height={222}
            src={session.user.image}
            className='rounded-full'
            alt='Profile picture'
          />
        </div>
      ) : (
        <p>You are not logged in 😞</p>
      )}
    </div>
  );
};

export default Dashboard;
