"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import all results
import ResultOne from "../../../../public/uploads/results/1.jpg";
import ResultTwo from "../../../../public/uploads/results/2.jpg";
import ResultThree from "../../../../public/uploads/results/3.jpg";
import ResultFour from "../../../../public/uploads/results/4.jpg";
import ResultFive from "../../../../public/uploads/results/5.jpg";
import ResultSix from "../../../../public/uploads/results/6.jpg";
import ResultSeven from "../../../../public/uploads/results/7.jpg";
import ResultEight from "../../../../public/uploads/results/8.jpg";
import ResultNine from "../../../../public/uploads/results/9.jpg";
import ResultTen from "../../../../public/uploads/results/10.jpg";
import ResultEleven from "../../../../public/uploads/results/11.jpg";
import ResultTwelve from "../../../../public/uploads/results/12.jpg";
import ResultThirteen from "../../../../public/uploads/results/13.jpg";
import ResultFourteen from "../../../../public/uploads/results/14.jpg";
import ResultFifteen from "../../../../public/uploads/results/15.jpg";
import ResultSixteen from "../../../../public/uploads/results/16.jpg";
import ResultSeventeen from "../../../../public/uploads/results/17.jpg";

const images = [
  ResultOne,
  ResultTwo,
  ResultThree,
  ResultFour,
  ResultFive,
  ResultSix,
  ResultSeven,
  ResultEight,
  ResultNine,
  ResultTen,
  ResultEleven,
  ResultTwelve,
  ResultThirteen,
  ResultFourteen,
  ResultFifteen,
  ResultSixteen,
  ResultSeventeen,
];

export default function OurResults() {
  return (
    <section className="py-8 md:py-20 lg:py-24 text-center bg-gray-50">
      <div className="container mx-auto px-4 ">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
          Ryan&apos;s Results
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
          Our results aren&apos;t just great, they&apos;re{" "}
          <strong>outstanding</strong>!
          <a
            href="#"
            className="text-blue-600 hover:text-blue-800 underline ml-1 transition-colors"
          >
            Click here
          </a>{" "}
          to explore our impressive{" "}
          <span className="text-blue-500">outcomes</span> and read feedback from
          our satisfied customers.
        </p>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2.5, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="w-full pb-10 md:pb-12 resultSliders"
        >
          {images.map((src, index) => (
            <SwiperSlide
              key={index}
              className=" cursor-pointer"
            >
              {/* Image Section */}
              <div className="result-card ">
                <div className="result-image">
                  <Image
                    src={src}
                    alt={`Result ${index + 1}`}
                    fill
                    className=" "
                    placeholder="blur"
                  />
                </div>
                {/* Before / After Tags */}
                <div className="before-after-tags">
                  <span className="bg-black text-white text-xs px-3 py-2 font-semibold rounded-md">
                    Before
                  </span>
                  <span className="bg-white text-black text-xs px-3 py-2 font-semibold rounded-md">
                    After
                  </span>
                </div>

                {/* Result Info */}
                <div className="result-info">
                  <strong className="block text-sm font-semibold">
                    HAIR TRANSPLANT
                  </strong>
                  <small className="text-gray-600 text-xs">3500 GRAFTS</small>
                </div>
                 
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
