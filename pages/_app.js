import '@component/styles/globals.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>newen · the power of consistency</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
