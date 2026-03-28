import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
  "https://images.unsplash.com/photo-1488197047962-b48492212cda?w=1200&q=80",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=80",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
  "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&q=80",
];

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-primary via-[#0f3c9e] to-[#0a2f78] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
        <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-6 top-20 h-48 w-48 rounded-full bg-[hsl(48,94%,58%)]/30 blur-3xl" />
      </div>

      <div className="container relative mx-auto grid items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28 lg:py-32">
        <div className="space-y-6">
          <motion.p
            className="text-xs font-bold uppercase tracking-[0.35em] text-white/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Apex Coaching
          </motion.p>
          <motion.h1
            className="text-4xl font-black leading-tight tracking-tight md:text-6xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            Crack exams with deliberate practice.
          </motion.h1>
          <motion.p
            className="max-w-xl text-base text-white/80 md:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Live doubt rooms, daily practice sets, weekly analytics, and mentors who stay on your case until concepts stick.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Button className="bg-[hsl(48,94%,58%)] text-foreground px-6 py-3 text-sm font-semibold tracking-tight hover:bg-[hsl(48,94%,52%)] shadow-lg shadow-black/10">
              Book a free session
            </Button>
            <Button variant="outline" className="px-6 py-3 text-sm font-semibold tracking-tight border-white/70 text-white hover:bg-white/10 hover:text-white">
              View programs
            </Button>
            <span className="text-xs uppercase tracking-[0.3em] text-white/60">No spam, just a study plan.</span>
          </motion.div>
        </div>

        <div className="relative min-h-[320px]">
          <Floating sensitivity={-1} className="overflow-hidden">
            <FloatingElement depth={0.35} className="top-[8%] left-[6%]">
              <motion.img
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                src={HERO_IMAGES[0]}
                className="h-24 w-24 rounded-2xl object-cover shadow-xl ring-1 ring-white/20"
              />
            </FloatingElement>
            <FloatingElement depth={0.65} className="top-[4%] left-[42%]">
              <motion.img
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                src={HERO_IMAGES[1]}
                className="h-28 w-28 rounded-2xl object-cover shadow-xl ring-1 ring-white/20"
              />
            </FloatingElement>
            <FloatingElement depth={1} className="top-[2%] left-[70%]">
              <motion.img
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.36 }}
                src={HERO_IMAGES[2]}
                className="h-40 w-28 rounded-2xl object-cover shadow-xl ring-1 ring-white/20"
              />
            </FloatingElement>
            <FloatingElement depth={1.5} className="top-[32%] left-[12%]">
              <motion.img
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.44 }}
                src={HERO_IMAGES[3]}
                className="h-32 w-32 rounded-2xl object-cover shadow-xl ring-1 ring-white/20"
              />
            </FloatingElement>
            <FloatingElement depth={1} className="top-[46%] left-[52%]">
              <motion.img
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.52 }}
                src={HERO_IMAGES[4]}
                className="h-36 w-48 rounded-3xl object-cover shadow-xl ring-1 ring-white/20"
              />
            </FloatingElement>
            <FloatingElement depth={0.5} className="top-[66%] left-[24%]">
              <motion.img
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                src={HERO_IMAGES[5]}
                className="h-28 w-36 rounded-2xl object-cover shadow-xl ring-1 ring-white/20"
              />
            </FloatingElement>
          </Floating>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
