"use client";
import { Reveal, CountUp } from "../component/animation";
import WalkthroughButton from "./buttoncomponent";
import GhostGoldButton from "./viewbutton";

const leftItems = [
  { num: "01", title: "Hair Loss", desc: "Whether you're noticing gradual thinning, sudden shedding, or bald spots, our solutions are tailored to address your needs and revive your hair's health." },
  { num: "02", title: "Baldness", desc: "Regain a full head of hair and boost your confidence with our advanced restoration techniques, restoring both your hair and self-assurance." },
  { num: "03", title: "Hair Thinning", desc: "Restore your hair's thickness and achieve a fuller look with our specialized treatments, designed to combat thinning effectively." },
];

const rightItems = [
  { num: "04", title: "Dandruff Treatment", desc: "Eliminate flakes and soothe scalp irritation with our effective dandruff treatments, designed to restore scalp health and maintain hair's natural shine." },
  { num: "05", title: "Receding Hairline", desc: "Halt the progression of a receding hairline and regain your youthful look with our personalized solutions, ensuring you feel confident once again." },
  { num: "06", title: "Alopecia Areata", desc: "Find effective treatments for patchy hair loss caused by Alopecia Areata, promoting healthy hair growth and restoring your natural appearance." },
];

export default function HairSolutions() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        @keyframes glowPulse  { 0%,100%{opacity:0.4}  50%{opacity:1} }
        @keyframes scanLine   { 0%{top:0%;opacity:1} 90%{top:100%;opacity:1} 100%{top:100%;opacity:0} }
        @keyframes shimmer    { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        @keyframes floatImg   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes drawLine   { from{height:0} to{height:100%} }

        .glow-dot  { animation: glowPulse 2s ease-in-out infinite; }
        .scan-bar  { position:absolute;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,rgba(221,185,90,0.7),transparent);animation:scanLine 4s ease-in-out infinite;pointer-events:none;z-index:5; }
        .img-float { animation: floatImg 7s ease-in-out infinite; }

        .tx-item { transition: all 0.25s ease; cursor:default; }
        .tx-item:hover .tx-num  { background: rgba(221,185,90,0.25) !important; border-color: #ddb95a !important; color: #ddb95a !important; }
        .tx-item:hover .tx-line { opacity:1 !important; }
        .tx-item:hover .tx-title { color: #ddb95a !important; }

        .tx-line { transition: opacity 0.25s ease; }

        .btn-gold  { position:relative;overflow:hidden;cursor:pointer;border:none;padding:13px 30px;border-radius:12px;background:linear-gradient(135deg,#c9a44a,#ddb95a,#e8cc7a);font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;color:#080b12;letter-spacing:0.04em;box-shadow:0 6px 26px rgba(221,185,90,0.32);transition:all 0.3s ease; }
        .btn-gold:hover  { transform:translateY(-2px); box-shadow:0 12px 40px rgba(221,185,90,0.5); }
        .btn-gold::after { content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);transform:translateX(-100%); }
        .btn-gold:hover::after { animation:shimmer 0.6s ease forwards; }

        .btn-ghost { padding:13px 30px;border-radius:12px;cursor:pointer;background:transparent;border:1.5px solid rgba(221,185,90,0.3);font-family:'Outfit',sans-serif;font-weight:600;font-size:14px;color:#ddb95a;transition:all 0.3s ease; }
        .btn-ghost:hover { background:rgba(221,185,90,0.07); border-color:#ddb95a; transform:translateY(-2px); }
      `}</style>

      <section id="treatment" className="relative w-full overflow-hidden" style={{ background:"#080b12", fontFamily:"'Outfit',sans-serif" }}>

        {/* Orbs */}
        <div className="absolute pointer-events-none z-0" style={{ width:"clamp(300px,38vw,500px)",height:"clamp(300px,38vw,500px)",top:"-10%",left:"-6%",background:"radial-gradient(circle,rgba(221,185,90,0.09) 0%,transparent 70%)",filter:"blur(90px)",borderRadius:"50%" }}/>
        <div className="absolute pointer-events-none z-0" style={{ width:"clamp(220px,28vw,380px)",height:"clamp(220px,28vw,380px)",bottom:"-8%",right:"2%",background:"radial-gradient(circle,rgba(221,185,90,0.07) 0%,transparent 70%)",filter:"blur(70px)",borderRadius:"50%" }}/>

        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-5 sm:py-10">

          {/* Heading */}
          <div className="text-center mb-5 lg:mb-15">
            <Reveal dir="down" delay={0.0} className="mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ border:"1px solid rgba(221,185,90,0.28)", background:"rgba(221,185,90,0.06)" }}>
                <div className="w-2 h-2 rounded-full glow-dot" style={{ background:"#ddb95a" }}/>
                <span className="text-xs font-semibold tracking-widest" style={{ color:"#ddb95a" }}>OUR TREATMENTS</span>
              </div>
            </Reveal>
            <Reveal dir="up" delay={0.1}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.6rem,3.2vw,2.8rem)", fontWeight:700, color:"rgba(240,232,213,0.92)", lineHeight:1.22 }}>
                Discover our{" "}
                <span style={{ color:"#ddb95a", fontStyle:"italic" }}>Effective</span>
                {" "}Hair Restoration Solutions
              </h2>
            </Reveal>
            <Reveal dir="up" delay={0.16} className="mt-3">
              <p style={{ color:"rgba(240,232,213,0.42)", fontSize:"clamp(13px,1.3vw,15px)", maxWidth:520, margin:"0 auto", lineHeight:1.8 }}>
                Six specialized solutions tailored to every hair concern — from early thinning to complete restoration.
              </p>
            </Reveal>
            <Reveal dir="fade" delay={0.2} className="mt-5 flex items-center justify-center gap-3">
              <div className="h-px w-14" style={{ background:"linear-gradient(to right,transparent,#ddb95a)" }}/>
              <div className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background:"#ddb95a" }}/>
              <div className="h-px w-14" style={{ background:"linear-gradient(to left,transparent,#ddb95a)" }}/>
            </Reveal>
          </div>

          {/* Main 3-col layout */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-6">

            {/* LEFT — numbered timeline */}
            <div className="flex-1 flex flex-col gap-0">
              {leftItems.map((item, i) => (
                <Reveal key={i} dir="left" delay={0.15 + i * 0.12}>
                  <div className="tx-item flex gap-4 items-start group py-5" style={{ borderBottom: i < leftItems.length - 1 ? "1px solid rgba(221,185,90,0.09)" : "none" }}>

                    {/* Number + vertical connector */}
                    <div className="flex flex-col items-center flex-shrink-0" style={{ paddingTop:2 }}>
                      <div className="tx-num w-9 h-9 rounded-full flex items-center justify-center font-black transition-all duration-300"
                        style={{ background:"rgba(221,185,90,0.07)", border:"1.5px solid rgba(221,185,90,0.22)", color:"rgba(221,185,90,0.55)", fontSize:11, letterSpacing:"0.05em", fontFamily:"'Outfit',sans-serif" }}>
                        {item.num}
                      </div>
                      {i < leftItems.length - 1 && (
                        <div className="tx-line w-px mt-1 opacity-30" style={{ height:60, background:"linear-gradient(to bottom,rgba(221,185,90,0.5),transparent)" }}/>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3 className="tx-title font-bold mb-1.5 transition-colors duration-300"
                        style={{ color:"rgba(240,232,213,0.88)", fontFamily:"'Playfair Display',serif", fontSize:"clamp(14px,1.4vw,16px)" }}>
                        {item.title}
                      </h3>
                      <p style={{ color:"rgba(240,232,213,0.42)", fontSize:"clamp(12px,1.1vw,13px)", lineHeight:1.85 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* CENTER — image */}
            <Reveal dir="up" delay={0.05} className="flex-shrink-0 flex justify-center lg:justify-center w-full lg:w-auto">
              <div className="img-float relative" style={{ width:"clamp(220px,24vw,310px)" }}>

                {/* Glow */}
                <div className="absolute pointer-events-none" style={{ inset:-24, background:"radial-gradient(circle,rgba(221,185,90,0.16) 0%,transparent 65%)", filter:"blur(30px)", borderRadius:"50%", zIndex:0 }}/>

                {/* Rotated depth cards */}
                <div className="absolute pointer-events-none" style={{ inset:0, top:14, left:10, right:-12, bottom:-14, borderRadius:22, transform:"rotate(3deg)", background:"rgba(221,185,90,0.04)", border:"1px solid rgba(221,185,90,0.1)", zIndex:1 }}/>
                <div className="absolute pointer-events-none" style={{ inset:0, top:7, left:5, right:-6, bottom:-7, borderRadius:20, transform:"rotate(1.5deg)", background:"rgba(221,185,90,0.03)", border:"1px solid rgba(221,185,90,0.14)", zIndex:2 }}/>

                {/* Main image card */}
                <div className="relative overflow-hidden rounded-2xl" style={{ border:"1.5px solid rgba(221,185,90,0.35)", boxShadow:"0 32px 80px rgba(0,0,0,0.65), 0 0 40px rgba(221,185,90,0.1)", zIndex:3, aspectRatio:"3/4.2" }}>
                  <div className="scan-bar"/>
                  <img src="/mature-man.jpg" alt="Hair Restoration" className="w-full h-full object-cover block" style={{ filter:"brightness(0.87) contrast(1.06) saturate(0.9)" }}/>
                  <div className="absolute inset-0 pointer-events-none" style={{ background:"linear-gradient(to top,rgba(8,11,18,0.6) 0%,transparent 45%)" }}/>
                  <div className="absolute inset-y-0 left-0 w-0.5 pointer-events-none" style={{ background:"linear-gradient(to bottom,transparent,#ddb95a,transparent)", opacity:0.5 }}/>
                </div>

                {/* Corner brackets */}
                <div className="absolute pointer-events-none" style={{ top:-4,left:-4,zIndex:11 }}><div style={{ width:16,height:2,background:"#ddb95a",borderRadius:2 }}/><div style={{ width:2,height:16,background:"#ddb95a",borderRadius:2 }}/></div>
                <div className="absolute pointer-events-none" style={{ top:-4,right:-4,zIndex:11 }}><div style={{ width:16,height:2,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/><div style={{ width:2,height:16,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/></div>
                <div className="absolute pointer-events-none" style={{ bottom:-4,left:-4,zIndex:11 }}><div style={{ width:2,height:16,background:"#ddb95a",borderRadius:2 }}/><div style={{ width:16,height:2,background:"#ddb95a",borderRadius:2 }}/></div>
                <div className="absolute pointer-events-none" style={{ bottom:-4,right:-4,zIndex:11 }}><div style={{ width:2,height:16,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/><div style={{ width:16,height:2,background:"#ddb95a",borderRadius:2,marginLeft:"auto" }}/></div>
              </div>
            </Reveal>

            {/* RIGHT — numbered timeline */}
            <div className="flex-1 flex flex-col gap-0">
              {rightItems.map((item, i) => (
                <Reveal key={i} dir="right" delay={0.15 + i * 0.12}>
                  <div className="tx-item flex gap-4 items-start group py-5" style={{ borderBottom: i < rightItems.length - 1 ? "1px solid rgba(221,185,90,0.09)" : "none" }}>

                    {/* Number + vertical connector */}
                    <div className="flex flex-col items-center flex-shrink-0" style={{ paddingTop:2 }}>
                      <div className="tx-num w-9 h-9 rounded-full flex items-center justify-center font-black transition-all duration-300"
                        style={{ background:"rgba(221,185,90,0.07)", border:"1.5px solid rgba(221,185,90,0.22)", color:"rgba(221,185,90,0.55)", fontSize:11, letterSpacing:"0.05em", fontFamily:"'Outfit',sans-serif" }}>
                        {item.num}
                      </div>
                      {i < rightItems.length - 1 && (
                        <div className="tx-line w-px mt-1 opacity-30" style={{ height:60, background:"linear-gradient(to bottom,rgba(221,185,90,0.5),transparent)" }}/>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3 className="tx-title font-bold mb-1.5 transition-colors duration-300"
                        style={{ color:"rgba(240,232,213,0.88)", fontFamily:"'Playfair Display',serif", fontSize:"clamp(14px,1.4vw,16px)" }}>
                        {item.title}
                      </h3>
                      <p style={{ color:"rgba(240,232,213,0.42)", fontSize:"clamp(12px,1.1vw,13px)", lineHeight:1.85 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>

          {/* CTA */}
          <Reveal dir="up" delay={0.6} className="mt-14 max-sm:mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <WalkthroughButton
                      label="Book An Appointment"
                      onClick={() => {
                        document.getElementById("Form")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      href=""
                  />
<GhostGoldButton label="View Our Results" />
          </Reveal>

        </div>

        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>
      </section>
    </>
  );
}