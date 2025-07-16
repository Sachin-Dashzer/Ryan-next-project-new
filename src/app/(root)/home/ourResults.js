'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const images = [
  'https://res.cloudinary.com/dha2ecdnn/image/upload/v1742121390/result-3_pg8vxt.jpg',
  'https://res.cloudinary.com/dha2ecdnn/image/upload/v1742121386/result-2_bqpxee.jpg',
  'https://res.cloudinary.com/dha2ecdnn/image/upload/v1742121382/result-1_ezklcb.jpg',
  'https://res.cloudinary.com/dha2ecdnn/image/upload/v1742121381/result-4_po8ofu.jpg',
  'https://res.cloudinary.com/dha2ecdnn/image/upload/v1742121390/result-3_pg8vxt.jpg',
  'https://res.cloudinary.com/dha2ecdnn/image/upload/v1742121386/result-2_bqpxee.jpg',
  'https://res.cloudinary.com/dha2ecdnn/image/upload/v1742121382/result-1_ezklcb.jpg',
  'https://res.cloudinary.com/dha2ecdnn/image/upload/v1742121381/result-4_po8ofu.jpg',
 
];

export default function OurResults() {
  return (
    <section className="py-12 text-center">
      <h2 className="text-3xl font-bold mb-2">Ryan&apos;s Results</h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-8">
        Our results aren&apos;t just great, they&apos;re <strong>outstanding</strong>!
        <a href="#" className="text-blue-600 underline ml-1">
          Click here
        </a>{' '}
        to explore our impressive <span className="text-blue-500">outcomes</span> and read feedback from our satisfied customers.
      </p>

    
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        loop
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full max-w-7xl mx-auto"
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
