import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Building2, Mail, Lock, Chrome, RefreshCw, MapPin, Eye, EyeOff, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';
import { registerUser, requestOtp, verifyOtp } from '../services/api';
import { ThemeToggleCompact } from '../components/ui/ThemeToggle';

/* ── Floating label input ── */
function FloatingInput({ id, type = 'text', label, value, onChange, icon: Icon, rightIcon, className = '' }) {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10">
            <Icon className={`w-4 h-4 transition-colors duration-200 ${focused ? 'text-indigo-400' : 'text-slate-500'}`} />
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          className={`
            peer w-full h-14 rounded-xl
            bg-white/[0.05] border transition-all duration-200
            text-slate-100 text-sm font-medium
            pt-5 pb-2
            ${Icon ? 'pl-10 pr-12' : 'pl-4 pr-12'}
            ${focused
              ? 'border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.15)]'
              : 'border-white/[0.1] hover:border-white/[0.18]'
            }
            focus:outline-none
          `}
        />
        <label
          htmlFor={id}
          className={`
            absolute left-${Icon ? '10' : '4'} transition-all duration-200 pointer-events-none font-medium
            ${(focused || hasValue)
              ? 'top-2 text-[10px] text-indigo-400'
              : 'top-1/2 -translate-y-1/2 text-sm text-slate-500'
            }
          `}
          style={{ left: Icon ? '2.5rem' : '1rem' }}
        >
          {label}
        </label>
        {rightIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Role Card ── */
function RoleCard({ role, selected, onClick, title, subtitle, color }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left relative overflow-hidden ${
        selected
          ? `border-${color}-500/60 bg-${color}-500/10 shadow-[0_0_0_1px_rgba(var(--tw-shadow-color),0.3)]`
          : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.05]'
      }`}
      style={selected ? { '--tw-shadow-color': color === 'indigo' ? '99,102,241' : '249,115,22' } : {}}
    >
      {selected && (
        <motion.div
          layoutId="role-indicator"
          className={`absolute inset-0 bg-gradient-to-br ${color === 'indigo' ? 'from-indigo-600/10 to-violet-600/5' : 'from-orange-600/10 to-red-600/5'}`}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <div className="relative z-10">
        <div className={`text-sm font-semibold mb-0.5 ${selected ? (color === 'indigo' ? 'text-indigo-300' : 'text-orange-300') : 'text-slate-300'}`}>
          {title}
        </div>
        <div className="text-xs text-slate-500">{subtitle}</div>
      </div>
    </button>
  );
}

export function LoginScreen() {
  const [username, setUsername]     = useState('');
  const [password, setPassword]     = useState('');
  const [role, setRole]             = useState('citizen');
  const [isSignUp, setIsSignUp]     = useState(false);
  const [otpSent, setOtpSent]       = useState(false);
  const [otp, setOtp]               = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUserRole, setCurrentUser } = useApp();

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    setCaptchaText(result);
  };

  useEffect(() => { generateCaptcha(); }, []);

  const isValidEmail  = (email) => /^\S+@\S+\.\S+$/.test(email);
  const isNumeric     = (val)   => /^\d+$/.test(val);
  const validatePassword = (pwd) => {
    if (pwd.length > 10) return false;
    if (!/[A-Z]/.test(pwd))          return false;
    if (!/[a-z]/.test(pwd))          return false;
    if (!/\d/.test(pwd))             return false;
    if (!/[!@#$%^&*]/.test(pwd))     return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) { toast.error('Please fill in all fields'); return; }
    if (!isValidEmail(username)) { toast.error('Enter a valid email address'); return; }
    if (isSignUp && username.length < 5) { toast.error('Username must be at least 5 characters'); return; }
    if (!validatePassword(password)) {
      toast.error('Password must be up to 10 chars with uppercase, lowercase, digit & special char (!@#$%^&*)');
      return;
    }
    if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {
      toast.error('Incorrect CAPTCHA. Please try again.');
      setCaptchaInput('');
      generateCaptcha();
      return;
    }
    try {
      if (isSignUp) {
        await registerUser({ username, password, role });
        toast.success('Account created successfully!');
        setIsSignUp(false);
        setCaptchaInput('');
        generateCaptcha();
      } else if (!otpSent) {
        await requestOtp({ username, password });
        toast.success('OTP sent to your email');
        setOtpSent(true);
      } else {
        if (!otp || !isNumeric(otp) || otp.length !== 6) { toast.error('Enter a valid 6-digit OTP'); return; }
        const user = await verifyOtp({ username, otp });
        if (user.role !== role) { toast.error('Wrong role selected'); return; }
        toast.success('Login successful!');
        setUserRole(role);
        if (role === 'admin') navigate('/admin');
        else navigate('/citizen');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Server error');
    }
  };

  const formTitle = isSignUp ? 'Create Account' : otpSent ? 'Verify Email OTP' : 'Welcome back';
  const formSubtitle = isSignUp
    ? 'Sign up to access SmartCity services'
    : otpSent
    ? 'Enter the 6-digit code sent to your email'
    : 'Sign in to continue to SmartCity';

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex relative">
      <Toaster />
      {/* Theme toggle — always visible top-right */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggleCompact />
      </div>

      {/* ── Left Panel ── */}
      <motion.div
        className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-12"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Bg gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-[#0A0E1A] to-[#0A0E1A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,102,241,0.25)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Building2 className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-base font-bold text-slate-100" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>SmartCity</div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Vijayawada
            </div>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-100 mb-3 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Your City,
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Simplified.
              </span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-xs">
              A unified platform for citizens and administrators to access services, report issues, and manage city operations.
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-3">
            {[
              { icon: Zap,       label: 'Instant service access & reports' },
              { icon: MapPin,    label: 'City-wide infrastructure monitoring' },
              { icon: Building2, label: 'Secure citizen & admin portals' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span className="text-sm text-slate-400">{label}</span>
              </div>
            ))}
          </div>

          {/* Skyline illustration */}
          <div className="flex items-end gap-1.5 mt-2 opacity-40">
            {[28, 44, 36, 56, 40, 52, 32, 48, 36].map((h, i) => (
              <motion.div
                key={i}
                className="rounded-t-md bg-gradient-to-t from-indigo-600/60 to-indigo-400/80"
                style={{ width: '18px', height: `${h}px` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.8 + i * 0.06, duration: 0.35, ease: 'easeOut' }}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-xs text-slate-600">Vijayawada Municipal Corporation</p>
        </div>
      </motion.div>

      {/* ── Right Panel — Form ── */}
      <motion.div
        className="flex-1 flex items-center justify-center p-6 md:p-12"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Building2 className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <span className="text-base font-bold text-slate-100" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>SmartCity</span>
          </div>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={formTitle}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <h1 className="text-2xl font-bold text-slate-100 mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {formTitle}
              </h1>
              <p className="text-sm text-slate-500 mb-7">{formSubtitle}</p>
            </motion.div>
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <FloatingInput
              id="username"
              type="email"
              label="Email address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={Mail}
            />

            {/* Password */}
            <FloatingInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              rightIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-500 hover:text-slate-300 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            {/* OTP Field */}
            {otpSent && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.25 }}>
                <FloatingInput
                  id="otp"
                  type="text"
                  label="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <p className="text-xs text-slate-600 mt-1.5 ml-1">Enter the code sent to your email</p>
              </motion.div>
            )}

            {/* Role selector */}
            <div>
              <p className="text-xs text-slate-500 font-medium mb-2">I am a</p>
              <div className="grid grid-cols-2 gap-3">
                <RoleCard
                  role="citizen" selected={role === 'citizen'}
                  onClick={() => setRole('citizen')}
                  title="Citizen" subtitle="Access city services"
                  color="indigo"
                />
                <RoleCard
                  role="admin" selected={role === 'admin'}
                  onClick={() => setRole('admin')}
                  title="Admin" subtitle="Manage city operations"
                  color="orange"
                />
              </div>
            </div>

            {/* CAPTCHA */}
            <div>
              <p className="text-xs text-slate-500 font-medium mb-2">Type the letters below</p>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="flex-1 px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-xl font-mono text-lg font-bold text-slate-200 tracking-[0.3em] select-none"
                  style={{ textShadow: '0 0 8px rgba(99,102,241,0.4)', letterSpacing: '0.3em' }}
                >
                  {captchaText}
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-400 hover:text-slate-200 hover:bg-white/[0.1] transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <FloatingInput
                id="captcha"
                type="text"
                label="Enter the letters"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="w-full h-12 rounded-xl font-semibold text-white text-sm
                bg-gradient-to-r from-indigo-600 to-indigo-500
                shadow-[0_0_0_1px_rgba(99,102,241,0.4),0_4px_16px_rgba(99,102,241,0.25)]
                hover:from-indigo-500 hover:to-violet-500
                hover:shadow-[0_0_0_1px_rgba(99,102,241,0.6),0_8px_28px_rgba(99,102,241,0.4)]
                transition-all duration-200 mt-1"
            >
              {isSignUp ? 'Create Account' : otpSent ? 'Verify OTP & Login' : 'Continue'}
            </motion.button>

            {/* Divider */}
            <div className="relative my-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.07]" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-[#0A0E1A] text-xs text-slate-600">Or continue with</span>
              </div>
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full h-11 rounded-xl border border-white/[0.1] bg-white/[0.04] text-sm font-medium text-slate-300
                hover:bg-white/[0.08] hover:border-white/[0.18] hover:text-slate-100
                transition-all duration-200 flex items-center justify-center gap-2.5"
            >
              <Chrome className="w-4.5 h-4.5" /> Continue with Google
            </button>

            {/* Toggle sign up / sign in */}
            <p className="text-center text-sm text-slate-600 pt-1">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
