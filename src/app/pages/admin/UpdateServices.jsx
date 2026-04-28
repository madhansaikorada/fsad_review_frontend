import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Plus, Edit, Trash2, MapPin, Clock, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';
import { useApp } from '../../context/AppContext';
import { createService, updateService, deleteService } from '../../services/api';
import { GlowButton } from '../../components/ui/GlowButton';
import { PageHeader } from '../../components/ui/PageWrapper';

const categories = ['Health', 'Transport', 'Utilities', 'Parks', 'Emergency', 'Education'];
const catPills = {
  Health: 'bg-rose-500/15 text-rose-300 border-rose-500/20',
  Transport: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
  Utilities: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20',
  Parks: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
  Emergency: 'bg-orange-500/15 text-orange-300 border-orange-500/20',
  Education: 'bg-violet-500/15 text-violet-300 border-violet-500/20',
};

const emptyForm = { name: '', category: '', location: '', hours: '', phone: '', status: 'active', description: '' };

function DarkInput({ label, id, value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      <input id={id} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full h-10 px-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.1)] transition-all" />
    </div>
  );
}

export function UpdateServices() {
  const { services, updateServices } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const set = (key) => (e) => setFormData(f => ({ ...f, [key]: e.target.value }));

  const openDialog = (service = null) => {
    setEditingService(service);
    setFormData(service ? { name: service.name, category: service.category, location: service.location, hours: service.hours, phone: service.phone, status: service.status, description: service.description } : emptyForm);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.location) { toast.error('Fill in all required fields'); return; }
    try {
      if (editingService) {
        const saved = await updateService(editingService.id, formData);
        updateServices(services.map(s => String(s.id) === String(editingService.id) ? saved : s));
        toast.success('Service updated');
      } else {
        const saved = await createService(formData);
        updateServices([saved, ...services]);
        toast.success('Service added');
      }
      setIsDialogOpen(false);
    } catch {
      toast.error('Unable to save service. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      updateServices(services.filter(s => String(s.id) !== String(id)));
      toast.success('Service deleted');
    } catch {
      toast.error('Unable to delete service. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] p-4 md:p-6 lg:p-8">
      <Toaster />
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <PageHeader title="Manage Services" subtitle="Add, edit, or remove city services" />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <GlowButton variant="primary" onClick={() => openDialog()}>
                <Plus className="w-4 h-4" /> Add Service
              </GlowButton>
            </DialogTrigger>
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-[#12192B] border border-white/[0.1] text-slate-100 rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-slate-100" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <DarkInput label="Service Name *" id="name" value={formData.name} onChange={set('name')} placeholder="e.g., City Hospital" />
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Category *</label>
                    <Select value={formData.category} onValueChange={(v) => setFormData(f => ({ ...f, category: v }))}>
                      <SelectTrigger className="h-10 bg-white/[0.05] border-white/[0.1] text-slate-300 rounded-xl text-sm focus:border-indigo-500">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1C2333] border-white/[0.1]">
                        {categories.map(c => <SelectItem key={c} value={c} className="text-slate-300 focus:bg-indigo-500/15">{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DarkInput label="Location *" id="location" value={formData.location} onChange={set('location')} placeholder="e.g., Downtown District" />
                <div className="grid md:grid-cols-2 gap-4">
                  <DarkInput label="Operating Hours" id="hours" value={formData.hours} onChange={set('hours')} placeholder="e.g., 9AM–5PM" />
                  <DarkInput label="Phone" id="phone" value={formData.phone} onChange={set('phone')} placeholder="e.g., (0866) 123 4567" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Status</label>
                  <Select value={formData.status} onValueChange={(v) => setFormData(f => ({ ...f, status: v }))}>
                    <SelectTrigger className="h-10 bg-white/[0.05] border-white/[0.1] text-slate-300 rounded-xl text-sm focus:border-indigo-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1C2333] border-white/[0.1]">
                      <SelectItem value="active" className="text-slate-300 focus:bg-indigo-500/15">Active</SelectItem>
                      <SelectItem value="maintenance" className="text-slate-300 focus:bg-indigo-500/15">Under Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Description</label>
                  <textarea value={formData.description} onChange={set('description')} placeholder="Brief description..." rows={3}
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl text-sm text-slate-100 placeholder:text-slate-600 p-3 resize-none focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.1)] transition-all" />
                </div>
                <div className="flex gap-3 pt-2">
                  <GlowButton type="submit" variant="primary" fullWidth>{editingService ? 'Update Service' : 'Add Service'}</GlowButton>
                  <GlowButton type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</GlowButton>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Services', value: services.length, color: 'text-indigo-400' },
            { label: 'Active',         value: services.filter(s => s.status === 'active').length, color: 'text-emerald-400' },
            { label: 'Maintenance',    value: services.filter(s => s.status === 'maintenance').length, color: 'text-amber-400' },
            { label: 'Categories',     value: categories.length, color: 'text-violet-400' },
          ].map((s) => (
            <div key={s.label} className="surface-card p-4">
              <div className={`text-2xl font-bold ${s.color} mb-0.5`}>{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Service list */}
        <div className="space-y-3">
          <AnimatePresence>
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: i * 0.04 }}
                className="surface-card p-5 hover:border-white/[0.12] transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-sm font-semibold text-slate-100">{service.name}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${catPills[service.category] || 'bg-slate-500/15 text-slate-300 border-slate-500/20'}`}>
                        {service.category}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${service.status === 'active' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20' : 'bg-amber-500/15 text-amber-300 border-amber-500/20'}`}>
                        {service.status === 'active' ? 'Active' : 'Maintenance'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3 leading-relaxed">{service.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                      {[{ icon: MapPin, text: service.location }, { icon: Clock, text: service.hours }, { icon: Phone, text: service.phone }].map(({ icon: Icon, text }) => text && (
                        <span key={text} className="flex items-center gap-1"><Icon className="w-3 h-3 text-indigo-400" />{text}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-2 shrink-0">
                    <GlowButton variant="secondary" size="sm" onClick={() => openDialog(service)}>
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </GlowButton>
                    <GlowButton variant="danger" size="sm" onClick={() => handleDelete(service.id)}>
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </GlowButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
