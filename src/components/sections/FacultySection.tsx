import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { API_BASE as DEFAULT_API_BASE, fetchJson } from '@/lib/api';

const API_BASE = import.meta.env.VITE_API_BASE ?? DEFAULT_API_BASE;

type Faculty = {
  id: number;
  name: string;
  role: string;
  bio: string;
  image_url: string;
};

const FacultySection = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<Faculty[]>(`${API_BASE}/api/faculty`)
      .then(setFaculty)
      .catch((err) => setError(err.message || 'Failed to load faculty'));
  }, []);

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

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {faculty.length === 0 && !error && (
            <p className="text-sm text-muted-foreground col-span-4">No faculty published yet.</p>
          )}
          {faculty.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-none bg-transparent group overflow-hidden" data-cursor="Profile">
                <div className="relative mb-6 overflow-hidden aspect-[3/4] rounded-[1.5rem]">
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="object-cover w-full h-full saturate-110 contrast-105 transition-all duration-700 scale-100 group-hover:scale-110"
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
