import { useEffect, useMemo, useState } from 'react';
import { Loader2, Plus, RefreshCw, Save, Trash2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE as DEFAULT_API_BASE, fetchJson } from '@/lib/api';

type Story = {
  id: number;
  student_name: string;
  exam: string;
  score: string;
  image_url: string;
  highlight?: string | null;
  created_at: string;
  updated_at: string;
};
const API_BASE = import.meta.env.VITE_API_BASE ?? DEFAULT_API_BASE;

const emptyStory: Omit<Story, 'id' | 'created_at' | 'updated_at'> = {
  student_name: '',
  exam: '',
  score: '',
  image_url: '',
  highlight: '',
};

export default function AdminSuccessStories() {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);
  const [form, setForm] = useState(emptyStory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  const token = sessionStorage.getItem('admin_token') || localStorage.getItem('admin_token') || '';

  const headers = useMemo(() => {
    const h: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token.startsWith('ey')) {
      h['Authorization'] = `Bearer ${token}`;
    } else if (token) {
      h['x-admin-token'] = token;
    }
    return h;
  }, [token]);

  const fetchStories = async () => {
    if (!token) {
      setError('Enter admin token to load success stories.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson<Story[]>(`${API_BASE}/api/admin/success-stories`, { headers });
      setStories(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchStories();
    } else {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  const logout = () => {
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_username');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    navigate('/admin/login');
  };

  const createStory = async () => {
    if (!form.student_name || !form.exam || !form.score || !form.image_url) {
      setError('Please fill student name, exam, score, and image URL.');
      return;
    }
    setCreating(true);
    setError(null);
    try {
      const created = await fetchJson<Story>(`${API_BASE}/api/admin/success-stories`, {
        method: 'POST',
        headers,
        body: JSON.stringify(form),
      });
      setStories((prev) => [created, ...prev]);
      setForm(emptyStory);
    } catch (err: any) {
      setError(err.message || 'Failed to create');
    } finally {
      setCreating(false);
    }
  };

  const updateStory = async (story: Story) => {
    setSavingId(story.id);
    setError(null);
    try {
      const updated = await fetchJson<Story>(`${API_BASE}/api/admin/success-stories/${story.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          student_name: story.student_name,
          exam: story.exam,
          score: story.score,
          image_url: story.image_url,
          highlight: story.highlight,
        }),
      });
      setStories((prev) => prev.map((s) => (s.id === story.id ? updated : s)));
    } catch (err: any) {
      setError(err.message || 'Failed to update');
    } finally {
      setSavingId(null);
    }
  };

  const deleteStory = async (id: number) => {
    if (!confirm('Delete this success story?')) return;
    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/admin/success-stories/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (!res.ok && res.status !== 204) throw new Error(`Failed to delete (${res.status})`);
      setStories((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background text-foreground">
      <div className="container mx-auto px-6 py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Admin</p>
            <h1 className="text-3xl font-black tracking-tight">Success Stories</h1>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={fetchStories}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:-translate-y-0.5 hover:shadow transition"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:-translate-y-0.5 hover:shadow transition"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Create form */}
        <div className="rounded-2xl border border-border/70 bg-white shadow-sm p-6 space-y-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add success story
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <input
              className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm"
              placeholder="Student name"
              value={form.student_name}
              onChange={(e) => setForm((f) => ({ ...f, student_name: e.target.value }))}
            />
            <input
              className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm"
              placeholder="Exam (e.g., JEE Advanced 2025)"
              value={form.exam}
              onChange={(e) => setForm((f) => ({ ...f, exam: e.target.value }))}
            />
            <input
              className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm"
              placeholder="Score / Rank"
              value={form.score}
              onChange={(e) => setForm((f) => ({ ...f, score: e.target.value }))}
            />
            <input
              className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm md:col-span-2 lg:col-span-1"
              placeholder="Image URL"
              value={form.image_url}
              onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
            />
            <textarea
              className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm md:col-span-2 lg:col-span-2"
              placeholder="Highlight (optional)"
              value={form.highlight || ''}
              onChange={(e) => setForm((f) => ({ ...f, highlight: e.target.value }))}
            />
          </div>
          <button
            onClick={createStory}
            disabled={creating}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white text-sm font-semibold shadow hover:bg-primary/90 disabled:opacity-60"
          >
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Publish story
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-border/70 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-border/80">
            <thead className="bg-secondary/40">
              <tr className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Exam</th>
                <th className="px-4 py-3 text-left">Score</th>
                <th className="px-4 py-3 text-left">Image URL</th>
                <th className="px-4 py-3 text-left">Highlight</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {stories.map((s) => (
                <tr key={s.id} className="align-top text-sm">
                  <td className="px-4 py-3 font-semibold text-foreground/80">{s.id}</td>
                  <td className="px-4 py-3">
                    <input
                      className="w-full rounded border border-border bg-muted/20 px-2 py-1 text-sm"
                      value={s.student_name}
                      onChange={(e) =>
                        setStories((prev) =>
                          prev.map((row) => (row.id === s.id ? { ...row, student_name: e.target.value } : row))
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      className="w-full rounded border border-border bg-muted/20 px-2 py-1 text-sm"
                      value={s.exam}
                      onChange={(e) =>
                        setStories((prev) => prev.map((row) => (row.id === s.id ? { ...row, exam: e.target.value } : row)))
                      }
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      className="w-full rounded border border-border bg-muted/20 px-2 py-1 text-sm"
                      value={s.score}
                      onChange={(e) =>
                        setStories((prev) =>
                          prev.map((row) => (row.id === s.id ? { ...row, score: e.target.value } : row))
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-3 min-w-[12rem]">
                    <input
                      className="w-full rounded border border-border bg-muted/20 px-2 py-1 text-sm"
                      value={s.image_url}
                      onChange={(e) =>
                        setStories((prev) =>
                          prev.map((row) => (row.id === s.id ? { ...row, image_url: e.target.value } : row))
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <textarea
                      className="w-full resize-y rounded border border-border bg-muted/20 p-2 text-sm"
                      value={s.highlight || ''}
                      onChange={(e) =>
                        setStories((prev) =>
                          prev.map((row) => (row.id === s.id ? { ...row, highlight: e.target.value } : row))
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(s.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 space-y-2">
                    <button
                      onClick={() => updateStory(s)}
                      disabled={savingId === s.id}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-white text-xs font-semibold shadow hover:bg-primary/90 disabled:opacity-60"
                    >
                      {savingId === s.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      Save
                    </button>
                    <button
                      onClick={() => deleteStory(s.id)}
                      disabled={deletingId === s.id}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-destructive text-xs font-semibold hover:bg-destructive/20 disabled:opacity-60"
                    >
                      {deletingId === s.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {stories.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                    {loading ? 'Loading…' : 'No success stories yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-border/70 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-3">Quick tips</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Use a square image URL for best fit (min 600px).</li>
            <li>Score field is free text—enter rank, percentile, or marks.</li>
            <li>Highlight is optional; keep it crisp (1–2 sentences).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
