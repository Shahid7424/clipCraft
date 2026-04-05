/* eslint-disable react-hooks/refs */
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    num: "01",
    title: "Result-Driven Approach",
    desc: "We measure success by your revenue, leads, and growth — not impressions or vanity metrics.",
    icon: "◈",
    accent: "#00d2b4",
    stat: "3x",
    statLabel: "Avg. ROI",
  },
  {
    num: "02",
    title: "Fast Execution",
    desc: "Most projects go live within days. We move fast, stay lean, and never miss a deadline.",
    icon: "▶",
    accent: "#7050ff",
    stat: "7d",
    statLabel: "Avg. Delivery",
  },
  {
    num: "03",
    title: "AI-Powered Solutions",
    desc: "We integrate AI tools to automate workflows, generate content, and scale your operations.",
    icon: "✦",
    accent: "#00b4ff",
    stat: "10x",
    statLabel: "Faster Output",
  },
  {
    num: "04",
    title: "Complete Digital Stack",
    desc: "Development, marketing, design, AI — everything under one roof with zero handoff friction.",
    icon: "⬡",
    accent: "#ff5096",
    stat: "8+",
    statLabel: "Services",
  },
  {
    num: "05",
    title: "Affordable Pricing",
    desc: "Enterprise-quality output at startup-friendly prices. Every rupee you spend works harder.",
    icon: "◉",
    accent: "#00d2b4",
    stat: "0",
    statLabel: "Hidden Fees",
  },
  {
    num: "06",
    title: "Always-On Support",
    desc: "Dedicated support that stays in the loop. We don't ghost clients after delivery.",
    icon: "◆",
    accent: "#7050ff",
    stat: "24/7",
    statLabel: "Available",
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Features() {
  const header = useInView(0.1);
  const grid = useInView(0.08);
  const cta = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .feat-section {
          background: #020408;
          padding: 110px 24px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .feat-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 55% 50% at 10% 50%, rgba(0,210,180,0.05), transparent 60%),
            radial-gradient(ellipse 45% 45% at 90% 50%, rgba(112,80,255,0.05), transparent 60%);
          pointer-events: none;
        }

        /* grid lines */
        .feat-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%);
          pointer-events: none;
        }

        .feat-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }

        /* fade */
        .fade-up {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .fade-up.in { opacity: 1; transform: translateY(0); }
        .fd1 { transition-delay: 0.08s; }
        .fd2 { transition-delay: 0.18s; }
        .fd3 { transition-delay: 0.28s; }
        .fd4 { transition-delay: 0.1s; }
        .fd5 { transition-delay: 0.2s; }
        .fd6 { transition-delay: 0.3s; }

        /* header */
        .feat-header { text-align: center; margin-bottom: 72px; }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,210,180,0.08); border: 1px solid rgba(0,210,180,0.2);
          color: #00d2b4; font-size: 13px; font-weight: 500;
          padding: 6px 16px; border-radius: 100px; margin-bottom: 20px;
        }
        .e-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #00d2b4;
          animation: blink 1.5s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .feat-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 5vw, 56px); font-weight: 800;
          color: #fff; line-height: 1.06; margin: 0 0 16px;
        }
        .grad {
          background: linear-gradient(135deg, #00d2b4, #7050ff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .feat-sub {
          font-size: 16px; color: rgba(255,255,255,0.38);
          max-width: 460px; margin: 0 auto; line-height: 1.7;
        }

        /* cards grid */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        @media(max-width: 900px) { .cards-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width: 560px) { .cards-grid { grid-template-columns: 1fr; } }

        .feat-card {
          position: relative;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 22px;
          padding: 28px;
          overflow: hidden;
          display: flex; flex-direction: column; gap: 14px;
          transition: border-color 0.3s, transform 0.3s, background 0.3s;
        }
        .feat-card::after {
          content: attr(data-num);
          position: absolute; bottom: -16px; right: 12px;
          font-family: 'Syne', sans-serif; font-size: 88px; font-weight: 800;
          color: rgba(255,255,255,0.025); line-height: 1; pointer-events: none;
          transition: color 0.3s;
        }
        .feat-card:hover { border-color: rgba(255,255,255,0.13); transform: translateY(-5px); background: rgba(255,255,255,0.035); }
        .feat-card:hover::after { color: rgba(255,255,255,0.04); }

        /* top glow line on hover */
        .feat-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .feat-card:hover::before { opacity: 0.8; }

        /* card top row */
        .card-top {
          display: flex; align-items: flex-start; justify-content: space-between;
        }
        .card-icon {
          width: 42px; height: 42px; border-radius: 12px;
          border: 1px solid; display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
          transition: background 0.3s;
        }

        /* stat badge */
        .card-stat {
          display: flex; flex-direction: column; align-items: flex-end; gap: 1px;
        }
        .stat-val {
          font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800;
          line-height: 1;
        }
        .stat-lbl { font-size: 10px; color: rgba(255,255,255,0.25); letter-spacing: 0.5px; text-transform: uppercase; }

        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 17px; font-weight: 700; color: #fff; margin: 0; line-height: 1.25;
        }
        .card-desc {
          font-size: 13.5px; color: rgba(255,255,255,0.38); line-height: 1.7; margin: 0;
          flex: 1;
        }

        /* progress bar */
        .card-bar-wrap {
          height: 2px; background: rgba(255,255,255,0.06); border-radius: 100px; overflow: hidden;
        }
        .card-bar {
          height: 100%; border-radius: 100px;
          background: linear-gradient(90deg, var(--accent), var(--accent2, var(--accent)));
          width: 0; transition: width 1.2s cubic-bezier(0.16,1,0.3,1);
        }
        .card-bar.grow { width: var(--bar-w, 80%); }

        /* CTA */
        .feat-cta {
          display: flex; justify-content: center; align-items: center; gap: 14px;
          flex-wrap: wrap; margin-top: 64px;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #00d2b4, #00a896);
          color: #020408; font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 500;
          padding: 14px 28px; border-radius: 14px; text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 28px rgba(0,210,180,0.3); }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(255,255,255,0.13); color: rgba(255,255,255,0.6);
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          padding: 14px 28px; border-radius: 14px; text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-outline:hover { border-color: rgba(255,255,255,0.28); color: #fff; }

        /* bottom strip */
        .trust-strip {
          display: flex; justify-content: center; align-items: center; gap: 32px;
          flex-wrap: wrap; margin-top: 56px;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .trust-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: rgba(255,255,255,0.3);
        }
        .trust-dot { width: 5px; height: 5px; border-radius: 50%; background: #00d2b4; opacity: 0.6; }
      `}</style>

      <section className="feat-section">
        <div className="feat-grid-bg" />
        <div className="feat-inner">

          {/* Header */}
          <div ref={header.ref} className={`feat-header fade-up ${header.inView ? "in" : ""}`}>
            <div className="eyebrow">
              <span className="e-dot" />
              Why ClipCraft
            </div>
            <h2 className="feat-h2">
              We Don&apos;t Just Deliver<br />
              <span className="grad">Services. We Deliver Results.</span>
            </h2>
            <p className="feat-sub">
              Six reasons why ambitious brands choose us over any other agency.
            </p>
          </div>

          {/* Cards */}
          <div ref={grid.ref} className="cards-grid">
            {FEATURES.map((f, i) => (
              <div
                key={f.num}
                className={`feat-card fade-up fd${(i % 3) + 1} ${grid.inView ? "in" : ""}`}
                data-num={f.num}
                style={{
                  ["--accent" as string]: f.accent,
                  ["--bar-w" as string]: i === 0 ? "85%" : i === 1 ? "70%" : i === 2 ? "90%" : i === 3 ? "78%" : i === 4 ? "95%" : "82%",
                }}
              >
                <div className="card-top">
                  <div
                    className="card-icon"
                    style={{ color: f.accent, borderColor: `${f.accent}28`, background: `${f.accent}10` }}
                  >
                    {f.icon}
                  </div>
                  <div className="card-stat">
                    <span className="stat-val" style={{ color: f.accent }}>{f.stat}</span>
                    <span className="stat-lbl">{f.statLabel}</span>
                  </div>
                </div>

                <h3 className="card-title">{f.title}</h3>
                <p className="card-desc">{f.desc}</p>

                <div className="card-bar-wrap">
                  <div className={`card-bar ${grid.inView ? "grow" : ""}`} />
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={cta.ref} className={`feat-cta fade-up ${cta.inView ? "in" : ""}`}>
            <Link href="/contact" className="btn-primary">
              Let&apos;s Work Together →
            </Link>
            <Link href="/services" className="btn-outline">
              See All Services
            </Link>
          </div>

          {/* Trust strip */}
          <div className={`trust-strip fade-up ${cta.inView ? "in" : ""}`} style={{ transitionDelay: "0.15s" }}>
            {[
              "No long-term contracts",
              "Transparent reporting",
              "Dedicated account manager",
              "Money-back guarantee",
            ].map((t) => (
              <div className="trust-item" key={t}>
                <span className="trust-dot" />
                {t}
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}