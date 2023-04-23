import React from 'react';
import NewSadhana from '@component/components/NewSadhana';

const NewSadhanaPage = () => {
  return (
    <div className='p-8 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 min-h-screen flex items-center justify-center'>
      <div className='bg-white p-4 rounded-lg w-full max-w-md'>
        <NewSadhana />
      </div>
    </div>
  );
};

export default NewSadhanaPage;
