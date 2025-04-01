import React from 'react';

const Footer = () => {
  const handleEmptyRoute = (e, routeName) => {
    e.preventDefault();
    alert(`This ${routeName} page is not available yet.`);
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4 mt-8">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="#" onClick={(e) => handleEmptyRoute(e, 'Home')} className="text-gray-600 hover:text-gray-900 cursor-pointer">Home</a>
            <a href="#" onClick={(e) => handleEmptyRoute(e, 'Privacy Policy')} className="text-gray-600 hover:text-gray-900 cursor-pointer">Privacy Policy</a>
            <a href="#" onClick={(e) => handleEmptyRoute(e, 'Security Policy')} className="text-gray-600 hover:text-gray-900 cursor-pointer">Security Policy</a>
          </div>
          <p className="text-gray-500 text-sm">
            Form Approved OMB No. 0938-0948
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 