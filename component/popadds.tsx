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

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Popup Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none max-sm:mt-30 mt-25">
        <div
          className="relative shadow-2xl max-w-md w-full pointer-events-auto transform transition-all duration-300 animate-popup"
          style={{ background: "#080b12", borderRadius: "10px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute -top-4 -right-4 w-10 h-10 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-10 animate-close-btn"
            style={{
              background: "linear-gradient(135deg, #c9a44a, #ddb95a, #e8cc7a)",
              borderRadius: "6px",
            }}
            aria-label="Close popup"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Decorative Background */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-15 blur-3xl" style={{ background: "#ddb95a" }}></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full opacity-10 blur-3xl" style={{ background: "#ddb95a" }}></div>

          {/* Gold Border */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ border: "1.5px solid rgba(221, 185, 90, 0.3)", borderRadius: "10px" }}
          ></div>

          {/* Content */}
          <div className="relative p-8">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 animate-badge"
              style={{
                border: "1px solid rgba(221, 185, 90, 0.3)",
                background: "rgba(221, 185, 90, 0.08)",
                borderRadius: "6px",
              }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#ddb95a" }}></div>
              <span className="uppercase text-xs font-semibold tracking-wider" style={{ color: "#ddb95a" }}>Special Offer</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold mb-3 leading-tight animate-heading" style={{ color: "rgba(240, 232, 213, 0.95)" }}>
              Get Your <span style={{ color: "#ddb95a" }}>Free IVF</span> Consultation Today!
            </h2>

            {/* Description */}
            <p className="text-base mb-6 leading-relaxed animate-description" style={{ color: "rgba(240, 232, 213, 0.6)" }}>
              Start your journey to parenthood with expert guidance. Book a free consultation and get a personalized treatment plan.
            </p>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {[
                "Free Treatment Planning Visit",
                "Transparent Cost Breakdown",
                "10,000+ Happy Families",
              ].map((text, i) => (
                <div key={i} className={`flex items-center gap-3 animate-feature-${i + 1}`}>
                  <div
                    className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                    style={{ background: "#ddb95a", borderRadius: "4px" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#080b12" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span className="font-medium" style={{ color: "rgba(240, 232, 213, 0.85)" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 cursor-pointer">
              <WalkthroughButton label="Book Now" href="#Form" />
              <GhostGoldButton onClick={handleClose} label="Maybe Later" />
            </div>

            {/* Footer Note */}
            <p className="text-xs text-center mt-4 animate-footer" style={{ color: "rgba(240, 232, 213, 0.35)" }}>
              Limited slots available • Privacy maintained
            </p>
          </div>
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
        @keyframes scaleIn {
          0%   { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes rotateIn {
          0%   { opacity: 0; transform: rotate(-180deg) scale(0.5); }
          100% { opacity: 1; transform: rotate(0deg) scale(1); }
        }

        .animate-popup      { animation: popup 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-badge      { animation: fadeInUp 0.6s ease-out 0.3s both; }
        .animate-heading    { animation: fadeInUp 0.6s ease-out 0.45s both; }
        .animate-description{ animation: fadeInUp 0.6s ease-out 0.6s both; }
        .animate-feature-1  { animation: fadeInLeft 0.5s ease-out 0.75s both; }
        .animate-feature-2  { animation: fadeInLeft 0.5s ease-out 0.9s both; }
        .animate-feature-3  { animation: fadeInLeft 0.5s ease-out 1.05s both; }
        .animate-footer     { animation: fadeInUp 0.5s ease-out 1.5s both; }
        .animate-close-btn  { animation: rotateIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both; }
      `}</style>
    </>
  );
}