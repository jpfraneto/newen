import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import Spinner from '@component/components/Spinner';
import { BsInstagram, BsTwitter, BsWhatsapp } from 'react-icons/bs';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const NewSadhana = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    userLimit: '',
    targetSessions: '',
    targetSessionDuration: '',
    periodicity: 'daily',
    startingTimestamp: new Date().toISOString().slice(0, 10),
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

  const handleShare = platform => {
    switch (platform) {
      case 'twitter':
        shareOnTwitter();
        break;
      case 'instagram':
        shareOnInstagram();
        break;
      case 'whatsapp':
        shareOnWhatsApp();
        break;
    }
  };

  const shareOnTwitter = () => {
    const text = `I just created a ${formData.targetSessions} day challenge, on which I will invite you to be consistent and do X. Each session will last ${formData.targetSessionDuration} minutes.\n\nLets do this together!\n\nHop into this link and sign up:\n\nhttps://www.sadhana.lat/invitation/${sadhanaId}`;

    const url =
      'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);

    window.open(url, '_blank');
  };

  const shareOnInstagram = () => {
    alert(
      'To share on Instagram, please create an Instagram story and add the link to your story.'
    );
  };

  const shareOnWhatsApp = () => {
    const text = `I just created a ${formData.targetSessions} day challenge, on which I will invite you to be consistent and do X. Each session will last ${formData.targetSessionDuration} minutes.\n Lets do this together!\n Here you can participate and track your progress: \n https://www.sadhana.lat/invitation/${sadhanaId}`;
    const url =
      'https://api.whatsapp.com/send?text=' + encodeURIComponent(text);
    window.open(url, '_blank');
  };

  if (status === 'loading') return <Spinner />;

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
          <p className='text-black text-3xl mb-4'>Saving challenge...</p>
        </div>
      ) : success ? (
        <div className='bg-white p-4 rounded-lg w-full max-w-md text-black'>
          <div>
            <p className='text-black text-xl mb-2'>
              Whoa. Your challenge was added. This is the starting point of
              something big. Eventually, these {formData.userLimit} people will
              navigate this {formData.targetSessions} day journey in community
              and will be transformed with you as a leader. Thanks for taking
              this step. The world needs it.
            </p>
            <Link
              href={`/sadhana/${sadhanaId}`}
              className='border-black border-2 inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-2xl px-4 py-2 my-1 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
            >
              Visit Dashboard
            </Link>
            <div>
              <h4
                className={`${righteous.className} text-2xl text-center mb-3 md:text-3xl w-full font-bold`}
              >
                Invite your followers
              </h4>
              <div className='flex justify-center space-x-3'>
                <span className='hover:text-blue-500 hover:cursor-pointer'>
                  {' '}
                  <BsTwitter
                    size={40}
                    className=''
                    onClick={() => handleShare('twitter')}
                  />
                </span>
                <span className='hover:text-pink-500 hover:cursor-pointer'>
                  <BsInstagram
                    size={40}
                    onClick={() => handleShare('instagram')}
                  />
                </span>
                <span className='hover:text-green-600 hover:cursor-pointer'>
                  <BsWhatsapp
                    size={40}
                    onClick={() => handleShare('whatsapp')}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div>
          <p>There was an error adding the Challenge. Please try again.</p>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={handleTryAgain}
          >
            Try again
          </button>
        </div>
      ) : (
        <div>
          <h4
            className={`${righteous.className} text-3xl mb-2 text-center md:text-4xl w-full font-bold`}
          >
            Add new challenge
          </h4>
          <form
            onSubmit={handleSubmit}
            className='bg-red-100 shadow-md rounded px-4 pt-6 pb-8 mb-4'
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
                placeholder='Your challenge'
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
                placeholder='This will appear in the challenges dashboard and will motivate people to pursue it.'
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
                placeholder='88'
                min={1}
                value={formData.userLimit}
                onChange={handleChange}
                required
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
              <span className='text-sm text-gray-600 mb-2'>
                Having a limited amount of people being able to participate
                generates a scarcity that makes the challenge more valuable.
              </span>
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
                placeholder='100'
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
            {/* <div className='mb-4'>
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
            </div> */}

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
                value={`${formData.targetSessions * 2} USD`}
                readOnly
                className='border-2 border-gray-300 p-2 bg-gray-100 cursor-not-allowed rounded-md'
              />
              <span className='text-sm text-gray-600 mb-2'>
                This will be used for betting against your capacity of Doing The
                Work. For each day you show up, you get 1 USD back at the end of
                the challenge (determined by how many days did it last).
              </span>
            </div>
            {/* <div className='flex flex-col'>
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
            </div> */}
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
            <div className='flex flex-col items-center justify-between'>
              <button
                className='border-black border-2 inline-block bg-gradient-to-r from-green-500 via-brown-500 to-green-500 text-black font-bold md:text-2xl px-2 md:px-6 py-1 md:py-3 m-1 mt-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
                type='submit'
              >
                {' '}
                Create New Challenge
              </button>
              <button
                className='border-black border-2 mx-3 inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold md:text-2xl px-2 md:px-6 py-1 md:py-3 m-1 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
                type='button'
                onClick={() => {
                  if (confirm('Are you sure you want to go back?'))
                    router.back();
                }}
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
