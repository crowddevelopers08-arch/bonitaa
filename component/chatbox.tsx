"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are a friendly and knowledgeable assistant for Bonitaa Hair Clinic — a premium hair care clinic based in Coimbatore, India with branches in Chennai, Bangalore, and Madurai.

You help users with:
- Information about hair loss treatments (PRP, GFC, Hair Transplant, Laser Therapy, Mesotherapy, etc.)
- Booking appointments and consultations
- Branch locations and timings
- Treatment costs and packages (give general ranges, not exact prices)
- Post-treatment care advice
- FAQ about hair and scalp health

Key facts about Bonitaa:
- 15+ years of experience
- 18+ FDA approved treatments
- 5000+ happy patients
- Google Rating: 4.8/5
- Branches: Coimbatore, Chennai, Bangalore, Madurai
- Specializes in trichology and hair restoration
- Free consultation available

Always be warm, professional, and encouraging. If someone asks about booking, guide them to fill the form on the page or call the clinic. Keep responses concise (2-4 sentences max). Never provide medical diagnoses. Always recommend a consultation for specific hair concerns.`;

const TypingDots = () => (
  <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "4px 0" }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#ddb95a",
          animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
        }}
      />
    ))}
  </div>
);

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! 👋 I'm Bonitaa's hair care assistant. Ask me anything about our treatments, appointments, or branches!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNew, setHasNew] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasNew(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again or call us directly!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        @keyframes typingDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes chatOpen {
          0% { opacity: 0; transform: scale(0.85) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes bubblePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(221,185,90,0.4); }
          50% { box-shadow: 0 0 0 10px rgba(221,185,90,0); }
        }
        @keyframes badgePop {
          0% { transform: scale(0); }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .chat-open { animation: chatOpen 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .bubble-pulse { animation: bubblePulse 2.5s ease-in-out infinite; }
        .badge-pop { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }

        .chat-input {
          flex: 1;
          background: rgba(221,185,90,0.05);
          border: 1.5px solid rgba(221,185,90,0.2);
          color: #f0e8d5;
          font-size: 13px;
          padding: 10px 14px;
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
          border-radius: 0;
          clipPath: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .chat-input::placeholder { color: rgba(221,185,90,0.3); }
        .chat-input:focus { border-color: rgba(221,185,90,0.6); }

        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(221,185,90,0.2); border-radius: 2px; }
      `}</style>

      {/* ── FLOATING BUBBLE ── */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 12,
        }}
      >

        {/* Chat Window */}
        {isOpen && (
          <div
            className="chat-open"
            style={{
              width: "clamp(300px, 90vw, 370px)",
              height: "clamp(400px, 70vh, 520px)",
              background: "#080b12",
              border: "1.5px solid rgba(221,185,90,0.3)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 40px rgba(221,185,90,0.08)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: "10px",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(90deg, rgba(221,185,90,0.12), rgba(221,185,90,0.06))",
                borderBottom: "1px solid rgba(221,185,90,0.2)",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Avatar */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    background: "rgba(221,185,90,0.15)",
                    border: "1.5px solid rgba(221,185,90,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  💆
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: "#ddb95a", letterSpacing: "0.04em" }}>
                    Bonitaa Assistant
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 5px #4ade80" }} />
                    <span style={{ fontSize: 10, color: "rgba(240,232,213,0.5)", fontWeight: 500 }}>Online · Hair Care Expert</span>
                  </div>
                </div>
              </div>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "rgba(221,185,90,0.08)",
                  border: "1px solid rgba(221,185,90,0.2)",
                  color: "#ddb95a",
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  borderRadius: "6px",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(221,185,90,0.18)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(221,185,90,0.08)"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Top accent */}
            <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #ddb95a, transparent)", flexShrink: 0 }} />

            {/* Messages */}
            <div
              className="chat-scroll"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    gap: 8,
                    alignItems: "flex-end",
                  }}
                >
                  {/* Bot avatar */}
                  {msg.role === "assistant" && (
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "6px",
                        background: "rgba(221,185,90,0.12)",
                        border: "1px solid rgba(221,185,90,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        flexShrink: 0,
                      }}
                    >
                      💆
                    </div>
                  )}

                  <div
                    style={{
                      maxWidth: "78%",
                      padding: "9px 13px",
                      fontSize: 13,
                      lineHeight: 1.55,
                      borderRadius: msg.role === "user" ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, #ddb95a, #c9a44a)"
                        : "rgba(221,185,90,0.06)",
                      color: msg.role === "user" ? "#080b12" : "rgba(240,232,213,0.88)",
                      border: msg.role === "user"
                        ? "none"
                        : "1px solid rgba(221,185,90,0.15)",
                      fontWeight: msg.role === "user" ? 600 : 400,
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div style={{ display: "flex", justifyContent: "flex-start", gap: 8, alignItems: "flex-end" }}>
                  <div
                    style={{
                      width: 24, height: 24, borderRadius: "6px",
                      background: "rgba(221,185,90,0.12)",
                      border: "1px solid rgba(221,185,90,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, flexShrink: 0,
                    }}
                  >💆</div>
                  <div
                    style={{
                      padding: "9px 14px",
                      background: "rgba(221,185,90,0.06)",
                      border: "1px solid rgba(221,185,90,0.15)",
                      borderRadius: "10px 10px 10px 2px",
                    }}
                  >
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Bottom accent */}
            <div style={{ height: 2, background: "linear-gradient(90deg, transparent, rgba(221,185,90,0.3), transparent)", flexShrink: 0 }} />

            {/* Input */}
            <div
              style={{
                padding: "12px 14px",
                background: "rgba(221,185,90,0.03)",
                borderTop: "1px solid rgba(221,185,90,0.12)",
                display: "flex",
                gap: 8,
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <input
                ref={inputRef}
                className="chat-input"
                placeholder="Ask about treatments..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={loading}
                style={{
                  flex: 1,
                  background: "rgba(221,185,90,0.05)",
                  border: "1.5px solid rgba(221,185,90,0.2)",
                  color: "#f0e8d5",
                  fontSize: 13,
                  padding: "10px 14px",
                  outline: "none",
                  fontFamily: "inherit",
                  borderRadius: "6px",
                }}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                style={{
                  width: 38,
                  height: 38,
                  background: input.trim() && !loading ? "#ddb95a" : "rgba(221,185,90,0.15)",
                  border: "none",
                  borderRadius: "6px",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (input.trim() && !loading)
                    (e.currentTarget as HTMLElement).style.background = "#c9a44a";
                }}
                onMouseLeave={(e) => {
                  if (input.trim() && !loading)
                    (e.currentTarget as HTMLElement).style.background = "#ddb95a";
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !loading ? "#080b12" : "rgba(221,185,90,0.4)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22,2 15,22 11,13 2,9"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ── BUBBLE TOGGLE ── */}
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="bubble-pulse"
          style={{
            width: 56,
            height: 56,
            borderRadius: "14px",
            background: isOpen
              ? "rgba(221,185,90,0.15)"
              : "linear-gradient(135deg, #c9a44a, #ddb95a, #e8cc7a)",
            border: isOpen ? "1.5px solid rgba(221,185,90,0.4)" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(221,185,90,0.35)",
            transition: "all 0.25s ease",
            position: "relative",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(1.05)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)"; }}
        >
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ddb95a" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#080b12" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          )}

          {/* New message badge */}
          {hasNew && !isOpen && (
            <div
              className="badge-pop"
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#ef4444",
                border: "2px solid #080b12",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              1
            </div>
          )}
        </button>
      </div>
    </>
  );
}