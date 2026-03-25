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

  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.25, 0.35], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.5, 0.55, 0.65], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8, 0.85, 1], [0, 1, 1, 0]);

  const y1 = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.5], [100, 0]);
  const y3 = useTransform(scrollYProgress, [0.6, 0.8], [100, 0]);

  const scale1 = useTransform(scrollYProgress, [0.2, 0.35], [1, 0.8]);
  const scale2 = useTransform(scrollYProgress, [0.5, 0.65], [1, 0.8]);
  const scale3 = useTransform(scrollYProgress, [0.8, 1], [1, 0.8]);

  return (
    <section id="about" ref={containerRef} className="relative h-[400vh] bg-black text-white px-6">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center max-w-5xl mx-auto space-y-12 overflow-hidden">
        <motion.div style={{ opacity: opacity1, y: y1, scale: scale1 }} className="absolute flex flex-col items-center justify-center p-8">
          <h3 className="text-sm md:text-md uppercase tracking-[0.6em] mb-6 text-muted-foreground opacity-50">01 / Mission</h3>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-tight">
            Igniting the spark of brilliance.
          </h2>
        </motion.div>

        <motion.div style={{ opacity: opacity2, y: y2, scale: scale2 }} className="absolute flex flex-col items-center justify-center p-8">
          <h3 className="text-sm md:text-md uppercase tracking-[0.6em] mb-6 text-muted-foreground opacity-50">02 / Philosophy</h3>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-tight">
            Depth over speed. Focus over volume.
          </h2>
        </motion.div>

        <motion.div style={{ opacity: opacity3, y: y3, scale: scale3 }} className="absolute flex flex-col items-center justify-center p-8">
          <h3 className="text-sm md:text-md uppercase tracking-[0.6em] mb-6 text-muted-foreground opacity-50">03 / Legacy</h3>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-tight">
            A decade of shaping future leaders.
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
