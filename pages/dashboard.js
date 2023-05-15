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
