"use client";

import Link from "next/link";
import { Fragment } from "react";
import { useRef, useState } from "react";

const SERVICES = [
  {
    title: "Web Development",
    desc: "Lightning-fast, SEO-optimised websites built to rank and convert.",
    icon: "⬡",
    accent: "#00d2b4",
    tags: ["Next.js", "React", "SEO"],
  },
  {
    title: "App Development",
    desc: "Custom Android & iOS apps engineered for your business logic.",
    icon: "◈",
    accent: "#7050ff",
    tags: ["Android", "iOS", "Flutter"],
  },
  {
    title: "Google Ads",
    desc: "High-converting campaigns that generate qualified leads daily.",
    icon: "◉",
    accent: "#00b4ff",
    tags: ["Search", "Shopping", "Display"],
  },
  {
    title: "Meta Ads",
    desc: "Facebook & Instagram ads that stop the scroll and drive sales.",
    icon: "▣",
    accent: "#7050ff",
    tags: ["Facebook", "Instagram", "Retargeting"],
  },
  {
    title: "Social Media",
    desc: "End-to-end content creation, scheduling, and growth strategy.",
    icon: "◆",
    accent: "#ff5096",
    tags: ["Content", "Growth", "Analytics"],
  },
  {
    title: "Reels Editing",
    desc: "Short-form videos engineered to hook, engage, and convert.",
    icon: "▶",
    accent: "#ff5096",
    tags: ["Reels", "Shorts", "Editing"],
  },
  {
    title: "Graphic Design",
    desc: "Scroll-stopping visuals and branding that builds recognition.",
    icon: "✦",
    accent: "#00d2b4",
    tags: ["Branding", "Banners", "Print"],
  },
  {
    title: "AI Chatbots",
    desc: "Custom AI bots that capture leads and automate support 24/7.",
    icon: "⬡",
    accent: "#00b4ff",
    tags: ["GPT-4", "WhatsApp", "Web"],
  },
];

// Duplicate for seamless loop
const ROW1 = [...SERVICES, ...SERVICES];
const ROW2 = [...SERVICES.slice(4), ...SERVICES.slice(0, 4), ...SERVICES.slice(4), ...SERVICES.slice(0, 4)];

function ServiceCard({ s, paused }: { s: typeof SERVICES[0]; paused: boolean }) {
  return (
    <div
      className="svc-card"
      style={{ ["--accent" as string]: s.accent }}
    >
      <div className="sc-top">
        <span className="sc-icon" style={{ color: s.accent, background: `${s.accent}12`, borderColor: `${s.accent}25` }}>
          {s.icon}
        </span>
        <span className="sc-arrow">→</span>
      </div>
      <h3 className="sc-title">{s.title}</h3>
      <p className="sc-desc">{s.desc}</p>
      <div className="sc-tags">
        {s.tags.map((t) => <span key={t} className="sc-tag">{t}</span>)}
      </div>
      <Link href="/contact" className="sc-cta">
        Get Quote <span>→</span>
      </Link>
    </div>
  );
}

