import { getServerSession } from 'next-auth/next';
import { getProviders, signIn, getCsrfToken } from 'next-auth/react';

import { BsTwitter } from 'react-icons/bs';
import { Russo_One } from 'next/font/google';
import Button from '@component/components/Button';

const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

export default function SignIn({ providers, csrfToken }) {
  return (
    <div className='bacckground text-black min-h-screen bg-cover bg-center flex flex-col items-center pt-32 text-center'>
      <div className='w-6/12 '>
        {' '}
        <h1 className={`${russo.className} text-4xl font-bold mb-4`}>
          Welcome. It&apos;s inspiring to have you here.
        </h1>
        <p className='text-xl  mb-8'>
          This is the first step towards your personal evolution, and by
          creating an account you will be able to commit to challenges and track
          your progress.
        </p>
        <div className='flex flex-row justify-center mb-4 '>
          {Object.values(providers).map(provider => (
            <div key={provider.name} className='mx-2'>
              <Button
                buttonText={provider.name}
                buttonAction={() => signIn(provider.id)}
              />
            </div>
          ))}
        </div>
        <p className='text-sm w-full px-2 md:max-w-xl mx-auto '>
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
  console.log('the session is:', session);
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken();
  return {
    props: {
      providers: providers ?? [],
      csrfToken: csrfToken ?? [],
    },
  };
}
