"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const FAQ: { keywords: string[]; answer: string }[] = [
  { keywords: ["hi", "hello", "hey", "vanakkam", "helo", "hai"], answer: "Hi there! 👋 Welcome to Bonitaa Hair Clinic. How can I help you today? You can ask me about our treatments, branches, appointments, or costs!" },
  { keywords: ["prp", "platelet"], answer: "💉 PRP (Platelet Rich Plasma) Therapy is one of our most popular treatments! It uses your own blood platelets to stimulate hair growth. It's FDA approved, safe, and requires no downtime. Book a free consultation to know if it's right for you!" },
  { keywords: ["gfc", "growth factor"], answer: "🧬 GFC (Growth Factor Concentrate) is an advanced hair loss treatment that uses concentrated growth factors from your blood. It's more potent than PRP and gives faster results. We offer this at all Bonitaa branches!" },
  { keywords: ["transplant", "hair transplant", "fue", "fut"], answer: "✂️ We offer advanced Hair Transplant procedures (FUE & FUT) with natural-looking results. Our expert trichologists design your hairline to match your facial structure. Contact us for a free consultation and cost estimate!" },
  { keywords: ["laser", "lllt", "laser therapy"], answer: "🔦 Laser Hair Therapy (LLLT) is a painless, non-invasive treatment that stimulates hair follicles using low-level laser light. Great for early-stage hair loss. Sessions take just 20-30 minutes!" },
  { keywords: ["mesotherapy", "meso"], answer: "💊 Mesotherapy involves injecting vitamins, minerals, and amino acids directly into the scalp to nourish hair follicles. It's highly effective for hair thinning and loss. We offer customized mesotherapy plans!" },
  { keywords: ["treatment", "treatments", "what treatments", "services", "offer"], answer: "🌟 Bonitaa offers 18+ FDA-approved treatments including:\n• PRP Therapy\n• GFC Treatment\n• Hair Transplant (FUE/FUT)\n• Laser Therapy\n• Mesotherapy\n• Scalp Micropigmentation\n• Derma Roller Therapy\n\nBook a free consultation to get a personalized plan!" },
  { keywords: ["cost", "price", "fees", "charge", "how much", "rate", "pricing"], answer: "💰 Treatment costs vary based on your hair condition and the treatment needed. PRP starts from ₹3,000/session, Hair Transplants from ₹40,000 onwards. We offer transparent pricing with no hidden costs. Book a FREE consultation for an exact quote!" },
  { keywords: ["free", "free consultation", "free checkup"], answer: "✅ Yes! Bonitaa offers FREE hair consultations. Our expert trichologists will analyze your hair and scalp and suggest the best treatment plan — completely free of charge. Just fill the form on this page or call us!" },
  { keywords: ["branch", "branches", "location", "where", "address", "city", "near"], answer: "📍 Bonitaa Hair Clinic has branches in:\n• Coimbatore (Main Branch)\n• Chennai\n• Bangalore\n• Madurai\n\nVisit our nearest branch or book an online consultation!" },
  { keywords: ["coimbatore", "cbe"], answer: "📍 Our main branch is in Coimbatore! It's our flagship clinic with all 18+ treatments available. Call us or fill the form to book your appointment!" },
  { keywords: ["chennai"], answer: "📍 Yes, we have a branch in Chennai! All major treatments including PRP, GFC, and Hair Transplant are available there. Book a free consultation today!" },
  { keywords: ["bangalore", "bengaluru"], answer: "📍 Our Bangalore branch offers all Bonitaa treatments with experienced trichologists. Fill the form on this page to book your appointment!" },
  { keywords: ["madurai"], answer: "📍 Our Madurai branch is ready to serve you! Book a free consultation through the form on this page." },
  { keywords: ["book", "appointment", "booking", "schedule", "consult", "consultation"], answer: "📅 Booking is easy! Just fill the form on this page or call us directly. We offer FREE first consultations. Our team will call you back within 30 minutes to confirm your slot!" },
  { keywords: ["call", "phone", "contact", "number", "reach"], answer: "📞 You can reach Bonitaa Hair Clinic at:\n+91 93637 07090\n\nOr fill the appointment form on this page and we'll call you back within 30 minutes!" },
  { keywords: ["timing", "time", "hours", "open", "working hours", "clinic hours"], answer: "🕐 Bonitaa Hair Clinic is open:\nMon – Sat: 9:00 AM – 7:00 PM\nSunday: 10:00 AM – 4:00 PM\n\nWalk-ins welcome, appointments preferred!" },
  { keywords: ["hair fall", "hairfall", "hair loss", "falling", "shedding", "balding", "bald"], answer: "😔 Hair fall can be stressful, but it's treatable! At Bonitaa, our trichologists first analyze the root cause — whether it's hormonal, nutritional, or genetic — and suggest the best treatment. Book a FREE consultation to start your recovery journey!" },
  { keywords: ["dandruff", "itchy scalp", "scalp", "dry scalp"], answer: "🧴 Scalp health is the foundation of healthy hair. We offer specialized scalp treatments for dandruff, dryness, and irritation. Our trichologists will create a customized scalp care plan for you!" },
  { keywords: ["safe", "side effect", "pain", "painful", "risk"], answer: "✅ All Bonitaa treatments are FDA-approved and performed by certified trichologists. Most treatments are minimally invasive with little to no downtime. We'll explain all details during your free consultation!" },
  { keywords: ["result", "results", "how long", "when", "effective", "does it work"], answer: "📈 Results vary by treatment and individual. Most patients see noticeable improvement within 3-6 sessions. PRP/GFC typically shows results in 2-3 months. Our trichologists will give you a realistic timeline during consultation!" },
  { keywords: ["experience", "years", "how old", "since when", "trusted"], answer: "🏆 Bonitaa Hair Clinic has 15+ years of excellence in hair care! We've treated 5000+ happy patients and maintain a 4.8/5 Google rating. You're in expert hands!" },
  { keywords: ["doctor", "trichologist", "expert", "specialist", "staff", "team"], answer: "👨‍⚕️ Our team consists of certified trichologists and hair specialists with years of experience. Each patient gets a personalized consultation and treatment plan tailored to their specific needs!" },
  { keywords: ["thank", "thanks", "thank you", "ok", "okay", "great", "nice", "good", "helpful"], answer: "😊 You're welcome! Feel free to ask anything else. Don't forget — your first consultation at Bonitaa is completely FREE! Fill the form on this page to book now 🌟" },
  { keywords: ["bye", "goodbye", "see you", "later"], answer: "👋 Thank you for visiting Bonitaa Hair Clinic! Remember, your first consultation is FREE. Take care! 🌟" },
];

