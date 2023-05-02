import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import Spinner from '@component/components/Spinner';
import {
  BsInstagram,
  BsTwitter,
  BsWhatsapp,
  BsLink45Deg,
} from 'react-icons/bs';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const NewSadhana = () => {
  const { data: session, status } = useSession();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetSessions: '',
    targetSessionDuration: '',
    periodicity: 'daily',
    startingTimestamp: new Date().toISOString().slice(0, 10),
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [sadhanaId, setSadhanaId] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const ankyMessages = [
    'Hello! Please enter the title for your sadhana.',
    'Great! Now, please enter the content of your sadhana.',
    'Next, please enter the target number of sessions.',
    'Now, please enter the target session duration.',
    'Please choose the periodicity of your sadhana.',
    'Lastly, please select the starting date for your sadhana.',
  ];

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/sadhana', formData);
      setLoading(false);
      setSuccess(true);
      setStep(7);
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
      case 'link':
        shareOnLink();
        break;
    }
  };

  const shareOnTwitter = () => {
    const text = `I just created a ${formData.targetSessions} day challenge, on which I will invite you to be consistent and do ${formData.title}. Each session will last ${formData.targetSessionDuration} minutes.\n\nLets do this together!\n\nHop into this link and sign up:\n\nhttps://www.sadhana.lat/i/${sadhanaId}`;

    const url =
      'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);

    window.open(url, '_blank');
  };

  const shareOnLink = async () => {
    const text = `https://www.sadhana.lat/i/${sadhanaId}`;

    await navigator.clipboard.writeText(text);
    alert('Link copied.');
  };

  const shareOnInstagram = () => {
    alert(
      'To share on Instagram, please create an Instagram story and add the link to your story.'
    );
  };

  const shareOnWhatsApp = () => {
    const text = `I just created a ${formData.targetSessions} day challenge, on which I will invite you to be consistent and do ${formData.title}. Each session will last ${formData.targetSessionDuration} minutes.\n Lets do this together!\n Here you can participate and track your progress: \n https://www.sadhana.lat/i/${sadhanaId}`;
    const url =
      'https://api.whatsapp.com/send?text=' + encodeURIComponent(text);
    window.open(url, '_blank');
  };

  if (status === 'loading') return <Spinner />;

  if (!session)
    return (
      <div className='text-black text-center'>
        <h1 className='text-4xl mb-4'>
          You need to log in to create a challenge
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
  if (step === '7') return <p>The sadhana was added!</p>;

  return (
    <div className='flex items-center justify-center '>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
        <h2 className='text-gray-700 font-semibold text-xl mb-6'>
          {ankyMessages[step - 1]}
        </h2>
        {step === 1 && (
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
        )}
        {step === 2 && (
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
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              rows='4'
            ></textarea>
          </div>
        )}
        {step === 3 && (
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
              id='targetSessions'
              value={formData.targetSessions}
              onChange={handleChange}
              required
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
        )}
        {step === 4 && (
          <div className='mb-4'>
            <label
              htmlFor='targetSessionDuration'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Target Session Duration
            </label>
            <input
              type='number'
              name='targetSessionDuration'
              id='targetSessionDuration'
              value={formData.targetSessionDuration}
              onChange={handleChange}
              required
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
        )}
        {step === 5 && (
          <div className='mb-4'>
            <label
              htmlFor='periodicity'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Periodicity
            </label>
            <select
              name='periodicity'
              id='periodicity'
              value={formData.periodicity}
              onChange={handleChange}
              required
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            >
              <option value='daily'>Daily</option>
              <option value='weekly'>Weekly</option>
              <option value='monthly'>Monthly</option>
            </select>
          </div>
        )}
        {step === 6 && (
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
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
        )}
        <div className='flex justify-between'>
          {step > 1 && (
            <button
              type='button'
              onClick={handlePrev}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Previous
            </button>
          )}
          {step < 6 && (
            <button
              type='button'
              onClick={handleNext}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Next
            </button>
          )}
          {step === 6 && (
            <button
              type='submit'
              onClick={handleSubmit}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              {loading ? 'Adding...' : 'Submit'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewSadhana;
