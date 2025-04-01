import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary', 
  type = 'button',
  className = ''
}) => {
  const baseStyles = "px-8 py-2 text-black border-2 border-black rounded cursor-pointer transition-colors";
  
  const variants = {
    primary: `${baseStyles} ${
      disabled 
        ? 'bg-gray-400 cursor-not-allowed' 
        : 'bg-blue-600 hover:bg-yellow-300 hover:text-white'
    }`,
    secondary: `${baseStyles} bg-white hover:bg-gray-100`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 