const DEFAULT_REPLY = "🤔 I'm not sure about that, but our expert trichologists can help! Book a FREE consultation by filling the form on this page or call us at +91 93637 07090 😊";

function getReply(userInput: string): string {
  const input = userInput.toLowerCase().trim();
  for (const faq of FAQ) {
    if (faq.keywords.some((kw) => input.includes(kw))) return faq.answer;
  }
  return DEFAULT_REPLY;
}

const QUICK_REPLIES = ["Treatments", "Cost & Pricing", "Book Appointment", "Branches", "Hair Fall Help"];

const TypingDots = () => (
  <div className="flex gap-1 items-center py-0.5">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-[#ddb95a]"
        style={{ animation: `tdot 1.4s ease-in-out ${i * 0.18}s infinite` }}
      />
    ))}
  </div>
);

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! 👋 I'm Bonitaa's hair care assistant. Ask me anything about our treatments, appointments, branches, or costs!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNew, setHasNew] = useState(true);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) { setHasNew(false); setTimeout(() => inputRef.current?.focus(), 350); }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setShowQuick(false);
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: getReply(msg) }]);
      setLoading(false);
    }, 900);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
        @keyframes tdot       { 0%,80%,100%{transform:translateY(0);opacity:0.3} 40%{transform:translateY(-5px);opacity:1} }
        @keyframes chatSlide  { 0%{opacity:0;transform:translateY(24px) scale(0.96)} 100%{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes msgIn      { 0%{opacity:0;transform:translateY(8px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes ripple     { 0%{box-shadow:0 0 0 0 rgba(221,185,90,0.5)} 100%{box-shadow:0 0 0 16px rgba(221,185,90,0)} }
        @keyframes shimmerBar { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes badgeBounce{ 0%,100%{transform:scale(1)} 50%{transform:scale(1.25)} }
        @keyframes glowPulse  { 0%,100%{opacity:0.5} 50%{opacity:1} }

        .chat-font          { font-family: 'DM Sans', sans-serif; }
        .title-font         { font-family: 'Playfair Display', serif; }
        .chat-slide         { animation: chatSlide 0.38s cubic-bezier(0.22,1,0.36,1) forwards; }
        .msg-in             { animation: msgIn 0.28s ease-out forwards; }
        .ripple-btn         { animation: ripple 2.2s ease-out infinite; }
        .badge-bounce       { animation: badgeBounce 1.8s ease-in-out infinite; }
        .glow-dot           { animation: glowPulse 2s ease-in-out infinite; }
        .shimmer-line {
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #ddb95a 30%, #e8cc7a 50%, #ddb95a 70%, transparent 100%);
          background-size: 200% auto;
          animation: shimmerBar 3s linear infinite;
        }
        .chat-scroll::-webkit-scrollbar       { width: 3px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(221,185,90,0.25); border-radius: 4px; }
      `}</style>

      {/* ── WRAPPER ── */}
      <div className="chat-font fixed bottom-14 right-3 sm:bottom-7 sm:right-7 z-[9999] flex flex-col items-end gap-3">

        {/* ── CHAT WINDOW ── */}
        {isOpen && (
          <div className="chat-slide flex flex-col overflow-hidden rounded-[18px] border border-[#ddb95a]/20 bg-[#06090f] shadow-[0_32px_90px_rgba(0,0,0,0.8),0_0_60px_rgba(221,185,90,0.07),inset_0_1px_0_rgba(221,185,90,0.12)] w-[min(340px,calc(100vw-40px))] h-[min(500px,calc(100dvh-130px))]">

            {/* Top shimmer */}
            <div className="shimmer-line" />

            {/* ── HEADER ── */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-[#ddb95a]/10 to-[#ddb95a]/5 border-b border-[#ddb95a]/10 shrink-0">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ddb95a]/20 to-[#ddb95a]/8 border border-[#ddb95a]/45 flex items-center justify-center text-lg">
                    💆
                  </div>
                  <div className="glow-dot absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#06090f] shadow-[0_0_6px_#4ade80]" />
                </div>
                <div>
                  <p className="title-font m-0 font-bold text-[13.5px] text-[#e8cc7a] tracking-wide">Bonitaa Assistant</p>
                  <p className="m-0 mt-0.5 text-[10.5px] text-white/40 font-normal">Hair Care Expert · Always here to help</p>
                </div>
              </div>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-[30px] h-[30px] rounded-lg bg-[#ddb95a]/6 border border-[#ddb95a]/15 text-[#ddb95a]/60 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#ddb95a]/15 hover:text-[#ddb95a] shrink-0"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── MESSAGES ── */}
            <div className="chat-scroll flex-1 overflow-y-auto px-3.5 pt-4 pb-2 flex flex-col gap-2.5">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`msg-in flex gap-2 items-end ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {/* Bot avatar */}
                  {msg.role === "assistant" && (
                    <div className="w-[26px] h-[26px] rounded-lg bg-[#ddb95a]/10 border border-[#ddb95a]/25 flex items-center justify-center text-xs shrink-0 mb-0.5">💆</div>
                  )}

                  <div
                    className={`max-w-[76%] px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line
                      ${msg.role === "user"
                        ? "rounded-[14px_14px_3px_14px] bg-gradient-to-br from-[#c9a44a] via-[#ddb95a] to-[#e8cc7a] text-[#07090e] font-semibold shadow-[0_4px_16px_rgba(221,185,90,0.25)]"
                        : "rounded-[14px_14px_14px_3px] bg-white/[0.04] text-white/85 border border-[#ddb95a]/12 font-normal"
                      }`}
                  >
                    {msg.content}
                  </div>

                  {/* User avatar */}
                  {msg.role === "user" && (
                    <div className="w-[26px] h-[26px] rounded-lg bg-gradient-to-br from-[#c9a44a] to-[#ddb95a] flex items-center justify-center text-[11px] font-bold text-[#06090f] shrink-0 mb-0.5">U</div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="msg-in flex gap-2 items-end">
                  <div className="w-[26px] h-[26px] rounded-lg bg-[#ddb95a]/10 border border-[#ddb95a]/25 flex items-center justify-center text-xs shrink-0">💆</div>
                  <div className="px-4 py-3 bg-white/[0.04] border border-[#ddb95a]/12 rounded-[14px_14px_14px_3px]">
                    <TypingDots />
                  </div>
                </div>
              )}

              {/* Quick replies */}
              {showQuick && messages.length === 1 && !loading && (
                <div className="mt-1.5">
                  <p className="text-[10.5px] text-[#ddb95a]/35 font-medium tracking-widest uppercase mb-2">Quick Questions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_REPLIES.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="chat-font px-3 py-1.5 text-[11px] font-semibold tracking-wide text-[#ddb95a] bg-[#ddb95a]/7 border border-[#ddb95a]/25 rounded-full cursor-pointer whitespace-nowrap transition-all duration-200 hover:bg-[#ddb95a]/18 hover:border-[#ddb95a]/60 hover:-translate-y-px"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Bottom shimmer */}
            <div className="shimmer-line opacity-40" />

            {/* ── INPUT ── */}
            <div className="flex gap-2 items-center px-3.5 py-3 bg-[#ddb95a]/[0.02] shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about treatments, cost, booking…"
                className="chat-font flex-1 bg-[#ddb95a]/[0.04] border border-[#ddb95a]/15 rounded-[10px] text-[rgba(240,232,213,0.9)] text-[13px] px-3.5 py-2.5 outline-none transition-all duration-200 placeholder:text-[#ddb95a]/25 focus:border-[#ddb95a]/45 focus:bg-[#ddb95a]/7"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 border-none transition-all duration-200 hover:-translate-y-px active:scale-95
                  ${input.trim() && !loading
                    ? "bg-gradient-to-br from-[#c9a44a] to-[#ddb95a] shadow-[0_4px_14px_rgba(221,185,90,0.3)] cursor-pointer"
                    : "bg-[#ddb95a]/8 cursor-not-allowed"
                  }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !loading ? "#06090f" : "rgba(221,185,90,0.3)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22,2 15,22 11,13 2,9" />
                </svg>
              </button>
            </div>

            {/* Footer */}
            <div className="pb-2.5 text-center">
              <span className="text-[10px] text-[#ddb95a]/20 tracking-widest">POWERED BY BONITAA HAIR CLINIC</span>
            </div>
          </div>
        )}

        {/* ── BUBBLE ── */}
        <div className="relative">
          <button
            onClick={() => setIsOpen((o) => !o)}
            className={`w-[50px] h-[50px] rounded-2xl border-none flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95
              ${isOpen
                ? "bg-[#ddb95a]/12 border border-[#ddb95a]/35"
                : "ripple-btn bg-gradient-to-br from-[#b8962e] via-[#ddb95a] to-[#e8cc7a] shadow-[0_8px_28px_rgba(221,185,90,0.4),0_2px_8px_rgba(0,0,0,0.4)]"
              }`}
          >
            {isOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ddb95a" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06090f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            )}
          </button>

          {/* Badge */}
          {hasNew && !isOpen && (
            <div className="badge-bounce absolute -top-1.5 -right-1.5 w-[19px] h-[19px] rounded-full bg-gradient-to-br from-red-500 to-red-600 border-[2.5px] border-[#06090f] flex items-center justify-center text-[9px] font-extrabold text-white shadow-[0_2px_8px_rgba(239,68,68,0.5)]">
              1
            </div>
          )}
        </div>

      </div>
    </>
  );
}