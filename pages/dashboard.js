import React from 'react';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      {session ? <p>You are logged in!</p> : <p>You are not logged in 😞</p>}
    </div>
  );
};

export default Dashboard;
