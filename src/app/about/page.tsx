/* eslint-disable react-hooks/refs */
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    icon: "⬡",
    title: "Web Development",
    desc: "Blazing-fast websites & web apps engineered for conversions, SEO, and scale.",
    tags: ["Next.js", "React", "Shopify"],
  },
  {
    icon: "◈",
    title: "Performance Ads",
    desc: "Google & Meta ad campaigns built to maximise ROI — every rupee tracked.",
    tags: ["Google Ads", "Meta Ads", "Analytics"],
  },
  {
    icon: "◉",
    title: "Creative Content",
    desc: "Reels, motion graphics & brand visuals that stop the scroll and drive action.",
    tags: ["Reels", "Branding", "Design"],
  },
];

const WHY_US = [
  {
    num: "01",
    title: "Fast Execution",
    desc: "We move fast. Most projects go live within days, not months. Zero bloat, all output.",
  },
  {
    num: "02",
    title: "Results First",
    desc: "We don't sell services — we sell outcomes. Leads, revenue, growth. That's our metric.",
  },
  {
    num: "03",
    title: "Always On Support",
    desc: "Dedicated support that doesn't ghost you. We stay in the loop every step of the way.",
  },
  {
    num: "04",
    title: "Data Driven",
    desc: "Every decision backed by real data. A/B tests, heatmaps, analytics — no guesswork.",
  },
];

const NUMBERS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "20+", label: "Happy Clients" },
  { value: "3x", label: "Avg. ROI Growth" },
  { value: "98%", label: "Satisfaction Rate" },
];

