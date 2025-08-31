"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-16">
      
      {/* Illustration Section */}
      <div className="flex-1 flex justify-center mb-10 lg:mb-0">
        <img
          src="/uploads/404-illustration.svg" // 🔹 Replace with your custom image
          alt="404 Not Found"
          className="max-w-lg w-full"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-7xl font-extrabold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto lg:mx-0">
          The page you’re looking for doesn’t exist or has been moved. Don’t worry, let’s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl shadow-md hover:bg-primary/90 transition-all"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-gray-300 px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
