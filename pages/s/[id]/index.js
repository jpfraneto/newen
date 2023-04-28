import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Righteous, Russo_One } from 'next/font/google';
import DoTheWorkInChallenge from '@component/components/DoTheWorkInChallenge';
import SadhanaUpdate from '@component/components/SadhanaUpdate';
import NewDashboardTimer from '@component/components/NewDashboardTimer';
import {
  BsInstagram,
  BsTwitter,
  BsWhatsapp,
  BsLink45Deg,
} from 'react-icons/bs';
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

export default function SadhanaDetail({
  sadhana,
  participantsData,
  sessionsArray,
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [buttonText, setButtonText] = useState('Participate');
  const [dayIndex, setDayIndex] = useState(
    calculateDayIndex(sadhana?.startingTimestamp)
  );
  const [participants, setParticipants] = useState(participantsData);
  const [selectedSession, setSelectedSession] = useState(null);
  const [dayForDisplay, setDayForDisplay] = useState(null);
  const [sadhanaForDisplay, setSadhanaForDisplay] = useState(sadhana);
  const [completedToday, setCompletedToday] = useState(false);
  const [userSessions, setUserSessions] = useState(sessionsArray);
  const [loadingUserSessions, setLoadingUserSessions] = useState(true);
  const [dayLoading, setDayLoading] = useState(false);
  const [sadhanaDayComments, setSadhanaDayComments] = useState(null);
  const [savingSessionLoading, setSavingSessionLoading] = useState(false);
  const [submittingId, setSubmittingId] = useState(undefined);

  const [timeRemaining, setTimeRemaining] = useState(
    sadhana?.targetSessionDuration
  );
  const [isUserParticipating, setIsUserParticipating] = useState(false);
  const [displayDayInfo, setDisplayDayInfo] = useState(false);

  const [chosenDayIndex, setChosenDayIndex] = useState(
    calculateDayIndex(sadhana?.startingTimestamp)
  );
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    if (!session) return;
    setIsUserParticipating(
      sadhana?.participants.some(
        participant => participant.id === session?.user.id
      )
    );
    const fetchSadhanaInfoInUser = async () => {
      const response = await fetch(`/api/u/${sadhana?.id}/sessions`);
      const data = await response.json();

      const newUserSessions = [...userSessions];
      data.map(x => {
        newUserSessions[x.sessionIndex - 1] = x;
      });
      setUserSessions(newUserSessions);

      setLoadingUserSessions(false);
    };
    fetchSadhanaInfoInUser();
  }, [session, sadhana, userSessions]);

  useEffect(() => {
    const fetchUpdates = async () => {
      const response = await fetch(`/api/sadhana/${sadhana?.id}/updates`);
      const data = await response.json();
      setUpdates(data);
    };

    if (sadhana?.id) {
      fetchUpdates();
    }
  }, [router]);

  const populateSadhanaSessions = () => {
    Array.from({ length: sadhana.targetSessions }, (_, i) => (
      <div
        key={i}
        className={` w-8 h-8 m-1 flex items-center justify-center text-black ${getDayFormatting(
          i + 1,
          dayIndex
        )}  rounded-full font-bold text cursor-pointer `}
        onClick={() => {
          if (i < dayIndex) return fetchSadhanaDayInfo(sadhana.id, i);
          else if (i === dayIndex) return alert('this day is today!');
          else {
            return alert('This day is in the future!');
          }
        }}
      >
        {i + 1}
      </div>
    ));
  };

  async function fetchSadhanaDayInfo(sadhanaId, dayNumber) {
    setChosenDayIndex(dayNumber + 1);
    setDayLoading(true);
    setDisplayDayInfo(true);

    const thisDay =
      sadhanaForDisplay.sadhanaDays.filter(
        x => x.dayIndex === dayNumber + 1
      )[0] || [];
    setSadhanaDayComments(thisDay.comments || []);
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
    if (chosenDayIndex === index)
      return 'bg-blue-500 text-white border-2 border-black shadow-lg';
    if (todayIndex < index) {
      return (
        str + 'bg-transparent border-black border  hover:cursor-not-allowed'
      );
    } else if (todayIndex === index) {
      return str + 'bg-green-600 border-black border-2 shadow-md';
    } else {
      return str + 'bg-green-300 hover:bg-green-500';
    }
  };

  const newGetDayFormatting = thisSession => {
    const str = '';
    if (dayIndex < thisSession.sessionIndex)
      return 'bg-transparent border-black border  hover:cursor-not-allowed';
    else if (dayIndex === thisSession.sessionIndex) {
      if (thisSession.id)
        return 'bg-green-600 text-white border-2 border-black shadow-lg';
      return 'bg-blue-500 text-white border-2 border-black shadow-lg';
    } else if (dayIndex > thisSession.sessionIndex) {
      if (thisSession.id) {
        return 'bg-green-600 ';
      } else {
        return 'bg-red-600';
      }
    }
  };

  const handleSubmitSession = async sadhana => {
    try {
      const response = await fetch('/api/sadhanaSessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          sadhanaId: sadhana.id,
          completedAt: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json();
      return true;
    } catch (error) {
      console.error(
        'There was a problem submitting the sadhana session:',
        error
      );
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
    <div className='bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 min-h-screen overflow-x-scroll text-white md:text-black py-2 md:px-16 lg:px-60 px-2 md:py-10'>
      <div className='container text-center'>
        {' '}
        <div
          className={`${russo.className} md:bg-white shadow-md md:rounded px-2 md:px-8 pt-6 blocktext-gray-700 text-sm font-bold  text-black`}
        >
          <HeaderComponent
            session={session}
            sadhana={sadhana}
            participants={participants}
            dayIndex={dayIndex}
          />

          <Participants participants={participants} />

          {dayIndex < 0 ? (
            <p
              className={`${russo.className} blocktext-gray-700 text-sm font-bold `}
            >
              This sadhana starts in {dayIndex * -1} days.
            </p>
          ) : (
            <div className='border-2 border-gray-800 bg-gray-200  px-1 py-1 rounded-xl '>
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
                  {loadingUserSessions ? (
                    <Spinner />
                  ) : (
                    <div className=' flex flex-wrap justify-center mb-3 pt-3'>
                      <>
                        {completedToday ? (
                          <>
                            {' '}
                            {userSessions.map((thisSession, i) => {
                              return (
                                <div
                                  key={i}
                                  className={` w-8 h-8 m-1 flex items-center justify-center text-black ${newGetDayFormatting(
                                    thisSession
                                  )}  rounded-full font-bold text cursor-pointer `}
                                  onClick={() => {
                                    if (i < dayIndex)
                                      return fetchSadhanaDayInfo(sadhana.id, i);
                                    else if (i === dayIndex)
                                      return alert('this day is today!');
                                    else {
                                      return alert(
                                        'This day is in the future!'
                                      );
                                    }
                                  }}
                                >
                                  {i + 1}
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <DoTheWorkInChallenge
                            session={session}
                            today={dayIndex}
                            setCompletedToday={setCompletedToday}
                            completedToday={completedToday}
                            sadhanaForDisplay={sadhanaForDisplay}
                            setSadhanaForDisplay={setSadhanaForDisplay}
                            setDisplayDayInfo={setDisplayDayInfo}
                            setDayForDisplay={setDayForDisplay}
                          />
                        )}
                      </>
                    </div>
                  )}

                  <div>
                    {true ? (
                      <div>
                        {displayDayInfo ? (
                          <>
                            {dayLoading ? (
                              <div className='md:mb-10'>
                                <p
                                  className={`${russo.className} blocktext-gray-700 text-sm font-bold  text-black`}
                                >
                                  Loading the information of this day...
                                </p>
                              </div>
                            ) : (
                              <div className=''>
                                {dayForDisplay && dayForDisplay.id ? (
                                  <>
                                    <SadhanaDayInfo
                                      sadhanaDay={dayForDisplay}
                                      currentUser={session.user}
                                      sadhanaDayComments={sadhanaDayComments}
                                      setSadhanaDayComments={
                                        setSadhanaDayComments
                                      }
                                    />
                                  </>
                                ) : (
                                  <>
                                    <h4
                                      className={`${righteous.className}  text-4xl font-bold mb-2 `}
                                    >
                                      Day {chosenDayIndex}
                                    </h4>
                                    {chosenDayIndex === dayIndex ? (
                                      <div>
                                        <p>
                                          No one has done the work of today yet.
                                        </p>
                                      </div>
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
              Go to challenges
            </Link>
            <Link
              href='/dashboard'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline '
            >
              Back
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
  let sadhana;
  if (!isNaN(parseInt(params.id))) {
    sadhana = await prisma.sadhana.findUnique({
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
  }

  if (!sadhana) {
    return {
      redirect: {
        permanent: false,
        destination: '/s/nonexistent',
      },
    };
  }

  let sessionsArray = Array.from({ length: sadhana.targetSessions }, (_, i) => {
    return { sessionIndex: i + 1 };
  });

  if (!sessionsArray) sessionsArray = [];

  return {
    props: {
      sadhana: JSON.parse(JSON.stringify(sadhana)),
      participantsData: JSON.parse(JSON.stringify(sadhana.participants)),
      sessionsArray: JSON.parse(JSON.stringify(sessionsArray)),
    },
    revalidate: 60,
  };
}

function Participants({ participants }) {
  const router = useRouter();
  return (
    <>
      {' '}
      <h4
        className={`${righteous.className} text-left text-4xl font-bold mb-2 text-white md:text-black`}
      >
        Users
      </h4>{' '}
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
    </>
  );
}

function HeaderComponent({ sadhana, session, dayIndex }) {
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
      case 'link':
        shareOnLink();
        break;
    }
  };

  const shareOnLink = async () => {
    const text = `https://www.sadhana.lat/invitation/${sadhana.id}`;

    await navigator.clipboard.writeText(text);
    alert('Link copied.');
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

  async function deleteSadhana(id) {
    if (!session) {
      return signIn();
    }

    if (!confirm('Are you sure you want to delete this sadhana?')) {
      return;
    }

    try {
      const response = await fetch(`/api/sadhana/${id}`, {
        method: 'DELETE',
      });

      // if (!response.ok) {
      //   throw new Error('Something went wrong while deleting the sadhana.');
      // }

      // Navigate to another page after deletion, e.g., the homepage
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('There was an error deleting the sadhana. Please try again.');
    }
  }
  return (
    <>
      {' '}
      <h4
        className={`${righteous.className} text-5xl text-blue-400 font-bold `}
      >
        {sadhana.title}
      </h4>
      <h4 className={`${righteous.className} text-3xl font-bold mb-2`}>
        {dayIndex < 0
          ? `This challenge starts in ${dayIndex * -1} day(s)`
          : `Day ${dayIndex}`}
      </h4>
      <div className='flex flex-wrap wrap gap-x-3 justify-center'>
        {' '}
        <p className='flex gap-x-1 my-1 items-center text-white md:text-black'>
          <FaUserAstronaut size={20} />
          <Link
            className='text-blue-400 hover:underline'
            href={`/u/${sadhana.author.id}`}
          >
            @{sadhana.author.username || sadhana.author.name}
          </Link>
        </p>
        <p className='flex gap-x-1 my-1 text-white md:text-black items-center'>
          <FaClock size={20} />
          {Math.floor(sadhana.targetSessionDuration)} minutes
        </p>
        <p className='flex gap-x-1 my-1 text-white md:text-black items-center'>
          <FaCalendarDay size={20} />
          {new Date(sadhana.startingTimestamp).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className='flex flex-row space-x-1 p-1 my-1  bg-purple-200 border-2 border-black rounded'>
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
          <span className='hover:text-green-600 hover:cursor-pointer'>
            <BsWhatsapp size={20} onClick={() => handleShare('whatsapp')} />
          </span>
          <span className='hover:text-green-600 hover:cursor-pointer'>
            <BsLink45Deg size={20} onClick={() => handleShare('link')} />
          </span>
        </div>
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
    </>
  );
}
