import Image from "next/image";
import HairTransplantPage from "./home/homeServices";
import WhyChooseRyanClinic from "./home/whyChooseUs";

import OurTechnique from "./home/ourTechniques";
import OurResults from "./home/ourResults";
import TurkeySpecialists from "./home/turkeySpecialists";
import OurBranches from "./home/ourBranches";
import Testimonials from "./home/testimonial";
import Banner from "../../../public/uploads/banner.jpg";

export default function Home() {
  return (
    <>
      <div className="homeBanner w-full">
        <div className="bannerImage w-full">
          <Image
            src={Banner}
            alt="Ryan Clinic"
            width={1920} // Large width for scaling
            height={600} // Approx banner height
            className="w-full h-auto object-cover aspect-[16/9] md:aspect-[21/9] rounded-lg"
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
