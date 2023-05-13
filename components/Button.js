import React from 'react';

const Button = ({
  buttonAction = () => {},
  buttonText,
  buttonColor = 'bg-theorange',
  buttonType = 'button',
}) => {
  return (
    <button
      className={`${buttonColor} border border-white text-xl hover:opacity-80 text-black font-bold py-1 px-4 rounded-full focus:outline-none focus:shadow-outline`}
      type={buttonType}
      onClick={buttonAction}
    >
      {buttonText}
    </button>
  );
};

export default Button;
