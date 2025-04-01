import React from 'react';
import { validateRadioGroup, getValidationStateClass, ValidationState } from '../../utils/validation';

const RadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  required,
  disclaimer,
  className = '',
  touched = false
}) => {
  const validationState = touched ? validateRadioGroup(value, required) : ValidationState.PRISTINE;
  const validationClass = getValidationStateClass(validationState);

  return (
    <div className={`flex ${className}`}>
      <div className="w-1/2 bg-gray-50 p-4">
        <div className="flex flex-col">
          <span className="text-base font-medium text-gray-900">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </span>
          {disclaimer && (
            <div className="text-sm text-gray-600 mt-4">
              <span className="font-bold text-gray-900 block mb-1">Disclaimer:</span>
              {disclaimer}
            </div>
          )}
        </div>
      </div>
      <div className="w-1/2 bg-gray-50 p-4 flex items-start justify-center">
        <div className="flex gap-8">
          {options.map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                className={`h-4 w-4 text-blue-600 ${validationClass}`}
              />
              <span className="ml-2 text-sm text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      {validationState === ValidationState.INVALID && touched && (
        <div className="absolute mt-1 text-sm text-red-500">
          This field is required
        </div>
      )}
    </div>
  );
};

export default RadioGroup; 