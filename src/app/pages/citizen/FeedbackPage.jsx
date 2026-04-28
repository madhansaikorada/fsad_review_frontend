import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Star, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';
import { useApp } from '../../context/AppContext';
import { GlowButton } from '../../components/ui/GlowButton';

const amenities = [
  'Government General Hospital', 'Vijayawada Bus Station', 'Vijayawada Water Supply',
  'Indira Gandhi Municipal Stadium', 'Vijayawada Fire Station', 'Sri Krishna Devaraya Library',
  'Vijayawada Waste Management', 'Swimming Pool Complex',
];

const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

export function FeedbackPage() {
  const navigate = useNavigate();
  const { addFeedback } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({ amenity: '', serviceStatus: '', comment: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amenity || !formData.serviceStatus || rating === 0) {
      toast.error('Please select a service, completion status, and provide a rating');
      return;
    }
    const feedbackData = {
      amenity: formData.amenity, serviceStatus: formData.serviceStatus,
      comment: formData.comment, rating,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    addFeedback(feedbackData);
    const existing = JSON.parse(sessionStorage.getItem('adminFeedback') || '[]');
    existing.push(feedbackData);
    sessionStorage.setItem('adminFeedback', JSON.stringify(existing));
    setSubmitted(true);
    toast.success('Thank you for your feedback!');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center p-4">
        <Toaster />
        <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full surface-card p-10 text-center">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-emerald-500/15 border border-emerald-500/25 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Feedback Submitted!</h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Thank you for helping us improve city services. Your feedback is valuable to us.
          </p>
          <div className="space-y-3">
            <GlowButton variant="secondary" fullWidth onClick={() => { setSubmitted(false); setRating(0); setFormData({ amenity: '', serviceStatus: '', comment: '' }); }}>
              Submit Another Feedback
            </GlowButton>
            <GlowButton variant="primary" fullWidth onClick={() => navigate('/citizen')}>Back to Home</GlowButton>
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
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-7">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Service Feedback</h1>
          <p className="text-sm text-slate-500">Help us improve by sharing your experience</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 space-y-5">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service */}
          <div className="surface-card p-5">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Select Service <span className="text-red-400">*</span>
            </label>
            <Select value={formData.amenity} onValueChange={(v) => setFormData({ ...formData, amenity: v })}>
              <SelectTrigger className="h-11 bg-white/[0.05] border-white/[0.1] text-slate-300 focus:border-indigo-500 rounded-xl">
                <SelectValue placeholder="Choose a service to rate..." />
              </SelectTrigger>
              <SelectContent className="bg-[#1C2333] border-white/[0.1]">
                {amenities.map((a) => <SelectItem key={a} value={a} className="text-slate-300 focus:bg-indigo-500/15 focus:text-slate-100">{a}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Service Status */}
          <div className="surface-card p-5">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Service Completion Status <span className="text-red-400">*</span>
            </label>
            <Select value={formData.serviceStatus} onValueChange={(v) => setFormData({ ...formData, serviceStatus: v })}>
              <SelectTrigger className="h-11 bg-white/[0.05] border-white/[0.1] text-slate-300 focus:border-indigo-500 rounded-xl">
                <SelectValue placeholder="Select completion status..." />
              </SelectTrigger>
              <SelectContent className="bg-[#1C2333] border-white/[0.1]">
                <SelectItem value="completed" className="text-slate-300 focus:bg-indigo-500/15 focus:text-slate-100">Completed — service availed</SelectItem>
                <SelectItem value="partially" className="text-slate-300 focus:bg-indigo-500/15 focus:text-slate-100">Partially completed</SelectItem>
                <SelectItem value="not-completed" className="text-slate-300 focus:bg-indigo-500/15 focus:text-slate-100">Not completed</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-600 mt-2">Choose after the admin marks your request completed and the service has been availed.</p>
          </div>

          {/* Star Rating */}
          <div className="surface-card p-5">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Your Rating <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none active:scale-95"
                >
                  <Star
                    className={`w-10 h-10 transition-colors duration-100 ${
                      star <= (hoverRating || rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-700 hover:text-amber-400/60'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-medium text-amber-400">
                {ratingLabels[rating]}
              </motion.p>
            )}
          </div>

          {/* Comment */}
          <div className="surface-card p-5">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Your Comments (Optional)
            </label>
            <textarea
              placeholder="Tell us about your experience — what went well, what could be improved..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={5}
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl text-slate-100 text-sm placeholder:text-slate-500 p-3.5 resize-none focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] transition-all"
            />
          </div>

          {/* Why it matters */}
          <div className="rounded-xl bg-cyan-500/[0.06] border border-cyan-500/20 p-4">
            <h3 className="text-sm font-semibold text-cyan-300 mb-2">Why your feedback matters</h3>
            <ul className="space-y-1 text-xs text-slate-400 pl-2">
              {['Helps identify areas for improvement', 'Influences future city planning', 'Ensures better services for all citizens'].map((item) => (
                <li key={item} className="flex gap-2"><div className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 shrink-0" />{item}</li>
              ))}
            </ul>
          </div>

          <GlowButton type="submit" variant="primary" size="lg" fullWidth>Submit Feedback</GlowButton>
        </form>

        {/* Community stats */}
        <div className="surface-card p-6">
          <h3 className="text-base font-semibold text-slate-100 mb-4">Community Feedback Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '4.6', label: 'Average Rating',   color: 'text-amber-400',   bg: 'bg-amber-500/10' },
              { value: '1,247', label: 'Total Reviews',  color: 'text-indigo-400',  bg: 'bg-indigo-500/10' },
              { value: '89%',  label: 'Satisfaction',   color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            ].map((s) => (
              <div key={s.label} className={`text-center p-4 rounded-xl ${s.bg}`}>
                <div className={`text-2xl font-bold ${s.color} mb-0.5`}>{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
