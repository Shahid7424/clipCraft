/* eslint-disable react-hooks/purity */
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 20, suffix: "+", label: "Happy Clients" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 3,  suffix: "x", label: "Avg. ROI Growth" },
];

// ✅ FIX: Static pre-defined values instead of Math.random()
// Math.random() runs on server AND client → different values → hydration mismatch
const PARTICLES = [
  { left: "5%",  dur: "9s",  delay: "0s",   w: "2px", h: "3px", op: 0.50 },
  { left: "12%", dur: "12s", delay: "1.5s", w: "3px", h: "2px", op: 0.60 },
  { left: "19%", dur: "8s",  delay: "3s",   w: "2px", h: "2px", op: 0.45 },
  { left: "27%", dur: "14s", delay: "0.5s", w: "2px", h: "3px", op: 0.55 },
  { left: "34%", dur: "10s", delay: "5s",   w: "3px", h: "2px", op: 0.50 },
  { left: "41%", dur: "7s",  delay: "2s",   w: "2px", h: "2px", op: 0.65 },
  { left: "49%", dur: "11s", delay: "4s",   w: "2px", h: "3px", op: 0.48 },
  { left: "56%", dur: "13s", delay: "6.5s", w: "3px", h: "3px", op: 0.55 },
  { left: "63%", dur: "9s",  delay: "1s",   w: "2px", h: "2px", op: 0.50 },
  { left: "70%", dur: "11s", delay: "7s",   w: "3px", h: "2px", op: 0.60 },
  { left: "77%", dur: "8s",  delay: "2.5s", w: "2px", h: "3px", op: 0.52 },
  { left: "83%", dur: "13s", delay: "4.5s", w: "3px", h: "2px", op: 0.45 },
  { left: "89%", dur: "10s", delay: "0.8s", w: "2px", h: "2px", op: 0.58 },
  { left: "94%", dur: "7s",  delay: "3.5s", w: "3px", h: "3px", op: 0.50 },
  { left: "8%",  dur: "12s", delay: "6s",   w: "2px", h: "2px", op: 0.62 },
  { left: "23%", dur: "9s",  delay: "1.8s", w: "2px", h: "3px", op: 0.48 },
  { left: "46%", dur: "11s", delay: "5.5s", w: "3px", h: "2px", op: 0.55 },
  { left: "73%", dur: "8s",  delay: "7.5s", w: "2px", h: "2px", op: 0.50 },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({
  value, suffix, label, delay, started,
}: {
  value: number; suffix: string; label: string; delay: number; started: boolean;
}) {
  const count = useCountUp(value, 1800, started);
  return (
    <div className="stat-card" style={{ animationDelay: `${delay}ms` }}>
      <span className="stat-number">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

const WORDS = ["Convert.", "Dominate.", "Scale.", "Grow."];

export default function Hero() {
  const [wordIndex,    setWordIndex]    = useState(0);
  const [visible,      setVisible]      = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: #020408;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          padding: 100px 24px 60px;
        }
        .hero-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 20% 30%, rgba(0,210,180,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 80% 70%, rgba(100,80,255,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 60% 20%, rgba(255,80,150,0.07) 0%, transparent 60%);
          animation: meshPulse 8s ease-in-out infinite alternate;
        }
        @keyframes meshPulse {
          0%   { opacity: 0.7; transform: scale(1); }
          100% { opacity: 1;   transform: scale(1.05); }
        }

        .grid-overlay {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,210,180,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,210,180,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
        }

        .orb {
          position: absolute; border-radius: 50%;
          filter: blur(60px); pointer-events: none;
          animation: float 10s ease-in-out infinite;
        }
        .orb-1 { width:400px;height:400px;background:radial-gradient(circle,rgba(0,210,180,0.15),transparent 70%);top:-100px;left:-100px;animation-duration:12s; }
        .orb-2 { width:350px;height:350px;background:radial-gradient(circle,rgba(120,80,255,0.15),transparent 70%);bottom:-80px;right:-80px;animation-duration:9s;animation-delay:-3s; }
        .orb-3 { width:200px;height:200px;background:radial-gradient(circle,rgba(255,80,150,0.1),transparent 70%);top:40%;right:20%;animation-duration:14s;animation-delay:-6s; }
        @keyframes float {
          0%,100% { transform:translateY(0) translateX(0); }
          33%     { transform:translateY(-30px) translateX(15px); }
          66%     { transform:translateY(20px) translateX(-10px); }
        }

        .particles { position:absolute;inset:0;pointer-events:none; }
        .particle {
          position: absolute; border-radius: 50%;
          background: rgba(0,210,180,0.6);
          animation: rise linear infinite;
        }
        @keyframes rise {
          0%   { transform:translateY(100vh) scale(0); opacity:0; }
          10%  { opacity:1; }
          90%  { opacity:0.5; }
          100% { transform:translateY(-20px) scale(1); opacity:0; }
        }

        .deco-lines {
          position:absolute;top:0;right:0;
          width:50%;height:100%;
          pointer-events:none;opacity:0.4;
        }

        .hero-content {
          position:relative;z-index:10;
          max-width:1100px;margin:0 auto;width:100%;
        }

        .badge {
          display:inline-flex;align-items:center;gap:8px;
          background:rgba(0,210,180,0.08);
          border:1px solid rgba(0,210,180,0.25);
          color:#00d2b4;padding:6px 16px;
          border-radius:100px;font-size:13px;font-weight:500;
          letter-spacing:0.5px;margin-bottom:32px;
          opacity:0;transform:translateY(20px);
          transition:opacity 0.6s ease,transform 0.6s ease;
        }
        .badge.visible { opacity:1;transform:translateY(0); }
        .badge-dot {
          width:6px;height:6px;border-radius:50%;
          background:#00d2b4;animation:blink 1.5s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .hero-headline {
          font-family:'Syne',sans-serif;font-weight:800;
          font-size:clamp(42px,7vw,82px);line-height:1.05;
          color:#fff;margin:0 0 16px;
          opacity:0;transform:translateY(30px);
          transition:opacity 0.7s ease 0.15s,transform 0.7s ease 0.15s;
        }
        .hero-headline.visible { opacity:1;transform:translateY(0); }

        .word-swap-wrapper { display:inline-block;position:relative;min-width:220px; }
        .word-swap {
          display:inline-block;
          background:linear-gradient(135deg,#00d2b4,#7050ff);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:wordFade 2s ease-in-out infinite;
        }
        @keyframes wordFade {
          0%,80% { opacity:1;transform:translateY(0); }
          90%,100% { opacity:0;transform:translateY(-12px); }
        }

        .hero-sub {
          font-size:clamp(15px,2vw,18px);color:rgba(255,255,255,0.5);
          max-width:560px;line-height:1.7;margin:0 0 40px;
          opacity:0;transform:translateY(20px);
          transition:opacity 0.7s ease 0.3s,transform 0.7s ease 0.3s;
        }
        .hero-sub.visible { opacity:1;transform:translateY(0); }

        .cta-group {
          display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:72px;
          opacity:0;transform:translateY(20px);
          transition:opacity 0.7s ease 0.45s,transform 0.7s ease 0.45s;
        }
        .cta-group.visible { opacity:1;transform:translateY(0); }

        .btn-primary {
          position:relative;display:inline-flex;align-items:center;gap:10px;
          background:linear-gradient(135deg,#00d2b4,#00a896);
          color:#020408;font-family:'DM Sans',sans-serif;
          font-size:15px;font-weight:500;
          padding:14px 28px;border-radius:14px;text-decoration:none;
          transition:transform 0.2s ease,box-shadow 0.2s ease;
          overflow:hidden;
        }
        .btn-primary::before {
          content:'';position:absolute;inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.15),transparent);
          opacity:0;transition:opacity 0.2s;
        }
        .btn-primary:hover { transform:translateY(-2px);box-shadow:0 0 30px rgba(0,210,180,0.35); }
        .btn-primary:hover::before { opacity:1; }

        .btn-arrow {
          width:18px;height:18px;border-radius:50%;
          background:rgba(0,0,0,0.15);
          display:flex;align-items:center;justify-content:center;
          font-size:11px;transition:transform 0.2s ease;
        }
        .btn-primary:hover .btn-arrow { transform:translateX(2px); }

        .btn-secondary {
          display:inline-flex;align-items:center;gap:8px;
          background:transparent;border:1px solid rgba(255,255,255,0.15);
          color:rgba(255,255,255,0.75);font-family:'DM Sans',sans-serif;
          font-size:15px;font-weight:400;
          padding:14px 28px;border-radius:14px;text-decoration:none;
          transition:border-color 0.2s ease,color 0.2s ease,background 0.2s ease;
        }
        .btn-secondary:hover { border-color:rgba(255,255,255,0.3);color:#fff;background:rgba(255,255,255,0.04); }

        .stats-grid {
          display:grid;grid-template-columns:repeat(4,1fr);
          gap:1px;background:rgba(255,255,255,0.06);
          border-radius:20px;overflow:hidden;
          opacity:0;transform:translateY(20px);
          transition:opacity 0.7s ease 0.6s,transform 0.7s ease 0.6s;
        }
        .stats-grid.visible { opacity:1;transform:translateY(0); }

        .stat-card {
          background:rgba(255,255,255,0.02);padding:28px 24px;
          text-align:center;backdrop-filter:blur(10px);
          transition:background 0.2s ease;
        }
        .stat-card:hover { background:rgba(255,255,255,0.05); }
        .stat-number {
          display:block;font-family:'Syne',sans-serif;
          font-size:clamp(28px,4vw,40px);font-weight:700;
          color:#fff;line-height:1;margin-bottom:8px;
        }
        .stat-label { display:block;font-size:13px;color:rgba(255,255,255,0.4);letter-spacing:0.3px; }

        @media(max-width:768px){
          .hero-section{padding:90px 20px 50px;}
          .stats-grid{grid-template-columns:repeat(2,1fr);}
          .word-swap-wrapper{min-width:160px;}
        }
        @media(max-width:480px){
          .btn-primary,.btn-secondary{width:100%;justify-content:center;}
          .cta-group{flex-direction:column;}
        }
      `}</style>

      <section className="hero-section" ref={sectionRef}>
        <div className="grid-overlay" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* ✅ FIXED — static PARTICLES array, zero Math.random() */}
        <div className="particles">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left:            p.left,
                animationDuration: p.dur,
                animationDelay:  p.delay,
                width:           p.w,
                height:          p.h,
                opacity:         p.op,
              }}
            />
          ))}
        </div>

        <svg className="deco-lines" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="500" cy="200" r="300" stroke="rgba(0,210,180,0.08)" strokeWidth="1" />
          <circle cx="500" cy="200" r="220" stroke="rgba(0,210,180,0.06)" strokeWidth="1" />
          <circle cx="500" cy="200" r="140" stroke="rgba(0,210,180,0.06)" strokeWidth="1" />
          <line x1="200" y1="0" x2="600" y2="400" stroke="rgba(112,80,255,0.06)" strokeWidth="1" />
          <line x1="300" y1="0" x2="600" y2="600" stroke="rgba(112,80,255,0.04)" strokeWidth="1" />
        </svg>

        <div className="hero-content">
          <div className={`badge ${visible ? "visible" : ""}`}>
            <span className="badge-dot" />
            Digital Marketing Agency
          </div>

          <h1 className={`hero-headline ${visible ? "visible" : ""}`}>
            We Make Brands{" "}<br />
            <span className="word-swap-wrapper">
              <span className="word-swap" key={wordIndex}>{WORDS[wordIndex]}</span>
            </span>
          </h1>

          <p className={`hero-sub ${visible ? "visible" : ""}`}>
            From high-converting websites to performance ads and viral content —
            we build digital systems that bring real results for ambitious brands.
          </p>

          <div className={`cta-group ${visible ? "visible" : ""}`}>
            <Link href="/contact" className="btn-primary">
              Get Free Strategy Call
              <span className="btn-arrow">→</span>
            </Link>
            <Link href="/services" className="btn-secondary">
              Explore Services
            </Link>
          </div>

           <div className={`stats-grid ${visible ? "visible" : ""}`} ref={statsRef}>
            {STATS.map((stat, i) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 80}
                started={statsStarted}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}