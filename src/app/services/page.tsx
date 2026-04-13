/* eslint-disable react-hooks/refs */
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    category: "Development",
    icon: "⬡",
    accent: "#00d2b4",
    desc: "Scalable digital products engineered for speed, SEO, and conversions.",
    items: [
      {
        title: "Web Development",
        desc: "Lightning-fast, SEO-optimised websites built with Next.js & React that rank and convert.",
        tags: ["Next.js", "React", "SEO"],
      },
      {
        title: "App Development",
        desc: "Custom Android & iOS apps tailored to your exact business logic and user needs.",
        tags: ["Android", "iOS", "Flutter"],
      },
      {
        title: "E-Commerce Stores",
        desc: "High-converting online stores on Shopify or custom stacks — built to sell.",
        tags: ["Shopify", "WooCommerce", "Stripe"],
      },
    ],
  },
  {
    category: "Performance Marketing",
    icon: "◈",
    accent: "#7050ff",
    desc: "Data-driven ad campaigns that turn budget into measurable revenue.",
    items: [
      {
        title: "Google Ads",
        desc: "Search, Display & Shopping campaigns engineered to generate qualified leads at lowest CPL.",
        tags: ["Search", "Shopping", "Display"],
      },
      {
        title: "Meta Ads",
        desc: "Facebook & Instagram ads with sharp targeting and creatives that stop the scroll.",
        tags: ["Facebook", "Instagram", "Retargeting"],
      },
      {
        title: "Social Media Management",
        desc: "End-to-end content creation, scheduling, and community growth strategy.",
        tags: ["Content", "Growth", "Analytics"],
      },
    ],
  },
  {
    category: "Creative Studio",
    icon: "◉",
    accent: "#ff5096",
    desc: "Visual storytelling that builds brands people remember — and trust.",
    items: [
      {
        title: "Reels & Video Editing",
        desc: "Short-form video content produced to hook, engage, and convert across every platform.",
        tags: ["Reels", "YouTube Shorts", "Editing"],
      },
      {
        title: "Graphic Design",
        desc: "Scroll-stopping posts, banners, ads and marketing collateral crafted to convert.",
        tags: ["Social Posts", "Banners", "Print"],
      },
      {
        title: "Logo & Branding",
        desc: "Complete brand identity — logo, palette, typography — built for lasting recognition.",
        tags: ["Logo", "Brand Kit", "Style Guide"],
      },
    ],
  },
  {
    category: "AI Solutions",
    icon: "✦",
    accent: "#00b4ff",
    desc: "Intelligent automation tools that save time, reduce cost, and scale operations.",
    items: [
      {
        title: "AI Chatbot Development",
        desc: "Custom-trained chatbots that capture leads, answer queries, and qualify prospects 24/7.",
        tags: ["GPT-4", "WhatsApp", "Web Widget"],
      },
      {
        title: "AI Workflow Automation",
        desc: "Automate emails, CRM updates, lead routing and internal ops with AI-powered pipelines.",
        tags: ["Zapier", "Make", "n8n"],
      },
      {
        title: "AI Content Generation",
        desc: "AI-assisted ad copy, blog posts, and social content — produced fast and on-brand.",
        tags: ["Copy", "Blog", "Ad Scripts"],
      },
    ],
  },
];

