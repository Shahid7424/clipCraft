/* eslint-disable react-hooks/refs */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const videos = [
  {
    src: "/videos/video1.mp4",
    tag: "Artificial Intelligence",
    title: "Exploring the Future of AI",
    subtitle: "Machines that think, learn, and create",
    description:
      "Dive deep into the world of artificial intelligence — from neural networks reshaping creative industries to autonomous systems redefining how we work, live, and interact with technology every day.",
    duration: "8 min watch",
    date: "April 10, 2025",
    author: "Rohan Mehta",
  },
  {
    src: "/videos/video2.mp4",
    tag: "Design",
    title: "Modern Web Design Principles",
    subtitle: "Crafting experiences that resonate",
    description:
      "Discover how leading designers are blending motion, typography, and interaction into seamless digital experiences. Learn what separates functional from truly memorable UI in 2025.",
    duration: "6 min watch",
    date: "March 28, 2025",
    author: "Priya Sharma",
  },
  
  {
    src: "/videos/video4.mp4",
    tag: "Culture",
    title: "Where Tech Meets Creativity",
    subtitle: "Human imagination in the age of machines",
    description:
      "As AI tools flood the creative space, artists, writers, and makers are finding entirely new ways to express what it means to be human. This is the story of creativity's next chapter.",
    duration: "9 min watch",
    date: "February 22, 2025",
    author: "Sneha Joshi",
  },
   {
    src: "/videos/video5.mp4",
    tag: "Culture",
    title: "Where Tech Meets Creativity",
    subtitle: "Human imagination in the age of machines",
    description:
      "As AI tools flood the creative space, artists, writers, and makers are finding entirely new ways to express what it means to be human. This is the story of creativity's next chapter.",
    duration: "9 min watch",
    date: "February 22, 2025",
    author: "Sneha Joshi",
  },
   {
    src: "/videos/video6.mp4",
    tag: "Culture",
    title: "Where Tech Meets Creativity",
    subtitle: "Human imagination in the age of machines",
    description:
      "As AI tools flood the creative space, artists, writers, and makers are finding entirely new ways to express what it means to be human. This is the story of creativity's next chapter.",
    duration: "9 min watch",
    date: "February 22, 2025",
    author: "Sneha Joshi",
  },
   {
    src: "/videos/video7.mp4",
    tag: "Culture",
    title: "Where Tech Meets Creativity",
    subtitle: "Human imagination in the age of machines",
    description:
      "As AI tools flood the creative space, artists, writers, and makers are finding entirely new ways to express what it means to be human. This is the story of creativity's next chapter.",
    duration: "9 min watch",
    date: "February 22, 2025",
    author: "Sneha Joshi",
  },

   {
    src: "/videos/video8.mp4",
    tag: "Culture",
    title: "Where Tech Meets Creativity",
    subtitle: "Human imagination in the age of machines",
    description:
      "As AI tools flood the creative space, artists, writers, and makers are finding entirely new ways to express what it means to be human. This is the story of creativity's next chapter.",
    duration: "9 min watch",
    date: "February 22, 2025",
    author: "Sneha Joshi",
  },
   {
    src: "/videos/video09.mp4",
    tag: "Culture",
    title: "Where Tech Meets Creativity",
    subtitle: "Human imagination in the age of machines",
    description:
      "As AI tools flood the creative space, artists, writers, and makers are finding entirely new ways to express what it means to be human. This is the story of creativity's next chapter.",
    duration: "9 min watch",
    date: "February 22, 2025",
    author: "Sneha Joshi",
  },
   {
    src: "/videos/video10.mp4",
    tag: "Culture",
    title: "Where Tech Meets Creativity",
    subtitle: "Human imagination in the age of machines",
    description:
      "As AI tools flood the creative space, artists, writers, and makers are finding entirely new ways to express what it means to be human. This is the story of creativity's next chapter.",
    duration: "9 min watch",
    date: "February 22, 2025",
    author: "Sneha Joshi",
  },
  {
    src: "/videos/video011.mp4",
    tag: "Culture",
    title: "Where Tech Meets Creativity",
    subtitle: "Human imagination in the age of machines",
    description:
      "As AI tools flood the creative space, artists, writers, and makers are finding entirely new ways to express what it means to be human. This is the story of creativity's next chapter.",
    duration: "9 min watch",
    date: "February 22, 2025",
    author: "Sneha Joshi",
  },
  {
    src: "/videos/video12.mp4",
    tag: "Culture",
    title: "Where Tech Meets Creativity",
    subtitle: "Human imagination in the age of machines",
    description:
      "As AI tools flood the creative space, artists, writers, and makers are finding entirely new ways to express what it means to be human. This is the story of creativity's next chapter.",
    duration: "9 min watch",
    date: "February 22, 2025",
    author: "Sneha Joshi",
  },
];

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function BlogsPage() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const go = (next: number, dir: number) => {
    if (videoRef.current) videoRef.current.pause();
    setCurrent([next, dir]);
  };

  const prev = () => go((current - 1 + videos.length) % videos.length, -1);
  const next = () => go((current + 1) % videos.length, 1);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [current]);

  const video = videos[current];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080b12",
        color: "#f0ede8",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0",
      }}
    >
      {/* ── Top bar ─────────────────────────────── */}
      <header
        style={{
          width: "100%",
          maxWidth: 1200,
          padding: "2.5rem 2rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "#c4a96d",
              textTransform: "uppercase",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              margin: 0,
            }}
          >
            Video Journal
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 400,
              margin: "0.25rem 0 0",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#f0ede8",
            }}
          >
            Our Video Blogs
          </h1>
        </div>
        <span
          style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: 13,
            color: "#6b6b6b",
          }}
        >
          {current + 1} / {videos.length}
        </span>
      </header>

      {/* ── Thin divider ─────────────────────────── */}
      <div
        style={{
          width: "calc(100% - 4rem)",
          maxWidth: 1200,
          height: 1,
          background: "linear-gradient(90deg, #c4a96d44 0%, #c4a96d22 100%)",
          margin: "1.25rem 0 0",
        }}
      />

      {/* ── Main carousel area ───────────────────── */}
      <section
        style={{
          width: "100%",
          maxWidth: 1200,
          padding: "2.5rem 2rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1.45fr) minmax(0,1fr)",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            {/* ── Video ─────────────────────────── */}
            <div
              style={{
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                background: "#0e111a",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
                border: "1px solid rgba(196,169,109,0.18)",
              }}
            >
              {/* Gold corner accents */}
              {["topLeft", "topRight", "bottomLeft", "bottomRight"].map((c) => (
                <span
                  key={c}
                  style={{
                    position: "absolute",
                    width: 18,
                    height: 18,
                    zIndex: 10,
                    ...(c === "topLeft"
                      ? {
                          top: 10,
                          left: 10,
                          borderTop: "1.5px solid #c4a96d",
                          borderLeft: "1.5px solid #c4a96d",
                        }
                      : c === "topRight"
                      ? {
                          top: 10,
                          right: 10,
                          borderTop: "1.5px solid #c4a96d",
                          borderRight: "1.5px solid #c4a96d",
                        }
                      : c === "bottomLeft"
                      ? {
                          bottom: 10,
                          left: 10,
                          borderBottom: "1.5px solid #c4a96d",
                          borderLeft: "1.5px solid #c4a96d",
                        }
                      : {
                          bottom: 10,
                          right: 10,
                          borderBottom: "1.5px solid #c4a96d",
                          borderRight: "1.5px solid #c4a96d",
                        }),
                  }}
                />
              ))}

              {/* actual video — 16:9 */}
              <div style={{ position: "relative", paddingTop: "56.25%" }}>
                <video
                  ref={videoRef}
                  src={video.src}
                  controls
                  playsInline
                  preload="metadata"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>

            {/* ── Content ───────────────────────── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Tag pill */}
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 14px",
                  border: "1px solid #c4a96d55",
                  borderRadius: 99,
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#c4a96d",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  width: "fit-content",
                }}
              >
                {video.tag}
              </span>

              {/* Title */}
              <div>
                <h2
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
                    fontWeight: 400,
                    margin: 0,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    color: "#f0ede8",
                  }}
                >
                  {video.title}
                </h2>
                <p
                  style={{
                    margin: "0.5rem 0 0",
                    fontSize: "1rem",
                    color: "#c4a96d",
                    fontStyle: "italic",
                    letterSpacing: "0.01em",
                  }}
                >
                  {video.subtitle}
                </p>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: "#c4a96d22",
                }}
              />

              {/* Description */}
              <p
                style={{
                  margin: 0,
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  color: "#a09c94",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontWeight: 400,
                }}
              >
                {video.description}
              </p>

              {/* Meta */}
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontSize: 12,
                  color: "#5a5a5a",
                  letterSpacing: "0.04em",
                }}
              >
                <span>{video.date}</span>
                <span style={{ color: "#c4a96d" }}>·</span>
                <span>{video.duration}</span>
                <span style={{ color: "#c4a96d" }}>·</span>
                <span>{video.author}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation row ──────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "0.5rem",
          }}
        >
          {/* Dot indicators */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? 1 : -1)}
                style={{
                  width: i === current ? 28 : 8,
                  height: 8,
                  borderRadius: 99,
                  border: "none",
                  background: i === current ? "#c4a96d" : "#2e2e2e",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.35s ease",
                }}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { fn: prev, label: "←", title: "Previous" },
              { fn: next, label: "→", title: "Next" },
            ].map(({ fn, label, title }) => (
              <button
                key={title}
                onClick={fn}
                title={title}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid #c4a96d44",
                  background: "transparent",
                  color: "#c4a96d",
                  fontSize: 18,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  fontFamily: "sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#c4a96d18";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#c4a96d";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#c4a96d44";
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Thumbnail strip ─────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            paddingTop: "0.5rem",
          }}
        >
          {videos.map((v, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  border: `1.5px solid ${
                    i === current ? "#c4a96d" : "rgba(255,255,255,0.06)"
                  }`,
                  transition: "border-color 0.25s ease",
                  background: "#0e111a",
                }}
              >
                <div
                  style={{
                    paddingTop: "56.25%",
                    position: "relative",
                    background: "#141720",
                  }}
                >
                  <video
                    src={v.src}
                    muted
                    preload="metadata"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: i === current ? 1 : 0.45,
                      transition: "opacity 0.25s ease",
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: "8px 10px",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 11,
                      fontFamily: "'Helvetica Neue', Arial, sans-serif",
                      color: i === current ? "#c4a96d" : "#555",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      transition: "color 0.25s ease",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {v.title}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Footer ──────────────────────────────── */}
      <footer
        style={{
          width: "100%",
          maxWidth: 1200,
          padding: "1.5rem 2rem 3rem",
          borderTop: "1px solid #c4a96d18",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontSize: 12,
          color: "#3e3e3e",
          letterSpacing: "0.06em",
        }}
      >
        <span>© 2025 Video Journal</span>
        <span>All rights reserved</span>
      </footer>
    </main>
  );
}