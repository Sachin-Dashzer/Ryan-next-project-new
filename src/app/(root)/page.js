import Image from "next/image";
import HairTransplantPage from "./home/homeServices";
import WhyChooseRyanClinic from "./home/whyChooseUs";

import OurResults from "./home/ourResults";
import TurkeySpecialists from "./home/turkeySpecialists";
import OurBranches from "./home/ourBranches";
import Testimonials from "./home/testimonial";
import Banner from "../../../public/uploads/banner.jpg";
import Banner2 from "../../../public/uploads/banner2.jpg";

export default function Home() {
  return (
    <>
      <div className="w-full">
        <div className="w-full">
          <Image
            src={Banner}
            alt="Ryan Clinic"
            width={1920} 
            height={600} 
            className="w-full hidden md:block h-auto object-cover aspect-[16/9] md:aspect-[21/9] rounded-lg"
            unoptimized
          />
          <Image
            src={Banner2}
            alt="Ryan Clinic"
            width={600} 
            height={1200} 
            className="w-full md:hidden block object-cover  rounded-lg"
            unoptimized
          />
        </div>
      </div>

      <HairTransplantPage />
      <OurResults />
      <WhyChooseRyanClinic />
      {/* <OurTechnique /> */}
      <TurkeySpecialists />
      <OurBranches />
      <Testimonials />
    </>
  );
}
