"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

const NotificationBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white overflow-hidden shadow-lg">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[100%] animate-spin-slow opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative">
        <div className="animate-slide flex whitespace-nowrap">
          <div className="flex items-center justify-center py-3 px-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <span className="animate-bounce">🎉</span>
                <span className="font-bold text-lg tracking-wide">Registration is Now Open!</span>
              </div>
              <div className="h-6 w-px bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <span className="text-white/90">Get</span>
                <span className="font-bold text-yellow-base animate-pulse">25% OFF</span>
                <span className="text-white/90">on all courses!</span>
              </div>
              <Link 
                href="/courses" 
                className="group relative ml-4 bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Register Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute inset-0 bg-white group-hover:opacity-0 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center py-3 px-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <span className="animate-bounce">🎉</span>
                <span className="font-bold text-lg tracking-wide">Registration is Now Open!</span>
              </div>
              <div className="h-6 w-px bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <span className="text-white/90">Get</span>
                <span className="font-bold text-yellow-base animate-pulse">25% OFF</span>
                <span className="text-white/90">on all courses!</span>
              </div>
              <Link 
                href="/courses" 
                className="group relative ml-4 bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Register Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute inset-0 bg-white group-hover:opacity-0 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default NotificationBanner; 