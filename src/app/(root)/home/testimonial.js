"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

import Modi from "../../../../public/uploads/celebrity/modi.jpg";
import Paneer from "../../../../public/uploads/celebrity/paneer.jpg";
import Shyam from "../../../../public/uploads/celebrity/shyam.jpg";
import Mahesh from "../../../../public/uploads/celebrity/mahesh.jpg";
import Deepak from "../../../../public/uploads/celebrity/deepak.jpg";
import Joginder from "../../../../public/uploads/celebrity/joginder.jpg";
import Puneet from "../../../../public/uploads/celebrity/puneet.jpg";

const testimonials = [
  { name: "Instagram Influencer", image: Modi },
  { name: "Dil Se Paneer - Instagram Influencer", image: Paneer },
  { name: "Deepak Sharma - Jailor", image: Deepak },
  { name: "Puneet - Instagram Influencer", image: Puneet },
  { name: "Joginder - Instagram Influencer", image: Joginder },
  { name: "Shyam Mashalkar - Actor", image: Shyam },
  { name: "Mahesh Thakur - Actor", image: Mahesh },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white text-center overflow-hidden">
      {/* Section Headings */}
      <h3 className="text-lg text-gray-600 mb-2 underline">Reviews</h3>
      <h2 className="text-4xl font-bold text-black mb-10">Testimonials</h2>

      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Navigation , Autoplay]}
          navigation
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[350px] rounded-xl overflow-hidden shadow-md group">
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.name || "Testimonial"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0} // preload first image
                />

                {/* Overlay with Name */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white py-4 px-2 text-sm font-medium">
                  — {item.name}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
