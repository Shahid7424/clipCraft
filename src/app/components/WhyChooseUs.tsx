/* eslint-disable react-hooks/refs */
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  {
    title: "Result-Focused Strategy",
    desc: "We measure success only by your revenue, leads, and conversions — never by vanity metrics. Every campaign is built around a clear, trackable goal.",
    icon: "◈",
    accent: "#00d2b4",
    size: "large", // spans 2 cols
    stat: "3x ROI",
    statSub: "average client growth",
  },
  {
    title: "AI-Powered Solutions",
    desc: "We integrate AI to automate workflows, cut costs, and scale 10x faster than traditional agencies.",
    icon: "✦",
    accent: "#00b4ff",
    size: "small",
    stat: "10x",
    statSub: "faster output",
  },
  {
    title: "Fast & Reliable",
    desc: "Most projects delivered within 7 days. Zero delays, zero excuses.",
    icon: "▶",
    accent: "#7050ff",
    size: "small",
    stat: "7 days",
    statSub: "avg. delivery",
  },
  {
    title: "All-in-One Agency",
    desc: "Dev, marketing, design, AI — one team, zero handoff friction.",
    icon: "⬡",
    accent: "#ff5096",
    size: "small",
    stat: "8+",
    statSub: "services",
  },
  {
    title: "Creative & Modern Design",
    desc: "Visuals that stop the scroll and build brands people remember and trust for years.",
    icon: "◉",
    accent: "#00d2b4",
    size: "small",
    stat: "50+",
    statSub: "projects done",
  },
  {
    title: "Dedicated Support",
    desc: "We stay connected 24/7 — we don't ghost clients after delivery. Your growth is our ongoing mission.",
    icon: "◆",
    accent: "#7050ff",
    size: "large",
    stat: "24/7",
    statSub: "always available",
  },
];

