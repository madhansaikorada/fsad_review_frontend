import { useState } from 'react';
import { Building2, MapPin, Globe, Phone, Mail, Users, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';
import { GlowButton } from '../../components/ui/GlowButton';
import { PageHeader } from '../../components/ui/PageWrapper';
import { SectionHeader } from '../../components/ui/SectionHeader';

const cityLeaders = [
  { name: 'Sri Rajamohan Reddy', title: 'Mayor',                  period: '2023–Present' },
  { name: 'Dr. K. Sudhakar',     title: 'Commissioner',           period: '2022–Present' },
  { name: 'Smt. Priya Reddy',    title: 'Deputy Commissioner',    period: '2021–Present' },
  { name: 'Mr. Anil Kumar',      title: 'Public Safety Director', period: '2020–Present' },
  { name: 'Ms. Swathi Rao',      title: 'City Planning Chief',    period: '2019–Present' },
];

const contactFields = [
  { label: 'Email',   key: 'email',   icon: Mail,     placeholder: 'info@vijayawada.gov.in' },
  { label: 'Phone',   key: 'phone',   icon: Phone,    placeholder: '(0866) 123 4567' },
  { label: 'Website', key: 'website', icon: Globe,    placeholder: 'www.vijayawada.gov.in' },
  { label: 'Area',    key: 'area',    icon: MapPin,   placeholder: 'e.g., 61.88 km²' },
];

export function ManageCityInfo() {
  const { cityInfo: contextCityInfo, updateCityInfo } = useApp();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(contextCityInfo || {});

  const handleSave = () => {
    updateCityInfo(formData);
    setEditMode(false);
    toast.success('City information updated!');
  };

  const handleCancel = () => {
    setFormData(contextCityInfo || {});
    setEditMode(false);
  };

  const set = (key) => (e) => setFormData(f => ({ ...f, [key]: e.target.value }));

  const displayData = editMode ? formData : (contextCityInfo || formData);

  const inputCls = `w-full h-10 px-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-sm text-slate-100 placeholder:text-slate-600
    focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.1)] transition-all`;

  return (
    <div className="min-h-screen bg-[#0A0E1A] p-4 md:p-6 lg:p-8">
      <Toaster />
      <div className="max-w-6xl mx-auto space-y-7">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <PageHeader title="Manage City Info" subtitle="Update Vijayawada's public city information" />
          <div className="flex gap-2">
            {editMode ? (
              <>
                <GlowButton variant="secondary" onClick={handleCancel}>Cancel</GlowButton>
                <GlowButton variant="primary" onClick={handleSave}>Save Changes</GlowButton>
              </>
            ) : (
              <GlowButton variant="primary" onClick={() => setEditMode(true)}>Edit Information</GlowButton>
            )}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Basic info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="surface-card p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-indigo-400" />
              </div>
              <h2 className="text-base font-semibold text-slate-100">Basic Information</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: 'City Name', key: 'name', placeholder: 'Vijayawada' },
                { label: 'Population', key: 'population', placeholder: 'e.g., 1.1 million' },
                { label: 'Mayor', key: 'mayor', placeholder: "Mayor's full name" },
                { label: 'Established', key: 'established', placeholder: 'e.g., 1981' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
                  {editMode ? (
                    <input value={formData[key] || ''} onChange={set(key)} placeholder={placeholder} className={inputCls} />
                  ) : (
                    <div className="text-sm text-slate-200 font-medium py-2.5 border-b border-white/[0.05]">{displayData[key] || '—'}</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact & details */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="surface-card p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Globe className="w-4 h-4 text-cyan-400" />
              </div>
              <h2 className="text-base font-semibold text-slate-100">Contact & Location</h2>
            </div>
            <div className="space-y-4">
              {contactFields.map(({ label, key, icon: Icon, placeholder }) => (
                <div key={key}>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Icon className="w-3.5 h-3.5 text-indigo-400" /> {label}
                  </label>
                  {editMode ? (
                    <input value={formData[key] || ''} onChange={set(key)} placeholder={placeholder} className={inputCls} />
                  ) : (
                    <div className="text-sm text-slate-200 font-medium py-2.5 border-b border-white/[0.05]">{displayData[key] || '—'}</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="surface-card p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-violet-400" />
              </div>
              <h2 className="text-base font-semibold text-slate-100">About the City</h2>
            </div>
            {editMode ? (
              <textarea
                value={formData.description || ''}
                onChange={set('description')}
                rows={6}
                placeholder="Brief description of the city..."
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl text-sm text-slate-100 placeholder:text-slate-600 p-3 resize-none focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.1)] transition-all"
              />
            ) : (
              <p className="text-sm text-slate-400 leading-relaxed">{displayData.description || 'No description available.'}</p>
            )}
          </motion.div>

          {/* Leadership */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="surface-card p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-orange-400" />
              </div>
              <h2 className="text-base font-semibold text-slate-100">Leadership</h2>
            </div>
            <div className="space-y-3">
              {cityLeaders.map((l) => (
                <div key={l.name} className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xs font-bold text-slate-200 shrink-0">
                    {l.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-200 truncate">{l.name}</div>
                    <div className="text-xs text-slate-500">{l.title}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-600 shrink-0">
                    <Calendar className="w-3 h-3" />{l.period}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
