import { useState, useEffect, useRef } from 'react';
import {
  BsPlayCircle,
  BsPauseCircle,
  BsPatchCheckFill,
  BsFillSkipBackwardCircleFill,
} from 'react-icons/bs';

const Timer = ({ sessionTargetDuration, onCompletion, sadhana }) => {
  const audioRef = useRef();
  const [duration, setDuration] = useState(sessionTargetDuration * 60);
  const [timeRemaining, setTimeRemaining] = useState(
    sessionTargetDuration * 60
  );
  const [isRunning, setIsRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      // handlePlay();
      // onCompletion();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, started, onCompletion]);

  const handlePlay = () => {
    audioRef.current.play();
  };

  const handleSubmitSession = () => {
    alert('Your session will be added to the DB');
  };

  const startTimer = () => {
    setStarted(true);
    setPaused(false);
    setIsRunning(true);
    setShowModal(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setPaused(true);
  };

  const resetTimer = () => {
    if (confirm('Do you want to reset this timer?')) {
      setIsRunning(false);
      setStarted(false);
      setFinished(false);
      setTimeRemaining(sessionTargetDuration * 60);
    }
  };

  const startFromScratch = () => {
    setIsRunning(false);
    setStarted(false);
    setFinished(false);
    setTimeRemaining(sessionTargetDuration * 60);
  };

  const formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCloseModal = () => {
    if (
      confirm(
        'Are you sure you want to drop this session? You will need to start from scratch.'
      )
    ) {
      setShowModal(false);
      startFromScratch();
    }
  };

  const handleForceSessionEnd = () => {
    if (confirm('Did you REALLY do the work?')) {
      setIsRunning(false);
      setFinished(true);
      handlePlay();
      onCompletion();
      setShowModal(false);
    }
  };

  const submitSessionHandler = () => {
    alert('Congratulations. Your session will be added to the DB.');
    setShowModal(false);
    onCompletion();
  };

  return (
    <div className='text-center'>
      {!finished && (
        <button
          onClick={startTimer}
          className='hover:text-blue-900 text-black font-semibold  border-black rounded-full my-auto '
        >
          GO!
        </button>
      )}
      {showModal && (
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-70 bg-black ${
            showModal ? 'block' : 'hidden'
          }`}
        >
          <div
            className='bg-white border-2 border-white rounded-xl p-6 flex flex-col items-center justify-between'
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0,
                0.6)), url("https://cdn.midjourney.com/ec0fe507-2218-495a-9f60-d90ed2213441/0_0.png")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '70vh',
              width: '80vw',
            }}
          >
            <h2 className='text-white text-2xl mb-4'>{sadhana.title}</h2>
            <h1 className='text-white text-6xl'>{formatTime(timeRemaining)}</h1>
            <div className='flex justify-center mt-4'>
              {isRunning && !paused && !finished && (
                <button
                  onClick={pauseTimer}
                  className='bg-red-500 hover:bg-red-600 text-black font-semibold border-black rounded-full my-auto mx-2'
                >
                  <BsPauseCircle size={50} />
                </button>
              )}
              {!isRunning & paused && (
                <>
                  <button
                    onClick={startTimer}
                    className='bg-blue-500 hover:bg-blue-600 text-black font-semibold border-black rounded-full my-auto mx-2'
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
            <textarea
              className='w-96 h-60 mt-4 p-2 rounded-md'
              placeholder='Take notes about this session...'
            />
            <div className='flex justify-center items-center mt-4 w-full'>
              {finished ? (
                <button
                  onClick={submitSessionHandler}
                  className='bg-red-500  hover:bg-red-600 mx-2 text-black font-semibold py-2 px-4 rounded'
                >
                  Submit Session
                </button>
              ) : (
                <div>
                  {' '}
                  <button
                    onClick={handleCloseModal}
                    className='bg-red-500  hover:bg-red-600 mx-2 text-black font-semibold py-2 px-4 rounded'
                  >
                    Cancel Session
                  </button>
                  <button
                    onClick={handleForceSessionEnd}
                    className='bg-green-500 hover:bg-green-600 mx-2 text-black font-semibold py-2 px-4 rounded'
                  >
                    Force Session End
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <audio ref={audioRef}>
        <source src='/sounds/timer-finish.mp3' />
      </audio>
    </div>
  );
};

export default Timer;
