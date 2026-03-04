"use client";
import { useState } from "react";
import { Reveal } from "../component/animation";

const faqs = [
  { q: "Do you have experience treating my type of hair loss?", a: "Our experienced trichologists specialize in restoring hair regardless of the cause. We can address concerns like gradual thinning, sudden shedding, bald spots, alopecia areata, receding hairline, and androgenetic alopecia." },
  { q: "What can I expect during a consultation?", a: "During your consultation, a trichologist will analyze your hair and scalp to determine the cause of your hair loss. They will then discuss your goals and recommend a personalized treatment plan." },
  { q: "Are your treatments safe?", a: "Yes, safety is our top priority. We use FDA-approved equipment and offer a variety of minimally invasive and non-invasive treatments. During your consultation, we will discuss the potential risks and side effects of each option." },
  { q: "What kind of aftercare is required following hair loss treatments?", a: "Our team will provide detailed instructions on aftercare procedures specific to your chosen treatment." },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');
        @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes scanLine  { 0%{top:0%;opacity:1} 88%{top:100%;opacity:1} 100%{top:100%;opacity:0} }
        @keyframes shimmer   { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        @keyframes floatAnim { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-7px)} }
        @keyframes faqOpen   { from{opacity:0;transform:translateY(-5px)} to{opacity:1;transform:translateY(0)} }
        .glow-dot  { animation: glowPulse 2s ease-in-out infinite; }
        .scan-bar  { position:absolute;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,rgba(221,185,90,0.7),transparent);animation:scanLine 4s ease-in-out infinite;pointer-events:none;z-index:5; }
        .img-float { animation: floatAnim 6s ease-in-out infinite; }
        .faq-row   { transition:all 0.26s ease; cursor:pointer; }
        .faq-row:hover { border-color:rgba(221,185,90,0.38)!important; background:rgba(221,185,90,0.05)!important; }
        .faq-answer { animation: faqOpen 0.28s ease forwards; }
        .btn-gold { position:relative;overflow:hidden;cursor:pointer;border:none;padding:12px 28px;border-radius:12px;background:linear-gradient(135deg,#c9a44a,#ddb95a,#e8cc7a);font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;color:#080b12;letter-spacing:0.04em;transition:all 0.3s ease; }
        .btn-gold:hover { transform:translateY(-2px);}
        .btn-gold::after { content:'';position:absolute;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);transform:translateX(-100%); }
        .btn-gold:hover::after { animation:shimmer 0.55s ease forwards; }
      `}</style>

      <section className="relative w-full overflow-hidden" style={{ background:"#080b12", fontFamily:"'Outfit',sans-serif" }}>
        <div className="absolute pointer-events-none z-0" style={{ width:"clamp(300px,36vw,480px)",height:"clamp(300px,36vw,480px)",top:"-12%",left:"-8%",background:"radial-gradient(circle,rgba(221,185,90,0.09) 0%,transparent 70%)",filter:"blur(90px)",borderRadius:"50%" }}/>
        <div className="absolute pointer-events-none z-0" style={{ width:"clamp(240px,30vw,400px)",height:"clamp(240px,30vw,400px)",bottom:"-10%",right:"-4%",background:"radial-gradient(circle,rgba(221,185,90,0.08) 0%,transparent 70%)",filter:"blur(75px)",borderRadius:"50%" }}/>
        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>

        <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-12 max-sm:py-8 py-16 sm:py-12">
          <div className="flex flex-col lg:flex-row max-sm:gap-0 gap-10 lg:gap-12 items-start w-full">

            {/* ══ LEFT — title and FAQ for mobile (visible only on mobile) ══ */}
            <div className="w-full lg:hidden">
              <Reveal dir="down" delay={0.0} className="mb-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ border:"1px solid rgba(221,185,90,0.28)", background:"rgba(221,185,90,0.06)" }}>
                  <div className="w-2 h-2 rounded-full glow-dot" style={{ background:"#ddb95a" }}/>
                  <span className="text-xs font-semibold tracking-widest" style={{ color:"#ddb95a" }}>FAQ</span>
                </div>
              </Reveal>
              <Reveal dir="right" delay={0.08} className="mb-3 lg:mb-3">
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.3rem, 4vw, 2.8rem)", fontWeight:700, color:"rgba(240,232,213,0.92)", lineHeight:1.2 }}>
                  Frequently Asked Questions <span style={{ color:"#ddb95a", fontStyle:"italic" }}>at Bonitaa Hair </span> Clinic Coimbatore
                </h2>
              </Reveal>
            </div>

            {/* ══ LEFT — original CSS grid (hidden on mobile, visible on lg+) ══ */}
            <Reveal dir="left" delay={0.05} className="hidden lg:block w-full lg:w-1/2 flex-shrink-0">
              <div className="img-float lg:mt-15" style={{
                display:"grid",
                gridTemplateColumns:"repeat(4, 1fr)",
                gridTemplateRows:"repeat(4, 1fr)",
                columnGap: "clamp(6px, 1vw, 10px)",
                rowGap: "clamp(0px, 1vw, 10px)",
                width:"100%",
                height:"clamp(280px, 50vw, 520px)",
              }}>

                {/* div1 — 1/1/4/3 — top-left image (3 rows tall, 2 cols) */}
                <div style={{ gridArea:"1 / 1 / 4 / 3", minHeight:0 }}>
                  <div className="relative w-full h-full overflow-hidden rounded-xl lg:rounded-2xl"
                    style={{ border:"1.5px solid rgba(221,185,90,0.3)" }}>
                    <div className="scan-bar"/>
                    <img src="/mature.jpg" alt="Hair Clinic"
                      className="w-full h-full object-cover block"
                      style={{ filter:"brightness(0.82) contrast(1.07) saturate(0.88)" }}/>
                    <div className="absolute inset-0 pointer-events-none" style={{ background:"linear-gradient(to top,rgba(8,11,18,0.65) 0%,transparent 55%)" }}/>
                    <div className="absolute inset-y-0 left-0 w-0.5 pointer-events-none" style={{ background:"linear-gradient(to bottom,transparent,#ddb95a,transparent)", opacity:0.5 }}/>
                    <div className="absolute pointer-events-none" style={{ top:-3,left:-3,zIndex:10 }}>
                      <div style={{ width:14,height:2,background:"#ddb95a",borderRadius:2 }}/><div style={{ width:2,height:14,background:"#ddb95a",borderRadius:2 }}/>
                    </div>
                    <div className="absolute pointer-events-none" style={{ top:-3,right:-3,zIndex:10 }}>
                      <div style={{ width:14,height:2,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/><div style={{ width:2,height:14,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/>
                    </div>
                  </div>
                </div>

                {/* div2 — 4/1/6/3 — stats card (2 rows tall, 2 cols) */}
                <div style={{ gridArea:"4 / 1 / 6 / 3", minHeight:0 }}>
                  <div className="relative w-full h-full rounded-xl lg:rounded-2xl flex flex-col justify-center gap-1.5 lg:gap-2 px-2 lg:px-4 py-10 lg:py-3"
                    style={{ background:"rgba(221,185,90,0.07)", border:"1.5px solid rgba(221,185,90,0.22)" }}>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full glow-dot" style={{ background:"#ddb95a" }}/>
                      <span style={{ color:"rgba(221,185,90,0.55)", fontSize: "clamp(7px, 1.5vw, 8px)", fontWeight:700, letterSpacing:"0.12em" }}>SINCE 2008</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 lg:gap-2">
                      <p className="font-black leading-none" style={{ color:"#ddb95a", fontFamily:"'Playfair Display',serif", fontSize:"clamp(18px, 4vw, 30px)" }}>15+</p>
                      <p style={{ color:"rgba(240,232,213,0.6)", fontSize:"clamp(8px, 1.8vw, 12px)", fontWeight:500 }}>Years of Excellence</p>
                    </div>
                    <div className="w-full h-px" style={{ background:"rgba(221,185,90,0.16)" }}/>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="font-black leading-none" style={{ color:"rgba(240,232,213,0.88)", fontFamily:"'Playfair Display',serif", fontSize:"clamp(11px, 2.5vw, 16px)" }}>5K+</p>
                        <p style={{ color:"rgba(240,232,213,0.38)", fontSize: "clamp(7px, 1.5vw, 9px)", marginTop:2 }}>Patients</p>
                      </div>
                      <div className="w-px h-4 lg:h-6" style={{ background:"rgba(221,185,90,0.18)" }}/>
                      <div className="text-center">
                        <p className="font-black leading-none" style={{ color:"rgba(240,232,213,0.88)", fontFamily:"'Playfair Display',serif", fontSize:"clamp(11px, 2.5vw, 16px)" }}>6+</p>
                        <p style={{ color:"rgba(240,232,213,0.38)", fontSize: "clamp(7px, 1.5vw, 9px)", marginTop:2 }}>Branches</p>
                      </div>
                      <div className="w-px h-4 lg:h-6" style={{ background:"rgba(221,185,90,0.18)" }}/>
                      <div className="text-center">
                        <p className="font-black leading-none" style={{ color:"rgba(240,232,213,0.88)", fontFamily:"'Playfair Display',serif", fontSize:"clamp(11px, 2.5vw, 16px)" }}>18+</p>
                        <p style={{ color:"rgba(240,232,213,0.38)", fontSize: "clamp(7px, 1.5vw, 9px)", marginTop:2 }}>Treatments</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* div3 — 1/3/6/5 — full-height right image (5 rows, 2 cols) */}
                <div style={{ gridArea:"1 / 3 / 6 / 5", minHeight:0 }}>
                  <div className="relative w-full h-full overflow-hidden rounded-xl lg:rounded-2xl"
                    style={{ border:"1.5px solid rgba(221,185,90,0.28)" }}>
                    <img src="/haired.avif" alt="Hair Treatment"
                      className="w-full h-full object-cover block"
                      style={{ filter:"brightness(0.82) contrast(1.07) saturate(0.88)", objectPosition:"center top" }}/>
                    <div className="absolute inset-0 pointer-events-none" style={{ background:"linear-gradient(to top,rgba(8,11,18,0.6) 0%,transparent 45%)" }}/>
                    <div className="absolute inset-y-0 left-0 w-0.5 pointer-events-none" style={{ background:"linear-gradient(to bottom,transparent,#ddb95a,transparent)", opacity:0.45 }}/>
                    <div className="absolute pointer-events-none" style={{ bottom:-3,left:-3,zIndex:10 }}>
                      <div style={{ width:2,height:14,background:"#ddb95a",borderRadius:2 }}/><div style={{ width:14,height:2,background:"#ddb95a",borderRadius:2 }}/>
                    </div>
                    <div className="absolute pointer-events-none" style={{ bottom:-3,right:-3,zIndex:10 }}>
                      <div style={{ width:2,height:14,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/><div style={{ width:14,height:2,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/>
                    </div>
                  </div>
                </div>

              </div>
            </Reveal>

            {/* ══ LEFT — mobile image grid (visible only on mobile) ══ */}
            <Reveal dir="left" delay={0.05} className="w-full lg:hidden block my-6">
              <div className="img-float" style={{
                display:"grid",
                gridTemplateColumns:"repeat(4, 1fr)",
                gridTemplateRows:"repeat(4, 1fr)",
                columnGap: "clamp(6px, 1vw, 10px)",
                rowGap: "clamp(0px, 1vw, 10px)",
                width:"100%",
                height:"clamp(280px, 50vw, 520px)",
              }}>

                {/* div1 — 1/1/4/3 — top-left image (3 rows tall, 2 cols) */}
                <div style={{ gridArea:"1 / 1 / 4 / 3", minHeight:0 }}>
                  <div className="relative w-full h-full overflow-hidden rounded-xl lg:rounded-2xl"
                    style={{ border:"1.5px solid rgba(221,185,90,0.3)" }}>
                    <div className="scan-bar"/>
                    <img src="/mature.jpg" alt="Hair Clinic"
                      className="w-full h-full object-cover block"
                      style={{ filter:"brightness(0.82) contrast(1.07) saturate(0.88)" }}/>
                    <div className="absolute inset-0 pointer-events-none" style={{ background:"linear-gradient(to top,rgba(8,11,18,0.65) 0%,transparent 55%)" }}/>
                    <div className="absolute inset-y-0 left-0 w-0.5 pointer-events-none" style={{ background:"linear-gradient(to bottom,transparent,#ddb95a,transparent)", opacity:0.5 }}/>
                    <div className="absolute pointer-events-none" style={{ top:-3,left:-3,zIndex:10 }}>
                      <div style={{ width:14,height:2,background:"#ddb95a",borderRadius:2 }}/><div style={{ width:2,height:14,background:"#ddb95a",borderRadius:2 }}/>
                    </div>
                    <div className="absolute pointer-events-none" style={{ top:-3,right:-3,zIndex:10 }}>
                      <div style={{ width:14,height:2,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/><div style={{ width:2,height:14,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/>
                    </div>
                  </div>
                </div>

                {/* div2 — 4/1/6/3 — stats card (2 rows tall, 2 cols) */}
                <div style={{ gridArea:"4 / 1 / 6 / 3", minHeight:0 }}>
                  <div className="relative w-full h-full rounded-xl lg:rounded-2xl flex flex-col justify-center gap-1.5 lg:gap-2 px-2 lg:px-4 py-10 lg:py-3"
                    style={{ background:"rgba(221,185,90,0.07)", border:"1.5px solid rgba(221,185,90,0.22)" }}>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full glow-dot" style={{ background:"#ddb95a" }}/>
                      <span style={{ color:"rgba(221,185,90,0.55)", fontSize: "clamp(7px, 1.5vw, 8px)", fontWeight:700, letterSpacing:"0.12em" }}>SINCE 2008</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 lg:gap-2">
                      <p className="font-black leading-none" style={{ color:"#ddb95a", fontFamily:"'Playfair Display',serif", fontSize:"clamp(18px, 4vw, 30px)" }}>15+</p>
                      <p style={{ color:"rgba(240,232,213,0.6)", fontSize:"clamp(8px, 1.8vw, 12px)", fontWeight:500 }}>Years of Excellence</p>
                    </div>
                    <div className="w-full h-px" style={{ background:"rgba(221,185,90,0.16)" }}/>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="font-black leading-none" style={{ color:"rgba(240,232,213,0.88)", fontFamily:"'Playfair Display',serif", fontSize:"clamp(11px, 2.5vw, 16px)" }}>5K+</p>
                        <p style={{ color:"rgba(240,232,213,0.38)", fontSize: "clamp(7px, 1.5vw, 9px)", marginTop:2 }}>Patients</p>
                      </div>
                      <div className="w-px h-4 lg:h-6" style={{ background:"rgba(221,185,90,0.18)" }}/>
                      <div className="text-center">
                        <p className="font-black leading-none" style={{ color:"rgba(240,232,213,0.88)", fontFamily:"'Playfair Display',serif", fontSize:"clamp(11px, 2.5vw, 16px)" }}>6+</p>
                        <p style={{ color:"rgba(240,232,213,0.38)", fontSize: "clamp(7px, 1.5vw, 9px)", marginTop:2 }}>Branches</p>
                      </div>
                      <div className="w-px h-4 lg:h-6" style={{ background:"rgba(221,185,90,0.18)" }}/>
                      <div className="text-center">
                        <p className="font-black leading-none" style={{ color:"rgba(240,232,213,0.88)", fontFamily:"'Playfair Display',serif", fontSize:"clamp(11px, 2.5vw, 16px)" }}>18+</p>
                        <p style={{ color:"rgba(240,232,213,0.38)", fontSize: "clamp(7px, 1.5vw, 9px)", marginTop:2 }}>Treatments</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* div3 — 1/3/6/5 — full-height right image (5 rows, 2 cols) */}
                <div style={{ gridArea:"1 / 3 / 6 / 5", minHeight:0 }}>
                  <div className="relative w-full h-full overflow-hidden rounded-xl lg:rounded-2xl"
                    style={{ border:"1.5px solid rgba(221,185,90,0.28)" }}>
                    <img src="/haired.avif" alt="Hair Treatment"
                      className="w-full h-full object-cover block"
                      style={{ filter:"brightness(0.82) contrast(1.07) saturate(0.88)", objectPosition:"center top" }}/>
                    <div className="absolute inset-0 pointer-events-none" style={{ background:"linear-gradient(to top,rgba(8,11,18,0.6) 0%,transparent 45%)" }}/>
                    <div className="absolute inset-y-0 left-0 w-0.5 pointer-events-none" style={{ background:"linear-gradient(to bottom,transparent,#ddb95a,transparent)", opacity:0.45 }}/>
                    <div className="absolute pointer-events-none" style={{ bottom:-3,left:-3,zIndex:10 }}>
                      <div style={{ width:2,height:14,background:"#ddb95a",borderRadius:2 }}/><div style={{ width:14,height:2,background:"#ddb95a",borderRadius:2 }}/>
                    </div>
                    <div className="absolute pointer-events-none" style={{ bottom:-3,right:-3,zIndex:10 }}>
                      <div style={{ width:2,height:14,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/><div style={{ width:14,height:2,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/>
                    </div>
                  </div>
                </div>

              </div>
            </Reveal>

            {/* ══ RIGHT — FAQ Accordion (title hidden on mobile, visible on lg+) ══ */}
            <div className="w-full lg:w-2/5 flex-shrink-0 mt-8 lg:mt-0">
              {/* Desktop title (hidden on mobile) */}
              <div className="hidden lg:block">
                <Reveal dir="down" delay={0.0} className="mb-2">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ border:"1px solid rgba(221,185,90,0.28)", background:"rgba(221,185,90,0.06)" }}>
                    <div className="w-2 h-2 rounded-full glow-dot" style={{ background:"#ddb95a" }}/>
                    <span className="text-xs font-semibold tracking-widest" style={{ color:"#ddb95a" }}>FAQ</span>
                  </div>
                </Reveal>
                <Reveal dir="right" delay={0.08} className="mb-3 lg:mb-3">
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.3rem, 4vw, 2.8rem)", fontWeight:700, color:"rgba(240,232,213,0.92)", lineHeight:1.2 }}>
                    Frequently Asked Questions <span style={{ color:"#ddb95a", fontStyle:"italic" }}>at Bonitaa Hair </span> Clinic Coimbatore
                  </h2>
                </Reveal>
              </div>

              <div className="flex flex-col gap-3">
                {faqs.map((faq, i) => {
                  const isOpen = open === i;
                  return (
                    <Reveal key={i} dir="right" delay={0.18 + i * 0.07}>
                      <div
                        className="faq-row rounded-xl lg:rounded-2xl overflow-hidden"
                        style={{
                          background: isOpen ? "rgba(221,185,90,0.08)" : "rgba(221,185,90,0.03)",
                          border: isOpen ? "1.5px solid rgba(221,185,90,0.35)" : "1.5px solid rgba(221,185,90,0.12)",
                        }}
                        onClick={() => setOpen(isOpen ? null : i)}
                      >
                        <div className="flex items-center justify-between gap-3 lg:gap-4 px-3.5 lg:px-5 py-3 lg:py-4">
                          <p className="font-semibold flex-1" style={{
                            color: isOpen ? "rgba(240,232,213,0.95)" : "rgba(240,232,213,0.7)",
                            fontSize:"clamp(12px, 2.5vw, 15px)", lineHeight:1.5, transition:"color 0.25s ease"
                          }}>{faq.q}</p>
                          <div className="flex-shrink-0 w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center"
                            style={{ background: isOpen ? "rgba(221,185,90,0.18)" : "transparent", border: isOpen ? "1.5px solid rgba(221,185,90,0.5)" : "1.5px solid rgba(221,185,90,0.25)", transition:"all 0.28s ease" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                              stroke={isOpen ? "#ddb95a" : "rgba(221,185,90,0.5)"}
                              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition:"transform 0.3s ease, stroke 0.3s ease" }}>
                              <line x1="12" y1="5" x2="12" y2="19"/><polyline points="5,12 12,19 19,12"/>
                            </svg>
                          </div>
                        </div>
                        {isOpen && (
                          <div className="faq-answer px-3.5 lg:px-5 pb-4 lg:pb-5">
                            <div className="w-full h-px mb-3 lg:mb-4" style={{ background:"rgba(221,185,90,0.14)" }}/>
                            <p style={{ color:"rgba(240,232,213,0.55)", fontSize:"clamp(11.5px, 2.2vw, 14px)", lineHeight:1.8 }}>{faq.a}</p>
                          </div>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal dir="up" delay={0.65} className="mt-6 lg:mt-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4 max-sm:hidden">
                  <button className="btn-gold flex items-center gap-2 text-xs lg:text-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    Talk to an Expert
                  </button>
                  <p style={{ color:"rgba(240,232,213,0.35)", fontSize: "clamp(10px, 2vw, 12px)", lineHeight:1.6 }}>
                    Still have questions?{" "}
                    <span className="cursor-pointer" style={{ color:"rgba(221,185,90,0.65)", textDecoration:"underline", textDecorationStyle:"dotted", textUnderlineOffset:3 }}>
                      Visit our clinic
                    </span>
                  </p>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>
      </section>
    </>
  );
}