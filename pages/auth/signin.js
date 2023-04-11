import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { BsTwitter } from 'react-icons/bs';
import { Russo_One } from 'next/font/google';

const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

export default function SignIn({ providers }) {
  return (
    <div className='bacckground text-black min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-center'>
      <div className='w-6/12 m-auto'>
        {' '}
        <h1 className={`${russo.className} text-4xl font-bold mb-4`}>
          Welcome.
        </h1>
        <p className='text-xl  mb-8'>
          We currently only support Twitter login as we believe in the future of
          humanity being closely tied to what happens on Twitter.
        </p>
        {Object.values(providers).map(provider => (
          <div key={provider.name} className='mb-6'>
            <button
              onClick={() => signIn(provider.id)}
              className='bg-blue-500 text-white font-semibold py-2 px-4 rounded-full inline-flex items-center hover:bg-blue-600 transition-colors duration-300 ease-in-out'
            >
              <BsTwitter className='mr-2' />
              Twitter Login
            </button>
          </div>
        ))}
        <p className='text-sm '>
          It&apos;s an honor to have you here. This app is being developed with
          commitment, with love, and with passion with the help of{' '}
          <a
            href='https://www.twitter.com/kithkui'
            target='_blank'
            rel='noreferrer'
            className='bold text-black-400 hover:text-red-500'
          >
            @kithkui
          </a>{' '}
          and ChatGPT.
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
