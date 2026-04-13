/* eslint-disable react-hooks/refs */
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    title: "Business Website",
    category: "Web Dev",
    desc: "Lightning-fast Next.js website with SEO optimisation, CMS, and 98+ Lighthouse score.",
    tags: ["Next.js", "SEO", "CMS"],
    accent: "#00d2b4",
    icon: "⬡",
    stat: "98", statLabel: "Lighthouse",
    size: "large",
  },
  {
    title: "E-Commerce Store",
    category: "Web Dev",
    desc: "High-performance Shopify store with Stripe integration and 2.4s load time.",
    tags: ["Shopify", "Stripe", "UI/UX"],
    accent: "#00d2b4",
    icon: "◈",
    stat: "2.4s", statLabel: "Load Time",
    size: "small",
  },
  {
    title: "Google Ads Campaign",
    category: "Marketing",
    desc: "Full-funnel Google Ads campaign that generated 320+ qualified leads in 30 days.",
    tags: ["Google Ads", "PPC", "Analytics"],
    accent: "#7050ff",
    icon: "◉",
    stat: "320+", statLabel: "Leads / 30d",
    size: "small",
  },
  {
    title: "Instagram Growth",
    category: "Social Media",
    desc: "Organic growth strategy + content calendar that tripled engagement in 60 days.",
    tags: ["Instagram", "Content", "Growth"],
    accent: "#ff5096",
    icon: "▣",
    stat: "3x", statLabel: "Engagement",
    size: "small",
  },
  {
    title: "Reels Editing Project",
    category: "Creative",
    desc: "40+ short-form videos produced for brand campaigns with avg. 85K reach per reel.",
    tags: ["Reels", "Motion", "Editing"],
    accent: "#ff5096",
    icon: "▶",
    stat: "85K", statLabel: "Avg. Reach",
    size: "small",
  },
  {
    title: "Logo & Branding",
    category: "Design",
    desc: "Complete brand identity — logo, colour palette, typography, and full brand guide.",
    tags: ["Logo", "Brand Kit", "Style Guide"],
    accent: "#00d2b4",
    icon: "✦",
    stat: "100%", statLabel: "Client Sat.",
    size: "large",
  },
  {
    title: "AI Lead Chatbot",
    category: "AI Solutions",
    desc: "GPT-4 powered chatbot deployed on client website — captures 3x more leads than forms.",
    tags: ["GPT-4", "WhatsApp", "Web"],
    accent: "#00b4ff",
    icon: "⬡",
    stat: "3x", statLabel: "More Leads",
    size: "small",
  },
  {
    title: "AI Content System",
    category: "AI Solutions",
    desc: "Automated content pipeline generating 30 on-brand posts per week with zero manual effort.",
    tags: ["Automation", "AI", "Make.com"],
    accent: "#00b4ff",
    icon: "◆",
    stat: "30/wk", statLabel: "Posts Auto",
    size: "small",
  },
];

const FILTERS = ["All", "Web Dev", "Marketing", "Social Media", "Creative", "Design", "AI Solutions"];

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

