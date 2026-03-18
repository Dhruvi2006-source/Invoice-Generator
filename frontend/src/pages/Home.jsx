import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTA from '../components/CTA';

function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <Navbar />

      {/* Hero Section - Rearranged: Image Left, Text Right, green theme */}
      <section className="container mx-auto px-6 pt-20 pb-24 md:flex md:items-center md:flex-row-reverse gap-12">
        <div className="md:w-1/2 mt-12 md:mt-0 relative">
          <div className="absolute inset-0 bg-green-200 rounded-full blur-3xl opacity-30 transform scale-110 -z-10"></div>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-green-100 relative max-w-lg mx-auto transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="h-6 bg-green-50 border-b border-green-100 flex items-center px-4 space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="p-4 bg-gray-50 aspect-[4/3] flex flex-col justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded w-full"></div>
                <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                <div className="h-2 bg-gray-200 rounded w-4/6"></div>
              </div>
              <div className="mt-8 flex justify-end">
                <div className="h-8 w-24 bg-green-600 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            <span className="relative inline-block">
              <span className="relative z-10 text-green-700">Manage</span>
              <svg
                className="absolute w-full h-8 -bottom-2 left-0 z-0 text-green-200"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 10 Q 50 20 100 10"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                />
              </svg>
            </span>{" "}
            Your Billing <br /> Without the Headache
          </h1>
          <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
            Paymint helps small businesses create invoices, track payments, and
            manage billing in one simple place—so you can focus on running your
            business.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-700 transition shadow-lg hover:shadow-green-500/30"
            >
              Create Free Invoice
            </Link>
            <div className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
              <span>✓ No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ratings Section */}
      <section className="bg-green-50 py-10 border-y border-green-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-80">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-green-800">4.2</div>
                <div className="flex text-yellow-400 text-sm justify-center my-1">
                  ★★★★<span className="text-gray-300">★</span>
                </div>
                <div className="text-xs text-green-600 font-semibold uppercase tracking-wider">
                  Rating {i}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section - Repositioned entirely */}
      <section className="bg-green-800 text-white py-24">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3 space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              See why our Users love Fynlo
            </h2>
            <button className="bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-400 transition shadow-lg mt-4 inline-block">
              Start 14-day free trial
            </button>
          </div>
          <div className="lg:w-2/3 grid md:grid-cols-2 gap-6 relative">
            <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl transform md:translate-y-8">
              <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
              <p className="text-gray-600 italic mb-6">
                "Paymint made billing way simpler for us. We can create and send
                invoices in minutes, and tracking payments is no longer a mess.
                It just works."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center font-bold text-green-800">
                  JS
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">John Smith</h4>
                  <p className="text-xs text-gray-500">CEO, TechCorp</p>
                </div>
              </div>
            </div>
            <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl">
              <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
              <p className="text-gray-600 italic mb-6">
                "The best invoice generator out there. Customizing templates is
                so easy, and the new green theme is very refreshing and easy on
                the eyes."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center font-bold text-green-800">
                  AD
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Alice Doe</h4>
                  <p className="text-xs text-gray-500">Freelancer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;