import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Righteous, Russo_One } from 'next/font/google';
import Button from '@component/components/Button';
import DoTheWorkInChallenge from '@component/components/DoTheWorkInChallenge';
import SadhanaUpdate from '@component/components/SadhanaUpdate';
import FinishedSadhanaComponent from '@component/components/FinishedSadhanaComponent';
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
import BiggerLayout from '@component/components/BiggerLayout';

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
    calculateDayIndex(
      sadhana?.startingTimestamp,
      Intl.DateTimeFormat().resolvedOptions().timeZone
    )
  );
  const [participants, setParticipants] = useState(participantsData);
  const [chosenDayForDisplayIndex, setChosenDayForDisplayIndex] =
    useState(null);
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
    calculateDayIndex(
      sadhana?.startingTimestamp,
      Intl.DateTimeFormat().resolvedOptions().timeZone
    )
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

  const newGetDayFormatting = thisSession => {
    let str = '';
    if (chosenDayIndex === thisSession.sessionIndex) {
      str += 'opacity-70 border-2 border-theorange text-lg';
    }
    if (!thisSession) return str + ' bg-theredbtn';
    if (dayIndex < thisSession.sessionIndex) {
      return (
        str + ' bg-transparent border-black border  hover:cursor-not-allowed'
      );
    } else if (dayIndex === thisSession.sessionIndex) {
      if (thisSession.id) {
        return (
          str + ' bg-thegreenbtn text-white border-2 border-theblack shadow-lg'
        );
      } else {
        return str + ' bg-theorange text-white border-2 border-theblack shadow';
      }
    } else if (dayIndex > thisSession.sessionIndex) {
      if (thisSession.id) {
        return str + ' bg-thegreenbtn';
      } else {
        return str + ' bg-theredbtn';
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

  if (dayIndex > sadhana.targetSessions)
    return (
      <BiggerLayout>
        <div className='w-screen px-2 -translate-x-2 bg-theredbtn'>
          This challenge ended.
        </div>

        <div className='container text-center'>
          <div
            className={`${russo.className} md:bg-white md:rounded px-2 md:px-8 pt-6 blocktext-gray-700 text-sm font-bold  text-black`}
          >
            <FinishedSadhanaComponent
              session={session}
              fetchSadhanaDayInfo={fetchSadhanaDayInfo}
              sadhana={sadhana}
              participants={participants}
              dayIndex={dayIndex}
            />

            <Participants participants={participants} />
            <div className='container'>
              {dayForDisplay && (
                <SadhanaDayInfo
                  sadhanaDay={dayForDisplay}
                  currentUser={session.user}
                  sadhanaDayComments={sadhanaDayComments}
                  setSadhanaDayComments={setSadhanaDayComments}
                />
              )}
            </div>

            <div className='flex flex-row mt-4 items-center space-x-2 justify-center'>
              <Button
                buttonAction={() => router.push('/s')}
                buttonText='Go to Challenges'
              />
              <Button
                buttonAction={() => router.push('/dashboard')}
                buttonText='Back'
              />
            </div>
          </div>
        </div>
      </BiggerLayout>
    );

  return (
    <BiggerLayout>
      <div className='container text-center'>
        <div
          className={`${russo.className} md:bg-white md:rounded px-2 md:px-8 pt-6 blocktext-gray-700 text-sm font-bold  text-black`}
        >
          <HeaderComponent
            session={session}
            sadhana={sadhana}
            participants={participants}
            dayIndex={dayIndex}
          />
          {dayIndex < 0 ? (
            <p
              className={`${russo.className} blocktext-gray-700 text-sm font-bold `}
            >
              This sadhana starts in {dayIndex * -1} days.
            </p>
          ) : (
            <div className=' border-gray-800 bg-gray-200  px-1 py-1 rounded-xl '>
              {false ? (
                <>
                  {' '}
                  {status === 'loading' ? (
                    <Spinner />
                  ) : (
                    <>
                      {/* {session ? (
                        <>
                          {buttonText === 'Joined!' ? (
                            <Button
                              buttonText={buttonText}
                              buttonColor='bg-thedarkgreen'
                              buttonAction={handleParticipate}
                              disabled
                            />
                          ) : (
                            <Button
                              buttonText={buttonText}
                              buttonColor='bg-thepurple'
                              buttonAction={handleParticipate}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          <Button
                            buttonText='If you log in, you can join.'
                            buttonAction={signIn}
                          />
                        </>
                      )} */}
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
                        {true ? (
                          <>
                            {' '}
                            {userSessions.map((thisSession, i) => {
                              return (
                                <div
                                  key={i}
                                  className={` w-10 h-10 text-xl m-1 flex items-center justify-center text-black ${newGetDayFormatting(
                                    thisSession
                                  )}  rounded-full font-bold text cursor-pointer hover:opacity-80 `}
                                  onClick={() => {
                                    if (!isUserParticipating) return;
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
          <div className='flex flex-row mt-4 space-x-2 justify-center'>
            <Button
              buttonAction={() => router.push('/')}
              buttonText='Go to Challenges'
            />
            <Button
              buttonAction={() => router.push('/dashboard')}
              buttonText='Back'
            />
          </div>
        </div>
      </div>
    </BiggerLayout>
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
        Participants:
      </h4>{' '}
      <div className='flex items-center mb-4'>
        {participants?.map(participant => (
          <div
            key={participant.id}
            className='text-center hover:cursor-pointer'
          >
            {participant.image ? (
              <Image
                src={participant.image}
                onClick={() => router.push(`/u/${participant.id}`)}
                alt={participant.name || 'name'}
                width={200}
                height={200}
                className='w-16 h-16 rounded-full mr-2'
                title={participant.name || 'participant image'}
              />
            ) : (
              <Image
                src='/images/ankycompressed.png'
                onClick={() => router.push(`/u/${participant.id}`)}
                alt={participant.name || 'name'}
                width={200}
                height={200}
                className='w-16 h-16 rounded-full mr-2'
                title={participant.name || 'participant image'}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function HeaderComponent({ sadhana, session, dayIndex }) {
  const router = useRouter();
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
    const text = `https://www.sadhana.lat/i/${sadhana.id}`;

    await navigator.clipboard.writeText(text);
    alert('Link copied.');
  };

  const shareOnTwitter = () => {
    const text = `I want to challenge to a ${sadhana.targetSessions} day challenge, doing X. Each session will last ${sadhana.targetSessionDuration} minutes.\n\nLets do this together!\n\nHere you can sign up:\n\nhttps://www.sadhana.lat/i/${sadhana.id}`;

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
    const text = `I want to challenge to a ${sadhana.targetSessions} day challenge, doing X. Each session will last ${sadhana.targetSessionDuration} minutes.\n\nLets do this together!\n\nHere you can sign up:\n\nhttps://www.sadhana.lat/i/${sadhana.id}`;
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
      toast.success('The sadhana was deleted.');
      router.push('/dashboard');
    } catch (error) {
      console.log('the error is: ', error);
      console.error(error);
      alert('There was an error deleting the sadhana. Please try again.');
    }
  }
  const date = new Date(sadhana.startingTimestamp);
  const timeZoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
  const localDate = new Date(date.getTime() + timeZoneOffset);
  return (
    <div className='flex'>
      <h4
        className={`${righteous.className} text-5xl ml-2 text-blue-400 font-bold `}
      >
        {sadhana.title}
      </h4>
      <div className='flex flex-wrap wrap gap-x-3 justify-center'>
        <p className='flex gap-x-1 my-1 items-center text-white md:text-black'>
          <FaUserAstronaut size={20} />
          <Link
            className='text-blue-400 hover:underline'
            href={`/u/${sadhana.author.id}`}
          >
            @{sadhana.author?.username || sadhana.author?.name}
          </Link>
        </p>
        <p className='flex gap-x-1 my-1 text-white md:text-black items-center'>
          <FaClock size={20} />
          {Math.floor(sadhana.targetSessionDuration)} minutes
        </p>
        <p className='flex gap-x-1 my-1 text-white md:text-black items-center'>
          <FaCalendarDay size={20} />
          {localDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        {sadhana.startingTimestamp > date && (
          <div className='flex text-xl flex-row space-x-1 p-1 my-1  bg-purple-200 border-2 border-black rounded'>
            <span>Share :</span>
            <span className='hover:text-blue-500 hover:cursor-pointer'>
              <BsTwitter
                size={26}
                className=''
                onClick={() => handleShare('twitter')}
              />
            </span>
            <span className='hover:text-green-600 hover:cursor-pointer'>
              <BsWhatsapp size={26} onClick={() => handleShare('whatsapp')} />
            </span>
            <span className='hover:text-green-600 hover:cursor-pointer'>
              <BsLink45Deg size={26} onClick={() => handleShare('link')} />
            </span>
          </div>
        )}
      </div>
      {session && session.user.id === sadhana.authorId && (
        <Button
          buttonAction={() => deleteSadhana(sadhana.id)}
          buttonText='Delete Challenge'
          buttonColor='bg-theredbtn'
        />
      )}
    </div>
  );
}
