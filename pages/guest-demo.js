import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DemoDashboardComponent from '@component/components/DemoDashboardComponent';

const session = {
  user: {
    id: 'guest-elonmusk',
    name: 'Elon Musk',
    username: 'elonmusk',
    image:
      'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg',
  },
  participatedSadhanas: [
    {
      id: 'guest-sadhana-0',
      title: 'Play PS5',
      content: 'Just have fun playing playstation.',
      userLimit: 1000,
      targetSessions: 90,
      targetSessionDuration: 10,
      periodicity: 'daily',
      startingTimestamp: '2023-03-12',
      isPrivate: false,
    },
    {
      id: 'guest-sadhana-1',
      title: 'Tesla: Sustainable Energy Transition Deep Work Session',
      content:
        "Together, we're going to make the world's energy consumption more sustainable by sharing ideas, designs, and projects related to Tesla and clean energy technologies.",
      userLimit: 1000,
      targetSessions: 90,
      targetSessionDuration: 60,
      periodicity: 'daily',
      startingTimestamp: '2023-04-01',
      isPrivate: false,
    },
    {
      id: 'guest-sadhana-2',
      title: 'SpaceX: Reaching for the Stars Deep Work Session',
      content:
        "Join me on this journey to the stars as we explore cutting-edge concepts and developments in rocket technology and space travel. Together, let's create a future where humanity is a multiplanetary species.",
      userLimit: 1000,
      targetSessions: 180,
      targetSessionDuration: 60,
      periodicity: 'daily',
      startingTimestamp: '2023-04-15',
      isPrivate: false,
    },
    {
      id: 'guest-sadhana-3',
      title: 'Twitter: Fixing the Internet Deep Work Session',
      content:
        "In this sadhana, we'll leverage the power of Twitter to engage with people from all walks of life, share our ideas, and gather valuable feedback to fuel innovation and growth.",
      userLimit: 500,
      targetSessions: 30,
      targetSessionDuration: 30,
      periodicity: 'daily',
      startingTimestamp: '2023-04-20',
      isPrivate: false,
    },
  ],
};

const GuestDemo = () => {
  return (
    <div className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen'>
      <div className=' w-8/12 m-auto py-8'>
        <div className='text-black flex flex-col justify-items-center items-center py-4'>
          <h2 className='text-2xl font-bold'>
            Dashboard | @{session.user.username}
          </h2>
          <small>
            This is a demo. If you want to actually use this, please login using
            twitter with the button at the top right corner.
          </small>
          <Image
            width={111}
            height={111}
            src='https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg'
            className='rounded-full mt-2'
            alt='Profile picture'
          />
        </div>
        <DemoDashboardComponent session={session} />
        <Link
          className='mx-3 inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-2xl px-6 py-3 mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
          href='/'
        >
          Back to Landing
        </Link>
      </div>
    </div>
  );
};

export default GuestDemo;
