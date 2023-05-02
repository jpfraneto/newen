import React from 'react';
import { useRouter } from 'next/router';

const HelpersPage = () => {
  const router = useRouter();

  const updateDatabase = async () => {
    alert('wena compare!');
    // try {
    //   const response = await fetch('/api/update-sadhanas', {
    //     method: 'POST',
    //   });
    //   const data = await response.json();
    //   console.log(data);
    //   alert('Database updated successfully');
    // } catch (error) {
    //   console.error('Error updating database:', error);
    //   alert('Error updating database');
    // }
  };

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
