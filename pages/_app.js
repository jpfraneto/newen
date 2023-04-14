import '@component/styles/globals.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { Rubik_80s_Fade } from 'next/font/google';
import UserMenu from '../components/UserMenu'; // Import UserMenu component

// If loading a variable font, you don't need to specify the font weight
const rubik = Rubik_80s_Fade({ weight: '400', subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>sadhana · the power of consistency</title>
      </Head>
      <SessionProvider className={rubik.className} session={pageProps.session}>
        <UserMenu /> {/* Add UserMenu component */}
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
