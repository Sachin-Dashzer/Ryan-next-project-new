import PageBanner from "@/components/layouts/pageBanner";
import AboutSection from "./aboutSection";
import StepsSection from "./stepsSection";
import ChooseSection from "./chooseSection";

const page = () => {
  return (
    <>
      <PageBanner
        title="About us"
        description="Regain your confidence with world-class
          Turkey's Technique hair restoration at Turkey's
          top-rated Ryan Clinic!"
        url="https://res.cloudinary.com/dq1tzl5ir/image/upload/v1751372327/uploads/arkntkldmtlryycqivm4.jpg"
      />
      <AboutSection />
      <StepsSection />
      <ChooseSection />
    </>
  );
};

export default page;
