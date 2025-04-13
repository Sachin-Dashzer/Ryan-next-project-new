// app/hair-transplant/page.jsx

"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ContactForm from "@/components/pages/contactForm";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Example data for each clinic card
const clinicCards = [
  {
    image:
      "https://res.cloudinary.com/dha2ecdnn/image/upload/v1742117190/service-3_fpwbh8.jpg",
    title: "Natural Results Guaranteed in 10 Days",
    buttonText: "Know More About Ryan Treatment",
  },
  {
    image:
      "https://res.cloudinary.com/dha2ecdnn/image/upload/v1742117191/service-1_k3l2gu.jpg",
    title: "Meet Our Turkey's Top Specialists",
    buttonText: "Know More About Ryan Treatment",
  },
  {
    image:
      "https://res.cloudinary.com/dha2ecdnn/image/upload/v1742117191/service-2_t9jf7i.jpg",
    title: "Most Trusted Hair Clinic in India",
    buttonText: "Know More About Ryan Treatment",
  },
];

export default function HairTransplantPage() {
  return (
    <section>
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 ">
        <h1 className="text-3xl md:text-3xl text-center mb-10 font-hind">
          Top Hair Transplant Clinics in Delhi, and Across India: Best Deals &
          Results
        </h1>

        <div className="servicesGrid">
          {/* Full Card Slider */}
          <div className="pr-6">
            <Swiper
              modules={[Navigation]}
              navigation
              pagination={{ clickable: false }}
              loop
              spaceBetween={10}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1 },
                1024: { slidesPerView: 2 },
              }}
            >
              {clinicCards.map((card, index) => (
                <SwiperSlide key={index} className="px-2 pb-3">
                  <div className="bg-white rounded-lg shadow-new overflow-hidden">
                    <div className="">
                      <div className="relative w-full h-88">
                        <Image
                          src={card.image}
                          alt={`Clinic ${index + 1}`}
                          fill
                          className="object-cover h-88"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index === 0}
                        />
                      </div>
                      <h2 className="text-xl font-semibold mt-3 text-center">
                        {card.title}
                      </h2>
                      <div className="flex justify-center mt-2">
                        <Button variant="outline" className="mb-4 text-xs py-[7px] bg-white text-black border-2 hover:bg-black hover:text-white hover:border-black">
                          {card.buttonText}
                        </Button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Contact Form Section */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
