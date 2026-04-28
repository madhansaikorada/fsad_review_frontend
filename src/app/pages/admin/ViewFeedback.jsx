import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { MessageSquare, Star, Search, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageWrapper';

export function ViewFeedback() {
  const { feedback } = useApp();
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [filterAmenity, setFilterAmenity] = useState('all');

  const [sessionFeedback] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('adminFeedback') || '[]'); } catch { return []; }
  });

  const allFeedback = [...feedback, ...sessionFeedback].filter(
    (item, index, self) => index === self.findIndex(f => f.id === item.id)
  );

  useEffect(() => {
    let filtered = allFeedback;
    if (searchTerm) filtered = filtered.filter(i => i.comment?.toLowerCase().includes(searchTerm.toLowerCase()) || i.amenity?.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filterRating !== 'all') filtered = filtered.filter(i => i.rating === parseInt(filterRating));
    if (filterAmenity !== 'all') filtered = filtered.filter(i => i.amenity === filterAmenity);
    setFilteredFeedback(filtered);
  }, [allFeedback, searchTerm, filterRating, filterAmenity]);

  const amenities = [...new Set(allFeedback.map(i => i.amenity))];

  const getRatingPill = (rating) => {
    if (rating >= 4) return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20';
    if (rating >= 3) return 'bg-amber-500/15 text-amber-300 border-amber-500/20';
    return 'bg-red-500/15 text-red-300 border-red-500/20';
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader title="Citizen Feedback" subtitle="View and manage feedback from citizens" />

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Feedback',           value: allFeedback.length,                       color: 'text-indigo-400' },
            { label: 'Positive (4–5 ★)',          value: allFeedback.filter(f => f.rating >= 4).length, color: 'text-emerald-400' },
            { label: 'Neutral (3 ★)',             value: allFeedback.filter(f => f.rating === 3).length, color: 'text-amber-400' },
            { label: 'Needs Improvement (1–2 ★)', value: allFeedback.filter(f => f.rating <= 2).length, color: 'text-red-400' },
          ].map((s) => (
            <div key={s.label} className="surface-card p-4">
              <div className={`text-2xl font-bold ${s.color} mb-0.5`}>{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="h-10 bg-white/[0.05] border-white/[0.1] text-slate-300 rounded-xl text-sm focus:border-indigo-500">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent className="bg-[#1C2333] border-white/[0.1]">
              {['all', '5', '4', '3', '2', '1'].map(r => (
                <SelectItem key={r} value={r} className="text-slate-300 focus:bg-indigo-500/15">
                  {r === 'all' ? 'All Ratings' : `${r} Star${r === '1' ? '' : 's'}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterAmenity} onValueChange={setFilterAmenity}>
            <SelectTrigger className="h-10 bg-white/[0.05] border-white/[0.1] text-slate-300 rounded-xl text-sm focus:border-indigo-500">
              <SelectValue placeholder="Filter by amenity" />
            </SelectTrigger>
            <SelectContent className="bg-[#1C2333] border-white/[0.1]">
              <SelectItem value="all" className="text-slate-300 focus:bg-indigo-500/15">All Amenities</SelectItem>
              {amenities.map(a => <SelectItem key={a} value={a} className="text-slate-300 focus:bg-indigo-500/15">{a}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Feedback list */}
        <div className="space-y-4">
          {filteredFeedback.length === 0 ? (
            <div className="surface-card p-16 text-center">
              <MessageSquare className="w-8 h-8 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-400 font-semibold">No feedback found</p>
              <p className="text-sm text-slate-600 mt-1">Try adjusting your search or filter criteria</p>
            </div>
          ) : filteredFeedback.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="surface-card p-5 hover:border-white/[0.12] transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100 mb-1">{item.amenity}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {item.serviceStatus && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400 border border-white/[0.08]">
                        {item.serviceStatus.replace(/-/g, ' ')}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-slate-600">
                      <Calendar className="w-3 h-3" />
                      {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : item.date}
                    </span>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${getRatingPill(item.rating)}`}>
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {item.rating}/5
                </div>
              </div>

              {item.comment && (
                <p className="text-sm text-slate-400 leading-relaxed mb-2">{item.comment}</p>
              )}

              <p className="text-[10px] text-slate-700">ID: {item.id}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}