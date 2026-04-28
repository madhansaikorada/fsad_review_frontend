import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Upload, MapPin, CheckCircle, ArrowLeft, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';
import { GlowButton } from '../../components/ui/GlowButton';

const issueTypes = ['Road Maintenance', 'Street Light', 'Water Supply', 'Garbage Collection', 'Traffic Signal', 'Public Transport', 'Park Maintenance', 'Other'];

export function ReportIssuePage() {
  const navigate = useNavigate();
  const { addReport } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ issueType: '', description: '', location: '', image: null });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.issueType || !formData.description || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }
    addReport({ issueType: formData.issueType, description: formData.description, location: formData.location });
    setSubmitted(true);
    toast.success('Report submitted successfully!');
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center p-4">
        <Toaster />
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full surface-card p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-emerald-500/15 border border-emerald-500/25 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Report Submitted!</h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Thank you for reporting. We'll review your submission and take appropriate action within 3–7 business days.
          </p>
          <div className="space-y-3">
            <GlowButton variant="primary" fullWidth onClick={() => navigate('/citizen/my-reports')}>View My Reports</GlowButton>
            <GlowButton variant="secondary" fullWidth onClick={() => navigate('/citizen')}>Back to Home</GlowButton>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      <Toaster />

      {/* Header */}
      <div className="bg-[#0D1117] border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Report an Issue
          </h1>
          <p className="text-sm text-slate-500">Help us improve the city by reporting problems you've spotted.</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Issue Type */}
          <div className="surface-card p-5">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Issue Type <span className="text-red-400">*</span>
            </label>
            <Select value={formData.issueType} onValueChange={(v) => setFormData({ ...formData, issueType: v })}>
              <SelectTrigger className="h-11 bg-white/[0.05] border-white/[0.1] text-slate-300 focus:border-indigo-500 rounded-xl">
                <SelectValue placeholder="Select issue type..." />
              </SelectTrigger>
              <SelectContent className="bg-[#1C2333] border-white/[0.1]">
                {issueTypes.map((t) => (
                  <SelectItem key={t} value={t} className="text-slate-300 focus:bg-indigo-500/15 focus:text-slate-100">{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="surface-card p-5">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Location <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="e.g. Main Street, near Central Park"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full h-11 pl-10 pr-4 bg-white/[0.05] border border-white/[0.1] rounded-xl text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] transition-all"
              />
            </div>
            <button
              type="button"
              className="mt-2 flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" /> Use Current Location
            </button>
          </div>

          {/* Description */}
          <div className="surface-card p-5">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              placeholder="Describe the issue in detail — what you saw, when, and any other relevant info..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={5}
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl text-slate-100 text-sm placeholder:text-slate-500 p-3.5 resize-none focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] transition-all"
            />
            <p className="text-xs text-slate-600 mt-1.5">{formData.description.length}/500 characters</p>
          </div>

          {/* Photo Upload */}
          <div className="surface-card p-5">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Photo (Optional)</label>
            <label
              htmlFor="photo-upload"
              className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-white/[0.1] rounded-xl p-8 cursor-pointer
                hover:border-indigo-500/40 hover:bg-indigo-500/[0.03] transition-all duration-200 group"
            >
              <input id="photo-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                <Upload className="w-6 h-6 text-slate-500 group-hover:text-indigo-400 transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
                  {formData.image ? formData.image.name : 'Click to upload photo'}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">PNG, JPG up to 10 MB</p>
              </div>
            </label>
          </div>

          {/* Info box */}
          <div className="rounded-xl bg-indigo-500/[0.07] border border-indigo-500/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-300">What happens next?</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-400 pl-6">
              <li>Your report will be reviewed by our team</li>
              <li>You'll receive progress updates</li>
              <li>Expected resolution: 3–7 business days</li>
            </ul>
          </div>

          <GlowButton type="submit" variant="primary" size="lg" fullWidth>Submit Report</GlowButton>
        </form>
      </div>
    </div>
  );
}
