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
import { motion, AnimatePresence } from 'motion/react';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-sora">
      <CustomCursor />
      <Navigation />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <WhyChooseUsSection />
        <FacultySection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
