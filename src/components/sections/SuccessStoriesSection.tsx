import { useEffect, useState } from 'react';
import { Sparkles, Trophy, ArrowUpRight } from 'lucide-react';
import { API_BASE as DEFAULT_API_BASE, fetchJson } from '@/lib/api';

type Story = {
  id: number;
  student_name: string;
  exam: string;
  score: string;
  image_url: string;
  highlight?: string | null;
};

const API_BASE = import.meta.env.VITE_API_BASE ?? DEFAULT_API_BASE;

export default function SuccessStoriesSection() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchJson<Story[]>(`${API_BASE}/api/success-stories`);
        setStories(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load success stories');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section id="success" className="py-20 px-6 md:px-12 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Success Stories
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Scores we are proud of</h2>
            <p className="text-muted-foreground max-w-2xl">
              Real exam outcomes curated by the admin team. Each story highlights the effort, mentorship, and scores achieved by our learners.
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-border shadow-sm px-5 py-4 text-sm text-muted-foreground flex items-center gap-3">
            <Trophy className="h-10 w-10 text-amber-500" />
            <div>
              <p className="font-semibold text-foreground">Verified by admin</p>
              <p>Images, exams, and scores are managed directly from the admin panel.</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={story.image_url}
                  alt={story.student_name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <span>{story.exam}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-primary font-semibold">
                    <ArrowUpRight className="h-3 w-3" /> {story.score}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{story.student_name}</h3>
                {story.highlight && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{story.highlight}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        {loading && (
          <p className="mt-6 text-sm text-muted-foreground">Loading the latest stories…</p>
        )}
        {!loading && stories.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">No success stories published yet.</p>
        )}
      </div>
    </section>
  );
}
