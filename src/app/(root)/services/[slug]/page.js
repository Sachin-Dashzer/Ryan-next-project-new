import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import FAQSection from "./FAQSection";
import PleoFeatures from "./PleoFeatures";

import { getServiceBySlug } from "@/lib/serviceData";

export default async function services({ params }) {
  const { slug } = await params;

  const service = await getServiceBySlug(slug);

  console.log(service);

  return (
    <>
      <div>
        <PageBanner
          title={service?.bannerData?.title}
          description={service?.bannerData?.description}
          url={service?.bannerData?.imageurl}
        />

        <section className="bg-light">
          <div className="containerFull">
            <div className="new-pageLayout pageLayout">
              <div
                dangerouslySetInnerHTML={{
                  __html: service?.metadata?.overviewData || "",
                }}
              ></div>
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
                      src={service?.typesData?.images[0]}
                      alt="Person"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-rows-2 gap-4">
                    <div className="rounded-xl overflow-hidden shadow-md">
                      <img
                        src={service?.typesData?.images[1]}
                        alt="Tool on scalp"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-md">
                      <img
                        src={service?.typesData?.images[2]}
                        alt="Implant tool"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 ">
                <div className="new-pageLayout">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: service?.typesData?.details || "",
                    }}
                  ></div>
                </div>
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
          <section className="py-8">
            {" "}
            <div className="containerFull">
              <div className="flex flex-col md:flex-row">
                {" "}
                <div className="w-full md:w-1/2 px-4 md:px-12 border-r-0 md:border-r-[1px] border-gray-200">
                  {service?.extraFieldsData?.detail1 && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          service.extraFieldsData.detail1
                        ),
                      }}
                    />
                  )}
                </div>
                <div className="w-full md:w-1/2 px-4 md:px-12 mt-6 md:mt-0">
                  {" "}
                  {service?.extraFieldsData?.detail2 && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          service.extraFieldsData.detail2
                        ),
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <FAQSection faqs={service?.faq} />
      </div>
      ;
    </>
  );
}
