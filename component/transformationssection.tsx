"use client";
import { useState, useEffect, useRef } from "react";
import { Reveal } from "../component/animation";
import WalkthroughButton from "./buttoncomponent";

interface Transformation {
  id: number;
  treatment: string;
  sessions: string;
  result: string;
  tag: string;
  featured: boolean;
  image: string;
}

const transformations: Transformation[] = [
  {
    id: 1,
    treatment: "GFC Therapy",
    sessions: "5 Sessions",
    result: "Dense Hair Regrowth",
    tag: "GFC",
    featured: true,
    image: "/before.webp",
  },
  {
    id: 2,
    treatment: "Hair Transplant",
    sessions: "Single Procedure",
    result: "Natural Hairline Restored",
    tag: "FUE",
      featured: false,
    image: "/before1.webp",
  },
  {
    id: 3,
    treatment: "PRP Treatment",
    sessions: "3 Sessions",
    result: "Visible Thickness Gain",
    tag: "PRP",
    featured: true,
    image: "/before2.webp",
  },
  {
    id: 4,
    treatment: "Laser Therapy",
    sessions: "6 Sessions",
    result: "Scalp Revitalized",
    tag: "Laser",
        featured: false,
    image: "/before3.webp",
  },
  {
    id: 5,
    treatment: "Mesotherapy",
    sessions: "4 Sessions",
    result: "Reduced Hair Fall by 80%",
    tag: "Meso",
      featured: true,
    image: "/before4.webp",
  },
  {
    id: 6,
    treatment: "QR678 Treatment",
    sessions: "6 Sessions",
    result: "Stronger Root Retention",
    tag: "QR678",
    featured: true,
    image: "/before5.webp",
  },
];

const VISIBLE_DESKTOP = 3;
const VISIBLE_MOBILE = 1;
const AUTO_DELAY = 4000;

