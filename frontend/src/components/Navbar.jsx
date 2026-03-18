import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-green-100 relative z-50">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4">
        <div className="flex items-center space-x-2">
          {/* Simple Logo Placeholder */}
          <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-xl">
            P
          </div>
          <Link
            to="/"
            className="text-2xl font-bold text-green-800 tracking-tight"
          >
            Paymint
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-gray-600 hover:text-green-600 font-medium">Features</Link>
          <Link to="/pricing" className="text-gray-600 hover:text-green-600 font-medium">Pricing</Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-green-600 font-medium">Dashboard</Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-green-700 font-medium hover:text-green-800">Sign in</Link>
          <Link to="/register" className="bg-green-600 text-white px-5 py-2 rounded-full font-medium hover:bg-green-700 transition-colors shadow-sm cursor-pointer border-transparent border hover:border-green-800">Start for free</Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-green-600 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col">
            <Link to="/features" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">Features</Link>
            <Link to="/pricing" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">Pricing</Link>
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">Dashboard</Link>
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col space-y-2">
              <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 text-base font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100">Sign in</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-green-600 rounded-md hover:bg-green-700">Start for free</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;