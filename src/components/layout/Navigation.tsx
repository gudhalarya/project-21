import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InteractiveHoverLinks, INTERACTIVE_LINKS } from '@/components/ui/interactive-hover-links';

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
  };

  const menuLinks: typeof INTERACTIVE_LINKS = [
    {
      heading: 'About',
      subheading: 'Who we are and how we teach',
      imgSrc: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
      href: '#about',
    },
    {
      heading: 'Programs',
      subheading: 'JEE/NEET/Foundation tracks',
      imgSrc: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
      href: '#programs',
    },
    {
      heading: 'Why Us',
      subheading: 'Mentors, mock tests, daily practice',
      imgSrc: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80',
      href: '#why-us',
    },
    {
      heading: 'Faculty',
      subheading: 'Learn from experienced coaches',
      imgSrc: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
      href: '#faculty',
    },
    {
      heading: 'Contact',
      subheading: 'Talk to a counselor today',
      imgSrc: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
      href: '#contact',
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`pointer-events-auto fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
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

        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="rounded-full"
          onClick={() => setOpen(true)}
          data-cursor="Menu"
        >
          <Menu />
        </Button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-background"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              const anchor = target.closest('a') as HTMLAnchorElement | null;
              if (!anchor) return;
              const href = anchor.getAttribute('href') || '';
              if (!href.startsWith('#')) return;
              e.preventDefault();
              scrollToSection(href);
            }}
          >
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="absolute inset-x-0 top-0 border-b bg-background/90 backdrop-blur-xl"
            >
              <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground">
                  Navigation
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close menu"
                  className="rounded-full"
                  onClick={() => setOpen(false)}
                  data-cursor="Close"
                >
                  <X />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ delay: 0.05, duration: 0.25 }}
              className="h-full w-full overflow-y-auto pt-16"
            >
              <InteractiveHoverLinks links={menuLinks} />

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mx-auto max-w-5xl px-4 md:px-8 pb-12"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 220, delay: 0.2 }}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-2xl border bg-card p-6"
                >
                  <div>
                    <div className="text-2xl md:text-3xl font-black tracking-tight uppercase">
                      Book a free counseling call
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Get a personalized study plan and batch recommendation.
                    </div>
                  </div>
                  <Button
                    variant="default"
                    className="h-12 px-10 rounded-full uppercase tracking-widest font-bold"
                    onClick={() => scrollToSection('#contact')}
                    data-cursor="Enroll"
                  >
                    Enroll Now
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
