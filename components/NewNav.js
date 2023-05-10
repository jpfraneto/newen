// NewNav.js
import React from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Button from './Button';

const NewNav = () => {
  const { data: session, loading } = useSession();
  const router = useRouter();
  return (
    <nav className='z-50 hover:cursor-pointer font-itim md:text-xl bg-thegreen h-16 flex items-center justify-between px-2 md:px-8'>
      <div className='text-2xl text-black pl-4 font-russo'>
        <Link className='' href='/'>
          sadhana
        </Link>
      </div>
      <div className='flex items-center space-x-2 md:space-x-8 md:pr-6'>
        <Link className='text-black hover:opacity-60' href='/s'>
          All Challenges {/* change here */}
        </Link>
        <Link
          className='hidden hover:opacity-60 md:block text-black'
          href='/about'
        >
          About
        </Link>
        {session ? (
          <Button
            buttonText='Dashboard'
            buttonAction={() => router.push('/dashboard')}
          />
        ) : (
          <Button buttonAction={signIn} buttonText='Sign In' />
        )}
      </div>
    </nav>
  );
};

export default NewNav;
