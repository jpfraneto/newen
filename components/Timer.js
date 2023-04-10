import { useState, useEffect, useRef } from 'react';

const Timer = ({ timeRemaining, setTimeRemaining }) => {
  const audioRef = useRef();
  const [duration, setDuration] = useState(30 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [pauseCount, setPauseCount] = useState(0);
  const [totalPausedTime, setTotalPausedTime] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (!isRunning && timeRemaining !== 0) {
      clearInterval(interval);
    } else if (timeRemaining === 0 && started) {
      handlePlay();
      setIsRunning(false);
      setShowSummary(true);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const handlePlay = () => {
    audioRef.current.play();
  };

  const startTimer = () => {
    setStarted(true);
    setIsRunning(true);
    setShowSummary(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setPauseCount(count => count + 1);
    setTotalPausedTime(time => time + duration - timeRemaining);
  };

  const resetTimer = () => {
    if (
      window.confirm(
        'You are going to lose your progress in this session. Are you sure you want to reset the timer?'
      )
    ) {
      setStarted(false);
      setIsRunning(false);
      setTimeRemaining(duration);
      setPauseCount(0);
      setTotalPausedTime(0);
      setShowSummary(false);
    }
  };

  const handleSliderChange = event => {
    const newDuration = event.target.value * 60;
    setDuration(newDuration);
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
    if (
      window.confirm(
        'Are you sure you want to start a new session without submitting this one? You will lose the tracking capabilities of this app, which are currently under development.'
      )
    ) {
      resetTimer();
    }
  };

  return (
    <div className='text-center'>
      {!showSummary && (
        <>
          <div className='text-6xl font-bold mb-6'>
            {formatTime(timeRemaining)}
          </div>
          {isRunning ? (
            <button
              onClick={pauseTimer}
              className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-6 mr-4'
            >
              Pause
            </button>
          ) : (
            <button
              onClick={startTimer}
              className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-6'
            >
              {timeRemaining === duration ? 'Start' : 'Resume'}
            </button>
          )}
          {!isRunning && timeRemaining !== duration && (
            <button
              onClick={resetTimer}
              className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mb-6'
            >
              Reset
            </button>
          )}
          {!isRunning && !started && (
            <>
              <p className='mb-2'>Slide to change the session duration</p>
              <input
                type='range'
                min='0'
                max='90'
                value={duration / 60}
                onChange={handleSliderChange}
                className='w-full mb-6'
              />
            </>
          )}
        </>
      )}
      {started && showSummary && (
        <div>
          <h2 className='text-4xl font-bold mb-4'>
            Congratulations, you just finished a {duration / 60} minute session
          </h2>
          <p>Times paused: {pauseCount}</p>
          <p>
            Effective session time: {formatTime(duration + totalPausedTime)}
          </p>
          <p>Total paused time: {formatTime(totalPausedTime)}</p>
          <button
            onClick={submitSession}
            className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-4 mr-4'
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
