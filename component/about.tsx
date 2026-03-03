"use client";
import { useEffect, useRef, useState } from "react";

const fields = [
  { name:"fullName", placeholder:"Please Provide Your Full Name",      type:"text",  icon:<UserIcon/> },
  { name:"phone",    placeholder:"Please Fill Your 10 Digit Phone No.", type:"tel",   icon:<PhoneIcon/> },
  { name:"email",    placeholder:"Example@gmail.com",                   type:"email", icon:<MailIcon/> },
  { name:"concern",  placeholder:"Mention Your Hair Concern",           type:"text",  icon:<ChatIcon/> },
  { name:"pincode",  placeholder:"Type 6 Digit Your Pincode Here",      type:"text",  icon:<PinIcon/> },
];

function UserIcon()  { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function PhoneIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>; }
function MailIcon()  { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>; }
function ChatIcon()  { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>; }
function PinIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>; }
function CalIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>; }

const trustBadges = [
  { icon:"🏆", title:"15+ Years", sub:"Of Excellence" },
  { icon:"🔬", title:"18+ Treatments", sub:"FDA Approved" },
  { icon:"😊", title:"5,000+", sub:"Happy Patients" },
];

export default function AppointmentSection() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const [formData,  setFormData]  = useState<Record<string,string>>({});
  const [errors,    setErrors]    = useState<Record<string,boolean>>({});
  const [focused,   setFocused]   = useState<string|null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  /* ── Particles ── */
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W: number, H: number, raf: number;
    const pts: any[] = [];
    function resize() { W = canvas!.width = canvas!.offsetWidth; H = canvas!.height = canvas!.offsetHeight; }
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 70; i++) pts.push({
      x: Math.random()*1600, y: Math.random()*900,
      r: Math.random()*1.2+0.2, speed: Math.random()*0.28+0.05,
      opacity: Math.random()*0.45+0.08, drift: (Math.random()-0.5)*0.18,
      tw: Math.random()*Math.PI*2, tws: Math.random()*0.014+0.003,
    });
    function loop() {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => {
        p.y -= p.speed; p.x += p.drift; p.tw += p.tws;
        if (p.y < -10) { p.y = H+10; p.x = Math.random()*W; }
        const o = p.opacity*(0.5+0.5*Math.sin(p.tw));
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(221,185,90,${o})`; ctx.fill();
      });
      raf = requestAnimationFrame(loop);
    }
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const handleChange = (name:string, value:string) => {
    setFormData(p => ({...p, [name]:value}));
    if (value.trim()) setErrors(p => ({...p, [name]:false}));
  };

  const handleSubmit = () => {
    const errs: Record<string,boolean> = {};
    fields.forEach(f => { if (!formData[f.name]?.trim()) errs[f.name] = true; });
    setErrors(errs);
    if (!Object.keys(errs).length) {
      setLoading(true);
      setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        @keyframes fadeLeft  { from{opacity:0;transform:translateX(-36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeRight { from{opacity:0;transform:translateX(36px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(26px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes glowPulse { 0%,100%{opacity:0.35} 50%{opacity:0.9} }
        @keyframes shimmer   { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        @keyframes floatA    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes floatB    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes spinSlow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes progFill  { from{width:0%} to{width:100%} }
        @keyframes successPop{ 0%{opacity:0;transform:scale(0.6)} 70%{transform:scale(1.08)} 100%{opacity:1;transform:scale(1)} }
        @keyframes loadDot   { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }
        @keyframes countUp   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

        .al { animation: fadeLeft  0.85s ease forwards; }
        .ar { animation: fadeRight 0.85s ease 0.2s forwards; opacity:0; }
        .au { animation: fadeUp    0.7s  ease forwards; opacity:0; }

        .d1{animation-delay:0.05s!important} .d2{animation-delay:0.12s!important}
        .d3{animation-delay:0.19s!important} .d4{animation-delay:0.26s!important}
        .d5{animation-delay:0.33s!important} .d6{animation-delay:0.40s!important}

        .glow-dot { animation: glowPulse 2s ease-in-out infinite; }
        .float-a  { animation: floatA 4s ease-in-out infinite; }
        .float-b  { animation: floatB 5s ease-in-out 0.7s infinite; }
        .badge-count { animation: countUp 0.5s ease forwards; opacity:0; }

        .appt-input {
          width:100%; background:rgba(221,185,90,0.04);
          border:1.5px solid rgba(221,185,90,0.18);
          border-radius:12px; padding:14px 16px 14px 46px;
          color:#f0e8d5; font-size:14px; outline:none;
          transition:all 0.28s ease; font-family:'Outfit',sans-serif;
          caret-color:#ddb95a;
        }
        .appt-input::placeholder { color:rgba(221,185,90,0.3); }
        .appt-input:focus {
          border-color:#ddb95a;
          background:rgba(221,185,90,0.07);
          box-shadow:0 0 0 3px rgba(221,185,90,0.12), 0 4px 20px rgba(221,185,90,0.08);
        }
        .appt-input.err { border-color:rgba(240,80,80,0.55); background:rgba(240,80,80,0.04); }
        .appt-input.err:focus { box-shadow:0 0 0 3px rgba(240,80,80,0.1); }
        .appt-input.filled { border-color:rgba(221,185,90,0.45); }

        .field-icon {
          position:absolute; left:15px; top:50%; transform:translateY(-50%);
          transition:color 0.25s ease; pointer-events:none;
        }

        .book-btn {
          position:relative; overflow:hidden; cursor:pointer; border:none;
          width:100%; padding:15px 40px; border-radius:100px;
          background:linear-gradient(90deg,#b8962e,#ddb95a,#e8cc7a,#ddb95a,#b8962e);
          background-size:200% auto;
          font-family:'Outfit',sans-serif; font-weight:700; font-size:15px;
          color:#080b12; letter-spacing:0.07em;
          box-shadow:0 6px 30px rgba(221,185,90,0.35);
          transition:all 0.35s ease;
        }
        .book-btn:hover {
          background-position:right center;
          box-shadow:0 12px 45px rgba(221,185,90,0.55);
          transform:translateY(-2px);
        }
        .book-btn:active { transform:translateY(0); }
        .book-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent);
          transform:translateX(-100%);
        }
        .book-btn:hover::after { animation:shimmer 0.65s ease forwards; }
        .book-btn:disabled { opacity:0.7; cursor:not-allowed; transform:none; }

        .dot-loader span {
          display:inline-block; width:7px; height:7px;
          border-radius:50%; background:#080b12; margin:0 2px;
          animation:loadDot 1.2s ease-in-out infinite;
        }
        .dot-loader span:nth-child(2){animation-delay:0.2s}
        .dot-loader span:nth-child(3){animation-delay:0.4s}

        .success-anim { animation:successPop 0.6s ease forwards; }

        .divider-line {
          flex:1; height:1px;
          background:linear-gradient(90deg,transparent,rgba(221,185,90,0.45),transparent);
        }

        .trust-card {
          transition:all 0.25s ease;
          cursor:default;
        }
        .trust-card:hover {
          background:rgba(221,185,90,0.1)!important;
          border-color:rgba(221,185,90,0.4)!important;
          transform:translateY(-2px);
        }
      `}</style>

      <section className="relative w-full overflow-hidden" style={{ background:"#080b12", fontFamily:"'Outfit',sans-serif" }}>

        {/* Particles */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0"/>

        {/* Orbs */}
        <div className="absolute pointer-events-none z-0" style={{
          width:"clamp(280px,38vw,480px)", height:"clamp(280px,38vw,480px)",
          top:"-12%", right:"-6%",
          background:"radial-gradient(circle,rgba(221,185,90,0.12) 0%,transparent 70%)",
          filter:"blur(80px)", borderRadius:"50%"
        }}/>
        <div className="absolute pointer-events-none z-0" style={{
          width:"clamp(200px,28vw,340px)", height:"clamp(200px,28vw,340px)",
          bottom:"-10%", left:"3%",
          background:"radial-gradient(circle,rgba(221,185,90,0.08) 0%,transparent 70%)",
          filter:"blur(65px)", borderRadius:"50%"
        }}/>
        <div className="absolute pointer-events-none z-0" style={{
          width:200, height:200, top:"40%", left:"40%",
          background:"radial-gradient(circle,rgba(221,185,90,0.05) 0%,transparent 70%)",
          filter:"blur(50px)", borderRadius:"50%"
        }}/>

        {/* Top gold bar */}
        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

            {/* ═══════════ LEFT ═══════════ */}
            <div className="al flex-1 w-full">

              {/* Eyebrow */}
              <div className="au d1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{
                border:"1px solid rgba(221,185,90,0.32)", background:"rgba(221,185,90,0.06)"
              }}>
                <div className="w-2 h-2 rounded-full glow-dot" style={{ background:"#ddb95a" }}/>
                <span className="text-xs font-semibold tracking-widest" style={{ color:"#ddb95a" }}>
                  ABOUT BONITAA HAIR CLINIC
                </span>
              </div>

              {/* Headline */}
              <h2 className="au d2 leading-tight mb-2" style={{
                fontFamily:"'Playfair Display',serif",
                fontSize:"clamp(1.5rem,3vw,2.4rem)",
                color:"rgba(240,232,213,0.9)", fontWeight:700
              }}>
                Regain Your Confidence
              </h2>
              <h2 className="au d2 leading-tight mb-6" style={{
                fontFamily:"'Playfair Display',serif",
                fontSize:"clamp(1.5rem,3vw,2.4rem)",
                color:"#ddb95a", fontWeight:800
              }}>
                With Expert Hair Care
              </h2>

              {/* Gold divider */}
              <div className="au d3 flex items-center gap-3 mb-7">
                <div className="h-px w-10" style={{ background:"#ddb95a" }}/>
                <div className="w-1.5 h-1.5 rotate-45" style={{ background:"#ddb95a" }}/>
                <span className="text-xs tracking-widest" style={{ color:"rgba(221,185,90,0.45)" }}>EXCELLENCE SINCE 2009</span>
                <div className="w-1.5 h-1.5 rotate-45" style={{ background:"#ddb95a" }}/>
                <div className="h-px w-10" style={{ background:"#ddb95a" }}/>
              </div>

              {/* Left border text block */}
              <div className="au d4 flex gap-4 mb-8">
                <div className="flex-shrink-0 w-0.5 rounded-full self-stretch" style={{
                  background:"linear-gradient(to bottom,#ddb95a,rgba(221,185,90,0.1))"
                }}/>
                <p className="leading-relaxed" style={{
                  color:"rgba(240,232,213,0.65)",
                  fontSize:"clamp(13px,1.4vw,15px)", lineHeight:1.9
                }}>
                  <span className="font-semibold" style={{ color:"#ddb95a" }}>Bonitaa Hair Clinic –</span>{" "}
                  offers a variety of hair loss solutions tailored to meet your needs and help you regain confidence.
                  Our experienced trichologists specialize in restoring hair regardless of the cause. We believe in
                  personalized care, carefully analyzing your hair and scalp to create a customized treatment plan
                  aligned with your goals. With over{" "}
                  <span className="font-semibold" style={{ color:"#ddb95a" }}>18 advanced hair care treatments</span>{" "}
                  and FDA-approved options, Bonitaa Hair Clinic ensures you receive comprehensive care supported
                  by years of research and cutting-edge technology, guaranteeing the results you desire.
                </p>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {trustBadges.map((b,i) => (
                  <div key={i} className={`trust-card au d${i+4} flex items-center gap-3 px-4 py-3.5 rounded-xl`} style={{
                    background:"rgba(221,185,90,0.05)",
                    border:"1px solid rgba(221,185,90,0.18)",
                    animationDelay:`${0.4+i*0.08}s`
                  }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background:"rgba(221,185,90,0.1)", border:"1px solid rgba(221,185,90,0.2)" }}>
                      <span style={{ fontSize:20 }}>{b.icon}</span>
                    </div>
                    <div>
                      <p className="font-bold leading-none" style={{ color:"#ddb95a", fontFamily:"'Playfair Display',serif", fontSize:16 }}>{b.title}</p>
                      <p className="text-xs mt-1" style={{ color:"rgba(240,232,213,0.45)" }}>{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating accent chips – desktop only */}
              <div className="hidden lg:flex items-center gap-3 mt-8">
                <div className="float-a flex items-center gap-2 px-3.5 py-2 rounded-full" style={{
                  background:"rgba(221,185,90,0.08)", border:"1px solid rgba(221,185,90,0.25)"
                }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background:"#4ade80", boxShadow:"0 0 5px #4ade80" }}/>
                  <span className="text-xs font-semibold" style={{ color:"rgba(240,232,213,0.7)" }}>FDA Approved Treatments</span>
                </div>
                <div className="float-b flex items-center gap-2 px-3.5 py-2 rounded-full" style={{
                  background:"rgba(221,185,90,0.08)", border:"1px solid rgba(221,185,90,0.25)"
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#ddb95a"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
                  <span className="text-xs font-semibold" style={{ color:"rgba(240,232,213,0.7)" }}>4.8 Google Rating</span>
                </div>
              </div>
            </div>

            {/* ═══════════ RIGHT — FORM ═══════════ */}
            <div className="ar w-full lg:w-auto flex-shrink-0" style={{ minWidth:"clamp(280px,44vw,490px)" }}>

              {/* Depth shadow cards */}
              <div className="absolute pointer-events-none" style={{
                inset:0, top:20, left:18, right:-14, bottom:-14,
                borderRadius:24, transform:"rotate(2.5deg)",
                background:"rgba(221,185,90,0.04)",
                border:"1px solid rgba(221,185,90,0.1)", zIndex:0
              }}/>
              <div className="absolute pointer-events-none" style={{
                inset:0, top:10, left:9, right:-7, bottom:-7,
                borderRadius:22, transform:"rotate(1.2deg)",
                background:"rgba(221,185,90,0.03)",
                border:"1px solid rgba(221,185,90,0.14)", zIndex:0
              }}/>

              {/* Main form card */}
              <div className="relative overflow-hidden rounded-2xl" style={{
                background:"rgba(10,13,22,0.95)",
                border:"1.5px solid rgba(221,185,90,0.3)",
                boxShadow:"0 40px 100px rgba(0,0,0,0.55), 0 0 50px rgba(221,185,90,0.08)",
                zIndex:1
              }}>

                {/* Top glow strip */}
                <div className="h-0.5 w-full" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>

                {/* Card header bar */}
                <div className="flex items-center justify-between px-6 py-3" style={{
                  background:"linear-gradient(90deg,rgba(221,185,90,0.09),rgba(221,185,90,0.03))",
                  borderBottom:"1px solid rgba(221,185,90,0.15)"
                }}>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full glow-dot" style={{ background:"#ddb95a" }}/>
                    <span className="text-xs font-bold tracking-widest" style={{ color:"rgba(221,185,90,0.7)", fontSize:10 }}>
                      BOOK APPOINTMENT
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{
                    background:"rgba(74,222,128,0.09)", border:"1px solid rgba(74,222,128,0.28)"
                  }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background:"#4ade80", boxShadow:"0 0 5px #4ade80" }}/>
                    <span className="font-semibold" style={{ color:"#4ade80", fontSize:10 }}>Slots Available</span>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pt-7 pb-8">

                  {/* Form heading */}
                  <div className="flex items-center gap-3 mb-7">
                    <div className="divider-line"/>
                    <p className="whitespace-nowrap px-1 font-bold text-center" style={{
                      fontFamily:"'Playfair Display',serif",
                      fontSize:"clamp(14px,1.8vw,18px)",
                      color:"#f0e8d5", fontStyle:"italic"
                    }}>
                      Start Your Transformation Today!
                    </p>
                    <div className="divider-line"/>
                  </div>

                  {/* Success state */}
                  {submitted ? (
                    <div className="success-anim text-center py-10">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{
                        background:"rgba(221,185,90,0.1)", border:"2px solid rgba(221,185,90,0.4)"
                      }}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ddb95a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20,6 9,17 4,12"/>
                        </svg>
                      </div>
                      <p className="font-bold text-lg mb-2" style={{ color:"#ddb95a", fontFamily:"'Playfair Display',serif" }}>
                        Appointment Confirmed!
                      </p>
                      <p className="text-sm" style={{ color:"rgba(240,232,213,0.5)" }}>
                        Our team will reach out to you shortly.
                      </p>
                      <div className="mt-5 flex items-center justify-center gap-2 px-4 py-2 rounded-full mx-auto w-fit" style={{
                        background:"rgba(74,222,128,0.08)", border:"1px solid rgba(74,222,128,0.25)"
                      }}>
                        <div className="w-2 h-2 rounded-full" style={{ background:"#4ade80" }}/>
                        <span className="text-xs font-semibold" style={{ color:"#4ade80" }}>Response within 30 minutes</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">

                      {fields.map((f, i) => (
                        <div key={f.name} className={`au d${i+1}`}>
                          <div className="relative">
                            {/* Icon */}
                            <span className="field-icon" style={{
                              color: errors[f.name] ? "rgba(240,80,80,0.7)"
                                   : focused === f.name ? "#ddb95a"
                                   : "rgba(221,185,90,0.4)"
                            }}>
                              {f.icon}
                            </span>
                            <input
                              type={f.type}
                              placeholder={f.placeholder}
                              value={formData[f.name]||""}
                              onChange={e => handleChange(f.name, e.target.value)}
                              onFocus={() => setFocused(f.name)}
                              onBlur={() => setFocused(null)}
                              className={[
                                "appt-input",
                                errors[f.name] ? "err" : "",
                                !errors[f.name] && formData[f.name]?.trim() ? "filled" : ""
                              ].join(" ")}
                            />
                            {/* Filled checkmark */}
                            {formData[f.name]?.trim() && !errors[f.name] && (
                              <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ddb95a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20,6 9,17 4,12"/>
                                </svg>
                              </span>
                            )}
                          </div>
                          {errors[f.name] && (
                            <p className="mt-1.5 text-xs flex items-center gap-1.5" style={{ color:"rgba(240,80,80,0.85)" }}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                              This field is required.
                            </p>
                          )}
                        </div>
                      ))}

                      {/* Submit */}
                      <div className="pt-3">
                        <button
                          className="book-btn"
                          onClick={handleSubmit}
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="dot-loader flex items-center justify-center gap-0">
                              <span/><span/><span/>
                            </span>
                          ) : (
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <CalIcon/>
                              Book An Appointment
                            </span>
                          )}
                        </button>
                      </div>

                      {/* Privacy */}
                      <p className="text-center pt-1" style={{ color:"rgba(221,185,90,0.3)", fontSize:11 }}>
                        🔒 Your information is 100% safe &amp; confidential
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom glow strip */}
                <div className="h-0.5 w-full" style={{ background:"linear-gradient(90deg,transparent,rgba(221,185,90,0.35),transparent)" }}/>
              </div>

              {/* Corner brackets */}
              <div className="absolute pointer-events-none" style={{ top:-5, left:-5, zIndex:11 }}>
                <div style={{ width:20, height:2.5, background:"#ddb95a", borderRadius:2 }}/>
                <div style={{ width:2.5, height:20, background:"#ddb95a", borderRadius:2 }}/>
              </div>
              <div className="absolute pointer-events-none" style={{ top:-5, right:-5, zIndex:11 }}>
                <div style={{ width:20, height:2.5, background:"#ddb95a", borderRadius:2, marginLeft:"auto" }}/>
                <div style={{ width:2.5, height:20, background:"#ddb95a", borderRadius:2, marginLeft:"auto" }}/>
              </div>
              <div className="absolute pointer-events-none" style={{ bottom:-5, right:-5, zIndex:11 }}>
                <div style={{ width:2.5, height:20, background:"#ddb95a", borderRadius:2, marginLeft:"auto" }}/>
                <div style={{ width:20, height:2.5, background:"#ddb95a", borderRadius:2, marginLeft:"auto" }}/>
              </div>
              <div className="absolute pointer-events-none" style={{ bottom:-5, left:-5, zIndex:11 }}>
                <div style={{ width:2.5, height:20, background:"#ddb95a", borderRadius:2 }}/>
                <div style={{ width:20, height:2.5, background:"#ddb95a", borderRadius:2 }}/>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom gold bar */}
        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>
      </section>
    </>
  );
}