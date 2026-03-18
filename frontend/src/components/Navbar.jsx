import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b border-green-100">
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

      <div className="hidden md:flex items-center space-x-8">
        <Link
          to="/features"
          className="text-gray-600 hover:text-green-600 font-medium cursor-pointer"
        >
          Features
        </Link>
        <Link
          to="/pricing"
          className="text-gray-600 hover:text-green-600 font-medium cursor-pointer"
        >
          Pricing
        </Link>
        <Link
          to="/dashboard"
          className="text-gray-600 hover:text-green-600 font-medium cursor-pointer"
        >
          Dashboard
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="text-green-700 font-medium hover:text-green-800 hidden sm:block"
        >
          Sign in
        </Link>
        <Link
          to="/register"
          className="bg-green-600 text-white px-5 py-2 rounded-full font-medium hover:bg-green-700 transition-colors shadow-sm cursor-pointer border-transparent border hover:border-green-800"
        >
          Start for free
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;