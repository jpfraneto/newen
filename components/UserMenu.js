// components/UserMenu.js
import React from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';
import { Righteous, Russo_One } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

const UserMenu = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleRetrieveUsername = () => {
    const resp = confirm(
      'You will be logged out, and if you log in again you will have your twitters username associated with your account.'
    );
    if (resp) signOut();
  };

  if (status === 'loading')
    return (
      <div
        className={`${russo.className} block text-gray-700 text-sm font-bold text-white fixed top-0 left-0 w-full bg-gradient-to-r from-black via-black to-black h-16 py-2 px-4 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out border-white z-50`}
      ></div>
    );

  return (
    <div
      className={`${russo.className} block text-gray-700 text-sm font-bold text-white fixed top-0 left-0 w-full bg-gradient-to-r from-black via-black to-black h-16 py-2 px-4 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out border-white z-50`}
    >
      <div className='container mx-auto'>
        {!session ? (
          <>
            {' '}
            <button
              className='hover:text-green-500 mx-2 text-white text-3xl'
              onClick={signIn}
            >
              Login
            </button>
            <Link
              className='hover:text-blue-400 text-white text-3xl font-bold text-lg'
              href='/s'
            >
              Challenges
            </Link>
          </>
        ) : (
          <>
            {!session.user.username ? (
              <p
                onClick={handleRetrieveUsername}
                className='hover:text-blue-400 hover:cursor-pointer'
              >
                Retrieve Twitter Username
              </p>
            ) : (
              <div className='flex justify-between items-center'>
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={50}
                  height={50}
                  className='w-12 h-12 rounded-full border-white border-2'
                />
                <div className=''>
                  <Link href={`/u/${session.user.id}`} className='text-white'>
                    @{session.user.username}
                  </Link>
                  <div className='flex space-x-4'>
                    <Link
                      className='hover:text-blue-400 text-white font-bold text-lg'
                      href='/'
                    >
                      Landing
                    </Link>
                    <Link
                      className='hover:text-blue-400 text-white font-bold text-lg'
                      href='/s'
                    >
                      Challenges
                    </Link>
                    <Link
                      className='hover:text-blue-400 text-white font-bold text-lg'
                      href='/dashboard'
                    >
                      Dashboard
                    </Link>
                    <button
                      className='hover:text-red-500 text-white font-bold text-lg'
                      onClick={signOut}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserMenu;

// // components/UserMenu.js
// import React from 'react';
// import { useSession, signOut, signIn } from 'next-auth/react';
// import { Righteous, Russo_One } from 'next/font/google';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useRouter } from 'next/router';

// const righteous = Righteous({ weight: '400', subsets: ['latin'] });
// const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

// const UserMenu = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const handleRetrieveUsername = () => {
//     const resp = confirm(
//       'You will be logged out, and if you log in again you will have your twitters username associated with your account.'
//     );
//     if (resp) signOut();
//   };

//   if (status === 'loading') return;

//   return (
//     <div
//       className={`${russo.className} blocktext-gray-700 text-sm font-bold text-white  absolute text-center left-1/2 transform -translate-x-1/2 md:transform md:-translate-none md:left-auto rounded-xl md:bottom-20  md:w-fit md:right-4 mx-0 md:mx-3 md:inline-block bg-gradient-to-r from-black via-black to-black   py-2 px-16  md:rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out border-white md:h-fit`}
//     >
//       {!session ? (
//         <button className='hover:text-green-500 text-white' onClick={signIn}>
//           Login
//         </button>
//       ) : (
//         <>
//           {!session.user.username ? (
//             <p
//               onClick={handleRetrieveUsername}
//               className='hover:text-blue-400 hover:cursor-pointer'
//             >
//               Retrieve Twitter Username
//             </p>
//           ) : (
//             <div className='flex md:flex-none justify-center md:flex-col'>
//               <Image
//                 src={session.user.image}
//                 alt={session.user.name}
//                 width={100}
//                 height={100}
//                 className='mr-2 md:m-auto w-24 h-24 rounded-full border-white border-2'
//               />
//               <div className=''>
//                 {' '}
//                 <Link
//                   href={`/u/${session.user.id}`}
//                   className='text-white  mt-2'
//                 >
//                   @{session.user.username}
//                 </Link>
//                 {/* <p>0/X ready today</p> */}
//                 <div className='mt-2 flex flex-col items-center'>
//                   <Link
//                     className='hover:text-blue-400 text-white font-bold text-lg mr-4'
//                     href='/dashboard'
//                   >
//                     Dashboard
//                   </Link>
//                   <button
//                     className='hover:text-red-500 text-white font-bold text-lg'
//                     onClick={signOut}
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default UserMenu;
