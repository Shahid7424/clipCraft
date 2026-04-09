/* eslint-disable react-hooks/refs */
"use client";

import { Fragment, useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    name: "Amit Sharma",
    role: "Business Owner",
    company: "ShopEase India",
    text: "Growth Media Solutions completely transformed our online presence. Within 3 weeks our leads doubled. Best investment we made this year.",
    avatar: "AS",
    accent: "#00d2b4",
    stat: "2x", statLabel: "More Leads",
    stars: 5,
  },
  {
    name: "Priya Verma",
    role: "Startup Founder",
    company: "Lumina Tech",
    text: "Incredibly professional team. They built our website, ran Meta campaigns, and were always available. Results beyond expectations.",
    avatar: "PV",
    accent: "#7050ff",
    stat: "3x", statLabel: "ROI",
    stars: 5,
  },
  {
    name: "Rahul Singh",
    role: "Entrepreneur",
    company: "FitFuel Co.",
    text: "Fast, reliable, and genuinely focused on results. Our Reels went viral twice and Instagram followers tripled in 60 days.",
    avatar: "RS",
    accent: "#ff5096",
    stat: "3x", statLabel: "Followers",
    stars: 5,
  },
  {
    name: "Neha Kapoor",
    role: "Marketing Head",
    company: "UrbanNest",
    text: "The AI chatbot captures 40% more leads than our old contact form ever did. Their automation work is simply next level.",
    avatar: "NK",
    accent: "#00b4ff",
    stat: "40%", statLabel: "More Leads",
    stars: 5,
  },
  {
    name: "Vikram Patel",
    role: "E-commerce Owner",
    company: "CraftKart",
    text: "Our Shopify store went from ₹50K to ₹2L/month in 45 days after the redesign and ad campaigns. Absolutely phenomenal.",
    avatar: "VP",
    accent: "#00d2b4",
    stat: "4x", statLabel: "Revenue",
    stars: 5,
  },
  {
    name: "Sneha Joshi",
    role: "Content Creator",
    company: "Studio Bloom",
    text: "Their Reels editing and branding gave my brand the professional edge it needed. I went from 5K to 80K followers in 4 months.",
    avatar: "SJ",
    accent: "#7050ff",
    stat: "80K", statLabel: "Followers",
    stars: 5,
  },
  {
    name: "Karan Mehta",
    role: "Restaurant Owner",
    company: "Spice Garden",
    text: "Our Google Ads campaign brought in 200+ new customers in the first month. Growth Media Solutions knows exactly how to target the right audience.",
    avatar: "KM",
    accent: "#ff5096",
    stat: "200+", statLabel: "New Customers",
    stars: 5,
  },
  {
    name: "Divya Nair",
    role: "Founder",
    company: "WellNest India",
    text: "From zero to 10K monthly website visitors in 8 weeks using SEO and content strategy. Exceptional work by the entire team.",
    avatar: "DN",
    accent: "#00b4ff",
    stat: "10K", statLabel: "Monthly Visits",
    stars: 5,
  },
];

// Row 1 = first 4, Row 2 = last 4 — duplicated for infinite loop
const ROW1 = [...TESTIMONIALS.slice(0, 4), ...TESTIMONIALS.slice(0, 4)];
const ROW2 = [...TESTIMONIALS.slice(4), ...TESTIMONIALS.slice(4)];

const TRUST_STATS = [
  { val: "20+", lbl: "Happy Clients" },
  { val: "50+", lbl: "Projects Done" },
  { val: "98%", lbl: "Satisfaction Rate" },
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

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#f59e0b", fontSize: 12 }}>★</span>
      ))}
    </div>
  );
}

