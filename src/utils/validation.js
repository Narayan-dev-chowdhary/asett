// Validation states
export const ValidationState = {
  PRISTINE: 'pristine', // Initial state, no validation performed
  VALID: 'valid',       // Validation passed
  INVALID: 'invalid'    // Validation failed
};

// Email validation
export const validateEmail = (email) => {
  if (!email && email !== '') return ValidationState.PRISTINE;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email) ? ValidationState.VALID : ValidationState.INVALID;
};

// Phone number validation (US format)
export const validatePhone = (phone) => {
  if (!phone && phone !== '') return ValidationState.PRISTINE;
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone) ? ValidationState.VALID : ValidationState.INVALID;
};

// ZIP code validation (US format)
export const validateZipCode = (zip) => {
  if (!zip && zip !== '') return ValidationState.PRISTINE;
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip) ? ValidationState.VALID : ValidationState.INVALID;
};

// Required field validation
export const validateRequired = (value) => {
  if (!value && value !== '') return ValidationState.PRISTINE;
  return value?.trim() ? ValidationState.VALID : ValidationState.INVALID;
};

// Number validation
export const validateNumber = (number) => {
  if (!number && number !== '') return ValidationState.PRISTINE;
  return !isNaN(number) && number !== '' ? ValidationState.VALID : ValidationState.INVALID;
};

// Radio group validation
export const validateRadioGroup = (value, required = false) => {
  if (!required && !value) return ValidationState.PRISTINE;
  if (required && !value) return ValidationState.INVALID;
  return ValidationState.VALID;
};

// Get validation state class
export const getValidationStateClass = (validationState, touched = false, isActiveError = false) => {
  if (!touched) return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white';
  
  switch (validationState) {
    case ValidationState.VALID:
      return 'border-green-500 focus:border-green-500 focus:ring-green-500 bg-white';
    case ValidationState.INVALID:
      return isActiveError 
        ? 'border border-red-500 focus:border-red-500 focus:ring-red-500 bg-white'
        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white';
    default:
      return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white';
  }
};

// Validate by type
export const validateByType = (value, type, required = false) => {
  if (!required && !value) return ValidationState.PRISTINE;
  
  switch (type) {
    case 'email':
      return validateEmail(value);
    case 'phone':
      return validatePhone(value);
    case 'number':
      return validateNumber(value);
    case 'zipcode':
      return validateZipCode(value);
    case 'radio':
      return validateRadioGroup(value, required);
    default:
      return required ? validateRequired(value) : ValidationState.PRISTINE;
  }
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(fieldName => {
    const value = formData[fieldName];
    const rules = validationRules[fieldName];
    
    const validationState = validateByType(
      value,
      rules.type || 'text',
      rules.required || false
    );

    if (validationState === ValidationState.INVALID) {
      errors[fieldName] = rules.errorMessage || getErrorMessage(rules.type, rules.label);
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Example validation rules structure
export const createValidationRules = (fields) => {
  const rules = {};
  
  fields.forEach(field => {
    rules[field.name] = {
      type: field.type || 'text',
      required: field.required || false,
      errorMessage: field.errorMessage || `${field.label} is required`
    };
  });
  
  return rules;
};

// Get error message based on validation type
export const getErrorMessage = (type, fieldName) => {
  switch (type) {
    case 'email':
      return 'Please enter a valid email address';
    case 'phone':
      return 'Please enter a valid phone number';
    case 'zipcode':
      return 'Please enter a valid ZIP code';
    case 'number':
      return 'Please enter a valid number';
    default:
      return `${fieldName} is required`;
  }
}; 