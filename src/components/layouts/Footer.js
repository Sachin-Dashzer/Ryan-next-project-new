import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="px-6 md:px-10 lg:px-20 py-20 space-y-10">
        <div className="grid md:grid-cols-2 gap-40">
          {/* Left Side - About Clinic */}
          <div className="space-y-4 text-center mt-4 md:text-left">
            <div>
              <Image
                src="https://res.cloudinary.com/dha2ecdnn/image/upload/v1740393300/logo_tl4ww5.png"
                alt="Ryan Clinic"
                width={300}
                height={300}
                className="w-38 h-auto md:w-84 object-contain"
                unoptimized
              />
            </div>
            <p className="text-md title text-gray-300">
              Ryan Clinic is one of the most trusted and reputable hair
              transplant centers in Delhi, known for delivering exceptional hair
              restoration solutions. Whether you're facing hair loss due to
              genetics, illness, or other reasons, we specialize in personalized
              treatments tailored to your specific needs.
            </p>
          </div>

          {/* Right Side - Callback Form */}
          <div className="bg-zinc-800 rounded-md">
            <form className="py-10 px-8 space-y-4">
              <h2 className="text-2xl font-bold underline text-center mb-4">
                Request a Callback
              </h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Name*"
                  className="w-full p-2 px-5 text-sm rounded bg-gray-100 text-black"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 px-5 text-sm rounded bg-gray-100 text-black"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Phone Number*"
                  className="w-full p-2 px-5 text-sm rounded bg-gray-100 text-black"
                />
              </div>
              <select
                className="w-full p-2 px-5 text-sm rounded bg-gray-100 text-black"
                id="locations"
              >
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>

              <input
                type="submit"
                placeholder="submit"
                className="w-full bg-slate-300 text-black cursor-pointer font-semibold py-2 rounded hover:bg-gray-200 transition"
              />
            </form>
          </div>
        </div>
      </div>

      <div className="border-t bg-black border-gray-700 py-10 md:px-10 lg:px-20 text-sm text-gray-300">
        <div className="flex flex-col md:flex-row justify-between items-center border-gray-600">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h5 className="font-bold text-white text-2xl">
              Google Customer Reviews
            </h5>
            <h5 className="mt-2 text-xl">
              ★★★★★ ( Based on over 800 reviews )
            </h5>
          </div>
          <div className="flex flex-wrap gap-20 text-white text-base justify-center">
            <div className="flex text-2xl gap-2 items-center">
              <FaYoutube />
              <a href="#" className="underline text-xl font-bold">
                @ryantranplant
              </a>
            </div>
            <div className="flex text-2xl gap-2 items-center">
              <FaInstagram />
              <a href="#" className="underline text-xl font-bold">
                ryan_clinic
              </a>
            </div>
            <div className="flex text-2xl gap-2 items-center">
              <FaFacebookF />
              <a href="#" className="underline text-xl font-bold">
                RyanClinic3210
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Services + More About Us */}
      <div className="border-t border-gray-700 py-10 px-6 md:px-10 lg:px-20 space-y-10">
        {/* Services and About Grid */}
        {/* <div className="grid items-center justify-between md:grid-cols-4 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-bold text-xl mb-4">Our Services</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              
             
            </div>
          </div>

          {/* <div>
            <h3 className="font-bold text-xl mb-4">More About us</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              <p>Home</p>
              <p>Our Gallery</p>
              <p>About</p>
              <p>Our Videos</p>
              <p>Our Jobs</p>
              <p>Contact Us</p>
            </div>
          </div> */}

        {/* Social Media }
          <div>
            <h3 className="font-bold text-xl mb-4">Follow Us</h3>
            <div className="flex gap-6 items-center text-white text-base">
              <div className="flex gap-2 items-center">
                <FaFacebookF />
              </div>
              <div className="flex gap-2 items-center">
                <FaInstagram />
              </div>
              <div className="flex gap-2 items-center">
                <FaYoutube />
              </div>
            </div>
          </div>
        </div> */}

        <h4 className="font-bold sub_heading">Our Services</h4>

        <div className="grid md:grid-cols-3 gap-10 text-left border-t p-10">
          <ul className="border-r">
            <li className="text-xl  my-3 pl-10">DHI In India</li>
            <li className="text-xl  my-3 pl-10">Beard transplant</li>
            <li className="text-xl  my-3 pl-10">FUE Hair Transplant</li>
          </ul>
          <ul className="border-r">
            <li className="text-xl  my-3 pl-10">Hairline Transplant</li>
            <li className="text-xl  my-3 pl-10">Female Hair Transplant</li>
            <li className="text-xl  my-3 pl-10">Eyebrow Transplant</li>
            <li className="text-xl  my-3 pl-10">PRP Treatment</li>
          </ul>
          <ul className="">
            <li className="text-xl  my-3 pl-10">Chemical Skin Peels</li>
            <li className="text-xl  my-3 pl-10">Alopecia Treatment</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-3 gap-10 text-left">
          {/* Delhi Branch */}
          <div>
            <h4 className="font-bold text-white underline mb-2">
              Delhi Branch
            </h4>
            <p>CD 163, Block CD, Dakshini Pitampura,</p>
            <p>Pitampura, Delhi, 110034</p>
          </div>

          {/* Mumbai Branch */}
          <div>
            <h4 className="font-bold text-white underline mb-2">
              Mumbai Branch
            </h4>
            <p>
              Office No.1 & 2,1st floor, Owala Naka, OM SAI PLAZA, w)-400615,
              Kasarvadavali, Thane West, Thane, Mumbai, Maharashtra 400615
            </p>
          </div>

          {/* Hyderabad Branch */}
          <div>
            <h4 className="font-bold text-white underline mb-2">
              Hydrabad Branch
            </h4>
            <p>
              2nd Floor, 8-2, 316/A/6/A, Road No. 14, above SBI bank, beside
              Asha hospital, GS Nagar, Nandi Nagar, Banjara Hills, Hyderabad,
              Telangana 500034
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
