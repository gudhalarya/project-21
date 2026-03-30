import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mailbox, FileText, ShieldCheck, LogOut } from 'lucide-react';

const cards = [
  {
    title: 'Contact Messages',
    description: 'Review, update status, add notes, or delete contact submissions.',
    to: '/admin/messages',
    icon: Mailbox,
    accent: 'bg-primary/10 text-primary',
  },
  {
    title: 'Success Stories',
    description: 'Add exam results with images and highlights for the public site.',
    to: '/admin/success-stories',
    icon: FileText,
    accent: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'Testimonials',
    description: 'Publish student and parent testimonials that appear site-wide.',
    to: '/admin/testimonials',
    icon: ShieldCheck,
    accent: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: 'Faculty',
    description: 'Keep the featured faculty roster updated with bios and photos.',
    to: '/admin/faculty',
    icon: ShieldCheck,
    accent: 'bg-blue-100 text-blue-700',
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token') || localStorage.getItem('admin_token');
    if (!token) navigate('/admin/login', { replace: true });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="container mx-auto px-6 py-12 space-y-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Admin</p>
            <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Jump to a section to manage your site.
            </p>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:-translate-y-0.5 hover:shadow transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ title, description, to, icon: Icon, accent }) => (
            <div
              key={title}
              className="rounded-2xl border border-border/70 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition"
            >
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${accent}`}>
                <Icon className="h-4 w-4" /> Active
              </div>
              <h2 className="mt-4 text-xl font-bold">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              <Link
                to={to}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-2 underline-offset-4"
              >
                Open
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
