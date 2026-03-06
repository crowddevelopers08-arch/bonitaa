"use client";

import WalkthroughButton from "./buttoncomponent";

const sections = [
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Information We Collect",
    text: "We collect information you provide directly — such as your name, phone number, email address, and health-related details shared during consultation bookings or enquiry forms on our website.",
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "How We Use Your Information",
    text: "Your information is used solely to schedule appointments, provide personalised treatment recommendations, send appointment reminders, and improve our services. We do not use your data for unrelated marketing.",
  },
  {
    icon: "M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z",
    title: "Data Protection",
    text: "We implement industry-standard security measures to protect your personal data. Your information is stored securely and accessed only by authorised Bonitaa staff involved in your care.",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0",
    title: "Third-Party Sharing",
    text: "We do not sell, trade, or rent your personal information to third parties. Data may only be shared with trusted service providers who assist in clinic operations, under strict confidentiality agreements.",
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Data Retention",
    text: "We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy or as required by applicable law. You may request deletion of your data at any time.",
  },
  {
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "Contact Us",
    text: "For any questions regarding this Privacy Policy or how we handle your data, please reach us at privacy@bonitaa.com or visit any of our clinic branches across Tamil Nadu.",
  },
];

function Icon({ path }: { path: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="#ddb95a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={path}/>
    </svg>
  );
}

export default function PrivacyPolicy() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');
        @keyframes glowPulse { 0%,100%{opacity:0.35} 50%{opacity:1} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .glow-dot  { animation: glowPulse 2s ease-in-out infinite; }
        .pp-card   { transition: all 0.25s ease; }
        .pp-card:hover { background:rgba(221,185,90,0.08)!important; border-color:rgba(221,185,90,0.35)!important; transform:translateY(-3px); }
        .pp-card:hover .icon-box { background:rgba(221,185,90,0.2)!important; border-color:rgba(221,185,90,0.45)!important; }
        .fade-up   { animation: fadeUp 0.5s ease both; }
      `}</style>

      <main className="relative w-full overflow-hidden min-h-screen"
        style={{fontFamily:"'Outfit',sans-serif" }}>

        {/* Orbs */}
        <div className="absolute pointer-events-none" style={{ width:"clamp(300px,38vw,520px)",height:"clamp(300px,38vw,520px)",top:"-10%",left:"-6%",background:"radial-gradient(circle,rgba(221,185,90,0.09) 0%,transparent 70%)",filter:"blur(90px)",borderRadius:"50%",zIndex:0 }}/>
        <div className="absolute pointer-events-none" style={{ width:"clamp(220px,28vw,380px)",height:"clamp(220px,28vw,380px)",bottom:"-8%",right:"-4%",background:"radial-gradient(circle,rgba(221,185,90,0.08) 0%,transparent 70%)",filter:"blur(70px)",borderRadius:"50%",zIndex:0 }}/>

        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-10">

          {/* Header */}
          <div className="text-center mb-12 fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ border:"1px solid rgba(221,185,90,0.28)", background:"rgba(221,185,90,0.06)" }}>
              <div className="w-2 h-2 rounded-full glow-dot" style={{ background:"#ddb95a" }}/>
              <span className="text-xs font-semibold tracking-widest" style={{ color:"#ddb95a" }}>LEGAL</span>
            </div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:800, color:"rgba(240,232,213,0.93)", lineHeight:1.18 }}>
              Privacy <span style={{ color:"#ddb95a", fontStyle:"italic" }}>Policy</span>
            </h1>
            <p className="mt-3 mx-auto" style={{ color:"rgba(240,232,213,0.4)", fontSize:"clamp(12px,1.3vw,14px)", lineHeight:1.8, maxWidth:480 }}>
              At Bonitaa, we are committed to protecting your personal information and your right to privacy. Last updated: <span style={{ color:"rgba(221,185,90,0.6)" }}>January 2025</span>
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="h-px w-14" style={{ background:"linear-gradient(to right,transparent,#ddb95a)" }}/>
              <div className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background:"#ddb95a" }}/>
              <div className="h-px w-14" style={{ background:"linear-gradient(to left,transparent,#ddb95a)" }}/>
            </div>
          </div>

          {/* Policy cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map((s, i) => (
              <div
                key={i}
                className="pp-card p-5 rounded-2xl fade-up"
                style={{
                  background:"rgba(221,185,90,0.04)",
                  border:"1.5px solid rgba(221,185,90,0.13)",
                  boxShadow:"0 4px 20px rgba(0,0,0,0.22)",
                  animationDelay: `${0.08 + i * 0.07}s`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="icon-box flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ background:"rgba(221,185,90,0.08)", border:"1px solid rgba(221,185,90,0.2)" }}>
                    <Icon path={s.icon}/>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-2" style={{ color:"rgba(240,232,213,0.9)", fontFamily:"'Playfair Display',serif", fontSize:"clamp(13px,1.4vw,15px)" }}>
                      {s.title}
                    </h3>
                    <p style={{ color:"rgba(240,232,213,0.45)", fontSize:"clamp(11.5px,1.1vw,13px)", lineHeight:1.85 }}>
                      {s.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-10 px-5 py-4 rounded-2xl text-center fade-up"
            style={{ background:"rgba(221,185,90,0.05)", border:"1px solid rgba(221,185,90,0.15)", animationDelay:"0.6s" }}>
            <p style={{ color:"rgba(240,232,213,0.35)", fontSize:"clamp(11px,1.1vw,12.5px)", lineHeight:1.8 }}>
              By using our website or services, you agree to this Privacy Policy.
              We may update this policy periodically — continued use of our services constitutes acceptance of any changes.
            </p>
          </div>

          {/* Back button */}
          <div className="mt-8 flex justify-center fade-up" style={{ animationDelay:"0.65s" }}>
                           <WalkthroughButton
                      label=" Back to Home"
                      href="/"
                  />
          </div>
        </div>

        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>
      </main>
    </>
  );
}