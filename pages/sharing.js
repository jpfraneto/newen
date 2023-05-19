import React from 'react';
import NewSadhana from '@component/components/NewSadhana';
import Link from 'next/link';
import { BsInstagram, BsTwitter, BsWhatsapp } from 'react-icons/bs';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const handleShare = platform => {
  switch (platform) {
    case 'twitter':
      alert('share on twitter!');
      const url = `https://twitter.com/intent/tweet?text=I%20just%20created%20a%20new%20challenge%20for%20every%20one%20of%20us.%20It%20will%20consist%20of%2088%20days%20of%20writing%20100%20minutes%20daily.%20If%20you%20want%20to%20participate,%20click%20the%20link%20in%20my%20bio%20and%20you%20will%20be%20directed%20to%20the%20website%20where%20this%20is%20all%20going%20to%20happen.%0A%0ALFG!`;
      window.open(url, '_blank');
      break;
    case 'instagram':
      alert('share on instagram!');
      break;
    case 'whatsapp':
      alert('share on whatsapp!');
      break;
  }
};

const Sharing = () => {
  return (
    <div className='p-8 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 min-h-screen flex items-center justify-center'>
      <div className='bg-white p-4 rounded-lg w-full max-w-md text-black'>
        <div>
          <p className='text-black text-xl mb-2'>
            Whoa. Your Sadhana was added. This is the starting point of
            something big. Eventually, these 20 people will navigate this 10 day
            journey in community and will be transformed with you as a leader.
            Thanks for taking this step. The world needs it.
          </p>
          <Link
            href={'/'}
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
                  onClick={() => handleShare('instagram')}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sharing;
