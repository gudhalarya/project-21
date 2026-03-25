import React from 'react';
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

const testimonials = [
  {
    quote: "Apex gave me the discipline and analytical tools to tackle my exams with confidence. The mentorship is truly personalized.",
    author: "James Wilson",
    program: "Competitive Prep",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_fba4395f-e2f2-4762-bd6d-57c1a7e0a73e.jpg"
  },
  {
    quote: "The academic support here is unparalleled. I went from struggling with calculus to topping my class in just six months.",
    author: "Sophia Chen",
    program: "Academic Tutoring",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_50b8b710-14bf-47a7-a1fb-10caae89fcdd.jpg"
  },
  {
    quote: "Skills I learned at Apex, especially public speaking and logic, have helped me beyond just academics.",
    author: "Michael O'Neill",
    program: "Skill Development",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_3068d5b4-7e2a-4a36-8ceb-a0cc2a58bd0c.jpg"
  }
];

const TestimonialsSection = () => {
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
                            src={testimonial.image}
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
