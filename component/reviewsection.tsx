"use client";
import { useState, useEffect, useRef } from "react";
import { Reveal } from "../component/animation";

const reviews = [
  {
    name: "Sankar Sathish",
    rating: 5,
    text: "I had a very good experience at Bonitaa skin and hair care. The hair fall has reduced considerably and the process is very good. I hope all have to step out from your clinic with 100% satisfaction.",
  },
  {
    name: "Rajeswari Raji",
    rating: 5,
    text: "I had a very good experience at Bonitaa skin and hair care 😍✨. The hair fall has reduced considerably and the process is very smooth. The doctor is very well seasoned and one can expect a good solution to their problems at Bonitaa skin and hair care 👍.",
  },
  {
    name: "Priyanka Rajendran",
    rating: 5,
    text: "Me and my friend visited Bonitaa by reference for our hair fall problems. I am really happy about their results on my hair fall reduction treatment. Their clinic is really neat and clean so we can have a luxurious treatment for our problems. My friend also had a painless laser hair reduction treatment. Thanks to their team.",
  },
  {
    name: "Karthik Murugan",
    rating: 5,
    text: "Excellent service and very professional staff. The treatment for my hair thinning has shown amazing results within just 3 months. Highly recommended for anyone struggling with hair loss issues.",
  },
  {
    name: "Divya Lakshmi",
    rating: 5,
    text: "Best hair clinic in Coimbatore! The doctors are very knowledgeable and explained each step of the treatment clearly. Very happy with my results and the caring nature of the entire team.",
  },
];

function GoogleIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      <path fill="none" d="M0 0h48v48H0z"/>
    </svg>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24"
          fill={i < count ? "#ddb95a" : "rgba(221,185,90,0.2)"}
          stroke="none">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerView(1);
      else if (window.innerWidth < 1024) setPerView(2);
      else setPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total = reviews.length;
  const maxIndex = total - perView;

  const goTo = (idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(Math.max(0, Math.min(idx, maxIndex)));
    setTimeout(() => setIsTransitioning(false), 400);
  };

  // Auto-play
  useEffect(() => {
    autoRef.current = setInterval(() => {
      setCurrent(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [maxIndex]);

  const resetAuto = (idx: number) => {
    if (autoRef.current) clearInterval(autoRef.current);
    goTo(idx);
    autoRef.current = setInterval(() => {
      setCurrent(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,600&family=Outfit:wght@300;400;500;600&display=swap');
        @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .glow-dot { animation: glowPulse 2s ease-in-out infinite; }
        .review-card {
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
        }
        .review-card:hover {
          transform: translateY(-5px);
          border-color: rgba(221,185,90,0.4) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(221,185,90,0.08) !important;
        }
        .dot-btn { transition: all 0.25s ease; cursor: pointer; border:none; padding:0; background:none; }
        .carousel-track { transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94); }
      `}</style>

      <section  id="reviews" className="relative w-full overflow-hidden" style={{ background:"#080b12", fontFamily:"'Outfit',sans-serif" }}>

        {/* Orbs */}
        <div className="absolute pointer-events-none z-0" style={{ width:"clamp(280px,34vw,460px)",height:"clamp(280px,34vw,460px)",top:"-8%",right:"-6%",background:"radial-gradient(circle,rgba(221,185,90,0.09) 0%,transparent 70%)",filter:"blur(80px)",borderRadius:"50%" }}/>
        <div className="absolute pointer-events-none z-0" style={{ width:"clamp(200px,26vw,340px)",height:"clamp(200px,26vw,340px)",bottom:"-6%",left:"2%",background:"radial-gradient(circle,rgba(221,185,90,0.07) 0%,transparent 70%)",filter:"blur(65px)",borderRadius:"50%" }}/>

        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10">

          {/* Heading */}
          <div className="text-center mb-14 max-sm:mb-8">
            <Reveal dir="down" delay={0.0} className="mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ border:"1px solid rgba(221,185,90,0.28)", background:"rgba(221,185,90,0.06)" }}>
                <div className="w-2 h-2 rounded-full glow-dot" style={{ background:"#ddb95a" }}/>
                <span className="text-xs font-semibold tracking-widest" style={{ color:"#ddb95a" }}>GOOGLE REVIEWS</span>
              </div>
            </Reveal>
            <Reveal dir="up" delay={0.1}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.7rem,3.5vw,3rem)", fontWeight:700, color:"rgba(240,232,213,0.92)", lineHeight:1.2 }}>
                Our <span style={{ color:"#ddb95a", fontStyle:"italic" }}>Happy</span> Patients
              </h2>
            </Reveal>
            <Reveal dir="fade" delay={0.16} className="mt-5 flex items-center justify-center gap-3">
              <div className="h-px w-14" style={{ background:"linear-gradient(to right,transparent,#ddb95a)" }}/>
              <div className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background:"#ddb95a" }}/>
              <div className="h-px w-14" style={{ background:"linear-gradient(to left,transparent,#ddb95a)" }}/>
            </Reveal>
          </div>

          {/* Carousel */}
          <Reveal dir="up" delay={0.2} className="w-full overflow-hidden">
            <div
              className="carousel-track flex"
              style={{
                gap: 16,
                transform: `translateX(calc(-${current} * ((100% + 16px) / ${perView})))`,
              }}
            >
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="flex-shrink-0"
                  style={{
                    width: `calc((100% - ${(perView - 1) * 16}px) / ${perView})`,
                  }}
                >
                  <div
                    className="review-card h-full flex flex-col p-6 rounded-2xl"
                    style={{
                      background:"rgba(221,185,90,0.04)",
                      border:"1.5px solid rgba(221,185,90,0.15)",
                      boxShadow:"0 8px 30px rgba(0,0,0,0.3)",
                      minHeight: 280,
                    }}
                  >
                    {/* Google icon + name row */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0">
                        <GoogleIcon/>
                      </div>
                      <div>
                        <p className="font-bold" style={{ color:"rgba(240,232,213,0.9)", fontSize:"clamp(14px,1.4vw,16px)" }}>
                          {review.name}
                        </p>
                        <p style={{ color:"rgba(240,232,213,0.35)", fontSize:10, marginTop:2, letterSpacing:"0.05em" }}>
                          Google Review
                        </p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="mb-4">
                      <Stars count={review.rating}/>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px mb-4" style={{ background:"rgba(221,185,90,0.1)" }}/>

                    {/* Review text */}
                    <p className="flex-1" style={{ color:"rgba(240,232,213,0.55)", fontSize:"clamp(12px,1.2vw,14px)", lineHeight:1.85 }}>
                      {review.text}
                    </p>

                    {/* Bottom quote mark */}
                    <div className="mt-4 flex justify-end">
                      <svg width="28" height="22" viewBox="0 0 28 22" fill="rgba(221,185,90,0.15)">
                        <path d="M0 22V13.818C0 9.697 1.212 6.394 3.636 3.909 6.061 1.303 9.394 0 13.636 0v4.545c-2.303 0-4.091.758-5.363 2.273C6.879 8.333 6.242 10.303 6.242 12.727H11V22H0zm17 0V13.818c0-4.121 1.212-7.424 3.636-9.909C23.061 1.303 26.394 0 30.636 0v4.545c-2.303 0-4.091.758-5.363 2.273-1.394 1.515-2.031 3.485-2.031 5.909H28V22H17z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                className="dot-btn"
                onClick={() => resetAuto(i)}
                aria-label={`Go to slide ${i + 1}`}
              >
                <div style={{
                  width: current === i ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: current === i ? "#ddb95a" : "rgba(221,185,90,0.25)",
                  transition: "all 0.3s ease",
                }}/>
              </button>
            ))}
          </div>

          {/* Arrow nav — optional, hidden on mobile */}
          <div className="hidden sm:flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => resetAuto(current - 1)}
              disabled={current === 0}
              className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-25"
              style={{
                background: current === 0 ? "rgba(221,185,90,0.05)" : "rgba(221,185,90,0.12)",
                border: "1.5px solid rgba(221,185,90,0.2)",
                cursor: current === 0 ? "not-allowed" : "pointer",
                opacity: current === 0 ? 0.4 : 1,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ddb95a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>
            <button
              onClick={() => resetAuto(current + 1)}
              disabled={current >= maxIndex}
              className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-25"
              style={{
                background: current >= maxIndex ? "rgba(221,185,90,0.05)" : "rgba(221,185,90,0.12)",
                border: "1.5px solid rgba(221,185,90,0.2)",
                cursor: current >= maxIndex ? "not-allowed" : "pointer",
                opacity: current >= maxIndex ? 0.4 : 1,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ddb95a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>
          </div>

        </div>

        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ddb95a,transparent)" }}/>
      </section>
    </>
  );
}