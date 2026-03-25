import React from "react";
import { Button } from "@/components/ui/button";
import { BentoCell, BentoGrid, ContainerScale, ContainerScroll } from "@/components/ui/hero-gallery-scroll-animation";

const HERO_IMAGES = [
  // Group study table
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=80",
  // Classroom teaching
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&q=80",
  // Student with laptop & notes
  "https://images.unsplash.com/photo-1488197047962-b48492212cda?w=1400&q=80",
  // Library focus
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1400&q=80",
  // Mentor-led session
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400&q=80",
];

const HeroSection = () => {
  return (
    <section className="relative w-full bg-white">
      <ContainerScroll className="h-[420vh]">
        <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4 md:p-8">
          {HERO_IMAGES.map((imageUrl, index) => (
            <BentoCell
              key={index}
              className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5 bg-white"
            >
              <img
                className="h-full w-full object-cover object-center"
                src={imageUrl}
                alt="Coaching classroom"
                loading="lazy"
              />
            </BentoCell>
          ))}
        </BentoGrid>

        <ContainerScale className="relative z-10 text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Crack exams with deliberate practice.
          </h1>
          <p className="my-6 mx-auto max-w-2xl text-base text-slate-600 md:text-lg">
            Live doubt rooms, daily practice sets, weekly analytics, and mentors who stay on your case
            until concepts stick.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-indigo-600 px-6 py-3 text-sm font-semibold tracking-tight hover:bg-indigo-500">
              Book a free session
            </Button>
            <Button variant="outline" className="px-6 py-3 text-sm font-semibold tracking-tight">
              View programs
            </Button>
          </div>
        </ContainerScale>
      </ContainerScroll>
    </section>
  );
};

export default HeroSection;
