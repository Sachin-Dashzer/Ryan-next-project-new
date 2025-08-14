"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from '../../../public/uploads/logo-2.png'

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    {
      name: "Hair Transplant",
      href: "/fue-hair-transplant",
      hasDropdown: true,
      key: "hairTransplant",
      dropdownItems: [
        { name: "Sapphire FUE", href: "/fue-hair-transplant" },
        { name: "Hairline Transplant", href: "/hairline-transplant" },
        { name: "Beard Transplant", href: "/beard-transplant" },
        { name: "Female Hair Transplant", href: "/female-hair-transplant" },
        { name: "Eyebrow Transplant", href: "/eyebrow-transplant" },
      ],
    },
    {
      name: "Treatments",
      href: "/prp-treatment",
      hasDropdown: true,
      key: "treatments",
      dropdownItems: [
        { name: "PRP Treatment", href: "/prp-treatment" },
        { name: "Chemical Skin Peels", href: "/chemical-skin-peels" },
        { name: "Alopecia Treatment", href: "/alopecia-treatments" },
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

  const handleMouseEnter = (key) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 200); // 200ms delay before closing
    setCloseTimeout(timeout);
  };

  return (
    <header className="w-full bg-primary text-white">
      <div className="w-full mx-auto px-2 xl:px-8 flex items-center justify-between h-12 md:h-22">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="relative">
              <Image
                src={Logo}
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
                <li 
                  className="font-semibold relative group" 
                  key={item.key || item.name}
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.hasDropdown ? (
                    <div className="relative">
                      <button className="flex items-center cursor-pointer px-4 py-2  rounded-md">
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>

                      <div
                        className={`absolute  top-9 left-0 z-100 w-52 mt-2 bg-primary rounded-sm shadow-lg transition-all duration-200 ease-in-out ${
                          openDropdown === item.key 
                            ? "opacity-100 visible translate-y-0" 
                            : "opacity-0 invisible translate-y-1"
                        }`}
                        onMouseEnter={() => handleMouseEnter(item.key)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <ul className="py-1">
                          {item.dropdownItems.map((dropdownItem) => (
                            <li key={dropdownItem.href}>
                              <Link
                                href={dropdownItem.href}
                                className="block px-4 py-2 text-md font-semibold text-white hover:bg-gray-700"
                              >
                                {dropdownItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link 
                      href={item.href} 
                      className="block px-4 py-2 hover:text-amber-300"
                    >
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
                <span>Call us</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button className="h-9 bg-white text-black cursor-pointer hover:bg-black hover:text-white">
                <Calendar className="h-4 w-4" />
                <span className="hidden 2xl:block">Book appointment</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;