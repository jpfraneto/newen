import Button from '@component/components/Button';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const MintPage = () => {
  const [text, setText] = useState('');
  const [time, setTime] = useState(180);
  const [isActive, setIsActive] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [lastKeystroke, setLastKeystroke] = useState(Date.now());
  const [failed, setFailed] = useState(false);
  const [ankyImageUrl, setAnkyImageUrl] = useState('/images/anky.png');
  const [failureMessage, setFailureMessage] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const textareaRef = useRef(null);
  const intervalRef = useRef(null);
  const keystrokeIntervalRef = useRef(null);

  useEffect(() => {
    if (isActive && time && !isDone > 0) {
      intervalRef.current = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (!isActive && !isDone) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, time, isDone]);

  useEffect(() => {
    if (isActive) {
      keystrokeIntervalRef.current = setInterval(() => {
        if (Date.now() - lastKeystroke > 1000 && !isDone) {
          resetTimer();
        }
      }, 500);
    } else {
      clearInterval(keystrokeIntervalRef.current);
    }
    return () => clearInterval(keystrokeIntervalRef.current);
  }, [isActive, lastKeystroke]);

  const resetTimer = () => {
    setIsActive(false);
    setFailed(true);
    setText('');
    setTime(180);
    setFailureMessage(
      `You failed! Next time, just write for ${time} more seconds.`
    );
    clearInterval(intervalRef.current);
    clearInterval(keystrokeIntervalRef.current);
  };

  const handleTextChange = event => {
    setText(event.target.value);
    if (!isActive && event.target.value.length > 0) {
      setIsActive(true);
      setFailureMessage('');
    }
    setLastKeystroke(Date.now());
  };

  const handleMint = () => {
    alert('Time to mint this as an NFT!');
  };

  const updateSadhanas = async () => {
    const response = await fetch('/api/update-sadhanas');
    const data = await response.json();
    console.log('the data is: ', data);
  };

  const handleLoadImage = () => {
    setAnkyImageUrl('/images/8.png');
    setImageLoaded(true);
  };

  useEffect(() => {
    if (time === 0) {
      setIsDone(true);
    }
  }, [time]);

  return (
    <div
      className='text-thewhite relative h-screen flex items-center justify-center w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
        height: 'calc(100vh  - 30px)',
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/mintbg.jpg')",
      }}
    >
      {isDone ? (
        <div className='flex flex-col items-center '>
          {imageLoaded ? (
            <>
              <p className='my-0'>
                This is my interpretation of you, dear friend.
              </p>
              <p>Welcome to my world.</p>
            </>
          ) : (
            <>
              <p className='my-0'>Congratulations, you made it.</p>
              <p className='mt-0'>
                Anky is processing your text, and creating a customized image
                for you.
              </p>
            </>
          )}

          <div>
            <Image
              src={ankyImageUrl}
              className='rounded-3xl overflow-hidden border border-thewhite'
              width={333}
              height={333}
              alt='Anky The Ape'
            />
          </div>
          {imageLoaded ? (
            <Button
              buttonText='Mint'
              buttonAction={handleMint}
              buttonColor='bg-thegreenbtn mt-4'
            />
          ) : (
            <Button
              buttonColor='bg-theorange mt-4'
              buttonText='Load Avatar'
              buttonAction={handleLoadImage}
            />
          )}
        </div>
      ) : (
        <div className='w-3/4 md:w-1/2 lg:w-1/3'>
          {failed ? (
            <>
              <p>You failed! This isn&apos;t as easy as it sounds.</p>
              <Button
                buttonText='Try again.'
                buttonAction={() => setFailed(false)}
              />
            </>
          ) : (
            <>
              <p
                className={`${righteous.className} text-5xl font-bold mb-4 text-center`}
              >
                tell me who you are.
              </p>
              <p className='text-base text-gray-600 my-1'>
                My world will only open to those who prove themselves.
              </p>
              <p>
                If you stop writing for 1 second, you will fail. You have 3
                minutes to respond to the inquiry.
              </p>
              <p className={`${righteous.className} font-bold`}>
                See you on the otherside.
              </p>
              <textarea
                ref={textareaRef}
                className='w-full h-64 p-4 text-theblack border border-gray-300 rounded-md mb-4'
                value={text}
                onChange={handleTextChange}
              ></textarea>
              <div className='flex justify-center items-center mb-4'>
                <div className='text-4xl'>{time} </div>
              </div>
              {!isActive && text.length > 0 && (
                <div className='text-red-500'>
                  You stopped writing. That means you are thinking. You have to
                  start again.
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MintPage;
