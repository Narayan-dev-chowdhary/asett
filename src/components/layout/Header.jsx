import React from 'react';
import Image from 'next/image';
import logo from '../../../public/assets/logobanner.jpg';
import { AlertCircle } from 'lucide-react';

const Header = ({ navigateTo }) => {
  const handleEmptyRoute = (e, routeName) => {
    e.preventDefault();
    alert(`This ${routeName} page is not available yet.`);
  };

  return (
    <>
    <Image src={logo} alt="logo" className='w-full' />
    <header className="bg-blue-900  text-white py-4">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button onClick={() => navigateTo('instruction')} className="hover:text-yellow-200 cursor-pointer">Home</button>
            <button onClick={(e) => handleEmptyRoute(e, 'About ASETT')} className="hover:text-yellow-200 cursor-pointer">About ASETT</button>
            <button onClick={(e) => handleEmptyRoute(e, 'Contact Us')} className="hover:text-yellow-200 cursor-pointer">Contact Us</button>
            <div className="relative group">
              <button className="hover:text-blue-200 cursor-pointer">Support</button>
              <div className="absolute hidden group-hover:block bg-white w-auto text-gray-800 p-1 rounded shadow-lg">
                <a href="#" onClick={(e) => handleEmptyRoute(e, 'Help Center')} className="block hover:bg-yellow-300 px-4 w-[200px] py-2 cursor-pointer">Help Center</a>
                <a href="#" onClick={(e) => handleEmptyRoute(e, 'FAQs')} className="block hover:bg-yellow-300 px-4 w-[200px] py-2 cursor-pointer">FAQs</a>
                <a href="#" onClick={(e) => handleEmptyRoute(e, 'Contact Support')} className="block hover:bg-yellow-300 px-4 w-[200px] py-2 cursor-pointer">Contact Support</a>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button onClick={(e) => handleEmptyRoute(e, 'Register')} className="flex items-center space-x-1 hover:text-blue-200 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Register</span>
            </button>
            <button onClick={(e) => handleEmptyRoute(e, 'Login')} className="flex items-center space-x-1 hover:text-blue-200 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header; 