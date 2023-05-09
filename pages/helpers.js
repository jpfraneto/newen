import React from 'react';
import { useRouter } from 'next/router';

const HelpersPage = () => {
  const router = useRouter();

  const updateDatabase = async () => {
    alert('wena compare!');


  return (
    <div className='container mx-auto py-4'>
      <h1 className='text-2xl mb-4'>Helpers</h1>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={updateDatabase}
      >
        Update Sadhanas Database
      </button>
    </div>
  );
};

export default HelpersPage;
