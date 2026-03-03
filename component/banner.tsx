"use client";
import { useEffect, useRef } from "react";
import { CountUp, Reveal, Stagger } from "./animation";
// import { Reveal, CountUp, Stagger } from "./animations";

const features = [
  "Natural Hairline Design",
  "Proven & Certified Solutions",
  "Google Rating 4.8 / 5",
];

const statsConfig = [
  { to:15,  suffix:"+",  label:"Years of Experience", dir:"up"    },
  { to:6,   suffix:"+",  label:"Branches",            dir:"left"  },
  { to:5,   suffix:"K+", label:"Happy Customers",     dir:"down"  },
  { to:4.8, suffix:"",   label:"Google Rating",       dir:"right", decimals:1 },
] as const;

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14l-4-4 1.41-1.41L11 13.17l6.59-6.59L19 8l-8 8z" fill="#ddb95a"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8"  y1="2" x2="8"  y2="6"/>
    <line x1="3"  y1="10" x2="21" y2="10"/>
  </svg>
);

export default function HeroBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W: number, H: number, raf: number;
    const pts: any[] = [];
    function resize() { W = canvas!.width = canvas!.offsetWidth; H = canvas!.height = canvas!.offsetHeight; }
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 90; i++) pts.push({
      x:Math.random()*1600, y:Math.random()*800,
      r:Math.random()*1.4+0.2, speed:Math.random()*0.3+0.06,
      opacity:Math.random()*0.55+0.08, drift:(Math.random()-0.5)*0.2,
      tw:Math.random()*Math.PI*2, tws:Math.random()*0.015+0.003,
    });
    function loop() {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => {
        p.y-=p.speed; p.x+=p.drift; p.tw+=p.tws;
        if(p.y<-10){p.y=H+10;p.x=Math.random()*W;}
        const o=p.opacity*(0.5+0.5*Math.sin(p.tw));
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(221,185,90,${o})`; ctx.fill();
      });
      raf=requestAnimationFrame(loop);
    }
    loop();
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

        @keyframes pulseGold { 0%,100%{box-shadow:0 0 0 0 rgba(221,185,90,0.4)} 50%{box-shadow:0 0 0 14px rgba(221,185,90,0)} }
        @keyframes shimmer   { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        @keyframes scanline  { 0%{top:0%;opacity:1} 90%{top:100%;opacity:1} 100%{top:100%;opacity:0} }
        @keyframes progFill  { from{width:0%} to{width:92%} }
        @keyframes floatA    { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-7px)} }
        @keyframes floatB    { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-9px)} }
        @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }

        .btn-glow      { animation: pulseGold 2.5s ease-in-out infinite; }
        .float-a       { animation: floatA 4s ease-in-out infinite; }
        .float-b       { animation: floatB 5s ease-in-out 0.8s infinite; }
        .glow-dot      { animation: glowPulse 2s ease-in-out infinite; }
        .scan-line     { position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(221,185,90,0.75),transparent);animation:scanline 3.5s ease-in-out infinite;pointer-events:none;z-index:5; }
        .progress-bar  { animation:progFill 2s ease 1.2s forwards; width:0%; }

        .shimmer-btn::after { content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent);transform:translateX(-100%); }
        .shimmer-btn:hover::after { animation:shimmer 0.65s ease forwards; }
      `}</style>

      <section className="relative w-full overflow-hidden" style={{ background:"#080b12", fontFamily:"'Outfit',sans-serif" }}>

        {/* Particles */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0"/>

        {/* Orbs */}
        <div className="absolute pointer-events-none z-0" style={{ width:"clamp(280px,40vw,520px)",height:"clamp(280px,40vw,520px)",top:"-15%",left:"-8%",background:"radial-gradient(circle,rgba(221,185,90,0.13) 0%,transparent 70%)",filter:"blur(80px)",borderRadius:"50%" }}/>
        <div className="absolute pointer-events-none z-0" style={{ width:"clamp(200px,28vw,360px)",height:"clamp(200px,28vw,360px)",bottom:"-8%",right:"5%",background:"radial-gradient(circle,rgba(221,185,90,0.09) 0%,transparent 70%)",filter:"blur(70px)",borderRadius:"50%" }}/>

        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12 xl:gap-16">

            {/* ══ LEFT ══ */}
            <div className="flex-1 w-full text-center lg:text-left">

              {/* Eyebrow → from TOP */}
              <Reveal dir="down" delay={0.0} className="mb-5 flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ border:"1px solid rgba(221,185,90,0.35)", background:"rgba(221,185,90,0.07)" }}>
                  <div className="w-2 h-2 rounded-full glow-dot" style={{ background:"#ddb95a" }}/>
                  <span className="text-xs font-semibold tracking-widest" style={{ color:"#ddb95a" }}>COIMBATORE'S #1 HAIR CLINIC</span>
                </div>
              </Reveal>

              {/* Headline → from LEFT */}
              <Reveal dir="left" delay={0.1}>
                <h1 className="leading-tight mb-1" style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.6rem,3.5vw,3rem)", color:"rgba(240,232,213,0.9)", fontWeight:700 }}>
                  Unlock Remarkable
                </h1>
              </Reveal>
              <Reveal dir="left" delay={0.22} className="mb-5">
                <h1 className="leading-tight" style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.6rem,3.5vw,3rem)", color:"#ddb95a", fontWeight:800 }}>
                  Hair Results — Coimbatore
                </h1>
              </Reveal>

              {/* Divider → from UP */}
              <Reveal dir="up" delay={0.3} className="mb-6">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="h-px w-12" style={{ background:"#ddb95a" }}/>
                  <div className="w-1.5 h-1.5 rotate-45" style={{ background:"#ddb95a" }}/>
                  <span className="text-xs tracking-widest" style={{ color:"rgba(221,185,90,0.5)" }}>BEST HAIR CLINIC</span>
                  <div className="w-1.5 h-1.5 rotate-45" style={{ background:"#ddb95a" }}/>
                  <div className="h-px w-12" style={{ background:"#ddb95a" }}/>
                </div>
              </Reveal>

              {/* Features list → stagger from LEFT */}
              <Stagger dir="left" baseDelay={0.35} staggerDelay={0.1} className="space-y-3 mb-8 inline-flex flex-col items-start text-left">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckIcon/>
                    <span className="text-sm sm:text-base font-medium" style={{ color:"rgba(240,232,213,0.85)" }}>{f}</span>
                  </div>
                ))}
              </Stagger>

              {/* CTA buttons → from UP */}
              <Reveal dir="up" delay={0.55}>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <button
                    className="shimmer-btn btn-glow relative overflow-hidden flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl font-semibold transition-all duration-300"
                    style={{ background:"#ddb95a", color:"#080b12", fontSize:14, letterSpacing:"0.03em" }}
                    onMouseEnter={e=>(e.currentTarget.style.background="#c9a44a")}
                    onMouseLeave={e=>(e.currentTarget.style.background="#ddb95a")}
                  >
                    <CalendarIcon/> Book An Appointment
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl font-semibold transition-all duration-300"
                    style={{ background:"transparent", color:"#ddb95a", border:"1.5px solid rgba(221,185,90,0.45)", fontSize:14 }}
                    onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background="rgba(221,185,90,0.08)"; (e.currentTarget as HTMLElement).style.borderColor="#ddb95a"; }}
                    onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background="transparent"; (e.currentTarget as HTMLElement).style.borderColor="rgba(221,185,90,0.45)"; }}
                  >
                    View Our Results →
                  </button>
                </div>
              </Reveal>
            </div>

            {/* ══ RIGHT → from RIGHT ══ */}
            <Reveal dir="right" delay={0.2} style={{ flexShrink:0, position:"relative", width:"clamp(280px,90vw,430px)" }}>

              {/* Glow */}
              <div className="absolute pointer-events-none" style={{ width:"90%",height:"90%",top:"5%",left:"5%",background:"radial-gradient(circle,rgba(221,185,90,0.16) 0%,transparent 65%)",filter:"blur(45px)",borderRadius:"50%",zIndex:0 }}/>

              {/* Depth cards */}
              <div className="absolute pointer-events-none" style={{ inset:0,top:24,left:22,right:-14,bottom:-14,borderRadius:24,transform:"rotate(3deg)",background:"rgba(221,185,90,0.05)",border:"1px solid rgba(221,185,90,0.1)",zIndex:1 }}/>
              <div className="absolute pointer-events-none" style={{ inset:0,top:12,left:11,right:-7,bottom:-7,borderRadius:22,transform:"rotate(1.5deg)",background:"rgba(221,185,90,0.03)",border:"1px solid rgba(221,185,90,0.16)",zIndex:2 }}/>

              {/* Main card */}
              <div className="relative overflow-visible" style={{ borderRadius:20, border:"1.5px solid rgba(221,185,90,0.4)", background:"#0c0f1a", boxShadow:"0 40px 100px rgba(0,0,0,0.55),0 0 50px rgba(221,185,90,0.09)", zIndex:3 }}>

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2.5" style={{ background:"linear-gradient(90deg,rgba(221,185,90,0.09),rgba(221,185,90,0.03))", borderBottom:"1px solid rgba(221,185,90,0.18)" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full glow-dot" style={{ background:"#ddb95a" }}/>
                    <span className="font-bold tracking-widest" style={{ color:"rgba(221,185,90,0.75)", fontSize:10 }}>BONITAA HAIR CLINIC</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ background:"rgba(74,222,128,0.1)", border:"1px solid rgba(74,222,128,0.3)" }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background:"#4ade80", boxShadow:"0 0 5px #4ade80" }}/>
                    <span className="font-semibold" style={{ color:"#4ade80", fontSize:10 }}>Open Now</span>
                  </div>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden" style={{ height:"clamp(200px,35vw,280px)" }}>
                  <img src="/hero-image.png" alt="Hair Treatment" className="w-full h-full object-cover" style={{ filter:"brightness(0.87) contrast(1.1) saturate(0.9)" }}/>
                  <div className="scan-line"/>
                  <div className="absolute inset-0 pointer-events-none" style={{ background:"linear-gradient(to top,#0c0f1a 0%,rgba(12,15,26,0.35) 40%,transparent 70%)" }}/>
                  <div className="absolute inset-y-0 left-0 w-1 pointer-events-none" style={{ background:"linear-gradient(to bottom,transparent,#ddb95a,transparent)", opacity:0.4 }}/>
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background:"rgba(8,11,18,0.82)", border:"1px solid rgba(221,185,90,0.4)", backdropFilter:"blur(8px)" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#ddb95a"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                    <span className="font-bold" style={{ color:"#ddb95a", fontSize:10 }}>Advanced FUE</span>
                  </div>
                  <div className="absolute top-3 right-3 flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl" style={{ background:"rgba(8,11,18,0.82)", border:"1px solid rgba(221,185,90,0.4)", backdropFilter:"blur(8px)" }}>
                    <span className="font-black leading-none" style={{ color:"#ddb95a", fontFamily:"'Playfair Display',serif", fontSize:15 }}>4.8</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_,i)=>(<svg key={i} width="8" height="8" viewBox="0 0 24 24" fill="#ddb95a"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>))}
                    </div>
                    <span style={{ color:"rgba(221,185,90,0.5)", fontSize:9 }}>Google</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="px-4 pt-4 pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ color:"rgba(221,185,90,0.6)", fontSize:10, fontWeight:600, letterSpacing:"0.08em" }}>TREATMENT SUCCESS RATE</span>
                    <span style={{ color:"#ddb95a", fontSize:11, fontWeight:900 }}>92%</span>
                  </div>
                  <div className="w-full rounded-full overflow-hidden" style={{ height:4, background:"rgba(221,185,90,0.1)" }}>
                    <div className="h-full rounded-full progress-bar" style={{ background:"linear-gradient(90deg,rgba(221,185,90,0.5),#ddb95a)", boxShadow:"0 0 8px rgba(221,185,90,0.5)" }}/>
                  </div>
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between px-4 py-3" style={{ borderTop:"1px solid rgba(221,185,90,0.1)", background:"rgba(221,185,90,0.03)" }}>
                  <div>
                    <p className="font-bold text-sm" style={{ color:"#f0e8d5" }}>Bonitaa Skin & Hair</p>
                    <p style={{ color:"rgba(221,185,90,0.5)", fontSize:11 }}>Coimbatore, Tamil Nadu</p>
                  </div>
                  <div className="flex -space-x-1.5">
                    {["#c9a44a","#ddb95a","#e8cc7a"].map((c,i)=>(<div key={i} className="w-6 h-6 rounded-full flex items-center justify-center font-bold" style={{ background:c, color:"#080b12", border:"2px solid #0c0f1a", fontSize:7 }}>{["5K","+","★"][i]}</div>))}
                    <div className="w-6 h-6 rounded-full flex items-center justify-center font-semibold" style={{ background:"rgba(221,185,90,0.1)", border:"2px solid rgba(221,185,90,0.3)", color:"#ddb95a", fontSize:7 }}>+99</div>
                  </div>
                </div>
              </div>

              {/* Float badges */}
              <div className="float-a absolute hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl" style={{ bottom:-14, left:-24, zIndex:10, background:"linear-gradient(135deg,#ddb95a,#c9a44a)", boxShadow:"0 10px 35px rgba(221,185,90,0.4)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:"rgba(8,11,18,0.25)" }}><span style={{ fontSize:16 }}>🏆</span></div>
                <div>
                  <p className="font-black leading-none" style={{ color:"#080b12", fontFamily:"'Playfair Display',serif", fontSize:16 }}>15+</p>
                  <p className="font-bold" style={{ color:"rgba(8,11,18,0.7)", fontSize:10 }}>Years Expert</p>
                </div>
              </div>
              <div className="float-b absolute hidden sm:flex items-center gap-2 px-3 py-2.5 rounded-2xl" style={{ top:40, left:-32, zIndex:10, background:"rgba(8,11,18,0.92)", border:"1.5px solid rgba(221,185,90,0.4)", backdropFilter:"blur(12px)", boxShadow:"0 8px 35px rgba(0,0,0,0.45)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:"rgba(221,185,90,0.1)", border:"1px solid rgba(221,185,90,0.25)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ddb95a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
                </div>
                <div>
                  <p className="font-black leading-none" style={{ color:"#ddb95a", fontFamily:"'Playfair Display',serif", fontSize:15 }}>6+</p>
                  <p className="font-medium" style={{ color:"rgba(240,232,213,0.5)", fontSize:10 }}>Branches</p>
                </div>
              </div>

              {/* Mobile pills */}
              <div className="flex sm:hidden items-center justify-center gap-3 mt-4 flex-wrap">
                {[{v:"15+",l:"Years"},{v:"6+",l:"Branches"},{v:"5K+",l:"Patients"}].map((s,i)=>(
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background:"rgba(221,185,90,0.08)", border:"1px solid rgba(221,185,90,0.25)" }}>
                    <span className="font-black" style={{ color:"#ddb95a", fontSize:13, fontFamily:"'Playfair Display',serif" }}>{s.v}</span>
                    <span style={{ color:"rgba(240,232,213,0.55)", fontSize:11 }}>{s.l}</span>
                  </div>
                ))}
              </div>

              {/* Brackets */}
              <div className="absolute pointer-events-none" style={{ top:-5,left:-5,zIndex:11 }}>
                <div style={{ width:20,height:2,background:"#ddb95a",borderRadius:2 }}/><div style={{ width:2,height:20,background:"#ddb95a",borderRadius:2 }}/>
              </div>
              <div className="absolute pointer-events-none" style={{ top:-5,right:-5,zIndex:11 }}>
                <div style={{ width:20,height:2,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/><div style={{ width:2,height:20,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/>
              </div>
              <div className="absolute pointer-events-none" style={{ bottom:-5,right:-5,zIndex:11 }}>
                <div style={{ width:2,height:20,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/><div style={{ width:20,height:2,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/>
              </div>
            </Reveal>

          </div>
        </div>

        {/* ══ STATS BAR — CountUp + directional Reveal ══ */}
        <div className="relative z-10 w-full" style={{ background:"linear-gradient(90deg,rgba(221,185,90,0.1) 0%,rgba(221,185,90,0.18) 50%,rgba(221,185,90,0.1) 100%)", borderTop:"1px solid rgba(221,185,90,0.28)", borderBottom:"1px solid rgba(221,185,90,0.28)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {statsConfig.map((s,i) => (
                <Reveal key={i} dir={s.dir} delay={i * 0.1} className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ border:"1.5px solid rgba(221,185,90,0.45)", background:"rgba(221,185,90,0.07)" }}>
                    <CheckIcon/>
                  </div>
                  <div>
                    <p className="font-bold leading-none" style={{ color:"#ddb95a", fontFamily:"'Playfair Display',serif", fontSize:"clamp(16px,2.5vw,22px)" }}>
                      {/* CountUp → runs when scrolled into view */}
                      <CountUp to={s.to} suffix={s.suffix} decimals={"decimals" in s ? s.decimals : 0} duration={1800} delay={i * 120}/>
                    </p>
                    <p className="mt-0.5 font-medium" style={{ color:"rgba(240,232,213,0.55)", fontSize:"clamp(10px,1.2vw,12px)" }}>{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>
      </section>
    </>
  );
}