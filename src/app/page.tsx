import Image from "next/image";
import Hero from "./components/Hero"
import About from "./about/page"
import Service from "./components/Services";
import Features from "./components/Features";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq"

export default function Home() {
  return (
    <div className="">
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
