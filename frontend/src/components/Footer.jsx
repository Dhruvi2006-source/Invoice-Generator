import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="text-2xl font-bold text-green-700 mb-4 inline-block"
            >
              Payminta
            </Link>
            <p className="text-gray-500 text-sm mb-4">
              Tailored made invoicing software exactly for your unique business
              needs.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center cursor-pointer hover:bg-green-200">
                fb
              </div>
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center cursor-pointer hover:bg-green-200">
                tw
              </div>
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center cursor-pointer hover:bg-green-200">
                ig
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="#" className="hover:text-green-600">
                  Invoicing
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-green-600">
                  Income and Expenses
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-green-600">
                  Financial Reports
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-green-600">
                  Ready-made Templates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="#" className="hover:text-green-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-green-600">
                  Become an Affiliate
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-green-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 text-sm text-gray-500">
          <p>© 2026 Paymint. All Rights Reserved</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-green-600">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-green-600">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer