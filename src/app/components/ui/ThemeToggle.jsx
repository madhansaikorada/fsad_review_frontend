import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * ThemeToggle — animated Sun/Moon switch button.
 *
 * @param {string} className - extra classes for positioning
 */
export function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
      className={`
        relative w-14 h-7 rounded-full border transition-all duration-300 flex items-center
        ${isDark
          ? 'bg-indigo-500/20 border-indigo-500/30 justify-start'
          : 'bg-amber-400/20 border-amber-400/40 justify-end'
        }
        ${className}
      `}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 text-indigo-400 opacity-60 pointer-events-none">
        <Moon className="w-3 h-3" />
      </span>
      <span className="absolute right-1.5 text-amber-400 opacity-60 pointer-events-none">
        <Sun className="w-3 h-3" />
      </span>

      {/* Thumb */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className={`
          w-5 h-5 rounded-full flex items-center justify-center shadow-md z-10 mx-1
          ${isDark
            ? 'bg-indigo-500 shadow-indigo-500/40'
            : 'bg-amber-400 shadow-amber-400/50'
          }
        `}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-3 h-3 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}

/**
 * ThemeToggleCompact — icon-only round button for tight spaces (mobile header, etc.)
 */
export function ThemeToggleCompact({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
      className={`
        w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
        ${isDark
          ? 'bg-white/[0.07] border border-white/[0.12] text-slate-400 hover:bg-white/[0.12] hover:text-indigo-300'
          : 'bg-black/[0.06] border border-black/[0.12] text-slate-600 hover:bg-black/[0.1] hover:text-amber-500'
        }
        ${className}
      `}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
            <Moon className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
            <Sun className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
