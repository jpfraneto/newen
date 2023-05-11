import '@component/styles/globals.css';
import Head from 'next/head';
import { ModeProvider } from '../context/ModeContext';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import PlayContent from '@component/components/PlayContent';
import 'react-toastify/dist/ReactToastify.css';
import {
  Rubik_80s_Fade,
  Russo_One,
  Londrina_Shadow,
  Luckiest_Guy,
} from 'next/font/google';
import { useMode } from '@component/context/ModeContext';
import NewNav from '@component/components/NewNav';
import CoolFooter from '@component/components/CoolFooter';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });
const luckiestguy = Luckiest_Guy({ weight: '400', subsets: ['latin'] });
const londrinashadow = Londrina_Shadow({ weight: '400', subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>sadhana · the power of consistency</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <ModeProvider>
          <Content Component={Component} pageProps={pageProps} />
          <CoolFooter />
        </ModeProvider>
      </SessionProvider>
    </>
  );
}

function Content({ Component, pageProps }) {
  const { mode } = useMode();

  return mode === 'deep work' ? (
    <DeepWorkContent Component={Component} pageProps={pageProps} />
  ) : (
    <PlayContent />
  );
}

function DeepWorkContent({ Component, pageProps }) {
  return (
    <>
      <NewNav />
      <div className='flex flex-col pb-10'>
        <div className=''>
          <Component {...pageProps} />
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

// function PlayContent() {
//   return (
//     <div
//       className='h-screen bg-cover bg-center bg-no-repeat'
//       style={{
//         backgroundImage:
//           "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/ankywallpaper.png')",
//       }}
//     >
//       <div className='h-full flex-col flex items-center pt-24'>
//         <h1 className='text-6xl md:text-7xl font-bold text-thewhite space-x-4 mb-0'>
//           <span className={`${luckiestguy.className}`}>SADHANA</span>
//           <span className={`${londrinashadow.className} ml-2`}>TV</span>
//         </h1>
//         <div className='player-wrapper my-0 bg-theblack mb-2 rounded-xl overflow-hidden'>
//           <ReactPlayer
//             className='react-player aspect-video'
//             url='https://www.youtube.com/watch?v=xDAs21ETTSY&pp=ygUMY29uc2lzdGVuY3kg'
//             fill
//             controls={true}
//           />
//         </div>
//         <p className='text-thewhite hover:text-thered hover:cursor-pointer'>
//           wtf is this?
//         </p>
//       </div>
//     </div>
//   );
// }
