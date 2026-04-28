import { Outlet, useNavigate, useLocation } from 'react-router';
import { LayoutDashboard, Database, Settings, Activity, FileText, LogOut, Menu, X, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';
import { useEffect, useState } from 'react';
import { ThemeToggle, ThemeToggleCompact } from '../components/ui/ThemeToggle';

const navItems = [
  { path: '/admin',               icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/reports',       icon: FileText,        label: 'View Reports' },
  { path: '/admin/services',      icon: Settings,        label: 'Services' },
  { path: '/admin/infrastructure', icon: Activity,       label: 'Infrastructure' },
  { path: '/admin/city-info',     icon: Database,        label: 'City Info' },
];

function NavItem({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onClick(item.path)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
        active
          ? 'bg-indigo-500/15 text-indigo-300 shadow-[inset_0_0_0_1px_rgba(99,102,241,0.2)]'
          : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
      }`}
    >
      {active && (
        <motion.div
          layoutId="admin-nav-pill"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-indigo-400 rounded-full"
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      )}
      <Icon className={`w-4.5 h-4.5 shrink-0 ml-1 ${active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} strokeWidth={active ? 2.5 : 2} />
      <span>{item.label}</span>
    </button>
  );
}

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, setUserRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setUserRole(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  useEffect(() => {
    if (!userRole || userRole !== 'admin') navigate('/login');
  }, [userRole, navigate]);

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex">
      <Toaster />

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex flex-col w-60 bg-[#0D1117] border-r border-white/[0.06] fixed left-0 top-0 bottom-0 z-40">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Building2 className="w-4.5 h-4.5 text-white" strokeWidth={2} />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-100" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>SmartCity</div>
            <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Admin Portal</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <div className="text-[10px] text-slate-600 font-semibold uppercase tracking-widest px-3 py-2 mt-1">Navigation</div>
          {navItems.map((item) => (
            <NavItem key={item.path} item={item} active={isActive(item.path)} onClick={handleNavClick} />
          ))}
        </nav>

        {/* Bottom: theme toggle + logout */}
        <div className="p-3 border-t border-white/[0.06] space-y-1">
          {/* Theme toggle row */}
          <div className="flex items-center justify-between px-3 py-2.5">
            <span className="text-xs text-slate-500 font-medium">Appearance</span>
            <ThemeToggle />
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
          >
            <LogOut className="w-4.5 h-4.5 shrink-0 ml-1 group-hover:text-red-400" strokeWidth={2} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile Header ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#0D1117]/90 backdrop-blur-xl border-b border-white/[0.06] z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <div className="text-sm font-bold text-slate-100" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>SmartCity</div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggleCompact />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:bg-white/[0.08] hover:text-slate-200 transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="md:hidden fixed top-14 right-0 bottom-0 w-64 bg-[#0D1117] border-l border-white/[0.06] z-50"
            >
              <nav className="p-3 space-y-0.5">
                {navItems.map((item) => (
                  <NavItem key={item.path} item={item} active={isActive(item.path)} onClick={handleNavClick} />
                ))}
                <div className="pt-3 mt-3 border-t border-white/[0.06] space-y-1">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-xs text-slate-500">Appearance</span>
                    <ThemeToggle />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
                  >
                    <LogOut className="w-4.5 h-4.5 shrink-0 ml-1" strokeWidth={2} />
                    Logout
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <main className="flex-1 md:ml-60 pt-14 md:pt-0 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
