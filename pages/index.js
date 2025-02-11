import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/animated-gradient-hero";
import { BgBeamsWithCollision } from "@/components/ui/beams-collision-section";
import { FlipWords } from "@/components/ui/flip-word-wrapper";
import { ExpandableCardSection } from "@/components/ui/expandalbe-cards";
import LaptopParallaxScrollSection from "@/components/ui/parallax-laptop-scroll-section";
import Footer from "@/components/ui/footer";

export default function BackgroundGradientAnimationDemo() {
  return <main className="w-full h-[200vh]">
    <BackgroundGradientAnimation>
      <div
        className="absolute z-50 inset-0 flex flex-col items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-br from-slate-900/80 to-blue-900/40">
          <span className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-br from-purple-500 via-violet-500 to-pink-500 py-4">
            JS Pedia
          </span>
          <br /> Your Javascript Hub
        </p>
      </div>
    </BackgroundGradientAnimation>

    <BgBeamsWithCollision>
      <section className="w-full flex flex-col gap-20 md:flex-row md:justify-between items-center">
        <nav className="md:max-w-[50%]">
          <div className="mb-4 md:mb-8 relative z-20 text-5xl lg:text-7xl font-bold text-center md:text-left text-black font-sans tracking-tight">
            <FlipWords className="text-5xl lg:text-7xl" words={["Learn", "Develop", "Sell", "Teach", "Grow"]} />
            <br />
            <span className="text-slate-700">With JS Pedia</span>
          </div>
          <p className="text-base text-center md:text-left md:text-lg text-slate-700">
            Empowering developers with community, assets, and interactive learning <br />
            JS Pedia is our flagship platform designed to serve as a comprehensive resource for JavaScript enthusiasts. As the parent brand, it integrates multiple specialized child platforms under one ecosystem.
          </p>
        </nav>
        <nav className="flex justify-center md:justify-end items-center">
          <div className="w-[90%] md:w-3/4 rounded-3xl overflow-hidden">
            <video className="w-full h-full object-cover" src="/stock-intro-video.mp4" controls={false} autoPlay loop muted></video>
          </div>
        </nav>
      </section>
    </BgBeamsWithCollision>

    <LaptopParallaxScrollSection />

    <ExpandableCardSection />
    <Footer />
  </main>
}
