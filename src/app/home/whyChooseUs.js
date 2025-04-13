"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Calendar, Hospital, Globe, Users, ScrollText } from "lucide-react";

function AnimatedNumber({ end, suffix, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = 0;
    const duration = 1000;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end]);

  return <span>{count}{suffix}</span>;
}

export default function WhyChooseRyanClinic() {
  const [startCount, setStartCount] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      setStartCount(true);
    }
  }, [inView]);

  const stats = [
    { icon: <Calendar className="w-8 h-8" />, end: 12, label: "Years", suffix: "+" },
    { icon: <Hospital className="w-8 h-8" />, end: 12, label: "Branches", suffix: "+" },
    { icon: <Globe className="w-8 h-8" />, end: 4, label: "Countries", suffix: "+" },
    { icon: <Users className="w-8 h-8" />, end: 66, label: "Delighted Patients", suffix: "K+" },
    { icon: <ScrollText className="w-8 h-8" />, end: 100, label: "Procedures Everyday", suffix: "+" },
  ];

  return (
    <div className="bg-[#4B768E] text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Why Choose Ryan Clinic?</h2>
        <p className="mb-6 text-lg leading-relaxed">
          At Ryan Clinic, we are your trusted destination for premium hair transplant
          services, offering expert treatments in DHI, PRP, FUE, and beard transplant. Our
          renowned Turkish specialists, backed by a dedicated research advisory board,
          ensure that we deliver the most effective and innovative solutions for hair
          restoration. With state-of-the-art facilities and a focus on cutting-edge
          techniques, we provide natural and lasting results. Whether you’re seeking DHI
          for precise, non-invasive hair restoration, PRP (Platelet-Rich Plasma) therapy
          for scalp rejuvenation, or FUE (Follicular Unit Extraction) for a minimally
          invasive hair transplant, our clinic guarantees exceptional outcomes.
        </p>

        <Button className="mb-10">Learn More About Ryan Transplants</Button>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Completely Safe" },
            { title: "Natural-Looking Results" },
            {
              title: "Pain-Free Hair Transplant",
              content:
                "Using tiny, disposable instruments with a diameter of 1mm or less, we ensure a comfortable, pain-free experience during graft extraction and placement.",
            },
            { title: "High Graft Survival Rate" },
            { title: "Hair Transplant Surgeons" },
            { title: "Permanent Hair Growth" },
            { title: "Our Presence" },
            { title: "Medical Team" },
          ].map((item, index) => (
            <Card key={index} className="bg-[#4B768E] border-white/30">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <ChevronDown />
                </div>
                {item.content && (
                  <p className="mt-2 text-white/80 text-sm leading-relaxed">
                    {item.content}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          ref={ref}
          className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12 bg-white rounded-2xl p-6 text-[#4B768E]"
        >
          {stats.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {item.icon}
              <p className="font-bold text-xl mt-2">
                <AnimatedNumber end={item.end} suffix={item.suffix} start={startCount} />
              </p>
              <p className="text-sm text-[#4B768E]/80">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
