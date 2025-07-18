// pages/contact.js
import Head from "next/head";
import ContactForm from "@/components/pages/contactForm";
import PageBanner from "@/components/layouts/pageBanner";
import {MapPin, PhoneCall , Mail} from "lucide-react";

export default function ContactUs() {
  return (
    <>
      <Head>
        <title>Contact Us | Ryan Clinic</title>
        <meta
          name="description"
          content="Contact our clinic for appointments and inquiries"
        />
      </Head>

      <main className="">
        <PageBanner
          title="Contact us"
          description="Regain your confidence with world-class
          Turkey's Technique hair restoration at Turkey's
          top-rated Ryan Clinic!"
          url="https://res.cloudinary.com/dq1tzl5ir/image/upload/v1751372327/uploads/arkntkldmtlryycqivm4.jpg"
        />

        <section className="mt-8">
          <div className="containerFull">
            <div className="grid grid-cols-7 gap-10">
              <div className="p-8 col-span-4">
                <h1 className="text-3xl border-b-2 font-bold text-gray-800 mt-4 mb-8 inline-block">
                  Contact Us
                </h1>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-700 flex gap-3 mb-1 justify-baseline align-baseline">
                    <span>
                      <MapPin />
                    </span>
                    Address
                  </h2>
                  <p className="text-gray-600">
                    CD 163, Block CD, Dakshin Pisanpura, Pisanpura, Delhi,
                    110034
                  </p>
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-700 flex gap-3 mb-1 justify-baseline align-baseline">
                    <span><PhoneCall /></span>
                    Mobile No.
                  </h3>
                  <p className="text-gray-600">+919911111247</p>
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-700 flex gap-3 mb-1 justify-baseline align-baseline">
                    <span><Mail /></span>
                    Email
                  </h4>
                  <p className="text-gray-600">Clinicryanoff/cial@gmail.com</p>
                </div>
              </div>
              <div className="col-span-3">
                <div className="px-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
