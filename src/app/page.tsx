import dynamic from "next/dynamic";
import Hero from "./components/Hero"; 

const About = dynamic(() => import("./about/page"), {
  loading: () => <SectionSkeleton />,
});
const Service = dynamic(() => import("./components/Services"), {
  loading: () => <SectionSkeleton />,
});
const Features = dynamic(() => import("./components/Features"), {
  loading: () => <SectionSkeleton />,
});
const WhyChooseUs = dynamic(() => import("./components/WhyChooseUs"), {
  loading: () => <SectionSkeleton />,
});
const Testimonials = dynamic(() => import("./components/Testimonials"), {
  loading: () => <SectionSkeleton />,
});
const Faq = dynamic(() => import("./components/Faq"), {
  loading: () => <SectionSkeleton />,
});

function SectionSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: 200,
        background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.4s infinite",
        borderRadius: 8,
        margin: "16px 0",
      }}
    >
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />     
      <About />
      <Service />
      <Features />
      <WhyChooseUs />
      <Testimonials />
      <Faq />
    </div>
  );
}