// components/UserMenu.js
import React from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const UserMenu = () => {
  const { data: session, status } = useSession();

  return (
    <div className='fixed text-center top-4 right-4 mx-3 inline-block bg-gradient-to-r from-black via-black to-black text-white font-bold  py-2 px-4 rounded rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out border-white'>
      {!session ? (
        <button className='hover:text-green-500 text-white' onClick={signIn}>
          Login
        </button>
      ) : (
        <>
          <Image
            src={session.user.image}
            alt={session.user.name}
            width={100}
            height={100}
            className='m-auto w-24 h-24 rounded-full border-white border-2'
          />
          <p className='text-white font-bold text-xl mt-2'>
            @{session.user.username}
          </p>
          <p>0/4 ready today</p>
          <div className='mt-2'>
            <Link
              className='hover:text-blue-400 text-white font-bold text-lg mr-4'
              href='/dashboard'
            >
              Dashboard
            </Link>
            <button
              className='hover:text-red-500 text-white font-bold text-lg'
              onClick={signOut}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;
