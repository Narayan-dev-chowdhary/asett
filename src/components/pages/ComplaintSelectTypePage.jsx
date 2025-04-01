import React from 'react';
import Stepper from '../layout/Stepper';
import Button from '../common/Button';
import Radio from '../common/Radio';

const ComplaintSelectTypePage = ({ activeStep, complaintType, setComplaintType, navigateTo, setActiveStep }) => {
  const radioOptions = [
    {
      id: 'transactions',
      label: 'Transactions',
      description: 'Select if a covered entity is in violation of the following transactions: claims and encounter information, payment and remittance advice, claims status, eligibility, enrollment and disenrollment, referrals and authorizations, coordination of benefits and premium payment.'
    },
    {
      id: 'codeSets',
      label: 'Code Sets',
      description: 'Select if a covered entity is in violation of the following Code Sets: HCPCS (Ancillary Services/Procedures), CPT-4 (Physicians Procedures), CDT (Dental Terminology), ICD-9 (Diagnosis and Hospital Inpatient Procedures), ICD-10 (As of October 1, 2015) and NDC (National Drug Codes) codes with which providers and health plan are familiar, are the adopted code sets for procedures, diagnoses, and drugs.'
    },
    {
      id: 'uniqueIdentifiers',
      label: 'Unique Identifiers',
      description: 'Select if a covered entity is in violation of the following Unique Identifiers: National Provider Identifier (NPI), Employer Identification Number (EIN).'
    },
    {
      id: 'operatingRules',
      label: 'Operating Rules',
      description: 'Select if a covered entity is suspected of being in violation of any of the adopted Operating Rules: Electronic Funds Transfer/Electronic Remittance Advice (EFT/ERA), Health Care Claim Status, and Eligibility for a Health Plan.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <Stepper currentStep={1} />

        <div className="mt-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Complaint Type</h2>
          <p className="text-lg font-medium text-gray-700 mb-6">Make a selection below</p>

          <div className="space-y-6">
            {radioOptions.map((option) => (
              <Radio
                key={option.id}
                id={option.id}
                name="complaintType"
                value={option.id}
                checked={complaintType === option.id}
                onChange={(e) => setComplaintType(e.target.value)}
                label={option.label}
                description={option.description}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              onClick={() => navigateTo('instruction')}
            >
              Back to Welcome
            </Button>
            <div className="flex space-x-4">
              <Button
                onClick={() => navigateTo('instruction')}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setActiveStep(2);
                  navigateTo('complaintDetails');
                }}
                disabled={!complaintType}
              >
                Next: Complainant Information
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintSelectTypePage; 