"use client";

import React, { useEffect, useState } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utils";
import { API_BASE as DEFAULT_API_BASE, fetchJson } from "@/lib/api";

const API_BASE = import.meta.env.VITE_API_BASE ?? DEFAULT_API_BASE;

type Card = {
  id: number;
  author: string;
  program: string;
  quote: string;
  image_url: string;
};

function ClientFeedback() {
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<Card[]>(`${API_BASE}/api/testimonials`)
      .then(setCards)
      .catch((err) => setError(err.message || "Failed to load testimonials"));
  }, []);

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

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex w-full flex-col gap-2 px-4 pb-4 pt-10 lg:grid lg:grid-cols-3 lg:gap-2 lg:px-10 lg:py-10">
          {cards.length === 0 && (
            <p className="text-sm text-gray-500 col-span-3">No testimonials published yet.</p>
          )}
          {cards.map((card, idx) => (
            <TimelineCard key={card.id} index={idx} data={card} />
          ))}
        </div>

        <div className="absolute bottom-4 z-[2] h-16 w-[90%] border-b-2 border-[#e6e6e6] md:left-0 md:w-full md:translate-x-0 left-[5%]">
          <div className="container relative mx-auto h-full w-full before:absolute before:-left-2 before:-bottom-2 before:h-4 before:w-4 before:bg-white before:border before:border-gray-300 before:shadow-sm after:absolute after:-right-2 after:-bottom-2 after:h-4 after:w-4 after:bg-white after:border after:border-gray-300 after:shadow-sm" />
        </div>
      </section>
    </main>
  );
}

const TimelineCard = ({ data, index, className }: { data: Card; index: number; className?: string }) => {
  const tones = ["bg-primary/10 text-black", "bg-blue-600 text-white", "bg-[#111111] text-white"];
  const tone = tones[index % tones.length];

  const gridOverlay =
    "absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]";

  return (
    <TimelineContent
      className={cn(
        "relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-gray-200 p-5",
        tone,
        className
      )}
    >
      {tone === "bg-primary/10 text-black" && <div className={gridOverlay} />}
      <article className="mt-auto">
        <p className="text-sm leading-relaxed md:text-base">{data.quote}</p>
        <div className="flex items-end justify-between pt-5">
          <div>
            <h2 className="text-lg font-semibold md:text-xl">{data.author}</h2>
            <p className="text-xs md:text-sm opacity-80">{data.program}</p>
          </div>
          <img
            src={data.image_url}
            alt={data.author}
            className="h-12 w-12 rounded-xl object-cover md:h-16 md:w-16"
            loading="lazy"
          />
        </div>
      </article>
    </TimelineContent>
  );
};

export default ClientFeedback;
