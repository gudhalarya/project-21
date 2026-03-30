import { useEffect, useMemo, useState } from 'react';
import { Loader2, LogIn, Plus, RefreshCw, Save, Trash2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE as DEFAULT_API_BASE, fetchJson } from '@/lib/api';

type Testimonial = {
  id: number;
  author: string;
  program: string;
  quote: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

const API_BASE = import.meta.env.VITE_API_BASE ?? DEFAULT_API_BASE;

const empty: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'> = {
  author: '',
  program: '',
  quote: '',
  image_url: '',
};

export default function AdminTestimonials() {
  const navigate = useNavigate();
  const getStoredToken = () => sessionStorage.getItem('admin_token') || localStorage.getItem('admin_token') || '';
  const getStoredUser = () => sessionStorage.getItem('admin_username') || localStorage.getItem('admin_username') || '';

  const [token, setToken] = useState(() => getStoredToken());
  const [username, setUsername] = useState(() => getStoredUser());
  const [password, setPassword] = useState('');
  const [rows, setRows] = useState<Testimonial[]>([]);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  const headers = useMemo(() => {
    const h: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token.startsWith('ey')) {
      h['Authorization'] = `Bearer ${token}`;
    } else if (token) {
      h['x-admin-token'] = token;
    }
    return h;
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchAll();
  }, [token, navigate]);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson<Testimonial[]>(`${API_BASE}/api/admin/testimonials`, { headers });
      setRows(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson<{ token: string }>(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      setToken(data.token);
      localStorage.setItem('admin_username', username);
      localStorage.setItem('admin_token', data.token);
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken('');
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_username');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    navigate('/admin/login');
  };

  const createRow = async () => {
    if (!form.author || !form.program || !form.quote || !form.image_url) {
      setError('Fill author, program, quote, image URL.');
      return;
    }
    setCreating(true);
    setError(null);
    try {
      const created = await fetchJson<Testimonial>(`${API_BASE}/api/admin/testimonials`, {
        method: 'POST',
        headers,
        body: JSON.stringify(form),
      });
      setRows((prev) => [created, ...prev]);
      setForm(empty);
    } catch (err: any) {
      setError(err.message || 'Failed to create');
    } finally {
      setCreating(false);
    }
  };

  const updateRow = async (row: Testimonial) => {
    setSavingId(row.id);
    setError(null);
    try {
      const updated = await fetchJson<Testimonial>(`${API_BASE}/api/admin/testimonials/${row.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(row),
      });
      setRows((prev) => prev.map((r) => (r.id === row.id ? updated : r)));
    } catch (err: any) {
      setError(err.message || 'Failed to update');
    } finally {
      setSavingId(null);
    }
  };

  const deleteRow = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/admin/testimonials/${id}`, { method: 'DELETE', headers });
      if (!res.ok && res.status !== 204) throw new Error(`Failed to delete (${res.status})`);
      setRows((prev) => prev.filter((r) => r.id !== id));
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
            <h1 className="text-3xl font-black tracking-tight">Testimonials</h1>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="text"
              placeholder="Admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              disabled={!!token}
            />
            {!token && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            )}
            {!token ? (
              <button
                onClick={login}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-primary text-white px-3 py-2 text-sm font-semibold shadow-sm hover:-translate-y-0.5 hover:shadow transition"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
                Login
              </button>
            ) : (
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:-translate-y-0.5 hover:shadow transition"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            )}
            <button
              onClick={fetchAll}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:-translate-y-0.5 hover:shadow transition"
              disabled={loading || !token}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-border/70 bg-white shadow-sm p-6 space-y-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add testimonial
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <input
              className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm"
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
            />
            <input
              className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm"
              placeholder="Program"
              value={form.program}
              onChange={(e) => setForm((f) => ({ ...f, program: e.target.value }))}
            />
            <input
              className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm md:col-span-2 lg:col-span-1"
              placeholder="Image URL"
              value={form.image_url}
              onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
            />
            <textarea
              className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm md:col-span-2 lg:col-span-3"
              placeholder="Quote"
              value={form.quote}
              onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
            />
          </div>
          <button
            onClick={createRow}
            disabled={creating}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white text-sm font-semibold shadow hover:bg-primary/90 disabled:opacity-60"
          >
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Publish testimonial
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/70 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-border/80">
            <thead className="bg-secondary/40">
              <tr className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-left">Program</th>
                <th className="px-4 py-3 text-left">Quote</th>
                <th className="px-4 py-3 text-left">Image URL</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {rows.map((r) => (
                <tr key={r.id} className="align-top text-sm">
                  <td className="px-4 py-3 font-semibold text-foreground/80">{r.id}</td>
                  <td className="px-4 py-3">
                    <input
                      className="w-full rounded border border-border bg-muted/20 px-2 py-1 text-sm"
                      value={r.author}
                      onChange={(e) =>
                        setRows((prev) => prev.map((row) => (row.id === r.id ? { ...row, author: e.target.value } : row)))
                      }
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      className="w-full rounded border border-border bg-muted/20 px-2 py-1 text-sm"
                      value={r.program}
                      onChange={(e) =>
                        setRows((prev) => prev.map((row) => (row.id === r.id ? { ...row, program: e.target.value } : row)))
                      }
                    />
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <textarea
                      className="w-full resize-y rounded border border-border bg-muted/20 p-2 text-sm"
                      value={r.quote}
                      onChange={(e) =>
                        setRows((prev) => prev.map((row) => (row.id === r.id ? { ...row, quote: e.target.value } : row)))
                      }
                    />
                  </td>
                  <td className="px-4 py-3 min-w-[12rem]">
                    <input
                      className="w-full rounded border border-border bg-muted/20 px-2 py-1 text-sm"
                      value={r.image_url}
                      onChange={(e) =>
                        setRows((prev) => prev.map((row) => (row.id === r.id ? { ...row, image_url: e.target.value } : row)))
                      }
                    />
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 space-y-2">
                    <button
                      onClick={() => updateRow(r)}
                      disabled={savingId === r.id}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-white text-xs font-semibold shadow hover:bg-primary/90 disabled:opacity-60"
                    >
                      {savingId === r.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      Save
                    </button>
                    <button
                      onClick={() => deleteRow(r.id)}
                      disabled={deletingId === r.id}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-destructive text-xs font-semibold hover:bg-destructive/20 disabled:opacity-60"
                    >
                      {deletingId === r.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                    {loading ? 'Loading…' : 'No testimonials yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
