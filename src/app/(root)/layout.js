
import "../../styles/globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

import { Baloo_Bhaijaan_2 } from 'next/font/google';


import { Hind_Siliguri } from "next/font/google";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const baloo = Baloo_Bhaijaan_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-baloo', // optional, if using CSS variable
});


 
export const metadata = {
  metadataBase: new URL("https://clinicryan.com"),
  title: {
    default: "Best Hair Transplant in India | Ryan Clinic Experts",
    template: "%s | Ryan Clinic"
  },
  description:
    "Get natural-looking hair with advanced, affordable transplants at Ryan Clinic. Turkey-trained experts. Book your free consultation now!",

  openGraph: {
    type: "website",
    url: "https://clinicryan.com/",
    title: "Best Hair Transplant in India | Ryan Clinic Experts",
    description:
      "Get natural-looking hair with advanced, affordable transplants at Ryan Clinic. Turkey-trained experts. Book your free consultation now!",
    images: [
      {
        url: "../../../../public/uploads/logo.png", // put your image in /public/uploads/
        width: 1200,
        height: 630,
        alt: "Ryan Clinic Hair Transplant"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Best Hair Transplant in India | Ryan Clinic Experts",
    description:
      "Get natural-looking hair with advanced, affordable transplants at Ryan Clinic. Turkey-trained experts. Book your free consultation now!",
    images: ["../../../../public/uploads/logo.png"] // same as OG image
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={baloo.variable}>
      <body className="antialiased">

        <Header />

        {children}

        <Footer />

      </body>
    </html>
  );
}
