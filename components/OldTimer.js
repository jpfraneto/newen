import { useState, useEffect, useRef } from 'react';
import { Righteous, Russo_One } from 'next/font/google';
import {
  BsPlayCircle,
  BsPauseCircle,
  BsPatchCheckFill,
  BsFillSkipBackwardCircleFill,
} from 'react-icons/bs';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

const Timer = ({ timeRemaining, setTimeRemaining }) => {
  const audioRef = useRef();
  const [initialDuration, setInitialDuration] = useState(timeRemaining);
  const [pauseCount, setPauseCount] = useState(0);
  const [totalPausedTime, setTotalPausedTime] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [sadhanaName, setSadhanaName] = useState('');
  const [finished, setFinished] = useState(false);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    let interval;
    if (finished) return;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (!isRunning && timeRemaining !== 0) {
      clearInterval(interval);
    } else if (timeRemaining === 0 && started) {
      handleFinishedTimer();
      setFinished(true);
      setIsRunning(false);
      setShowSummary(true);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, setTimeRemaining, started]);

  const handleFinishedTimer = () => {
    audioRef.current.play();
    alert('SESSION READY!');
  };

  const startTimer = () => {
    if (timeRemaining === 0) return alert('Please work more than 0 minutes.');
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

  return (
    <div
      className='max-w-xl mt-2 text-center rounded-xl border-black border-2 text-white bg-black p-8'
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0,
        0.6)), url("https://cdn.midjourney.com/ec0fe507-2218-495a-9f60-d90ed2213441/0_0.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!showSummary && (
        <div className=''>
          <label
            htmlFor='title'
            className={`${russo.className} blocktext-gray-700 text-sm font-bold mb-4 text-white`}
          >
            What are you going to work on?
          </label>
          <input
            type='text'
            name='title'
            id='title'
            value={sadhanaName}
            onChange={e => setSadhanaName(e.target.value)}
            required
            className={`${russo.className} shadow appearance-none border rounded-xl w-full mt-1 mb-2 py-2 px-3 text-grey-100 bg-black leading-tight focus:outline-none focus:shadow-outline`}
          />
        </div>
      )}
      {!showSummary && (
        <>
          <h4 className={`${righteous.className} text-6xl font-bold mb-2`}>
            {formatTime(timeRemaining)}
          </h4>

          <div className='text-transparent flex justify-center items-center mb-2'>
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
              <p className='mb-2'>Slide to change the session duration</p>
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
            <p>
              After you finish the session, you will be able to submit it to
              your profile so that you can keep track of your progress.{' '}
            </p>
          )}
        </>
      )}
      {started && showSummary && (
        <div>
          <h3 className='text-4xl font-bold mb-4'>
            Congratulations, you just finished a {initialDuration / 60} minute
            session
          </h3>

          <button
            onClick={submitSession}
            className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-4 mx-2'
          >
            Submit Session
          </button>
          <button
            onClick={newSession}
            className='bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded mt-4'
          >
            New Session
          </button>
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
