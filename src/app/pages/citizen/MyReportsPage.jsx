import { useNavigate } from 'react-router';
import { Plus, Clock, CheckCircle, AlertCircle, Calendar, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { GlowButton } from '../../components/ui/GlowButton';
import { SectionHeader } from '../../components/ui/SectionHeader';

const statusConfig = {
  'pending':     { label: 'Pending Review', dot: 'bg-amber-400',   pill: 'bg-amber-500/15 text-amber-300 border-amber-500/20',   icon: Clock,         bar: 'bg-amber-400',     progress: '15%' },
  'in-progress': { label: 'In Progress',    dot: 'bg-blue-400',    pill: 'bg-blue-500/15 text-blue-300 border-blue-500/20',       icon: AlertCircle,   bar: 'bg-blue-400',      progress: '55%' },
  'resolved':    { label: 'Resolved',       dot: 'bg-emerald-400', pill: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20', icon: CheckCircle, bar: 'bg-emerald-400',  progress: '100%' },
};

export function MyReportsPage() {
  const navigate = useNavigate();
  const { reports } = useApp();
  const myReports = reports;

  const stats = {
    pending:    myReports.filter(r => r.status === 'pending').length,
    inProgress: myReports.filter(r => r.status === 'in-progress').length,
    resolved:   myReports.filter(r => r.status === 'resolved').length,
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      {/* Hero */}
      <div className="relative bg-[#0D1117] border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.1)_0%,_transparent_60%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>My Reports</h1>
              <p className="text-sm text-slate-500">Track the status of your submitted issues</p>
            </div>
            <div className="hidden md:block">
              <GlowButton variant="primary" onClick={() => navigate('/citizen/report')}>
                <Plus className="w-4 h-4" /> New Report
              </GlowButton>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Pending',     value: stats.pending,    color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/20' },
              { label: 'In Progress', value: stats.inProgress, color: 'text-blue-400',    bg: 'bg-blue-500/10 border-blue-500/20' },
              { label: 'Resolved',    value: stats.resolved,   color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`glass ${s.bg} border rounded-xl p-4`}
              >
                <div className={`text-2xl md:text-3xl font-bold ${s.color} mb-0.5`}>{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Report List */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        {myReports.length === 0 ? (
          <div className="surface-card p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-slate-200 font-semibold mb-1">No Reports Yet</h3>
            <p className="text-sm text-slate-500 mb-6">You haven't submitted any reports. Start by reporting an issue.</p>
            <GlowButton variant="primary" onClick={() => navigate('/citizen/report')}>
              <Plus className="w-4 h-4" /> Report an Issue
            </GlowButton>
          </div>
        ) : (
          <div className="space-y-4">
            {myReports.map((report, i) => {
              const cfg = statusConfig[report.status] || statusConfig['pending'];
              const StatusIcon = cfg.icon;
              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="surface-card p-5 md:p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0`}>
                      <StatusIcon className="w-6 h-6 text-slate-400" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="text-base font-semibold text-slate-100">{report.issueType}</h3>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.pill}`}>{cfg.label}</span>
                      </div>

                      <p className="text-sm text-slate-400 mb-3 leading-relaxed">{report.description}</p>

                      <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                          {report.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                          {new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>

                      {/* Progress bar */}
                      {report.status !== 'pending' && (
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex-1 h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: cfg.progress }}
                              transition={{ duration: 1, delay: 0.4 + i * 0.06 }}
                              className={`h-full ${cfg.bar} rounded-full`}
                            />
                          </div>
                          <span className="text-xs text-slate-500 w-10 text-right">{cfg.progress}</span>
                        </div>
                      )}

                      {/* Admin response */}
                      {report.adminResponse && (
                        <div className="bg-indigo-500/[0.07] border border-indigo-500/20 rounded-xl p-3 mb-3">
                          <p className="text-xs font-semibold text-indigo-300 mb-1">Response from City Administration</p>
                          <p className="text-xs text-slate-400 leading-relaxed">{report.adminResponse}</p>
                        </div>
                      )}

                      {/* Feedback CTA */}
                      {report.status === 'resolved' && (
                        <GlowButton variant="secondary" size="sm" onClick={() => navigate('/citizen/feedback')}>
                          <CheckCircle className="w-3.5 h-3.5" /> Give Feedback
                        </GlowButton>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile FAB */}
      <button
        onClick={() => navigate('/citizen/report')}
        className="md:hidden fixed bottom-20 right-4 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