const PROCESS = [
  { step: "01", title: "Discovery Call", desc: "We understand your goals, audience, and budget." },
  { step: "02", title: "Strategy & Plan", desc: "Custom roadmap built around your specific objectives." },
  { step: "03", title: "Execute Fast", desc: "We build, launch, and optimise with zero fluff." },
  { step: "04", title: "Report & Scale", desc: "Data-backed reporting and scaling what works." },
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

function ServiceSection({ section, index }: { section: typeof SERVICES[0]; index: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`svc-block fade-up ${inView ? "in" : ""}`}>
      {/* Category header */}
      <div className="cat-header">
        <div className="cat-left">
          <span className="cat-icon" style={{ color: section.accent, borderColor: `${section.accent}30`, background: `${section.accent}10` }}>
            {section.icon}
          </span>
          <div>
            <p className="cat-label" style={{ color: section.accent }}>
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="cat-title">{section.category}</h2>
          </div>
        </div>
        <p className="cat-desc">{section.desc}</p>
      </div>

      {/* Cards */}
      <div className="cards-grid">
        {section.items.map((item, i) => (
          <div
            key={item.title}
            className={`svc-card fade-up d${i + 1} ${inView ? "in" : ""}`}
            style={{ ["--accent" as string]: section.accent }}
          >
            <div className="card-top">
              <h3 className="card-title">{item.title}</h3>
              <span className="card-arrow">→</span>
            </div>
            <p className="card-desc">{item.desc}</p>
            <div className="card-tags">
              {item.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>
            <Link href="/contact" className="card-cta">
              Get Quote <span className="cta-arr">→</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const heroV = useInView(0.1);
  const processV = useInView(0.1);
  const ctaV = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .svc-page {
          background: #020408;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        /* ── Fade animation ── */
        .fade-up {
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .fade-up.in { opacity: 1; transform: translateY(0); }
        .fade-up.d1 { transition-delay: 0.1s; }
        .fade-up.d2 { transition-delay: 0.2s; }
        .fade-up.d3 { transition-delay: 0.32s; }
        .fade-up.d4 { transition-delay: 0.44s; }

        /* ── HERO ── */
        .svc-hero {
          position: relative;
          padding: 148px 24px 100px;
          text-align: center;
          overflow: hidden;
        }
        .svc-hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,210,180,0.09) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 80% 60%, rgba(112,80,255,0.07) 0%, transparent 60%);
          pointer-events: none;
        }
        .grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,210,180,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,210,180,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 20%, transparent 100%);
          pointer-events: none;
        }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,210,180,0.08);
          border: 1px solid rgba(0,210,180,0.2);
          color: #00d2b4; font-size: 13px; font-weight: 500;
          padding: 6px 16px; border-radius: 100px;
          margin-bottom: 28px;
        }
        .e-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #00d2b4;
          animation: blink 1.5s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

        .hero-h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(40px, 6vw, 72px); font-weight: 800;
          line-height: 1.05; margin: 0 auto 24px; max-width: 780px;
        }
        .grad { background: linear-gradient(135deg, #00d2b4, #7050ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-sub {
          font-size: clamp(15px, 2vw, 18px); color: rgba(255,255,255,0.4);
          max-width: 520px; margin: 0 auto; line-height: 1.7;
        }

        /* ── Service count pills ── */
        .count-pills {
          display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;
          margin-top: 36px; position: relative; z-index: 1;
        }
        .count-pill {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px; padding: 8px 18px;
          font-size: 13px; color: rgba(255,255,255,0.5);
        }
        .pill-dot { width: 6px; height: 6px; border-radius: 50%; }

        /* ── Service blocks ── */
        .svc-container { max-width: 1140px; margin: 0 auto; padding: 40px 24px 80px; }
        .svc-block { margin-bottom: 80px; }

        .cat-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 32px; margin-bottom: 28px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        @media(max-width:768px){ .cat-header{flex-direction:column; gap:16px;} }

        .cat-left { display: flex; align-items: flex-start; gap: 16px; }
        .cat-icon {
          width: 44px; height: 44px; border-radius: 12px;
          border: 1px solid; display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .cat-label { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
        .cat-title {
          font-family: 'Syne', sans-serif; font-size: clamp(22px, 3vw, 30px);
          font-weight: 800; color: #fff; margin: 0;
        }
        .cat-desc {
          font-size: 14px; color: rgba(255,255,255,0.35); line-height: 1.7;
          max-width: 320px; margin: 0; text-align: right;
        }
        @media(max-width:768px){ .cat-desc{text-align:left;max-width:100%;} }

        /* ── Service cards ── */
        .cards-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
        }
        @media(max-width:900px){ .cards-grid{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:580px){ .cards-grid{grid-template-columns:1fr;} }

        .svc-card {
          position: relative;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px; padding: 26px;
          display: flex; flex-direction: column; gap: 12px;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s, background 0.3s;
        }
        .svc-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent, #00d2b4), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .svc-card:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-4px); background: rgba(255,255,255,0.03); }
        .svc-card:hover::before { opacity: 0.6; }

        .card-top { display: flex; align-items: flex-start; justify-content: space-between; }
        .card-title {
          font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700;
          color: #fff; margin: 0; line-height: 1.3;
        }
        .card-arrow {
          font-size: 16px; color: rgba(255,255,255,0.2);
          flex-shrink: 0; margin-top: 1px;
          transition: color 0.2s, transform 0.2s;
        }
        .svc-card:hover .card-arrow { color: var(--accent, #00d2b4); transform: translateX(3px); }

        .card-desc { font-size: 13px; color: rgba(255,255,255,0.38); line-height: 1.7; margin: 0; flex: 1; }

        .card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .tag {
          font-size: 11px; color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          padding: 3px 10px; border-radius: 100px; font-weight: 500;
        }

        .card-cta {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 500;
          color: var(--accent, #00d2b4); text-decoration: none;
          margin-top: 4px;
          transition: gap 0.2s;
        }
        .card-cta:hover { gap: 10px; }
        .cta-arr { font-size: 12px; transition: transform 0.2s; }
        .card-cta:hover .cta-arr { transform: translateX(2px); }

        /* ── PROCESS ── */
        .process-section {
          max-width: 1140px; margin: 0 auto; padding: 0 24px 80px;
        }
        .section-label {
          font-size: 12px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase;
          color: #00d2b4; margin-bottom: 14px; text-align: center;
        }
        .section-h2 {
          font-family: 'Syne', sans-serif; font-size: clamp(26px, 4vw, 42px); font-weight: 800;
          line-height: 1.1; text-align: center; margin: 0 auto 48px; max-width: 480px;
        }
        .process-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
          background: rgba(255,255,255,0.06); border-radius: 20px; overflow: hidden;
        }
        @media(max-width:640px){ .process-grid{grid-template-columns:repeat(2,1fr);} }

        .process-cell {
          background: rgba(255,255,255,0.02); padding: 32px 24px;
          transition: background 0.2s;
          position: relative; overflow: hidden;
        }
        .process-cell:hover { background: rgba(0,210,180,0.04); }
        .process-cell::after {
          content: attr(data-step);
          position: absolute; bottom: -10px; right: 8px;
          font-family: 'Syne', sans-serif; font-size: 80px; font-weight: 800;
          color: rgba(255,255,255,0.03); line-height: 1; pointer-events: none;
        }
        .p-step {
          font-size: 11px; font-weight: 600; letter-spacing: 2px;
          color: #00d2b4; margin-bottom: 12px; text-transform: uppercase;
        }
        .p-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: #fff; margin: 0 0 10px; }
        .p-desc { font-size: 13px; color: rgba(255,255,255,0.35); line-height: 1.65; margin: 0; }

        /* ── Divider ── */
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent);
          max-width: 1140px; margin: 0 auto 80px;
        }

        /* ── CTA ── */
        .cta-wrap { padding: 0 24px 100px; }
        .cta-box {
          max-width: 1140px; margin: 0 auto;
          position: relative; overflow: hidden;
          border-radius: 28px; padding: 80px 40px;
          text-align: center;
          background: linear-gradient(135deg, rgba(0,210,180,0.06), rgba(112,80,255,0.06));
          border: 1px solid rgba(0,210,180,0.14);
        }
        .cta-box::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 80% at 15% 50%, rgba(0,210,180,0.1), transparent 60%),
            radial-gradient(ellipse 60% 80% at 85% 50%, rgba(112,80,255,0.1), transparent 60%);
          pointer-events: none;
        }
        .cta-h2 {
          font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 50px);
          font-weight: 800; line-height: 1.08; margin: 0 0 16px;
          position: relative; z-index: 1;
        }
        .cta-p {
          font-size: 16px; color: rgba(255,255,255,0.4); margin: 0 0 36px;
          position: relative; z-index: 1;
        }
        .cta-btns {
          display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
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
          border: 1px solid rgba(255,255,255,0.14); color: rgba(255,255,255,0.65);
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          padding: 14px 28px; border-radius: 14px; text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-outline:hover { border-color: rgba(255,255,255,0.3); color: #fff; }
      `}</style>

      <main className="svc-page">

        {/* ── HERO ── */}
        <section className="svc-hero">
          <div className="grid-bg" />
          <div ref={heroV.ref} className={`fade-up ${heroV.inView ? "in" : ""}`} style={{ position: "relative", zIndex: 1 }}>
            <div className="eyebrow">
              <span className="e-dot" />
              What We Offer
            </div>
            <h1 className="hero-h1">
              Everything Your Brand<br />
              Needs to <span className="grad">Scale Online</span>
            </h1>
            <p className="hero-sub">
              From websites to ads, creative content to AI automation — we handle the full stack of digital growth.
            </p>
            <div className="count-pills">
              {[
                { dot: "#00d2b4", label: "3 Dev Services" },
                { dot: "#7050ff", label: "3 Marketing Services" },
                { dot: "#ff5096", label: "3 Creative Services" },
                { dot: "#00b4ff", label: "3 AI Solutions" },
              ].map((p) => (
                <div className="count-pill" key={p.label}>
                  <span className="pill-dot" style={{ background: p.dot }} />
                  {p.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICE BLOCKS ── */}
        <div className="svc-container">
          {SERVICES.map((section, i) => (
            <ServiceSection key={section.category} section={section} index={i} />
          ))}
        </div>

        <div className="divider" />

        {/* ── PROCESS ── */}
        <div className="process-section" ref={processV.ref}>
          <div className={`fade-up ${processV.inView ? "in" : ""}`}>
            <p className="section-label">How It Works</p>
            <h2 className="section-h2">From Idea to <span className="grad">Live Results</span></h2>
          </div>
          <div className={`process-grid fade-up ${processV.inView ? "in" : ""}`} style={{ transitionDelay: "0.2s" }}>
            {PROCESS.map((p) => (
              <div className="process-cell" key={p.step} data-step={p.step}>
                <p className="p-step">{p.step}</p>
                <h3 className="p-title">{p.title}</h3>
                <p className="p-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="cta-wrap" ref={ctaV.ref}>
          <div className={`cta-box fade-up ${ctaV.inView ? "in" : ""}`}>
            <h2 className="cta-h2">
              Not Sure What<br /><span className="grad">You Need?</span>
            </h2>
            <p className="cta-p">
              Book a free 30-min call — we&apos;ll map out the exact services that match your goals and budget.
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