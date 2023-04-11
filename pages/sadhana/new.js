import React from 'react';
import NewSadhana from '@component/components/NewSadhana';

const NewSadhanaPage = () => {
  return (
    <div className='p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg w-full max-w-md'>
        <NewSadhana />
      </div>
    </div>
  );
};

export default NewSadhanaPage;
