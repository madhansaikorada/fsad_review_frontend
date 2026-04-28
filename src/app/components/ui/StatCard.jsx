import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * StatCard — glassmorphism metric card used on dashboards
 *
 * @param {React.ElementType} icon  - Lucide icon component
 * @param {string} label            - metric label
 * @param {string|number} value     - display value
 * @param {string} [trend]          - "+12%" or "-5%" etc
 * @param {string} [color]          - tailwind gradient string e.g. "from-indigo-500 to-violet-600"
 * @param {number} [delay]          - framer motion stagger delay
 */
export function StatCard({ icon: Icon, label, value, trend, color = 'from-indigo-500 to-violet-600', delay = 0 }) {
  const isPositive = trend && !trend.startsWith('-');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="surface-card p-5 group relative overflow-hidden"
    >
      {/* Subtle gradient glow in bg */}
      <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`} />

      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
        </div>

        {/* Value */}
        <div className="text-2xl font-bold text-slate-100 font-[Plus_Jakarta_Sans] mb-1">
          {value}
        </div>

        {/* Label + trend */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-slate-500">{label}</span>
          {trend && (
            <span className={`flex items-center gap-0.5 text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
