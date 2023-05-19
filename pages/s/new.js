import React from 'react';
import NewSadhana from '@component/components/NewSadhana';
import NewNav from '@component/components/NewNav';

const NewSadhanaPage = () => {
  return (
    <>
      <NewNav />
      <div
        className='relative h-screen flex items-center justify-center w-full bg-cover bg-center'
        style={{
          boxSizing: 'border-box',
          height: 'calc(100vh - 55px - 30px)',
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/images/ankyinviting.png')",
        }}
      >
        <div>
          <div className='w-full md:max-w-3xl mx-auto transform-x-1/2  top-0  left-0 h-full flex  justify-center text-center p-2 px-2 md:px-16'>
            <NewSadhana />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSadhanaPage;
