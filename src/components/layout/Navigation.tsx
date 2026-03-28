import React, { useEffect, useState } from 'react';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNavigate = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed inset-x-0 top-0 z-50 ${
        scrolled ? 'backdrop-blur-xl bg-background/85 border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-2xl font-black uppercase tracking-tight text-foreground"
        >
          Apex
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavigate(item.href)}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="h-6 w-px bg-border" />
          <Button size="sm" className="bg-[hsl(48,94%,58%)] text-foreground font-bold" onClick={() => handleNavigate('#contact')}>
            Book Call
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="container mx-auto px-6 pt-24 flex flex-col gap-6">
              {links.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigate(item.href)}
                  className="w-full text-left text-2xl font-bold uppercase tracking-tight text-foreground hover:text-[hsl(48,94%,58%)] transition-colors"
                >
                  {item.label}
                </button>
              ))}

              <div className="mt-4 flex flex-col gap-3">
                <Button className="w-full" onClick={() => handleNavigate('#contact')}>
                  Talk to us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  +1 (555) 012-3456
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;
