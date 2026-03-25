import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Programs', href: '#programs' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Faculty', href: '#faculty' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const navItem = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? 'bg-background/90 backdrop-blur-xl border-b py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-2xl font-bold tracking-tighter uppercase relative group overflow-hidden"
          data-cursor="Top"
        >
          Apex
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-xs font-bold hover:opacity-50 transition-all duration-300 uppercase tracking-[0.3em] relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.name}
            </button>
          ))}
          <Button 
            variant="default" 
            className="uppercase tracking-widest px-8 h-12 rounded-full font-bold transition-transform hover:scale-105"
            onClick={() => scrollToSection('#contact')}
            data-cursor="Enroll"
          >
            Enroll Now
          </Button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[110] w-10 h-10 flex flex-col justify-center items-center group"
          >
            <span className={`w-6 h-[2px] bg-primary transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[2px]' : '-translate-y-1'}`} />
            <span className={`w-6 h-[2px] bg-primary mt-1 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[2px]' : 'translate-y-1'}`} />
          </button>
        </div>

        {/* Fullscreen Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-background z-[105] flex flex-col justify-center items-center px-6"
            >
              <motion.div 
                variants={navContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center space-y-8"
              >
                {navLinks.map((link) => (
                  <motion.button
                    key={link.name}
                    variants={navItem}
                    onClick={() => scrollToSection(link.href)}
                    className="text-5xl font-extrabold uppercase tracking-tighter hover:opacity-50 transition-opacity"
                  >
                    {link.name}
                  </motion.button>
                ))}
                <motion.div variants={navItem} className="w-full pt-8">
                  <Button 
                    variant="default" 
                    size="lg"
                    className="w-full text-xl h-16 uppercase tracking-widest rounded-full font-bold"
                    onClick={() => scrollToSection('#contact')}
                  >
                    Enroll Now
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
