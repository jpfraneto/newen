import '@component/styles/globals.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Rubik_80s_Fade, Russo_One } from 'next/font/google';
import NewNav from '@component/components/NewNav';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>sadhana · the power of consistency</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <NewNav />
        <div className='flex flex-col'>
          <div className=''>
            <Component {...pageProps} />
          </div>
        </div>
        <ToastContainer />
      </SessionProvider>
    </>
  );
}
