"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  ChevronDown,
  Calendar,
  Hospital,
  Globe,
  Users,
  ScrollText,
} from "lucide-react";

function AnimatedNumber({ end, suffix, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function WhyChooseRyanClinic() {
  const [startCount, setStartCount] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    if (inView) {
      setStartCount(true);
    }
  }, [inView]);

  const stats = [
    {
      icon: <Calendar className="w-12 h-12" />,
      end: 12,
      label: "Years",
      suffix: "+",
    },
    {
      icon: <Hospital className="w-12 h-12" />,
      end: 12,
      label: "Branches",
      suffix: "+",
    },
    {
      icon: <Globe className="w-12 h-12" />,
      end: 4,
      label: "Countries",
      suffix: "+",
    },
    {
      icon: <Users className="w-12 h-12" />,
      end: 66,
      label: "Delighted Patients",
      suffix: "K+",
    },
    {
      icon: <ScrollText className="w-12 h-12" />,
      end: 100,
      label: "Procedures Everyday",
      suffix: "+",
    },
  ];

  const chooseData = [
    {
      name: "Completely Safe",
      discription:
        "Our hair transplant procedures are performed in a sterile environment, ensuring the highest safety standards.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614668/hair_cqzsax.png",
    },
    {
      name: "Natural-Looking Results",
      discription:
        "Our precise control over graft depth, direction, and placement angle guarantees a completely natural appearance.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614685/shield_b3ueha.png",
    },
    {
      name: "Pain-Free Hair Transplant",
      discription:
        "Using tiny, disposable instruments with a diameter of 1mm or less, we ensure a comfortable, pain-free experience during graft extraction and placement.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614685/techniq_rj2sy8.png",
    },
    {
      name: "High Graft Survival Rate",
      discription:
        "With a graft survival rate exceeding 90%, our success rate far surpasses the industry average of 50%, as confirmed by independent research.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614669/pen_bsegei.png",
    },
    {
      name: "Hair Transplant Surgeons",
      discription:
        "At our clinic, all hair transplant procedures are performed exclusively by highly skilled and certified medical doctors and their team.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614669/boy_lrhm0u.png",
    },
    {
      name: "Permanent Hair Growth",
      discription:
        "We exclusively select healthy hair follicles for implantation, ensuring long-term, lasting hair growth free from dormant hair in the telogen phase.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614669/people_ngty1b.png",
    },
    {
      name: "Our Presence",
      discription:
        "With a global presence, we are renowned for trusted hair restoration solutions that restore confidence and deliver natural results.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614669/map-icon_ufrpdg.png",
    },
    {
      name: "Medical Team",
      discription:
        "Our expert medical team is dedicated to providing the highest standard of care, ensuring safe, effective, and natural hair restoration results.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614669/medical-team_bchhcu.png",
    },
  ];

  return (
    <section className="bg-[#4b768e] text-white">
      <div className="containerFull">
        <div className="mt-4 mx-auto">
          <div className="whyChooseGrid">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Why Choose Ryan Clinic?
              </h2>
              <p className="mb-4 text-lg leading-relaxed">
                At Ryan Clinic, we are your trusted destination for premium hair
                transplant services, offering expert treatments in DHI, PRP,
                FUE, and beard transplant. Our renowned Turkish specialists,
                backed by a dedicated research advisory board, ensure that we
                deliver the most effective and innovative solutions for hair
                restoration. With state-of-the-art facilities and a focus on
                cutting-edge techniques, we provide natural and lasting results.
                Whether you’re seeking DHI for precise, non-invasive hair
                restoration, PRP (Platelet-Rich Plasma) therapy for scalp
                rejuvenation, or FUE (Follicular Unit Extraction) for a
                minimally invasive hair transplant, our clinic guarantees
                exceptional outcomes.
              </p>

              <Button className="mb-10 text p-3 px-4">
                Learn More About Ryan Transplants
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 h-fit mt-4">
              {chooseData.map((item, index) => {
                return (
                  <div
                    className="choosecard border-[1px] border-white rounded-lg p-3 px-4 min-h-16 my-1"
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="title font-bold gap-3 flex items-center">
                        <span>
                          <Image
                            src={item.image}
                            width={40}
                            height={40}
                            alt={item.name}
                          />
                        </span>
                        {item?.name}
                      </h3>
                      <ChevronDown />
                    </div>

                    <p
                      className={`text-sm transition-all ease-in-out duration-800 overflow-hidden pt-2 ${
                        hoveredIndex === index ? " h-32 " : "h-0"
                      }`}
                    >
                      {item.discription}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            ref={ref}
            className="grid md:grid-cols-3 lg:grid-cols-5  mt-12 bg-white rounded-2xl p-12 text-[#4B768E]"
          >
            {stats.map((item, index) => (
              <div key={index} className="flex gap-5  justify-center items-center">
                <div className="">{item.icon}</div>
                <div>
                  {" "}
                  <p className="font-bold text-2xl mt-2">
                    <AnimatedNumber
                      end={item.end}
                      suffix={item.suffix}
                      start={startCount}
                    />
                  </p>
                  <p className="text-sm text-[#4B768E]/80">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
