import "../../styles/globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Baloo_Bhaijaan_2 } from "next/font/google";
import { Hind_Siliguri } from "next/font/google";
import Logo from "../../../public/uploads/logo-2.png";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const baloo = Baloo_Bhaijaan_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-baloo",
});

export const metadata = {
  metadataBase: new URL("https://clinicryan.com"),
  title: {
    default: "Best Hair Transplant in India | Ryan Clinic Experts",
    template: "%s | Ryan Clinic",
  },
  description:
    "Get natural-looking hair with advanced, affordable transplants at Ryan Clinic. Turkey-trained experts. Book your free consultation now!",

  keywords: [
    "Hair Transplant India",
    "Ryan Clinic",
    "Best Hair Transplant",
    "Hair Restoration",
    "Affordable Hair Transplant",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },

  openGraph: {
    type: "website",
    siteName: "Ryan Clinic",
    url: "https://clinicryan.com/",
    title: "Best Hair Transplant in India | Ryan Clinic Experts",
    description:
      "Get natural-looking hair with advanced, affordable transplants at Ryan Clinic. Turkey-trained experts. Book your free consultation now!",
    images: [
      {
        url: "/uploads/logo.png", // ✅ from public folder
        width: 1200,
        height: 630,
        alt: "Ryan Clinic Hair Transplant",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Best Hair Transplant in India | Ryan Clinic Experts",
    description:
      "Get natural-looking hair with advanced, affordable transplants at Ryan Clinic. Turkey-trained experts. Book your free consultation now!",
    images: ["/uploads/logo.png"],
  },

  icons: {
    icon: "/images/logo.png", // favicon inside public/images
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={baloo.variable}>
      <body className={`${hindSiliguri.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
