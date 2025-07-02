"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

export default function pageBanner() {
  return (
    <div className="relative flex flex-col lg:flex-row items-center overflow-hidden min-h-[600px] bannerBackground">
      {/* Left Curve and Content */}
      <div className="relative z-10 w-full lg:w-1/2 px-6 md:px-12 lg:px-20 py-16">
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
          About Us
        </h2>
        <p className="small_heading  font-semibold text-black leading-relaxed mb-10">
          Regain your confidence with world-class
          Turkey&apos;s Technique hair restoration at Turkey&apos;s
          top-rated Ryan Clinic!
        </p>

        <a
          href="https://wa.me/your-number"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-3 border border-gray-400 rounded-md bg-white shadow-md hover:shadow-lg transition"
        >
          <FaWhatsapp className="mr-2 text-green-500 text-xl" />
          Chat With Us On WhatsApp
        </a>
      </div>

      {/* Right Section (Image with curve) */}
      <div className="w-full lg:w-1/2 relative bannerImg">
        {/* Curved white mask */}

        {/* Actual Image */}
        <Image
          src="https://res.cloudinary.com/dq1tzl5ir/image/upload/v1751372327/uploads/arkntkldmtlryycqivm4.jpg" // Put this image in your public folder
          alt="Ryan Clinic"
          width={800}
          height={600}
          className="w-full h-full object-cover relative z-10"
          priority
        />
      </div>
    </div>
  );
}
