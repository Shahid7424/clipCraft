"use client";

import Link from "next/link";
import Image from "next/image";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const SERVICES = [
  "Web Development",
  "App Development",
  "Google Ads",
  "Meta Ads",
  "Social Media",
  "AI Chatbots",
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", icon: "▣" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "◈" },
  { label: "Twitter", href: "https://twitter.com", icon: "✦" },
  { label: "YouTube", href: "https://youtube.com", icon: "▶" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .footer {
          background: #010306;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        /* top glow */
        .footer::before {
          content: '';
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 600px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,210,180,0.4), transparent);
          pointer-events: none;
        }
        .footer::after {
          content: '';
          position: absolute;
          top: -120px; left: 50%; transform: translateX(-50%);
          width: 500px; height: 300px;
          background: radial-gradient(ellipse at top, rgba(0,210,180,0.06), transparent 70%);
          pointer-events: none;
        }

        /* ── CTA strip ── */
        .footer-cta {
          max-width: 1100px; margin: 0 auto;
          padding: 64px 24px 56px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 32px; flex-wrap: wrap;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: relative; z-index: 1;
        }
        .footer-cta-text h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(24px, 3.5vw, 40px); font-weight: 800;
          line-height: 1.1; color: #fff; margin: 0 0 8px;
        }
        .footer-cta-text p {
          font-size: 15px; color: rgba(255,255,255,0.38); margin: 0;
        }
        .cta-grad {
          background: linear-gradient(135deg, #00d2b4, #7050ff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .footer-btn {
          display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0;
          background: linear-gradient(135deg, #00d2b4, #00a896);
          color: #010306; font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 500;
          padding: 14px 28px; border-radius: 14px; text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .footer-btn:hover { transform: translateY(-2px); box-shadow: 0 0 28px rgba(0,210,180,0.3); }

        /* ── Main grid ── */
        .footer-main {
          max-width: 1100px; margin: 0 auto;
          padding: 56px 24px 48px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.3fr;
          gap: 48px;
          position: relative; z-index: 1;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        @media(max-width: 900px) { .footer-main { grid-template-columns: 1fr 1fr; gap: 36px; } }
        @media(max-width: 520px) { .footer-main { grid-template-columns: 1fr; gap: 32px; } .footer-cta { flex-direction: column; align-items: flex-start; } }

        /* ── Logo — responsive ── */
        .footer-logo-wrap {
          display: block;
          margin-bottom: 16px;
          /* desktop: fixed size */
          width: 160px;
          height: 64px;
          position: relative;
        }
        @media(max-width: 520px) {
          .footer-logo-wrap {
            /* mobile: fill the brand column width, keep aspect ratio */
            width: 100%;
            max-width: 260px;
            height: auto;
            aspect-ratio: 5 / 2;   /* matches 160×64 ratio */
          }
        }

        /* Brand col */
        .brand-desc { font-size: 14px; color: rgba(255,255,255,0.35); line-height: 1.75; margin-bottom: 24px; max-width: 280px; }

        /* Socials */
        .socials { display: flex; gap: 10px; }
        .social-btn {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; color: rgba(255,255,255,0.4); text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .social-btn:hover {
          background: rgba(0,210,180,0.08);
          border-color: rgba(0,210,180,0.25);
          color: #00d2b4; transform: translateY(-2px);
        }

        /* Col header */
        .col-title {
          font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
          color: #fff; margin-bottom: 20px; letter-spacing: 0.3px;
        }

        /* Links */
        .col-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .col-link {
          font-size: 14px; color: rgba(255,255,255,0.38); text-decoration: none;
          display: flex; align-items: center; gap: 6px;
          transition: color 0.2s, gap 0.2s;
        }
        .col-link::before { content: '→'; font-size: 11px; opacity: 0; transition: opacity 0.2s; }
        .col-link:hover { color: rgba(255,255,255,0.8); gap: 10px; }
        .col-link:hover::before { opacity: 1; }

        /* Contact items */
        .contact-item {
          display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px;
        }
        .contact-icon {
          width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
          background: rgba(0,210,180,0.08); border: 1px solid rgba(0,210,180,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: #00d2b4;
        }
        .contact-info { display: flex; flex-direction: column; gap: 2px; }
        .contact-label { font-size: 11px; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.8px; }
        .contact-val {
          font-size: 13.5px; color: rgba(255,255,255,0.6); text-decoration: none;
          transition: color 0.2s;
        }
        a.contact-val:hover { color: #00d2b4; }

        /* WhatsApp badge */
        .wa-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(37,211,102,0.08);
          border: 1px solid rgba(37,211,102,0.2);
          color: #25d366;
          font-size: 13px; font-weight: 500;
          padding: 8px 14px; border-radius: 10px;
          text-decoration: none; margin-top: 6px;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .wa-badge:hover { background: rgba(37,211,102,0.14); box-shadow: 0 0 16px rgba(37,211,102,0.15); }
        .wa-dot { width: 7px; height: 7px; border-radius: 50%; background: #25d366; animation: blink 1.5s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        /* ── Bottom bar ── */
        .footer-bottom {
          max-width: 1100px; margin: 0 auto;
          padding: 24px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
          position: relative; z-index: 1;
        }
        .footer-copy { font-size: 13px; color: rgba(255,255,255,0.22); }
        .footer-copy span { color: rgba(0,210,180,0.7); }
        .footer-legal { display: flex; gap: 20px; }
        .legal-link { font-size: 13px; color: rgba(255,255,255,0.2); text-decoration: none; transition: color 0.2s; }
        .legal-link:hover { color: rgba(255,255,255,0.5); }
      `}</style>

      <footer className="footer">
        {/* ── CTA Strip ── */}
        <div className="footer-cta">
          <div className="footer-cta-text">
            <h2>
              Ready to <span className="cta-grad">Scale Your Brand?</span>
            </h2>
            <p>Let&apos;s build something that actually grows your business.</p>
          </div>
          <Link href="/contact" className="footer-btn">
            Book Free Strategy Call →
          </Link>
        </div>

        {/* ── Main Grid ── */}
        <div className="footer-main">
          {/* Brand */}
          <div>
            {/* ── LOGO — fills column on mobile, fixed on desktop ── */}
            <div className="footer-logo-wrap">
              <Image
                src="/images/logo.jpeg"
                alt="Growth Media Solutions"
                fill
                style={{ objectFit: "contain", borderRadius: "9px" }}
                priority
              />
            </div>

            <p className="brand-desc">
              We help businesses grow with high-performance websites,
              data-driven ads, and AI-powered solutions that deliver real
              results.
            </p>
            <div className="socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="col-title">Quick Links</p>
            <ul className="col-links">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="col-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="col-title">Services</p>
            <ul className="col-links">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link href="/services" className="col-link">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="col-title">Get In Touch</p>

            <div className="contact-item">
              <div className="contact-icon">@</div>
              <div className="contact-info">
                <span className="contact-label">Email</span>
                <a href="mailto:wajahatnaveed999@gmail.com" className="contact-val">
                  wajahatnaveed999@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">✆</div>
              <div className="contact-info">
                <span className="contact-label">Phone</span>
                <a href="tel:+919822449515" className="contact-val">
                  +91 9822449515
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">◉</div>
              <div className="contact-info">
                <span className="contact-label">Location</span>
                <span className="contact-val">
                  Near momin clinic, Gulam Ali Nagar, Mohammad Wadi Road,
                  Hadapsar, Pune 411028
                </span>
              </div>
            </div>

            <a
              href="https://wa.me/919822449515"
              target="_blank"
              rel="noopener noreferrer"
              className="wa-badge"
            >
              <span className="wa-dot" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} <span>Growth Media Solutions</span>. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link href="/privacy" className="legal-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="legal-link">
              Terms of Use
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}