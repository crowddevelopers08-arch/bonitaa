'use client'

import { useEffect, useRef } from "react";

const GOLD = [221, 185, 90] as const;

export default function DarkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let particles: Particle[] = [];
    let raf = 0;

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas || !ctx) return; // Add this check
      
      W = window.innerWidth;
      H = window.innerHeight;

      const ratio = dpr();
      canvas.width = Math.floor(W * ratio);
      canvas.height = Math.floor(H * ratio);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    class Particle {
      x = 0; y = 0; r = 0; speed = 0; opacity = 0; drift = 0; twinkle = 0; twinkleSpeed = 0;
      constructor(init = false) { this.reset(init); }
      reset(init = false) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : H + 10;
        this.r = Math.random() * 1.2 + 0.2;
        this.speed = Math.random() * 0.35 + 0.08;
        this.opacity = Math.random() * 0.55 + 0.08;
        this.drift = (Math.random() - 0.5) * 0.25;
        this.twinkle = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.018 + 0.004;
      }
      update() {
        this.y -= this.speed;
        this.x += this.drift;
        this.twinkle += this.twinkleSpeed;
        if (this.y < -10) this.reset();
        if (this.x < -20) this.x = W + 20;
        if (this.x > W + 20) this.x = -20;
      }
      draw() {
        if (!ctx) return; // Add this check
        const o = this.opacity * (0.5 + 0.5 * Math.sin(this.twinkle));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${o})`;
        ctx.fill();
      }
    }

    function init() {
      particles = Array.from({ length: 130 }, () => new Particle(true));
    }

    function loop() {
      if (!ctx) return; // Add this check
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) { p.update(); p.draw(); }
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => { resize(); init(); };

    resize();
    init();
    loop();

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes drift {
          0%   { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(45px, -35px) scale(1.06); }
          50%  { transform: translate(15px, 55px) scale(0.94); }
          75%  { transform: translate(-35px, 18px) scale(1.03); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes grainMove {
          0%   { transform: translate(0,0); }
          25%  { transform: translate(-2%,-3%); }
          50%  { transform: translate(3%,2%); }
          75%  { transform: translate(-1%,3%); }
          100% { transform: translate(2%,-1%); }
        }
        .orb1 { animation: drift 24s linear infinite; }
        .orb2 { animation: drift 30s linear infinite; animation-delay: -10s; }
        .orb3 { animation: drift 20s linear infinite; animation-delay: -5s; }
        .grain { animation: grainMove 0.5s steps(2) infinite; }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: "#080b12" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0" />

        <div
          className="orb1 absolute rounded-full"
          style={{
            width: 560, height: 560,
            top: -160, left: -100,
            background: "radial-gradient(circle, rgba(221,185,90,0.22) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        <div
          className="orb2 absolute rounded-full"
          style={{
            width: 420, height: 420,
            bottom: -120, right: -80,
            background: "radial-gradient(circle, rgba(180,130,40,0.18) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        <div
          className="orb3 absolute rounded-full"
          style={{
            width: 280, height: 280,
            top: "50%", left: "55%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(221,185,90,0.12) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        <div
          className="grain absolute"
          style={{
            inset: "-50%",
            width: "200%", height: "200%",
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </>
  );
}