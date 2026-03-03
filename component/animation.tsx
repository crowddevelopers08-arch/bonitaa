"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

/* ═══════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════ */
type Direction = "up" | "down" | "left" | "right" | "fade";

interface RevealProps {
  children: ReactNode;
  dir?: Direction;
  delay?: number;         // seconds
  duration?: number;      // seconds
  distance?: number;      // px
  threshold?: number;     // 0–1
  once?: boolean;         // default true
  className?: string;
  style?: React.CSSProperties;
}

interface CountUpProps {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;      // decimal places
  duration?: number;      // ms
  delay?: number;         // ms before starting
  className?: string;
  style?: React.CSSProperties;
}

/* ═══════════════════════════════════════════════════════
   REVEAL — scroll-triggered directional animation
   
   Usage:
     <Reveal dir="left" delay={0.2}>
       <h1>Hello</h1>
     </Reveal>

   Props:
     dir       → "up" | "down" | "left" | "right" | "fade"
     delay     → seconds before animation (default 0)
     duration  → animation duration in seconds (default 0.75)
     distance  → how far element travels in px (default 45)
     threshold → how much of element visible before triggering (default 0.15)
     once      → animate only once (default true)
═══════════════════════════════════════════════════════ */
export function Reveal({
  children,
  dir = "up",
  delay = 0,
  duration = 0.75,
  distance = 45,
  threshold = 0.15,
  once = true,
  className = "",
  style = {},
}: RevealProps) {
  const ref     = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVis(false);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, threshold]);

  const translate: Record<Direction, string> = {
    up:    `translateY(${distance}px)`,
    down:  `translateY(-${distance}px)`,
    left:  `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
    fade:  "scale(0.96)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    vis ? 1 : 0,
        transform:  vis ? "translate(0) scale(1)" : translate[dir],
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   COUNT UP — animated number counter, scroll-triggered

   Usage:
     <CountUp to={5000} suffix="+" duration={2000} />
     <CountUp to={4.8}  decimals={1} prefix="⭐ " />

   Props:
     to        → target number
     suffix    → text after number (e.g. "+", "K+", "%")
     prefix    → text before number (e.g. "$", "⭐ ")
     decimals  → decimal places (default 0)
     duration  → count duration in ms (default 1800)
     delay     → ms before count starts (default 0)
═══════════════════════════════════════════════════════ */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1800,
  delay = 0,
  className = "",
  style = {},
}: CountUpProps) {
  const ref     = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          setTimeout(() => {
            const fps      = 60;
            const interval = 1000 / fps;
            const steps    = duration / interval;
            const increment = to / steps;
            let current    = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= to) {
                setCount(to);
                clearInterval(timer);
              } else {
                setCount(parseFloat(current.toFixed(decimals)));
              }
            }, interval);
          }, delay);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration, delay, decimals]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   STAGGER — wraps children and reveals them one by one

   Usage:
     <Stagger dir="up" staggerDelay={0.12} baseDelay={0.3}>
       <div>Item 1</div>
       <div>Item 2</div>
       <div>Item 3</div>
     </Stagger>

   Props:
     dir          → direction for all children
     staggerDelay → delay increment between each child (seconds)
     baseDelay    → initial delay before first child (seconds)
     duration     → animation duration per child (seconds)
═══════════════════════════════════════════════════════ */
interface StaggerProps {
  children: ReactNode;
  dir?: Direction;
  staggerDelay?: number;
  baseDelay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  className?: string;
}

export function Stagger({
  children,
  dir = "up",
  staggerDelay = 0.12,
  baseDelay = 0,
  duration = 0.65,
  distance = 35,
  threshold = 0.1,
  className = "",
}: StaggerProps) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className={className}>
      {items.map((child, i) => (
        <Reveal
          key={i}
          dir={dir}
          delay={baseDelay + i * staggerDelay}
          duration={duration}
          distance={distance}
          threshold={threshold}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   USAGE EXAMPLES (copy-paste ready)
═══════════════════════════════════════════════════════

// ── Single element from left ──
<Reveal dir="left" delay={0.1}>
  <h1>Your Headline</h1>
</Reveal>

// ── From right with longer duration ──
<Reveal dir="right" delay={0.3} duration={1}>
  <img src="/image.png" />
</Reveal>

// ── Just fade in ──
<Reveal dir="fade" delay={0.2}>
  <p>Some text</p>
</Reveal>

// ── Count up numbers ──
<CountUp to={5000} suffix="+" duration={2000} />
<CountUp to={4.8}  decimals={1} suffix=" Stars" duration={1500} />
<CountUp to={98}   suffix="%" delay={300} />

// ── Stagger a list from bottom ──
<Stagger dir="up" staggerDelay={0.1} baseDelay={0.2}>
  <div>Feature 1</div>
  <div>Feature 2</div>
  <div>Feature 3</div>
</Stagger>

// ── Stagger from left ──
<Stagger dir="left" staggerDelay={0.15}>
  {menuItems.map(item => <NavLink key={item.href} {...item} />)}
</Stagger>

═══════════════════════════════════════════════════════ */