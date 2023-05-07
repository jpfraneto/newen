import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getServerSession } from 'next-auth/next';
import Image from 'next/image';
import Link from 'next/link';
import { authOptions } from '@component/pages/api/auth/[...nextauth].js';
import Spinner from '@component/components/Spinner';

export default function Settings({ user }) {
  const [updatingLoading, setUpdatingLoading] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState('Save Changes');
  const [formData, setFormData] = useState({
    username: user.username || '',
    name: user.name,
    whatsapp: user.whatsapp,
    email: user.email,
  });

  const handleChange = event => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setUpdatingLoading(true);
      const response = await fetch('/api/settings/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          name: formData.name,
          whatsapp: formData.whatsapp,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUpdatingLoading(false);
        setUpdatedMessage('Updated Successfully!');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Error updating settings.');
    }
  };

  //   const handleDeleteAccount = () => {};

  return (
    <div className='min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900  py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-3xl sm:mx-auto'>
        <div className='relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10'>
          <div className='max-w-3xl mx-auto'>
            <div className='text-center'>
              <h1 className='text-2xl font-semibold text-gray-900'>Settings</h1>
            </div>
            <form onSubmit={handleSubmit} className='space-y-3'>
              <div>
                <label
                  htmlFor='username'
                  className='text-sm font-bold text-gray-600 block'
                >
                  Username
                </label>
                <input
                  id='username'
                  type='text'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 text-black rounded mt-1'
                />
                <p className='text-xs text-gray-500'>
                  Your unique identifier in the app.
                </p>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='text-sm font-bold text-gray-600 block'
                >
                  Email
                </label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full p-2 border text-black border-gray-300 rounded mt-1'
                />
                <p className='text-xs text-gray-500'>
                  We'll use this to communicate with you.
                </p>
              </div>

              <div>
                <label
                  htmlFor='name'
                  className='text-sm font-bold text-gray-600 block'
                >
                  Name
                </label>
                <input
                  id='name'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full p-2 border text-black border-gray-300 rounded mt-1'
                />
                <p className='text-xs text-gray-500'>
                  Anky will refer to you by this name.
                </p>
              </div>

              <div>
                <label
                  htmlFor='whatsapp'
                  className='text-sm font-bold text-gray-600 block'
                >
                  WhatsApp Number
                </label>
                <input
                  id='whatsapp'
                  type='tel'
                  name='whatsapp'
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className='w-full p-2 border text-black border-gray-300 rounded mt-1'
                />
                <p className='text-xs text-gray-500'>
                  We'll send daily reminders to this number.
                </p>
              </div>

              <button
                type='submit'
                className='w-full flex justify-center rounded-xl  bg-indigo-500 text-gray-100 p-4  hover:bg-indigo-400 transition-all duration-300 ease-in-out flex items-center focus:outline-none'
              >
                {updatingLoading ? <Spinner /> : updatedMessage}
              </button>
              {updatedMessage === 'Updated Successfully!' && (
                <Link
                  href='/dashboard'
                  className='w-full flex justify-center rounded-xl  bg-green-500 text-gray-100 p-4  hover:bg-green-400 transition-all duration-300 ease-in-out flex items-center focus:outline-none'
                >
                  Back to Dashboard
                </Link>
              )}
            </form>
            {/* <button
              onClick={handleDeleteAccount}
              className='w-full mt-4 flex justify-center bg-red-500 text-gray-100 p-4  hover:bg-red-400 transition-all duration-300 ease-in-out flex items-center focus:outline-none'
            >
              Delete Account
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user: session.user },
  };
}
