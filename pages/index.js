import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const LandingPage = () => {
  const sampleChallenges = [
    {
      title: '30 Days of Meditation',
      description: 'Just sit 10 minutes daily.',
      image: '/images/meditationanky.png',
    },
    {
      title: 'Journalling',
      description: '20 minutes of writing what comes to mind.',
      image: '/images/journallinganky.png',
    },
    {
      title: '21 days of Sunrise Walking',
      description: 'Go outside for the sunrise and enjoy the morning breeze.',
      image: '/images/walkinganky.png',
    },
  ];
  return (
    <div className=' text-black mx-auto '>
      <section className='text-center'>
        <div className='flex flex-col md:flex-row items-center justify-center w-full px-4'>
          <div className='flex flex-col pl-0 pt-2  md:pb-8 md:pl-8 text-center  w-full md:w-1/2 md:aspect-auto fade-in'>
            <h1 className='text-4xl font-bold mb-4 mt-10 md:mt-0'>
              Train Your capacity of being consistent.
            </h1>
            <p className='text-lg'>
              Join Sadhana, a powerful platform to develop mastery in your
              creative and self-evolution pursuits.
            </p>
            <Link
              href='/s/new'
              className='mt-4 mb-0 w-fit mx-auto bg-[#009FE3] py-2 px-6 rounded-lg font-semibold text-xl text-white hover:bg-[#E6007E] hover:text-black transition-colors duration-300'
            >
              Begin Your Adventure*
              <br />
              <small className='text-xs'>*Add your first challenge</small>
            </Link>
            <br />
          </div>
          <div className='relative rounded-full w-full  md:w-1/2 md:mb-6 h-[100vw] md:h-[90vh]'>
            <Image
              src='/images/landingheroimage.png'
              alt='People being consistent'
              className='mx-auto rounded-full mb-2 p-10'
              fill
              contain
            />
          </div>
        </div>
      </section>

      <section className='bg-gray-200 px-20 md:px-0 py-20 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
        <div className='text-center'>
          <Image
            src='/images/community.png'
            alt='Community'
            className='mx-auto rounded-full mb-2'
            width={300}
            height={200}
          />
          <h2 className='text-2xl font-semibold mb-4'>Supportive Community</h2>
          <p>
            Connect with like-minded people, share your progress, and motivate
            each other.
          </p>
        </div>
        <div className='text-center'>
          <Image
            src='/images/aiguidance.png'
            alt='AI Guidance'
            className='mx-auto rounded-full mb-2'
            width={300}
            height={200}
          />
          <h2 className='text-2xl font-semibold mb-4'>AI-Powered Guidance</h2>
          <p>
            Receive personalized AI guidance to help you overcome challenges and
            grow as a creator.
          </p>
        </div>
        <div className='text-center'>
          <Image
            src='/images/creativity.png'
            className='mx-auto rounded-full mb-2'
            alt='Challenges'
            width={300}
            height={200}
          />
          <h2 className='text-2xl font-semibold mb-4'>Engaging Challenges</h2>
          <p>
            Participate in unique challenges designed to foster skill
            development and self-expression.
          </p>
        </div>
      </section>

      <section className='text-center pt-5 pb-20 px-20 md:px-0'>
        <h2 className='text-2xl font-semibold mb-4'>Join Sadhana Today</h2>
        <p className='text-lg mb-6'>
          Don&apos;t miss your chance to be part of a revolutionary movement in
          online creativity and personal growth.
        </p>
        <button
          onClick={signIn}
          className='bg-blue-500 text-white font-bold py-2 px-4 rounded'
        >
          Sign Up Now
        </button>
      </section>

      <section className='h-fit flex flex-col md:py-20 bg-gray-200 flex items-center '>
        <div className='h-[90vh] aspect-square relative'>
          <Image src='/images/ankydancing222.png' alt='Anky' fill />
        </div>

        <div className='text-center px-20 md:px-0 pb-10 md:pb-0 md:px-20'>
          <h2 className='text-2xl font-semibold mb-4 mt-10  md:mt-0'>
            Meet Anky, Your Accountability Buddy
          </h2>
          <p>
            Anky is here to guide you through your daily tasks, providing a
            gentle nudge to stay on track and focused on your creative pursuits.
          </p>
        </div>
      </section>

      <section className='h-fit py-20 flex items-center justify-center'>
        <div className='text-center mx-auto w-8/12'>
          <h2 className='text-2xl font-semibold mb-4'>About Sadhana</h2>
          <p>
            Sadhana is a platform where people can challenge themselves, connect
            with friends, and engage with creators from all around the world.
            Through unique challenges, Sadhana aims to help individuals discover
            their true selves and unlock their hidden potential. Join us on this
            journey of self-discovery and personal growth.
          </p>
        </div>
      </section>

      <section className='h-fit bg-gray-200 py-20'>
        <h2 className='text-2xl font-semibold text-center mb-8'>
          Create your own challenge
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {sampleChallenges.map((challenge, index) => (
            <div key={index} className='text-center'>
              <Image
                className='mx-auto rounded-full mb-2'
                src={challenge.image}
                alt={challenge.title}
                width={222}
                height={222}
              />
              <h3 className='text-xl font-semibold mb-4'>{challenge.title}</h3>
              <p>{challenge.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='h-fit py-20 px-20 md:px-0 flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-semibold mb-4'>
          Start Your Journey Today
        </h2>
        <p className='text-lg mb-8'>
          Commit to your first challenge and unlock your full potential:
        </p>
        <ol className='list-decimal list-inside mb-8'>
          <li className='mb-4'>
            Choose a challenge that resonates with you and your goals.
          </li>
          <li className='mb-4'>
            Set a clear and achievable commitment to work on the challenge
            consistently.
          </li>
          <li className='mb-4'>
            Track your progress and engage with the community for support and
            motivation.
          </li>
        </ol>
        <Link
          href='/s/new'
          className='mt-4 mb-0 w-fit mx-auto bg-[#009FE3] py-2 px-6 rounded-lg font-semibold text-xl text-white hover:bg-[#E6007E] hover:text-black transition-colors duration-300'
        >
          Begin Your Adventure*
          <br />
          <small className='text-xs'>*Add your first challenge</small>
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
