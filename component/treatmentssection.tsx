"use client";
import { useState, useEffect } from "react";
import { Reveal } from "../component/animation";

const treatments = [
  {
    num:"01", title:"Anti-Dandruff Treatment",
    desc:"Eliminate dandruff flakes and soothe irritation for a healthier, itch-free scalp.",
    tag:"Scalp Care",
    imgs:[
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80",
      "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=500&q=80",
    ],
  },
  {
    num:"02", title:"Mesotherapy",
    desc:"Stimulate hair growth, thicken strands, and improve scalp health with a convenient lunchtime procedure.",
    tag:"Non-Invasive",
    imgs:[
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80",
    ],
  },
  {
    num:"03", title:"Hair Transplant",
    desc:"Invest in a permanent, hassle-free solution for hair loss with minimal scarring and a high success rate.",
    tag:"Permanent", featured:true,
    imgs:[
      "/caucasian-man.avif",
      "/bold-man-going.jpg",
    ],
  },
  {
    num:"04", title:"GFC Treatment",
    desc:"Utilize innovative Growth Factor Concentrate technology to promote hair growth and achieve natural-looking results.",
    tag:"Advanced",
    imgs:[
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80",
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=500&q=80",
    ],
  },
  {
    num:"05", title:"Low-Level Laser Therapy",
    desc:"Stimulate hair follicles and promote hair growth with a safe, non-invasive light therapy treatment.",
    tag:"Laser", featured:true,
    imgs:[
      "/woman-cosmetology.avif",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500&q=80",
    ],
  },
  {
    num:"06", title:"Organic Hair Root Stimulation",
    desc:"Encourage natural hair growth by nourishing the scalp with premium organic ingredients.",
    tag:"Organic",
    imgs:[
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80",
      "/medium-shot.avif",
    ],
  },
  {
    num:"07", title:"Beard & Mustache Transplant",
    desc:"Achieve your desired facial hair density and shape with a permanent hair transplant solution.",
    tag:"Facial",
    imgs:[
      "/beard.jpg",
      "/beard1.jpg",
    ],
  },
  {
    num:"08", title:"Female Eyebrow Transplant",
    desc:"Create beautiful, natural-looking eyebrows for a more defined and youthful appearance.",
    tag:"Aesthetic",
    imgs:[
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=80",
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=500&q=80",
    ],
  },
  {
    num:"09", title:"QR678 Hair Loss Treatment",
    desc:"Experience a proven and effective treatment specifically designed to combat hair loss.",
    tag:"Proven",
    imgs:[
      "/woman-getting.jpg",
      "/man-getting-hair.jpg",
    ],
  },
];

// Scan duration in ms — must match CSS animation duration
const SCAN_DURATION = 3000;
const SCAN_GAP = 1800; // pause between scans

