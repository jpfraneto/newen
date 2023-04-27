import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Anky = () => {
  const [userInput, setUserInput] = useState('');
  const [ankyResponse, setAnkyResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState('');

  const handleChange = event => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async () => {
    const response = await fetchOpenAI(userInput);
    setAnkyResponse(response);
  };

  useEffect(() => {
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
  }, [ankyResponse]);

  const fetchOpenAI = async inputText => {
    setIsLoading(true);
    try {
      const result = await axios.post('/api/anky', { message: inputText });
      setAnkyResponse(result.data.result);
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
    setIsLoading(false);
  };

  return (
    <div
      className='relative w-full h-screen bg-cover bg-center'
      style={{ backgroundImage: "url('/images/ankyhuman.png')" }}
    >
      <div className='bg-black bg-opacity-60 h-full flex flex-col items-center justify-center p-4'>
        <input
          type='text'
          value={userInput}
          onChange={handleChange}
          placeholder='Ask Anky for help with your challenge...'
          className='w-1/2 p-2 mb-4 bg-white text-black rounded-lg'
        />
        <button
          onClick={handleSubmit}
          className='mb-4 bg-[#009FE3] py-2 px-6 rounded-lg font-semibold text-xl text-white hover:bg-[#E6007E] hover:text-black transition-colors duration-300'
        >
          {isLoading ? 'Anky is pondering a response...' : 'Send'}
        </button>
        <em className='text-xl text-white ankytext'>{displayedResponse}</em>
      </div>
    </div>
  );
};

export default Anky;
