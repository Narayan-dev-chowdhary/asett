import React from 'react';

const Radio = ({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  description
}) => {
  return (
    <div className="flex items-start mb-4">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-1.5 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
      />
      <label htmlFor={id} className="ml-3 cursor-pointer">
        <span className="block text-base font-bold text-gray-900 mb-1">{label}</span>
        <span className="block text-sm text-gray-600 leading-relaxed">{description}</span>
      </label>
    </div>
  );
};

export default Radio; 