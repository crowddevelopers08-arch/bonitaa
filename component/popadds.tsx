"use client";

import { useState, useEffect } from "react";
import WalkthroughButton from "./buttoncomponent";
import GhostGoldButton from "./viewbutton";

export default function PopupAd() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const features = [
    "Free Treatment Planning Visit",
    "Transparent Cost Breakdown",
    "10,000+ Happy Families",
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Popup Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
        <div
          className="relative shadow-2xl w-full pointer-events-auto transform transition-all duration-300 animate-popup"
          style={{
            background: "#080b12",
            borderRadius: "10px",
            maxWidth: "min(440px, 92vw)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute -top-4 max-sm:-right-2 -right-4 w-9 h-9 sm:w-10 sm:h-10 cursor-pointer text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-10 animate-close-btn"
            style={{
              background: "linear-gradient(135deg, #c9a44a, #ddb95a, #e8cc7a)",
              borderRadius: "6px",
            }}
            aria-label="Close popup"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Decorative Background Orbs */}
          <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: "#ddb95a" }} />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#ddb95a" }} />

          {/* Gold Border */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ border: "1.5px solid rgba(221,185,90,0.3)", borderRadius: "10px" }}
          />

          {/* Top gold accent line */}
          <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #ddb95a, transparent)", borderRadius: "10px 10px 0 0" }} />

          {/* Content */}
          <div className="relative p-5 sm:p-7">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 py-1.5 animate-badge"
              style={{
                border: "1px solid rgba(221,185,90,0.3)",
                background: "rgba(221,185,90,0.08)",
                borderRadius: "6px",
              }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#ddb95a" }} />
              <span className="uppercase text-xs font-semibold tracking-wider" style={{ color: "#ddb95a" }}>Special Offer</span>
            </div>

            {/* Heading */}
            <h2
              className="font-bold mb-2 sm:mb-3 leading-tight animate-heading"
              style={{
                color: "rgba(240,232,213,0.95)",
                fontSize: "clamp(1.3rem, 5vw, 1.75rem)",
              }}
            >
              Get Your <span style={{ color: "#ddb95a" }}>Free IVF</span> Consultation Today!
            </h2>

            {/* Description */}
            <p
              className="mb-4 sm:mb-5 leading-relaxed animate-description"
              style={{
                color: "rgba(240,232,213,0.6)",
                fontSize: "clamp(12px, 3.5vw, 14px)",
              }}
            >
              Start your journey to parenthood with expert guidance. Book a free consultation and get a personalized treatment plan.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-2 mb-5 sm:mb-6">
              {features.map((text, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 animate-feature-${i + 1}`}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid rgba(221,185,90,0.18)",
                    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 18,
                      height: 18,
                      background: "rgba(221,185,90,0.12)",
                      border: "1.5px solid #ddb95a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                    }}
                  >
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#ddb95a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span
                    className="font-semibold"
                    style={{
                      color: "rgba(240,232,213,0.85)",
                      fontSize: "clamp(11px, 3vw, 13px)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex sm:flex-row gap-2 sm:gap-3 animate-popup">
              <WalkthroughButton label="Book Now" href="#Form" />
              <GhostGoldButton onClick={handleClose} label="Maybe Later" />
            </div>

            {/* Footer Note */}
            <p
              className="text-center mt-3 sm:mt-4 animate-footer"
              style={{ color: "rgba(240,232,213,0.35)", fontSize: "11px" }}
            >
              Limited slots available • Privacy maintained
            </p>
          </div>

          {/* Bottom gold accent line */}
          <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, rgba(221,185,90,0.4), transparent)", borderRadius: "0 0 10px 10px" }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes popup {
          0%   { opacity: 0; transform: scale(0.85) translateY(30px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeInUp {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          0%   { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes rotateIn {
          0%   { opacity: 0; transform: rotate(-180deg) scale(0.5); }
          100% { opacity: 1; transform: rotate(0deg) scale(1); }
        }

        .animate-popup       { animation: popup      0.5s  cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-close-btn   { animation: rotateIn   0.5s  cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s  both; }
        .animate-badge       { animation: fadeInUp   0.5s  ease-out 0.5s  both; }
        .animate-heading     { animation: fadeInUp   0.5s  ease-out 0.8s  both; }
        .animate-description { animation: fadeInUp   0.5s  ease-out 1.1s  both; }
        .animate-feature-1   { animation: fadeInLeft 0.5s  ease-out 1.4s  both; }
        .animate-feature-2   { animation: fadeInLeft 0.5s  ease-out 1.7s  both; }
        .animate-feature-3   { animation: fadeInLeft 0.5s  ease-out 2.0s  both; }
        .animate-footer      { animation: fadeInUp   0.5s  ease-out 2.3s  both; }
      `}</style>
    </>
  );
}