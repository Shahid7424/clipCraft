import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "ClipCraft — Digital Marketing Agency",
  description: "We help businesses grow with web development, digital marketing, and AI solutions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#020408" }}>
        <Navbar />
        {/*
          ✅ paddingTop = navbar height (64px line + 2px topline = 66px)
          Ye gap fix karta hai — page content navbar ke neeche se start hota hai
        */}
        <main style={{ paddingTop: "66px" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}