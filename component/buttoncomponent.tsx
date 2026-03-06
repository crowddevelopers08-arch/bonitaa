'use client'

import React, { useState } from "react";

interface WalkthroughButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
}

const WalkthroughButton = ({ label = "Work With Us →", href = "#form", onClick }: WalkthroughButtonProps) => {
  const [btnHover, setBtnHover] = useState(false);

  const button = (
    <button
      onMouseEnter={() => setBtnHover(true)}
      onMouseLeave={() => setBtnHover(false)}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(8px, 2vw, 12px)",
        padding: "clamp(12px, 3vw, 15px) clamp(24px, 5vw, 36px)",
        background: btnHover ? "#080b12" : "#ddb95a",
        color: btnHover ? "#ddb95a" : "#080b12",
        fontWeight: 800,
        fontSize: "clamp(11px, 2.5vw, 13px)",
        letterSpacing: "0.09em",
        textTransform: "uppercase",
        border: "2px solid #ddb95a",
        cursor: "pointer",
        fontFamily: "inherit",
        clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
        transition: "all 0.22s ease",
        whiteSpace: "nowrap",
        transform: btnHover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: btnHover
          ? "0 8px 28px rgba(221,185,90,0.45)"
          : "0 4px 16px rgba(221,185,90,0.15)",
        width: "fit-content",
        maxWidth: "100%",
      }}
    >
      {label}
      <svg
        width="clamp(12px, 2.5vw, 15px)"
        height="clamp(12px, 2.5vw, 15px)"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        style={{
          flexShrink: 0,
        }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );

  if (href) {
    return (
      <a 
        href={href} 
        style={{ 
          textDecoration: "none",
          display: "inline-block",
          maxWidth: "100%",
        }}
      >
        {button}
      </a>
    );
  }

  return button;
};

export default WalkthroughButton;