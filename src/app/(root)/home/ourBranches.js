"use client";

import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";

export default function OurBranches() {
  const [location, setlocation] = useState([
    {
      name: "Delhi",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1742123001/delhi-clinic_eioeyr.jpg",
      link: "/delhi",
    },
    {
      name: "Mumbai",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1742123002/mumbai-clinic_djpix4.jpg",
      link: "/mumbai",
    },
    {
      name: "Hyderabad",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1742123001/hyderabad-clinic_ijmrqi.jpg",
      link: "/hyderabad",
    },
  ]);

  return (
    <section style={{background : "linear-gradient(rgb(0 0 0 / 78%), rgb(0 0 0 / 78%)), url(https://res.cloudinary.com/dha2ecdnn/image/upload/v1740393396/background_lvar2m.webp)"}} className=" relative bg-cover overflow-hidden">
      <div className="containerFull">
        <div className="px-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 ">
          {/* Left Text Content */}
          <div className="flex flex-col justify-center  ">
            <h2 className="text-4xl font-bold underline text-white mb-4">
              Our Branches
            </h2>
            <p className="title text-gray-200 mb-4 leading-relaxed">
              Ryan Healthcare is one of the leaders in offering hair transplant
              services because it has many branches that are well-staffed to
              undertake various procedures. FUE and DHI procedures are performed
              at clinics with modern equipment and skilled surgeons at a
              relatively low cost. The needs of the patient take priority, and
              we ensure that each one of them walks away with results that are
              as close to nature as possible.
              <br />
              The best clinics for the restoration of hair are just a branch
              away, so visit us now.
            </p>
            <Button variant="secondary" className="w-fit px-3">
              <a className="text py-1 font-semibold px-3" href="/delhi">Visit Branch</a>
            </Button>
          </div>

          {/* Right Swiper Slider */}
          <div>
            <Swiper
              modules={[Navigation]}
              navigation
              loop
              spaceBetween={10}
              slidesPerView={2}
              className="rounded-md"
            >
              {/* Delhi Slide */}

              {location.map((item, index) => (
                <SwiperSlide className="relative">
                  <div className="branchslides relative h-96 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt="Delhi Branch"
                      fill
                      className="object-cover opacity-90"
                    />
                    <div className="brachbox absolute right-0 bottom-0 w-40 h-16 rounded-tl-md bg-black flex flex-col items-center justify-center">
                      <h3 className="text-white title font-bold ">
                        {item.name}
                      </h3>
                      <Button
                        variant="outline"
                        size="md"
                        className="px-5 hidden py-2"
                      >
                        <a href={item.link}>Know more</a>
                      </Button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Add More Branches if Needed */}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