function TestiCard({ t, uid }: { t: typeof TESTIMONIALS[0]; uid: string }) {
  return (
    <div className="tcard" style={{ ["--accent" as string]: t.accent }}>
      <div className="tcard-shine" />
      <div className="tcard-quote">&quot;</div>
      <Stars count={t.stars} />
      <p className="tcard-text">&quot;{t.text}&quot;</p>
      <div className="tcard-bottom">
        <div className="tcard-author">
          <div className="tcard-avatar" style={{ background: `${t.accent}18`, borderColor: `${t.accent}35`, color: t.accent }}>
            {t.avatar}
          </div>
          <div className="tcard-info">
            <span className="tcard-name">{t.name}</span>
            <span className="tcard-role">{t.role} · {t.company}</span>
          </div>
        </div>
        <div className="tcard-stat">
          <span className="ts-val" style={{ color: t.accent }}>{t.stat}</span>
          <span className="ts-lbl">{t.statLabel}</span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [paused, setPaused] = useState(false);
  const header = useInView(0.1);
  const bar    = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .test-section {
          background: #020408;
          padding: 110px 0;
          font-family: 'DM Sans', sans-serif;
          position: relative; overflow: hidden;
        }
        .test-section::before {
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 50% 50% at 0% 50%, rgba(0,210,180,0.05), transparent 60%),
            radial-gradient(ellipse 40% 40% at 100% 50%, rgba(112,80,255,0.05), transparent 60%);
          pointer-events: none;
        }
        .test-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 100%);
        }

        /* ── HEADER ── */
        .test-header-wrap { padding: 0 24px; text-align: center; margin-bottom: 64px; }
        .fade-up { opacity:0; transform:translateY(24px); transition:opacity .65s ease,transform .65s ease; }
        .fade-up.in { opacity:1; transform:translateY(0); }

        .eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,210,180,.08); border: 1px solid rgba(0,210,180,.2);
          color: #00d2b4; font-size: 13px; font-weight: 500;
          padding: 6px 16px; border-radius: 100px; margin-bottom: 20px;
        }
        .e-dot { width:6px;height:6px;border-radius:50%;background:#00d2b4;animation:blink 1.5s ease-in-out infinite; }
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
        .test-h2 { font-family:'Syne',sans-serif; font-size:clamp(30px,5vw,52px); font-weight:800; color:#fff; line-height:1.06; margin:0 0 14px; }
        .grad { background:linear-gradient(135deg,#00d2b4,#7050ff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .test-sub { font-size:16px; color:rgba(255,255,255,.35); max-width:420px; margin:0 auto; line-height:1.7; }

        /* ── MARQUEE ── */
        .marquee-wrap {
          display: flex; flex-direction: column; gap: 16px;
          margin-bottom: 16px;
        }

        .marquee-row {
          overflow: hidden; position: relative;
        }
        /* fade edges */
        .marquee-row::before,
        .marquee-row::after {
          content: ''; position: absolute; top: 0; bottom: 0;
          width: 180px; z-index: 2; pointer-events: none;
        }
        .marquee-row::before { left: 0; background: linear-gradient(90deg, #020408, transparent); }
        .marquee-row::after  { right: 0; background: linear-gradient(-90deg, #020408, transparent); }

        .marquee-track {
          display: flex; gap: 16px; width: max-content;
        }
        .marquee-track.left  { animation: scrollLeft  38s linear infinite; }
        .marquee-track.right { animation: scrollRight 34s linear infinite; }
        .marquee-track.paused { animation-play-state: paused !important; }

        @keyframes scrollLeft  { 0%{transform:translateX(0)}    100%{transform:translateX(-50%)} }
        @keyframes scrollRight { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)}    }

        /* ── CARD ── */
        .tcard {
          width: 320px; flex-shrink: 0;
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 24px;
          display: flex; flex-direction: column; gap: 12px;
          cursor: default;
          transition: border-color .3s, transform .3s, background .3s;
        }
        .tcard:hover {
          border-color: rgba(255,255,255,.14);
          transform: translateY(-4px);
          background: rgba(255,255,255,0.038);
        }

        /* shimmer top */
        .tcard-shine {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0; transition: opacity .3s;
        }
        .tcard:hover .tcard-shine { opacity: 0.8; }

        /* big quote */
        .tcard-quote {
          position: absolute; top: 12px; right: 18px;
          font-family: 'Syne', sans-serif; font-size: 60px; font-weight: 800; line-height: 1;
          color: rgba(255,255,255,0.03); pointer-events: none; transition: color .3s;
          user-select: none;
        }
        .tcard:hover .tcard-quote { color: rgba(255,255,255,0.07); }

        .tcard-text {
          font-size: 13.5px; color: rgba(255,255,255,0.48); line-height: 1.8;
          margin: 0; flex: 1; font-style: italic;
        }

        .tcard-bottom { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 4px; }
        .tcard-author { display: flex; align-items: center; gap: 10px; }
        .tcard-avatar {
          width: 38px; height: 38px; border-radius: 50%; border: 1px solid;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; flex-shrink: 0;
        }
        .tcard-info { display: flex; flex-direction: column; gap: 2px; }
        .tcard-name { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: #fff; }
        .tcard-role { font-size: 11px; color: rgba(255,255,255,0.25); }
        .tcard-stat { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; flex-shrink: 0; }
        .ts-val { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 800; line-height: 1; }
        .ts-lbl { font-size: 9px; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: .5px; }

        /* pause hint */
        .pause-hint {
          text-align: center; font-size: 12px; color: rgba(255,255,255,0.18);
          margin: 12px 0 0; letter-spacing: .3px;
        }

        /* ── TRUST BAR ── */
        .trust-wrap { padding: 0 24px; }
        .trust-bar {
          max-width: 1100px; margin: 56px auto 0;
          padding-top: 48px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          gap: 48px; flex-wrap: wrap;
        }
        .trust-stat { text-align: center; }
        .trust-val { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #fff; display: block; line-height: 1; margin-bottom: 6px; }
        .trust-lbl { font-size: 13px; color: rgba(255,255,255,0.3); }
        .trust-sep { width: 1px; height: 40px; background: rgba(255,255,255,0.07); }
        @media(max-width:560px){ .trust-sep{display:none;} }

        .google-badge {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 12px 20px;
        }
        .gb-stars { display: flex; gap: 2px; }
        .gb-info { display: flex; flex-direction: column; gap: 2px; }
        .gb-rating { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; color: #fff; line-height: 1; }
        .gb-text { font-size: 12px; color: rgba(255,255,255,0.28); }
      `}</style>

      <section className="test-section">
        <div className="test-dots" />

        {/* Header */}
        <div ref={header.ref} className={`test-header-wrap fade-up ${header.inView ? "in" : ""}`}>
          <div className="eyebrow"><span className="e-dot" />Client Stories</div>
          <h2 className="test-h2">
            Real Results.<br />
            <span className="grad">Real People.</span>
          </h2>
          <p className="test-sub">
            Don&apos;t take our word for it — here&apos;s what our clients say.
          </p>
        </div>

        {/* Marquee rows */}
        <div
          className="marquee-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Row 1 — scrolls left */}
          <div className="marquee-row">
            <div className={`marquee-track left ${paused ? "paused" : ""}`}>
              {ROW1.map((t, i) => (
                <TestiCard key={`r1-${i}`} t={t} uid={`r1-${i}`} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="marquee-row">
            <div className={`marquee-track right ${paused ? "paused" : ""}`}>
              {ROW2.map((t, i) => (
                <TestiCard key={`r2-${i}`} t={t} uid={`r2-${i}`} />
              ))}
            </div>
          </div>
        </div>

        <p className="pause-hint">Hover to pause</p>

        {/* Trust Bar */}
        <div className="trust-wrap">
          <div ref={bar.ref} className={`trust-bar fade-up ${bar.inView ? "in" : ""}`}>
            {TRUST_STATS.map((s, i) => (
              <Fragment key={s.lbl}>
                <div className="trust-stat">
                  <span className="trust-val">{s.val}</span>
                  <span className="trust-lbl">{s.lbl}</span>
                </div>
                {i < TRUST_STATS.length - 1 && <div className="trust-sep" />}
              </Fragment>
            ))}
            <div className="trust-sep" />
            <div className="google-badge">
              <div className="gb-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: "#f59e0b", fontSize: 16 }}>★</span>
                ))}
              </div>
              <div className="gb-info">
                <span className="gb-rating">5.0</span>
                <span className="gb-text">Google Rating</span>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}