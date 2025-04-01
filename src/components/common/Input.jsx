import React from 'react';
import { getValidationStateClass } from '../../utils/validation';

const Input = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  required,
  touched,
  error,
  extension,
  className = '',
  id,
  isActiveError
}) => {
  const validationClass = getValidationStateClass(error ? 'invalid' : value ? 'valid' : 'pristine', touched, isActiveError);
  const inputId = id || name;

  return (
    <div className={`flex ${className}`}>
      <label htmlFor={inputId} className="flex-shrink-0 w-1/2 p-4 text-sm font-medium text-gray-900 pl-6">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="flex-1 p-4 w-1/2">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              id={inputId}
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              className={`block w-full h-10 px-3 rounded-md shadow-[0_2px_4px_0_rgba(0,0,0,0.2)] ${validationClass} transition-all duration-200 sm:text-sm`}
            />
          </div>
          {extension && (
            <div className="w-24">
              <input
                type="text"
                name={extension.name}
                value={extension.value}
                onChange={extension.onChange}
                placeholder="Ext."
                className="block w-full h-10 px-3 rounded-md border-gray-300 shadow-[0_2px_4px_0_rgba(0,0,0,0.2)] focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input; 