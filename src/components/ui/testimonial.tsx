"use client";

import React from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utils";

const cards = [
  {
    quote: "I went from 40% in mocks to 82% in three months. Daily drills and mentor feedback changed everything.",
    name: "Aanya Verma",
    title: "JEE Advanced 2025",
    image: "https://images.unsplash.com/photo-1552053569-232f24f166b1?w=687&q=80",
    tone: "light",
  },
  {
    quote: "Structured timetable, timed practice, and weekly analytics kept me accountable. Cleared NEET with confidence.",
    name: "Rishabh Kulkarni",
    title: "NEET 2024 Top 1%",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=687&q=80",
    tone: "blue",
  },
  {
    quote: "One-on-one doubt clinics and essay reviews pushed my SAT to 1510. Mentors are relentless.",
    name: "Sanaa Rahman",
    title: "SAT 1510",
    image: "https://images.unsplash.com/photo-1502720705749-3c9255857623?w=687&q=80",
    tone: "dark",
  },
  {
    quote: "Physics finally clicked with adaptive revision plans and nightly quizzes. Classroom energy is unbeatable.",
    name: "Kabir Singh",
    title: "Class 12 CBSE",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=687&q=80",
    tone: "dark",
  },
  {
    quote: "Weekly parent reviews plus dashboards kept us aligned. My daughter’s confidence is through the roof.",
    name: "Meera Nair",
    title: "Parent, Foundation",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=687&q=80",
    tone: "dark",
  },
  {
    quote: "Study rooms, proctored mocks, and instant feedback. Scored 99.2 percentile in CUET.",
    name: "Arnav Menon",
    title: "CUET 2024",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=687&q=80",
    tone: "blue",
  },
  {
    quote: "Topic-wise drills plus Friday mentor check-ins mean I stay on track every week.",
    name: "Ishita Roy",
    title: "JEE Main 2025",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=687&q=80",
    tone: "light",
  },
];

function ClientFeedback() {
  return (
    <main className="w-full bg-white">
      <section className="relative container mx-auto h-full rounded-lg bg-white py-14 text-black">
        <article className="mx-auto max-w-screen-md space-y-2 text-center">
          <TimelineContent className="text-3xl font-medium xl:text-4xl">
            <h1>Success stories from our classrooms</h1>
          </TimelineContent>
          <TimelineContent className="mx-auto text-gray-500">
            <p>JEE, NEET, SAT, CUET and Foundation learners sharing what changed for them.</p>
          </TimelineContent>
        </article>

        <div className="flex w-full flex-col gap-2 px-4 pb-4 pt-10 lg:grid lg:grid-cols-3 lg:gap-2 lg:px-10 lg:py-10">
          <div className="flex h-full flex-col gap-2 md:flex lg:gap-0 lg:space-y-2">
            <TimelineCard index={0} data={cards[0]} className="lg:flex-[7] flex-[6]" />
            <TimelineCard index={1} data={cards[1]} className="lg:flex-[3] flex-[4]" />
          </div>

          <div className="flex h-fit flex-col gap-2 md:flex lg:h-full lg:gap-0 lg:space-y-2">
            <TimelineCard index={2} data={cards[2]} />
            <TimelineCard index={3} data={cards[3]} />
            <TimelineCard index={4} data={cards[4]} />
          </div>

          <div className="flex h-full flex-col gap-2 md:flex lg:gap-0 lg:space-y-2">
            <TimelineCard index={5} data={cards[5]} className="lg:flex-[3] flex-[4]" />
            <TimelineCard index={6} data={cards[6]} className="lg:flex-[7] flex-[6]" />
          </div>
        </div>

        <div className="absolute bottom-4 z-[2] h-16 w-[90%] border-b-2 border-[#e6e6e6] md:left-0 md:w-full md:translate-x-0 left-[5%]">
          <div className="container relative mx-auto h-full w-full before:absolute before:-left-2 before:-bottom-2 before:h-4 before:w-4 before:bg-white before:border before:border-gray-300 before:shadow-sm after:absolute after:-right-2 after:-bottom-2 after:h-4 after:w-4 after:bg-white after:border after:border-gray-300 after:shadow-sm" />
        </div>
      </section>
    </main>
  );
}

type Card = (typeof cards)[number];

const TimelineCard = ({ data, index, className }: { data: Card; index: number; className?: string }) => {
  const tones: Record<Card["tone"], string> = {
    light: "bg-primary/10 text-black",
    blue: "bg-blue-600 text-white",
    dark: "bg-[#111111] text-white",
  };

  const gridOverlay =
    "absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]";

  return (
    <TimelineContent
      className={cn(
        "relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-gray-200 p-5",
        tones[data.tone],
        className
      )}
    >
      {data.tone === "light" && <div className={gridOverlay} />}
      <article className="mt-auto">
        <p className="text-sm leading-relaxed md:text-base">{data.quote}</p>
        <div className="flex items-end justify-between pt-5">
          <div>
            <h2 className="text-lg font-semibold md:text-xl">{data.name}</h2>
            <p className="text-xs md:text-sm opacity-80">{data.title}</p>
          </div>
          <img
            src={data.image}
            alt={data.name}
            className="h-12 w-12 rounded-xl object-cover md:h-16 md:w-16"
            loading="lazy"
          />
        </div>
      </article>
    </TimelineContent>
  );
};

export default ClientFeedback;
