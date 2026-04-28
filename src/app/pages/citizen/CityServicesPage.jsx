import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Clock, Phone, CheckCircle, AlertTriangle, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { PageWrapper, PageHeader } from '../../components/ui/PageWrapper';
import { GlowButton } from '../../components/ui/GlowButton';

const defaultServices = [
  { id: '1', name: 'Government General Hospital',  category: 'Health',     location: 'Governorpet, Vijayawada',     hours: '24/7',               phone: '(0866) 257 4444', status: 'active',      description: 'Emergency medical services and urgent care' },
  { id: '2', name: 'Vijayawada Bus Station',        category: 'Transport',  location: 'Pandit Nehru Bus Station',    hours: '24/7',               phone: '(0866) 247 7777', status: 'active',      description: 'Main bus terminal with multiple routes' },
  { id: '3', name: 'Vijayawada Water Supply',       category: 'Utilities',  location: 'Water Works, Vijayawada',     hours: '24/7 Operations',    phone: '(0866) 244 4444', status: 'maintenance', description: 'Municipal water supply and treatment' },
  { id: '4', name: 'Indira Gandhi Municipal Stadium',category: 'Parks',     location: 'Governorpet, Vijayawada',     hours: '6:00 AM – 9:00 PM', phone: '(0866) 257 7777', status: 'active',      description: 'Sports complex and recreational facilities' },
  { id: '5', name: 'Vijayawada Fire Station',       category: 'Emergency',  location: 'MG Road, Vijayawada',         hours: '24/7',               phone: '101',             status: 'active',      description: 'Emergency fire and rescue services' },
  { id: '6', name: 'Sri Krishna Devaraya Library',  category: 'Education',  location: 'Governorpet, Vijayawada',     hours: '9:00 AM – 8:00 PM', phone: '(0866) 257 8888', status: 'active',      description: 'Public library and learning resources' },
  { id: '7', name: 'Vijayawada Waste Management',   category: 'Utilities',  location: 'Industrial Area, Vijayawada', hours: '7:00 AM – 6:00 PM', phone: '(0866) 244 5555', status: 'active',      description: 'Recycling and waste disposal services' },
  { id: '8', name: 'Swimming Pool Complex',         category: 'Parks',      location: 'Sports Authority, Vijayawada', hours: '6:00 AM – 8:00 PM', phone: '(0866) 257 9999', status: 'maintenance', description: 'Public swimming facility (under renovation)' },
];

const catColors = {
  Health:    { pill: 'bg-rose-500/15 text-rose-300 border-rose-500/20',    dot: 'bg-rose-400' },
  Transport: { pill: 'bg-blue-500/15 text-blue-300 border-blue-500/20',    dot: 'bg-blue-400' },
  Utilities: { pill: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20',    dot: 'bg-cyan-400' },
  Parks:     { pill: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20', dot: 'bg-emerald-400' },
  Emergency: { pill: 'bg-orange-500/15 text-orange-300 border-orange-500/20', dot: 'bg-orange-400' },
  Education: { pill: 'bg-violet-500/15 text-violet-300 border-violet-500/20', dot: 'bg-violet-400' },
};

const FILTERS = ['All', 'active', 'maintenance'];

export function CityServicesPage() {
  const { services } = useApp();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const currentServices = services.length > 0 ? services : defaultServices;
  const filtered = currentServices.filter((s) => {
    const matchFilter = filter === 'All' || s.status === filter;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      {/* Header */}
      <div className="sticky top-0 md:top-0 z-10 bg-[#0A0E1A]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5">
          <h1 className="text-2xl font-bold text-slate-100 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>City Services</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 bg-white/[0.05] border border-white/[0.1] rounded-lg text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-white/[0.04] rounded-lg border border-white/[0.06]">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all duration-200 ${
                    filter === f ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {f === 'All' ? 'All' : f === 'active' ? 'Active' : 'Maintenance'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <p className="text-xs text-slate-600 mb-4">{filtered.length} service{filtered.length !== 1 ? 's' : ''} found</p>
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-slate-300 font-semibold mb-1">No Services Found</h3>
            <p className="text-sm text-slate-600">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((service, i) => {
              const cat = catColors[service.category] || { pill: 'bg-slate-500/15 text-slate-300 border-slate-500/20', dot: 'bg-slate-400' };
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  onClick={() => navigate(`/citizen/services/${service.id}`)}
                  className="surface-card p-5 cursor-pointer hover:border-white/[0.14] transition-all duration-200 flex flex-col gap-3"
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cat.pill}`}>
                      {service.category}
                    </span>
                    {service.status === 'active' ? (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-amber-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Maintenance
                      </div>
                    )}
                  </div>

                  {/* Name + desc */}
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-1 line-clamp-1">{service.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{service.description}</p>
                  </div>

                  {/* Meta */}
                  <div className="space-y-1.5 pt-2 border-t border-white/[0.05]">
                    {[
                      { icon: MapPin, text: service.location },
                      { icon: Clock,  text: service.hours },
                      { icon: Phone,  text: service.phone },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2 text-xs text-slate-500">
                        <Icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span className="line-clamp-1">{text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
