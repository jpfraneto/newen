// LandingPage.js
import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  const challenges = [
    '21 days of going vegan',
    '100 days of programming',
    '5 days of calling your dad',
    '33 days of AI',
    '10 days of meditation',
    'Other',
  ];
  return (
    <div className='min-h-[calc(100vh)]'>
      <div
        className='text-white h-screen bg-black bg-opacity-20 bg-cover bg-center flex flex-col items-center  space-y-8'
        style={{ backgroundImage: 'url(/images/ankybg.png)' }}
      >
        <div className='text-center pt-16 mb-48'>
          <h1 className='text-6xl md:text-7xl font-bold space-x-4 mb-0'>
            <span className='font-luckiestguy'>DISCIPLINE IS</span>
            <span className='ml-2 font-londrinashadow'>FREEDOM.</span>
          </h1>
          <p className='font-itim px-4 md:px-0 text-xl md:max-w-xl mx-auto mt-0'>
            Sadhana is where consistency paves the way out of depression. Join
            like-minded people in challenges that empower you to explore your
            boundaries.
          </p>
        </div>
        <div className='space-y-2 mt-40 text-center '>
          <p className='font-itim text-xl mb-0'>
            Which will be your next challenge?
          </p>

          <form className='flex flex-wrap text-sm md:text-xl mb-4 max-w-4xl justify-center space-x-8'>
            {challenges.map((x, i) => {
              return (
                <div key={i} className='flex items-center mt-2'>
                  <input
                    type='checkbox'
                    name={`checkbox-${i}`}
                    id={`checkbox-${i}`}
                    className='bg-red-300 hover:bg-pink-400 cursor-pointer
    md:w-8 md:h-8 h-4 w-4 border-3 border-rose-500 rounded-lg checked:bg-rose-600'
                  />
                  <label htmlFor={`checkbox-${i}`} className='ml-3'>
                    {x}
                  </label>
                </div>
              );
            })}
          </form>
          <div className='mt-4 '>
            {' '}
            <Link
              href='/s/new'
              className='font-itim mt-0 text-2xl text-black bg-theorange px-4 py-2 rounded hover:opacity-90'
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
