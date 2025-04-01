import { useState } from 'react';
import { validateForm } from '../utils/validation';

const useFormValidation = (initialData = {}, validationRules = {}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateField = (name) => {
    const { errors: fieldErrors } = validateForm(
      { [name]: formData[name] },
      { [name]: validationRules[name] }
    );
    
    setErrors(prev => ({
      ...prev,
      [name]: fieldErrors[name]
    }));

    return !fieldErrors[name];
  };

  const validateAllFields = () => {
    // Mark all fields as touched
    const allFields = Object.keys(validationRules).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(allFields);

    // Validate all fields
    const { isValid, errors: newErrors } = validateForm(formData, validationRules);
    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name);
  };

  const resetForm = () => {
    setFormData(initialData);
    setErrors({});
    setTouched({});
  };

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateField,
    validateAllFields,
    resetForm,
    setFormData,
    setTouched
  };
};

export default useFormValidation; 