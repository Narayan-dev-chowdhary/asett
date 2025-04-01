import React from 'react';

const Stepper = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Complaint Type' },
    { id: 2, name: 'Complainant Details' },
    { id: 3, name: 'FAE Details' },
    { id: 4, name: 'Complaint Details' },
    { id: 5, name: 'Review Complaint' },
    { id: 6, name: 'Submitted' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <nav className="flex">
      {steps.map((step, index) => {
        const status = getStepStatus(step.id);
        const isFirst = index === 0;
        const isLast = index === steps.length - 1;
        
        return (
          <div
            key={step.id}
            className={`flex-1 text-center py-0.5 px-1 text-xs font-medium
              ${isFirst ? 'rounded-l-sm' : ''}
              ${isLast ? 'rounded-r-sm' : ''}
              ${status === 'current'
                ? 'bg-yellow-300 text-black'
                : status === 'completed'
                ? 'bg-green-500 text-white'
                : 'bg-gray-500 text-white'
            }`}
          >
            {step.name}
          </div>
        );
      })}
    </nav>
  );
};

export default Stepper; 