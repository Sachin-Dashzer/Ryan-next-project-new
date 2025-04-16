"use client"; 

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    {
      name: "Hair Transplant",
      href: "/hair-transplant",
      hasDropdown: true,
      key: "hairTransplant",
      dropdownItems: [
        { name: "Turkey's DHI", href: "/hair-transplant/dhi" },
        { name: "Sapphire FUE", href: "/hair-transplant/sapphire" },
        { name: "Hairline Transplant", href: "/hair-transplant/hairline" },
        { name: "Beard Transplant", href: "/hair-transplant/beard" },
        { name: "Female Hair Transplant", href: "/hair-transplant/female" },
        { name: "Eyebrow Transplant", href: "/hair-transplant/eyebrow" },
      ],
    },
    {
      name: "Treatments",
      href: "/treatments",
      hasDropdown: true,
      key: "treatments",
      dropdownItems: [
        { name: "PRP Treatment", href: "/treatments/prp" },
        { name: "Chemical Skin Peels", href: "/treatments/skin-peel" },
        { name: "Alopecia Treatment", href: "/treatments/alopecia" },
      ],
    },
    {
      name: "Gallery",
      href: "/gallery",
      hasDropdown: true,
      key: "gallery",
      dropdownItems: [
        { name: "Ryan Images", href: "/gallery/images" },
        { name: "Ryan Videos", href: "/gallery/videos" },
      ],
    },
    {
      name: "Branches",
      href: "/branches",
      hasDropdown: true,
      key: "branches",
      dropdownItems: [
        { name: "Delhi", href: "/branches/delhi" },
        { name: "Mumbai", href: "/branches/mumbai" },
        { name: "Hyderabad", href: "/branches/hyderabad" },
      ],
    },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <header className="w-full bg-primary text-white">
      <div className="w-full mx-auto px-2 xl:px-8 flex items-center justify-between h-12 md:h-22">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="relative">
              <Image
                src="https://res.cloudinary.com/dha2ecdnn/image/upload/v1740393300/logo_tl4ww5.png"
                alt="Ryan Clinic"
                width={200}
                height={200}
                className="w-28 h-auto md:w-44 object-contain"
                unoptimized 
              />
            </div>
          </Link>
        </div>

        <div className="flex xl:gap-4 2xl:gap-12 items-center">
          {/* Navigation Menu */}
          <nav className="hidden lg:flex">
            <ul className="flex space-x-1">
              {navItems.map((item) => (
                <li className="font-semibold relative text" key={item.key || item.name} >
                  {item.hasDropdown ? (
                    <div
                      onMouseEnter={() => toggleDropdown(item.key)} 
                      onMouseLeave={() => toggleDropdown(null)} 
                      className="relative"
                    >
                      <button className="flex items-center cursor-pointer px-4 py-2 focus:outline-none">
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>

                      {openDropdown === item.key && (
                        <div className="absolute z-10  left-0 w-48 rounded-sm bg-primary ">
                          <ul className="py-1">
                            {item.dropdownItems.map((dropdownItem) => (
                              <li key={dropdownItem.href}>
                                <Link
                                  href={dropdownItem.href}
                                  className="block px-4 py-2 font-normal text text-white underline hover:bg-gray-700"
                                >
                                  {dropdownItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href={item.href} className="block px-4 py-2">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Nav Buttons */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button className="h-9 bg-white text-black cursor-pointer hover:bg-black hover:text-white">
                <Phone className="h-4 w-4" />
                <span className="">Call us</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button className="h-9 bg-white text-black cursor-pointer hover:bg-black hover:text-white">
                <Calendar className="h-4 w-4" />
                <span className=" hidden 2xl:block">
                  Book appointment
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
