"use client";

import { useState } from "react";
import Image from "next/image"; 
import Faq from "../../../../public/uploads/faq.jpg";

export default function FAQSection({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [imgError, setImgError] = useState(false); 

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-light py-8 md:py-12">
      <div className="containerFull px-4 md:px-6">
        <div className="flex flex-col lg:flex-row w-full md:gap-8 lg:gap-12 items-start">
          {/* FAQ Content */}
          <div className="w-full lg:w-1/2 px-0 md:px-4 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-6 mt:md-0 underline underline-offset-4">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.length > 0 ? (
                faqs.map((faq, index) => (  
                  <div
                    key={index}
                    className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm cursor-pointer"
                    onClick={() => toggle(index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-sm md:text-base">
                        {faq.question}
                      </h3>
                      <span className="text-lg md:text-xl">
                        {openIndex === index ? "▾" : "▸"}
                      </span>
                    </div>
                    {openIndex === index && (
                      <p className="text-gray-600 mt-2 text-sm md:text-base">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No FAQs available.</p>
              )}
            </div>
          </div>

          {/* Illustration */}
          <div className="w-full lg:w-1/2 h-full flex justify-center order-first lg:order-last">
            {!imgError && (
              <Image
                src={Faq}
                width={400} 
                height={600}
                alt="FAQ Illustration"
                className="w-full h-full rounded-2xl shadow-lg object-cover"
                onError={() => setImgError(true)} 
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
