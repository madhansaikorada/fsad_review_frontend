import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, MapPin, FileText, Bell, Check, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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

const slides = [
  {
    icon: MapPin,
    title: 'Explore City Services',
    description: 'Access all public services, utilities, and amenities in one place.',
    gradient: 'from-indigo-500 to-violet-600',
    glow: 'rgba(99,102,241,0.4)',
    accent: '#818CF8',
  },
  {
    icon: FileText,
    title: 'Report Issues Instantly',
    description: 'Spotted a problem? Report it with photos and location — track in real-time.',
    gradient: 'from-cyan-500 to-teal-600',
    glow: 'rgba(34,211,238,0.4)',
    accent: '#22D3EE',
  },
  {
    icon: Bell,
    title: 'Stay Updated',
    description: 'Real-time notifications about city news, service updates, and alerts.',
    gradient: 'from-orange-500 to-rose-600',
    glow: 'rgba(249,115,22,0.4)',
    accent: '#FB923C',
  },
  {
    icon: MapPin,
    title: 'Vijayawada at a Glance',
    description: 'Preview the city, its key services, and leadership before signing in.',
    gradient: 'from-violet-500 to-indigo-600',
    glow: 'rgba(139,92,246,0.4)',
    accent: '#A78BFA',
    type: 'overview',
  },
];

export function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
    else navigate('/city-details');
  };

  const handleSkip = () => navigate('/city-details');
  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex flex-col relative overflow-hidden">

      {/* Bg glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(ellipse at center, ${slide.glow} 0%, transparent 70%)` }}
      />

      {/* Skip */}
      <div className="absolute top-5 right-5 z-10">
        <GlowButton variant="ghost" size="sm" onClick={handleSkip}>Skip</GlowButton>
      </div>

      {/* Slide area */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl"
          >
            {slide.type === 'overview' ? (
              /* ── Overview slide ── */
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-100 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Vijayawada at a Glance
                  </h2>
                  <p className="text-slate-500">Everything you need to know before you start</p>
                </div>
                <div className="grid gap-4 lg:grid-cols-3">
                  {/* City Details */}
                  <div className="surface-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-indigo-400" />
                      </div>
                      <h3 className="font-semibold text-slate-200">City Details</h3>
                    </div>
                    <dl className="space-y-2 text-sm">
                      {[
                        ['Name', cityInfo.name],
                        ['Population', cityInfo.population],
                        ['Area', cityInfo.area],
                        ['Mayor', cityInfo.mayor],
                        ['Established', cityInfo.established],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-2">
                          <dt className="text-slate-500 shrink-0">{k}</dt>
                          <dd className="text-slate-300 text-right">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  {/* Services */}
                  <div className="surface-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-cyan-400" />
                      </div>
                      <h3 className="font-semibold text-slate-200">Services</h3>
                    </div>
                    <div className="space-y-4">
                      {serviceHighlights.map((s) => (
                        <div key={s.label}>
                          <div className="text-sm font-medium text-slate-300 mb-0.5">{s.label}</div>
                          <div className="text-xs text-slate-500 leading-relaxed">{s.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Leaders */}
                  <div className="surface-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-violet-400" />
                      </div>
                      <h3 className="font-semibold text-slate-200">Leadership</h3>
                    </div>
                    <div className="space-y-3">
                      {cityLeaders.map((l) => (
                        <div key={l.name} className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xs text-slate-300 font-semibold shrink-0">
                            {l.name[0]}
                          </div>
                          <div>
                            <div className="text-sm text-slate-300 font-medium">{l.name}</div>
                            <div className="text-xs text-slate-500">{l.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ── Regular slide ── */
              <div className="flex flex-col items-center text-center">
                <motion.div
                  className={`w-28 h-28 md:w-36 md:h-36 rounded-[32px] bg-gradient-to-br ${slide.gradient} flex items-center justify-center mb-10 shadow-2xl`}
                  style={{ boxShadow: `0 0 60px ${slide.glow}` }}
                  initial={{ scale: 0.7, rotate: -8 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <Icon className="w-14 h-14 md:w-18 md:h-18 text-white" strokeWidth={1.5} />
                </motion.div>

                {/* Slide illustration detail */}
                {currentSlide === 0 && (
                  <motion.div className="flex gap-2 items-end mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    {[40, 60, 48, 70, 52].map((h, i) => (
                      <div key={i} className="w-10 rounded-t-lg bg-gradient-to-t from-indigo-600/40 to-indigo-400/70" style={{ height: `${h}px` }} />
                    ))}
                  </motion.div>
                )}
                {currentSlide === 1 && (
                  <motion.div className="flex gap-3 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    {[true, false, false].map((done, i) => (
                      <div key={i} className={`w-14 h-14 rounded-xl flex items-center justify-center ${done ? 'bg-cyan-500/25 border border-cyan-400/40' : 'bg-white/[0.05] border border-white/[0.08]'}`}>
                        {done && <Check className="w-7 h-7 text-cyan-400" />}
                      </div>
                    ))}
                  </motion.div>
                )}
                {currentSlide === 2 && (
                  <motion.div className="relative mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <div className="w-16 h-16 bg-orange-500/20 border border-orange-400/30 rounded-2xl flex items-center justify-center">
                      <Bell className="w-8 h-8 text-orange-400" />
                    </div>
                    <motion.div
                      className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      3
                    </motion.div>
                  </motion.div>
                )}

                <motion.h2
                  className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: slide.accent }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  className="text-lg text-slate-400 max-w-md leading-relaxed"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  {slide.description}
                </motion.p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Footer Controls ── */}
      <div className="p-6 md:p-10 border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto">
          {/* Progress pills */}
          <div className="flex justify-center gap-1.5 mb-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>
          <GlowButton variant="primary" size="lg" fullWidth onClick={handleNext}>
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Continue'}
            <ChevronRight className="w-5 h-5" />
          </GlowButton>
        </div>
      </div>
    </div>
  );
}