function useInView(threshold = 0.15) {
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

export default function AboutPage() {
  const hero = useInView(0.1);
  const story = useInView(0.1);
  const services = useInView(0.1);
  const why = useInView(0.1);
  const numbers = useInView(0.1);
  const cta = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap');

        .about-page {
          background: #020408;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        /* ── Section fade-in ── */
        .fade-up {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.in { opacity: 1; transform: translateY(0); }
        .fade-up.d1 { transition-delay: 0.1s; }
        .fade-up.d2 { transition-delay: 0.2s; }
        .fade-up.d3 { transition-delay: 0.3s; }
        .fade-up.d4 { transition-delay: 0.4s; }

        /* ── Global layout ── */
        .section { padding: 100px 24px; max-width: 1100px; margin: 0 auto; }
        .section-sm { padding: 60px 24px; max-width: 1100px; margin: 0 auto; }

        /* ── HERO ── */
        .about-hero {
          position: relative;
          padding: 140px 24px 100px;
          text-align: center;
          overflow: hidden;
        }
        .about-hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,210,180,0.1) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 60%, rgba(112,80,255,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,210,180,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,210,180,0.035) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 30%, transparent 100%);
          pointer-events: none;
        }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,210,180,0.08);
          border: 1px solid rgba(0,210,180,0.2);
          color: #00d2b4;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 13px; font-weight: 500;
          margin-bottom: 28px;
        }
        .eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #00d2b4;
          animation: blink 1.5s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

        .about-h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 800;
          line-height: 1.06;
          margin: 0 auto 24px;
          max-width: 800px;
        }
        .grad-text {
          background: linear-gradient(135deg, #00d2b4, #7050ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .about-sub {
          font-size: clamp(15px, 2vw, 18px);
          color: rgba(255,255,255,0.45);
          max-width: 540px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ── NUMBERS BAR ── */
        .numbers-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
          margin: 0 24px;
          max-width: 1100px;
          margin-left: auto; margin-right: auto;
        }
        .num-cell {
          background: rgba(255,255,255,0.02);
          padding: 32px 20px;
          text-align: center;
          transition: background 0.2s;
        }
        .num-cell:hover { background: rgba(0,210,180,0.04); }
        .num-val {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 700;
          color: #fff;
          line-height: 1;
          margin-bottom: 8px;
        }
        .num-lbl {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }
        @media(max-width:640px){ .numbers-bar{grid-template-columns:repeat(2,1fr);} }

        /* ── STORY ── */
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        @media(max-width:768px){ .story-grid{grid-template-columns:1fr;} }

        .section-label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #00d2b4;
          margin-bottom: 16px;
        }
        .section-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 800;
          line-height: 1.1;
          margin: 0 0 20px;
        }
        .section-p {
          font-size: 16px;
          color: rgba(255,255,255,0.45);
          line-height: 1.8;
          margin-bottom: 16px;
        }

        /* Visual card */
        .story-visual {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(0,210,180,0.06), rgba(112,80,255,0.06));
          border: 1px solid rgba(255,255,255,0.07);
          padding: 40px;
          min-height: 320px;
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .story-visual::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 30% 30%, rgba(0,210,180,0.08), transparent 70%);
        }
        .sv-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(0,210,180,0.1);
          border: 1px solid rgba(0,210,180,0.2);
          color: #00d2b4;
          font-size: 12px; font-weight: 500;
          padding: 5px 12px; border-radius: 100px;
          width: fit-content;
        }
        .sv-number {
          font-family: 'Syne', sans-serif;
          font-size: 56px; font-weight: 800;
          color: rgba(255,255,255,0.06);
          line-height: 1;
          position: absolute; bottom: 24px; right: 28px;
        }
        .sv-metrics {
          display: flex; flex-direction: column; gap: 16px;
          position: relative; z-index: 1; margin-top: 24px;
        }
        .sv-metric {
          display: flex; align-items: center; gap: 14px;
        }
        .sv-bar-wrap {
          flex: 1; height: 4px;
          background: rgba(255,255,255,0.06); border-radius: 100px;
        }
        .sv-bar {
          height: 100%; border-radius: 100px;
          background: linear-gradient(90deg, #00d2b4, #7050ff);
          animation: barGrow 1.5s cubic-bezier(0.16,1,0.3,1) forwards;
          transform-origin: left;
          transform: scaleX(0);
        }
        @keyframes barGrow { to { transform: scaleX(1); } }
        .sv-bar.d1 { animation-delay: 0.3s; }
        .sv-bar.d2 { animation-delay: 0.5s; }
        .sv-bar.d3 { animation-delay: 0.7s; }
        .sv-metric-label { font-size: 13px; color: rgba(255,255,255,0.4); white-space: nowrap; }
        .sv-metric-val { font-size: 13px; font-weight: 500; color: #00d2b4; }

        /* ── SERVICES ── */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 48px;
        }
        @media(max-width:768px){ .services-grid{grid-template-columns:1fr;} }

        .service-card {
          position: relative;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 32px 28px;
          overflow: hidden;
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
          cursor: default;
        }
        .service-card::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 50% at 0% 0%, rgba(0,210,180,0.07), transparent 70%);
          opacity: 0; transition: opacity 0.3s;
        }
        .service-card:hover { border-color: rgba(0,210,180,0.2); background: rgba(0,210,180,0.03); transform: translateY(-4px); }
        .service-card:hover::before { opacity: 1; }

        .sc-icon {
          font-size: 28px; color: #00d2b4; margin-bottom: 20px; display: block;
          line-height: 1;
        }
        .sc-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px; font-weight: 700;
          margin: 0 0 12px; color: #fff;
        }
        .sc-desc {
          font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.7; margin: 0 0 20px;
        }
        .sc-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .sc-tag {
          font-size: 11px; font-weight: 500; letter-spacing: 0.5px;
          color: rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 4px 10px; border-radius: 100px;
        }

        /* ── WHY US ── */
        .why-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 48px;
        }
        @media(max-width:640px){ .why-grid{grid-template-columns:1fr;} }

        .why-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 28px;
          display: flex; gap: 20px;
          transition: border-color 0.2s, background 0.2s;
        }
        .why-card:hover {
          border-color: rgba(0,210,180,0.15);
          background: rgba(0,210,180,0.02);
        }
        .why-num {
          font-family: 'Syne', sans-serif;
          font-size: 13px; font-weight: 700;
          color: #00d2b4; opacity: 0.6;
          flex-shrink: 0; padding-top: 2px;
          letter-spacing: 1px;
        }
        .why-title {
          font-family: 'Syne', sans-serif;
          font-size: 17px; font-weight: 700;
          color: #fff; margin: 0 0 8px;
        }
        .why-desc {
          font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.7; margin: 0;
        }

        /* ── CTA ── */
        .cta-section {
          position: relative;
          margin: 0 24px 80px;
          max-width: 1100px; margin-left: auto; margin-right: auto;
          border-radius: 28px;
          overflow: hidden;
          padding: 72px 40px;
          text-align: center;
          background: linear-gradient(135deg, rgba(0,210,180,0.07) 0%, rgba(112,80,255,0.07) 100%);
          border: 1px solid rgba(0,210,180,0.15);
        }
        .cta-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 80% at 20% 50%, rgba(0,210,180,0.1), transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 50%, rgba(112,80,255,0.1), transparent 60%);
          pointer-events: none;
        }
        .cta-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 48px); font-weight: 800;
          line-height: 1.1; margin: 0 0 16px;
          position: relative; z-index: 1;
        }
        .cta-p {
          font-size: 16px; color: rgba(255,255,255,0.45);
          margin: 0 0 36px; position: relative; z-index: 1;
        }
        .cta-btns {
          display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;
          position: relative; z-index: 1;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #00d2b4, #00a896);
          color: #020408; font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 500;
          padding: 14px 28px; border-radius: 14px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 28px rgba(0,210,180,0.3); }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.7); font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 400;
          padding: 14px 28px; border-radius: 14px;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-outline:hover { border-color: rgba(255,255,255,0.3); color: #fff; }

        /* divider */
        .divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent);
          margin: 0 24px; max-width: 1100px; margin-left: auto; margin-right: auto;
        }
      `}</style>

      <main className="about-page">

        {/* ── HERO ── */}
        <section className="about-hero" id = "about">
          <div className="grid-bg" />
          <div ref={hero.ref} className={`fade-up ${hero.inView ? "in" : ""}`} style={{ position: "relative", zIndex: 1 }}>
            <div className="hero-eyebrow">
              <span className="eyebrow-dot" />
              Who We Are
            </div>
            <h1 className="about-h1">
              A Team That Turns
              <br />
              <span className="grad-text">Ideas into Revenue</span>
            </h1>
            <p className="about-sub">
              We&apos;re a results-obsessed digital agency — combining design, tech, and marketing to build systems that grow businesses.
            </p>
          </div>
        </section>

        {/* ── NUMBERS ── */}
        <div ref={numbers.ref} className={`fade-up ${numbers.inView ? "in" : ""}`}>
          <div className="numbers-bar">
            {NUMBERS.map((n) => (
              <div className="num-cell" key={n.label}>
                <div className="num-val">{n.value}</div>
                <div className="num-lbl">{n.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── STORY ── */}
        <div className="section">
          <div ref={story.ref} className={`story-grid fade-up ${story.inView ? "in" : ""}`}>
            <div>
              <div className="section-label">Our Story</div>
              <h2 className="section-h2">
                Built to Help<br />Brands <span className="grad-text">Win Online</span>
              </h2>
              <p className="section-p">
                ClipCraft was born from a simple frustration — too many agencies deliver decks, not results. We started with a mission to be different: move fast, be transparent, and only charge for what actually moves the needle.
              </p>
              <p className="section-p">
                From launching e-commerce brands to scaling local businesses with performance ads and content that converts — we&apos;ve done it all. And we&apos;re just getting started.
              </p>
            </div>

            {/* Animated visual card */}
            <div className="story-visual">
              <div className="sv-tag">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d2b4", display: "inline-block" }} />
                Live Performance
              </div>
              <div className="sv-metrics">
                {[
                  { label: "Conversion Rate", val: "+184%", w: "85%" },
                  { label: "Organic Traffic", val: "+210%", w: "92%" },
                  { label: "Ad ROI", val: "3.2x", w: "78%" },
                ].map((m, i) => (
                  <div className="sv-metric" key={m.label}>
                    <span className="sv-metric-label">{m.label}</span>
                    <div className="sv-bar-wrap">
                      <div className={`sv-bar d${i + 1}`} style={{ width: m.w }} />
                    </div>
                    <span className="sv-metric-val">{m.val}</span>
                  </div>
                ))}
              </div>
              <div className="sv-number">3x</div>
            </div>
          </div>
        </div>

        <div className="divider" />

        {/* ── SERVICES ── */}
        <div className="section">
          <div ref={services.ref} className={`fade-up ${services.inView ? "in" : ""}`}>
            <div className="section-label" style={{ textAlign: "center" }}>What We Do</div>
            <h2 className="section-h2" style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 0" }}>
              Full-Stack Digital<br /><span className="grad-text">Growth Services</span>
            </h2>
            <div className="services-grid">
              {SERVICES.map((s, i) => (
                <div className={`service-card fade-up d${i + 1} ${services.inView ? "in" : ""}`} key={s.title}>
                  <span className="sc-icon">{s.icon}</span>
                  <h3 className="sc-title">{s.title}</h3>
                  <p className="sc-desc">{s.desc}</p>
                  <div className="sc-tags">
                    {s.tags.map((t) => <span className="sc-tag" key={t}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="divider" />

        {/* ── WHY US ── */}
        <div className="section">
          <div ref={why.ref} className={`fade-up ${why.inView ? "in" : ""}`}>
            <div className="section-label" style={{ textAlign: "center" }}>Why ClipCraft</div>
            <h2 className="section-h2" style={{ textAlign: "center", maxWidth: 500, margin: "0 auto 0" }}>
              The Agency That<br /><span className="grad-text">Actually Delivers</span>
            </h2>
            <div className="why-grid">
              {WHY_US.map((w, i) => (
                <div className={`why-card fade-up d${(i % 2) + 1} ${why.inView ? "in" : ""}`} key={w.num}>
                  <span className="why-num">{w.num}</span>
                  <div>
                    <h3 className="why-title">{w.title}</h3>
                    <p className="why-desc">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div ref={cta.ref} className={`fade-up ${cta.inView ? "in" : ""}`} style={{ padding: "0 0 80px" }}>
          <div className="cta-section">
            <h2 className="cta-h2">
              Ready to Grow<br /><span className="grad-text">Your Business?</span>
            </h2>
            <p className="cta-p">
              Let&apos;s build something that works. Book a free strategy call — no fluff, no pressure.
            </p>
            <div className="cta-btns">
              <Link href="/contact" className="btn-primary">
                Book Free Strategy Call →
              </Link>
              <Link href="/portfolio" className="btn-outline">
                See Our Work
              </Link>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}