"use client";
import { GalleryVerticalEnd } from "lucide-react";
import { motion } from "framer-motion";

import { SignupForm } from "@/components/auth/signup-form";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="min-h-svh bg-white p-6 md:p-10 relative">
      {/* Fixed ProLink in top left */}
      <Link
        to="/"
        className="flex items-center gap-2 font-medium absolute  text-xl top-6 left-6 md:top-10 md:left-10"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary  text-primary-foreground">
          <GalleryVerticalEnd className="size-4" />
        </div>
        ProLink
      </Link>

      {/* Form with animation */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex min-h-svh flex-col items-center justify-center"
      >
        <div className="flex w-full max-w-sm flex-col gap-6">
          <SignupForm />
        </div>
      </motion.div>
    </div>
  );
}