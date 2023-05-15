import React from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Button from './Button';
import { BiHomeAlt, BiHelpCircle, BiSearch } from 'react-icons/bi';
import { CiViewTimeline } from 'react-icons/ci';
import { IoMdNotifications } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';
import { Russo_One, Titillium_Web } from 'next/font/google';

const titilium = Titillium_Web({ weight: '400', subsets: ['latin'] });

const LeftNavbar = ({ user }) => {
  const router = useRouter();
  if (!user) return;

  return (
    <div className='w-160 h-[calc(100vh-30px)] text-sm bg-thegreen px-2 relative'>
      <div className='flex items-center p-2 text-xl'>
        <div className='text-2xl text-black  font-russo'>
          <Link className={`${titilium.className} `} href='/'>
            sadhana
          </Link>
        </div>
      </div>
      <div className='w-11/12 mx-auto bg-white rounded-lg font-bold'>
        @kithkui
      </div>
      <div className='w-11/12 mx-auto mt-10 space-y-2 font-bold'>
        <div
          className={`flex items-center space-x-2 p-2 rounded-full hover:bg-theorange hover:opacity-90 cursor-pointer ${
            router.route === '/dashboard' && 'bg-theorange text-black'
          }`}
        >
          <BiHomeAlt className='transform -translate-y-0.5' />
          <Link href='/dashboard'>Dashboard</Link>
        </div>
        <div
          className={`flex items-center space-x-2 p-2 rounded-full hover:bg-theorange hover:opacity-90  cursor-pointer ${
            router.route === '/profile' && 'bg-theorange text-black'
          }`}
        >
          <CgProfile className='transform -translate-y-0.5' />
          <Link href='/profile'>Profile</Link>
        </div>
        {/* <div
          className={`flex items-center space-x-2 p-2 rounded-full cursor-pointer ${
            thisRoute === 'my-zadhanas' && 'bg-theorange text-black'
          }`}
        >
          <CiViewTimeline className='transform -translate-y-0.5' />
          <Link href='/my-zadhanas'>My Zadhanas</Link>
        </div> */}
        <div
          className={`flex items-center space-x-2 p-2 rounded-full hover:bg-theorange hover:opacity-90  cursor-pointer ${
            router.route === 'u/all-sadhanas' && 'bg-theorange text-black'
          }`}
        >
          <BiSearch className='transform -translate-y-0.5' />
          <Link href='/u/all-sadhanas'>Browse Zadhanas</Link>
        </div>
        {/* <div
          className={`flex items-center space-x-2 p-2 rounded-full cursor-pointer ${
            thisRoute === 'notifications' && 'bg-theorange text-black'
          }`}
        >
          <IoMdNotifications className='transform -translate-y-0.5' />
          <Link href='/notifications'>Notifications</Link>
        </div> */}
        {/* <div
          className={`flex items-center space-x-2 p-2 rounded-full cursor-pointer ${
            thisRoute === 'help' && 'bg-theorange text-black'
          }`}
        >
          <BiHelpCircle className='transform -translate-y-0.5' />
          <Link href='/help'>Help</Link>
        </div> */}
        {/* <div
          className={`flex items-center space-x-2 p-2 rounded-full cursor-pointer ${
            thisRoute === 'settings' && 'bg-theorange text-black'
          }`}
        >
          <FiSettings className='transform -translate-y-0.5' />
          <Link href='/settings'>Settings</Link>
        </div> */}

        <Button
          buttonText='New Sadhana'
          buttonAction={() => router.push('/u/new-sadhana')}
          buttonColor='bg-theorange'
        />
      </div>
      <div className='absolute bottom-2.5 w-11/12 mx-auto flex justify-center space-x-4'>
        <Button
          className='hover:bg-thepurple'
          buttonText='Logout'
          buttonAction={signOut}
          buttonColor='bg-theredbtn'
        />
      </div>
    </div>
  );
};

export default LeftNavbar;