function TreatmentCard({ t }: { t: typeof treatments[0] }) {
  const [baseIdx, setBaseIdx] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [scanKey, setScanKey] = useState(0); // force remount of scan elements

  const nextIdx = (baseIdx + 1) % t.imgs.length;

  useEffect(() => {
    const cycle = () => {
      // Kick off scan — CSS handles everything in sync
      setScanKey(k => k + 1);
      setScanning(true);

      // After scan fully completes, commit the new base image
      setTimeout(() => {
        setBaseIdx(prev => (prev + 1) % t.imgs.length);
        setScanning(false);
      }, SCAN_DURATION);
    };

    const id = setInterval(cycle, SCAN_DURATION + SCAN_GAP);
    return () => clearInterval(id);
  }, [t.imgs.length]);

  return (
    <div
      className="t-card rounded-2xl h-full"
      style={{
        background:"rgba(221,185,90,0.04)",
        border: t.featured ? "1.5px solid rgba(221,185,90,0.32)" : "1.5px solid rgba(221,185,90,0.12)",
        boxShadow: t.featured ? "0 8px 32px rgba(221,185,90,0.1)" : "0 4px 20px rgba(0,0,0,0.25)",
      }}
    >
      <div className="relative overflow-hidden rounded-t-2xl" style={{ height:"clamp(160px,18vw,210px)" }}>

        {/* Base (current) image — always fully visible */}
        <img
          src={t.imgs[baseIdx]}
          alt={t.title}
          className="t-img absolute inset-0 w-full h-full object-cover"
          style={{ filter:"brightness(0.78) contrast(1.08) saturate(0.85)" }}
        />

        {/* Next image — revealed top-to-bottom in exact sync with scan bar via clip-path */}
        {scanning && (
          <img
            key={scanKey}
            src={t.imgs[nextIdx]}
            alt={t.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter:"brightness(0.78) contrast(1.08) saturate(0.85)",
              animation: `imgReveal ${SCAN_DURATION}ms linear forwards`,
            }}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 pointer-events-none z-10"
          style={{ background:"linear-gradient(to top,rgba(8,11,18,0.85) 0%,rgba(8,11,18,0.1) 60%)" }}/>

        {/* Scan bar — CSS driven, perfectly in sync with imgReveal */}
        {scanning && (
          <div key={`scan-${scanKey}`} className="scan-bar z-20"/>
        )}

        {/* Tag */}
        <div className="absolute top-3 right-3 z-30">
          <span className="px-2.5 py-1 rounded-full font-bold tracking-wider"
            style={{ background:"rgba(8,11,18,0.88)", border:"1px solid rgba(221,185,90,0.3)", color:"rgba(221,185,90,0.85)", backdropFilter:"blur(8px)", fontSize:9 }}>
            {t.tag}
          </span>
        </div>

        {/* Number */}
        <div className="absolute bottom-3 left-4 z-30">
          <span className="t-num font-black"
            style={{ color:"rgba(221,185,90,0.35)", fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,3vw,36px)", lineHeight:1, borderBottom:"1.5px solid rgba(221,185,90,0.18)", paddingBottom:2 }}>
            {t.num}
          </span>
        </div>

        {/* Featured badge */}
        {t.featured && (
          <div className="absolute top-3 left-3 z-30">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full"
              style={{ background:"rgba(221,185,90,0.15)", border:"1px solid rgba(221,185,90,0.4)" }}>
              <div className="w-1 h-1 rounded-full glow-dot" style={{ background:"#ddb95a" }}/>
              <span style={{ color:"#ddb95a", fontSize:8, fontWeight:800, letterSpacing:"0.1em" }}>POPULAR</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold mb-2 leading-snug" style={{ color:"rgba(240,232,213,0.9)", fontFamily:"'Playfair Display',serif", fontSize:"clamp(13.5px,1.4vw,16px)" }}>
          {t.title}
        </h3>
        <div className="w-8 h-0.5 mb-3 rounded-full" style={{ background:"rgba(221,185,90,0.35)" }}/>
        <p style={{ color:"rgba(240,232,213,0.45)", fontSize:"clamp(11.5px,1.1vw,13px)", lineHeight:1.85 }}>
          {t.desc}
        </p>
        <div className="mt-4 flex items-center gap-1.5" style={{ cursor:"pointer" }}>
          <span style={{ color:"rgba(221,185,90,0.6)", fontSize:11, fontWeight:700, letterSpacing:"0.08em" }}>LEARN MORE</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(221,185,90,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function TreatmentsSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');
        @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes shimmer   { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        @keyframes scanLine    { 0%{top:-2%;opacity:0} 6%{opacity:1} 90%{top:102%;opacity:1} 100%{top:102%;opacity:0} }
        @keyframes imgReveal   { 0%{clip-path:inset(0 0 100% 0)} 100%{clip-path:inset(0 0 0% 0)} }

        .glow-dot  { animation: glowPulse 2s ease-in-out infinite; }
        .scan-bar  {
          position:absolute; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,rgba(221,185,90,0.9),transparent);
          box-shadow: 0 0 8px rgba(221,185,90,0.6);
          animation: scanLine 3s linear forwards;
          pointer-events:none;
        }
        .t-card { transition:all 0.32s ease; cursor:pointer; overflow:hidden; }
        .t-card:hover { transform:translateY(-6px); border-color:rgba(221,185,90,0.5)!important; box-shadow:0 24px 60px rgba(0,0,0,0.6),0 0 40px rgba(221,185,90,0.12)!important; }
        .t-card:hover .t-img { transform:scale(1.07); }
        .t-card:hover .t-num { color:#ddb95a!important; border-color:rgba(221,185,90,0.5)!important; }
        .t-img { transition:transform 0.5s ease; }
        .btn-gold { position:relative;overflow:hidden;cursor:pointer;border:none;padding:13px 32px;border-radius:12px;background:linear-gradient(135deg,#c9a44a,#ddb95a,#e8cc7a);font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;color:#080b12;letter-spacing:0.04em;transition:all 0.3s ease; }
        .btn-gold:hover { transform:translateY(-2px); }
        .btn-gold::after { content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);transform:translateX(-100%); }
        .btn-gold:hover::after { animation:shimmer 0.6s ease forwards; }
      `}</style>

      <section className="relative w-full overflow-hidden" style={{ background:"#080b12", fontFamily:"'Outfit',sans-serif" }}>

        <div className="absolute pointer-events-none z-0" style={{ width:"clamp(280px,36vw,500px)",height:"clamp(280px,36vw,500px)",top:"-8%",left:"-5%",background:"radial-gradient(circle,rgba(221,185,90,0.09) 0%,transparent 70%)",filter:"blur(90px)",borderRadius:"50%" }}/>
        <div className="absolute pointer-events-none z-0" style={{ width:"clamp(220px,28vw,380px)",height:"clamp(220px,28vw,380px)",bottom:"-6%",right:"-3%",background:"radial-gradient(circle,rgba(221,185,90,0.08) 0%,transparent 70%)",filter:"blur(70px)",borderRadius:"50%" }}/>
        <div className="absolute pointer-events-none z-0" style={{ width:"clamp(160px,20vw,280px)",height:"clamp(160px,20vw,280px)",top:"40%",right:"20%",background:"radial-gradient(circle,rgba(221,185,90,0.05) 0%,transparent 70%)",filter:"blur(55px)",borderRadius:"50%" }}/>

        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-5 sm:py-10">

          <div className="text-center mb-14">
            <Reveal dir="down" delay={0.0} className="mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ border:"1px solid rgba(221,185,90,0.28)", background:"rgba(221,185,90,0.06)" }}>
                <div className="w-2 h-2 rounded-full glow-dot" style={{ background:"#ddb95a" }}/>
                <span className="text-xs font-semibold tracking-widest" style={{ color:"#ddb95a" }}>OUR SERVICES</span>
              </div>
            </Reveal>
            <Reveal dir="up" delay={0.1}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.7rem,3.5vw,3rem)", fontWeight:700, color:"rgba(240,232,213,0.92)", lineHeight:1.2 }}>
                Discover our <span style={{ color:"#ddb95a", fontStyle:"italic" }}>Effective</span> Hair Restoration Solutions
              </h2>
            </Reveal>
            <Reveal dir="up" delay={0.16} className="mt-3">
              <p style={{ color:"rgba(240,232,213,0.42)", fontSize:"clamp(13px,1.3vw,15px)", maxWidth:520, margin:"0 auto", lineHeight:1.8 }}>
                Nine proven treatments personalised to every hair concern — from scalp care to permanent restoration.
              </p>
            </Reveal>
            <Reveal dir="fade" delay={0.2} className="mt-5 flex items-center justify-center gap-3">
              <div className="h-px w-14" style={{ background:"linear-gradient(to right,transparent,#ddb95a)" }}/>
              <div className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background:"#ddb95a" }}/>
              <div className="h-px w-14" style={{ background:"linear-gradient(to left,transparent,#ddb95a)" }}/>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {treatments.map((t, i) => (
              <Reveal key={i} dir={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"} delay={0.1 + (i % 3) * 0.1}>
                <TreatmentCard t={t}/>
              </Reveal>
            ))}
          </div>

          <Reveal dir="up" delay={0.5} className="mt-14 flex justify-center">
            <button className="btn-gold flex items-center gap-2"   onClick={() => {
    document.getElementById("Form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Book A Consultation
            </button>
          </Reveal>

        </div>

        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>
      </section>
    </>
  );
}