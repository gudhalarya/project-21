import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BadgeCheck, Eye, EyeOff, Loader2, Lock, LogIn, ShieldCheck } from 'lucide-react';
import { API_BASE, fetchJson } from '@/lib/api';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem('admin_username') || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson<{ token: string; expires_in: number }>(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (remember) {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_username', username);
      } else {
        sessionStorage.setItem('admin_token', data.token);
        sessionStorage.setItem('admin_username', username);
      }

      setPassword('');
      setSuccess('You are signed in. Redirecting to dashboard…');
      setTimeout(() => navigate('/admin/dashboard'), 600);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-center">
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 ring-1 ring-white/20">
            <ShieldCheck className="h-4 w-4" /> Admin Console
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-black leading-tight">Secure access to your admin panel</h1>
            <p className="text-slate-200/80 text-lg">Manage success stories, verify submissions, and keep your public site fresh.</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="rounded-3xl bg-white text-slate-900 shadow-2xl ring-1 ring-black/5 backdrop-blur">
            <div className="border-b border-slate-100 px-8 py-5 flex items-center gap-3">
              <span className="rounded-full bg-primary/10 p-2 text-primary"><Lock className="h-5 w-5" /></span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Admin Login</p>
                <p className="text-lg font-bold">Use your console credentials</p>
              </div>
            </div>
            <form className="space-y-5 px-8 py-7" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Username</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  placeholder="e.g. admin"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                  <label>Password</label>
                  <button type="button" className="text-primary flex items-center gap-1" onClick={() => setShowPassword((v) => !v)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm focus:border-primary focus:bg-white focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <BadgeCheck className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-600">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  Keep me signed in on this device
                </label>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-white text-sm font-semibold shadow-lg shadow-primary/30 hover:translate-y-[-1px] transition disabled:opacity-60"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />} Sign in to console
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
