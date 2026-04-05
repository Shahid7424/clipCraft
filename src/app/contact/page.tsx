"use client";

import { useState } from "react";

type FormState = { name: string; email: string; phone: string; service: string; message: string; };
type Status = "idle" | "sending" | "sent" | "error";

const SERVICES = [
  "Web Development", "App Development", "Google Ads",
  "Meta Ads", "Social Media", "Reels & Video", "AI Solutions", "Other",
];

const CONTACT_ITEMS = [
  { icon: "@",  label: "Email",    val: "hello@clipcraft.in",     href: "mailto:hello@clipcraft.in" },
  { icon: "✆",  label: "Phone",    val: "+91 99999 99999",        href: "tel:+919999999999" },
  { icon: "◉",  label: "Location", val: "India (Remote Worldwide)", href: null },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Connect your backend / emailjs / formspree here
    setTimeout(() => setStatus("sent"), 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .contact-page { background:#020408; font-family:'DM Sans',sans-serif; overflow-x:hidden; min-height:100vh; }

        /* ── HERO ── */
        .con-hero {
          position:relative; padding:148px 24px 72px; text-align:center; overflow:hidden;
        }
        .con-hero::before {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(ellipse 55% 50% at 50% 0%, rgba(0,210,180,.09),transparent 65%),
            radial-gradient(ellipse 35% 40% at 85% 60%, rgba(112,80,255,.07),transparent 60%);
          pointer-events:none;
        }
        .con-grid {
          position:absolute; inset:0;
          background-image:linear-gradient(rgba(0,210,180,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,210,180,.03) 1px,transparent 1px);
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
        .e-dot{width:6px;height:6px;border-radius:50%;background:#00d2b4;animation:blink 1.5s ease-in-out infinite;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
        .con-h1{font-family:'Syne',sans-serif;font-size:clamp(38px,6vw,68px);font-weight:800;line-height:1.06;color:#fff;margin:0 0 16px;max-width:680px;margin-left:auto;margin-right:auto;}
        .grad{background:linear-gradient(135deg,#00d2b4,#7050ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .con-sub{font-size:clamp(15px,2vw,17px);color:rgba(255,255,255,.38);max-width:440px;margin:0 auto;line-height:1.75;}

        /* ── MAIN GRID ── */
        .con-main{max-width:1100px;margin:0 auto;padding:0 24px 100px;display:grid;grid-template-columns:1fr 1.1fr;gap:24px;align-items:start;}
        @media(max-width:860px){.con-main{grid-template-columns:1fr;}}

        /* ── LEFT — INFO ── */
        .con-info{display:flex;flex-direction:column;gap:0;}
        .info-header{margin-bottom:32px;}
        .info-label{font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#00d2b4;margin-bottom:12px;}
        .info-h2{font-family:'Syne',sans-serif;font-size:clamp(24px,3vw,36px);font-weight:800;color:#fff;line-height:1.1;margin:0 0 12px;}
        .info-p{font-size:14px;color:rgba(255,255,255,.38);line-height:1.75;}

        /* contact cards */
        .con-cards{display:flex;flex-direction:column;gap:10px;margin-bottom:28px;}
        .con-card{
          display:flex;align-items:center;gap:16px;
          background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);
          border-radius:16px;padding:18px 20px;
          transition:border-color .2s,background .2s;text-decoration:none;
        }
        .con-card:hover{border-color:rgba(0,210,180,.2);background:rgba(0,210,180,.03);}
        .cc-icon{
          width:40px;height:40px;border-radius:11px;flex-shrink:0;
          background:rgba(0,210,180,.08);border:1px solid rgba(0,210,180,.15);
          display:flex;align-items:center;justify-content:center;font-size:15px;color:#00d2b4;
        }
        .cc-body{display:flex;flex-direction:column;gap:2px;}
        .cc-label{font-size:11px;color:rgba(255,255,255,.25);letter-spacing:.8px;text-transform:uppercase;}
        .cc-val{font-size:14px;color:rgba(255,255,255,.7);}

        /* WhatsApp */
        .wa-btn{
          display:flex;align-items:center;justify-content:center;gap:10px;
          background:rgba(37,211,102,.08);border:1px solid rgba(37,211,102,.2);
          color:#25d366;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;
          padding:14px 24px;border-radius:14px;text-decoration:none;
          transition:background .2s,box-shadow .2s;margin-bottom:32px;
        }
        .wa-btn:hover{background:rgba(37,211,102,.14);box-shadow:0 0 20px rgba(37,211,102,.15);}
        .wa-dot{width:7px;height:7px;border-radius:50%;background:#25d366;animation:blink 1.5s ease-in-out infinite;}

        /* response time */
        .response-badge{
          display:flex;align-items:center;gap:10px;
          background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);
          border-radius:12px;padding:12px 16px;
        }
        .rb-dot{width:8px;height:8px;border-radius:50%;background:#00d2b4;animation:blink 2s ease-in-out infinite;flex-shrink:0;}
        .rb-text{font-size:13px;color:rgba(255,255,255,.3);line-height:1.5;}
        .rb-text strong{color:rgba(255,255,255,.6);font-weight:500;}

        /* ── RIGHT — FORM ── */
        .con-form-wrap{
          background:rgba(255,255,255,.025);
          border:1px solid rgba(255,255,255,.07);
          border-radius:24px;padding:36px;
          position:relative;overflow:hidden;
        }
        .con-form-wrap::before{
          content:'';position:absolute;top:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,rgba(0,210,180,.4),transparent);
        }
        .form-title{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#fff;margin:0 0 28px;}

        /* inputs */
        .field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
        .field-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        @media(max-width:480px){.field-row{grid-template-columns:1fr;}}

        .field-label{font-size:12px;font-weight:500;color:rgba(255,255,255,.4);letter-spacing:.5px;text-transform:uppercase;}
        .field-input,
        .field-select,
        .field-textarea{
          width:100%;
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.09);
          border-radius:12px;
          padding:12px 16px;
          font-family:'DM Sans',sans-serif;font-size:14px;
          color:#fff;
          outline:none;
          transition:border-color .2s,background .2s,box-shadow .2s;
          -webkit-appearance:none;
        }
        .field-input::placeholder,.field-textarea::placeholder{color:rgba(255,255,255,.2);}
        .field-input:focus,.field-select:focus,.field-textarea:focus{
          border-color:rgba(0,210,180,.35);
          background:rgba(0,210,180,.04);
          box-shadow:0 0 0 3px rgba(0,210,180,.08);
        }
        .field-select{cursor:pointer;color:rgba(255,255,255,.6);}
        .field-select option{background:#0d1117;color:#fff;}
        .field-textarea{resize:vertical;min-height:120px;line-height:1.6;}

        /* submit btn */
        .submit-btn{
          width:100%;display:flex;align-items:center;justify-content:center;gap:10px;
          background:linear-gradient(135deg,#00d2b4,#00a896);
          color:#020408;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;
          padding:15px 28px;border-radius:14px;border:none;cursor:pointer;
          transition:transform .2s,box-shadow .2s,opacity .2s;
          margin-top:8px;
        }
        .submit-btn:hover{transform:translateY(-2px);box-shadow:0 0 28px rgba(0,210,180,.3);}
        .submit-btn:active{transform:scale(.98);}
        .submit-btn:disabled{opacity:.6;cursor:not-allowed;transform:none;}

        /* spinner */
        .spinner{
          width:16px;height:16px;border:2px solid rgba(2,4,8,.3);
          border-top-color:rgba(2,4,8,.8);border-radius:50%;
          animation:spin .7s linear infinite;
        }
        @keyframes spin{to{transform:rotate(360deg)}}

        /* success state */
        .success-state{
          text-align:center;padding:40px 20px;display:flex;flex-direction:column;align-items:center;gap:16px;
        }
        .success-icon{
          width:56px;height:56px;border-radius:50%;
          background:rgba(0,210,180,.1);border:1px solid rgba(0,210,180,.25);
          display:flex;align-items:center;justify-content:center;
          font-size:22px;color:#00d2b4;
          animation:popIn .4s cubic-bezier(.16,1,.3,1);
        }
        @keyframes popIn{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
        .success-title{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#fff;}
        .success-sub{font-size:14px;color:rgba(255,255,255,.4);line-height:1.7;max-width:300px;}
      `}</style>

      <main className="contact-page">

        {/* ── HERO ── */}
        <section className="con-hero">
          <div className="con-grid" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="eyebrow"><span className="e-dot" />Let&apos;s Talk</div>
            <h1 className="con-h1">
              Start Your<br />
              <span className="grad">Growth Journey</span>
            </h1>
            <p className="con-sub">
              Have a project or idea? We&apos;d love to hear it. Book a free call or drop us a message below.
            </p>
          </div>
        </section>

        {/* ── MAIN ── */}
        <div className="con-main">

          {/* ── LEFT — Info ── */}
          <div className="con-info">
            <div className="info-header">
              <p className="info-label">Contact Info</p>
              <h2 className="info-h2">We&apos;re Just a<br /><span className="grad">Message Away</span></h2>
              <p className="info-p">Fill the form or reach us directly — whichever works for you. We reply within a few hours.</p>
            </div>

            <div className="con-cards">
              {CONTACT_ITEMS.map((c) =>
                c.href ? (
                  <a key={c.label} href={c.href} className="con-card">
                    <div className="cc-icon">{c.icon}</div>
                    <div className="cc-body">
                      <span className="cc-label">{c.label}</span>
                      <span className="cc-val">{c.val}</span>
                    </div>
                  </a>
                ) : (
                  <div key={c.label} className="con-card">
                    <div className="cc-icon">{c.icon}</div>
                    <div className="cc-body">
                      <span className="cc-label">{c.label}</span>
                      <span className="cc-val">{c.val}</span>
                    </div>
                  </div>
                )
              )}
            </div>

            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="wa-btn">
              <span className="wa-dot" />
              Chat on WhatsApp
            </a>

            <div className="response-badge">
              <span className="rb-dot" />
              <p className="rb-text">Average response time: <strong>under 2 hours</strong>. We don&apos;t leave messages unread.</p>
            </div>
          </div>

          {/* ── RIGHT — Form ── */}
          <div className="con-form-wrap">
            {status === "sent" ? (
              <div className="success-state">
                <div className="success-icon">✓</div>
                <h3 className="success-title">Message Sent!</h3>
                <p className="success-sub">Thanks {form.name}! We&apos;ll get back to you within a few hours. Check your inbox.</p>
              </div>
            ) : (
              <>
                <h2 className="form-title">Send a Message</h2>
                <form onSubmit={handleSubmit}>

                  <div className="field-row">
                    <div className="field">
                      <label className="field-label">Your Name</label>
                      <input className="field-input" type="text" placeholder="Rahul Sharma" value={form.name} onChange={set("name")} required />
                    </div>
                    <div className="field">
                      <label className="field-label">Phone</label>
                      <input className="field-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
                    </div>
                  </div>

                  <div className="field">
                    <label className="field-label">Email Address</label>
                    <input className="field-input" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} required />
                  </div>

                  <div className="field">
                    <label className="field-label">Service Interested In</label>
                    <select className="field-select" value={form.service} onChange={set("service")} required>
                      <option value="" disabled>Select a service...</option>
                      {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="field">
                    <label className="field-label">Your Message</label>
                    <textarea className="field-textarea" placeholder="Tell us about your project, goals, or budget..." value={form.message} onChange={set("message")} required />
                  </div>

                  <button type="submit" className="submit-btn" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <><span className="spinner" /> Sending...</>
                    ) : (
                      <>Send Message →</>
                    )}
                  </button>

                </form>
              </>
            )}
          </div>

        </div>
      </main>
    </>
  );
}