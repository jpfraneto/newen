import { getServerSession } from 'next-auth/next';
import { getProviders, signIn, getCsrfToken } from 'next-auth/react';
import { authOptions } from '@component/pages/api/auth/[...nextauth].js';
import { Russo_One } from 'next/font/google';
import Button from '@component/components/Button';
import { useState } from 'react';
import NewNav from '@component/components/NewNav';

const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

export default function SignIn({ providers, csrfToken }) {
  const [emailText, setEmailText] = useState('');
  return (
    <>
      <NewNav />
      <div
        className='relative h-screen flex items-center justify-center w-full bg-cover bg-center'
        style={{
          boxSizing: 'border-box',
          height: 'calc(100vh - 55px - 30px)',
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/ankysworld.png')",
        }}
      >
        <div>
          <div className='w-full pt-32 text-thewhite mx-auto transform-x-1/2 min-h-screen top-0  left-0 h-full flex  justify-center text-center p-2 px-2 md:px-16'>
            <div className='px-4 w-full md:w-8/12 '>
              {' '}
              <h1 className={`${russo.className} text-4xl font-bold mb-4`}>
                Welcome to sadhana.
              </h1>
              <p className='text-md  mb-4'>
                By creating an account you will be able to add and commit to
                challenges, track your progress and play.
              </p>
              {/* <p className='text-md  mb-8'>
        I won&apos;t use your data in any way, and I&apos;m working on
        developing ways for you to access this thing without any credential.
        For now, you just have to trust.
      </p> */}
              <div className='flex flex-col text-theblack w-80 mx-auto mb-4 space-y-1 flex-grow '>
                {Object.values(providers).map(provider => {
                  if (provider.name === 'Email') return;

                  return (
                    <div className='w-full' key={provider.name}>
                      <button
                        className='w-full py-2 px-4 text-xl rounded-full bg-thewhite hover:bg-thegreen hover:text-thewhite border border-theblack'
                        onClick={() => signIn(provider.id)}
                      >{`Sign in with ${provider.name}`}</button>
                    </div>
                  );
                })}
              </div>
              <form
                className='mb-4'
                method='post'
                action='/api/auth/signin/email'
              >
                <input
                  name='csrfToken'
                  type='hidden'
                  defaultValue={csrfToken}
                />
                <div className='flex flex-col w-80 mx-auto space-y-2'>
                  <label className='flex flex-col'>
                    <span className='text-xl'>Sign In With Email</span>

                    <input
                      type='email'
                      id='email'
                      name='email'
                      placeholder='anky@sadhana.lat'
                      onChange={e => setEmailText(e.target.value)}
                      required
                      className='px-2 py-1 text-theblack rounded-xl text-xl border border-theblack'
                    />
                  </label>
                  {emailText && (
                    <Button
                      buttonType='submit'
                      buttonText='Lets go!'
                      className='fadein'
                      buttonColor='bg-thegreenbtn'
                    />
                  )}
                </div>
              </form>
              <p className='text-sm w-full px-2 md:max-w-xl mx-auto '>
                It&apos;s an honor to have you here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return { redirect: { destination: '/' } };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  return {
    props: { csrfToken, providers },
  };
}
