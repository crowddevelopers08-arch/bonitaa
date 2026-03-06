"use client";
import { Reveal } from "../component/animation";
import WalkthroughButton from "./buttoncomponent";
import GhostGoldButton from "./viewbutton";

export default function ThankYouPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');
        @keyframes glowPulse  { 0%,100%{opacity:0.35} 50%{opacity:1} }
        @keyframes checkDraw  { from{stroke-dashoffset:60} to{stroke-dashoffset:0} }
        @keyframes ringPulse  { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.55);opacity:0} }
        @keyframes shimmer    { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        .glow-dot   { animation: glowPulse 2s ease-in-out infinite; }
        .check-path { stroke-dasharray:60; stroke-dashoffset:60; animation: checkDraw 0.7s 0.4s ease forwards; }
        .ring-pulse { position:absolute;inset:0;border-radius:50%;border:2px solid rgba(221,185,90,0.5);animation:ringPulse 1.6s ease-out infinite; }
        .btn-gold   { position:relative;overflow:hidden;cursor:pointer;border:none;padding:13px 32px;border-radius:12px;background:linear-gradient(135deg,#c9a44a,#ddb95a,#e8cc7a);font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;color:#080b12;letter-spacing:0.04em;transition:all 0.3s ease; }
        .btn-gold:hover { transform:translateY(-2px); }
        .btn-gold::after { content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);transform:translateX(-100%); }
        .btn-gold:hover::after { animation:shimmer 0.6s ease forwards; }
        .btn-ghost   { padding:13px 32px;border-radius:12px;cursor:pointer;background:transparent;border:1.5px solid rgba(221,185,90,0.35);font-family:'Outfit',sans-serif;font-weight:600;font-size:14px;color:#ddb95a;transition:all 0.3s ease; }
        .btn-ghost:hover { background:rgba(221,185,90,0.08); border-color:#ddb95a; transform:translateY(-2px); }
      `}</style>

      <main className="relative w-full flex items-center justify-center overflow-hidden"
        style={{fontFamily:"'Outfit',sans-serif" }}>

        {/* Ambient orbs */}
        <div className="absolute pointer-events-none" style={{ width:"clamp(320px,40vw,560px)",height:"clamp(320px,40vw,560px)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"radial-gradient(circle,rgba(221,185,90,0.1) 0%,transparent 65%)",filter:"blur(80px)",borderRadius:"50%" }}/>
        <div className="absolute pointer-events-none" style={{ width:"clamp(180px,22vw,300px)",height:"clamp(180px,22vw,300px)",top:"10%",right:"8%",background:"radial-gradient(circle,rgba(221,185,90,0.07) 0%,transparent 70%)",filter:"blur(60px)",borderRadius:"50%" }}/>
        <div className="absolute pointer-events-none" style={{ width:"clamp(150px,18vw,260px)",height:"clamp(150px,18vw,260px)",bottom:"10%",left:"6%",background:"radial-gradient(circle,rgba(221,185,90,0.07) 0%,transparent 70%)",filter:"blur(55px)",borderRadius:"50%" }}/>

        {/* Top gold bar */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>

        <div className="relative z-10 flex flex-col items-center text-center px-4 max-sm:py-6 py-8 max-w-lg mx-auto">

          {/* Animated check circle */}
          <Reveal dir="down" delay={0.0}>
            <div className="relative flex items-center justify-center mb-8" style={{ width:88, height:88 }}>
              <div className="ring-pulse"/>
              <div className="ring-pulse" style={{ animationDelay:"0.5s" }}/>
              <div className="w-full h-full rounded-full flex items-center justify-center"
                style={{ background:"rgba(221,185,90,0.1)", border:"2px solid rgba(221,185,90,0.4)" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path className="check-path" d="M5 12l5 5L19 7" stroke="#ddb95a" strokeWidth="2.5"/>
                </svg>
              </div>
            </div>
          </Reveal>

          {/* Eyebrow */}
          <Reveal dir="fade" delay={0.15} className="mb-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{ border:"1px solid rgba(221,185,90,0.28)", background:"rgba(221,185,90,0.06)" }}>
              <div className="w-2 h-2 rounded-full glow-dot" style={{ background:"#ddb95a" }}/>
              <span className="text-xs font-semibold tracking-widest" style={{ color:"#ddb95a" }}>BOOKING CONFIRMED</span>
            </div>
          </Reveal>

          {/* Heading */}
          <Reveal dir="up" delay={0.22} className="mb-4">
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,5vw,3.2rem)", fontWeight:800, color:"rgba(240,232,213,0.95)", lineHeight:1.15 }}>
              Thank <span style={{ color:"#ddb95a", fontStyle:"italic" }}>You!</span>
            </h1>
          </Reveal>

          {/* Subtext */}
          <Reveal dir="up" delay={0.3} className="mb-8">
            <p style={{ color:"rgba(240,232,213,0.5)", fontSize:"clamp(13px,1.4vw,15px)", lineHeight:1.85, maxWidth:380 }}>
              Your appointment request has been received. Our team will reach out to you shortly to confirm your consultation.
            </p>
          </Reveal>

          {/* Divider */}
          <Reveal dir="fade" delay={0.36} className="flex items-center gap-3 mb-8 w-full max-w-xs">
            <div className="flex-1 h-px" style={{ background:"linear-gradient(to right,transparent,rgba(221,185,90,0.3))" }}/>
            <div className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background:"rgba(221,185,90,0.5)" }}/>
            <div className="flex-1 h-px" style={{ background:"linear-gradient(to left,transparent,rgba(221,185,90,0.3))" }}/>
          </Reveal>

          {/* Info card */}
          <Reveal dir="up" delay={0.4} className="w-full mb-8">
            <div className="flex items-start gap-3 px-5 py-4 rounded-2xl text-left"
              style={{ background:"rgba(221,185,90,0.06)", border:"1.5px solid rgba(221,185,90,0.18)" }}>
              <div className="flex-shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ddb95a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <p style={{ color:"rgba(240,232,213,0.45)", fontSize:"clamp(11.5px,1.2vw,13px)", lineHeight:1.8 }}>
                Please keep your phone reachable. A Bonitaa specialist will call you within <span style={{ color:"rgba(221,185,90,0.8)", fontWeight:600 }}>24 hours</span> to schedule your visit.
              </p>
            </div>
          </Reveal>

          {/* CTAs */}
          <Reveal dir="up" delay={0.48} className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <a href="/" className=" flex items-center justify-center gap-2 no-underline">
                <WalkthroughButton
                      label=" Back to Home"
                      href=""
                  />
             
            </a>
            <a href="/" className="flex items-center justify-center gap-2">
              
<GhostGoldButton label="Explore Treatments" />

            </a>
          </Reveal>

        </div>
      </main>
    </>
  );
}