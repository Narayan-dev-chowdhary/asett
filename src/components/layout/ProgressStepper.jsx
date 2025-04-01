import React from 'react';

const ProgressStepper = ({ activeStep }) => {
  const steps = [
    { label: "Complaint Type", active: activeStep >= 1 },
    { label: "Complainant Details", active: activeStep >= 2 },
    { label: "FAE Details", active: activeStep >= 3 },
    { label: "Complaint Details", active: activeStep >= 4 },
    { label: "Review Complaint", active: activeStep >= 5 },
    { label: "Submitted", active: activeStep >= 6 }
  ];

  return (
    <div className="w-full bg-white px-4 py-3 border-b border-gray-200">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className={`flex flex-col items-center ${index === 0 ? 'ml-0' : ''} ${index === steps.length - 1 ? 'mr-0' : ''}`}>
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${step.active ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {index + 1}
              </div>
              <span className={`text-xs mt-1 ${step.active ? 'text-blue-700 font-medium' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${steps[index + 1].active ? 'bg-blue-700' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressStepper; 