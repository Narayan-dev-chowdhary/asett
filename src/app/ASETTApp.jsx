"use client";
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InstructionPage from '../components/pages/InstructionPage';
import ComplaintSelectTypePage from '../components/pages/ComplaintSelectTypePage';
import ComplaintDetailsPage from '../components/pages/ComplaintDetailsPage';

const ASETTApp = () => {
  const [activePage, setActivePage] = useState('instruction');
  const [activeStep, setActiveStep] = useState(1);
  const [complaintType, setComplaintType] = useState(null);
  
  // Navigation Handler
  const navigateTo = (page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Header navigateTo={navigateTo} />
        <main className="flex-grow">
          {activePage === 'instruction' && <InstructionPage navigateTo={navigateTo} />}
          {activePage === 'selectType' && (
            <ComplaintSelectTypePage 
              activeStep={activeStep}
              complaintType={complaintType}
              setComplaintType={setComplaintType}
              navigateTo={navigateTo}
              setActiveStep={setActiveStep}
            />
          )}
          {activePage === 'complaintDetails' && (
            <ComplaintDetailsPage 
              activeStep={activeStep}
              navigateTo={navigateTo}
              setActiveStep={setActiveStep}
            />
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ASETTApp;
