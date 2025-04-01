import React from 'react';
import { getValidationStateClass } from '../../utils/validation';

const Select = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  required,
  touched,
  error,
  className = '',
  id
}) => {
  const validationClass = getValidationStateClass(error ? 'invalid' : value ? 'valid' : 'pristine', touched);
  const selectId = id || name;

  return (
    <div className={`flex ${className}`}>
      <label htmlFor={selectId} className="flex-shrink-0 w-1/2 p-4 text-sm font-medium text-gray-900 pl-6">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="flex-1 p-4 w-1/2">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`block w-full h-10 px-3 rounded-md shadow-sm ${validationClass} sm:text-sm`}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select; 