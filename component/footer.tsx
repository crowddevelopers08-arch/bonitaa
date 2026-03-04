"use client";

const links = {
  treatments: [
    { label: "Hair Transplant",              href: "/" },
    { label: "Mesotherapy",                  href: "/" },
    { label: "GFC Treatment",                href: "/" },
    { label: "Low-Level Laser Therapy",      href: "/" },
    { label: "Anti-Dandruff Treatment",      href: "/" },
    { label: "QR678 Treatment",              href: "/" },
  ],
  company: [
    { label: "Home",    href: "/" },
    { label: "About Us",    href: "/" },
    { label: "Services",    href: "/" },
    { label: "FAQ",     href: "/" },
    { label: "Reviews",     href: "/" },
    { label: "Contact Us",  href: "/" },
  ],
  legal: [
    { label: "Privacy Policy",    href: "/privacy-policy" },
  ],
};

const branches = ["Coimbatore", "Chennai", "Trichy", "Madurai", "Salem", "Erode"];



export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');
        @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes shimmer   { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        .glow-dot { animation: glowPulse 2s ease-in-out infinite; }
        .f-link {
          color: rgba(240,232,213,0.45);
          font-size: 13px;
          text-decoration: none;
          transition: all 0.22s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          line-height: 1.6;
        }
        .f-link:hover { color: #ddb95a; padding-left: 4px; }
        .f-link:hover .f-dot { opacity: 1 !important; }
        .social-btn {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(221,185,90,0.07);
          border: 1.5px solid rgba(221,185,90,0.18);
          transition: all 0.25s ease;
          cursor: pointer; text-decoration: none;
        }
        .social-btn:hover {
          background: rgba(221,185,90,0.18);
          border-color: rgba(221,185,90,0.5);
          transform: translateY(-3px);
        }
        .branch-chip {
          padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 600;
          color: rgba(240,232,213,0.5); letter-spacing: 0.05em;
          border: 1px solid rgba(221,185,90,0.15);
          background: rgba(221,185,90,0.04);
          transition: all 0.22s ease; cursor: default;
        }
        .branch-chip:hover { color: #ddb95a; border-color: rgba(221,185,90,0.4); background: rgba(221,185,90,0.08); }
        .btn-gold {
          position:relative; overflow:hidden; cursor:pointer; border:none;
          padding:11px 24px; border-radius:10px;
          background:linear-gradient(135deg,#c9a44a,#ddb95a,#e8cc7a);
          font-family:'Outfit',sans-serif; font-weight:700; font-size:13px;
          color:#080b12; letter-spacing:0.04em; transition:all 0.3s ease;
        }
        .btn-gold:hover { transform:translateY(-2px); }
        .btn-gold::after { content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);transform:translateX(-100%); }
        .btn-gold:hover::after { animation:shimmer 0.55s ease forwards; }
      `}</style>

      <footer className="relative w-full overflow-hidden"
        style={{ background:"#080b12", fontFamily:"'Outfit',sans-serif" }}>

        {/* Orbs */}
        <div className="absolute pointer-events-none z-0" style={{ width:"clamp(260px,32vw,440px)",height:"clamp(260px,32vw,440px)",top:"-15%",left:"-5%",background:"radial-gradient(circle,rgba(221,185,90,0.08) 0%,transparent 70%)",filter:"blur(80px)",borderRadius:"50%" }}/>
        <div className="absolute pointer-events-none z-0" style={{ width:"clamp(200px,24vw,320px)",height:"clamp(200px,24vw,320px)",bottom:"0%",right:"-3%",background:"radial-gradient(circle,rgba(221,185,90,0.07) 0%,transparent 70%)",filter:"blur(65px)",borderRadius:"50%" }}/>

        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>

        {/* CTA Banner */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-14 max-sm:pt-5 max-sm:pb-5 pb-10">

          {/* Main footer grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-sm:gap-5 gap-10">

            {/* Brand column */}
            <div className="lg:col-span-1">
              {/* Logo / Brand */}
              <div className="flex items-center gap-2 mb-4">
                        <div className="relative">
              <div className="relative w-50 h-20 max-sm:h-16 rounded-xl flex items-center justify-center">
                <div
                  className="w-92 h-20 max-sm:h-16 rounded-lg flex items-center justify-center"
                  style={{ background: "#080b12" }}
                >
                  <img
                    src="/logo.png"
                    alt="Fastest Health Tech Logo"
                    className="w-100 h-40 max-sm:h-32 object-contain"
                  />
                </div>
              </div>
            </div>
              </div>
              <p style={{ color:"rgba(240,232,213,0.38)", fontSize:12.5, lineHeight:1.85, marginBottom:16 }}>
                Coimbatore's #1 hair clinic. Trusted by 5,000+ patients across Tamil Nadu for expert hair restoration and care.
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="#ddb95a" stroke="none">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  ))}
                </div>
                <span style={{ color:"rgba(240,232,213,0.45)", fontSize:11 }}>4.9 / 5.0 Google Rating</span>
              </div>
            </div>

            {/* Treatments */}
            <div>
              <h4 className="font-bold mb-4" style={{ color:"rgba(240,232,213,0.75)", fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase" }}>
                Treatments
              </h4>
              <ul className="flex flex-col gap-2">
                {links.treatments.map((l, i) => (
                  <li key={i}>
                    <a href={l.href} className="f-link">
                      <span className="f-dot w-1 h-1 rounded-full flex-shrink-0" style={{ background:"#ddb95a", opacity:0.3, transition:"opacity 0.2s" }}/>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-4" style={{ color:"rgba(240,232,213,0.75)", fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase" }}>
                Company
              </h4>
              <ul className="flex flex-col gap-2">
                {links.company.map((l, i) => (
                  <li key={i}>
                    <a href={l.href} className="f-link">
                      <span className="f-dot w-1 h-1 rounded-full flex-shrink-0" style={{ background:"#ddb95a", opacity:0.3, transition:"opacity 0.2s" }}/>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Branches */}
            <div>
              <h4 className="font-bold mb-4" style={{ color:"rgba(240,232,213,0.75)", fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase" }}>
                Contact
              </h4>
              <div className="flex flex-col gap-3 mb-6">
                {[
                  { icon:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", val:"+91 9363707090" },
                  { icon:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", val:" 249, 250, 9th St Ext, Gandhipuram, Coimbatore, Tamil Nadu 641012" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background:"rgba(221,185,90,0.08)", border:"1px solid rgba(221,185,90,0.18)" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="rgba(221,185,90,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d={c.icon}/>
                      </svg>
                    </div>
                    <span style={{ color:"rgba(240,232,213,0.45)", fontSize:12, lineHeight:1.5 }}>{c.val}</span>
                  </div>
                ))}
              </div>

              {/* Branches */}
              <h4 className="font-bold mb-3" style={{ color:"rgba(240,232,213,0.75)", fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase" }}>
                Our Branches
              </h4>
              <div className="flex flex-wrap gap-2">
                {branches.map((b, i) => (
                  <span key={i} className="branch-chip">{b}</span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 w-full max-sm:mb-13" style={{ borderTop:"1px solid rgba(221,185,90,0.1)" }}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p style={{ color:"rgba(240,232,213,0.28)", fontSize:11.5 }}>
              © {new Date().getFullYear()} Bonitaa Hair & Skin Clinic. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {links.legal.map((l, i) => (
                <a key={i} href={l.href}
                  style={{ color:"rgba(240,232,213,0.28)", fontSize:11.5, textDecoration:"none", transition:"color 0.2s" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#ddb95a";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(240,232,213,0.28)";}}
                >{l.label}</a>
              ))}
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}