export default function Services() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .svc-section {
          background: #020408;
          padding: 100px 0;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }
        .svc-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 50% 60% at 20% 50%, rgba(0,210,180,0.06), transparent 60%),
            radial-gradient(ellipse 40% 50% at 80% 50%, rgba(112,80,255,0.06), transparent 60%);
          pointer-events: none;
        }

        /* ── Header ── */
        .svc-header {
          text-align: center;
          padding: 0 24px;
          margin-bottom: 64px;
          position: relative; z-index: 1;
        }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,210,180,0.08);
          border: 1px solid rgba(0,210,180,0.2);
          color: #00d2b4; font-size: 13px; font-weight: 500;
          padding: 6px 16px; border-radius: 100px;
          margin-bottom: 20px;
        }
        .e-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #00d2b4;
          animation: blink 1.5s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

        .svc-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 5vw, 56px); font-weight: 800;
          line-height: 1.06; color: #fff; margin: 0 0 16px;
        }
        .grad {
          background: linear-gradient(135deg, #00d2b4, #7050ff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .svc-sub {
          font-size: 16px; color: rgba(255,255,255,0.38);
          max-width: 480px; margin: 0 auto; line-height: 1.7;
        }

        /* ── Marquee rows ── */
        .marquee-wrap {
          display: flex; flex-direction: column; gap: 16px;
          cursor: default;
        }

        .marquee-track {
          display: flex; gap: 16px;
          width: max-content;
        }

        .marquee-row {
          overflow: hidden;
          position: relative;
        }
        .marquee-row::before,
        .marquee-row::after {
          content: '';
          position: absolute; top: 0; bottom: 0; width: 200px; z-index: 2;
          pointer-events: none;
        }
        .marquee-row::before {
          left: 0;
          background: linear-gradient(90deg, #020408, transparent);
        }
        .marquee-row::after {
          right: 0;
          background: linear-gradient(-90deg, #020408, transparent);
        }

        .marquee-track.row1 {
          animation: scrollLeft 40s linear infinite;
        }
        .marquee-track.row2 {
          animation: scrollRight 35s linear infinite;
        }
        .marquee-track.paused {
          animation-play-state: paused !important;
        }

        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        /* ── Cards ── */
        .svc-card {
          width: 280px; flex-shrink: 0;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 24px;
          display: flex; flex-direction: column; gap: 10px;
          position: relative; overflow: hidden;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
          cursor: pointer;
        }
        .svc-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .svc-card:hover {
          border-color: rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.04);
          transform: translateY(-4px);
        }
        .svc-card:hover::before { opacity: 0.7; }

        .sc-top {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 4px;
        }
        .sc-icon {
          width: 38px; height: 38px; border-radius: 10px;
          border: 1px solid; display: flex; align-items: center; justify-content: center;
          font-size: 17px; flex-shrink: 0;
        }
        .sc-arrow {
          font-size: 14px; color: rgba(255,255,255,0.15);
          transition: color 0.2s, transform 0.2s;
        }
        .svc-card:hover .sc-arrow { color: var(--accent); transform: translateX(3px); }

        .sc-title {
          font-family: 'Syne', sans-serif;
          font-size: 16px; font-weight: 700; color: #fff; margin: 0;
        }
        .sc-desc {
          font-size: 13px; color: rgba(255,255,255,0.35); line-height: 1.65; margin: 0;
        }
        .sc-tags {
          display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;
        }
        .sc-tag {
          font-size: 11px; color: rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          padding: 3px 10px; border-radius: 100px;
        }
        .sc-cta {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 500;
          color: var(--accent); text-decoration: none;
          margin-top: 6px; transition: gap 0.2s;
        }
        .sc-cta:hover { gap: 10px; }

        /* ── Pause hint ── */
        .pause-hint {
          text-align: center; margin-top: 40px;
          font-size: 13px; color: rgba(255,255,255,0.2);
          position: relative; z-index: 1;
          letter-spacing: 0.3px;
        }

        /* ── CTA ── */
        .svc-cta {
          display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;
          margin-top: 56px; padding: 0 24px;
          position: relative; z-index: 1;
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
          border: 1px solid rgba(255,255,255,0.14); color: rgba(255,255,255,0.6);
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          padding: 14px 28px; border-radius: 14px; text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-outline:hover { border-color: rgba(255,255,255,0.3); color: #fff; }

        /* ── Service count strip ── */
        .count-strip {
          display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;
          margin-bottom: 56px; padding: 0 24px;
          position: relative; z-index: 1;
        }
        .count-item {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
        }
        .count-val {
          font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: #fff;
        }
        .count-lbl {
          font-size: 12px; color: rgba(255,255,255,0.3); letter-spacing: 0.3px;
        }
        .count-divider {
          width: 1px; background: rgba(255,255,255,0.08); align-self: stretch;
        }
      `}</style>

      <section className="svc-section">

        {/* Header */}
        <div className="svc-header">
          <div className="eyebrow">
            <span className="e-dot" />
            What We Offer
          </div>
          <h2 className="svc-h2">
            One Agency.<br />
            <span className="grad">Every Service You Need.</span>
          </h2>
          <p className="svc-sub">
            From websites to AI chatbots — we cover every touchpoint of your digital growth.
          </p>
        </div>

        {/* Count strip */}
        <div className="count-strip">
          {[
            { val: "8+", lbl: "Services" },
            { val: "50+", lbl: "Projects Done" },
            { val: "20+", lbl: "Happy Clients" },
            { val: "3x", lbl: "Avg. ROI" },
          ].map((c, i, arr) => (
            <Fragment key={c.lbl}>
              <div className="count-item">
                <span className="count-val">{c.val}</span>
                <span className="count-lbl">{c.lbl}</span>
              </div>
              {i < arr.length - 1 && <div className="count-divider" />}
            </Fragment>
          ))}
        </div>

        {/* Marquee */}
        <div
          className="marquee-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Row 1 — left */}
          <div className="marquee-row">
            <div className={`marquee-track row1 ${paused ? "paused" : ""}`}>
              {ROW1.map((s, i) => (
                <ServiceCard key={`r1-${i}`} s={s} paused={paused} />
              ))}
            </div>
          </div>

          {/* Row 2 — right */}
          <div className="marquee-row">
            <div className={`marquee-track row2 ${paused ? "paused" : ""}`}>
              {ROW2.map((s, i) => (
                <ServiceCard key={`r2-${i}`} s={s} paused={paused} />
              ))}
            </div>
          </div>
        </div>

        <p className="pause-hint">Hover to pause</p>

        {/* CTA */}
        <div className="svc-cta">
          <Link href="/services" className="btn-primary">
            View All Services →
          </Link>
          <Link href="/contact" className="btn-outline">
            Get Free Quote
          </Link>
        </div>

      </section>
    </>
  );
}