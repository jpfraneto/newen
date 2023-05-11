// NewNav.js
import React from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Russo_One } from 'next/font/google';
import Button from './Button';

const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

const PlayNav = ({ setNftdisplay }) => {
  const { data: session, loading } = useSession();
  const router = useRouter();
  return (
    <nav className='z-50 hover:cursor-pointer font-itim md:text-xl bg-thegreen flex items-center justify-between px-2 md:px-8'>
      <div className='text-2xl text-black pl-4 font-russo'>
        <Link className={`${russo.className} text-black`} href='/'>
          sadhana tv
        </Link>
      </div>
      <div className='flex items-center space-x-2 md:space-x-8 md:pr-6'>
        <Button
          buttonAction={() => setNftdisplay(prev => !prev)}
          buttonText='Wtf is this?'
        />
      </div>
    </nav>
  );
};

export default PlayNav;
