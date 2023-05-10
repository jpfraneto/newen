import React from 'react';
import NewSadhana from '@component/components/NewSadhana';

const NewSadhanaPage = () => {
  return (
    <div
      className='h-screen flex items-center justify-center bg-cover bg-center'
      style={{ backgroundImage: "url('/images/ankyinviting.png')" }}
    >
      <div className=' h-full bg-black opacity-50' />
      <div>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-50' />
        <div className='w-full md:max-w-3xl mx-auto transform-x-1/2 min-h-screen top-0  left-0 h-full flex  justify-center text-center p-2 px-8'>
          <NewSadhana />
        </div>
      </div>
    </div>
  );
};

export default NewSadhanaPage;
