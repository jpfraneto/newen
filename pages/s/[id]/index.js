import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Righteous, Russo_One } from 'next/font/google';
import SadhanaUpdate from '@component/components/SadhanaUpdate';
import { BsInstagram, BsTwitter, BsWhatsapp } from 'react-icons/bs';

import SadhanaDayTimer from '@component/components/SadhanaDayTimer';
import SadhanaDayInfo from '@component/components/SadhanaDayInfo';
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
import WelcomeScreen from '@component/components/WelcomeScreen';
import Spinner from '@component/components/Spinner';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

export default function SadhanaDetail({ sadhana, participantsData }) {
  const router = useRouter();
  const id = sadhana?.id || null;
  const { data: session, status } = useSession();
  const [buttonText, setButtonText] = useState('Participate');
  const [participants, setParticipants] = useState(participantsData);
  const [selectedSession, setSelectedSession] = useState(null);
  const [dayForDisplay, setDayForDisplay] = useState(null);
  const [dayLoading, setDayLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(
    sadhana?.targetSessionDuration || 0
  );
  const [isUserParticipating, setIsUserParticipating] = useState(false);
  const [displayDayInfo, setDisplayDayInfo] = useState(false);
  const [chosenDayIndex, setChosenDayIndex] = useState(
    calculateDayIndex(sadhana?.startingTimestamp) + 1
  );
  const [updates, setUpdates] = useState([]);
  const dayIndex = calculateDayIndex(sadhana?.startingTimestamp) + 1;

  useEffect(() => {
    if (!session) return;
    setIsUserParticipating(
      sadhana?.participants?.some(
        participant => participant.id === session?.user.id
      )
    );
  }, [session]);

  useEffect(() => {
    const fetchUpdates = async () => {
      const response = await fetch(`/api/sadhana/${id}/updates`);
      const data = await response.json();
      setUpdates(data);
    };

    if (id) {
      fetchUpdates();
    }
  }, [id, router]);

  const loggedInUserId = session?.user?.id || null;

  const checkIfUserDidTheWork = () => {
    if (!session?.user) return false;
    const thisDay = sadhana?.sadhanaDays?.filter(
      x => x.dayIndex === dayIndex
    )?.[0];
    if (!thisDay) return false;
    const aloja = thisDay.sessions?.filter(
      x => x.authorId === session.user.id
    )?.[0];
    if (aloja) {
      console.log('This means that the user did the work today');
      return true;
    } else {
      console.log('This means that the user has not done the work.');
      return false;
    }
  };

  async function fetchSadhanaDayInfo(sadhanaId, dayNumber) {
    setChosenDayIndex(dayNumber + 1);
    setDayLoading(true);
    setDisplayDayInfo(true);

    const thisDay = sadhana.sadhanaDays.filter(
      x => x.dayIndex === dayNumber + 1
    )[0];

    setDayForDisplay(thisDay);
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
        setIsUserParticipating(true);
      } else {
        setButtonText('Error!');
      }
    } catch (error) {
      console.error('Error joining the sadhana:', error);
      setButtonText('There was an error');
    }
  }

  const getDayFormatting = (index, todayIndex) => {
    const str = '';
    if (chosenDayIndex === index) return 'bg-blue-300';
    if (todayIndex < index) {
      return str + 'bg-red-300  hover:cursor-not-allowed';
    } else if (todayIndex === index) {
      return str + 'bg-green-600 border-black border-2 shadow-md';
    } else {
      return str + 'bg-green-300 hover:bg-green-500';
    }
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!sadhana)
    return (
      <div className='bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 min-h-screen text-black py-8 px-60'>
        <p>
          Unable to find this sadhana, please refresh the page or create a new
          one <Link href='/s/new'>here</Link>
        </p>
      </div>
    );

  return (
    <div className='bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 min-h-screen text-black py-8 md:px-16 lg:px-60'>
      <div className='container text-center'>
        {' '}
        <div
          className={`${russo.className} bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 blocktext-gray-700 text-sm font-bold mb-4 text-black`}
        >
          <HeaderComponent
            sadhana={sadhana}
            participants={participants}
            dayIndex={dayIndex}
          />
          <Participants participants={participants} />

          {dayIndex < 0 ? (
            <p
              className={`${russo.className} blocktext-gray-700 text-sm font-bold  text-black`}
            >
              This sadhana starts in {dayIndex * -1} days.
            </p>
          ) : (
            <div className='border-2 border-gray-300 bg-gray-200 mb-2 p-4 rounded-xl '>
              {!isUserParticipating ? (
                <>
                  {' '}
                  {status === 'loading' ? (
                    <Spinner />
                  ) : (
                    <>
                      {session ? (
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
                      ) : (
                        <>
                          {' '}
                          <button
                            className='mt-4 bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            onClick={signIn}
                          >
                            If you log in, you can join.
                          </button>
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className=' flex flex-wrap justify-left overflow-x-scroll mb-3'>
                    {Array.from({ length: sadhana.targetSessions }, (_, i) => (
                      <div
                        key={i}
                        className={` w-8 h-8 m-1 flex items-center justify-center text-black ${getDayFormatting(
                          i + 1,
                          dayIndex
                        )}  rounded-full font-bold text cursor-pointer `}
                        onClick={() => {
                          if (i < dayIndex)
                            return fetchSadhanaDayInfo(sadhana.id, i);
                          else if (i === dayIndex)
                            return alert('this day is today!');
                          else {
                            return alert('This day is in the future!');
                          }
                        }}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  {dayIndex === chosenDayIndex && (
                    <div>
                      {true ? (
                        <div>
                          {displayDayInfo ? (
                            <>
                              {dayLoading ? (
                                <div className='mb-10'>
                                  <p
                                    className={`${russo.className} blocktext-gray-700 text-sm font-bold  text-black`}
                                  >
                                    Loading the information of this day...
                                  </p>
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
                                    <>
                                      <h4
                                        className={`${righteous.className}  text-4xl font-bold mb-2 `}
                                      >
                                        Day {chosenDayIndex}
                                      </h4>
                                      {chosenDayIndex === 1 ? (
                                        <p>
                                          No one has done the work of today yet.
                                        </p>
                                      ) : (
                                        <p>No one did the work this day.</p>
                                      )}
                                    </>
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <div>
                          {isUserParticipating ? (
                            <p>
                              <SadhanaDayTimer
                                session={session}
                                timeRemaining={timeRemaining}
                                setTimeRemaining={setTimeRemaining}
                              />
                            </p>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          <div className='flex flex-row items-center justify-center'>
            {' '}
            <Link
              href='/s'
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
      sadhanaDays: {
        include: {
          sessions: { include: { author: true } },
          comments: { include: { author: true } },
        },
      },
    },
  });

  return {
    props: {
      sadhana: JSON.parse(JSON.stringify(sadhana)),
      participantsData: JSON.parse(JSON.stringify(sadhana.participants)),
    },
    revalidate: 60,
  };
}

function Participants({ participants }) {
  const router = useRouter();
  return (
    <div className='flex items-center mb-4'>
      {participants?.map(participant => (
        <div key={participant.id} className='text-center hover:cursor-pointer'>
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
  );
}

function HeaderComponent({ sadhana, participants, dayIndex }) {
  const handleShare = platform => {
    switch (platform) {
      case 'twitter':
        shareOnTwitter();
        break;
      case 'instagram':
        shareOnInstagram();
        break;
      case 'whatsapp':
        shareOnWhatsApp();
        break;
    }
  };

  const shareOnTwitter = () => {
    const text = `I want to challenge to a ${sadhana.targetSessions} day challenge, doing X. Each session will last ${sadhana.targetSessionDuration} minutes.\n\nLets do this together!\n\nHere you can sign up:\n\nhttps://www.sadhana.lat/invitation/${sadhana.id}`;

    const url =
      'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);

    window.open(url, '_blank');
  };

  const shareOnInstagram = () => {
    alert(
      'To share on Instagram, please create an Instagram story and add the link to your story.'
    );
  };

  const shareOnWhatsApp = () => {
    const text = `I want to challenge to a ${sadhana.targetSessions} day challenge, doing X. Each session will last ${sadhana.targetSessionDuration} minutes.\n\nLets do this together!\n\nHere you can sign up:\n\nhttps://www.sadhana.lat/invitation/${sadhana.id}`;
    const url =
      'https://api.whatsapp.com/send?text=' + encodeURIComponent(text);
    window.open(url, '_blank');
  };
  return (
    <>
      {' '}
      <h4
        className={`${righteous.className} text-4xl font-bold mb-2 text-black`}
      >
        {sadhana.title} -{' '}
        {dayIndex < 0
          ? `This challenge starts in ${dayIndex * -1} day(s)`
          : `Today is day ${dayIndex} of this challenge`}
      </h4>
      <div className='flex gap-x-3 justify-center'>
        {' '}
        <p className='flex gap-x-1 items-center'>
          <FaUserAstronaut size={20} />
          <Link
            className='text-blue-500 hover:underline'
            href={`/u/${sadhana.author.id}`}
          >
            @{sadhana.author.username || sadhana.author.name}
          </Link>
        </p>
        <p className='flex gap-x-1 items-center'>
          <FaClock size={20} />
          {Math.floor(sadhana.targetSessionDuration)} minutes
        </p>
        <p className='flex gap-x-1 items-center'>
          <FaCalendarDay size={20} />
          {new Date(sadhana.startingTimestamp).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p className='flex gap-x-1 items-center'>
          <FaUsers size={20} /> {participants?.length}/{sadhana.userLimit}
        </p>
        <div className='flex flex-row space-x-1 p-1 bg-purple-200 border-2 border-black rounded'>
          {' '}
          <span>Invite your friends:</span>
          <span className='hover:text-blue-500 hover:cursor-pointer'>
            {' '}
            <BsTwitter
              size={20}
              className=''
              onClick={() => handleShare('twitter')}
            />
          </span>
          <span className='hover:text-pink-500 hover:cursor-pointer'>
            <BsInstagram size={20} onClick={() => handleShare('instagram')} />
          </span>
          <span className='hover:text-green-600 hover:cursor-pointer'>
            <BsWhatsapp size={20} onClick={() => handleShare('whatsapp')} />
          </span>
        </div>
      </div>
      <p className='italic my-2'>{sadhana.content}</p>
      <h4
        className={`${righteous.className} text-left text-4xl font-bold mb-2 text-black`}
      >
        Users
      </h4>
    </>
  );
}
