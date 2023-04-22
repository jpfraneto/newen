import React from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
import Link from 'next/link';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const SadhanaInvitation = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [buttonText, setButtonText] = useState('Lets go!');

  async function handleParticipate() {
    try {
      setButtonText(`Joining sadhana...`);

      const response = await fetch('/api/sadhana/participate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sadhanaId: 1,
        }),
      });

      if (response.ok) {
        const responseInfo = await response.json();
        setButtonText(
          'You are in. You can come here and log your progress as soon as it starts, on monday 24th.'
        );
      } else {
        setButtonText('Error!');
      }
    } catch (error) {
      console.error('Error joining the sadhana:', error);
      setButtonText('There was an error');
    }
  }

  return (
    <div className='p-8 bg-gradient-to-r from-purple-400 via-pink-500 text-black to-red-500 min-h-screen flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg w-full max-w-3xl'>
        <p className='text-black'>
          You have been invited by <Link href='/u/kithkui'>@kithkui</Link> to
          participate in the following sadhana:
        </p>
        <h4
          className={`${righteous.className} text-2xl md:text-5xl w-full font-bold`}
        >
          Writing for 5 minutes / 5 days.
        </h4>
        <p>
          Do you want to commit to write for 5 days in a row? I will help you be
          consistent.
        </p>
        <div className='py-3'>
          {' '}
          {session ? (
            <button
              onClick={handleParticipate}
              className=' inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold  py-2 px-4 rounded shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
            >
              {buttonText}
            </button>
          ) : (
            <div>
              <p className='text-black'>You need to log in first to join.</p>
              <button
                className=' inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold  py-2 px-4 rounded shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
                onClick={signIn}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SadhanaInvitation;
