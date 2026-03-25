import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';

const StatCounter = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(spring, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-8 space-y-4 border border-primary/10 hover:border-primary transition-all duration-300 rounded-[1.5rem]" data-cursor="Stat">
      <div className="text-6xl md:text-8xl font-black uppercase tracking-tighter flex items-end">
        <motion.span>{displayValue}</motion.span>
        <span className="text-3xl md:text-4xl mb-2 ml-1">{suffix}</span>
      </div>
      <p className="text-sm md:text-md uppercase tracking-widest text-muted-foreground text-center font-bold">
        {label}
      </p>
    </div>
  );
};

const WhyChooseUsSection = () => {
  const differentiators = [
    {
      number: "01",
      title: "Expert Faculty",
      description: "Mentors from top universities with decades of collective coaching experience."
    },
    {
      number: "02",
      title: "Proven Results",
      description: "Consistent high-ranking scores in national exams across multiple disciplines."
    },
    {
      number: "03",
      title: "Personalized Attention",
      description: "Small batch sizes and 1-on-1 feedback loops to ensure no student is left behind."
    },
    {
      number: "04",
      title: "Structured Curriculum",
      description: "Scientifically designed study plans that build on foundational knowledge."
    }
  ];

  return (
    <section id="why-us" className="py-24 px-6 md:px-12 bg-black text-white overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <StatCounter value={98} suffix="%" label="Success Rate" />
          <StatCounter value={15} suffix="+" label="Expert Faculty" />
          <StatCounter value={5000} suffix="+" label="Alumni" />
          <StatCounter value={12} suffix="yr" label="Excellence" />
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter mb-8 leading-none">
              Why Apex <br /> stands alone.
            </h2>
            <p className="text-xl text-muted-foreground uppercase tracking-widest mb-12 max-w-lg leading-relaxed">
              We don't just teach courses; we build intellectual foundations that last a lifetime.
            </p>
          </div>
          
          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-white/10 hover:border-white transition-all duration-300"
              >
                <div className="text-4xl font-black mb-4 opacity-20">{item.number}</div>
                <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">{item.title}</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wider leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
