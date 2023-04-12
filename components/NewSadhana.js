// components/NewSadhana.js
import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

const NewSadhana = () => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState('Nights and Weekends Season 3');
  const [content, setContent] = useState(
    'Building the most fun app of the future. The one that will make creativity a game. The most joyful of them all. There are no rights or wrongs, polarity is part of the past. There is just showing up, as yourself, and being sincere with what you bring. The rest is history.'
  );
  const [userLimit, setUserLimit] = useState('88');
  const [targetSessions, setTargetSessions] = useState('100');
  const [targetSessionDuration, setTargetSessionDuration] = useState('100');
  const [periodicity, setPeriodicity] = useState('daily');
  const [startingDate, setStartingDate] = useState('2023-04-07');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('sending this sadhana to the database...');
    try {
      const startingTimestamp = new Date(startingDate).getTime();
      console.log('the starting timestamp is: ', startingTimestamp);
      const response = await fetch('/api/sadhana', {
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
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const resdata = await response.json();
      console.log('the response from the server is: ', resdata);
      console.log('the response is: ', response);

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
    } catch (error) {
      console.log('there was an error creating the sadhana', error);
    }
  };
  if (status === 'loading') return <p>Loading!</p>;

  if (!session)
    return (
      <div className='text-black text-center'>
        <h1 className='text-4xl mb-4'>
          You need to log in to create a sadhana
        </h1>
        <button
          className='inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-2xl px-6 py-3 mt-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
          onClick={signIn}
        >
          Log In
        </button>
      </div>
    );

  return (
    <div className='text-black'>
      <h1 className='text-4xl mb-4'>Create a New Sadhana</h1>
      {session && <p>Logged in as {session.user.name}</p>}
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
          <label htmlFor='periodicity' className='font-semibold'>
            Bet:
          </label>
          <input
            type='text'
            id='periodicity'
            value='200 $APE'
            readOnly
            className='border-2 border-gray-300 p-2 bg-gray-100 cursor-not-allowed rounded-md'
          />
          <span className='text-sm text-gray-600'>
            This will be used for betting against your capacity of Doing The
            Work. If you fail, you pay. If you show up, you grow.
          </span>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='periodicity' className='font-semibold'>
            Custom Hashtag:
          </label>
          <input
            type='text'
            id='periodicity'
            value='#n&ws3lfg'
            readOnly
            className='border-2 border-gray-300 p-2 bg-gray-100 cursor-not-allowed rounded-md'
          />
          <span className='text-sm text-gray-600'>
            This is a custom hashtag generated by AI using the information
            provided before, and it will be used to connect all of the
            participants in the arena on which the work is really done: social
            media.
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
            This sadhana is private (this means that only people with an
            exclusive link will be able to participate)
          </label>
        </div>
        <button
          type='submit'
          className='bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700'
        >
          Create New Sadhana
        </button>
        <Link href='/'>
          <button className='mx-4 bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700'>
            Go Back
          </button>
        </Link>
      </form>
    </div>
  );
};

export default NewSadhana;
