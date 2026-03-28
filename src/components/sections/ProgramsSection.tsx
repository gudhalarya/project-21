import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const programs = [
  {
    title: "Competitive Prep",
    description: "Intensive training for national level competitive exams with focus on logic and speed.",
    duration: "12 Months",
    level: "Advanced",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_ea526e8f-1316-4d13-9886-36dba73affed.jpg"
  },
  {
    title: "Academic Tutoring",
    description: "Holistic support for school curriculum, strengthening foundational concepts and grades.",
    duration: "Continuous",
    level: "All Levels",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_5e757af5-6759-4cfd-ad16-8e155b1afd49.jpg"
  },
  {
    title: "Skill Development",
    description: "Workshops focusing on critical thinking, public speaking, and digital literacy.",
    duration: "3 Months",
    level: "Intermediate",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d9eee0e4-4652-4a55-8bb4-8920a4001861.jpg"
  }
];

const ProgramsSection = () => {
  return (
    <section id="programs" className="py-24 px-6 md:px-12 bg-gradient-to-b from-background via-white to-background border-t">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter mb-4">Core Programs</h2>
            <p className="text-muted-foreground uppercase tracking-widest text-sm max-w-lg">
              Tailored learning paths designed for high-performance outcomes.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-0"
          >
            <h3 className="text-8xl font-black opacity-5 select-none leading-none">PROGRAMS</h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-cursor="View"
            >
              <Card className="group relative h-full flex flex-col overflow-hidden border border-primary/12 rounded-[1.5rem] transition-all duration-500 hover:border-primary hover:bg-primary hover:text-white cursor-pointer shadow-sm hover:shadow-2xl">
                <div className="relative h-64 w-full bg-muted overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="object-cover w-full h-full saturate-110 contrast-105 transition-all duration-500 scale-105 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-[hsl(48,94%,58%)] text-foreground border-none rounded-none font-bold uppercase tracking-widest shadow-sm">
                      {program.level}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pt-8">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs uppercase tracking-widest opacity-50 group-hover:opacity-100">{program.duration}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300" />
                  </div>
                  <CardTitle className="text-3xl font-bold uppercase tracking-tighter mb-2">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base group-hover:text-white/80 mb-6 transition-colors duration-300">
                    {program.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
