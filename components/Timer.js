// Timer.js

import { useState, useEffect, useRef } from 'react';
import {
  BsPlayCircle,
  BsPauseCircle,
  BsPatchCheckFill,
  BsFillSkipBackwardCircleFill,
} from 'react-icons/bs';

const Timer = ({ sessionTargetDuration, onCompletion }) => {
  const audioRef = useRef();
  const [duration, setDuration] = useState(sessionTargetDuration);
  const [timeRemaining, setTimeRemaining] = useState(sessionTargetDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (!isRunning && timeRemaining !== 0) {
      clearInterval(interval);
    } else if (timeRemaining === 0 && started) {
      setIsRunning(false);
      setFinished(true);
      handlePlay();
      onCompletion();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, started, onCompletion]);

  const handlePlay = () => {
    audioRef.current.play();
  };

  const startTimer = () => {
    setStarted(true);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    if (confirm('Do you want to reset this timer?')) {
      setIsRunning(false);
      setStarted(false);
      setFinished(false);
      setTimeRemaining(sessionTargetDuration * 60);
    }
  };

  const formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='text-center'>
      <div className='flex items-center space-x-2 text-black justify-center'>
        {timeRemaining > 0 && <span>{formatTime(timeRemaining)}</span>}
        {isRunning ? (
          <button
            onClick={pauseTimer}
            className='bg-red-200 hover:bg-red-300 text-black font-semibold  rounded-full my-auto mr-4'
          >
            <BsPauseCircle size={30} />
          </button>
        ) : (
          <>
            {!finished ? (
              <button
                onClick={startTimer}
                className='bg-blue-500 hover:bg-blue-600 text-black font-semibold  border-black rounded-full my-auto mr-4'
              >
                {!started || timeRemaining === sessionTargetDuration * 60 ? (
                  <BsPlayCircle size={30} />
                ) : (
                  <BsPlayCircle size={30} />
                )}
              </button>
            ) : (
              <BsPatchCheckFill size={30} />
            )}
            {started && !finished && (
              <button
                onClick={resetTimer}
                className='bg-red-500 hover:bg-red-600 text-black font-semibold border-black rounded-full my-auto'
              >
                <BsFillSkipBackwardCircleFill size={30} />
              </button>
            )}
          </>
        )}
      </div>
      <audio hidden ref={audioRef} src='/sounds/bell.mp3' />
    </div>
  );
};

export default Timer;
