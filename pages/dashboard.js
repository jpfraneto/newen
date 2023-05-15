import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import DashboardComponent from '@component/components/DashboardComponent';
import Link from 'next/link';
import { getLayout } from '@component/components/AccountLayout';
import Spinner from '@component/components/Spinner';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const size = useWindowSize();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  if (size.width < 500) return router.push('/m/dashboard');

  const now = new Date().getTime();
  if (!session)
    return (
      <div>
        <button>go back</button>
      </div>
    );
  if (status === 'loading') {
    return <p>Hang on there...</p>;
  }
  if (status === 'authenticated') {
    return (
      <div className=''>
        {loading ? <Spinner /> : <DashboardComponent session={session} />}
      </div>
    );
  }
  return <div>You need to login first to access this thing.</div>;
};

Dashboard.getLayout = getLayout;

export default Dashboard;

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

// import React from 'react';
// import { useRouter } from 'next/router';
// import { signIn, signOut, useSession } from 'next-auth/react';
// import { formatDate } from '@component/lib/functions';
// import { toast } from 'react-toastify';
// import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
// import Image from 'next/image';
// import Layout from '@component/components/Layout';
// import Link from 'next/link';
// import BiggerLayout from '@component/components/BiggerLayout';
// import DashboardComponent from '@component/components/DashboardComponent';
// import Button from '@component/components/Button';

// const righteous = Righteous({ weight: '400', subsets: ['latin'] });

// const Dashboard = () => {
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   if (status === 'loading') return <p>Loading</p>;
//   if (!session)
//     return (
//       <Layout>
//         <div className='p-8 rounded-lg w-full max-w-md'>
//           <p className={`${righteous.className} text-white`}>
//             Sorry, but are not allowed to be here.
//           </p>
//           <Button buttonAction={signIn} buttonText='Login' />
//         </div>
//       </Layout>
//     );
//   if (!session.user.whatsapp)
//     toast(<NewToast />, {
//       position: 'top-right',
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: 'light',
//     });

//   return (
//     <BiggerLayout>
//       {session ? (
//         <div className='md:px-2 max-w-full md:w-8/12 m-auto py-3 md:py-4'>
//           <div className='text-black flex flex-col justify-items-center items-center py-4'>
//             <h4
//               className={`${righteous.className} text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] text-center text-thegreen md:text-5xl w-full font-bold`}
//             >
//               {formatDate(new Date().getTime())} |{' '}
//               {session.user.username
//                 ? `@${session.user.username}`
//                 : session.user.name || session.user.email}{' '}
//             </h4>
//             <Image
//               width={111}
//               height={111}
//               src={session.user.image || '/images/ankycompressed.png'}
//               className='rounded-full mt-2 border-2 border-black'
//               alt='Profile picture'
//             />
//             <p>
//               Points: {session.user.points} | Level: {session.user.level}
//             </p>

//             <div className='flex space-x-2 mt-2'>
//               <Button
//                 buttonAction={() => router.push('/settings')}
//                 buttonText='Edit Profile'
//               />
//               <Button
//                 buttonAction={() => {
//                   signOut({
//                     callbackUrl: `${window.location.origin}`,
//                   });
//                 }}
//                 buttonText='Logout'
//                 buttonColor='bg-theredbtn'
//               />
//             </div>
//           </div>
//           <DashboardComponent session={session} />
//         </div>
//       ) : (
//         <>
//           {' '}
//           <p>You are not logged in 😞</p>
//           <Button buttonAction={signIn} buttonText={Login} />
//         </>
//       )}
//     </BiggerLayout>
//   );
// };

// export default Dashboard;

// const NewToast = () => {
//   return (
//     <Link passHref href='/settings'>
//       Click here to add a whatsapp number to your profile.
//     </Link>
//   );
// };
