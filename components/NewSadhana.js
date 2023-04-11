// components/NewSadhana.js
import { useState } from 'react';

const NewSadhana = () => {
  const [title, setTitle] = useState('Hero100');
  const [content, setContent] = useState('This is the challenge of your life.');
  const [userLimit, setUserLimit] = useState('88');
  const [targetSessions, setTargetSessions] = useState('100');
  const [targetSessionDuration, setTargetSessionDuration] = useState('90');
  const [periodicity, setPeriodicity] = useState('daily');
  const [startingDate, setStartingDate] = useState('2023-04-12');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    const startingTimestamp = new Date(startingDate).getTime();
    console.log('sending the sadhana to the db');
    const response = await fetch('/api/sadhana', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        userLimit,
        targetSessions,
        targetSessionDuration,
        periodicity,
        startingTimestamp,
        isPrivate,
      }),
    });

    if (response.ok) {
      alert('Sadhana created');
      setTitle('');
      setContent('');
      setUserLimit('');
      setTargetSessions('');
      setTargetSessionDuration('');
      setPeriodicity('daily');
      setStartingDate('');
      setIsPrivate(false);
    } else {
      alert('Error creating Sadhana');
    }
  };

  return (
    <div className='text-black'>
      <h1 className='text-4xl mb-4'>Create a New Sadhana</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex flex-col'>
          <label htmlFor='title' className='font-semibold'>
            Title:
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className='border-2 border-gray-300 p-2 rounded-md'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='content' className='font-semibold'>
            Content:
          </label>
          <textarea
            id='content'
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            className='border-2 border-gray-300 p-2 rounded-md h-48'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='userLimit' className='font-semibold'>
            User Limit:
          </label>
          <input
            type='number'
            id='userLimit'
            value={userLimit}
            onChange={e => setUserLimit(e.target.value)}
            required
            className='border-2 border-gray-300 p-2 rounded-md'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='targetSessions' className='font-semibold'>
            Target Sessions:
          </label>
          <input
            type='number'
            id='targetSessions'
            value={targetSessions}
            onChange={e => setTargetSessions(e.target.value)}
            required
            className='border-2 border-gray-300 p-2 rounded-md'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='targetSessionDuration' className='font-semibold'>
            Target Session Duration (minutes):
          </label>
          <input
            type='number'
            id='targetSessionDuration'
            value={targetSessionDuration}
            onChange={e => setTargetSessionDuration(e.target.value)}
            required
            className='border-2 border-gray-300 p-2 rounded-md'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='periodicity' className='font-semibold'>
            Periodicity:
          </label>
          <input
            type='text'
            id='periodicity'
            value={periodicity}
            readOnly
            className='border-2 border-gray-300 p-2 bg-gray-100 cursor-not-allowed rounded-md'
          />
          <span className='text-sm text-gray-600'>
            In the future, you will be able to customize this as well.
          </span>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='startingDate' className='font-semibold'>
            Starting Date:
          </label>
          <input
            type='date'
            id='startingDate'
            value={startingDate}
            onChange={e => {
              setStartingDate(e.target.value);
            }}
            required
            className='border-2 border-gray-300 p-2 rounded-md'
          />
        </div>
        <div className='flex items-center space-x-2'>
          <input
            type='checkbox'
            id='isPrivate'
            checked={isPrivate}
            onChange={e => setIsPrivate(e.target.checked)}
            className='form-checkbox text-blue-600'
          />
          <label htmlFor='isPrivate' className='font-semibold'>
            Private Sadhana
          </label>
        </div>
        <button
          type='submit'
          className='bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700'
        >
          Create New Sadhana
        </button>
      </form>
    </div>
  );
};

export default NewSadhana;
