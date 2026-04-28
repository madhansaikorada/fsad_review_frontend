import { useNavigate } from 'react-router';
import { Building2, AlertCircle, CheckCircle, Activity, Users, TrendingUp, ArrowRight, MessageSquare, Database, Settings, Clock, MapPin, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { GlowButton } from '../../components/ui/GlowButton';
import { SectionHeader } from '../../components/ui/SectionHeader';

const statusPills = {
  'pending':     'bg-amber-500/15 text-amber-300 border-amber-500/20',
  'in-progress': 'bg-blue-500/15 text-blue-300 border-blue-500/20',
  'resolved':    'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
};

export function AdminDashboard() {
  const navigate = useNavigate();
  const { reports, feedback } = useApp();

  const stats = {
    totalServices:        248,
    openReports:          reports.filter(r => r.status !== 'resolved').length,
    infrastructureAlerts: 3,
    activeCitizens:       12847,
    resolvedToday:        reports.filter(r => r.status === 'resolved').length,
    avgResponseTime:      '2.5 days',
  };

  const statCards = [
    { icon: Building2,   label: 'Total Services',    value: stats.totalServices,                   gradient: 'from-indigo-500 to-violet-600', delay: 0 },
    { icon: AlertCircle, label: 'Open Reports',       value: stats.openReports,                     gradient: 'from-amber-500 to-orange-600',  delay: 0.06 },
    { icon: Activity,    label: 'Infra Alerts',       value: stats.infrastructureAlerts,            gradient: 'from-red-500 to-rose-600',      delay: 0.12 },
    { icon: Users,       label: 'Active Citizens',    value: stats.activeCitizens.toLocaleString(), gradient: 'from-cyan-500 to-teal-600',     delay: 0.18 },
    { icon: CheckCircle, label: 'Resolved Today',     value: stats.resolvedToday,                   gradient: 'from-emerald-500 to-green-600', delay: 0.24 },
    { icon: TrendingUp,  label: 'Avg Response',       value: stats.avgResponseTime,                 gradient: 'from-violet-500 to-purple-600', delay: 0.30 },
  ];

  const quickActions = [
    { label: 'View All Reports', icon: AlertCircle,   gradient: 'from-amber-600/30 to-orange-600/15', border: 'border-amber-500/20', path: '/admin/reports' },
    { label: 'Update Services',  icon: Settings,       gradient: 'from-indigo-600/30 to-violet-600/15', border: 'border-indigo-500/20', path: '/admin/services' },
    { label: 'View Feedback',    icon: MessageSquare, gradient: 'from-emerald-600/30 to-teal-600/15',  border: 'border-emerald-500/20', path: '/admin/feedback' },
    { label: 'Infrastructure',   icon: Activity,      gradient: 'from-red-600/30 to-rose-600/15',      border: 'border-red-500/20',    path: '/admin/infrastructure' },
    { label: 'City Information', icon: Database,      gradient: 'from-cyan-600/30 to-blue-600/15',     border: 'border-cyan-500/20',   path: '/admin/city-info' },
  ];

  const recentReports = reports.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#0A0E1A] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-7">

        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back — here's what's happening today.</p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map(({ icon: Icon, label, value, gradient, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay }}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              className="surface-card p-4 relative overflow-hidden group"
            >
              <div className={`absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`} />
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 shadow-lg`}>
                <Icon className="w-4.5 h-4.5 text-white" strokeWidth={2} />
              </div>
              <div className="text-2xl font-bold text-slate-100 mb-0.5">{value}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick actions */}
        <section>
          <SectionHeader title="Quick Actions" subtitle="Jump to any section" className="mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(action.path)}
                  className={`surface-card ${action.border} p-5 cursor-pointer hover:border-opacity-50 transition-all duration-200 group relative overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} pointer-events-none`} />
                  <div className="relative z-10">
                    <Icon className="w-6 h-6 text-slate-400 group-hover:text-slate-200 transition-colors mb-3" strokeWidth={1.5} />
                    <p className="text-sm font-semibold text-slate-300 group-hover:text-slate-100 transition-colors leading-tight">{action.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Recent reports */}
        <section>
          <SectionHeader
            title="Recent Reports"
            subtitle={`${recentReports.length} latest submissions`}
            action={
              <GlowButton variant="ghost" size="sm" onClick={() => navigate('/admin/reports')}>
                View All <ArrowRight className="w-3.5 h-3.5" />
              </GlowButton>
            }
            className="mb-4"
          />

          {recentReports.length === 0 ? (
            <div className="surface-card p-12 text-center">
              <AlertCircle className="w-8 h-8 text-slate-700 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No reports yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentReports.map((report, i) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  whileHover={{ x: 2, transition: { duration: 0.15 } }}
                  className="surface-card p-4 cursor-pointer hover:border-white/[0.12] transition-all duration-200 flex items-start gap-4"
                  onClick={() => navigate('/admin/reports')}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    report.status === 'pending' ? 'bg-amber-500/15' : report.status === 'in-progress' ? 'bg-blue-500/15' : 'bg-emerald-500/15'
                  }`}>
                    {report.status === 'pending' ? <Clock className="w-5 h-5 text-amber-400" /> :
                     report.status === 'in-progress' ? <Activity className="w-5 h-5 text-blue-400" /> :
                     <CheckCircle className="w-5 h-5 text-emerald-400" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-200">{report.issueType}</h3>
                        <p className="text-xs text-slate-500">{report.citizenName}</p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusPills[report.status] || statusPills['pending']}`}>
                        {report.status?.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mb-1.5">{report.description}</p>
                    <div className="flex gap-3 text-xs text-slate-600">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{report.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(report.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
