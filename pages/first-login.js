import React, { useEffect } from 'react';

const FirstLogin = () => {
  const router = useRouter();
  useEffect(() => {
    signOut();
    router.push('/login');
  }, []);
  return <div>FirstLogin</div>;
};

export default FirstLogin;
