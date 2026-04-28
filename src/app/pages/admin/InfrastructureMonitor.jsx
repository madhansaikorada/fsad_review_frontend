import { CheckCircle, AlertTriangle, XCircle, Activity, Zap, Droplet, Wind, Wifi, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { PageWrapper, PageHeader } from '../../components/ui/PageWrapper';

const infrastructureData = [
  { id: '1', name: 'Water Supply System',    category: 'Utilities',    status: 'ok',       metric: '98% Capacity',        location: 'North Treatment Plant', lastChecked: '5 mins ago',  icon: Droplet  },
  { id: '2', name: 'Power Grid – Sector A',  category: 'Energy',       status: 'ok',       metric: '85% Load',            location: 'Central Power Station', lastChecked: '2 mins ago',  icon: Zap      },
  { id: '3', name: 'Air Quality Monitors',   category: 'Environment',  status: 'warning',  metric: 'AQI: 78 (Moderate)',  location: 'City-wide Network',     lastChecked: '1 min ago',   icon: Wind     },
  { id: '4', name: 'Traffic Management',     category: 'Transport',    status: 'ok',       metric: 'Normal Flow',         location: 'Downtown District',     lastChecked: '3 mins ago',  icon: Activity },
  { id: '5', name: 'Communication Network',  category: 'Technology',   status: 'ok',       metric: '99.9% Uptime',        location: 'Main Data Center',      lastChecked: '1 min ago',   icon: Wifi     },
  { id: '6', name: 'Water Quality Sensors',  category: 'Utilities',    status: 'critical', metric: 'pH Level Alert',      location: 'South Reservoir',       lastChecked: '30 secs ago', icon: Droplet  },
  { id: '7', name: 'Power Grid – Sector B',  category: 'Energy',       status: 'warning',  metric: '92% Load',            location: 'East Substation',       lastChecked: '4 mins ago',  icon: Zap      },
  { id: '8', name: 'Emergency Alert System', category: 'Safety',       status: 'ok',       metric: 'All Systems Active',  location: 'City-wide',             lastChecked: '2 mins ago',  icon: Activity },
];

const statusCfg = {
  ok:       { label: 'Operational', dot: 'bg-emerald-400', pill: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20', icon: CheckCircle,   iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/15', border: 'border-emerald-500/10' },
  warning:  { label: 'Warning',     dot: 'bg-amber-400',   pill: 'bg-amber-500/15 text-amber-300 border-amber-500/20',       icon: AlertTriangle, iconColor: 'text-amber-400',   iconBg: 'bg-amber-500/15',   border: 'border-amber-500/15' },
  critical: { label: 'Critical',    dot: 'bg-red-400',     pill: 'bg-red-500/15 text-red-300 border-red-500/20',             icon: XCircle,       iconColor: 'text-red-400',     iconBg: 'bg-red-500/15',     border: 'border-red-500/20' },
};

export function InfrastructureMonitor() {
  const okCount       = infrastructureData.filter(i => i.status === 'ok').length;
  const warningCount  = infrastructureData.filter(i => i.status === 'warning').length;
  const criticalCount = infrastructureData.filter(i => i.status === 'critical').length;
  const healthPct     = Math.round((okCount / infrastructureData.length) * 100);

  return (
    <div className="min-h-screen bg-[#0A0E1A] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader title="Infrastructure Monitor" subtitle="Real-time status of city infrastructure systems" />

        {/* Summary row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { count: okCount,       label: 'Operational', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle },
            { count: warningCount,  label: 'Warning',     color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/20',     icon: AlertTriangle },
            { count: criticalCount, label: 'Critical',    color: 'text-red-400',     bg: 'bg-red-500/10 border-red-500/20',         icon: XCircle },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`surface-card ${s.bg} border p-5`}
            >
              <s.icon className={`w-7 h-7 ${s.color} mb-3`} />
              <div className={`text-3xl font-bold ${s.color} mb-0.5`}>{s.count}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Health bar */}
        <div className="surface-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-slate-100">Overall System Health</h2>
              <p className="text-xs text-slate-500 mt-0.5">Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-slate-100">{healthPct}%</div>
              <div className="text-xs text-slate-500">Healthy</div>
            </div>
          </div>
          <div className="h-2 bg-white/[0.07] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${healthPct}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
            />
          </div>
        </div>

        {/* System cards */}
        <section>
          <SectionHeader title="System Status" subtitle={`${infrastructureData.length} monitored systems`} className="mb-4" />
          <div className="grid md:grid-cols-2 gap-4">
            {infrastructureData.map((item, i) => {
              const cfg = statusCfg[item.status];
              const StatusIcon = cfg.icon;
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`surface-card ${cfg.border} border p-5 hover:border-opacity-50 transition-all duration-200`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${cfg.iconBg} flex items-center justify-center shrink-0`}>
                      <ItemIcon className={`w-6 h-6 ${cfg.iconColor}`} strokeWidth={1.5} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-100 truncate">{item.name}</h3>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.pill}`}>{cfg.label}</span>
                        </div>
                        <StatusIcon className={`w-5 h-5 ${cfg.iconColor} shrink-0`} />
                      </div>

                      <dl className="space-y-1 text-xs">
                        {[['Category', item.category], ['Metric', item.metric], ['Location', item.location]].map(([k, v]) => (
                          <div key={k} className="flex gap-2">
                            <dt className="text-slate-600 w-16 shrink-0">{k}:</dt>
                            <dd className="text-slate-400 truncate">{v}</dd>
                          </div>
                        ))}
                      </dl>

                      <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-600">
                        <Activity className="w-3 h-3" /> Checked {item.lastChecked}
                      </div>

                      {item.status !== 'ok' && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.05]">
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className={`w-1.5 h-1.5 rounded-full ${item.status === 'critical' ? 'bg-red-400' : 'bg-amber-400'}`}
                          />
                          <span className={`text-xs font-medium ${item.status === 'critical' ? 'text-red-400' : 'text-amber-400'}`}>
                            {item.status === 'critical' ? 'Immediate Action Required' : 'Monitoring Required'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
