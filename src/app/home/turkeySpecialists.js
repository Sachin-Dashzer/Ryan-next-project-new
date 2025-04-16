import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function TurkeySpecialists() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Image Box */}
        <div className="relative w-full h-[400px] md:h-[480px]">
          {/* Background Shadow Square */}
          <div className="absolute top-6 left-6 w-full h-full bg-gray-700 rounded-md -z-10"></div>
          
          <Image
            src="/team/turkey-doctors.jpg"
            alt="Turkey Specialists"
            fill
            className="rounded-md object-cover"
          />
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Turkey&apos;s Specialists in India with 12+ Years of Ryan Expertise
          </h2>
          <p className="text-gray-700 mb-4">
            We bring you the best of both worlds — the advanced techniques of Turkey&apos;s leading hair transplant specialists combined with over 12 years of expertise and excellence in India. Our experienced surgeons, trained in Turkey&apos;s renowned hair restoration methods, offer the highest standard of care, ensuring natural and long-lasting results.
          </p>
          <p className="text-gray-700 mb-4">
            We understand that hair restoration is a personal journey, which is why our team of experts takes a personalized approach to every procedure. From the initial consultation to post-operative care, we ensure that each step is tailored to your unique needs. With cutting-edge technology and a focus on precision, we provide results that are not only effective but also safe and comfortable.
          </p>
          <p className="text-gray-700 mb-4">
            With over 12 years of experience in India, Ryan Clinic has earned a reputation for delivering exceptional outcomes. We use the latest techniques like FUE, DHI, and PRP, ensuring the best results for hair restoration. Our clinic is committed to providing quality care with affordable pricing, allowing you to achieve the look you desire without compromising on safety or results.
          </p>
          <p className="text-gray-700 mb-6">
            Choose Ryan Clinic for world-class hair transplant solutions with the expertise of Turkey&apos;s top specialists and over 12 years of trusted experience in India.
          </p>

          <Button variant="outline">Book Your Appointment</Button>
        </div>
      </div>
    </section>
  );
}
