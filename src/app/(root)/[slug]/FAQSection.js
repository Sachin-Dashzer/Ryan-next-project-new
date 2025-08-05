"use client";

import { useState } from "react";

export default function FAQSection({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-light py-12">
      <div className="containerFull">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 items-center">
          {/* FAQ Content */}
          <div className="px-6 md:px-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 underline underline-offset-4">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.length > 0 ? (
                faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-xl shadow-sm cursor-pointer"
                    onClick={() => toggle(index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{faq.question}</h3>
                      <span className="text-xl">
                        {openIndex === index ? "▾" : "▸"}
                      </span>
                    </div>
                    {openIndex === index && (
                      <p className="text-gray-600 mt-2">{faq.answer}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No FAQs available.</p>
              )}
            </div>
          </div>

          {/* Illustration */}
          <div className="w-full flex justify-center">
            <img
              src="/faq-illustration.png"
              alt="FAQ Illustration"
              className="w-full max-w-md"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
