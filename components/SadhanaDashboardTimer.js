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

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

const SadhanaDashboardTimer = ({ sadhana, session, isSessionSubmitted }) => {
  const audioRef = useRef();
  const [initialDuration, setInitialDuration] = useState(timeRemaining);
  const [pauseCount, setPauseCount] = useState(0);
  const [totalPausedTime, setTotalPausedTime] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [paused, setPaused] = useState(true);
  const [submitSessionBtn, setSubmitSessionBtn] = useState(false);

  const [chosenSadhanaTitle, setChosenSadhanaTitle] = useState('');

  useEffect(() => {
    if (sadhana) {
      setChosenSadhanaTitle(sadhana.title);
      setInitialDuration(sadhana.targetSessionDuration * 60);
    }
  }, [sadhana]);

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
  }, [isRunning, finished, started]);

  const handleFinishedTimer = () => {
    audioRef.current.play();
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

  function isSadhanaCompletedToday(sadhana) {
    // const today = new Date();
    // const todayString = today.toISOString().split('T')[0];
    // return sadhana.sessionDates.some(dateString => dateString === todayString);
  }

  const changeChosenSadhana = sadhanaTitle => {
    const thisOne = userSadhanas.filter(x => x.title == sadhanaTitle);
    if (thisOne) {
      setChosenSadhana(thisOne[0]);
      setTimeRemaining(thisOne[0].targetSessionDuration * 60);
    }
  };

  const handleSubmitSessionHandler = async () => {
    setSubmitSessionBtn('Saving session...');
    if (!session) {
      return alert('Please log in to submit your session.');
    }

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

      // Update the userSadhanas state to reflect the new session
      // setUserSadhanas(
      //   userSadhanas.map(sadhana =>
      //     sadhana.id === chosenSadhana.id
      //       ? { ...sadhana, sessions: [...sadhana.sessions, sadhanaSession] }
      //       : sadhana
      //   )
      // );
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
    setFinished(false);
    setStarted(false);
    setShowSummary(false);
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
            What are you going to work on now?
          </label>
          {loadingSadhanas ? (
            <input
              type='text'
              name='title'
              id='title'
              placeholder='loading user sadhanas...'
              disabled
              className={`${russo.className} shadow appearance-none border rounded-xl w-full mt-1 mb-2 py-2 px-3 text-grey-100 bg-black leading-tight focus:outline-none focus:shadow-outline text-grey-200`}
            />
          ) : (
            <>
              {session ? (
                <>
                  {userSadhanas.length > 0 ? (
                    <select
                      name='title'
                      id='title'
                      disabled={started}
                      value={chosenSadhanaTitle}
                      onChange={e => {
                        changeChosenSadhana(e.target.value);
                        setInitialDuration(() => {
                          return (
                            userSadhanas.filter(
                              x => x.title == e.target.value
                            )[0].targetSessionDuration * 60
                          );
                        });
                        return setChosenSadhanaTitle(e.target.value);
                      }}
                      required
                      className={`${russo.className} shadow appearance-none border rounded-xl w-full mt-1 mb-2 py-2 px-3 text-grey-100 bg-black leading-tight focus:outline-none focus:shadow-outline`}
                    >
                      {userSadhanas.map(sadhana => (
                        <option
                          key={sadhana.id}
                          value={sadhana.title}
                          style={{
                            backgroundColor: isSadhanaCompletedToday(sadhana)
                              ? 'green'
                              : 'initial',
                          }}
                        >
                          {sadhana.title}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type='text'
                      name='title'
                      id='title'
                      placeholder='kieran drew challenge'
                      value={chosenSadhana.title}
                      onChange={e =>
                        setChosenSadhana(prev => ({
                          ...prev,
                          ['title']: e.target.value,
                        }))
                      }
                      required
                      className={`${russo.className} shadow appearance-none border rounded-xl w-full mt-1 mb-2 py-2 px-3 text-grey-100 bg-black leading-tight focus:outline-none focus:shadow-outline text-grey-200`}
                    />
                  )}
                </>
              ) : (
                <input
                  type='text'
                  name='title'
                  id='title'
                  placeholder='kieran drew challenge'
                  value={chosenSadhana.title}
                  onChange={e =>
                    setChosenSadhana(prev => ({
                      ...prev,
                      ['title']: e.target.value,
                    }))
                  }
                  required
                  className={`${russo.className} shadow appearance-none border rounded-xl w-full mt-1 mb-2 py-2 px-3 text-grey-100 bg-black leading-tight focus:outline-none focus:shadow-outline text-grey-200`}
                />
              )}
            </>
          )}
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
              <p className={`mb-2 ${russo.className}`}>
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
            session working in {chosenSadhana.title}
          </h3>

          <button
            onClick={handleSubmitSessionHandler}
            className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-4 mx-2'
          >
            {submitSessionBtn || 'Submit Session'}
          </button>

          <button
            onClick={handleNewSessionBtn}
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

export default SadhanaDashboardTimer;
