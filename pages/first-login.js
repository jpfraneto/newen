import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const FirstLogin = () => {
  const router = useRouter();
  useEffect(() => {
    signOut();
    router.push('/login');
  }, [router]);
  return <div>FirstLogin</div>;
};

export default FirstLogin;
