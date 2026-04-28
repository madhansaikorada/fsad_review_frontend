import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { AlertCircle, CheckCircle, Clock, MapPin, Calendar, User, MessageSquare, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';
import { GlowButton } from '../../components/ui/GlowButton';
import { PageHeader } from '../../components/ui/PageWrapper';

const STATUS_PILLS = {
  'pending':     'bg-amber-500/15 text-amber-300 border-amber-500/20',
  'in-progress': 'bg-blue-500/15 text-blue-300 border-blue-500/20',
  'resolved':    'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
};

export function ViewReports() {
  const { reports, updateReportStatus, addAdminResponse } = useApp();
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedReport, setExpandedReport] = useState(null);
  const [responseText, setResponseText] = useState({});

  const filteredReports = filterStatus === 'all' ? reports : reports.filter(r => r.status === filterStatus);

  const handleStatusUpdate = (reportId, newStatus) => {
    updateReportStatus(reportId, newStatus);
    toast.success('Report status updated');
  };

  const handleSubmitResponse = (reportId) => {
    if (!responseText[reportId]?.trim()) { toast.error('Please enter a response'); return; }
    addAdminResponse(reportId, responseText[reportId]);
    setResponseText({ ...responseText, [reportId]: '' });
    setExpandedReport(null);
    toast.success('Response sent to citizen');
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] p-4 md:p-6 lg:p-8">
      <Toaster />
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <PageHeader title="Citizen Reports" subtitle="Manage and update report statuses" />
          <div className="md:w-56 shrink-0">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="h-10 bg-white/[0.05] border-white/[0.1] text-slate-300 rounded-xl focus:border-indigo-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1C2333] border-white/[0.1]">
                <SelectItem value="all" className="text-slate-300 focus:bg-indigo-500/15">All Reports ({reports.length})</SelectItem>
                <SelectItem value="pending" className="text-slate-300 focus:bg-indigo-500/15">Pending ({reports.filter(r => r.status === 'pending').length})</SelectItem>
                <SelectItem value="in-progress" className="text-slate-300 focus:bg-indigo-500/15">In Progress ({reports.filter(r => r.status === 'in-progress').length})</SelectItem>
                <SelectItem value="resolved" className="text-slate-300 focus:bg-indigo-500/15">Resolved ({reports.filter(r => r.status === 'resolved').length})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: AlertCircle, label: 'Pending',     count: reports.filter(r => r.status === 'pending').length,     color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/20' },
            { icon: Clock,       label: 'In Progress', count: reports.filter(r => r.status === 'in-progress').length, color: 'text-blue-400',    bg: 'bg-blue-500/10 border-blue-500/20' },
            { icon: CheckCircle, label: 'Resolved',    count: reports.filter(r => r.status === 'resolved').length,    color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={`surface-card border p-4 ${s.bg}`}>
              <s.icon className={`w-6 h-6 ${s.color} mb-2`} />
              <div className={`text-2xl font-bold ${s.color} mb-0.5`}>{s.count}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Reports list */}
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <div className="surface-card p-16 text-center">
              <AlertCircle className="w-8 h-8 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-400 font-semibold">No Reports Found</p>
              <p className="text-sm text-slate-600 mt-1">No reports match the selected filter</p>
            </div>
          ) : filteredReports.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="surface-card p-5 hover:border-white/[0.12] transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row gap-5">
                {/* Left */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      report.status === 'pending' ? 'bg-amber-500/15' : report.status === 'in-progress' ? 'bg-blue-500/15' : 'bg-emerald-500/15'
                    }`}>
                      {report.status === 'pending' ? <AlertCircle className="w-5 h-5 text-amber-400" /> :
                       report.status === 'in-progress' ? <Clock className="w-5 h-5 text-blue-400" /> :
                       <CheckCircle className="w-5 h-5 text-emerald-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-slate-100">{report.issueType}</h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_PILLS[report.status] || STATUS_PILLS['pending']}`}>
                          {report.status?.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed mb-2">{report.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><User className="w-3 h-3 text-indigo-400" />{report.citizenName}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-indigo-400" />{report.location}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-indigo-400" />{new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Admin response display */}
                  {report.adminResponse && (
                    <div className="bg-indigo-500/[0.07] border border-indigo-500/20 rounded-xl p-3 mt-3">
                      <p className="text-xs font-semibold text-indigo-300 mb-1">Admin Response</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{report.adminResponse}</p>
                    </div>
                  )}
                </div>

                {/* Right actions */}
                <div className="lg:w-52 space-y-3 shrink-0">
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">Update Status</label>
                    <Select value={report.status} onValueChange={(v) => handleStatusUpdate(report.id, v)}>
                      <SelectTrigger className="h-9 bg-white/[0.05] border-white/[0.1] text-slate-300 rounded-lg text-xs focus:border-indigo-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1C2333] border-white/[0.1]">
                        <SelectItem value="pending" className="text-slate-300 focus:bg-indigo-500/15 text-xs">Pending Review</SelectItem>
                        <SelectItem value="in-progress" className="text-slate-300 focus:bg-indigo-500/15 text-xs">In Progress</SelectItem>
                        <SelectItem value="resolved" className="text-slate-300 focus:bg-indigo-500/15 text-xs">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {!report.adminResponse && (
                    <GlowButton
                      variant="secondary"
                      size="sm"
                      fullWidth
                      onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      {expandedReport === report.id ? 'Close' : 'Send Response'}
                    </GlowButton>
                  )}

                  {/* Response textarea */}
                  <AnimatePresence>
                    {expandedReport === report.id && !report.adminResponse && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 overflow-hidden"
                      >
                        <textarea
                          placeholder="Enter your response to the citizen..."
                          value={responseText[report.id] || ''}
                          onChange={(e) => setResponseText({ ...responseText, [report.id]: e.target.value })}
                          rows={4}
                          className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl text-slate-100 text-xs placeholder:text-slate-500 p-2.5 resize-none focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.1)] transition-all"
                        />
                        <GlowButton variant="primary" size="sm" fullWidth onClick={() => handleSubmitResponse(report.id)}>
                          Send Response
                        </GlowButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
