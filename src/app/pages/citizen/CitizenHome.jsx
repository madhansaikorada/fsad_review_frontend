import { useNavigate } from 'react-router';
import { Search, Heart, Bus, Droplet, Trees, AlertCircle, Plus, TrendingUp, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PageWrapper, PageHeader } from '../../components/ui/PageWrapper';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { GlowButton } from '../../components/ui/GlowButton';
import { useState } from 'react';

const categories = [
  { icon: Heart,       label: 'Health',     gradient: 'from-rose-500 to-pink-600',     glow: 'rgba(244,63,94,0.3)',  path: '/citizen/services' },
  { icon: Bus,         label: 'Transport',  gradient: 'from-blue-500 to-cyan-600',     glow: 'rgba(59,130,246,0.3)', path: '/citizen/services' },
  { icon: Droplet,     label: 'Utilities',  gradient: 'from-cyan-500 to-teal-600',     glow: 'rgba(34,211,238,0.3)', path: '/citizen/services' },
  { icon: Trees,       label: 'Parks',      gradient: 'from-emerald-500 to-green-600', glow: 'rgba(16,185,129,0.3)', path: '/citizen/services' },
  { icon: AlertCircle, label: 'Emergency',  gradient: 'from-orange-500 to-red-600',    glow: 'rgba(249,115,22,0.3)', path: '/citizen/services' },
  { icon: MapPin,      label: 'More',       gradient: 'from-violet-500 to-indigo-600', glow: 'rgba(139,92,246,0.3)', path: '/citizen/services' },
];

const newsItems = [
  { id: 1, title: 'New Public Transportation Routes', description: '5 new bus routes added to improve city connectivity across all zones.', date: '2 hours ago', tag: 'Transport', color: 'from-blue-500 to-cyan-500', dot: 'bg-blue-400' },
  { id: 2, title: 'Smart Street Lights Installation', description: 'City-wide smart lighting project now underway — 60% complete.', date: '1 day ago',   tag: 'Infrastructure', color: 'from-violet-500 to-purple-500', dot: 'bg-violet-400' },
  { id: 3, title: 'Community Health Camp',            description: 'Free health checkup at Central Park this weekend. Open for all.', date: '2 days ago',  tag: 'Health', color: 'from-rose-500 to-pink-500', dot: 'bg-rose-400' },
];

const quickStats = [
  { label: 'Active Services', value: '248', icon: TrendingUp, change: '+12 this month' },
  { label: 'Open Reports',    value: '12',  icon: AlertCircle, change: '3 resolved today' },
];

export function CitizenHome() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden bg-[#0D1117] border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(34,211,238,0.1)_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(99,102,241,0.08)_0%,_transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-slate-500 font-medium mb-1">Good day, Citizen 👋</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 mb-2 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              How can we <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">help you today?</span>
            </h1>
            <p className="text-slate-500 mb-7 text-sm">Search for services, track reports, and stay informed.</p>

            {/* Search */}
            <div className="relative max-w-2xl mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search services, parks, utilities..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full h-12 pl-11 pr-4 bg-white/[0.06] border border-white/[0.1] rounded-xl text-slate-100 text-sm placeholder:text-slate-500
                  focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all duration-200"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              {quickStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass rounded-xl p-4"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <stat.icon className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs text-slate-500">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{stat.change}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-10">

        {/* Categories */}
        <section>
          <SectionHeader title="Browse Categories" subtitle="Find services by category" className="mb-5" />
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.button
                  key={cat.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -3, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(cat.path)}
                  className="surface-card p-4 md:p-5 flex flex-col items-center gap-3 hover:border-white/[0.14] transition-all duration-200 group"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                    style={{ boxShadow: `0 0 16px ${cat.glow}` }}
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-slate-100 transition-colors">{cat.label}</span>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <SectionHeader title="Quick Actions" className="mb-4" />
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Report an Issue',
                desc: 'Found a problem? Let us know instantly.',
                gradient: 'from-orange-600/25 to-red-600/10',
                border: 'border-orange-500/20',
                icon: Plus,
                iconBg: 'bg-orange-500/20',
                iconColor: 'text-orange-400',
                path: '/citizen/report',
              },
              {
                title: 'Track My Reports',
                desc: 'View the status of your issue submissions.',
                gradient: 'from-cyan-600/20 to-teal-600/10',
                border: 'border-cyan-500/20',
                icon: AlertCircle,
                iconBg: 'bg-cyan-500/20',
                iconColor: 'text-cyan-400',
                path: '/citizen/my-reports',
              },
            ].map((action) => (
              <motion.div
                key={action.title}
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(action.path)}
                className={`surface-card ${action.border} p-6 cursor-pointer flex items-center gap-5 group relative overflow-hidden hover:border-opacity-40 transition-all duration-200`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} pointer-events-none`} />
                <div className={`relative z-10 w-14 h-14 rounded-2xl ${action.iconBg} flex items-center justify-center shrink-0`}>
                  <action.icon className={`w-7 h-7 ${action.iconColor}`} />
                </div>
                <div className="relative z-10 flex-1">
                  <h3 className="font-semibold text-slate-100 mb-0.5">{action.title}</h3>
                  <p className="text-sm text-slate-500">{action.desc}</p>
                </div>
                <ArrowRight className="relative z-10 w-5 h-5 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1 transition-all duration-200" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* City Updates */}
        <section>
          <SectionHeader
            title="City Updates"
            subtitle="Latest news and announcements"
            action={<GlowButton variant="ghost" size="sm">View All</GlowButton>}
            className="mb-4"
          />
          <div className="space-y-3">
            {newsItems.map((news, i) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 2, transition: { duration: 0.15 } }}
                className="surface-card p-5 cursor-pointer hover:border-white/[0.12] transition-all duration-200 flex gap-4 group"
              >
                <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                  <div className={`w-2 h-2 rounded-full ${news.dot}`} />
                  <div className="w-px flex-1 bg-white/[0.06]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r ${news.color} text-white`}>
                      {news.tag}
                    </span>
                    <span className="text-xs text-slate-600">{news.date}</span>
                  </div>
                  <h3 className="font-semibold text-slate-200 text-sm mb-0.5 group-hover:text-slate-100 transition-colors">{news.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{news.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
