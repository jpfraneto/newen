import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='bg-black flex flex-col items-center sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div className='flex justify-between h-16 items-center'>
          <Link href='/'>S</Link>
          <div className='hidden md:flex items-center space-x-4'>
            <Link href='/sadhana'>Challenges</Link>
            <Link href='/sadhana/new'>New</Link>
            <Link href='/sadhana/new'>Dashboard</Link>
          </div>
          <button
            onClick={toggleMenu}
            className='md:hidden bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
            <svg
              className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:hidden w-full bg-black`}
      >
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-end'>
          <Link href='/sadhana'>Challenges</Link>
          <Link href='/sadhana/new'>New</Link>
          <Link href='/sadhana/new'>Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
