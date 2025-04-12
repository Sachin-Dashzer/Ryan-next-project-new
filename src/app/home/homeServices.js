// app/hair-transplant/page.jsx

import ContactForm from "@/components/pages/contactForm";
import { Button } from "@/components/ui/button";

export default function HairTransplantPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-3xl text-center mb-10 font-hind">
        Top Hair Transplant Clinics in Delhi, and Across India: Best Deals & Results
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First Clinic Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4">
            <img
              src="/api/placeholder/500/300"
              alt="Hair transplant procedure"
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4 text-center">
              Natural Results Guaranteed in 10 Days
            </h2>
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="mt-4">
                Know More About Ryan Treatment
              </Button>
            </div>
          </div>
        </div>

        {/* Second Clinic Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <img
              src="/api/placeholder/500/300"
              alt="Ryan Clinic Specialists"
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4 text-center">
              Meet Our Turkey's Top Specialists
            </h2>
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="mt-4">
                Know More About Ryan Treatment
              </Button>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <ContactForm />
      </div>
    </section>
  );
}
