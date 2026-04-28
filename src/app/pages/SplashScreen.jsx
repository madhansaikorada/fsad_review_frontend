import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Building2, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/onboarding'), 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex flex-col items-center justify-center overflow-hidden relative">

      {/* ── Background Orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Logo & Text ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Icon */}
        <div className="relative mb-8">
          <motion.div
            className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-indigo-500 via-violet-600 to-indigo-700 flex items-center justify-center shadow-[0_0_60px_rgba(99,102,241,0.5)]"
            animate={{ boxShadow: ['0 0 40px rgba(99,102,241,0.4)', '0 0 80px rgba(99,102,241,0.7)', '0 0 40px rgba(99,102,241,0.4)'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Building2 className="w-12 h-12 text-white drop-shadow-lg" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            className="absolute -top-2 -right-2 w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/40"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
          >
            <Zap className="w-5 h-5 text-white fill-white" />
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-3"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            SmartCity
          </span>
        </motion.h1>

        <motion.p
          className="text-lg text-slate-400 font-medium tracking-wide"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Vijayawada · Your City, Simplified
        </motion.p>

        {/* City skyline bars */}
        <motion.div
          className="flex items-end gap-1.5 mt-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          {[32, 52, 40, 68, 48, 60, 44, 56, 36].map((height, index) => (
            <motion.div
              key={index}
              className="w-6 md:w-8 rounded-t-md bg-gradient-to-t from-indigo-600/30 to-indigo-400/60 border-t border-x border-indigo-400/20"
              style={{ height: `${height}px` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.9 + index * 0.07, duration: 0.4, ease: 'easeOut' }}
            >
              <div className="flex flex-col gap-1 p-1 mt-1">
                {Array.from({ length: Math.floor(height / 14) }).map((_, i) => (
                  <div key={i} className="w-full h-1 bg-indigo-300/25 rounded-sm" />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading dots */}
        <motion.div
          className="mt-10 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-indigo-500"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
