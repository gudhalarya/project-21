import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const text1 = "Our Mission";
  const text2 = "Our Philosophy";
  const text3 = "Our Legacy";

  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.4], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.5, 0.6, 0.7], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8, 0.9, 1], [0, 1, 1, 0]);

  const y1 = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);
  const y3 = useTransform(scrollYProgress, [0.6, 0.8], [50, 0]);

  return (
    <section id="about" ref={containerRef} className="relative h-[300vh] bg-black text-white px-6">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-12">
        <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute flex flex-col items-center justify-center">
          <h3 className="text-sm md:text-md uppercase tracking-[0.5em] mb-4 text-muted-foreground opacity-50">01 / Mission</h3>
          <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
            We exist to inspire excellence and empower student potential.
          </h2>
        </motion.div>

        <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute flex flex-col items-center justify-center">
          <h3 className="text-sm md:text-md uppercase tracking-[0.5em] mb-4 text-muted-foreground opacity-50">02 / Philosophy</h3>
          <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
            Deep focus, critical thinking, and disciplined growth.
          </h2>
        </motion.div>

        <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute flex flex-col items-center justify-center">
          <h3 className="text-sm md:text-md uppercase tracking-[0.5em] mb-4 text-muted-foreground opacity-50">03 / Legacy</h3>
          <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
            Founded in 2012, Apex has shaped thousands of leaders.
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
