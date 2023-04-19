import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Comments from '@component/components/Comments';
import SadhanaUpdate from '@component/components/SadhanaUpdate';
import prisma from '../../../lib/prismaClient';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaUsers,
  FaCalendarDay,
  FaClock,
  FaUserAstronaut,
} from 'react-icons/fa';
import { calculateDayIndex } from '@component/lib/functions';
import SadhanaDayTimer from '@component/components/SadhanaDayTimer';

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
  const [updates, setUpdates] = useState([]);

  const dayIndex = calculateDayIndex(sadhana?.startingTimestamp) + 1;

  useEffect(() => {
    const loggedInUserId = session?.user.id;
    const isUserParticipating = participants.some(
      participant => participant.id === loggedInUserId
    );

    if (isUserParticipating) {
      setButtonText('Joined!');
    }
  }, [session, participants]);

  useEffect(() => {
    const fetchUpdates = async () => {
      const response = await fetch(`/api/sadhana/${id}/updates`);
      const data = await response.json();
      setUpdates(data);
    };

    if (id) {
      fetchUpdates();
    }
  }, [id]);

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

  const getDayFormatting = (index, todayIndex) => {
    if (todayIndex < index) {
      return 'bg-red-300  hover:cursor-not-allowed';
    } else if (todayIndex === index) {
      return 'bg-green-600 border-black border-2 shadow-md';
    } else {
      return 'bg-green-300 hover:bg-green-500';
    }
  };

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
          <h2 className='text-xl font-semibold '>{sadhana.title}</h2>
          <div className='flex gap-x-3 justify-center'>
            {' '}
            <p className='flex gap-x-1 items-center'>
              <FaUserAstronaut />
              <Link
                className='text-blue-500 hover:underline'
                href={`/u/${sadhana.author.id}`}
              >
                @{sadhana.author.username}
              </Link>
            </p>
            <p className='flex gap-x-1 items-center'>
              <FaClock />
              {Math.floor(sadhana.targetSessionDuration)} minutes
            </p>
            <p className='flex gap-x-1 items-center'>
              <FaCalendarDay />
              {new Date(sadhana.startingTimestamp).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className='flex gap-x-1 items-center'>
              <FaUsers /> {participants?.length}/{sadhana.userLimit}
            </p>
          </div>
          <p className='italic mb-2'>{sadhana.content}</p>

          <h2 className='text-xl font-semibold mb-2 text-left'>Users:</h2>
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
                  width={200}
                  height={200}
                  className='w-16 h-16 rounded-full mr-2'
                  title={participant.name}
                />
              </div>
            ))}
          </div>
          {dayIndex < 0 ? (
            <p>This sadhana starts in {dayIndex * -1} days.</p>
          ) : (
            <div className='bg-gray-200 mb-2 p-4 rounded-xl text-white '>
              <h2 className='mb-3'>
                Today is day {dayIndex} of this challenge
              </h2>
              <div className='flex flex-wrap justify-left overflow-x-scroll mb-3'>
                {Array.from({ length: sadhana.targetSessions }, (_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 m-1 flex items-center justify-center text-black ${getDayFormatting(
                      i + 1,
                      dayIndex
                    )}  rounded-full font-bold text cursor-pointer`}
                    onClick={() => {
                      if (i <= dayIndex) fetchSadhanaDayInfo(sadhana.id, i);
                    }}
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
                      {/* <SadhanaUpdate
                        update={updates.find(
                          update => update.dayIndex === sadhana.activeDay
                        )}
                      /> */}
                      {dayForDisplay ? (
                        <SadhanaDayInfo
                          sadhanaDay={dayForDisplay}
                          currentUser={session.user}
                        />
                      ) : (
                        <p>This day doesnt have any info yet.</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {session ? (
            <>
              {isUserParticipating ? (
                <SadhanaDayTimer sadhana={sadhana} />
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
          <div className='flex flex-row items-center justify-center'>
            {' '}
            <Link
              href='/sadhana'
              className='m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Go to sadhanas
            </Link>
            <Link
              href='/'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline '
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
      updates: true,
    },
  });

  return {
    props: {
      sadhana: JSON.parse(JSON.stringify(sadhana)),
    },
    revalidate: 60,
  };
}

function SadhanaDayInfo({ sadhanaDay, currentUser }) {
  const [sadhanaDayComments, setSadhanaDayComments] = useState(
    sadhanaDay.comments
  );
  return (
    <div className='bg-gray-200 shadow-xl border-2 border-black rounded px-8 pt-6 pb-8 mb-4'>
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
      <Comments
        sadhanaDayId={sadhanaDay.id}
        sadhanaId={sadhanaDay.sadhanaId}
        dayNumber={sadhanaDay.dayIndex}
        sadhanaDayComments={sadhanaDayComments}
        setSadhanaDayComments={setSadhanaDayComments}
        currentUser={currentUser}
      />
    </div>
  );
}
