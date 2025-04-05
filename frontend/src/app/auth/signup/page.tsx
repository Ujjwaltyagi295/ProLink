"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex min-h-screen w-full items-center justify-center bg-white"
    >
      <Link href="/" className="absolute top-6 left-6">
        <h1 className="text-2xl font-Nunito font-bold font-sans text-gray-900 hover:text-blue-600 transition-colors duration-200">
          ProLink
        </h1>
      </Link>

      <div className="flex flex-col py-8 px-6 w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Create Your Account to
            <br />
            Unleash Your Dreams
          </h1>
        </div>

        {/* Login link */}
        <div className="flex items-center mb-6 text-sm">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mr-4"
            onClick={() => router.push("/auth/login")}
          >
            <HiArrowLeft className="text-gray-600" />
          </button>
          <span className="text-gray-600">Already have an account?</span>
          <Link href="/auth/login" className="ml-2 text-blue-600 font-medium">
            Log in
          </Link>
        </div>

        {/* Form */}
        <form className="w-full space-y-4">
          {/* Full name input */}
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />

          {/* Email input */}
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />

          {/* Password input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full mt-4 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center font-semibold"
          >
            <span>Start Creating</span>
            <div className="ml-2 rounded-full bg-blue-500 w-8 h-8 flex items-center justify-center">
              <HiArrowRight className="text-white" />
            </div>
          </button>
        </form>

        {/* Terms and conditions */}
        <div className="pt-6 text-xs text-gray-500 text-center">
          By signing in, you agree to ProLinks{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>
          ,{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          , and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Data Usage Properties
          </a>
          .
        </div>
      </div>
    </motion.div>
  );
};

export default SignupPage;
