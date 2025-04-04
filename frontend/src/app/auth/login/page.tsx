"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FaGoogle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const LoginPage: React.FC = () => {
    const [isSignin,setIsSignin]=useState(false)
    const toggleSignup=()=>{
      setIsSignin(!isSignin)
    }

  return (
    <motion.div initial={{
      opacity:0,
      y:"-10%",
      
      
    }} 
      animate={{
        opacity:100,
        y:"0%"
        
      }}
      transition={{
        duration:"0.3",
        ease:"easeIn"
      }}
    className="flex min-h-screen bg-white">
      
      <div className="w-full flex items-center justify-center px-8">
     
        <div className="w-full max-w-md">
       
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Build Collaborate
          </h1>
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            With ProLink
          </h2>

          {/* Sign in buttons */}
          <div className="space-y-4">
            <button className="flex items-center justify-center gap-3 w-full bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition shadow-sm">
              <FaGoogle className="text-xl" />
              <span className="text-gray-700">Continue with Google</span>
              <div className="flex-grow"></div>
              <div className="flex items-center justify-center h-6 w-6 text-blue-500">
                <svg width="24" height="24" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 88C29 88 12 71 12 50S29 12 50 12s38 17 38 38-17 38-38 38z"/>
                  <path d="M63 37c-1.6-1.6-4.2-1.6-5.8 0l-7.2 7.2-7.2-7.2c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l7.2 7.2-7.2 7.2c-1.6 1.6-1.6 4.2 0 5.8 1.6 1.6 4.2 1.6 5.8 0l7.2-7.2 7.2 7.2c1.6 1.6 4.2 1.6 5.8 0 1.6-1.6 1.6-4.2 0-5.8L56 50l7.2-7.2c1.6-1.6 1.6-4.2-.2-5.8z"/>
                </svg>
              </div>
            </button>
            <Link href="/auth/signup">
            <button onClick={toggleSignup} className="flex items-center justify-center gap-3 w-full bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition shadow-sm">
              <MdEmail className="text-xl" />
              <span  className="text-gray-700">Continue with Email</span>
              <div className="flex-grow"></div>
              <div className="h-6 w-6 flex items-center justify-center text-gray-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </button>
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-8">
            By signing in, you agree to ProLink
            <a href="#" className="text-blue-600 hover:underline"> Terms of Service</a>,
            <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a> and 
            <a href="#" className="text-blue-600 hover:underline"> Data Usage Properties</a>.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;