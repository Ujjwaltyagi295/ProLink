"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const [isSignin, setIsSignin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleSignup = () => {
    setIsSignin(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex min-h-screen bg-white"
    >
      <Link href="/" className="absolute top-6 left-6">
        <h1 className="text-2xl font-Nunito font-bold font-sans text-gray-900 hover:text-blue-600 transition-colors duration-200">
          ProLink
        </h1>
      </Link>

      <div className="w-full flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Build Collaborate
          </h1>
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            With ProLink
          </h2>

          <div className="space-y-4">
            <button className="flex items-center justify-center gap-3 w-full bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition shadow-sm">
              <FaGoogle className="text-xl" />
              <span className="text-gray-700">Continue with Google</span>
            </button>

            {!isSignin && (
              <button
                onClick={toggleSignup}
                className="flex items-center justify-center gap-3 w-full bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition shadow-sm"
              >
                <MdEmail className="text-xl" />
                <span className="text-gray-700">Continue with Email</span>
              </button>
            )}

            {isSignin && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-4"
              >
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-semibold">
                  Login
                </button>

                <p className="text-sm text-center text-gray-600">
                  Don’t have an account?{" "}
                  <Link href="/auth/signup">
                    <span className="text-blue-600 hover:underline font-medium">
                      Create one
                    </span>
                  </Link>
                </p>
              </motion.div>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-8">
            By signing in, you agree to ProLink
            <a href="#" className="text-blue-600 hover:underline">
              {" "}
              Terms of Service
            </a>
            ,
            <a href="#" className="text-blue-600 hover:underline">
              {" "}
              Privacy Policy
            </a>
            , and
            <a href="#" className="text-blue-600 hover:underline">
              {" "}
              Data Usage Properties
            </a>
            .
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
