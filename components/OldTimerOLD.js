import { useState, useEffect, useRef } from 'react';
import { Righteous, Russo_One } from 'next/font/google';
import {
  BsPlayCircle,
  BsPauseCircle,
  BsPatchCheckFill,
  BsFillSkipBackwardCircleFill,
} from 'react-icons/bs';
import {
  clearInterval,
  clearTimeout,
  setInterval,
  setTimeout,
} from 'worker-timers';
import { calculateDayIndex } from '@component/lib/functions';
import { signIn } from 'next-auth/react';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

const Timer = ({
  timeRemaining,
  setTimeRemaining,
  session,
  userSadhanas,
  setChosenSadhana,
  chosenSadhana,
}) => {
  const audioRef = useRef();
  const [initialDuration, setInitialDuration] = useState(
    chosenSadhana.targetSessionDuration
  );
  const [pauseCount, setPauseCount] = useState(0);
  const [totalPausedTime, setTotalPausedTime] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [paused, setPaused] = useState(true);
  const [submitSessionBtn, setSubmitSessionBtn] = useState('');
  const [music, setMusic] = useState('');
  const [noSessionMessage, setNoSessionMessage] = useState('');
  const [sessionSubmitted, setSessionSubmitted] = useState(false);

  const [chosenSadhanaTitle, setChosenSadhanaTitle] = useState('');

  useEffect(() => {
    let interval;
    if (finished) return;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (!isRunning && timeRemaining !== 0) {
      if (interval) clearInterval(interval);
    } else if (timeRemaining === 0 && started) {
      handleFinishedTimer();
      setFinished(true);
      setIsRunning(false);
      setShowSummary(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining, setTimeRemaining, finished, started]);

  const handleFinishedTimer = () => {
    audioRef.current.play();
    setSubmitSessionBtn('Submit Session');
  };

  const startTimer = () => {
    if (timeRemaining === 0) return alert('Please work more than 0 minutes.');
    if (chosenSadhana.title === '') {
      return alert('What are you going to work on?');
    }

    setStarted(true);
    setPaused(false);
    setIsRunning(true);
    setShowSummary(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setPaused(true);
    setPauseCount(count => count + 1);
    setTotalPausedTime(time => time + initialDuration - timeRemaining);
  };

  const resetTimer = () => {
    if (
      window.confirm(
        'You are going to lose your progress in this session. Are you sure you want to reset the timer?'
      )
    ) {
      setStarted(false);
      setIsRunning(false);
      setTimeRemaining(initialDuration);
      setPauseCount(0);
      setTotalPausedTime(0);
      setShowSummary(false);
    }
  };

  const handleSliderChange = event => {
    const newDuration = event.target.value * 60;
    setInitialDuration(newDuration);
    setTimeRemaining(newDuration);
  };

  const formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const submitSession = () => {
    const email = window.prompt(
      'Please enter your email to be informed of future updates:'
    );
    // Handle email submission (e.g., send to server, store in localStorage, etc.)
    console.log(`Email submitted: ${email}`);
  };

  const newSession = () => {
    setFinished(false);
    resetTimer();
  };

  const changeChosenSadhana = sadhanaTitle => {
    const thisOne = userSadhanas.filter(x => x.title == sadhanaTitle);
    if (thisOne) {
      setChosenSadhana(thisOne[0]);
      setTimeRemaining(thisOne[0].targetSessionDuration * 60);
    }
  };

  const handleSubmitSessionHandler = async () => {
    if (!session) {
      return setNoSessionMessage(
        'If you create an account, you will be able to save this session and stay accountable to your goals.'
      );
    }

    setSubmitSessionBtn('Saving session...');

    try {
      const response = await fetch('/api/sadhanaSessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          sadhanaId: chosenSadhana.id,
          completedAt: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const sadhanaSession = await response.json();

      setSessionSubmitted(true);
      setSubmitSessionBtn('Session saved!');
    } catch (error) {
      console.error(
        'There was a problem submitting the sadhana session:',
        error
      );
      alert('There was a problem submitting your session. Please try again.');
    }
  };

  const handleNewSessionBtn = () => {
    setTimeRemaining(initialDuration);
    setFinished(false);
    setStarted(false);
    setShowSummary(false);
  };

  return (
    <div className='max-w-xl mt-2 text-center rounded-xl border-black border-2 text-white bg-black p-8 opacity-80'>
      {!showSummary && (
        <div className=''>
          <label
            htmlFor='title'
            className={`${russo.className} blocktext-gray-700 mb-4 text-gray-300`}
          >
            What are you going to work on now?
          </label>
          <>
            <>
              <>
                {userSadhanas.filter(
                  x => new Date(x.startingTimestamp) < new Date().getTime()
                ).length > 0 ? (
                  <select
                    name='title'
                    id='title'
                    disabled={started}
                    value={chosenSadhanaTitle}
                    onChange={e => {
                      changeChosenSadhana(e.target.value);
                      setInitialDuration(() => {
                        return (
                          userSadhanas.filter(x => x.title == e.target.value)[0]
                            .targetSessionDuration * 60
                        );
                      });
                      return setChosenSadhanaTitle(e.target.value);
                    }}
                    required
                    className={`${russo.className} shadow appearance-none border rounded-xl w-full mt-1 mb-2 py-2 px-3 text-grey-100 bg-black leading-tight focus:outline-none focus:shadow-outline`}
                  >
                    {userSadhanas.map(sadhana => {
                      if (
                        calculateDayIndex(
                          sadhana.startingTimestamp,
                          session.user.timeZone
                        ) < 0
                      )
                        return;
                      return (
                        <option
                          disabled={sadhana.didTheWork}
                          key={sadhana.id}
                          value={sadhana.title}
                        >
                          {sadhana.title}
                          {sadhana.didTheWork && ' -       READY!'}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <input
                    type='text'
                    name='title'
                    id='title'
                    placeholder='playing drums'
                    disabled={started}
                    value={chosenSadhana.title}
                    onChange={e =>
                      setChosenSadhana(prev => ({
                        ...prev,
                        ['title']: e.target.value,
                      }))
                    }
                    required
                    className={`${russo.className} placeholder-gray-700 shadow appearance-none border rounded-xl w-full mt-1 mb-2 py-2 px-3 text-grey-100 bg-black leading-tight focus:outline-none focus:shadow-outline text-grey-200`}
                  />
                )}
              </>
            </>
          </>
        </div>
      )}
      {/* <div className=''>
        {!started && (
          <label
            className={`${russo.className} blocktext-gray-700 text-sm font-bold mb-4 text-white`}
          >
            <input
              type='checkbox'
              name='music'
              className='accent-pink-500 mx-2 p-2'
              onChange={() => setMusic(() => !music)}
            />
            Do you want to get a music recommendaton to go full-on with this
            session?
          </label>
        )}
        {music && started && !finished && (
          <p
            className={`${russo.className} blocktext-gray-700 text-sm font-bold mb-4 text-white`}
          >
            Here is the music for today:{' '}
            <a
              className='text-blue-300 hover:text-yellow-400'
              href='https://soundcloud.com/jonassaalbach/jonas-saalbach-live-set-fusion-festival-2019-sonnendeck'
              target='_blank'
            >
              Open in soundcloud.
            </a>{' '}
          </p>
        )}
      </div> */}
      {!showSummary && (
        <>
          <h4 className={`${russo.className} text-6xl font-bold mb-2`}>
            {formatTime(timeRemaining)}
          </h4>

          <div className='text-transparent flex justify-center items-center'>
            {isRunning && !paused && !finished && (
              <button
                onClick={pauseTimer}
                className='bg-red-500 hover:bg-red-600 text-black font-semibold border-black rounded-full my-auto mx-2'
              >
                <BsPauseCircle size={50} />
              </button>
            )}
            {!isRunning && paused && (
              <>
                <button
                  onClick={startTimer}
                  className='bg-green-500 hover:bg-green-600 text-black font-semibold border-black rounded-full my-auto mx-2'
                >
                  <BsPlayCircle size={50} />
                </button>
                {started && (
                  <button
                    onClick={resetTimer}
                    className='bg-yellow-500 hover:bg-yellow-600 text-black font-semibold border-black rounded-full my-auto mx-2'
                  >
                    <BsFillSkipBackwardCircleFill size={50} />
                  </button>
                )}
              </>
            )}
          </div>

          {!isRunning && !started ? (
            <>
              <p
                className={`${russo.className} blocktext-gray-700 mt-2 text-gray-300`}
              >
                Slide to change the session duration
              </p>

              <input
                type='range'
                min='0'
                max='120'
                value={initialDuration / 60}
                onChange={handleSliderChange}
                className='w-full mb-6 accent-green-500'
              />
            </>
          ) : (
            <>
              {!session && (
                <p
                  className={`${russo.className} blocktext-gray-700 text-sm text-white`}
                >
                  After you finish the session, you will be able to submit it to
                  your profile so that you can keep track of your progress.{' '}
                </p>
              )}{' '}
            </>
          )}
        </>
      )}

      {started && showSummary && (
        <div>
          <h3 className='text-4xl mb-4'>
            Congratulations, you just finished a {initialDuration / 60} minute
            session.
          </h3>

          {noSessionMessage ? (
            <>
              {' '}
              <button
                onClick={signIn}
                className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4 mx-2'
              >
                {noSessionMessage ? 'Create Account - Log In' : 'Submit'}
              </button>
              <button
                onClick={handleNewSessionBtn}
                className='bg-yellow-500 hover:bg-yellow-600 text-white  py-2 px-4 rounded mt-4'
              >
                New Session
              </button>
              <p
                className={`${russo.className} mt-2 blocktext-gray-700 text-sm  text-white`}
              >
                {noSessionMessage}
              </p>
            </>
          ) : (
            <>
              {sessionSubmitted ? (
                <button
                  disabled={true}
                  className='bg-green-500 hover:cursor-not-allowed text-white py-2 px-4 rounded mt-4 mx-2'
                >
                  {submitSessionBtn}
                </button>
              ) : (
                <button
                  onClick={handleSubmitSessionHandler}
                  className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4 mx-2'
                >
                  {submitSessionBtn}
                </button>
              )}

              <button
                onClick={handleNewSessionBtn}
                className='bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mt-4'
              >
                New Session
              </button>
            </>
          )}
        </div>
      )}
      <br />
      <audio ref={audioRef} hidden>
        <source src='/sounds/bell.mp3' type='audio/mpeg' />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Timer;
