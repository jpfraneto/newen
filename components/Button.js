import React from 'react';

const Button = ({ buttonAction, buttonText, buttonColor = 'bg-theorange' }) => {
  return (
    <button
      className={` ${buttonColor} border border-white text-xl hover:opacity-80 text-black font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline`}
      type='button'
      onClick={buttonAction}
    >
      {buttonText}
    </button>
  );
};

export default Button;
