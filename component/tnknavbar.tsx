"use client";
import React from "react";
import WalkthroughButton from "./buttoncomponent";

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
      {/* Main Container */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#080b12",
            height: "64px",
            flexShrink: 0,
          }}
        >
          <img
            src="/logo.png"
            alt="Fastest Health Tech Logo"
            style={{
              height: "clamp(48px, 8vw, 72px)",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* CTA Button */}
        <div style={{ flexShrink: 0 }}>
          <WalkthroughButton label="Call Now" href="tel:+919363707090" />
        </div>

      </div>

      {/* Bottom Accent Line */}
      <div
        style={{
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, #ddb95a 50%, transparent 100%)",
        }}
      />
    </nav>
  );
};

export default Navbared;