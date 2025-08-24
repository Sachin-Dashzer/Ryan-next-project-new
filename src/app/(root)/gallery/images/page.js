"use client";

import { useState } from "react";
import Image from "next/image";
import PageBanner from "@/components/layouts/pageBanner";

const images = [
  { src: "/uploads/results/1.jpg", category: "Nature" },
  { src: "/uploads/results/2.jpg", category: "Nature" },
  { src: "/uploads/results/1.jpg", category: "City" },
  { src: "/uploads/results/2.jpg", category: "City" },
  { src: "/uploads/results/1.jpg", category: "Animals" },
  { src: "/uploads/results/2.jpg", category: "Animals" },
];

const categories = ["All", "Nature", "City", "Animals"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <div>


      <PageBanner
        title="Our Gallery"
        description="Regain your confidence with world-class
          Turkey's Technique hair restoration at Turkey's
          top-rated Ryan Clinic!"
        url="https://res.cloudinary.com/dq1tzl5ir/image/upload/v1751372327/uploads/arkntkldmtlryycqivm4.jpg"
      />










      <section className="container mx-auto px-4 pb-10">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 underline">
          Our Gallery
        </h1>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {filteredImages.map((img, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow-md"
            >
              <Image
                src={img.src}
                alt={`Gallery image ${index + 1}`}
                width={500}
                height={300}
                className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500 shadow-new"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <p className="text-white text-lg font-semibold">
                  {img.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
