"use client";

import React from "react";
import { motion } from "framer-motion";

const videos = [
  {
    src: "/videos/video1.mp4",
    title: "Exploring the Future of AI",
    description: "A short insight into cutting-edge AI innovations.",
  },
  {
    src: "/videos/video2.mp4",
    title: "Modern Web Design",
    description: "An overview of current UI/UX trends shaping the web.",
  },
  {
    src: "/videos/video3.mp4",
    title: "Next.js for Developers",
    description: "Learn about scalable modern apps built with Next.js.",
  },
  {
    src: "/videos/video4.mp4",
    title: "Tech and Human Creativity",
    description: "Where technology meets art and creativity.",
  },
];

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-16 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 text-transparent bg-clip-text"
      >
        Our Video Blogs
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-7xl">
        {videos.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 hover:from-purple-700 hover:to-blue-600 shadow-lg hover:shadow-purple-500/30 transition-all duration-500"
          >
            <video
              src={video.src}
              controls
              className="rounded-t-xl w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-teal-300 transition-colors">
                {video.title}
              </h2>
              <p className="text-gray-400 text-sm">{video.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
