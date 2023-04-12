import { useState, useEffect, useRef } from 'react';

const Timer = ({ sessionTargetDuration }) => {
  const audioRef = useRef();
  const [duration, setDuration] = useState(sessionTargetDuration * 60);
  const [timeRemaining, setTimeRemaining] = useState(
    sessionTargetDuration * 60
  );
  const [isRunning, setIsRunning] = useState(false);
  const [started, setStarted] = useState(false);

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
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, started]);

  const handlePlay = () => {
    audioRef.current.play();
  };

  const startTimer = () => {
    setStarted(true);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setPauseCount(count => count + 1);
    setTotalPausedTime(time => time + duration - timeRemaining);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setStarted(false);
    setTimeRemaining(sessionTargetDuration * 60);
  };

  const formatTime = time => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className='text-center'>
      <div className='flex items-center space-x-2'>
        <span>{formatTime(timeRemaining)}</span>
        {isRunning ? (
          <button
            onClick={pauseTimer}
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-6 mr-4'
          >
            Pause
          </button>
        ) : (
          <>
            <button
              onClick={startTimer}
              className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-6 mr-4'
            >
              {timeRemaining === sessionTargetDuration * 60
                ? 'Start'
                : 'Resume'}
            </button>
            {!started && (
              <button
                onClick={resetTimer}
                className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mb-6'
              >
                Reset
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