export default function TransformationsSection() {
  const [current, setCurrent] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Fixed: Added null as initial value

  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const visible = isMobile ? VISIBLE_MOBILE : VISIBLE_DESKTOP;
  const total = transformations.length;
  const maxIndex = total - visible;

  const goTo = (idx: number): void => {
    if (animating) return;
    setAnimating(true);
    setCurrent(Math.max(0, Math.min(idx, maxIndex)));
    setTimeout(() => setAnimating(false), 420);
  };

  const prev = (): void => {
    if (current === 0) {
      goTo(maxIndex);
    } else {
      goTo(current - 1);
    }
  };

  const next = (): void => {
    if (current === maxIndex) {
      goTo(0);
    } else {
      goTo(current + 1);
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(next, AUTO_DELAY);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [current, isMobile]); // Removed 'next' from dependencies to prevent infinite loop

  const resetTimer = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(next, AUTO_DELAY);
  };

  // Calculate transform value based on screen size
  const getTransformValue = (): string => {
    const gapValue = isMobile ? 16 : 20;
    return `translateX(calc(-${current} * (100% / ${visible} + ${gapValue}px / ${visible})))`;
  };

  // Calculate card width based on screen size
  const getCardWidth = (): string => {
    if (isMobile) return "100%";
    return `calc(${100 / VISIBLE_DESKTOP}% - ${((VISIBLE_DESKTOP - 1) * 20) / VISIBLE_DESKTOP}px)`;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');
        @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes shimmer   { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        .glow-dot  { animation: glowPulse 2s ease-in-out infinite; }
        .t-card    { transition: transform 0.28s ease, box-shadow 0.28s ease; }
        .t-card:hover { transform: translateY(-5px); box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 32px rgba(221,185,90,0.1) !important; }
        .t-card:hover .t-card-img { transform: scale(1.04); }
        .t-card-img { transition: transform 0.5s ease; }
        .track { transition: transform 0.42s cubic-bezier(0.4,0,0.2,1); }
        .dot { transition: all 0.3s ease; cursor: pointer; }
        .dot.active { background: #ddb95a !important; width: 22px !important; border-radius: 4px !important; }
        .arr-btn {
          width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center;
          background:rgba(221,185,90,0.08); border:1.5px solid rgba(221,185,90,0.25);
          cursor:pointer; transition:all 0.25s ease; flex-shrink:0;
        }
        .arr-btn:hover { background:rgba(221,185,90,0.2); border-color:#ddb95a; transform:scale(1.08); }
        .btn-gold {
          position:relative; overflow:hidden; cursor:pointer; border:none;
          padding:13px 32px; border-radius:12px;
          background:linear-gradient(135deg,#c9a44a,#ddb95a,#e8cc7a);
          font-family:'Outfit',sans-serif; font-weight:700; font-size:14px;
          color:#080b12; letter-spacing:0.04em; transition:all 0.3s ease;
        }
        .btn-gold:hover { transform:translateY(-2px); }
        .btn-gold::after { content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);transform:translateX(-100%); }
        .btn-gold:hover::after { animation:shimmer 0.6s ease forwards; }

        @media (max-width: 767px) {
          .track {
            gap: 16px !important;
          }
          .t-card {
            width: calc(100% - 0px) !important;
          }
        }
      `}</style>

      <section
        className="relative w-full overflow-hidden"
        style={{ background: "#080b12", fontFamily: "'Outfit',sans-serif" }}
      >
        {/* Orbs */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            width: "clamp(300px,38vw,520px)",
            height: "clamp(300px,38vw,520px)",
            top: "-10%",
            left: "-5%",
            background:
              "radial-gradient(circle,rgba(221,185,90,0.09) 0%,transparent 70%)",
            filter: "blur(90px)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute pointer-events-none z-0"
          style={{
            width: "clamp(220px,28vw,380px)",
            height: "clamp(220px,28vw,380px)",
            bottom: "-8%",
            right: "-3%",
            background:
              "radial-gradient(circle,rgba(221,185,90,0.08) 0%,transparent 70%)",
            filter: "blur(70px)",
            borderRadius: "50%",
          }}
        />

        <div
          className="w-full h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,#ddb95a,transparent)",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-5 sm:py-10">
          {/* Header */}
          <div className="text-center mb-8 md:mb-14">
            <Reveal dir="down" delay={0.0} className="mb-4">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
                style={{
                  border: "1px solid rgba(221,185,90,0.28)",
                  background: "rgba(221,185,90,0.06)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full glow-dot"
                  style={{ background: "#ddb95a" }}
                />
                <span
                  className="text-xs font-semibold tracking-widest"
                  style={{ color: "#ddb95a" }}
                >
                  REAL RESULTS
                </span>
              </div>
            </Reveal>
            <Reveal dir="up" delay={0.1}>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(1.5rem,5vw,3rem)",
                  fontWeight: 700,
                  color: "rgba(240,232,213,0.92)",
                  lineHeight: 1.2,
                }}
              >
                Discover Our{" "}
                <span style={{ color: "#ddb95a", fontStyle: "italic" }}>
                  Remarkable
                </span>{" "}
                Hair Transformations
              </h2>
            </Reveal>
            <Reveal dir="up" delay={0.16} className="mt-3">
              <p
                style={{
                  color: "rgba(240,232,213,0.4)",
                  fontSize: "clamp(12px,3.5vw,14px)",
                  lineHeight: 1.8,
                  maxWidth: 480,
                  margin: "0 auto",
                }}
              >
                Real patients, real results — verified transformations from our
                clinics across Tamil Nadu.
              </p>
            </Reveal>
            <Reveal
              dir="fade"
              delay={0.2}
              className="mt-5 flex items-center justify-center gap-3"
            >
              <div
                className="h-px w-14"
                style={{
                  background: "linear-gradient(to right,transparent,#ddb95a)",
                }}
              />
              <div
                className="w-1.5 h-1.5 rotate-45 flex-shrink-0"
                style={{ background: "#ddb95a" }}
              />
              <div
                className="h-px w-14"
                style={{
                  background: "linear-gradient(to left,transparent,#ddb95a)",
                }}
              />
            </Reveal>
          </div>

          {/* Carousel */}
          <Reveal dir="up" delay={0.25}>
            <div className="overflow-hidden">
              <div
                className="track flex"
                style={{
                  gap: isMobile ? "16px" : "20px",
                  transform: getTransformValue(),
                }}
              >
                {transformations.map((t: Transformation) => (
                  <div
                    key={t.id}
                    className="t-card rounded-2xl flex-shrink-0 overflow-hidden"
                    style={{
                      width: getCardWidth(),
                      background: "rgba(221,185,90,0.04)",
                      border: t.featured
                        ? "1.5px solid rgba(221,185,90,0.35)"
                        : "1.5px solid rgba(221,185,90,0.12)",
                      boxShadow: t.featured
                        ? "0 8px 32px rgba(221,185,90,0.1)"
                        : "0 4px 20px rgba(0,0,0,0.25)",
                    }}
                  >
                    {/* Single Image - Full Width */}
                    <div
                      className="relative"
                      style={{
                        height: isMobile
                          ? "clamp(280px,65vw,350px)"
                          : "clamp(260px,28vw,320px)",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={t.image}
                        alt={t.treatment}
                        className="t-card-img w-full h-full object-cover"
                        style={{
                          filter:
                            "brightness(0.84) contrast(1.08) saturate(0.9)",
                        }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top,rgba(8,11,18,0.65) 0%,transparent 50%)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Controls - visible on all screens */}
          <div className="mt-6 md:mt-8 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i: number) => (
                <button
                  key={i}
                  className={`dot h-2 rounded-full ${i === current ? "active" : ""}`}
                  style={{
                    width:
                      i === current ? (isMobile ? 28 : 22) : isMobile ? 10 : 8,
                    background:
                      i === current ? "#ddb95a" : "rgba(221,185,90,0.25)",
                    border: "none",
                  }}
                  onClick={() => {
                    goTo(i);
                    resetTimer();
                  }}
                  aria-label={`Go to ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3">
              <button
                className="arr-btn"
                onClick={prev}
                aria-label="Previous"
                style={{ opacity: current === 0 && !isMobile ? 0.3 : 1 }}
              >
                <svg
                  width={isMobile ? "20" : "16"}
                  height={isMobile ? "20" : "16"}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(221,185,90,0.85)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15,18 9,12 15,6" />
                </svg>
              </button>
              <button className="arr-btn" onClick={next} aria-label="Next">
                <svg
                  width={isMobile ? "20" : "16"}
                  height={isMobile ? "20" : "16"}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(221,185,90,0.85)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </button>
            </div>
          </div>

          {/* CTA */}
          <Reveal
            dir="up"
            delay={0.4}
            className="mt-8 md:mt-12 flex justify-center"
          >
                <WalkthroughButton
                      label="Book An Appointment"
                      onClick={() => {
                        document.getElementById("Form")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      href=""
                  />
          </Reveal>
        </div>

        <div
          className="w-full h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,#ddb95a,transparent)",
          }}
        />
      </section>
    </>
  );
}
