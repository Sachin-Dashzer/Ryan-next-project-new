import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import { getBlogBySlug } from "@/lib/blogData";

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  return (
    <>
      <div>
        {/* Page Banner */}
        <PageBanner
          title={blog?.pageTitle}
          description={blog?.metaDiscription}
          url={blog?.pageImageUrl}
        />

        {/* Blog Content */}
        <section className="bg-light">
          <div className="containerFull">
            <div className="new-pageLayout pageLayout">
              <div
                dangerouslySetInnerHTML={{
                  __html: blog?.blogContent || "",
                }}
              ></div>

              {/* Contact Form */}
              <div className="px-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