export default function PortfolioPage() {
  const [active, setActive] = useState("All");
  const [displayed, setDisplayed] = useState(PROJECTS);
  const [animating, setAnimating] = useState(false);
  const header = useInView(0.1);
  const grid = useInView(0.05);
  const cta = useInView(0.1);

  const handleFilter = (f: string) => {
    if (f === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(f);
      setDisplayed(f === "All" ? PROJECTS : PROJECTS.filter(p => p.category === f));
      setAnimating(false);
    }, 250);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .port-page { background: #020408; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }

        /* fade */
        .fade-up { opacity:0; transform:translateY(28px); transition:opacity .65s ease,transform .65s ease; }
        .fade-up.in { opacity:1; transform:translateY(0); }
        .fd1{transition-delay:.08s} .fd2{transition-delay:.16s} .fd3{transition-delay:.24s}
        .fd4{transition-delay:.1s}  .fd5{transition-delay:.2s}  .fd6{transition-delay:.3s}

        /* ── HERO ── */
        .port-hero {
          position:relative; padding:148px 24px 80px; text-align:center; overflow:hidden;
        }
        .port-hero::before {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(ellipse 55% 50% at 50% 0%, rgba(0,210,180,0.09), transparent 65%),
            radial-gradient(ellipse 40% 40% at 80% 60%, rgba(112,80,255,0.07), transparent 60%);
          pointer-events:none;
        }
        .ph-grid {
          position:absolute; inset:0;
          background-image:linear-gradient(rgba(0,210,180,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,210,180,0.03) 1px,transparent 1px);
          background-size:60px 60px;
          mask-image:radial-gradient(ellipse 80% 80% at 50% 0%,black 20%,transparent 100%);
          pointer-events:none;
        }
        .eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(0,210,180,.08); border:1px solid rgba(0,210,180,.2);
          color:#00d2b4; font-size:13px; font-weight:500;
          padding:6px 16px; border-radius:100px; margin-bottom:20px;
        }
        .e-dot { width:6px;height:6px;border-radius:50%;background:#00d2b4;animation:blink 1.5s ease-in-out infinite; }
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
        .port-h1 {
          font-family:'Syne',sans-serif; font-size:clamp(40px,6vw,72px); font-weight:800;
          line-height:1.05; margin:0 auto 20px; max-width:760px; color:#fff;
        }
        .grad { background:linear-gradient(135deg,#00d2b4,#7050ff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .port-sub { font-size:clamp(15px,2vw,17px); color:rgba(255,255,255,.4); max-width:480px; margin:0 auto; line-height:1.75; }

        /* count pills */
        .port-pills {
          display:flex; justify-content:center; gap:12px; flex-wrap:wrap; margin-top:32px; position:relative; z-index:1;
        }
        .port-pill {
          display:flex; align-items:center; gap:8px;
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08);
          border-radius:100px; padding:8px 18px; font-size:13px; color:rgba(255,255,255,.45);
        }
        .pill-dot { width:6px;height:6px;border-radius:50%; }

        /* ── FILTER TABS ── */
        .filter-wrap {
          max-width:1100px; margin:0 auto; padding:0 24px 56px;
          display:flex; justify-content:center; flex-wrap:wrap; gap:8px;
          position:relative; z-index:1;
        }
        .filter-btn {
          font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
          padding:8px 18px; border-radius:100px; cursor:pointer; border:none; outline:none;
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08);
          color:rgba(255,255,255,.45);
          transition:background .2s,border-color .2s,color .2s,transform .15s;
        }
        .filter-btn:hover { background:rgba(255,255,255,.08); color:rgba(255,255,255,.8); }
        .filter-btn.active {
          background:rgba(0,210,180,.1); border-color:rgba(0,210,180,.3);
          color:#00d2b4;
        }
        .filter-btn:active { transform:scale(.97); }

        /* ── GRID ── */
        .port-grid {
          max-width:1100px; margin:0 auto; padding:0 24px;
          display:grid; grid-template-columns:repeat(3,1fr); gap:14px;
          transition:opacity .25s ease;
        }
        .port-grid.fading { opacity:0; }
        @media(max-width:900px){ .port-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:540px){ .port-grid{ grid-template-columns:1fr; } }

        /* ── CARD ── */
        .port-card {
          position:relative; overflow:hidden;
          background:rgba(255,255,255,.022);
          border:1px solid rgba(255,255,255,.07);
          border-radius:22px; padding:28px;
          display:flex; flex-direction:column; gap:14px;
          min-height:260px;
          transition:border-color .3s,transform .3s,background .3s;
        }
        .port-card-large { grid-column:span 2; }
        @media(max-width:900px){ .port-card-large{ grid-column:span 1; } }

        /* shimmer top line */
        .port-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,var(--accent),transparent);
          opacity:0; transition:opacity .3s;
        }
        /* bg blob */
        .port-card::after {
          content:''; position:absolute; width:220px; height:220px; border-radius:50%;
          background:radial-gradient(circle,var(--accent),transparent 70%);
          opacity:0; transition:opacity .4s;
          top:-60px; right:-60px; pointer-events:none;
        }
        .port-card:hover { border-color:rgba(255,255,255,.13); transform:translateY(-5px); background:rgba(255,255,255,.036); }
        .port-card:hover::before { opacity:.7; }
        .port-card:hover::after { opacity:.06; }

        /* card inner */
        .card-top { display:flex; align-items:flex-start; justify-content:space-between; }
        .card-icon {
          width:42px; height:42px; border-radius:12px; border:1px solid;
          display:flex; align-items:center; justify-content:center; font-size:18px;
          transition:transform .3s;
        }
        .port-card:hover .card-icon { transform:rotate(6deg) scale(1.08); }

        .card-stat { display:flex; flex-direction:column; align-items:flex-end; gap:1px; }
        .cs-val { font-family:'Syne',sans-serif; font-size:20px; font-weight:800; line-height:1; }
        .cs-lbl { font-size:10px; color:rgba(255,255,255,.22); letter-spacing:.5px; text-transform:uppercase; }

        .card-cat {
          font-size:11px; font-weight:500; letter-spacing:1.5px; text-transform:uppercase;
          color:rgba(255,255,255,.25);
        }
        .card-title { font-family:'Syne',sans-serif; font-size:18px; font-weight:700; color:#fff; margin:0; line-height:1.2; }
        .card-desc { font-size:13.5px; color:rgba(255,255,255,.36); line-height:1.7; margin:0; flex:1; }

        .card-tags { display:flex; flex-wrap:wrap; gap:6px; }
        .c-tag {
          font-size:11px; color:rgba(255,255,255,.28);
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07);
          padding:3px 10px; border-radius:100px;
        }
        .card-link {
          display:inline-flex; align-items:center; gap:6px;
          font-size:13px; font-weight:500;
          color:var(--accent); text-decoration:none;
          transition:gap .2s;
        }
        .card-link:hover { gap:10px; }

        /* corner watermark */
        .card-watermark {
          position:absolute; bottom:-12px; right:14px;
          font-family:'Syne',sans-serif; font-size:72px; font-weight:800;
          color:rgba(255,255,255,.025); line-height:1; pointer-events:none;
          transition:color .3s;
        }
        .port-card:hover .card-watermark { color:rgba(255,255,255,.04); }

        /* ── EMPTY STATE ── */
        .empty-state {
          grid-column:1/-1; text-align:center; padding:60px 24px;
          color:rgba(255,255,255,.25); font-size:15px;
        }

        /* ── CTA ── */
        .port-cta-wrap { padding:80px 24px; }
        .port-cta-box {
          max-width:1100px; margin:0 auto;
          position:relative; overflow:hidden;
          border-radius:28px; padding:72px 40px; text-align:center;
          background:linear-gradient(135deg,rgba(0,210,180,.06),rgba(112,80,255,.06));
          border:1px solid rgba(0,210,180,.14);
        }
        .port-cta-box::before {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(ellipse 60% 80% at 15% 50%,rgba(0,210,180,.1),transparent 60%),
            radial-gradient(ellipse 60% 80% at 85% 50%,rgba(112,80,255,.1),transparent 60%);
          pointer-events:none;
        }
        .cta-h2 {
          font-family:'Syne',sans-serif; font-size:clamp(28px,4vw,48px); font-weight:800;
          line-height:1.08; margin:0 0 14px; position:relative; z-index:1; color:#fff;
        }
        .cta-p { font-size:16px; color:rgba(255,255,255,.4); margin:0 0 36px; position:relative; z-index:1; }
        .cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; position:relative; z-index:1; }
        .btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          background:linear-gradient(135deg,#00d2b4,#00a896);
          color:#020408; font-family:'DM Sans',sans-serif;
          font-size:15px; font-weight:500;
          padding:14px 28px; border-radius:14px; text-decoration:none;
          transition:transform .2s,box-shadow .2s;
        }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 0 28px rgba(0,210,180,.3); }
        .btn-outline {
          display:inline-flex; align-items:center; gap:8px;
          border:1px solid rgba(255,255,255,.14); color:rgba(255,255,255,.65);
          font-family:'DM Sans',sans-serif; font-size:15px;
          padding:14px 28px; border-radius:14px; text-decoration:none;
          transition:border-color .2s,color .2s;
        }
        .btn-outline:hover { border-color:rgba(255,255,255,.3); color:#fff; }
      `}</style>

      <main className="port-page">

        {/* ── HERO ── */}
        <section className="port-hero">
          <div className="ph-grid" />
          <div ref={header.ref} className={`fade-up ${header.inView ? "in" : ""}`} style={{ position: "relative", zIndex: 1 }}>
            <div className="eyebrow"><span className="e-dot" />Our Work</div>
            <h1 className="port-h1">
              Projects That<br />
              <span className="grad">Actually Delivered.</span>
            </h1>
            <p className="port-sub">
              Real work. Real results. A showcase across development, marketing, design, and AI.
            </p>
            <div className="port-pills">
              {[
                { dot: "#00d2b4", label: "8 Projects" },
                { dot: "#7050ff", label: "4 Categories" },
                { dot: "#ff5096", label: "20+ Happy Clients" },
                { dot: "#00b4ff", label: "100% Satisfaction" },
              ].map((p) => (
                <div className="port-pill" key={p.label}>
                  <span className="pill-dot" style={{ background: p.dot }} />
                  {p.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FILTERS ── */}
        <div className="filter-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${active === f ? "active" : ""}`}
              onClick={() => handleFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── GRID ── */}
        <div ref={grid.ref} className={`port-grid ${animating ? "fading" : ""}`}>
          {displayed.length === 0 && (
            <div className="empty-state">No projects in this category yet.</div>
          )}
          {displayed.map((p, i) => (
            <div
              key={p.title}
              className={`port-card ${p.size === "large" ? "port-card-large" : ""} fade-up fd${(i % 3) + 1} ${grid.inView ? "in" : ""}`}
              style={{ ["--accent" as string]: p.accent }}
            >
              <div className="card-top">
                <div
                  className="card-icon"
                  style={{ color: p.accent, borderColor: `${p.accent}28`, background: `${p.accent}10` }}
                >
                  {p.icon}
                </div>
                <div className="card-stat">
                  <span className="cs-val" style={{ color: p.accent }}>{p.stat}</span>
                  <span className="cs-lbl">{p.statLabel}</span>
                </div>
              </div>

              <div>
                <p className="card-cat">{p.category}</p>
                <h3 className="card-title">{p.title}</h3>
              </div>

              <p className="card-desc">{p.desc}</p>

              <div className="card-tags">
                {p.tags.map((t) => <span className="c-tag" key={t}>{t}</span>)}
              </div>

              <Link href="/contact" className="card-link">
                Get Similar Project →
              </Link>

              <span className="card-watermark">{String(i + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="port-cta-wrap" ref={cta.ref}>
          <div className={`port-cta-box fade-up ${cta.inView ? "in" : ""}`}>
            <h2 className="cta-h2">
              Have a Project<br />
              <span className="grad">In Mind?</span>
            </h2>
            <p className="cta-p">
              Let&apos;s build something great together. Book a free call — no pressure, no fluff.
            </p>
            <div className="cta-btns">
              <Link href="/contact" className="btn-primary">
                Start Your Project →
              </Link>
              <Link href="/services" className="btn-outline">
                View Services
              </Link>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}