import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, MapPin, Clock, Phone, Mail, Globe, Navigation, Star, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { GlowButton } from '../../components/ui/GlowButton';

const serviceData = {
  '1': {
    name: 'Government General Hospital', category: 'Health',
    location: 'Governorpet, Vijayawada, Andhra Pradesh',
    hours: '24/7', phone: '(0866) 257 4444',
    email: 'info@ggh-vijayawada.gov.in', website: 'www.ggh-vijayawada.gov.in',
    status: 'active', rating: 4.8, reviews: 1247,
    description: 'Full-service emergency medical care with state-of-the-art facilities and experienced medical staff available 24/7.',
    facilities: ['Emergency Room', 'Trauma Center', 'Ambulance Service', 'Intensive Care Unit'],
    gradient: 'from-rose-600/25 to-pink-600/10', accent: 'text-rose-400', iconBg: 'bg-rose-500/20',
  },
  '2': {
    name: 'Vijayawada Bus Station', category: 'Transport',
    location: 'Pandit Nehru Bus Station, Vijayawada',
    hours: '24/7', phone: '(0866) 247 7777',
    email: 'info@pnbus-vijayawada.gov.in', website: 'www.pnbus-vijayawada.gov.in',
    status: 'active', rating: 4.5, reviews: 892,
    description: 'Main bus terminal serving multiple routes across Andhra Pradesh with modern amenities and real-time tracking.',
    facilities: ['Multiple Bus Routes', 'Ticket Counter', 'Waiting Area', 'Information Desk', 'Restrooms'],
    gradient: 'from-blue-600/25 to-cyan-600/10', accent: 'text-blue-400', iconBg: 'bg-blue-500/20',
  },
};

export function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = serviceData[id || '1'] || serviceData['1'];

  const contactItems = [
    { icon: MapPin,  label: 'Address',          value: service.location },
    { icon: Clock,   label: 'Operating Hours',   value: service.hours },
    { icon: Phone,   label: 'Phone',             value: service.phone },
    { icon: Mail,    label: 'Email',             value: service.email },
    { icon: Globe,   label: 'Website',           value: service.website },
  ];

  const actionButtons = [
    { icon: Phone,     label: 'Call',     color: 'from-cyan-600 to-teal-600',   glow: 'rgba(34,211,238,0.3)' },
    { icon: Mail,      label: 'Email',    color: 'from-indigo-600 to-violet-600', glow: 'rgba(99,102,241,0.3)' },
    { icon: Navigation,label: 'Navigate', color: 'from-orange-600 to-rose-600', glow: 'rgba(249,115,22,0.3)' },
    { icon: Globe,     label: 'Website',  color: 'from-violet-600 to-purple-600', glow: 'rgba(139,92,246,0.3)' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      {/* Header */}
      <div className={`bg-[#0D1117] border-b border-white/[0.06] relative overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} pointer-events-none`} />
        <div className="relative max-w-4xl mx-auto px-4 md:px-6 py-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-5">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/[0.1] text-slate-300 border border-white/[0.1]">
                {service.category}
              </span>
              {service.status === 'active' ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-amber-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Maintenance
                </div>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {service.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.round(service.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-200">{service.rating}</span>
              <span className="text-xs text-slate-500">({service.reviews} reviews)</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-5">
        {/* Action buttons */}
        <div className="grid grid-cols-4 gap-3">
          {actionButtons.map(({ icon: Icon, label, color, glow }) => (
            <motion.button
              key={label}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center gap-2 py-4 rounded-xl bg-gradient-to-br ${color} text-white text-xs font-semibold shadow-lg transition-all duration-200`}
              style={{ boxShadow: `0 0 20px ${glow}` }}
            >
              <Icon className="w-5 h-5" />
              {label}
            </motion.button>
          ))}
        </div>

        {/* About */}
        <div className="surface-card p-6">
          <h2 className="text-base font-semibold text-slate-100 mb-3">About</h2>
          <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
        </div>

        {/* Contact */}
        <div className="surface-card p-6">
          <h2 className="text-base font-semibold text-slate-100 mb-4">Contact Information</h2>
          <div className="space-y-3">
            {contactItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 py-2 border-b border-white/[0.04] last:border-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">{label}</div>
                  <div className="text-sm text-slate-300">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities */}
        <div className="surface-card p-6">
          <h2 className="text-base font-semibold text-slate-100 mb-4">Facilities & Amenities</h2>
          <div className="grid md:grid-cols-2 gap-2">
            {service.facilities.map((facility, i) => (
              <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span className="text-sm text-slate-300">{facility}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map placeholder */}
        <div className="surface-card overflow-hidden">
          <div className="p-4 border-b border-white/[0.06]">
            <h2 className="text-base font-semibold text-slate-100">Location</h2>
          </div>
          <div className="h-48 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-slate-700 mx-auto mb-2" />
              <p className="text-xs text-slate-600">Interactive map</p>
            </div>
          </div>
        </div>

        <GlowButton variant="primary" size="lg" fullWidth onClick={() => navigate('/citizen/report')}>
          Report an Issue with this Service
        </GlowButton>
      </div>
    </div>
  );
}
