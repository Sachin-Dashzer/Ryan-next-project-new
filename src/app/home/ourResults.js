'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const images = [
  '/results/img1.jpg',
  '/results/img2.jpg',
  '/results/img3.jpg',
  '/results/img4.jpg',
  '/results/img5.jpg',
  '/results/img6.jpg',
];

export default function OurResults() {
  return (
    <section className="py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-2">Ryan&apos;s Results</h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-8">
        Our results aren&apos;t just great, they&apos;re <strong>outstanding</strong>!
        <a href="#" className="text-blue-600 underline ml-1">
          Click here
        </a>{' '}
        to explore our impressive <span className="text-blue-500">outcomes</span> and read feedback from our satisfied customers.
      </p>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="w-full max-w-6xl mx-auto"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="rounded-lg overflow-hidden">
            <Image
              src={src}
              alt={`Result ${index + 1}`}
              width={300}
              height={400}
              className="w-full h-auto object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
