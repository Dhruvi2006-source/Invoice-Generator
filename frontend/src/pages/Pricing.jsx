import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-5 text-xl text-gray-500 max-w-2xl mx-auto">
              No hidden fees, no surprise charges. Choose the plan that best fits your business needs.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Standard Plan */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Starter</h3>
                <p className="text-gray-500 mb-6">Perfect for freelancers just getting started.</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-gray-900">$0</span>
                  <span className="text-xl text-gray-500 ml-2">/mo</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Up to 5 invoices/month
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Basic customized templates
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Client management
                  </li>
                </ul>
              </div>
              <div className="p-8 bg-gray-50 border-t border-gray-100">
                <Link to="/register" className="block w-full py-3 px-4 bg-white border-2 border-green-600 rounded-md shadow-sm text-center text-green-700 font-bold hover:bg-green-50 transition-colors">
                  Get Started for Free
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-green-700 rounded-2xl shadow-xl overflow-hidden border border-green-600 flex flex-col transform md:-translate-y-4">
              <div className="p-8 flex-grow relative">
                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 font-bold px-3 py-1 text-sm rounded-bl-lg">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                <p className="text-green-100 mb-6">For growing businesses needing more power.</p>
                <div className="flex items-baseline mb-8 text-white">
                  <span className="text-5xl font-extrabold">$15</span>
                  <span className="text-xl text-green-200 ml-2">/mo</span>
                </div>
                <ul className="space-y-4 mb-8 text-white">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Unlimited invoices
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Advanced templates & branding
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Automated payment reminders
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Priority email support
                  </li>
                </ul>
              </div>
              <div className="p-8 bg-green-800 border-t border-green-600">
                <Link to="/register" className="block w-full py-3 px-4 bg-green-500 rounded-md shadow text-center text-white font-bold hover:bg-green-400 transition-colors">
                  Start 14-Day Free Trial
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-500 mb-6">Uncapped features for scaling teams.</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-gray-900">$49</span>
                  <span className="text-xl text-gray-500 ml-2">/mo</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Everything in Pro
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Multiple team members
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    API access
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    24/7 dedicated support
                  </li>
                </ul>
              </div>
              <div className="p-8 bg-gray-50 border-t border-gray-100">
                <Link to="/register" className="block w-full py-3 px-4 bg-white border-2 border-green-600 rounded-md shadow-sm text-center text-green-700 font-bold hover:bg-green-50 transition-colors">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
