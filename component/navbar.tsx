"use client";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import WalkthroughButton from "./buttoncomponent";
// import WalkthroughButton from "@/components/WalkthroughButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#About" },
    { name: "Services", href: "#services" },
    { name: "FAQ", href: "#faq" },
    { name: "Reviews", href: "#reviews" },
    { name: "Treatment", href: "#treatment" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="w-full sticky top-0 z-50"
      style={{
        background: "#080b12",
        borderBottom: "1px solid rgba(221,185,90,0.15)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
      }}
    >
      {/* Main Navbar Container */}
      <div className="container-fluid ml-5 max-sm:pl-0 max-sm:ml-0 mr-5 px-4 py-3 max-sm:px-4 max-sm:py-3">
        <div className="flex flex-col lg:flex-row justify-around items-center gap-4">

          {/* Left Section - Logo & Brand */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <div className="relative">
              <div className="relative w-50 h-20 max-sm:h-16 rounded-xl flex items-center justify-center">
                <div
                  className="w-92 h-20 max-sm:h-16 rounded-lg flex items-center justify-center"
                  style={{ background: "#080b12" }}
                >
                  <img
                    src="/logo.png"
                    alt="Fastest Health Tech Logo"
                    className="w-100 h-40 max-sm:h-32 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors duration-300"
              style={{ color: "#ddb95a" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(221,185,90,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" style={{ color: "#ddb95a" }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: "#ddb95a" }} />
              )}
            </button>
          </div>

          {/* Center Section - Navigation Menu (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="px-5 py-2.5 font-semibold rounded-lg transition-all duration-300 relative group"
                style={{ color: "rgba(221,185,90,0.85)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(221,185,90,0.08)";
                  e.currentTarget.style.color = "#ddb95a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(221,185,90,0.85)";
                }}
              >
                {item.name}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                  style={{ background: "#ddb95a" }}
                ></span>
              </a>
            ))}
          </div>

          {/* Right Section - CTA Button (Desktop) */}
          <div className="hidden lg:flex gap-8">
            <WalkthroughButton label="Book Your Consultant" href="#Form" />
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-123" : "max-h-0"
        }`}
      >
        <div
          className="container mx-auto px-4 py-4 space-y-2 border-t"
          style={{ borderColor: "rgba(221,185,90,0.15)" }}
        >
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block px-4 py-3 font-semibold rounded-lg transition-all duration-300"
              style={{ color: "rgba(221,185,90,0.85)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(221,185,90,0.08)";
                e.currentTarget.style.color = "#ddb95a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(221,185,90,0.85)";
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}

          {/* Mobile CTA Button */}
          <div
            className="pt-4 border-t mt-4 flex justify-center"
            style={{ borderColor: "rgba(221,185,90,0.15)" }}
          >
            <WalkthroughButton
              label="Book Your Consultant"
              href="#Form"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>

        </div>
      </div>

      {/* Bottom Accent Line */}
      <div
        className="h-0.5"
        style={{ background: "linear-gradient(90deg, transparent 0%, #ddb95a 50%, transparent 100%)" }}
      ></div>
    </nav>
  );
};

export default Navbar;