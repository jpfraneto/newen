import '@component/styles/globals.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SSRProvider } from 'react-bootstrap';
import { Rubik_80s_Fade, Russo_One } from 'next/font/google';
import Navbar from '@component/components/Navbar';
import NewNav from '@component/components/NewNav';

// If loading a variable font, you don't need to specify the font weight
const rubik = Rubik_80s_Fade({ weight: '400', subsets: ['latin'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

export default function App({ Component, pageProps }) {
  return (
    <SSRProvider>
      {' '}
      <Head>
        <title>sadhana · the power of consistency</title>
      </Head>
      <SessionProvider
        className={`${russo.className}`}
        session={pageProps.session}
      >
        <NewNav />
        <div className='flex flex-col min-h-screen'>
          <div>
            <Component {...pageProps} />
          </div>

          {/* <Footer /> */}
        </div>
        <ToastContainer />
      </SessionProvider>
    </SSRProvider>
  );
}
