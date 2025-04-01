import React from 'react';

const FormRow = ({ index, children }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex items-center ${isEven ? 'bg-white' : 'bg-gray-100'}`}>
      {children}
    </div>
  );
};

export default FormRow; 