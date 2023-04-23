import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-slate-900 text-white text-center py-2'>
      This project is being developed by{' '}
      <a
        href='https://twitter.com/kithkui'
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-500'
      >
        @kithkui
      </a>{' '}
      with as much care as possible. If you have any feedback, please reach me
      out on Twitter. I need your help.
    </footer>
  );
};

export default Footer;
