import React from 'react';
import NewSadhana from '@component/components/NewSadhana';

const NewSadhanaPage = () => {
  return (
    <div
      className='relative h-screen flex items-center justify-center w-full bg-cover bg-center'
      // style={{
      //   backgroundImage:
      //     "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/images/ankyinviting.png')",
      // }}
    >
      <div>
        <div className='w-full md:max-w-3xl mx-auto transform-x-1/2 min-h-screen top-0  left-0 h-full flex  justify-center text-center p-2 px-2 md:px-16'>
          <NewSadhana />
        </div>
      </div>
    </div>
  );
};

export default NewSadhanaPage;
