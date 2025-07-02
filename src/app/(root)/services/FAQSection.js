"use client";

import { useState } from "react";

const faqs = [
  {
    question: "1. Is Sapphire FUE suitable for everyone?",
    answer:
      "Yes, but a consultation is needed to assess donor hair and health.",
  },
  {
    question: "2. How much does it cost in India?",
    answer: "It depends on the clinic and the number of grafts required.",
  },
  {
    question: "3. Is the procedure painful?",
    answer: "Mild discomfort may occur, but local anesthesia is used.",
  },
  {
    question: "4. When will I see results?",
    answer: "Visible results can typically be seen within 3 to 6 months.",
  },
  {
    question: "5. Why choose Ryan Clinic?",
    answer: "We use advanced techniques and provide personalized care.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-light">
      <div className="containerFull">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 items-center">
          {/* Left - FAQ List */}
          <div className="px-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 underline underline-offset-4">
              Frequently Asked Questions About Dermaplaning
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
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
              ))}
            </div>
          </div>

          {/* Right - FAQ Image */}
          <div className="w-full flex justify-center">
            <img
              src="/faq-illustration.png"
              alt="FAQ Illustration"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
