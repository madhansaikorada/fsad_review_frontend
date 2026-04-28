import { motion } from 'motion/react';

const variants = {
  primary: `
    bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold
    shadow-[0_0_0_1px_rgba(99,102,241,0.35),0_4px_14px_rgba(99,102,241,0.2)]
    hover:from-indigo-500 hover:to-violet-500
    hover:shadow-[0_0_0_1px_rgba(99,102,241,0.55),0_6px_22px_rgba(99,102,241,0.35)]
  `,
  secondary: `
    bg-white/[0.07] text-slate-200 font-medium border border-white/[0.12]
    hover:bg-white/[0.12] hover:text-slate-100 hover:border-white/[0.2]
  `,
  ghost: `
    bg-transparent text-slate-400 font-medium
    hover:bg-white/[0.06] hover:text-slate-200
  `,
  danger: `
    bg-red-500/15 text-red-300 font-medium border border-red-500/20
    hover:bg-red-500/25 hover:text-red-200
  `,
};

const sizes = {
  sm: 'h-8 px-3 text-xs rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-xl gap-2',
  lg: 'h-12 px-6 text-sm rounded-xl gap-2.5',
};

/**
 * GlowButton — premium button with Framer Motion hover/tap animations
 *
 * @param {string} variant - 'primary' | 'secondary' | 'ghost' | 'danger'
 * @param {string} size    - 'sm' | 'md' | 'lg'
 * @param {boolean} fullWidth
 * @param {string} type    - html button type
 */
export function GlowButton({
  children,
  variant = 'secondary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.01, transition: { duration: 0.15 } }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`
        inline-flex items-center justify-center
        transition-all duration-200 select-none
        disabled:opacity-40 disabled:pointer-events-none
        ${variants[variant] || variants.secondary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
