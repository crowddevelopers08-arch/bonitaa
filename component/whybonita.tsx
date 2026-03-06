"use client";
import { Reveal, CountUp } from "../component/animation";
import WalkthroughButton from "./buttoncomponent";
import GhostGoldButton from "./viewbutton";

export default function AgencySection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Barlow+Condensed:wght@700;800;900&family=Outfit:wght@300;400;500;600&display=swap');

        @keyframes pulseDot  { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:0.7} }
        @keyframes shimmer   { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }

        .rotate-bg-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          letter-spacing: 0.2em;
          font-weight: 900;
          font-size: clamp(40px,6vw,80px);
          color: rgba(221,185,90,0.05);
          user-select: none;
          pointer-events: none;
          font-family: 'Barlow Condensed', sans-serif;
        }

        .img-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          overflow: hidden;
        }
        .img-card:hover {
          transform: scale(1.02) translateY(-6px);
          box-shadow: 0 30px 70px rgba(0,0,0,0.75), 3px 0 0 0 #ddb95a !important;
        }

        .glow-dot  { animation: glowPulse 2s ease-in-out infinite; }
        .pulse-dot { animation: pulseDot 2s ease-in-out infinite; }

        .btn-primary {
          position:relative; overflow:hidden; cursor:pointer; border:none;
          padding:14px 32px; border-radius:12px;
          background:linear-gradient(135deg,#c9a44a,#ddb95a,#e8cc7a);
          font-family:'Outfit',sans-serif; font-weight:700; font-size:14px;
          color:#080b12; letter-spacing:0.05em;
          box-shadow:0 6px 28px rgba(221,185,90,0.35);
          transition:all 0.3s ease;
        }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 42px rgba(221,185,90,0.5); }
        .btn-primary::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);
          transform:translateX(-100%);
        }
        .btn-primary:hover::after { animation:shimmer 0.6s ease forwards; }

        .btn-outline {
          padding:14px 32px; border-radius:12px; cursor:pointer;
          background:transparent; border:1.5px solid rgba(221,185,90,0.35);
          font-family:'Outfit',sans-serif; font-weight:600; font-size:14px;
          color:#ddb95a; letter-spacing:0.03em; transition:all 0.3s ease;
        }
        .btn-outline:hover {
          background:rgba(221,185,90,0.08); border-color:#ddb95a; transform:translateY(-2px);
        }
      `}</style>

      <section id="services"
        className="relative w-full overflow-hidden"
        style={{ background: "#080b12", fontFamily: "'Outfit',sans-serif" }}
      >
        {/* Ambient orbs */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            width: "clamp(300px,38vw,480px)",
            height: "clamp(300px,38vw,480px)",
            top: "-10%",
            right: "-6%",
            background:
              "radial-gradient(circle,rgba(221,185,90,0.1) 0%,transparent 70%)",
            filter: "blur(80px)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute pointer-events-none z-0"
          style={{
            width: "clamp(200px,26vw,340px)",
            height: "clamp(200px,26vw,340px)",
            bottom: "-8%",
            left: "3%",
            background:
              "radial-gradient(circle,rgba(221,185,90,0.07) 0%,transparent 70%)",
            filter: "blur(65px)",
            borderRadius: "50%",
          }}
        />

        {/* Top bar */}
        <div
          className="w-full h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,#ddb95a,transparent)",
          }}
        />

        <div
          className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row"
          style={{ minHeight: "clamp(500px,88vh,820px)" }}
        >
          {/* ══════════════ LEFT (Desktop only) ══════════════ */}
          <div
            className="relative hidden lg:flex flex-shrink-0"
            style={{ width: "clamp(280px,44vw,600px)" }}
          >
            {/* Vertical BG text */}
            <div
              className="hidden lg:flex items-center justify-center select-none"
              style={{ width: 52 }}
            >
              <span className="rotate-bg-text">BONITAA</span>
            </div>

            {/* Image stack */}
            <div
              className="relative flex-1 px-4 lg:px-5 py-8 lg:py-10"
              style={{ height: "clamp(440px,88vh,800px)" }}
            >
              {/* ── Experience badge — TOP ── */}
              <Reveal dir="down" delay={0.0}>
                <div
                  className="absolute z-20"
                  style={{
                    top: "clamp(20px,3vh,36px)",
                    left: "clamp(52px,5.5vw,72px)",
                  }}
                >
                  <p
                    style={{
                      color: "rgba(221,185,90,0.6)",
                      fontSize: "clamp(11px,1.1vw,13px)",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Experience
                  </p>
                  <div className="flex items-baseline leading-none">
                    <CountUp
                      to={18}
                      suffix="+"
                      duration={1600}
                      style={{
                        color: "#ddb95a",
                        fontSize: "clamp(28px,4.2vw,50px)",
                        fontWeight: 900,
                        fontFamily: "'Barlow Condensed',sans-serif",
                        lineHeight: 1,
                      }}
                    />
                    <span
                      style={{
                        color: "#f0e8d5",
                        fontSize: "clamp(28px,4.2vw,50px)",
                        fontWeight: 900,
                        fontFamily: "'Barlow Condensed',sans-serif",
                        lineHeight: 1,
                        marginLeft: 5,
                      }}
                    >
                      Years
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* Image row — pushed DOWN so badge shows clearly above */}
              <div
                className="absolute inset-x-4 lg:inset-x-5 flex items-end gap-3"
                style={{
                  top: "clamp(100px,14vh,130px)",
                  bottom: "clamp(24px,4vh,40px)",
                }}
              >
                {/* Left image — shorter */}
                <Reveal
                  dir="left"
                  delay={0.18}
                  style={{
                    flex: "0 0 46%",
                    height: "70%",
                    alignSelf: "flex-end",
                  }}
                >
                  <div
                    className="img-card rounded-xl w-full h-full"
                    style={{
                      boxShadow: "0 20px 55px rgba(0,0,0,0.65)",
                      border: "1.5px solid rgba(221,185,90,0.2)",
                    }}
                  >
                    <img
                      src="/hairs.jpg"
                      alt="Bonitaa specialist"
                      className="w-full h-full object-cover block"
                      style={{
                        filter:
                          "brightness(0.85) contrast(1.06) saturate(0.92)",
                      }}
                    />
                  </div>
                </Reveal>

                {/* Right image — taller */}
                <Reveal
                  dir="up"
                  delay={0.26}
                  style={{
                    flex: "0 0 50%",
                    height: "100%",
                    alignSelf: "flex-end",
                  }}
                >
                  <div
                    className="img-card rounded-xl w-full h-full relative"
                    style={{
                      boxShadow: "0 20px 55px rgba(0,0,0,0.65)",
                      border: "1.5px solid rgba(221,185,90,0.2)",
                    }}
                  >
                    <img
                      src="/woman-stru.jpg"
                      alt="Bonitaa team"
                      className="w-full h-full object-cover block"
                      style={{
                        filter:
                          "brightness(0.82) contrast(1.06) saturate(0.92)",
                      }}
                    />
                    {/* Gold edge accent */}
                    <div
                      className="absolute inset-y-0 left-0 w-0.5 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to bottom,transparent,#ddb95a,transparent)",
                        opacity: 0.55,
                      }}
                    />
                    {/* Bottom overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top,rgba(8,11,18,0.45) 0%,transparent 50%)",
                      }}
                    />
                  </div>
                </Reveal>
              </div>

              {/* Bottom fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                style={{
                  background: "linear-gradient(to top,#080b12,transparent)",
                }}
              />

              {/* Corner brackets on image area */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "clamp(96px,13.5vh,126px)",
                  left: "clamp(12px,1.5vw,16px)",
                  zIndex: 11,
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 2,
                    background: "#ddb95a",
                    borderRadius: 2,
                  }}
                />
                <div
                  style={{
                    width: 2,
                    height: 18,
                    background: "#ddb95a",
                    borderRadius: 2,
                  }}
                />
              </div>
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "clamp(96px,13.5vh,126px)",
                  right: "clamp(10px,1.2vw,14px)",
                  zIndex: 11,
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 2,
                    background: "#ddb95a",
                    borderRadius: 2,
                    marginLeft: "auto",
                  }}
                />
                <div
                  style={{
                    width: 2,
                    height: 18,
                    background: "#ddb95a",
                    borderRadius: 2,
                    marginLeft: "auto",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ══════════════ RIGHT CONTENT (with mobile title and paragraph) ══════════════ */}
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-14 lg:py-0">
            {/* Eyebrow */}
            <Reveal dir="down" delay={0.05} className="mb-5 max-sm:mb-2">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
                style={{
                  border: "1px solid rgba(221,185,90,0.3)",
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
                  COIMBATORE'S #1 HAIR CLINIC
                </span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal dir="right" delay={0.12} className="mb-3">
              <h1
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(1.8rem,3.5vw,3.2rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: "rgba(240,232,213,0.92)",
                }}
              >
                Why Bonitaa{" "}
                <span style={{ color: "#ddb95a", fontStyle: "italic" }}>
                  Hair Care?
                </span>
              </h1>
            </Reveal>

            {/* Mobile Image Section (visible only on mobile) */}
            <div className="lg:hidden w-full my-8">
              <div className="relative w-full" style={{ height: "280px" }}>
                {/* Experience badge for mobile - repositioned */}
                <div
                  className="absolute z-20"
                  style={{ top: "10px", left: "10px" }}
                >
                  <p
                    style={{
                      color: "rgba(221,185,90,0.6)",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Experience
                  </p>
                  <div className="flex items-baseline leading-none">
                    <span
                      style={{
                        color: "#ddb95a",
                        fontSize: "32px",
                        fontWeight: 900,
                        fontFamily: "'Barlow Condensed',sans-serif",
                        lineHeight: 1,
                      }}
                    >
                      18+
                    </span>
                    <span
                      style={{
                        color: "#f0e8d5",
                        fontSize: "32px",
                        fontWeight: 900,
                        fontFamily: "'Barlow Condensed',sans-serif",
                        lineHeight: 1,
                        marginLeft: 5,
                      }}
                    >
                      Years
                    </span>
                  </div>
                </div>

                {/* Mobile image grid */}
                <div className="absolute inset-0 flex items-end gap-2 px-2">
                  {/* Left image - shorter */}
                  <div style={{ flex: "0 0 46%", height: "65%" }}>
                    <div
                      className="img-card rounded-xl w-full h-full"
                      style={{
                        boxShadow: "0 20px 55px rgba(0,0,0,0.65)",
                        border: "1.5px solid rgba(221,185,90,0.2)",
                      }}
                    >
                      <img
                        src="/hairs.jpg"
                        alt="Bonitaa specialist"
                        className="w-full h-full object-cover block"
                        style={{
                          filter:
                            "brightness(0.85) contrast(1.06) saturate(0.92)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Right image - taller */}
                  <div style={{ flex: "0 0 50%", height: "85%" }}>
                    <div
                      className="img-card rounded-xl w-full h-full relative"
                      style={{
                        boxShadow: "0 20px 55px rgba(0,0,0,0.65)",
                        border: "1.5px solid rgba(221,185,90,0.2)",
                      }}
                    >
                      <img
                        src="/woman-stru.jpg"
                        alt="Bonitaa team"
                        className="w-full h-full object-cover block"
                        style={{
                          filter:
                            "brightness(0.82) contrast(1.06) saturate(0.92)",
                        }}
                      />
                      <div
                        className="absolute inset-y-0 left-0 w-0.5 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to bottom,transparent,#ddb95a,transparent)",
                          opacity: 0.55,
                        }}
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to top,rgba(8,11,18,0.45) 0%,transparent 50%)",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom fade for mobile */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top,#080b12,transparent)",
                  }}
                />

                {/* Corner brackets for mobile */}
                <div
                  className="absolute pointer-events-none"
                  style={{ top: "65px", left: "8px", zIndex: 11 }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 2,
                      background: "#ddb95a",
                      borderRadius: 2,
                    }}
                  />
                  <div
                    style={{
                      width: 2,
                      height: 14,
                      background: "#ddb95a",
                      borderRadius: 2,
                    }}
                  />
                </div>
                <div
                  className="absolute pointer-events-none"
                  style={{ top: "30px", right: "8px", zIndex: 11 }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 2,
                      background: "#ddb95a",
                      borderRadius: 2,
                      marginLeft: "auto",
                    }}
                  />
                  <div
                    style={{
                      width: 2,
                      height: 14,
                      background: "#ddb95a",
                      borderRadius: 2,
                      marginLeft: "auto",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <Reveal dir="up" delay={0.2} className="mb-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-10" style={{ background: "#ddb95a" }} />
                <div
                  className="w-1.5 h-1.5 rotate-45"
                  style={{ background: "#ddb95a" }}
                />
                <span
                  className="text-xs tracking-widest"
                  style={{ color: "rgba(221,185,90,0.4)" }}
                >
                  TRUSTED EXPERTS
                </span>
                <div
                  className="w-1.5 h-1.5 rotate-45"
                  style={{ background: "#ddb95a" }}
                />
                <div className="h-px w-10" style={{ background: "#ddb95a" }} />
              </div>
            </Reveal>

            {/* Gold dot */}
            <Reveal dir="fade" delay={0.26} className="mb-5 ">
              <div
                className="w-3 h-3 rounded-full pulse-dot"
                style={{ background: "#ddb95a" }}
              />
            </Reveal>

            {/* Description */}
            <Reveal dir="up" delay={0.32} className="mb-10">
              <p
                style={{
                  color: "rgba(240,232,213,0.55)",
                  fontSize: "clamp(13px,1.4vw,15px)",
                  lineHeight: 1.95,
                  maxWidth: 480,
                }}
              >
                We're dedicated to transforming lives and are at the forefront
                of hair restoration. Instead of settling for simple fixes,
                expect real changes. Not only do we treat hair loss, but we also
                work to boost your{" "}
                <span style={{ color: "#ddb95a", fontWeight: 600 }}>
                  self-esteem
                </span>{" "}
                and give you the{" "}
                <span style={{ color: "#ddb95a", fontWeight: 600 }}>
                  hair of your dreams.
                </span>
              </p>
            </Reveal>

            {/* Buttons */}
            <Reveal dir="up" delay={0.44}>
              <div className="flex flex-col sm:flex-row gap-3">
                <WalkthroughButton
                      label="Book An Appointment"
                      onClick={() => {
                        document.getElementById("Form")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      href=""
                  />
                <GhostGoldButton
                      label="View Our Results"
                      href=""
                  />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom bar */}
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
