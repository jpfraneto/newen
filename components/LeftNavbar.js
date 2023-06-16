import React from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Button from './Button';
import { BiHomeAlt, BiHelpCircle, BiSearch } from 'react-icons/bi';
import { CiViewTimeline } from 'react-icons/ci';
import { IoMdNotifications } from 'react-icons/io';
import { RxLapTimer } from 'react-icons/rx';
import { FiSettings } from 'react-icons/fi';
import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';
import { Russo_One, Titillium_Web } from 'next/font/google';

const titilium = Titillium_Web({ weight: '400', subsets: ['latin'] });

const LeftNavbar = ({ user }) => {
  console.log('the user is:', user);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return;
  return (
    <div
      className={` sm:min-w-[261px] md:h-[calc(100vh-30px)] text-sm bg-thegreen px-2 relative sm:static ${
        isOpen ? 'absolute h-fit pb-2' : ''
      } transition-all duration-200`}
    >
      <div className='flex items-center p-2'>
        <div className='w-full text-2xl text-black flex flex-col items-center justify-center font-russo'>
          <Link className={`${titilium.className} `} href='/'>
            sadhana
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-md sm:hidden'
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      <div className={`sm:block ${isOpen ? 'block' : 'hidden'}`}>
        <div className='w-11/12 mx-auto bg-white rounded-lg font-bold'>
          {user.username ? `@${user.username}` : user.name}
        </div>
        <div className='w-11/12 mx-auto bg-white rounded-lg font-bold'>
          Level: {user.level} | Points: {user.points}
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
          {/* <div
            className={`flex items-center space-x-2 p-2 rounded-full hover:bg-theorange hover:opacity-90  cursor-pointer ${
              router.route === 'u/all-sadhanas' && 'bg-theorange text-black'
            }`}
          >
            <BiSearch className='transform -translate-y-0.5' />
            <Link href='/u/all-sadhanas'>Browse Zadhanas</Link>
          </div> */}
          <div
            className={`flex items-center space-x-2 p-2 rounded-full hover:bg-theorange hover:opacity-90  cursor-pointer ${
              router.route === 'u/all-sadhanas' && 'bg-purple text-black'
            }`}
          >
            <RxLapTimer className='transform -translate-y-0.5' />
            <Link href='/i/6'>Build the Ankyverse</Link>
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
          <Button
            className='hover:bg-thepurple'
            buttonText='Logout'
            buttonAction={signOut}
            buttonColor='bg-theredbtn'
          />
        </div>
      </div>
    </div>
  );
};

export default LeftNavbar;