function useInView(threshold = 0.1) {
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

export default function WhyChooseUs() {
  const header = useInView(0.1);
  const bento = useInView(0.06);
  const cta = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .why-section {
          background: #030509;
          padding: 110px 24px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .why-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 50% 60% at 80% 20%, rgba(112,80,255,0.07), transparent 60%),
            radial-gradient(ellipse 40% 50% at 10% 80%, rgba(0,210,180,0.06), transparent 60%);
          pointer-events: none;
        }

        /* dot grid */
        .dot-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 36px 36px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
        }

        .why-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }

        /* fade */
        .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .fade-up.in { opacity: 1; transform: translateY(0); }
        .fd1{transition-delay:0.06s} .fd2{transition-delay:0.14s} .fd3{transition-delay:0.22s}
        .fd4{transition-delay:0.1s} .fd5{transition-delay:0.18s} .fd6{transition-delay:0.26s}

        /* header */
        .why-header { text-align: center; margin-bottom: 64px; }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,210,180,0.08); border: 1px solid rgba(0,210,180,0.2);
          color: #00d2b4; font-size: 13px; font-weight: 500;
          padding: 6px 16px; border-radius: 100px; margin-bottom: 20px;
        }
        .e-dot { width:6px; height:6px; border-radius:50%; background:#00d2b4; animation:blink 1.5s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .why-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px,5vw,56px); font-weight:800;
          color:#fff; line-height:1.06; margin:0 0 16px;
        }
        .grad { background:linear-gradient(135deg,#00d2b4,#7050ff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .why-sub { font-size:16px; color:rgba(255,255,255,0.38); max-width:440px; margin:0 auto; line-height:1.7; }

        /* ── BENTO GRID ── */
        .bento {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto auto;
          gap: 14px;
        }
        @media(max-width:860px){ .bento{ grid-template-columns: repeat(2,1fr); } .bento-large{ grid-column: span 2 !important; } }
        @media(max-width:520px){ .bento{ grid-template-columns: 1fr; } .bento-large{ grid-column: span 1 !important; } }

        .bento-cell {
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.022);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 22px;
          padding: 28px;
          display: flex; flex-direction: column; justify-content: space-between; gap: 18px;
          min-height: 220px;
          transition: border-color 0.3s, transform 0.3s, background 0.3s;
        }
        .bento-large { grid-column: span 2; min-height: 240px; }

        /* glow on hover */
        .bento-cell::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0; transition: opacity 0.35s;
        }
        /* bg glow blob */
        .bento-cell::after {
          content: '';
          position: absolute; width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent), transparent 70%);
          opacity: 0; transition: opacity 0.4s;
          top: -60px; right: -60px; pointer-events: none;
        }
        .bento-cell:hover { border-color: rgba(255,255,255,0.13); transform: translateY(-4px); background: rgba(255,255,255,0.035); }
        .bento-cell:hover::before { opacity: 0.7; }
        .bento-cell:hover::after { opacity: 0.07; }

        /* cell top */
        .cell-top { display: flex; align-items: flex-start; justify-content: space-between; }
        .cell-icon {
          width: 44px; height: 44px; border-radius: 13px; border: 1px solid;
          display: flex; align-items: center; justify-content: center; font-size: 19px;
          transition: transform 0.3s;
        }
        .bento-cell:hover .cell-icon { transform: rotate(8deg) scale(1.08); }

        /* stat pill */
        .cell-stat {
          display: flex; flex-direction: column; align-items: flex-end; gap: 1px;
        }
        .stat-num {
          font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800;
          line-height: 1;
        }
        .stat-sub { font-size: 10px; color: rgba(255,255,255,0.22); letter-spacing:0.5px; text-transform:uppercase; }

        /* text */
        .cell-body { display: flex; flex-direction: column; gap: 8px; }
        .cell-title { font-family:'Syne',sans-serif; font-size:18px; font-weight:700; color:#fff; margin:0; line-height:1.2; }
        .cell-desc { font-size:13.5px; color:rgba(255,255,255,0.36); line-height:1.7; margin:0; }

        /* large cell extra */
        .bento-large .cell-desc { max-width: 500px; }
        .cell-tag {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12px; color: var(--accent);
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          padding: 5px 12px; border-radius: 100px; width: fit-content;
          margin-top: 4px;
        }
        .tag-dot { width:5px;height:5px;border-radius:50%;background:currentColor; }

        /* animated corner number */
        .corner-num {
          position: absolute; bottom: -10px; right: 16px;
          font-family: 'Syne', sans-serif; font-size: 80px; font-weight: 800;
          color: rgba(255,255,255,0.025); line-height: 1; pointer-events: none;
          transition: color 0.3s;
        }
        .bento-cell:hover .corner-num { color: rgba(255,255,255,0.04); }

        /* ── CTA ── */
        .why-cta {
          display: flex; justify-content:center; gap:14px; flex-wrap:wrap;
          margin-top: 60px;
        }
        .btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          background:linear-gradient(135deg,#00d2b4,#00a896);
          color:#020408; font-family:'DM Sans',sans-serif;
          font-size:15px; font-weight:500;
          padding:14px 28px; border-radius:14px; text-decoration:none;
          transition:transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 0 28px rgba(0,210,180,0.3); }
        .btn-outline {
          display:inline-flex; align-items:center; gap:8px;
          border:1px solid rgba(255,255,255,0.13); color:rgba(255,255,255,0.6);
          font-family:'DM Sans',sans-serif; font-size:15px;
          padding:14px 28px; border-radius:14px; text-decoration:none;
          transition:border-color 0.2s, color 0.2s;
        }
        .btn-outline:hover { border-color:rgba(255,255,255,0.28); color:#fff; }

        /* bottom trust row */
        .trust-row {
          display:flex; justify-content:center; align-items:center; gap:28px; flex-wrap:wrap;
          margin-top:48px; padding-top:36px;
          border-top:1px solid rgba(255,255,255,0.05);
          font-size:13px; color:rgba(255,255,255,0.28);
        }
        .trust-item { display:flex; align-items:center; gap:8px; }
        .trust-check { color:#00d2b4; font-size:14px; }
      `}</style>

      <section className="why-section">
        <div className="dot-grid" />
        <div className="why-inner">

          {/* Header */}
          <div ref={header.ref} className={`why-header fade-up ${header.inView ? "in" : ""}`}>
            <div className="eyebrow"><span className="e-dot" /> Our Edge</div>
            <h2 className="why-h2">
              Why Brands Choose<br />
              <span className="grad">ClipCraft Over Others</span>
            </h2>
            <p className="why-sub">
              We don&apos;t just provide services — we build systems that grow your business.
            </p>
          </div>

          {/* Bento Grid */}
          <div ref={bento.ref} className="bento">
            {ITEMS.map((item, i) => (
              <div
                key={item.title}
                className={`bento-cell ${item.size === "large" ? "bento-large" : ""} fade-up fd${(i % 3) + 1} ${bento.inView ? "in" : ""}`}
                style={{ ["--accent" as string]: item.accent }}
              >
                <div className="cell-top">
                  <div
                    className="cell-icon"
                    style={{ color: item.accent, borderColor: `${item.accent}28`, background: `${item.accent}10` }}
                  >
                    {item.icon}
                  </div>
                  <div className="cell-stat">
                    <span className="stat-num" style={{ color: item.accent }}>{item.stat}</span>
                    <span className="stat-sub">{item.statSub}</span>
                  </div>
                </div>

                <div className="cell-body">
                  <h3 className="cell-title">{item.title}</h3>
                  <p className="cell-desc">{item.desc}</p>
                  {item.size === "large" && (
                    <div className="cell-tag">
                      <span className="tag-dot" />
                      Included in every plan
                    </div>
                  )}
                </div>

                <span className="corner-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={cta.ref} className={`why-cta fade-up ${cta.inView ? "in" : ""}`}>
            <Link href="/contact" className="btn-primary">
              Let&apos;s Work Together →
            </Link>
            <Link href="/services" className="btn-outline">
              Explore Services
            </Link>
          </div>

          {/* Trust row */}
          <div className={`trust-row fade-up ${cta.inView ? "in" : ""}`} style={{ transitionDelay: "0.15s" }}>
            {["No contracts", "Transparent pricing", "Free strategy call", "Results guaranteed"].map((t) => (
              <div className="trust-item" key={t}>
                <span className="trust-check">✓</span>
                {t}
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}