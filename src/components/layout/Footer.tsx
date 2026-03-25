import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-20 px-6 border-t border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 space-y-12 md:space-y-0">
          <div className="max-w-md">
            <h2 className="text-4xl font-extrabold uppercase tracking-tighter mb-6">Apex</h2>
            <p className="text-muted-foreground uppercase tracking-widest text-sm leading-relaxed">
              Dedicated to the pursuit of academic excellence since 2012. Our mission is to shape the leaders of tomorrow through rigorous intellectual development.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-20">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] mb-8 text-white/50">Navigation</h3>
              <ul className="space-y-4 uppercase tracking-widest text-xs font-bold">
                <li><a href="#about" className="hover:opacity-50 transition-opacity">About</a></li>
                <li><a href="#programs" className="hover:opacity-50 transition-opacity">Programs</a></li>
                <li><a href="#faculty" className="hover:opacity-50 transition-opacity">Faculty</a></li>
                <li><a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] mb-8 text-white/50">Social</h3>
              <ul className="space-y-4 uppercase tracking-widest text-xs font-bold">
                <li className="flex items-center space-x-2"><Linkedin className="w-4 h-4" /> <a href="#" className="hover:opacity-50 transition-opacity">LinkedIn</a></li>
                <li className="flex items-center space-x-2"><Twitter className="w-4 h-4" /> <a href="#" className="hover:opacity-50 transition-opacity">Twitter</a></li>
                <li className="flex items-center space-x-2"><Instagram className="w-4 h-4" /> <a href="#" className="hover:opacity-50 transition-opacity">Instagram</a></li>
                <li className="flex items-center space-x-2"><Facebook className="w-4 h-4" /> <a href="#" className="hover:opacity-50 transition-opacity">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[10px] uppercase tracking-widest text-white/30">
            &copy; 2026 Apex Coaching Institute. All rights reserved.
          </p>
          <div className="flex space-x-8 text-[10px] uppercase tracking-widest text-white/30">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
