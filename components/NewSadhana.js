import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
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
import Button from './Button';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const NewSadhana = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetSessions: '',
    targetSessionDuration: '',
    periodicity: 'daily',
    isPrivate: false,
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
    "Let's create an exciting new challenge together. First, please enter a captivating title for it.",
    "Now, let's dive into the details. Please describe what your sadhana is all about. This is the text that you will see every day as you come to do the work, and the one that people will read when they come to participate.",
    'Fantastic! Now, how many sessions do you want this to last? Set a challenging yet achievable goal. You can always create a new one in the future.',
    'Great! Time to decide how long each session will be. Remember, consistency is key, so choose a duration that you can maintain.',
    "Let's talk frequency. How often do you want to work on your sadhana? Choose the periodicity that best fits your schedule and commitment.",
    "Almost there! Pick a starting date for your sadhana. This is the day your transformation begins. Let's make it count!",
    "Last but not least, do you want to keep this sadhana private or share it with others? Remember, sharing can inspire others and create a supportive community, but it's entirely up to you!",
  ];

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const {
      title,
      content,
      targetSessions,
      targetSessionDuration,
      periodicity,
      isPrivate,
      startingTimestap,
    } = formData;
    if (
      !title ||
      !content ||
      !targetSessions ||
      targetSessionDuration ||
      periodicity ||
      isPrivate ||
      startingTimestap
    )
      alert('Please fill out all the form elements!');
    try {
      const response = await axios.post('/api/sadhana', formData);
      setLoading(false);
      setSuccess(true);
      setStep(88);
      toast.success('Your sadhana was added!');
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
        <h1 className='text-4xl mb-4 mt-80 text-thewhite'>
          You need to log in to create a challenge
        </h1>
        <div className='flex space-x-2 justify-center'>
          <Button
            buttonAction={signIn}
            buttonText='Log In'
            buttonColor='bg-thepurple'
          />
          <Button buttonText='Go back' buttonAction={() => router.push('/')} />
        </div>
      </div>
    );

  if (step == 88)
    return (
      <div className='px-8 md:px-4 rounded-lg w-full min-h-fit max-w-md text-black'>
        <div>
          <p className='text-black text-xl mb-2'>
            You just commited to something. This is the starting point of your
            own growth. Do you want to challenge someone to do this with you?
            Share it with the buttons below.
          </p>
          <Link
            href={`/s/${sadhanaId}`}
            className='border-black border-2 inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-2xl px-4 py-2 my-1 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
          >
            Visit Dashboard
          </Link>
          <div>
            <h4
              className={`${righteous.className} text-2xl text-center mb-3 md:text-3xl w-full font-bold`}
            >
              Invite your friends
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
              {/* <span className='hover:text-pink-500 hover:cursor-pointer'>
                  <BsInstagram
                    size={40}
                    onClick={() => handleShare('instagram')}
                  />
                </span> */}
              <span className='hover:text-green-600 hover:cursor-pointer'>
                <BsWhatsapp size={40} onClick={() => handleShare('whatsapp')} />
              </span>
              <span className='hover:text-green-600 hover:cursor-pointer'>
                <BsLink45Deg size={40} onClick={() => handleShare('link')} />
              </span>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className='relative font-itim text-white mx-auto w-full md:max-w-3xl'>
      <div className='px-2 w- flex md:pt-10 flex-col items-start text-thewhite  '>
        <p className='text-lg md:text-2xl font-bold mb-0'>
          An epic journey awaits.
        </p>
        <p className='text-lg md:text-2xl font-bold mb-2'>
          I&apos;m Anky, and I will walk by your side.
        </p>

        <form onSubmit={handleSubmit} className='rounded px-8 pt-80 pb-8 mb-4'>
          <h2 className=' text-theorange  text-2xl  mb-6 '>
            {ankyMessages[step - 1]}
          </h2>
          {step === 1 && (
            <div className='mb-4'>
              <input
                type='text'
                name='title'
                id='title'
                placeholder='ex: 30 days of Walking'
                value={formData.title}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-theblack leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
          )}
          {step === 2 && (
            <div className='mb-4'>
              <textarea
                name='content'
                id='content'
                placeholder='Explain your challenge to motivate others to be part of it.'
                value={formData.content}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-theblack leading-tight focus:outline-none focus:shadow-outline'
                rows='4'
              ></textarea>
            </div>
          )}
          {step === 3 && (
            <div className='mb-4'>
              <input
                type='number'
                name='targetSessions'
                id='targetSessions'
                placeholder='8'
                value={formData.targetSessions}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-theblack leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
          )}
          {step === 4 && (
            <div className='mb-4'>
              <input
                type='number'
                name='targetSessionDuration'
                id='targetSessionDuration'
                placeholder='10'
                value={formData.targetSessionDuration}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-theblack leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
          )}
          {step === 5 && (
            <div className='mb-4'>
              <select
                name='periodicity'
                id='periodicity'
                value={formData.periodicity}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-theblack leading-tight focus:outline-none focus:shadow-outline'
              >
                <option value='daily'>Daily</option>
                <option value='weekly' disabled>
                  Weekly
                </option>
                <option value='monthly' disabled>
                  Monthly
                </option>
              </select>
            </div>
          )}
          {step === 6 && (
            <div className='mb-4'>
              <input
                type='date'
                name='startingTimestamp'
                id='startingTimestamp'
                value={formData.startingTimestamp}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-theblack leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
          )}
          {step === 7 && (
            <div>
              {' '}
              <select
                id='isPrivate'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-theblack leading-tight focus:outline-none focus:shadow-outline'
                name='isPrivate'
                value={formData.isPrivate}
                onChange={handleChange}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
              {formData.isPrivate
                ? 'Only you can see your progress in this sadhana.'
                : 'Anyone can join.'}
            </div>
          )}
          <div className='flex justify-center space-x-2 mt-2'>
            {step > 1 && !success && (
              <Button
                buttonAction={handlePrev}
                buttonColor='bg-thered'
                buttonText='Previous'
              />
            )}
            {step < 7 && (
              <Button
                buttonColor='bg-thegreen'
                buttonAction={handleNext}
                buttonText='Next'
              />
            )}
            {step === 7 && (
              <Button
                buttonText={loading ? 'Adding...' : 'Submit'}
                buttonAction={handleSubmit}
                buttonColor='bg-thegreen'
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSadhana;
