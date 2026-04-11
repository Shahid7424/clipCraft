/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/",          label: "Home"      },
  { href: "/services",  label: "Services"  },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about",     label: "About"     },
  { href: "/contact",   label: "Contact"   },
  { href: "/blog",      label: "Blog"      },
];

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }

        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
        }

        .nav-line {
          height: 2px;
          background: linear-gradient(90deg, #7050ff, #00d2b4, #ff5096, #00d2b4, #7050ff);
          background-size: 300% 100%;
          animation: lineMove 5s linear infinite;
        }
        @keyframes lineMove {
          0%   { background-position: 0%   0%; }
          100% { background-position: 300% 0%; }
        }

        .nav-bar {
          width: 100%;
          background: #000;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .nav.scrolled .nav-bar {
          background: rgba(0,0,0,0.95);
          border-bottom-color: rgba(0,210,180,0.15);
          box-shadow: 0 2px 40px rgba(0,0,0,0.8);
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        /* ── LOGO ── */
        .nav-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
          min-width: 0;
        }
        .nav-logo-img {
          width: 150px;
          height: 60px;
          border-radius: 9px;
          object-fit: contain;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        /* Shrink logo on mobile so hamburger stays visible */
        @media (max-width: 860px) {
          .nav-logo-img {
            width: 80px;
            height: 36px;
          }
        }
        @media (max-width: 400px) {
          .nav-logo-img {
            width: 65px;
            height: 30px;
          }
        }
        .nav-logo:hover .nav-logo-img {
          transform: scale(1.04);
          box-shadow: 0 0 20px rgba(0,210,180,0.3);
        }

        /* ── DESKTOP LINKS ── */
        .nav-center {
          display: flex;
          align-items: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        @media (max-width: 860px) { .nav-center { display: none; } }

        .nav-link {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 400;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          padding: 8px 16px;
          white-space: nowrap;
          transition: color 0.2s ease;
        }
        .nav-link:hover { color: rgba(255,255,255,0.95); }
        .nav-link.active { color: #fff; font-weight: 500; }
        .nav-link::after {
          content: '';
          position: absolute; bottom: 2px; left: 16px; right: 16px;
          height: 1.5px; border-radius: 100px;
          background: linear-gradient(90deg, #00d2b4, #7050ff);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover::after,
        .nav-link.active::after { transform: scaleX(1); }

        /* ── RIGHT ACTIONS ── */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .nav-phone {
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          color: rgba(255,255,255,0.38); text-decoration: none;
          white-space: nowrap; transition: color 0.2s;
        }
        .nav-phone:hover { color: rgba(255,255,255,0.75); }
        @media (max-width: 1024px) { .nav-phone { display: none; } }

        .nav-sep {
          width: 1px; height: 18px;
          background: rgba(255,255,255,0.1);
        }
        @media (max-width: 1024px) { .nav-sep { display: none; } }

        .nav-cta {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
          color: #000; text-decoration: none; white-space: nowrap;
          padding: 10px 20px; border-radius: 10px;
          background: linear-gradient(135deg, #00d2b4, #00c4a7);
          position: relative; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 0 1px rgba(0,210,180,0.4), 0 4px 16px rgba(0,210,180,0.15);
          letter-spacing: 0.2px;
        }
        .nav-cta::before {
          content: '';
          position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transition: left 0.5s ease;
        }
        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 0 1px rgba(0,210,180,0.5), 0 8px 24px rgba(0,210,180,0.28);
          background: linear-gradient(135deg, #00d2b4, #7050ff);
        }
        .nav-cta:hover::before { left: 100%; }
        .nav-cta-arr { font-size: 13px; transition: transform 0.2s; }
        .nav-cta:hover .nav-cta-arr { transform: translateX(2px); }
        /* Hide CTA text on very small screens, keep only arrow */
        @media (max-width: 860px) {
          .nav-cta { display: none; }
        }

        /* ── HAMBURGER ── */
        .nav-ham {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 9px;
          cursor: pointer;
          padding: 10px;
          background: rgba(255,255,255,0.05);
          flex-shrink: 0;
          transition: border-color 0.2s, background 0.2s;
        }
        .nav-ham:hover {
          border-color: rgba(0,210,180,0.4);
          background: rgba(0,210,180,0.08);
        }
        @media (max-width: 860px) {
          .nav-ham {
            display: flex !important;
          }
        }

        .ham-l {
          width: 100%; height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s;
          transform-origin: center;
        }
        .ham-l.open-1 { transform: translateY(7px) rotate(45deg); }
        .ham-l.open-2 { opacity: 0; transform: scaleX(0); }
        .ham-l.open-3 { transform: translateY(-7px) rotate(-45deg); }

        /* ══ MOBILE MENU ══ */
        .nav-mobile {
          position: fixed;
          inset: 0; z-index: 999;
          background: #000;
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
          overflow: hidden;
        }
        .nav-mobile.open {
          transform: translateX(0);
          pointer-events: all;
        }

        .mob-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 10% 15%, rgba(0,210,180,0.07), transparent 60%),
            radial-gradient(ellipse 50% 50% at 90% 85%, rgba(112,80,255,0.07), transparent 60%);
        }
        .mob-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .mob-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: relative; z-index: 1; flex-shrink: 0;
        }
        .mob-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
        }
        .mob-logo-img {
          width: 90px;
          height: 38px;
          border-radius: 8px;
          object-fit: contain;
        }
        .mob-close {
          width: 38px; height: 38px;
          border: 1px solid rgba(255,255,255,0.12); border-radius: 9px;
          background: transparent; cursor: pointer;
          color: rgba(255,255,255,0.55); font-size: 18px;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s, color 0.2s;
        }
        .mob-close:hover { border-color: rgba(255,255,255,0.3); color: #fff; }

        .mob-links {
          flex: 1; display: flex; flex-direction: column; justify-content: center;
          padding: 0 28px; position: relative; z-index: 1;
          overflow-y: auto;
        }
        .mob-link {
          display: flex; align-items: center; justify-content: space-between;
          font-family: 'Syne', sans-serif;
          font-size: clamp(26px, 6.5vw, 42px); font-weight: 700;
          color: rgba(255,255,255,0.22);
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          letter-spacing: -0.8px;
          transition: color 0.25s, padding-left 0.25s;
        }
        .mob-link:hover { color: #fff; padding-left: 10px; }
        .mob-link.active { color: #fff; }
        .mob-num {
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400;
          color: rgba(255,255,255,0.15); letter-spacing: 1px;
          transition: color 0.25s; flex-shrink: 0;
        }
        .mob-link:hover .mob-num,
        .mob-link.active .mob-num { color: #00d2b4; }

        .mob-foot {
          padding: 24px 28px 32px;
          border-top: 1px solid rgba(255,255,255,0.05);
          position: relative; z-index: 1; flex-shrink: 0;
        }
        .mob-cta {
          display: flex; align-items: center; justify-content: space-between;
          font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700;
          color: #000; text-decoration: none;
          background: linear-gradient(135deg, #00d2b4, #7050ff);
          padding: 16px 22px; border-radius: 14px; margin-bottom: 20px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .mob-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,210,180,0.3); }
        .mob-cta-arr { font-size: 18px; }

        .mob-bottom {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
        }
        .mob-soc {
          width: 36px; height: 36px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .mob-soc:hover { border-color: rgba(0,210,180,0.4); color: #00d2b4; }
        .mob-copy {
          margin-left: auto;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.15);
        }
      `}</style>

      {/* ══ NAVBAR ══ */}
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-line" />
        <div className="nav-bar">
          <div className="nav-inner">

            {/* Logo */}
            <Link href="/" className="nav-logo">
              <img
                src="/images/logo.jpeg"
                alt="Growth Media Solutions Logo"
                className="nav-logo-img"
              />
            </Link>

            {/* Desktop center links */}
            <nav className="nav-center">
              {NAV_LINKS.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`nav-link ${pathname === l.href ? "active" : ""}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="nav-right">
              <a href="tel:+919822449515" className="nav-phone">
                +91 9822449515
              </a>
              <div className="nav-sep" />
              <Link href="/contact" className="nav-cta">
                Start Project
                <span className="nav-cta-arr">→</span>
              </Link>
              {/* Hamburger — always rendered, shown via CSS on mobile */}
              <button
                className="nav-ham"
                onClick={() => setIsOpen(o => !o)}
                aria-label="Toggle menu"
              >
                <div className={`ham-l ${isOpen ? "open-1" : ""}`} />
                <div className={`ham-l ${isOpen ? "open-2" : ""}`} />
                <div className={`ham-l ${isOpen ? "open-3" : ""}`} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ══ MOBILE MENU ══ */}
      <div className={`nav-mobile ${isOpen ? "open" : ""}`}>
        <div className="mob-bg" />
        <div className="mob-grid" />

        {/* top bar */}
        <div className="mob-top">
          <Link href="/" className="mob-logo" onClick={() => setIsOpen(false)}>
            <img src="/images/logo.jpeg" alt="Logo" className="mob-logo-img" />
          </Link>
          <button className="mob-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {/* links */}
        <nav className="mob-links">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`mob-link ${pathname === l.href ? "active" : ""}`}
            >
              {l.label}
              <span className="mob-num">0{i + 1}</span>
            </Link>
          ))}
        </nav>

        {/* footer */}
        <div className="mob-foot">
          <Link href="/contact" className="mob-cta" onClick={() => setIsOpen(false)}>
            Book Free Strategy Call
            <span className="mob-cta-arr">→</span>
          </Link>
          <div className="mob-bottom">
            {["▣", "◈", "✦", "▶"].map((ic, i) => (
              <a key={i} href="#" className="mob-soc">{ic}</a>
            ))}
            <span className="mob-copy">© 2025 Growth Media Solutions</span>
          </div>
        </div>
      </div>
    </>
  );
}