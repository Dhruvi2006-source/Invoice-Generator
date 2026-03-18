import React from 'react'
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-24 bg-green-50 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-12 lg:p-16 space-y-6">
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
              Ready to Simplify your Bookkeeping?
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of businesses that trust Fynlo to manage their
              invoices, estimates, and payments.
            </p>
            <Link
              to="/register"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition shadow-lg mt-4"
            >
              Start Your Free Trial
            </Link>
          </div>
          <div className="md:w-1/2 bg-green-100 p-8 min-h-[300px] flex items-center justify-center relative overflow-hidden">
            {/* Abstract dashboard graphic */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-300 via-transparent to-transparent"></div>
            <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden transform rotate-2 relative z-10 border border-green-200">
              <div className="h-8 bg-gray-50 border-b border-gray-100"></div>
              <div className="p-4 space-y-3">
                <div className="flex gap-4">
                  <div className="w-1/2 h-20 bg-green-50 rounded border border-green-100"></div>
                  <div className="w-1/2 h-20 bg-green-50 rounded border border-green-100"></div>
                </div>
                <div className="h-32 bg-gray-50 rounded border border-gray-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA