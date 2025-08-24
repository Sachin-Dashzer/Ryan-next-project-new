import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import FAQSection from "./FAQSection";
import PleoFeatures from "./PleoFeatures";
import OurResults from "../home/ourResults";
import { getServiceBySlug } from "@/lib/serviceData";

export default async function services({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  return (
    <>
      <div>
        <PageBanner
          title={service?.bannerData?.title}
          description={service?.bannerData?.description}
          url={service?.bannerData?.imageurl}
        />

        <section className="bg-light py-8 md:py-12">
          <div className="containerFull px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div 
                className="w-full lg:w-2/3 prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: service?.metadata?.overviewData || "",
                }}
              ></div>
              <div className="w-full lg:w-1/3 px-0 md:px-4 lg:px-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="containerFull px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="w-full lg:w-5/12">
                <div className="h-auto lg:h-144 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[45%_55%] gap-4 md:gap-6 sticky top-6">
                  <div className="rounded-xl h-48 md:h-60 lg:h-full overflow-hidden shadow-md">
                    <img
                      src={service?.typesData?.images[0]}
                      alt="Person"
                      className="w-full h-full object-cover"
                      width="100%"
                      height="100%"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-rows-2 gap-4 md:gap-6">
                    <div className="rounded-xl h-48 md:h-auto overflow-hidden shadow-md">
                      <img
                        src={service?.typesData?.images[1]}
                        alt="Tool on scalp"
                        className="w-full h-full object-cover"
                        width="100%"
                        height="auto"
                      />
                    </div>
                    <div className="rounded-xl h-48 md:h-auto overflow-hidden shadow-md">
                      <img
                        src={service?.typesData?.images[2]}
                        alt="Implant tool"
                        className="w-full h-full object-cover"
                        width="100%"
                        height="auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-7/12">
                <div className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: service?.typesData?.details || "",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        <PleoFeatures
          features={service?.benefitsData?.component}
          title={service?.benefitsData?.title}
          description={service?.benefitsData?.description}
        />

        {service?.extraFieldsData?.length > 0 && (
          <section className="py-8 md:py-12">
            <div className="containerFull px-4 md:px-6">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 px-0 md:px-4 lg:px-8 border-r-0 md:border-r border-gray-200 md:pr-8">
                  {service?.extraFieldsData?.detail1 && (
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: service.extraFieldsData.detail1,
                      }}
                    />
                  )}
                </div>
                <div className="w-full md:w-1/2 px-0 md:px-4 lg:px-8 mt-6 md:mt-0 md:pl-8">
                  {service?.extraFieldsData?.detail2 && (
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: service.extraFieldsData.detail2,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <OurResults />
        <FAQSection faqs={service?.faq} />
      </div>
    </>
  );
}