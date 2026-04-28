import { motion } from 'motion/react';

/**
 * PageWrapper — consistent dark page shell
 */
export function PageWrapper({ children, className = '' }) {
  return (
    <div className={`min-h-screen bg-[#0A0E1A] ${className}`}>
      {children}
    </div>
  );
}

/**
 * PageHeader — standardized dark page title + subtitle
 */
export function PageHeader({ title, subtitle, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={className}
    >
      <h1
        className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight"
        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
      >
        {title}
      </h1>
      {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
    </motion.div>
  );
}
