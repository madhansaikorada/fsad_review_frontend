import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Home, MapPin, FileText, MessageSquare, LogOut, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';
import { ThemeToggle, ThemeToggleCompact } from '../components/ui/ThemeToggle';

const navItems = [
  { path: '/citizen',          icon: Home,          label: 'Home' },
  { path: '/citizen/services', icon: MapPin,         label: 'Services' },
  { path: '/citizen/my-reports',icon: FileText,      label: 'Reports' },
  { path: '/citizen/feedback', icon: MessageSquare,  label: 'Feedback' },
];

export function CitizenLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, setUserRole } = useApp();

  const handleLogout = () => {
    setUserRole(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  useEffect(() => {
    if (!userRole || userRole !== 'citizen') navigate('/login');
  }, [userRole, navigate]);

  const isActive = (path) => {
    if (path === '/citizen') return location.pathname === '/citizen';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex flex-col md:flex-row">
      <Toaster />

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex flex-col w-60 bg-[#0D1117] border-r border-white/[0.06] fixed left-0 top-0 bottom-0 z-40">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Building2 className="w-4.5 h-4.5 text-white" strokeWidth={2} />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-100" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>SmartCity</div>
            <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Citizen Portal</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <div className="text-[10px] text-slate-600 font-semibold uppercase tracking-widest px-3 py-2 mt-1">Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                  active
                    ? 'bg-cyan-500/12 text-cyan-300 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.18)]'
                    : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="citizen-nav-pill"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-cyan-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon
                  className={`w-4.5 h-4.5 shrink-0 ml-1 ${active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom: theme toggle + logout */}
        <div className="p-3 border-t border-white/[0.06] space-y-1">
          <div className="flex items-center justify-between px-3 py-2.5">
            <span className="text-xs text-slate-500 font-medium">Appearance</span>
            <ThemeToggle />
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
          >
            <LogOut className="w-4.5 h-4.5 shrink-0 ml-1" strokeWidth={2} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile Top Bar ── */}
      <header className="md:hidden sticky top-0 z-40 h-14 bg-[#0D1117]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <span className="text-sm font-bold text-slate-100" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>SmartCity</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggleCompact />
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="flex-1 md:ml-60 pb-20 md:pb-0 min-h-screen">
        <Outlet />
      </main>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0D1117]/90 backdrop-blur-xl border-t border-white/[0.06] z-40 safe-area-pb">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center gap-1 relative transition-all duration-200 ${
                  active ? 'text-cyan-400' : 'text-slate-600 hover:text-slate-400'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="mobile-citizen-tab"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
