import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DemoDashboardComponent from '@component/components/DemoDashboardComponent';

const session = {
  user: {
    id: 'guest-jp',
    name: 'Jorge Pablo Franetovic Stocker',
    username: 'jpfraneto',
    image:
      'https://pbs.twimg.com/profile_images/1647296029941813251/hDySquRC_400x400.jpg',
  },
  participatedSadhanas: [
    {
      id: 'guest-sadhana-0',
      title: 'Meditation',
      content:
        'Join us in a journey of self-discovery and inner peace as we practice daily meditation to reduce stress, improve focus, and enhance overall well-being.',
      userLimit: 1000,
      targetSessions: 90,
      targetSessionDuration: 20 * 60,
      periodicity: 'daily',
      startingTimestamp: '2023-04-01',
      isPrivate: false,
    },
    {
      id: 'guest-sadhana-1',
      title: 'Journaling',
      content:
        "Unlock the power of self-reflection and personal growth with the daily practice of journaling. Share your thoughts, emotions, and experiences as we collectively learn from one another's insights and perspectives.",
      userLimit: 1000,
      targetSessions: 90,
      targetSessionDuration: 20 * 60,
      periodicity: 'daily',
      startingTimestamp: '2023-04-01',
      isPrivate: false,
    },
    {
      id: 'guest-sadhana-2',
      title: 'Give a gift',
      content:
        "Cultivate kindness and generosity by giving a gift to someone every day. Together, we'll spread joy and positivity, making the world a better place one small act at a time.",
      userLimit: 1000,
      targetSessions: 180,
      targetSessionDuration: 1,
      periodicity: 'daily',
      startingTimestamp: '2023-04-01',
      isPrivate: false,
    },
    {
      id: 'guest-sadhana-3',
      title: 'Cold shower',
      content:
        'Embrace the invigorating power of cold showers to boost your energy, improve circulation, and strengthen your immune system. Join us as we challenge ourselves to step out of our comfort zones and reap the benefits of this revitalizing practice.',
      userLimit: 500,
      targetSessions: 30,
      targetSessionDuration: 3 * 60,
      periodicity: 'daily',
      startingTimestamp: '2023-04-01',
      isPrivate: false,
    },
    {
      id: 'guest-sadhana-3',
      title: '12 Hour Fasting',
      content:
        'Discover the benefits of intermittent fasting as we embark on a 12-hour fasting journey together. Improve your metabolism, support weight loss, and enhance mental clarity through this simple yet effective practice.',
      userLimit: 500,
      targetSessions: 30,
      targetSessionDuration: 0,
      periodicity: 'daily',
      startingTimestamp: '2023-04-01',
      isPrivate: false,
    },
    {
      id: 'guest-sadhana-3',
      title: 'Working on Buildspace Project',
      content:
        'Collaborate, innovate, and learn together as we work on a Buildspace project. Leverage the power of community to build something amazing, gain new skills, and expand your capacity for transforming your ideas into a reality',
      userLimit: 500,
      targetSessions: 30,
      targetSessionDuration: 100,
      periodicity: 'daily',
      startingTimestamp: '2023-04-01',
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
            src='https://pbs.twimg.com/profile_images/1647296029941813251/hDySquRC_400x400.jpg'
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
