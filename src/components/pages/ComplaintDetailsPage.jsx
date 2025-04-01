import React, { useState } from 'react';
import Stepper from '../layout/Stepper';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import RadioGroup from '../common/RadioGroup';
import FormRow from '../common/FormRow';
import useFormValidation from '../../hooks/useFormValidation';
import { createValidationRules } from '../../utils/validation';
import { AlertCircle, AlertTriangle } from 'lucide-react';

const ComplaintDetailsPage = ({ activeStep, navigateTo, setActiveStep }) => {
  // Define validation rules array
  const validationRulesArray = [
    {
      name: 'isAnonymous',
      type: 'radio',
      required: true,
      label: 'Select if you want to remain Anonymous'
    },
    {
      name: 'organizationName',
      type: 'text',
      required: true,
      label: 'Enter the Complainant Organization Name'
    },
    {
      name: 'organizationPhone',
      type: 'phone',
      required: true,
      label: 'Enter the Complainant Organization Phone Number',
      validate: (value) => {
        const numbersOnly = value.replace(/\D/g, '');
        if (numbersOnly.length !== 10) {
          return 'Phone number must be 10 digits';
        }
        return '';
      }
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: "Select the Complainant's Title"
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
      label: "Enter the Complainant's First Name"
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      label: "Enter the Complainant's Last Name"
    },
    {
      name: 'addressLine1',
      type: 'text',
      required: true,
      label: "Enter the Complainant's Address Line 1"
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      label: "Enter the Complainant's City/Town"
    },
    {
      name: 'state',
      type: 'text',
      required: true,
      label: "Select the Complainant's State/Territory"
    },
    {
      name: 'zipCode',
      type: 'text',
      required: false,
      label: "Enter the Complainant's ZIP Code"
    },
    {
      name: 'zipExt',
      type: 'extension',
      required: false,
      label: "ZIP Code Extension",
      validate: (value) => {
        if (!value) return ''; // Optional field
        const numbersOnly = value.replace(/[^0-9]/g, '');
        if (numbersOnly.length > 3) {
          return 'Extension must be 3 digits or less';
        }
        if (!/^\d+$/.test(value)) {
          return 'Extension must contain only numbers';
        }
        return '';
      }
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: "Enter the Complainant's Email Address",
      validate: (value) => {
        if (!value) {
          return 'Email is required';
        }
        // Email regex pattern
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      }
    },
    {
      name: 'contactPhone',
      type: 'phone',
      required: true,
      label: "Enter the Complainant's Contact Phone Number",
      validate: (value) => {
        const numbersOnly = value.replace(/\D/g, '');
        if (numbersOnly.length !== 10) {
          return 'Phone number must be 10 digits';
        }
        return '';
      }
    },
    {
      name: 'cellPhone',
      type: 'phone',
      required: false,
      label: "Enter the Complainant's Cell Phone Number",
      validate: (value) => {
        if (!value) return ''; // Optional field
        const numbersOnly = value.replace(/\D/g, '');
        if (numbersOnly.length !== 10) {
          return 'Phone number must be 10 digits';
        }
        return '';
      }
    },
    {
      name: 'organizationPhoneExt',
      type: 'extension',
      required: false,
      validate: (value) => {
        if (!value) return ''; // Optional field
        const numbersOnly = value.replace(/\D/g, '');
        if (numbersOnly.length > 3) {
          return 'Extension must be 3 digits or less';
        }
        return '';
      }
    },
    {
      name: 'contactPhoneExt',
      type: 'extension',
      required: false,
      validate: (value) => {
        if (!value) return ''; // Optional field
        const numbersOnly = value.replace(/\D/g, '');
        if (numbersOnly.length > 3) {
          return 'Extension must be 3 digits or less';
        }
        return '';
      }
    }
  ];

  // Create validation rules object
  const validationRules = createValidationRules(validationRulesArray);

  const {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAllFields,
    setTouched
  } = useFormValidation({
    isAnonymous: '',
    organizationName: '',
    organizationType: '',
    organizationTypeOther: '',
    organizationRole: '',
    title: '',
    firstName: '',
    middleInitial: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    zipExt: '',
    email: '',
    organizationPhone: '',
    organizationPhoneExt: '',
    contactPhone: '',
    contactPhoneExt: '',
    cellPhone: ''
  }, validationRules);

  const [activeErrorField, setActiveErrorField] = useState(null);

  const handleEmptyRoute = (e, routeName) => {
    e.preventDefault();
    alert(`This ${routeName} page is not available yet.`);
  };

  const handleNext = (e) => {
    // Mark all fields as touched before validation
    const allFields = Object.keys(validationRules).reduce((acc, fieldName) => {
      acc[fieldName] = true;
      return acc;
    }, {});
    setTouched(allFields);

    // Force validation of all fields
    const isValid = validateAllFields();
    
    if (isValid) {
      handleEmptyRoute(e, 'FAE Details');
    } else {
      // Scroll to top when there are validation errors
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Get all active errors for the error summary
  const activeErrors = Object.entries(errors)
    .filter(([field, error]) => touched[field] && error)
    .map(([field, error]) => {
      const rule = validationRulesArray.find(r => r.name === field);
      return {
        field,
        label: rule?.label || field,
        message: error
      };
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // ZIP code - allow any input, no validation
    if (name === 'zipCode') {
      handleChange(name, value);
      return;
    }

    // ZIP extension - allow any input, no validation
    if (name === 'zipExt') {
      handleChange(name, value);
      return;
    }

    // Phone number validation
    if (name === 'organizationPhone' || name === 'contactPhone' || name === 'cellPhone') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      if (numbersOnly.length <= 10) {
        let formattedNumber = numbersOnly;
        if (numbersOnly.length >= 3) {
          formattedNumber = `(${numbersOnly.slice(0, 3)})${numbersOnly.length > 3 ? ` ${numbersOnly.slice(3, 6)}` : ''}${numbersOnly.length > 6 ? `-${numbersOnly.slice(6, 10)}` : ''}`;
        }
        handleChange(name, formattedNumber);
      }
      return;
    }

    // Extension validation - allow only numbers and max 3 digits
    if (name === 'organizationPhoneExt' || name === 'contactPhoneExt') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      if (numbersOnly.length <= 3) {
        handleChange(name, numbersOnly);
      }
      return;
    }

    handleChange(name, value);
  };

  const organizationTypes = [
    { value: 'provider', label: 'Healthcare Provider' },
    { value: 'payer', label: 'Health Plan/Payer' },
    { value: 'vendor', label: 'Healthcare Vendor' },
    { value: 'other', label: 'Other' }
  ];

  const anonymousOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  const states = [
    { value: '', label: '--None--' },
    { value: 'AL', label: 'Alabama' },
    // Add other states here
  ];

  const handleErrorClick = (fieldName) => {
    const element = document.getElementById(fieldName);
    if (element) {
      element.focus();
      setActiveErrorField(fieldName);
      // Clear the active error field after 2 seconds
      setTimeout(() => {
        setActiveErrorField(null);
      }, 2000);
    }
  };

  const formFields = [
    {
      component: RadioGroup,
      props: {
        label: "Do you want to remain anonymous during this process?",
        name: "isAnonymous",
        options: anonymousOptions,
        value: formData.isAnonymous,
        onChange: (e) => handleChange('isAnonymous', e.target.value),
        onBlur: () => handleBlur('isAnonymous'),
        required: true,
        touched: touched.isAnonymous,
        error: errors.isAnonymous,
        disclaimer: "If you select yes, CMS will not share your information with the Filed Against Entity (FAE) during the investigation process. However, information provided in this complaint is subject to rules and policies under the Freedom of Information Act (FOIA)",
        isActiveError: activeErrorField === 'isAnonymous'
      }
    },
    {
      component: Input,
      props: {
        label: "Complainant Organization Name",
        name: "organizationName",
        value: formData.organizationName,
        onChange: handleInputChange,
        onBlur: () => handleBlur('organizationName'),
        required: true,
        touched: touched.organizationName,
        error: errors.organizationName,
        isActiveError: activeErrorField === 'organizationName'
      }
    },
    {
      component: Select,
      props: {
        label: "Complainant Organization Type",
        name: "organizationType",
        value: formData.organizationType,
        onChange: handleInputChange,
        onBlur: () => handleBlur('organizationType'),
        options: organizationTypes,
        touched: touched.organizationType,
        error: errors.organizationType,
        isActiveError: activeErrorField === 'organizationType'
      }
    },
    {
      component: Input,
      props: {
        label: "Complainant Organization Type (Other)",
        name: "organizationTypeOther",
        value: formData.organizationTypeOther,
        onChange: handleInputChange,
        isActiveError: activeErrorField === 'organizationTypeOther'
      }
    },
    {
      component: Input,
      props: {
        label: "Complainant Organization Role",
        name: "organizationRole",
        value: formData.organizationRole,
        onChange: handleInputChange,
        isActiveError: activeErrorField === 'organizationRole'
      }
    },
    {
      component: Input,
      props: {
        label: "Complainant Organization Phone Number",
        name: "organizationPhone",
        value: formData.organizationPhone,
        onChange: handleInputChange,
        onBlur: () => handleBlur('organizationPhone'),
        placeholder: "(xxx) xxx-xxxx",
        required: true,
        touched: touched.organizationPhone,
        error: errors.organizationPhone,
        extension: {
          name: "organizationPhoneExt",
          value: formData.organizationPhoneExt,
          onChange: handleInputChange
        },
        isActiveError: activeErrorField === 'organizationPhone'
      }
    },
    {
      component: Select,
      props: {
        label: "Complainant Title",
        name: "title",
        value: formData.title,
        onChange: handleInputChange,
        onBlur: () => handleBlur('title'),
        options: [
          { value: '', label: '--None--' },
          { value: 'mr', label: 'Mr.' },
          { value: 'mrs', label: 'Mrs.' },
          { value: 'ms', label: 'Ms.' },
          { value: 'dr', label: 'Dr.' }
        ],
        required: true,
        touched: touched.title,
        error: errors.title,
        isActiveError: activeErrorField === 'title'
      }
    },
    {
      component: Input,
      props: {
        label: "Complainant First Name",
        name: "firstName",
        value: formData.firstName,
        onChange: handleInputChange,
        onBlur: () => handleBlur('firstName'),
        required: true,
        touched: touched.firstName,
        error: errors.firstName,
        isActiveError: activeErrorField === 'firstName'
      }
    },
    {
      component: Input,
      props: {
        label: "Complainant MI",
        name: "middleInitial",
        value: formData.middleInitial,
        onChange: handleInputChange,
        isActiveError: activeErrorField === 'middleInitial'
      }
    },
    {
      component: Input,
      props: {
        label: "Complainant Last Name",
        name: "lastName",
        value: formData.lastName,
        onChange: handleInputChange,
        onBlur: () => handleBlur('lastName'),
        required: true,
        touched: touched.lastName,
        error: errors.lastName,
        isActiveError: activeErrorField === 'lastName'
      }
    },
    {
      component: Input,
      props: {
        label: "Complainant Address Line 1",
        name: "addressLine1",
        value: formData.addressLine1,
        onChange: handleInputChange,
        onBlur: () => handleBlur('addressLine1'),
        required: true,
        touched: touched.addressLine1,
        error: errors.addressLine1,
        isActiveError: activeErrorField === 'addressLine1'
      }
    },
    {
      component: Input,
      props: {
        label: "Complainant Address Line 2",
        name: "addressLine2",
        value: formData.addressLine2,
        onChange: handleInputChange,
        isActiveError: activeErrorField === 'addressLine2'
      }
    },
    {
      component: Input,
      props: {
        label: "Complainant City/Town",
        name: "city",
        value: formData.city,
        onChange: handleInputChange,
        onBlur: () => handleBlur('city'),
        required: true,
        touched: touched.city,
        error: errors.city,
        isActiveError: activeErrorField === 'city'
      }
    },
    {
      component: Select,
      props: {
        label: "Complainant State/Territory",
        name: "state",
        value: formData.state,
        onChange: handleInputChange,
        onBlur: () => handleBlur('state'),
        options: states,
        required: true,
        touched: touched.state,
        error: errors.state,
        isActiveError: activeErrorField === 'state'
      }
    },
    {
      component: Input,
      props: {
        label: "Complainant ZIP Code",
        name: "zipCode",
        value: formData.zipCode || '',
        onChange: handleInputChange,
        onBlur: () => handleBlur('zipCode'),
        placeholder: "Enter ZIP Code",
        required: false,
        touched: touched.zipCode,
        error: null,
        extension: {
          name: "zipExt",
          value: formData.zipExt || '',
          onChange: handleInputChange,
          placeholder: "Ext."
        },
        isActiveError: false
      }
    },
    {
      component: Input,
      props: {
        label: "Complainant Email Address",
        name: "email",
        type: "email",
        value: formData.email,
        onChange: handleInputChange,
        onBlur: () => handleBlur('email'),
        placeholder: "example@demo.com",
        required: true,
        touched: touched.email,
        error: errors.email,
        isActiveError: activeErrorField === 'email'
      }
    },
    {
      component: Input,
      props: {
        label: "Complainant Contact Phone Number",
        name: "contactPhone",
        value: formData.contactPhone,
        onChange: handleInputChange,
        onBlur: () => handleBlur('contactPhone'),
        placeholder: "(xxx) xxx-xxxx",
        required: true,
        touched: touched.contactPhone,
        error: errors.contactPhone,
        extension: {
          name: "contactPhoneExt",
          value: formData.contactPhoneExt,
          onChange: handleInputChange
        },
        isActiveError: activeErrorField === 'contactPhone'
      }
    },
    {
      component: Input,
      props: {
        label: "Complainant Cell Phone Number",
        name: "cellPhone",
        value: formData.cellPhone,
        onChange: handleInputChange,
        onBlur: () => handleBlur('cellPhone'),
        placeholder: "(xxx) xxx-xxxx",
        touched: touched.cellPhone,
        error: errors.cellPhone,
        isActiveError: activeErrorField === 'cellPhone'
      }
    }
  ].map(field => ({
    ...field,
    props: {
      ...field.props,
      isActiveError: activeErrorField === field.props.name
    }
  }));

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <Stepper currentStep={2} />
        
        <div className="mt-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Complainant Details</h2>

          {activeErrors.length > 0 && (
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                <h3 className="text-sm font-medium text-yellow-800">Errors</h3>
              </div>
              <ul className="ml-6 list-disc text-sm text-yellow-700">
                {activeErrors.map(({ field, label }) => (
                  <li key={field}>
                    <button
                      onClick={() => handleErrorClick(field)}
                      className="text-blue-600 hover:underline focus:outline-none"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form className="space-y-0.5">
            {formFields.map((field, index) => (
              <FormRow 
                key={field.props.name} 
                index={index}
                id={`row-${field.props.name}`}
                className={`transition-all duration-300`}
              >
                <field.component 
                  {...field.props} 
                  className="flex w-full"
                  id={field.props.name}
                />
              </FormRow>
            ))}
          </form>

          <div className="mt-8 flex justify-between">
            <Button
              onClick={() => {
                setActiveStep(1);
                navigateTo('complaintSelect');
              }}
            >
              Back to Complaint Type
            </Button>
            <div className="flex space-x-4">
              <Button onClick={() => navigateTo('instruction')}>
                Cancel
              </Button>
              <Button onClick={handleNext}>
                Next: FAE Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsPage; 