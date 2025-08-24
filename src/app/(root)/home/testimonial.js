'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';

const testimonials = [
  {
    name: 'Manish Jain - JJ Communication',
    image: '/testimonials/manish.jpg',
  },
  {
    name: 'Deepak Sharma - Jailer',
    image: '/testimonials/deepak.jpg',
  },
  {
    name: 'Lord Puneet Kumar Superstar - Instagram Influencer',
    image: '/testimonials/puneet.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white text-center overflow-hidden  ">
      <h3 className="text-lg text-gray-600 mb-2">Reviews</h3>
      <h2 className="text-4xl font-bold text-black mb-10">Testimonials</h2>

      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Navigation]}
          navigation
          loop
          spaceBetween={30}
          slidesPerView={1.2}
          breakpoints={{
            768: {
              slidesPerView: 2.2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-xl overflow-hidden relative h-[400px] shadow-md">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-4 px-2 text-sm font-medium">
                  --{item.name}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
