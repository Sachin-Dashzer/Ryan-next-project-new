import Image from "next/image";
import HairTransplantPage from "./home/homeServices";
import WhyChooseRyanClinic from "./home/whyChooseUs";

import OurTechnique from "./home/ourTechniques";
import OurResults from "./home/ourResults";
 import TurkeySpecialists from "./home/turkeySpecialists"


export default function Home() {
  return (
    <>
      <div className="homeBanner w-full ">
        <div className="bannerImage w-full h-full ">
          <Image
            src="https://res.cloudinary.com/dha2ecdnn/image/upload/v1742209534/banner_krdbmt.jpg"
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
      <OurTechnique />
      <OurResults />
      <TurkeySpecialists />
      
    </>
  );
}
