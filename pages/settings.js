import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getServerSession } from 'next-auth/next';
import Image from 'next/image';
import { authOptions } from '@component/pages/api/auth/[...nextauth].js';

export default function Settings({ user }) {
  console.log('the user is: ', user);
  const [formData, setFormData] = useState({
    username: user.username || '',
    name: user.name,
    whatsapp: '',
    twitter: '',
    instagram: '',
    discord: '',
    tiktok: '',
  });

  const handleChange = event => {
    console.log(
      'inside the handleChange',
      event.target.name,
      event.target.value
    );
    setFormData(prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch('/api/settings/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          name: formData.name,
          whatsapp: formData.whatsapp,
          twitter: formData.twitter,
          instagram: formData.instagram,
          discord: formData.discord,
          tiktok: formData.tiktok,
        }),
      });

      const data = await response.json();

      if (response.ok) {
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
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-2xl sm:mx-auto'>
        <div className='relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10'>
          <div className='max-w-xl mx-auto'>
            <div className='text-center'>
              <h1 className='text-2xl font-semibold text-gray-900'>Settings</h1>
            </div>
            <form onSubmit={handleSubmit} className='space-y-6'>
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
              </div>

              <div>
                <label
                  htmlFor='twitter'
                  className='text-sm font-bold text-gray-600 block'
                >
                  Twitter
                </label>
                <input
                  id='twitter'
                  type='text'
                  name='twitter'
                  value={formData.twitter}
                  onChange={handleChange}
                  className='w-full p-2 border text-black border-gray-300 rounded mt-1'
                />
              </div>

              <div>
                <label
                  htmlFor='instagram'
                  className='text-sm font-bold text-gray-600 block'
                >
                  Instagram
                </label>
                <input
                  id='instagram'
                  type='text'
                  name='instagram'
                  value={formData.instagram}
                  onChange={handleChange}
                  className='w-full p-2 border text-black border-gray-300 rounded mt-1'
                />
              </div>

              <div>
                <label
                  htmlFor='discord'
                  className='text-sm font-bold text-gray-600 block'
                >
                  Discord
                </label>
                <input
                  id='discord'
                  type='text'
                  name='discord'
                  value={formData.discord}
                  onChange={handleChange}
                  className='w-full p-2 border text-black border-gray-300 rounded mt-1'
                />
              </div>

              <div>
                <label
                  htmlFor='tiktok'
                  className='text-sm font-bold text-gray-600 block'
                >
                  TikTok
                </label>
                <input
                  id='tiktok'
                  type='text'
                  name='tiktok'
                  value={formData.tiktok}
                  onChange={handleChange}
                  className='w-full p-2 border text-black border-gray-300 rounded mt-1'
                />
              </div>

              <button
                type='submit'
                className='w-full flex justify-center bg-indigo-500 text-gray-100 p-4  hover:bg-indigo-400 transition-all duration-300 ease-in-out flex items-center focus:outline-none'
              >
                Save Changes
              </button>
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
