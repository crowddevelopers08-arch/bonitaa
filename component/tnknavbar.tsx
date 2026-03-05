"use client";
import React, { useState } from "react";
import { Calendar } from "lucide-react";

const Navbared = () => {
  return (
    <nav
      className="w-full sticky top-0 z-50"
      style={{
        background: "#080b12",
        borderBottom: "1px solid rgba(221,185,90,0.15)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
      }}
    >
      {/* Main Navbared Container */}
      <div className="container-fluid ml-5 max-sm:pl-0 max-sm:ml-0 mr-5 px-4 py-3 max-sm:px-4 max-sm:py-3">
        <div className="flex justify-around items-center">

          {/* Logo */}
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

          {/* Book Consultant Button */}
          <div className="relative inline-block">
            <div
              className="absolute rounded-full blur-md opacity-20"
              style={{ background: "#ddb95a" }}
            ></div>
            <a
              href="#Form"
              className="flex relative text-white px-6 py-3 rounded-full text-base font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group"
              style={{
                background: "#ddb95a",
                color: "#080b12",
                boxShadow: "0 4px 20px rgba(221,185,90,0.3)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#c9a44a";
                e.currentTarget.style.boxShadow = "0 6px 28px rgba(221,185,90,0.45)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#ddb95a";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(221,185,90,0.3)";
              }}
            >
              <div className="flex items-center space-x-2">
                <span>Book Your Consultant</span>
                <Calendar className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: "#080b12" }} />
              </div>
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </div>
            </a>
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

export default Navbared;