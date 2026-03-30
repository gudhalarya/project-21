import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Loader2, RefreshCw, Trash2, Save, LogOut, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE as DEFAULT_API_BASE, fetchJson } from '@/lib/api';

type Message = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  status: string;
  notes?: string | null;
  created_at: string;
  updated_at: string;
};

const API_BASE = import.meta.env.VITE_API_BASE ?? DEFAULT_API_BASE;

const statusOptions = ['new', 'in_progress', 'resolved', 'archived'];

export default function AdminMessages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [info, setInfo] = useState<string | null>(null);

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

  const fetchMessages = async () => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson<Message[]>(`${API_BASE}/api/admin/messages`, { headers });
      setMessages(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMessages();
    } else {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  const updateMessage = async (msg: Message) => {
    setSavingId(msg.id);
    setError(null);
    try {
      const updated = await fetchJson<Message>(`${API_BASE}/api/admin/messages/${msg.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: msg.status, notes: msg.notes, message: msg.message }),
      });
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? updated : m)));
    } catch (err: any) {
      setError(err.message || 'Failed to update');
    } finally {
      setSavingId(null);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Delete this message?')) return;
    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (!res.ok && res.status !== 204) throw new Error(`Failed to delete (${res.status})`);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    sessionStorage.removeItem('admin_username');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background text-foreground">
      <div className="container mx-auto px-6 py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Admin
            </p>
            <h1 className="text-3xl font-black tracking-tight">Contact Messages</h1>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={fetchMessages}
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
        {info && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {info}
          </div>
        )}

        <div className="overflow-x-auto rounded-2xl border border-border/70 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-border/80">
            <thead className="bg-secondary/40">
              <tr className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Message</th>
                <th className="px-4 py-3 text-left">Notes</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {messages.map((m) => (
                <tr key={m.id} className="align-top text-sm">
                  <td className="px-4 py-3 font-semibold text-foreground/80">{m.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{m.name}</div>
                  </td>
                  <td className="px-4 py-3">
                    <a className="text-primary underline" href={`mailto:${m.email}`}>
                      {m.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{m.phone || '—'}</td>
                  <td className="px-4 py-3 max-w-xs text-muted-foreground">
                    <textarea
                      className="w-full resize-y rounded border border-border bg-muted/30 p-2 text-sm"
                      defaultValue={m.message}
                      onChange={(e) =>
                        setMessages((prev) =>
                          prev.map((row) => (row.id === m.id ? { ...row, message: e.target.value } : row)),
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <textarea
                      className="w-full resize-y rounded border border-border bg-muted/30 p-2 text-sm"
                      placeholder="Admin notes"
                      defaultValue={m.notes || ''}
                      onChange={(e) =>
                        setMessages((prev) =>
                          prev.map((row) => (row.id === m.id ? { ...row, notes: e.target.value } : row)),
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      className="rounded border border-border bg-muted/30 px-2 py-1 text-sm"
                      value={m.status}
                      onChange={(e) =>
                        setMessages((prev) =>
                          prev.map((row) => (row.id === m.id ? { ...row, status: e.target.value } : row)),
                        )
                      }
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(m.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 space-y-2">
                    <button
                      onClick={() => updateMessage(m)}
                      disabled={savingId === m.id}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-white text-xs font-semibold shadow hover:bg-primary/90 disabled:opacity-60"
                    >
                      {savingId === m.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      Save
                    </button>
                    <button
                      onClick={() => deleteMessage(m.id)}
                      disabled={deletingId === m.id}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-destructive text-xs font-semibold hover:bg-destructive/20 disabled:opacity-60"
                    >
                      {deletingId === m.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-muted-foreground">
                    {loading ? 'Loading…' : 'No messages yet.'}
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
