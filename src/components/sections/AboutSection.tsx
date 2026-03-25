import { motion } from "motion/react";
import { ArrowRight, CalendarCheck, Sparkles, Target } from "lucide-react";
import React from "react";

const highlights = [
  {
    k: "01",
    title: "Mission",
    Icon: Sparkles,
    headline: "Ignite confidence through practice.",
    body: "Structured routines, tight feedback loops, and the kind of clarity that makes hard topics feel learnable.",
  },
  {
    k: "02",
    title: "Philosophy",
    Icon: Target,
    headline: "Depth over speed. Focus over volume.",
    body: "We optimize for understanding first—then build speed with timed drills, smarter revision, and mistake analysis.",
  },
  {
    k: "03",
    title: "Legacy",
    Icon: CalendarCheck,
    headline: "Small batches. Big outcomes.",
    body: "Mentorship that feels personal: progress plans, weekly checkpoints, and a coaching team that stays accountable with you.",
  },
];

const stats = [
  { label: "Avg. batch size", value: "12" },
  { label: "Weekly checkpoints", value: "2×" },
  { label: "Daily practice plan", value: "45 min" },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative bg-background px-6 py-24 md:px-12 md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-48 left-0 h-[420px] w-[420px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground">
              About
            </p>
            <h2 className="mt-4 text-4xl font-extrabold uppercase tracking-tighter md:text-6xl">
              Built for consistency.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              A modern coaching system that turns effort into measurable progress—without burning
              students out. Learn the concept, practice with intent, then lock it in with revision.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Daily drills", "Mistake analysis", "Weekly reviews", "Exam strategy"].map((chip) => (
                <div
                  key={chip}
                  className="rounded-full border border-primary/10 bg-background/70 px-4 py-2 text-xs font-black uppercase tracking-widest text-muted-foreground backdrop-blur"
                >
                  {chip}
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 rounded-[1.5rem] border border-primary/10 bg-background/70 p-6 backdrop-blur">
              {stats.map((s) => (
                <div key={s.label} className="text-left">
                  <div className="text-2xl font-black tracking-tight md:text-3xl">{s.value}</div>
                  <div className="mt-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {highlights.map((h, idx) => (
                <motion.div
                  key={h.k}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="group rounded-[1.5rem] border border-primary/10 bg-background/60 p-6 shadow-sm backdrop-blur transition-colors duration-300 hover:border-primary/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">
                      {h.k} / {h.title}
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 text-foreground transition-colors duration-300 group-hover:from-primary/25 group-hover:to-purple-500/25">
                      <h.Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-6 text-xl font-black uppercase tracking-tighter">
                    {h.headline}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {h.body}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mt-6 overflow-hidden rounded-[1.75rem] border border-primary/10 bg-gradient-to-r from-primary/10 via-transparent to-purple-500/10 p-[1px]"
            >
              <div className="rounded-[1.7rem] bg-background/80 px-8 py-8 backdrop-blur">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-2xl font-black uppercase tracking-tighter md:text-3xl">
                      Your next 30 days, mapped.
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground md:text-base">
                      Get a clear plan: topics, practice sets, and revision blocks—designed around your goal.
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black uppercase tracking-widest text-primary-foreground"
                  >
                    Start a free audit <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <div className="mt-4 text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground">
                  Or explore <a href="#programs" className="text-foreground underline underline-offset-4">programs</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
