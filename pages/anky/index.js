import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const Anky = () => {
  const [userInput, setUserInput] = useState('');
  const [sentText, setSentText] = useState(false);
  const [password, setPassword] = useState('');
  const [ankyResponse, setAnkyResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState('');

  const handleChange = event => {
    setUserInput(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    const response = await fetchOpenAI(userInput);
    const result = response.data.result.content;
    setAnkyResponse(result);
    setIsLoading(false);
  };

  const styleResponseText = text => {
    const parts = text.split(/\d+\. /).slice(1);
    const intro = parts.shift().split('\n');

    return (
      <div>
        {intro.map((paragraph, index) => (
          <p className='mb-4' key={`intro-${index}`}>
            {paragraph.trim()}
          </p>
        ))}
        <ol>
          {parts.map((part, index) => (
            <li key={index}>
              {part.split('\n').map((paragraph, pIndex) => (
                <p key={`part-${index}-${pIndex}`}>{paragraph.trim()}</p>
              ))}
            </li>
          ))}
        </ol>
      </div>
    );
  };

  useEffect(() => {
    if (ankyResponse) {
      let currentText = '';
      const interval = setInterval(() => {
        if (currentText.length < ankyResponse.length) {
          currentText += ankyResponse[currentText.length];
          setDisplayedResponse(currentText);
        } else {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [ankyResponse]);

  const fetchOpenAI = async inputText => {
    if (!password) return;
    setIsLoading(true);
    setSentText(true);
    try {
      const result = await axios.post('/api/anky', {
        message: inputText,
        password: password,
      });
      console.log('the result from fetching the api is: ', result);
      return result;
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
    setIsLoading(false);
  };

  return (
    <div
      className='relative w-full h-screen bg-cover bg-center  flex flex-col items-center'
      style={{ backgroundImage: "url('/images/ankyhuman.png')" }}
    >
      <div className='bg-black bg-opacity-60 h-full flex flex-col w-full items-center justify-center p-4'>
        <div className='mt-100  w-full my-auto flex flex-col'>
          {sentText ? (
            <div>
              {isLoading ? (
                <div>
                  <p>Anky is thinking...</p>

                  <div className='relative w-full md:w-1/2 md:mb-6 h-[100vw] md:h-[90vh]'>
                    <Image
                      src='/images/ankythinking.png'
                      alt='Anky thinking'
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className='landingtext w-11/12 mb-4 text-center mx-auto md:w-1/2 px-4'>
                    {' '}
                    {userInput}
                  </p>
                  <em className='max-h-[40vh] overflow-y-scroll text-xl block text-white ankytext w-11/12 md:w-6/12 mx-auto'>
                    {styleResponseText(displayedResponse)}
                  </em>
                </div>
              )}
            </div>
          ) : (
            <div className='fade-in flex flex-col items-center justify-center'>
              <input
                type='text'
                value={userInput}
                onChange={handleChange}
                placeholder='Ask Anky for help with your challenge...'
                className='w-11/12 md:w-1/2 p-2 mb-4 mx-auto bg-white text-black rounded-lg'
              />
              <input
                type='password'
                value={password}
                onChange={handlePasswordChange}
                placeholder='Password'
                className='w-8/12 md:w-2/12  p-2 mb-4 mx-auto bg-white text-black rounded-lg'
              />
              <button
                onClick={handleSubmit}
                className='mb-4 bg-[#009FE3] py-2 px-6 w-fit mx-auto rounded-lg font-semibold text-xl text-white hover:bg-[#E6007E] hover:text-black transition-colors duration-300'
              >
                {isLoading ? 'Anky is pondering a response...' : 'Ask Anky.'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Anky;
