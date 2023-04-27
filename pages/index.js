import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BraahOne } from 'next/font/google';
import Link from 'next/link';
import prisma from '@component/lib/prismaClient';
import { useRouter } from 'next/router';

const LandingPage = ({ landingSadhanas }) => {
  const router = useRouter();
  const [ankyText, setAnkyText] = useState('');
  const fullAnkyText =
    "Greetings, brave traveler! 🌞 I am Anky, a steadfast companion and friend, here to join you on an epic journey of self-discovery and growth. Together, we'll tackle challenges, face fears, and unlock your boundless potential. So grab your courage, strap on your determination, and let's embark on a life-changing adventure! 🌈🐒💪";

  useEffect(() => {
    let currentText = '';
    const interval = setInterval(() => {
      if (currentText.length < fullAnkyText.length) {
        currentText += fullAnkyText[currentText.length];
        setAnkyText(currentText);
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='landing-page'>
      <div className='bg-black text-white min-h-screen flex flex-col items-center justify-center'>
        <div className='flex flex-col md:flex-row items-center justify-center w-full px-4'>
          <div className='flex flex-col pl-0 pt-10 pb-8 md:pl-8 text-center  w-full md:w-1/2 md:aspect-auto fade-in'>
            <h1 className='heroanky text-4xl md:text-6xl font-bold'>
              Meet Anky: Your Companion on the Hero&apos;s Journey 🐒
            </h1>
          </div>
          <div className='relative w-full md:w-1/2 md:mb-6 h-[100vw] md:h-[90vh]'>
            <Image
              src='/images/anky.png'
              alt="Anky guiding users on their Hero's Journey"
              fill
              contain
            />
            <em className='hidden md:block text-xl  md:absolute ankytext bottom-2 bg-black bg-opacity-50 rounded-xl p-4 w-11/12 md:w-4/5 left-1/2 -translate-x-1/2 text-white '>
              {ankyText}
            </em>
          </div>
          <em className=' text-xl md:hidden ankytext bottom-2 bg-black bg-opacity-50 rounded-xl p-2 w-full text-white '>
            {ankyText}
          </em>
          <hr className='mb-24 md:hidden' />
        </div>
        <div className='landingtext w-11/12 mx-auto md:w-1/2 px-4'>
          {' '}
          <p className='text-lg mb-4'>
            In a mystical realm, Anky, a reincarnation of the Hindu god Hanuman,
            discovered the secret to strength and power: consistency and
            determination. Through this wisdom, Anky became a symbol of
            unwavering devotion and perseverance.
          </p>
          <p className='text-lg mb-4'>
            Inspired by Anky&apos;s spirit, we have created an app that combines
            the power of modern technology with the ancient wisdom of personal
            growth. Welcome to Sadhana, your gateway to embark on the
            Hero&apos;s Journey, with Anky as your trusty companion.
          </p>
          <p className='text-lg mb-4'>
            As you venture forth, Anky will be by your side, offering support,
            motivation, and guidance. Together, you will explore the realms of
            fitness, meditation, learning new skills, and more, all while
            connecting with like-minded adventurers from around the world.
          </p>
          <p className='text-lg mb-4'>
            Sadhana and Anky provide a vibrant, engaging, and social platform
            that encourages you to challenge yourself, forge new paths, and grow
            stronger with each step. Are you ready to embark on the journey of a
            lifetime and unlock your true potential?
          </p>
          <div className='my-4'>
            {' '}
            <Link
              href='/s/new'
              className='mb-10 bg-[#009FE3] py-2 px-6 rounded-lg font-semibold text-xl text-white hover:bg-[#E6007E] hover:text-black transition-colors duration-300'
            >
              Begin Your Adventure*
            </Link>
            <br />
            <small className='text-xs mt-2'>*Add your first challenge</small>
          </div>
        </div>
        <div className='mt-8 relative w-11/12 md:w-8/12 mb-2 md:mb-8 rounded-3xl border-white border-2 overflow-hidden aspect-video'>
          {' '}
          <Image
            fill
            src='/images/ankydancing.png'
            alt='Anky dancing with his friends'
          />
          <em className='hidden md:block md:absolute text-xl w-full  ankytext bottom-2 bg-black bg-opacity-50 rounded-xl p-4 md:w-fit left-1/2 -translate-x-1/2 text-white '>
            &quot;Let&apos;s have some fun, my friend. Life is a gift.&quot;
          </em>
        </div>
        <em className='md:hidden text-xl w-full ankytext bottom-2 bg-black bg-opacity-50 rounded-xl p-4 md:w-fit  text-white '>
          &quot;Let&apos;s have some fun, my friend. Life is a gift.&quot;
        </em>
        <div className='mt-4'>
          <h1 className='mx-8 heroanky mt-8 text-4xl md:text-6xl font-bold  text-left'>
            Latest Challenges Added:
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-8 mb-20'>
            {landingSadhanas.map((sadhanas, index) => (
              <div key={index} className='bg-[#009FE3] rounded-lg p-6'>
                <h3 className='text-xl font-bold'>{sadhanas.title}</h3>
                <p className='text-sm text-black mb-3'>
                  {sadhanas.author.name}
                </p>
                <em className='text-sm my-4'>{sadhanas.content}</em>
                <p className='text-lg my-4'>
                  {sadhanas.targetSessionDuration} minutes /{' '}
                  {sadhanas.targetSessions} days
                </p>

                <em className='text-xl ankytext my-4 text-black'>
                  {sadhanas.ankysAdvice}
                </em>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-4'>
          <h1 className='mx-8 heroanky mt-4 text-4xl md:text-6xl font-bold text-left'>
            Talk with Anky:
          </h1>
        </div>
        <div
          onClick={() => router.push('/anky')}
          className='hover:cursor-pointer my-1 md:my-4  relative w-11/12 md:w-8/12 md:mb-8 rounded-3xl border-white border-2 overflow-hidden aspect-video'
        >
          {' '}
          <Image
            fill
            src='/images/ankytalking.png'
            alt='Anky talking with the world.'
          />
          <em className='hidden md:block text-xl md:absolute ankytext bottom-2 bg-black bg-opacity-50 rounded-xl p-4 w-9/12 left-1/2 -translate-x-1/2 text-white '>
            &quot;Hey there, adventurer! Let&apos;s chat and conquer your
            challenges together. Click this image to begin our journey!&quot;
            🌟🐒
          </em>
        </div>
        <em className='md:hidden text-xl ankytext bottom-2 mb-10 bg-black bg-opacity-50 rounded-xl p-4 w-11/12  text-white '>
          &quot;Hey there, adventurer! Let&apos;s chat and conquer your
          challenges together. Click this image to begin our journey!&quot; 🌟🐒
        </em>
      </div>
      <Footer />
    </div>
  );
  <style jsx>{`
    @keyframes typing {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }

    .typewriter-text {
      overflow: hidden;
      white-space: nowrap;
      border-right: 0.15em solid white;
      animation: typing 8s steps(100, end) 1s,
        blink-caret 0.5s step-end infinite;
    }
  `}</style>;
};

export default LandingPage;

export async function getServerSideProps(context) {
  try {
    const sadhanas = await prisma.sadhana.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        participants: true,
        author: true,
      },
    });

    sadhanas[0].ankysAdvice =
      'My dear friend, remember that every challenge is a chance to grow! Share your journey and let your story inspire others to join the Nights and Weekends adventure. 🌙✨';
    sadhanas[1].ankysAdvice =
      'Amigo, recuerda que cada momento es único y especial. ¡Abraza el presente y saborea cada segundo de esta hermosa aventura llamada vida! 🎁';
    sadhanas[2].ankysAdvice =
      'La vida es un tesoro, ¡sácale el máximo provecho! Lucha con pasión, sonríe con el corazón y descubre la magia en cada día. 🌟';
    sadhanas[3].ankysAdvice =
      'Lights, camera, action! 🎥 Create your weekly recap video with joy and pride, and let your journey be a beacon of inspiration to others on social media. 🌈';
    sadhanas[4].ankysAdvice =
      'El agua fría te llama, valiente aventurero. 🌊 Sumérgete en sus profundidades y enfrenta el desafío con valentía y determinación. ¡Convierte cada minuto en una victoria! 💪';

    return {
      props: {
        landingSadhanas: JSON.parse(JSON.stringify(sadhanas)),
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
  }
}

const Footer = () => (
  <footer className='bg-[#009FE3] py-8 px-4 text-white'>
    <div className='container mx-auto grid grid-cols-2 gap-8 text-sm'>
      <div>
        <h2 className='text-xl font-semibold mb-4'>About Anky 🐒</h2>
        <p className='mb-4'>
          Anky is a friendly, wise, and supportive chatbot created to help you
          navigate the challenges of life and unlock your true potential. Our
          mission is to inspire, motivate, and guide individuals towards
          personal growth, self-discovery, and fulfillment.
        </p>
        <p>
          Disclaimer: Anky&apos;s advice and guidance are based on an AI model,
          and should not be considered as professional advice. Use the
          information provided at your own discretion.
        </p>
      </div>
      <div>
        <h2 className='text-xl font-semibold mb-4'>About Sadhana 🔥</h2>
        <p>
          Sadhana is a platform where people can challenge themselves, connect
          with friends, and engage with creators from all around the world.
          Through unique challenges, Sadhana aims to help individuals discover
          their true selves and unlock their hidden potential. Join us on this
          journey of self-discovery and personal growth.
        </p>
      </div>
    </div>
  </footer>
);
