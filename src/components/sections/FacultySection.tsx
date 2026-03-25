import React from 'react';
import { motion } from 'motion/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const faculty = [
  {
    name: "Dr. Elena Vance",
    role: "Head of Sciences",
    bio: "PhD in Theoretical Physics from MIT with 15+ years of coaching excellence.",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_43ec0564-86ed-4398-83ce-d2b558cb77d3.jpg"
  },
  {
    name: "Prof. Marcus Thorne",
    role: "Mathematics Lead",
    bio: "Expert in Advanced Calculus and competitive problem-solving strategies.",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_54c5882e-8bda-43d0-a47e-3bbed5228a02.jpg"
  },
  {
    name: "Sarah Jenkins",
    role: "Language Arts",
    bio: "Dedicated to improving critical reading and effective communication skills.",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_b776c47b-d8f7-4831-9d8e-5ddcd16b4ec2.jpg"
  },
  {
    name: "Arthur Penhaligon",
    role: "Skill Development",
    bio: "Specialist in behavioral science and student performance psychology.",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_9e16baf5-c68d-4663-b144-3ba2406d0ece.jpg"
  }
];

const FacultySection = () => {
  return (
    <section id="faculty" className="py-24 px-6 md:px-12 bg-background border-t">
      <div className="container mx-auto">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter mb-6">Expert Minds</h2>
            <p className="text-muted-foreground uppercase tracking-[0.4em] text-sm">Our mentors define the standard of excellence.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {faculty.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-none bg-transparent group overflow-hidden">
                <div className="relative mb-6 overflow-hidden aspect-[3/4]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                     <div className="text-white text-sm uppercase tracking-widest font-bold">Faculty Member</div>
                  </div>
                </div>
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-2xl font-bold uppercase tracking-tighter leading-none">{member.name}</CardTitle>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-50 mt-2">{member.role}</p>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground text-sm uppercase leading-relaxed mt-4">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
