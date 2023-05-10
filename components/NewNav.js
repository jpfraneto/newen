// Navbar.js
import React from 'react';
import Link from 'next/link';

const NewNav = () => {
  return (
    <nav className='font-itim md:text-xl bg-thegreen h-16 flex items-center justify-between px-2 md:px-8'>
      <div className='text-2xl text-black pl-4 font-russo'>sadhana</div>
      <div className='flex items-center space-x-2 md:space-x-8'>
        <Link href='/s' className='text-black'>
          All Challenges
        </Link>
        <a href='/about' className='text-black'>
          About
        </a>
        <button className='bg-theorange text-black border border-black md:w-[126px] px-2 py-1 md:px-4 md:py-2 rounded-xl'>
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default NewNav;
