import '@component/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>sadhana · the power of consistency</title>
        <meta
          name='description'
          content='Train your capacity for being consistent with gamified challenges.'
          key='desc'
        />
        <meta
          property='og:description'
          content='Train your consistency with sadhana.'
        />
      </Head>
      <Component Component={Component} pageProps={pageProps} />
    </>
  );
}
