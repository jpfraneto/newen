// components/TimerModal.js
import React, { useState } from 'react';

const TimerModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  console.log('the children of the timermodal', children);

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-10 bg-black'>
      <div className='bg-white relative rounded-lg md:max-w-md md:max-h-full mx-4 my-2 overflow-auto'>
        {children}
        <button
          onClick={onClose}
          className='absolute top-0 right-0 mx-4 text-red-600 hover:text-red-800 font-bold text-2xl'
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default TimerModal;
