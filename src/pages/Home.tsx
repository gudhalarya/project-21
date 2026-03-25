import React from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProgramsSection from '@/components/sections/ProgramsSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import FacultySection from '@/components/sections/FacultySection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import { motion, useScroll, useTransform } from 'motion/react';

const StackedSection = ({ children, index }: { children: React.ReactNode, index: number }) => {
  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      {children}
    </div>
  );
};

const Home = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-sora selection:bg-primary selection:text-primary-foreground no-scrollbar">
      <CustomCursor />
      <Navigation />
      
      <main className="relative">
        {/* Hero Section as first sticky layer */}
        <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
          <HeroSection />
        </div>

        {/* About Section stacks on top of Hero */}
        <div className="relative z-10">
          <AboutSection />
        </div>

        {/* Following sections stack on top of About */}
        <div className="relative z-20 bg-background rounded-t-[3rem] md:rounded-t-[6rem] -mt-12 md:-mt-24 shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.15)] border-t border-primary/5">
           <ProgramsSection />
           <WhyChooseUsSection />
           <FacultySection />
           <TestimonialsSection />
           <ContactSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
