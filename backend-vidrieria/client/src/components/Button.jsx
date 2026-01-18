import React from 'react';

const Button = ({ children, onClick, className = '', type = 'button' }) => {
  const baseStyle =
    'px-6 py-2 font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300';

  const primaryStyle = `bg-gold-medium text-white hover:bg-gold-dark focus:ring-gold-medium ${className}`;

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${primaryStyle}`}>
      {children}
    </button>
  );
};

export default Button;
