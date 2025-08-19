import Image from "next/image";
import HairTransplantPage from "./home/homeServices";
import WhyChooseRyanClinic from "./home/whyChooseUs";

import OurTechnique from "./home/ourTechniques";
import OurResults from "./home/ourResults";
import TurkeySpecialists from "./home/turkeySpecialists"
import OurBranches from "./home/ourBranches";
import Testimonials from "./home/testimonial";
import Banner from "../../../public/uploads/banner.jpg"

export default function Home() {
  return (
    <>
      <div className="homeBanner w-full ">
        <div className="bannerImage w-full h-160 ">
          <Image
            src={Banner}
            alt="Ryan Clinic"
            width={100}
            height={100}
            className="w-full h-full"
            unoptimized
          />
        </div>
      </div>


      <HairTransplantPage />
      <WhyChooseRyanClinic />
      {/* <OurTechnique /> */}
      <OurResults />
      <TurkeySpecialists />
      <OurBranches />
      <Testimonials />
      
    </>
  );
}


