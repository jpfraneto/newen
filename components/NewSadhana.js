// components/NewSadhana.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

const NewSadhana = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    title: 'Nights and Weekends Season 3',
    content:
      'Building the most fun app of the future. The one that will make creativity a game. The most joyful of them all. There are no rights or wrongs, polarity is part of the past. There is just showing up, as yourself, and being sincere with what you bring. The rest is history.',
    userLimit: '88',
    targetSessions: '100',
    targetSessionDuration: '60',
    periodicity: 'daily',
    startingTimestamp: new Date().getTime(),
    isPrivate: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [sadhanaId, setSadhanaId] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    console.log('the form data is: ', formData);

    try {
      const response = await axios.post('/api/sadhana', formData);
      setLoading(false);
      setSuccess(true);
      setSadhanaId(response.data.id);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const handleTryAgain = () => {
    setError(false);
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=I%20just%20created%20a%20new%20challenge%20for%20every%20one%20of%20us.%20It%20will%20consist%20of%2088%20days%20of%20writing%20100%20minutes%20daily.%20If%20you%20want%20to%20participate,%20click%20the%20link%20in%20my%20bio%20and%20you%20will%20be%20directed%20to%20the%20website%20where%20this%20is%20all%20going%20to%20happen.%0A%0ALFG!`;

    window.open(url, '_blank');
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
        <Link
          className='inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-2xl px-6 py-3 mt-8 ml-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
          href='/'
        >
          Go back
        </Link>
      </div>
    );

  return (
    <div className='text-black'>
      {loading ? (
        <div className='text-black'>
          <p className='text-black text-3xl mb-4'>Saving sadhana...</p>
        </div>
      ) : success ? (
        <div>
          <p className='text-black text-3xl mb-4'>
            Your Sadhana was added. You can see its dashboard{' '}
            <a className='text-blue-400' href={`/sadhana/${sadhanaId}`}>
              here
            </a>{' '}
            or you can share it on{' '}
            <button className='text-blue-400' onClick={shareOnTwitter}>
              Twitter
            </button>
            .
          </p>
        </div>
      ) : error ? (
        <div>
          <p>There was an error adding the Sadhana. Please try again.</p>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={handleTryAgain}
          >
            Try again
          </button>
        </div>
      ) : (
        <div>
          <h1 className='text-black text-3xl mb-4'>Add new sadhana</h1>
          <form
            onSubmit={handleSubmit}
            className='bg-red-200 shadow-md rounded px-8 pt-6 pb-8 mb-4'
          >
            <div className='mb-4'>
              <label
                htmlFor='title'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Title
              </label>
              <input
                type='text'
                name='title'
                id='title'
                value={formData.title}
                onChange={handleChange}
                required
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='content'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Content
              </label>
              <textarea
                name='content'
                id='content'
                value={formData.content}
                onChange={handleChange}
                required
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='userLimit'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Max Users
              </label>
              <input
                type='number'
                name='userLimit'
                id='userLimit'
                min={1}
                value={formData.userLimit}
                onChange={handleChange}
                required
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='targetSessions'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Target Sessions
              </label>
              <input
                type='number'
                name='targetSessions'
                min={0}
                id='targetSessions'
                value={formData.targetSessions}
                onChange={handleChange}
                required
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='targetSessionDuration'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Target Session Duration (minutes)
              </label>
              <input
                type='number'
                name='targetSessionDuration'
                id='targetSessionDuration'
                min={1}
                value={formData.targetSessionDuration}
                onChange={handleChange}
                required
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='periodicity'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Periodicity
              </label>
              <input
                type='text'
                name='periodicity'
                id='periodicity'
                value={formData.periodicity}
                onChange={handleChange}
                readOnly
                className='shadow cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
              <span className='text-sm text-gray-600'>
                In the future, you will be able to customize this as well.
              </span>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='startingTimestamp'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Starting Date
              </label>
              <input
                type='date'
                name='startingTimestamp'
                id='startingTimestamp'
                value={formData.startingTimestamp}
                onChange={handleChange}
                required
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
              />
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='periodicity'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Bet:
              </label>
              <input
                type='text'
                id='periodicity'
                value='200 $APE'
                readOnly
                className='border-2 border-gray-300 p-2 bg-gray-100 cursor-not-allowed rounded-md'
              />
              <span className='text-sm text-gray-600 mb-2'>
                This will be used for betting against your capacity of Doing The
                Work. If you fail, you pay. If you show up, you grow.
              </span>
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='periodicity'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Custom Hashtag:
              </label>
              <input
                type='text'
                id='periodicity'
                value='#n&ws3lfg'
                readOnly
                className='border-2 border-gray-300 p-2 bg-gray-100 cursor-not-allowed rounded-md'
              />
              <span className='text-sm text-gray-600 mb-2'>
                Custom hashtag that will be used to connect all of the
                participants on social media.
              </span>
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='isPrivate'
              >
                Is this Sadhana private?
              </label>
              <select
                id='isPrivate'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                value={formData.isPrivate}
                onChange={e =>
                  setFormData({
                    ...formData,
                    isPrivate: e.target.value === 'true',
                  })
                }
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>

              <label htmlFor='isPrivate' className='text-sm text-gray-600 mb-2'>
                {formData.isPrivate
                  ? 'Only people with the custom-made link can participate. It wont be displayed in the list of sadhanas for people to join.'
                  : 'Anyone can join.'}
              </label>
            </div>
            <div className='flex items-center justify-between'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                {' '}
                Create New Sadhana
              </button>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type=' button'
                onClick={() => router.back()}
              >
                {' '}
                Go Back
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewSadhana;

{
  /* <form className='space-y-4' onSubmit={handleSubmit}>
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
      This will be used for betting against your capacity of Doing The Work. If
      you fail, you pay. If you show up, you grow.
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
      This is a custom hashtag generated by AI using the information provided
      before, and it will be used to connect all of the participants in the
      arena on which the work is really done: social media.
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
      This sadhana is private (this means that only people with an exclusive
      link will be able to participate)
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
</form>; */
}
