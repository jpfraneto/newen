import '@component/styles/globals.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { Rubik_80s_Fade } from 'next/font/google';
import UserMenu from '../components/UserMenu'; // Import UserMenu component
import Footer from '../components/Footer';

// If loading a variable font, you don't need to specify the font weight
const rubik = Rubik_80s_Fade({ weight: '400', subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>sadhana · the power of consistency</title>
      </Head>
      <SessionProvider
        className={`${rubik.className}`}
        session={pageProps.session}
      >
        <UserMenu />
        <div className='pt-16 flex flex-col min-h-screen'>
          <div className='flex-grow'>
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </SessionProvider>
    </>
  );
}
