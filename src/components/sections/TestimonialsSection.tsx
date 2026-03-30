import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from 'lucide-react';
import { API_BASE as DEFAULT_API_BASE, fetchJson } from '@/lib/api';

const API_BASE = import.meta.env.VITE_API_BASE ?? DEFAULT_API_BASE;

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  program: string;
  image_url: string;
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<Testimonial[]>(`${API_BASE}/api/testimonials`)
      .then(setTestimonials)
      .catch((err) => setError(err.message || "Failed to load testimonials"));
  }, []);

  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 bg-black text-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter mb-4">Success Stories</h2>
            <p className="text-muted-foreground uppercase tracking-[0.4em] text-sm">Hear from our alumni network.</p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto px-12 relative">
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}
          {testimonials.length === 0 && !error && (
            <p className="text-sm text-white/60 text-center mb-6">No testimonials published yet.</p>
          )}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="bg-transparent border-none text-white text-center" data-cursor="Next">
                      <CardContent className="flex flex-col items-center justify-center p-6 space-y-12">
                        <Quote className="w-16 h-16 mb-4 opacity-20" />
                        <blockquote className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-tight">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="flex flex-col items-center">
                          <img
                            src={testimonial.image_url}
                            alt={testimonial.author}
                            className="w-24 h-24 rounded-full border-4 border-white/10 mb-6 object-cover shadow-2xl"
                          />
                          <p className="text-2xl font-black uppercase tracking-widest leading-none">{testimonial.author}</p>
                          <p className="text-sm font-bold uppercase tracking-[0.4em] opacity-40 mt-4">{testimonial.program}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-transparent border-white/20 hover:bg-white hover:text-black rounded-none -left-4 md:-left-12" />
            <CarouselNext className="bg-transparent border-white/20 hover:bg-white hover:text-black rounded-none -right-4 md:-right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
