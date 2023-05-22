import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import Button from '@component/components/Button';
import Layout from '@component/components/Layout';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
import Link from 'next/link';
import prisma from '@component/lib/prismaClient';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const SadhanaInvitation = ({ sadhana }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [buttonText, setButtonText] = useState('Lets go!');
  const [signedUpToSadhana, setSignedUpToSadhana] = useState(false);
  const [isUserParticipating, setIsUserParticipating] = useState(false);

  useEffect(() => {
    if (!session) return;

    const participate = sadhana?.participants.filter(
      x => x.id === session.user.id
    );
    if (participate.length > 0) setIsUserParticipating(true);
  }, [session, sadhana]);

  async function handleParticipate() {
    try {
      setButtonText(`Joining sadhana...`);

      const response = await fetch('/api/sadhana/participate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sadhanaId: router.query.sadhanaId,
        }),
      });

      if (response.ok) {
        const responseInfo = await response.json();
        setButtonText('You are in. Click here to go to the sadhana page.');
        setSignedUpToSadhana(true);
      } else {
        setButtonText('Error!');
      }
    } catch (error) {
      console.error('Error joining the sadhana:', error);
      setButtonText('There was an error');
    }
  }
  const handleInviteFriends = async () => {
    const text = `https://www.sadhana.lat/i/${router.query.sadhanaId}`;

    await navigator.clipboard.writeText(text);
    alert('The link was copied.');
  };

  if (!sadhana) return <p>There was a problem...</p>;

  return (
    <div
      className='h-screen flex text-thewhite items-center justify-center bg-cover bg-center'
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url('/images/ankyinvitation.png')",
      }}
    >
      <div>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-50' />
        <div className='absolute min-h-screen top-0 left-0 w-full h-full flex  justify-center text-center p-2'>
          <div className='relative md:pt-20 z-10 text-white mx-auto max-w-3xl'>
            <p className='text-lg md:text-2xl font-bold mb-0'>
              An epic journey awaits.
            </p>
            <p className='text-lg md:text-2xl font-bold mb-2'>
              I&apos;m Anky, and I will walk by your side.
            </p>

            <h4
              className={`${righteous.className} text-4xl md:text-6xl font-bold mb-40`}
            >
              {sadhana.title}
            </h4>

            {isUserParticipating ? (
              <>
                <p className='text-base md:text-lg mb-4'>
                  You are already part of this sadhana.
                </p>
                <div className='py-3 flex space-x-4 justify-center'>
                  <Button
                    buttonAction={() => router.push(`/s/${sadhana.id}`)}
                    buttonText='Visit'
                  />
                  <Button
                    buttonAction={() => router.push(`/dashboard`)}
                    buttonText='Go to your Dashboard'
                    buttonColor='bg-thegreen'
                  />
                </div>
              </>
            ) : (
              <>
                <p className='text-base md:text-lg mb-4'>
                  Will you commit to {sadhana.targetSessions} days of this
                  challenge, devoting a minimum of{' '}
                  {sadhana.targetSessionDuration} minutes each day? Embark on
                  this journey. You will strengthen, resolve and accomplish your
                  goals with the power of your own determination.
                </p>
                {session ? (
                  <div className='flex space-x-3  flex-wrap justify-center'>
                    {signedUpToSadhana ? (
                      <>
                        <Button
                          buttonText={buttonText}
                          buttonAction={handleParticipate}
                        />
                        <Button
                          buttonText='Invite your friends'
                          buttonAction={handleInviteFriends}
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          buttonAction={() =>
                            router.push(`/s/${router.query.sadhanaId}`)
                          }
                          buttonText={buttonText}
                        />
                        <Button
                          buttonAction={handleInviteFriends}
                          buttonText='Invite your friends'
                        />
                      </>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className='text-black'>
                      You need to login to participate.
                    </p>
                    <Button buttonAction={signIn} buttonText='Login' />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SadhanaInvitation;

export async function getStaticPaths() {
  const sadhanas = await prisma.sadhana.findMany();

  const paths = sadhanas.map(sadhana => ({
    params: { sadhanaId: sadhana.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const sadhana = await prisma.sadhana.findUnique({
    where: { id: parseInt(params.sadhanaId) },
    include: {
      author: true,
      participants: true,
    },
  });

  return {
    props: {
      sadhana: JSON.parse(JSON.stringify(sadhana)),
    },
    revalidate: 60,
  };
}
