/* eslint-disable react-hooks/refs */
"use client";

import { useState, useRef, useEffect } from "react";

const FAQS = [
  {
    q: "How much does a website cost?",
    a: "Every project is unique — pricing depends on features, design complexity, and integrations. Basic websites start from ₹15,000, while full custom builds vary. We always provide a free quote with no obligation.",
    tag: "Pricing",
    accent: "#00d2b4",
  },
  {
    q: "How long does it take to complete a project?",
    a: "Most websites go live within 7–14 days. Ad campaigns launch within 3–5 days. Complex builds like apps or AI systems typically take 3–6 weeks. We always share a clear timeline before starting.",
    tag: "Timeline",
    accent: "#7050ff",
  },
  {
    q: "Do you provide support after delivery?",
    a: "Absolutely. Every project includes a 30-day post-launch support window. For ongoing maintenance, monthly retainer packages are available. We don't disappear after delivery.",
    tag: "Support",
    accent: "#00d2b4",
  },
  {
    q: "Can you manage Google Ads and Meta Ads?",
    a: "Yes — we run full-funnel Google Ads (Search, Display, Shopping) and Meta Ads (Facebook & Instagram). Every campaign is tracked with clear reporting so you always know your ROI.",
    tag: "Marketing",
    accent: "#7050ff",
  },
  {
    q: "Do you build AI chatbots and automation?",
    a: "Yes. We build GPT-powered chatbots for websites and WhatsApp, plus workflow automation using tools like Make, n8n, and Zapier. These systems capture leads and run 24/7.",
    tag: "AI",
    accent: "#00b4ff",
  },
  {
    q: "Do I need to sign a long-term contract?",
    a: "No long-term contracts required. We work project-by-project or on monthly retainers — your choice. We believe results should keep clients around, not paperwork.",
    tag: "General",
    accent: "#ff5096",
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

// Animated answer panel — CSS max-height trick, no JS height calculation
function FAQItem({
  faq, index, isOpen, onToggle, inView,
}: {
  faq: typeof FAQS[0]; index: number; isOpen: boolean; onToggle: () => void; inView: boolean;
}) {
  return (
    <div
      className={`faq-item fade-up fd${(index % 2) + 1} ${inView ? "in" : ""} ${isOpen ? "open" : ""}`}
      style={{ ["--accent" as string]: faq.accent, transitionDelay: `${index * 0.06}s` }}
      onClick={onToggle}
    >
      {/* shimmer top */}
      <div className="faq-shine" />

      <div className="faq-header">
        <div className="faq-left">
          <span className="faq-tag" style={{ color: faq.accent, background: `${faq.accent}12`, borderColor: `${faq.accent}25` }}>
            {faq.tag}
          </span>
          <h3 className="faq-q">{faq.q}</h3>
        </div>
        <div className={`faq-icon ${isOpen ? "rot" : ""}`}>
          <span className="faq-icon-bar faq-icon-h" />
          <span className="faq-icon-bar faq-icon-v" />
        </div>
      </div>

      {/* ✅ No hydration issue — max-height CSS transition, no JS DOM measurement */}
      <div className="faq-body">
        <p className="faq-ans">{faq.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  // ✅ Start with null — same on server and client, no hydration mismatch
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const header = useInView(0.1);
  const list   = useInView(0.06);

  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .faq-section {
          background: #020408;
          padding: 110px 24px;
          font-family: 'DM Sans', sans-serif;
          position: relative; overflow: hidden;
        }
        .faq-section::before {
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 50% 60% at 50% 0%, rgba(0,210,180,0.06), transparent 60%),
            radial-gradient(ellipse 40% 40% at 90% 80%, rgba(112,80,255,0.05), transparent 60%);
          pointer-events: none;
        }
        .faq-inner { max-width: 760px; margin: 0 auto; position: relative; z-index: 1; }

        /* ── fade ── */
        .fade-up { opacity:0; transform:translateY(22px); transition:opacity .6s ease,transform .6s ease; }
        .fade-up.in { opacity:1; transform:translateY(0); }
        .fd1 { transition-delay: 0s; }
        .fd2 { transition-delay: 0.08s; }

        /* ── HEADER ── */
        .faq-header-wrap { text-align:center; margin-bottom:56px; }
        .eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(0,210,180,.08); border:1px solid rgba(0,210,180,.2);
          color:#00d2b4; font-size:13px; font-weight:500;
          padding:6px 16px; border-radius:100px; margin-bottom:20px;
        }
        .e-dot { width:6px;height:6px;border-radius:50%;background:#00d2b4;animation:blink 1.5s ease-in-out infinite; }
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
        .faq-h2 {
          font-family:'Syne',sans-serif; font-size:clamp(30px,5vw,50px); font-weight:800;
          color:#fff; line-height:1.06; margin:0 0 14px;
        }
        .grad { background:linear-gradient(135deg,#00d2b4,#7050ff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .faq-sub { font-size:15px; color:rgba(255,255,255,.35); max-width:380px; margin:0 auto; line-height:1.7; }

        /* ── ITEMS ── */
        .faq-list { display:flex; flex-direction:column; gap:10px; }

        .faq-item {
          position:relative; overflow:hidden;
          background:rgba(255,255,255,.025);
          border:1px solid rgba(255,255,255,.07);
          border-radius:18px; padding:22px 24px;
          cursor:pointer;
          transition:border-color .25s, background .25s, transform .2s;
          /* ✅ override any delay set inline so open/close is instant */
          transition-delay: 0s !important;
        }
        .faq-item:hover { border-color:rgba(255,255,255,.13); background:rgba(255,255,255,.036); }
        .faq-item.open { border-color:rgba(var(--accent-rgb, 0,210,180),.2); background:rgba(255,255,255,.03); }

        /* per-item overrides for open border colour */
        .faq-item.open { border-color:color-mix(in srgb, var(--accent) 30%, transparent); }

        /* shimmer top */
        .faq-shine {
          position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,var(--accent),transparent);
          opacity:0; transition:opacity .3s;
        }
        .faq-item.open .faq-shine,
        .faq-item:hover .faq-shine { opacity:.7; }

        /* header row */
        .faq-header {
          display:flex; align-items:flex-start; justify-content:space-between;
          gap:16px; pointer-events:none;
        }
        .faq-left { display:flex; flex-direction:column; gap:8px; flex:1; }

        .faq-tag {
          display:inline-flex; align-items:center;
          font-size:11px; font-weight:500; letter-spacing:1px; text-transform:uppercase;
          border:1px solid; padding:3px 10px; border-radius:100px;
          width:fit-content;
        }

        .faq-q {
          font-family:'Syne',sans-serif; font-size:16px; font-weight:700;
          color:rgba(255,255,255,.8); margin:0; line-height:1.3;
          transition:color .2s;
        }
        .faq-item:hover .faq-q, .faq-item.open .faq-q { color:#fff; }

        /* ── Plus/Minus icon — pure CSS, no emoji ── */
        .faq-icon {
          width:28px; height:28px; border-radius:8px; flex-shrink:0;
          background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1);
          display:flex; align-items:center; justify-content:center;
          position:relative;
          transition:background .25s, border-color .25s, transform .4s cubic-bezier(0.16,1,0.3,1);
        }
        .faq-item.open .faq-icon {
          background:color-mix(in srgb, var(--accent) 12%, transparent);
          border-color:color-mix(in srgb, var(--accent) 35%, transparent);
          transform:rotate(45deg);
        }
        .faq-icon-bar {
          position:absolute; background:rgba(255,255,255,.6);
          border-radius:2px; transition:background .2s;
        }
        .faq-item.open .faq-icon-bar { background:var(--accent); }
        .faq-icon-h { width:12px; height:1.5px; }
        .faq-icon-v { width:1.5px; height:12px; }

        /* ── Answer — CSS max-height animation, zero JS layout ── */
        .faq-body {
          display:grid;
          grid-template-rows:0fr;   /* collapsed */
          transition:grid-template-rows .38s cubic-bezier(0.16,1,0.3,1);
          pointer-events:none;
        }
        .faq-item.open .faq-body {
          grid-template-rows:1fr;   /* expanded */
        }
        .faq-body > p {
          overflow:hidden;
          font-size:14px; color:rgba(255,255,255,.42); line-height:1.8;
          margin:0; padding-top:0;
          transition:padding-top .38s cubic-bezier(0.16,1,0.3,1), opacity .3s ease;
          opacity:0;
        }
        .faq-item.open .faq-body > p {
          padding-top:14px;
          opacity:1;
        }

        /* ── BOTTOM CTA ── */
        .faq-cta {
          margin-top:56px; padding-top:48px;
          border-top:1px solid rgba(255,255,255,.05);
          display:flex; flex-direction:column; align-items:center; gap:16px; text-align:center;
        }
        .faq-cta-title {
          font-family:'Syne',sans-serif; font-size:20px; font-weight:800; color:#fff;
        }
        .faq-cta-sub { font-size:14px; color:rgba(255,255,255,.3); }
        .faq-cta-btns { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; }
        .btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          background:linear-gradient(135deg,#00d2b4,#00a896);
          color:#020408; font-family:'DM Sans',sans-serif;
          font-size:14px; font-weight:500;
          padding:12px 24px; border-radius:12px; text-decoration:none;
          transition:transform .2s, box-shadow .2s;
        }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 0 24px rgba(0,210,180,.3); }
        .btn-outline {
          display:inline-flex; align-items:center; gap:8px;
          border:1px solid rgba(255,255,255,.12); color:rgba(255,255,255,.55);
          font-family:'DM Sans',sans-serif; font-size:14px;
          padding:12px 24px; border-radius:12px; text-decoration:none;
          transition:border-color .2s, color .2s;
        }
        .btn-outline:hover { border-color:rgba(255,255,255,.28); color:#fff; }
      `}</style>

      <section className="faq-section">
        <div className="faq-inner">

          {/* Header */}
          <div ref={header.ref} className={`faq-header-wrap fade-up ${header.inView ? "in" : ""}`}>
            <div className="eyebrow"><span className="e-dot" />Got Questions?</div>
            <h2 className="faq-h2">
              We&apos;ve Got<br />
              <span className="grad">Answers.</span>
            </h2>
            <p className="faq-sub">
              Everything you need to know before working with us.
            </p>
          </div>

          {/* FAQ List */}
          <div ref={list.ref} className="faq-list">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={faq.q}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                inView={list.inView}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className={`faq-cta fade-up ${list.inView ? "in" : ""}`}>
            <p className="faq-cta-title">Still have questions?</p>
            <p className="faq-cta-sub">We&apos;re happy to answer anything — no pressure, no sales pitch.</p>
            <div className="faq-cta-btns">
              <a href="/contact" className="btn-primary">Talk to Us →</a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="btn-outline">WhatsApp Us</a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}