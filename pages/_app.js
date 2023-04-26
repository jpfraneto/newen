import '@component/styles/globals.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { Rubik_80s_Fade, Russo_One } from 'next/font/google';
import UserMenu from '../components/UserMenu'; // Import UserMenu component
import Footer from '../components/Footer';
import Navbar from '@component/components/Navbar';

// If loading a variable font, you don't need to specify the font weight
const rubik = Rubik_80s_Fade({ weight: '400', subsets: ['latin'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>sadhana · the power of consistency</title>
      </Head>
      <SessionProvider
        className={`${russo.className}`}
        session={pageProps.session}
      >
        <Navbar />
        <div className='flex flex-col min-h-screen'>
          <div className='flex-grow'>
            <Component {...pageProps} />
          </div>
          {/* <Footer /> */}
        </div>
      </SessionProvider>
    </>
  );
}
