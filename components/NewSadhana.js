import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import Spinner from '@component/components/Spinner';
import Button from './Button';

const NewSadhana = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetSessions: '',
    targetSessionDuration: '',
    periodicity: 'daily',
    isPrivate: false,
    startingTimestamp: new Date().toISOString().slice(0, 10),
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const {
      title,
      content,
      targetSessions,
      targetSessionDuration,
      periodicity,
      isPrivate,
      startingTimestamp,
    } = formData;
    if (
      !title ||
      !content ||
      !targetSessions ||
      !targetSessionDuration ||
      !periodicity ||
      isPrivate === null ||
      !startingTimestamp
    ) {
      alert('Please fill out all the form elements!');
      return;
    }

    try {
      const response = await axios.post('/api/sadhana', formData);
      toast.success('Your sadhana was added!');
      router.push(`/s/${response.data.id}`);
    } catch (error) {
      alert('There was an error adding your sadhana. Please try again.');
    }
  };

  if (status === 'loading') return <Spinner />;

  if (!session) {
    return (
      <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>
          You need to log in to create a challenge
        </h1>
        <button
          className='bg-blue-500 text-white p-2 rounded mr-2'
          onClick={signIn}
        >
          Log In
        </button>
        <button
          className='bg-gray-500 text-white p-2 rounded'
          onClick={() => router.push('/')}
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <form className='p-4' onSubmit={handleSubmit}>
      <h5 className='text-4xl font-bold mb-1'>Add New Challenge</h5>
      <label className='block mb-2'>
        Title:
        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
          required
          placeholder='ex: 30 days of Walking'
          className='w-full border p-2 rounded'
        />
      </label>
      <label className='block mb-2'>
        Description:
        <textarea
          name='content'
          value={formData.content}
          required
          onChange={handleChange}
          placeholder='Explain your challenge to motivate others to be part of it.'
          className='w-full border p-2 rounded'
        />
      </label>
      <label className='block mb-2'>
        Target Sessions:
        <input
          type='number'
          required
          placeholder='8'
          name='targetSessions'
          value={formData.targetSessions}
          onChange={handleChange}
          className='w-full border p-2 rounded'
        />
      </label>
      <label className='block mb-2'>
        Session Duration (in minutes):
        <input
          type='number'
          required
          name='targetSessionDuration'
          placeholder='10'
          value={formData.targetSessionDuration}
          onChange={handleChange}
          className='w-full border p-2 rounded'
        />
      </label>
      <label className='block mb-2'>
        Periodicity:
        <select
          name='periodicity'
          required
          value={formData.periodicity}
          onChange={handleChange}
          className='w-full border p-2 rounded'
        >
          <option value='daily'>Daily</option>
          <option value='weekly'>Weekly</option>
          <option value='monthly'>Monthly</option>
        </select>
      </label>
      <label className='block mb-2'>
        Is Private?
        <select
          name='isPrivate'
          required
          value={formData.isPrivate}
          onChange={handleChange}
          className='w-full border p-2 rounded'
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </label>
      <label className='block mb-2'>
        Starting Date:
        <input
          type='date'
          required
          name='startingTimestamp'
          value={formData.startingTimestamp}
          onChange={handleChange}
          className='w-full border p-2 rounded'
        />
      </label>
      <div className='flex justify-center'>
        <Button buttonText='Submit' buttonType='submit' />
      </div>
    </form>
  );
};

export default NewSadhana;
