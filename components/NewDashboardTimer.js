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
import Button from './Button';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

const NewDashboardTimer = ({ session, onCompletion, sadhana }) => {
  const audioRef = useRef();
  const [initialDuration, setInitialDuration] = useState(
    sadhana.targetSessionDuration * 60
  );
  const [pauseCount, setPauseCount] = useState(0);
  const [totalPausedTime, setTotalPausedTime] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [hiddenTime, setHiddenTime] = useState(null);
  const [paused, setPaused] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(
    sadhana.targetSessionDuration * 60
  );
  const [submitSessionBtn, setSubmitSessionBtn] = useState('');

  useEffect(() => {
    let interval;

    if (finished) return;

    if (isRunning && timeRemaining > 0) {
      setStartTime(Date.now());
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
  }, [isRunning, timeRemaining, finished, started]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isRunning) {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setTimeRemaining(time => Math.max(0, time - elapsedTime));
      } else if (!document.hidden && isRunning) {
        setStartTime(Date.now());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRunning, startTime]);

  const handleFinishedTimer = () => {
    audioRef.current.play();
    setSubmitSessionBtn('Upload Session');
  };

  const startTimer = () => {
    if (timeRemaining === 0) return alert('Please work more than 0 minutes.');
    if (sadhana.title === '') {
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

  const handleSubmitSessionHandler = () => {
    onCompletion();
    setSubmitSessionBtn('Adding Session...');
  };

  if (!sadhana) return <></>;

  return (
    <div className='max-w-xl w-full h-full mt-2 text-center rounded-xl  text-black p-4'>
      <div className='h-full w-full'>
        {!showSummary && (
          <>
            {' '}
            <div className=''>
              <label
                htmlFor='title'
                className={`${russo.className} blocktext-gray-700 mb-4 text-3xl `}
              >
                {sadhana.title}
              </label>
            </div>
            <h4
              className={`${russo.className} text-thegreen  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] text-6xl font-bold mb-2`}
            >
              {formatTime(timeRemaining)}
            </h4>
          </>
        )}

        <div className='text-transparent flex justify-center items-center'>
          {isRunning && !paused && !finished && (
            <button
              onClick={pauseTimer}
              className='bg-theredbtn hover:opacity-80 text-black font-semibold border-black rounded-full my-auto mx-2'
            >
              <BsPauseCircle size={50} />
            </button>
          )}
          {!isRunning && paused && (
            <>
              <button
                onClick={startTimer}
                type='button'
                className='bg-thegreenbtn hover:opacity-80 text-black font-semibold border-black rounded-full my-auto mx-2'
              >
                <BsPlayCircle size={50} />
              </button>
              {started && (
                <button
                  onClick={resetTimer}
                  className='bg-theorange hover:opacity-80 text-black font-semibold border-black rounded-full my-auto mx-2'
                >
                  <BsFillSkipBackwardCircleFill size={50} />
                </button>
              )}
            </>
          )}
        </div>

        <div>
          {' '}
          {!started && (
            <>
              <p
                className={`${russo.className} blocktext-gray-700 mt-2 text-black`}
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
          )}
        </div>

        {started && showSummary && (
          <div className='text-center'>
            <h3 className='text-4xl mb-4'>
              Congratulations, you just finished a {initialDuration / 60} minute
              session of your challenge {sadhana.title}
            </h3>
            <div className='flex justify-center'>
              <Button
                buttonAction={handleSubmitSessionHandler}
                buttonText={submitSessionBtn}
              />
            </div>
          </div>
        )}
        <audio ref={audioRef} hidden>
          <source src='/sounds/bell.mp3' type='audio/mpeg' />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default NewDashboardTimer;
