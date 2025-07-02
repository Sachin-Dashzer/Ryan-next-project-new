import Image from "next/image";
import { Button } from "@/components/ui/button";
export default function aboutSection() {
  return (
    <section>
      <div className="w-full bg-white containerFull">
        <div className=" mx-auto px-4 pt-12 gap-16 flex ">
          <div className="">
            <Image
              src="https://res.cloudinary.com/dq1tzl5ir/image/upload/v1751449899/uploads/n3rdozijogkmj697vkvx.webp"
              alt="Turkey Team Process"
              width={570}
              height={500}
              className="rounded-xl object-cover drop-shadow-lg"
            />
          </div>
          <div className="w-3/5">
            <h2 className="text-2xl md:text-3xl  text-gray-900 mb-4 mt-8">
              Ryan Clinic: Leading Hair Transplant Specialists From Turkey –
              World‑Class Turkey’s Technique Hair Transplant Services
            </h2>
            <p className="text-gray-700 mb-4">
              At Ryan Clinic, we are proud to be among Turkey’s top hair
              transplant specialists, offering world‑class hair restoration
              services. Our expert team specializes in Turkey’s Technique, using
              cutting‑edge techniques to achieve natural, long‑lasting results.
              Whether you’re dealing with hair thinning, baldness, or desire a
              fuller hairline, we provide tailored solutions that restore not
              just your hair, but your confidence.
            </p>
            <p className="text-gray-700 mb-4">
              What sets Ryan Clinic apart is our use of the original Choi Pen, a
              precision tool exclusive to our clinic in Turkey, offering
              superior results compared to standard methods available in India.
              This advanced tool enables a more precise hair transplant with
              minimal discomfort and a faster recovery time. Our Turkey’s
              Technique hair transplant method ensures a seamless, efficient
              procedure that delivers natural‑looking outcomes with high‑quality
              results.
            </p>
            <p className="text-gray-700 mb-6">
              From the initial consultation to post‑procedure care, we
              prioritize your comfort and desired outcome. Join Ryan Clinic for
              a life‑changing hair transplant experience, led by some of the
              best hair transplant doctors in Turkey, to join the many satisfied
              clients who have achieved their hair restoration goals with our
              expert services.
            </p>
            <Button />
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              Book Your Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
