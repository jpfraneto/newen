import React, { useState } from 'react';
import { Righteous, Russo_One } from 'next/font/google';
import {
  BsInstagram,
  BsTwitter,
  BsWhatsapp,
  BsLink45Deg,
} from 'react-icons/bs';

import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarDay, FaClock, FaUserAstronaut } from 'react-icons/fa';
import { FiTarget } from 'react-icons/fi';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

const FinishedSadhanaComponent = ({
  sadhana,
  session,
  dayIndex,
  fetchSadhanaDayInfo,
}) => {
  const date = new Date();
  const timeZoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
  const localDate = new Date(date.getTime() + timeZoneOffset);
  return (
    <>
      {' '}
      <h4 className={`text-4xl text-blue-400 font-bold `}>{sadhana.title}</h4>
      <div className='flex flex-wrap wrap gap-x-3 justify-center'>
        <p className='flex gap-x-1 my-1 items-center text-white md:text-black'>
          <FaUserAstronaut size={20} />
          <Link
            className='text-blue-400 hover:underline'
            href={`/u/${sadhana.author.id}`}
          >
            @
            {sadhana.author?.username ||
              sadhana.author?.name ||
              sadhana.author?.email}
          </Link>
        </p>
        <p className='flex gap-x-1 my-1 text-white md:text-black items-center'>
          <FaClock size={20} />
          {Math.floor(sadhana.targetSessionDuration)} minutes
        </p>
        <p className='flex gap-x-1 my-1 text-white md:text-black items-center'>
          <FaCalendarDay size={20} />
          {localDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>{' '}
        <p className='flex gap-x-1 my-1 text-white md:text-black items-center'>
          <FiTarget size={20} />
          {sadhana.targetSessions}
        </p>
      </div>
      {session && session.user.id === sadhana.authorId && (
        <button
          className='bg-red-500 text-white font-bold py-2 px-4 rounded'
          onClick={() => deleteSadhana(sadhana.id)}
        >
          Delete Challenge
        </button>
      )}
      <p className='italic my-2 text-white md:text-black'>{sadhana.content}</p>
      <div className=' flex flex-wrap justify-center mb-3 pt-3'>
        {new Array(sadhana.targetSessions).fill(null).map((thisSession, i) => {
          return (
            <div
              key={i}
              className={` w-10 h-10 m-1 bg-green-600 border-black border-2 shadow-md flex items-center justify-center text-black  rounded-full font-bold text-xl cursor-pointer`}
              // onClick={() => {
              //   fetchSadhanaDayInfo(sadhana.id, i);
              // }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FinishedSadhanaComponent;
