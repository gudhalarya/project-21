import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const words = "Excellence. Authority. Clarity.".split(" ");
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 150,
      },
    },
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 150,
      },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-background">
      <motion.div style={{ y, opacity, scale }} className="z-10 flex flex-col items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center overflow-hidden py-4"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={child}
              className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter mx-4 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-[2px] bg-primary w-24 my-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-2xl text-muted-foreground uppercase tracking-[0.4em] max-w-3xl font-bold px-4"
        >
          Crafting the Next Generation of Visionaries and High-Performance Scholars.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16"
        >
          <Button
            variant="default"
            size="lg"
            data-cursor="Start"
            className="h-16 px-16 text-xl font-black uppercase tracking-widest rounded-full hover:scale-110 transition-transform duration-300"
            onClick={() => scrollToSection('#programs')}
          >
            Explore Programs
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 cursor-pointer z-20"
        onClick={() => scrollToSection('#about')}
      >
        <div className="w-[1px] h-20 bg-primary/20 relative overflow-hidden">
           <motion.div 
            animate={{ top: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute left-0 w-full h-full bg-primary"
           />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
