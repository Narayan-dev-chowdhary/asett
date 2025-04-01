import React from 'react';
import { AlertCircle } from 'lucide-react';

const InstructionPage = ({ navigateTo }) => {
  return (
    <div className="max-w-4xl mx-auto w-full ">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">
          Administrative Simplification Enforcement and Testing Tool (ASETT)
        </h1>
        <hr />
        <div className=" my-4">

          <p className="text-sm text-red-700">
            Disclaimer: If you file a complaint without registration, you will not be able to view your complaints,upload supporting documents, correspond electronically, or test transactions. </p>
        </div>

        <p>
          The following is the list of steps you will take in order to file a complaint regarding HIPAA
          Transactions and Code Sets, Unique Identifiers, and/or Operating Rules.
          If you wish to file a Health Insurance Privacy complaint,
          please visit the <a className='text-blue-600' href='https://www.hhs.gov/hipaa/filing-a-complaint/what-to-expect/index.html' target="_blank" rel="noopener noreferrer">Office for Civil Rights (OCR)</a> website.
        </p>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Steps to File a Complaint:</h2>
            <ol className="list-none space-y-3 text-black">
              <li><span className="font-semibold">Step 1:</span> Identify the type of complaint you want to file regarding HIPAA Transactions and Code Sets.</li>
              <li><span className="font-semibold">Step 2:</span> Provide your contact information as the complainant.</li>
              <li><span className="font-semibold">Step 3:</span> Identify the entity you are filing the complaint against.</li>
              <li><span className="font-semibold">Step 4:</span> Describe the violation in detail.</li>
              <li><span className="font-semibold">Step 5:</span> Review your complaint before submission.</li>
            </ol>
          </div>
          <div>

            You can review all information entered before submitting your
             complaint to CMS. Once the complaint is submitted, CMS will review all information and respond to your complaint.
          </div>
          <div className="pt-6">
            <p className="text-gray-600 mb-6">
              Click the button below to begin filing your complaint.
            </p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => navigateTo('instruction')}
                className="px-8 py-2 text-black bg-blue-600 border-2 border-black rounded cursor-pointer hover:bg-yellow-300 hover:text-white transition-colors"
               >
                Cancel
              </button>
              <button
                onClick={() => navigateTo('selectType')}
                className="px-8 py-2 text-black bg-blue-600 border-2 border-black rounded cursor-pointer hover:bg-yellow-300 hover:text-white transition-colors"
               >
                Complaint Type &nbsp; {'>'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionPage; 