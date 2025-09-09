"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Phone,
  Calendar,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import Logo from "../../../public/uploads/logo-2.png";
import ContactForm from "../pages/contactForm";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // popup for appointment form

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
      href: "/gallery/images",
    },
    // {
    //   name: "Branches",
    //   href: "/branches",
    //   hasDropdown: true,
    //   key: "branches",
    //   dropdownItems: [
    //     { name: "Delhi", href: "/branches/delhi" },
    //     { name: "Mumbai", href: "/branches/mumbai" },
    //     { name: "Hyderabad", href: "/branches/hyderabad" },
    //   ],
    // },
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
    }, 200);
    setCloseTimeout(timeout);
  };

  return (
    <>
      <header className="w-full bg-primary text-white sticky top-0 z-50">
        <div className="w-full mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={Logo}
              alt="Ryan Clinic"
              width={160}
              height={160}
              className="w-28 md:w-40 h-auto object-contain"
              unoptimized
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center xl:gap-4 2xl:gap-12">
            <nav>
              <ul className="flex space-x-2">
                {navItems.map((item) => (
                  <li
                    className="font-semibold relative group"
                    key={item.key || item.name}
                    onMouseEnter={() =>
                      item.hasDropdown && handleMouseEnter(item.key)
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.hasDropdown ? (
                      <div className="relative">
                        <button className="flex items-center px-4 py-2">
                          {item.name}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </button>

                        <div
                          className={`absolute top-9 left-0 z-50 w-52 bg-primary rounded-sm shadow-lg transition-all duration-200 ease-in-out ${
                            openDropdown === item.key
                              ? "opacity-100 visible translate-y-0"
                              : "opacity-0 invisible translate-y-1"
                          }`}
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

            {/* Desktop Buttons */}
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                asChild
                className="md:h-9 h-8 bg-white text-black hover:bg-black hover:text-white"
              >
                <Link href="tel:+919911111247">
                  <Phone className="h-4 w-4" />
                  <span>Call us</span>
                </Link>
              </Button>
              <Button
                onClick={() => setShowPopup(true)}
                className="md:h-9 h-8 bg-white text-black hover:bg-black hover:text-white"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden 2xl:block">Book appointment</span>
              </Button>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-110 lg:hidden transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Sidebar */}
        <div className="fixed top-0 left-0 w-72 h-full bg-primary text-white shadow-lg p-6 z-50 overflow-y-auto">
          {/* Close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-4 text-white"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="block mb-8">
            <Image
              src={Logo}
              alt="Ryan Clinic"
              width={140}
              height={80}
              className="object-contain"
            />
          </Link>

          {/* Navigation */}
          <nav>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.key || item.name}>
                  {item.hasDropdown ? (
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer font-semibold hover:text-amber-300">
                        {item.name}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </summary>
                      <ul className="pl-4 mt-2 space-y-2">
                        {item.dropdownItems.map((dropdownItem) => (
                          <li key={dropdownItem.href}>
                            <Link
                              href={dropdownItem.href}
                              className="block py-1 hover:text-amber-300"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {dropdownItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link
                      href={item.href}
                      className="block font-semibold hover:text-amber-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3">
            <Button
              asChild
              className="bg-white text-black hover:bg-black hover:text-white"
            >
              <Link href="tel:+919911111247">
                <Phone className="h-4 w-4" />
                <span>Call us</span>
              </Link>
            </Button>
            <Button
              onClick={() => {
                setShowPopup(true);
                setMobileMenuOpen(false);
              }}
              className="bg-white text-black hover:bg-black hover:text-white"
            >
              <Calendar className="h-4 w-4" />
              <span>Book appointment</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="rounded-lg w-full max-w-md p-6 relative bg-white md:bg-transparent">
            {/* Close Btn */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-0 right-0 md:top-2 md:right-2 rounded-4xl p-4 z-10 bg-transparent  md:bg-white text-black hover:text-red-600"
            >
              <X className="h-5 w-5" />
            </button>

            <ContactForm />
          </div>
        </div>
      )}

      <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-50">
        <Button
          asChild
          size="icon"
          className="rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
        >
          <Link href="tel:+919911111247">
            <Phone className="h-6 w-6" />
          </Link>
        </Button>
        <Button
          asChild
          size="icon"
          className="rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
        >
          <Link href="https://api.whatsapp.com/send?phone=+918882356930&text=Hi">
            <FaWhatsapp className="h-6 w-6" />

          </Link>
        </Button>
      </div>
    </>
  );
};

export default Header;
