import { useNavigate } from 'react-router';
import { MapPin, FileText, Users, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cityInfo } from '../data';
import { GlowButton } from '../components/ui/GlowButton';

const serviceHighlights = [
  { label: 'Transport & Mobility', description: 'Public transit, smart traffic updates and city mobility support for daily commuters.' },
  { label: 'Utilities & Water',    description: 'Water supply, energy management, and smart city utilities kept reliable for everyone.' },
  { label: 'Emergency Services',   description: 'Rapid response services for fire, medical and safety support, available 24/7.' },
];

const cityLeaders = [
  { name: 'Sri Rajamohan Reddy', title: 'Mayor' },
  { name: 'Dr. K. Sudhakar',     title: 'Commissioner' },
  { name: 'Smt. Priya Reddy',    title: 'Deputy Commissioner' },
  { name: 'Mr. Anil Kumar',      title: 'Public Safety Director' },
  { name: 'Ms. Swathi Rao',      title: 'City Planning Chief' },
];

export function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 via-transparent to-cyan-600/10 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 text-center">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-4">
              <MapPin className="w-3 h-3" /> Vijayawada, Andhra Pradesh
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100 mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Welcome to{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                SmartCity
              </span>
            </h1>
            <p className="text-slate-500 text-lg mb-6">Your City, Simplified.</p>
            <GlowButton variant="primary" size="lg" onClick={() => navigate('/login')}>
              Continue to Login <ChevronRight className="w-4 h-4" />
            </GlowButton>
          </motion.div>
        </div>
      </div>

      {/* ── Cards ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="grid gap-5 lg:grid-cols-3">
          {/* City Details */}
          <motion.div
            className="surface-card p-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-indigo-400" />
              </div>
              <h2 className="text-base font-semibold text-slate-100">City Details</h2>
            </div>
            <dl className="space-y-2.5">
              {[
                ['Name', cityInfo.name],
                ['Population', cityInfo.population],
                ['Area', cityInfo.area],
                ['Mayor', cityInfo.mayor],
                ['Established', cityInfo.established],
                ['Email', cityInfo.email],
                ['Website', cityInfo.website],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 py-1.5 border-b border-white/[0.04] last:border-0">
                  <dt className="text-sm text-slate-500 shrink-0">{k}</dt>
                  <dd className="text-sm text-slate-300 text-right break-all">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Services */}
          <motion.div
            className="surface-card p-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-base font-semibold text-slate-100">Services Overview</h2>
            </div>
            <div className="space-y-5">
              {serviceHighlights.map((s, i) => (
                <div key={s.label}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-indigo-400' : i === 1 ? 'bg-cyan-400' : 'bg-orange-400'}`} />
                    <span className="text-sm font-semibold text-slate-200">{s.label}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed pl-3.5">{s.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Leadership */}
          <motion.div
            className="surface-card p-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-violet-400" />
              </div>
              <h2 className="text-base font-semibold text-slate-100">Leaders & Administrators</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              Key leaders driving planning, public safety, and service delivery.
            </p>
            <div className="space-y-3">
              {cityLeaders.map((l, i) => (
                <div key={l.name} className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xs text-slate-300 font-semibold shrink-0">
                    {l.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-200">{l.name}</div>
                    <div className="text-xs text-slate-500">{l.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        >
          <GlowButton variant="primary" size="lg" onClick={() => navigate('/login')}>
            Continue to Login <ChevronRight className="w-5 h-5" />
          </GlowButton>
        </motion.div>
      </div>
    </div>
  );
}