'use client';

import React, { useEffect, useState } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 300);
      const scrollableHeight = documentHeight - windowHeight;
      const progress = (scrollTop / scrollableHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const R = 20; // ← circle radius (was 28)

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-30 right-3 sm:bottom-25 sm:right-7 z-50 group transition-all duration-500 ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <div className="relative">
          {/* Circular Progress Ring — smaller */}
          <svg
            className="absolute -inset-1 w-[calc(100%+7px)] h-[calc(100%+7px)] -rotate-90"
            style={{ filter: "drop-shadow(0 0 6px rgba(221,185,90,0.3))" }}
          >
            <circle
              cx="50%" cy="50%" r={R}
              stroke="rgba(221,185,90,0.15)" strokeWidth="2.5" fill="none"
            />
            <circle
              cx="50%" cy="50%" r={R}
              stroke="#ddb95a" strokeWidth="2.5" fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * R}`}
              strokeDashoffset={`${2 * Math.PI * R * (1 - scrollProgress / 100)}`}
              className="transition-all duration-300"
              style={{ filter: "drop-shadow(0 0 3px rgba(221,185,90,0.5))" }}
            />
          </svg>

          {/* Button Content — smaller padding */}
          <div className="relative rounded-full bg-gradient-to-br from-[#080b12] to-[#0f1318] p-3 shadow-2xl border border-[#ddb95a]/30 group-hover:border-[#ddb95a] group-hover:shadow-[0_0_24px_rgba(221,185,90,0.4)] transition-all duration-300 group-hover:scale-105">
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#ddb95a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Arrow Icon — smaller */}
            <div className="relative flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-4 w-4 text-[#ddb95a] group-hover:animate-bounce-slow"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7 7 7M12 3v18" />
              </svg>
            </div>

            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 group-hover:mr-4">
              <div className="whitespace-nowrap rounded-lg bg-[#080b12] px-3 py-2 text-xs font-semibold text-[#ddb95a] shadow-xl border border-[#ddb95a]/30">
                Back to Top
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                  <div className="border-8 border-transparent border-l-[#080b12]" />
                </div>
              </div>
            </div>

            {/* Percentage Badge */}
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#ddb95a] text-[#080b12] text-[8px] font-bold shadow-lg">
                {Math.round(scrollProgress)}%
              </div>
            </div>
          </div>
        </div>
      </button>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .group:hover .group-hover\\:animate-bounce-slow {
          animation: bounce-slow 1s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default BackToTop;