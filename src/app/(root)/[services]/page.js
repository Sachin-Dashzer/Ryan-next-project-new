import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import FAQSection from "./FAQSection";
import PleoFeatures from "./PleoFeatures";

import { getAllServices } from "@/lib/serviceData";
import { getAllBlogs } from "@/lib/blogData";

export default function services({params}) {

  const {slug} = params;


  const service = getAllBlogs(slug)

  console.log(service);


  return (
    <>
      <PageBanner
        title="Our Services"
        description="Ryan Clinic specializes in Sapphire FUE Hair Transplant, the best hair restoration technique for natural results."
        url="https://res.cloudinary.com/dq1tzl5ir/image/upload/v1751372327/uploads/arkntkldmtlryycqivm4.jpg"
      />

      <section className="bg-light">
        <div className="containerFull">
          <div className="pageLayout">
            <div>
              <h1>
                Sapphire FUE Hair Transplant: The Best Hair Restoration
                Technique
              </h1>

              <p>
                Hair loss is a growing concern for both men and women, affecting
                confidence and self-esteem. If you’re looking for a permanent
                hair loss solution, a hair transplant is the best option. Among
                the latest techniques, Sapphire FUE (Follicular Unit Extraction)
                stands out for its natural results, minimal scarring, and faster
                recovery.
              </p>

              <p>
                If you’re searching for the best hair transplant in India, Ryan
                Clinic is a trusted name, known for expert surgeons, advanced
                technology, and high success rates. The Sapphire FUE hair
                transplant method is minimally invasive, leaves no visible
                scars, and offers long-lasting, natural hair growth.
              </p>

              <p>
                This guide covers everything you need to know about Sapphire FUE
                hair transplants, including benefits, cost, and why Ryan Clinic
                is the best hair transplant clinic in India.
              </p>

              <h2>What is Sapphire FUE Hair Transplant?</h2>

              <p>
                Sapphire FUE hair transplant is an advanced hair restoration
                technique that involves extracting individual hair follicles
                from the donor area, usually the back or sides of the scalp and
                implanting them into thinning or bald areas. Unlike traditional
                methods, Sapphire FUE uses ultra-sharp sapphire blades, ensuring
                higher precision, faster healing, and denser hair growth.
              </p>

              <p>
                Compared to traditional FUE or FUT hair transplants, the
                Sapphire FUE technique minimizes scalp trauma, reduces recovery
                time, and enhances hair graft survival rate.
              </p>

              <h2>How Does Sapphire FUE Hair Transplant Work?</h2>

              <ul>
                <li>
                  Donor Area Preparation:&nbsp; The donor area (usually the back
                  of the scalp) is shaved for precise hair follicle extraction.
                </li>
                <li>
                  Follicle Extraction:&nbsp; Using a micro motor tool,
                  individual hair grafts are carefully removed without damaging
                  surrounding tissue.
                </li>
                <li>
                  Sapphire Blade Incision:&nbsp; Tiny, V-shaped incisions are
                  made in the recipient area using sapphire blades, allowing for
                  denser and more natural hair growth.
                </li>
                <li>
                  Implantation:&nbsp; The extracted hair follicles are implanted
                  in the bald or thinning area, ensuring a natural hairline and
                  maximum density.
                </li>
                <li>
                  Healing &amp; Recovery::&nbsp; The sapphire blade’s smooth
                  incisions help the scalp heal faster, reducing scabbing and
                  leaving no visible scars
                </li>
              </ul>
            </div>
            <div className="px-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="containerFull">
          <div className="grid grid-cols-11 gap-20">
            <div className="col-span-5">
              <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-6">
                <div className="rounded-xl overflow-hidden shadow-md">
                  <img
                    src="/path-to-image1.jpg"
                    alt="Person"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-rows-2 gap-4">
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <img
                      src="/path-to-image2.jpg"
                      alt="Tool on scalp"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <img
                      src="/path-to-image3.jpg"
                      alt="Implant tool"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <h2>
                <span>Why Choose FUE Hair Transplants?</span>
              </h2>

              <h3>1. Natural Hair Transplant Results:</h3>

              <p>
                Sapphire blades create smaller, precise incisions, ensuring
                denser and more natural hair growth
              </p>

              <h3>2. Minimally Invasive Hair Transplant:</h3>

              <p>
                Minimally invasive with no stitches, no visible scars, and quick
                recovery in just a few days.
              </p>

              <h3>3. No Scars:</h3>

              <p>
                Better blood circulation and less trauma lead to stronger,
                healthier hair growth
              </p>

              <h3>4. Quick Recovery:</h3>

              <p>
                Less bleeding, less swelling, and a smooth, painless experience
                compared to traditional methods.
              </p>

              <h3>5. Permanent Hair Growth:</h3>

              <p>
                Provides a permanent solution to hair loss, with full results in
                8-12 months.
              </p>

              <p>
                For the best hair transplant in India, Ryan Clinic provides
                advanced techniques and expert care, ensuring amazing results.
              </p>

              <p>
                <a href="https://api.whatsapp.com/send?phone=+919911111247&amp;text=Hi"></a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <PleoFeatures />

      <section className="">
        <div className="containerFull">
          <div className="flex">
            <div className="w-1/2 px-12 border-r-[1px]">
                    <h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia quam molestias aut fugiat voluptatibus? Blanditiis itaque eveniet non quae dolores aliquid ipsa nisi.</h2>
            </div>
            <div className="w-1/2 px-12">
                    <h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia quam molestias aut fugiat voluptatibus? Blanditiis itaque eveniet non quae dolores aliquid ipsa nisi.</h2>
            
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
}
