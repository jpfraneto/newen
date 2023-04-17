import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import prisma from '../../lib/prismaClient';
import Link from 'next/link';
import Image from 'next/image';

export default function SadhanaDetail({ sadhana }) {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();

  const [buttonText, setButtonText] = useState('Participate in Sadhana');
  const [participants, setParticipants] = useState(sadhana?.participants || []);
  const [selectedSession, setSelectedSession] = useState(null);
  const [dayForDisplay, setDayForDisplay] = useState(null);
  const [dayLoading, setDayLoading] = useState(false);
  const [displayDayInfo, setDisplayDayInfo] = useState(false);

  useEffect(() => {
    const loggedInUserId = session?.user.id;
    const isUserParticipating = participants.some(
      participant => participant.id === loggedInUserId
    );

    if (isUserParticipating) {
      setButtonText('Joined!');
    }
  }, [session, participants]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const loggedInUserId = session?.user.id;
  const isUserParticipating = sadhana.participants?.some(
    participant => participant.id === loggedInUserId
  );

  async function fetchSadhanaDayInfo(sadhanaId, dayNumber) {
    setDayLoading(true);
    setDisplayDayInfo(true);
    const response = await fetch(`/api/sadhana/${sadhanaId}/day/${dayNumber}`);

    const data = await response.json();
    setDayForDisplay(data.sadhanaDay);
    setDayLoading(false);
  }

  async function handleParticipate() {
    try {
      setButtonText(`Joining ${participants.length} others...`);

      const response = await fetch('/api/sadhana/participate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sadhanaId: sadhana.id,
        }),
      });

      if (response.ok) {
        const responseInfo = await response.json();
        setParticipants([...responseInfo.participants]);
        setButtonText('Joined!');
      } else {
        setButtonText('Error!');
      }
    } catch (error) {
      console.error('Error joining the sadhana:', error);
      setButtonText('There was an error');
    }
  }

  if (!sadhana)
    return (
      <div className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen text-black py-8 px-60'>
        <p>
          Unable to find this sadhana, please refresh the page or create a new
          one <Link href='/sadhana/new'>here</Link>
        </p>
      </div>
    );

  return (
    <div className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen text-black py-8 px-4 md:px-16 lg:px-60'>
      <div className='container text-center'>
        {' '}
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <h2 className='text-xl font-semibold mb-4'>{sadhana.title}</h2>
          <p className='italic mb-2'>{sadhana.content}</p>
          <p>
            Author:{' '}
            <Link
              className='text-blue-500 hover:underline'
              href={`/u/${sadhana.author.id}`}
            >
              @{sadhana.author.username}
            </Link>
          </p>
          <p>Target Sessions: {sadhana.targetSessions}</p>
          <p>
            Target Session Duration:{' '}
            {Math.floor(sadhana.targetSessionDuration / 60)} minutes
          </p>
          <p>Periodicity: {sadhana.periodicity}</p>
          <p>
            Starting Timestamp:{' '}
            {new Date(sadhana.startingTimestamp).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p>
            Users: {participants?.length}/{sadhana.userLimit}
          </p>
          <div className='flex items-center mb-4'>
            {participants?.map(participant => (
              <div
                key={participant.id}
                className='text-center hover:cursor-pointer'
              >
                <Image
                  src={participant.image}
                  onClick={() => router.push(`/u/${participant.id}`)}
                  alt={participant.name}
                  width={300}
                  height={300}
                  className='w-24 h-24 rounded-full mr-2'
                  title={participant.name}
                />
              </div>
            ))}
          </div>
          <div className='flex overflow-x-scroll space-x-1 mb-3'>
            {Array.from({ length: sadhana.targetSessions }, (_, i) => (
              <div
                key={i}
                className='flex flex-nowrap items-center justify-center px-2 py-1 bg-blue-500 rounded-full text-white font-bold text-xl cursor-pointer'
                onClick={() => fetchSadhanaDayInfo(sadhana.id, i + 1)}
              >
                {i + 1}
              </div>
            ))}
          </div>
          {displayDayInfo && (
            <>
              {dayLoading ? (
                <div className='mb-10'>
                  Loading the information of this day...
                </div>
              ) : (
                <div className='mb-10'>
                  {' '}
                  {dayForDisplay ? (
                    <SadhanaDayInfo sadhanaDay={dayForDisplay} />
                  ) : (
                    <p>This day doesnt have any info yet.</p>
                  )}
                </div>
              )}
            </>
          )}
          {session ? (
            <>
              {isUserParticipating ? (
                <></>
              ) : (
                <>
                  {buttonText === 'Joined!' ? (
                    <button
                      className='mt-4 bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      disabled
                    >
                      {buttonText}
                    </button>
                  ) : (
                    <button
                      className='mt-4 bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      onClick={handleParticipate}
                    >
                      {buttonText}
                    </button>
                  )}
                </>
              )}
            </>
          ) : (
            <button
              className='mt-4 bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              onClick={signIn}
            >
              If you log in, you can participate in this sadhana.
            </button>
          )}
          <div className='flex flex-row'>
            {' '}
            <Link
              href='/sadhana'
              className='m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto'
            >
              Go to sadhanas
            </Link>
            <Link
              href='/'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto'
            >
              Back to landing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const sadhanas = await prisma.sadhana.findMany();

  const paths = sadhanas.map(sadhana => ({
    params: { id: sadhana.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const sadhana = await prisma.sadhana.findUnique({
    where: { id: parseInt(params.id) },
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

function SadhanaDayInfo({ sadhanaDay }) {
  return (
    <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <h2 className='text-xl font-semibold mb-4'>Day {sadhanaDay.dayIndex}</h2>
      <p className='italic mb-2'>Participants Ready:</p>
      <div className='flex items-center mb-4'>
        {sadhanaDay.sessions.map(session => (
          <div
            key={session.authorId}
            className='text-center hover:cursor-pointer'
          >
            <Image
              src={session.author.image}
              onClick={() => router.push(`/u/${session.authorId}`)}
              alt={session.author.username}
              width={300}
              height={300}
              className='w-24 h-24 rounded-full mr-2'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
