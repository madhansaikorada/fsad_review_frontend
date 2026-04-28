import { useNavigate } from 'react-router';
import { MapPin, Globe2, Info, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cityInfo } from '../data';
import { GlowButton } from '../components/ui/GlowButton';

export function CityDetailsPage() {
  const navigate = useNavigate();

  const infoRows = [
    ['Name', cityInfo.name],
    ['Population', cityInfo.population],
    ['Area', cityInfo.area],
    ['Mayor', cityInfo.mayor],
    ['Established', cityInfo.established],
    ['Email', cityInfo.email],
    ['Phone', cityInfo.phone],
    ['Website', cityInfo.website],
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-transparent to-cyan-600/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">City Profile</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              City Details & Map
            </h1>
            <p className="text-slate-500 max-w-xl text-sm">
              Explore Vijayawada's key city facts and see the city on an interactive map before signing in.
            </p>
          </div>
          <GlowButton variant="primary" onClick={() => navigate('/login')}>
            Proceed to Login <ChevronRight className="w-4 h-4" />
          </GlowButton>
        </div>
      </div>

      {/* ── Content Grid ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left column */}
        <div className="space-y-6">
          {/* City info card */}
          <motion.div
            className="surface-card overflow-hidden"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            <div className="p-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-100">Vijayawada at a Glance</h2>
              </div>
            </div>
            <div className="p-6">
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {infoRows.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2 py-2 border-b border-white/[0.04] last:border-0">
                    <dt className="text-sm text-slate-500 shrink-0">{k}</dt>
                    <dd className="text-sm text-slate-300 text-right break-all">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 space-y-2">
                <p className="text-sm text-slate-500 leading-relaxed">
                  Vijayawada is a major urban center in Andhra Pradesh, known for smart infrastructure, transport connectivity, and citizen-first digital services.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Map card */}
          <motion.div
            className="surface-card overflow-hidden"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            <div className="p-5 border-b border-white/[0.06] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Globe2 className="w-4 h-4 text-cyan-400" />
              </div>
              <h2 className="text-lg font-semibold text-slate-100">City Map</h2>
            </div>
            <div className="h-80 relative">
              <iframe
                title="Vijayawada City Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=80.6315%2C16.4829%2C80.6800%2C16.5170&layer=mapnik&marker=16.4993%2C80.6480"
                className="w-full h-full border-0 opacity-90"
                loading="lazy"
              />
            </div>
            <div className="p-4 bg-white/[0.02]">
              <p className="text-xs text-slate-500">
                Explore central Vijayawada's transport corridors and civic landmarks.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <motion.div
            className="surface-card p-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Info className="w-4 h-4 text-orange-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-100">Quick Facts</h3>
            </div>
            <ul className="space-y-3">
              {[
                'City name, population, area, mayor, and contact details are available for all visitors.',
                'The interactive map highlights central Vijayawada and nearby public services.',
                'Residents can use this page as a quick city guide before logging in.',
              ].map((fact, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                  {fact}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="rounded-2xl bg-gradient-to-br from-indigo-600/30 to-violet-600/20 border border-indigo-500/20 p-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          >
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Ready to get started?</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Continue to login to access citizen services and the admin portal.
            </p>
            <GlowButton variant="primary" fullWidth onClick={() => navigate('/login')}>
              Continue to Login
            </GlowButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
