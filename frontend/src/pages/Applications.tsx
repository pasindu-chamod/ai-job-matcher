import React, { useEffect, useState } from 'react';
import { Briefcase, Calendar, CheckCircle2, Clock, MapPin, Building2, ChevronRight, Award, Zap, Search, ArrowRight } from 'lucide-react';
import { applicationService } from '../services/api';
import { Link } from 'react-router-dom';

interface AppItem {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  status: 'applied' | 'review' | 'interview' | 'offer' | 'rejected';
  appliedAt: string;
  matchScore: number;
}

const statusColumns = [
  { key: 'applied', label: 'Applied', color: 'border-blue-500 text-blue-400 bg-blue-500/10' },
  { key: 'review', label: 'Under Review', color: 'border-purple-500 text-purple-400 bg-purple-500/10' },
  { key: 'interview', label: 'Interview Scheduled', color: 'border-amber-500 text-amber-400 bg-amber-500/10' },
  { key: 'offer', label: 'Offer Received', color: 'border-green-500 text-green-400 bg-green-500/10' }
];

const Applications = () => {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationService.getUserApplications()
      .then(res => {
        if (res && res.length > 0) {
          // Map API Application type to our AppItem display type
          const mapped: AppItem[] = res.map((a: any) => ({
            id: a.id || '',
            jobTitle: a.jobTitle || a.job?.title || 'Unknown Position',
            company: a.company || a.job?.company || 'Unknown Company',
            location: a.location || a.job?.location || 'Remote',
            status: a.status || 'applied',
            appliedAt: a.appliedAt || a.createdAt || new Date().toISOString().split('T')[0],
            matchScore: a.matchScore || 0,
          }));
          setApps(mapped);
        } else {
          setApps([]);
        }
      })
      .catch(() => setApps([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-cyan-400 font-semibold">Loading applications...</p>
      </div>
    );
  }

  // Empty state for new users
  if (apps.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" /> Application Tracker
          </div>
          <h1 className="text-3xl font-extrabold">My Job Applications</h1>
        </div>

        <div className="glass-panel p-12 text-center space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto">
            <Search className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold">No Applications Yet</h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Browse AI-matched jobs and apply to positions that match your skills. Your applications will appear here for tracking.
            </p>
          </div>
          <div className="flex gap-3 justify-center pt-2">
            <Link to="/matches" className="gradient-btn px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
              <Zap className="w-4 h-4" /> Browse Job Matches
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const interviewCount = apps.filter(a => a.status === 'interview').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" /> Application Tracker
          </div>
          <h1 className="text-3xl font-extrabold">My Job Applications</h1>
          <p className="text-sm text-gray-400">
            Real-time status updates and recruitment pipeline tracking.
          </p>
        </div>

        <div className="glass-panel px-4 py-2 text-xs font-bold text-green-400 flex items-center gap-2">
          <Zap className="w-4 h-4" /> {apps.length} Total — {interviewCount} Interview{interviewCount !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Kanban Board Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statusColumns.map((col) => {
          const columnApps = apps.filter(a => a.status === col.key);
          return (
            <div key={col.key} className="glass-panel p-4 space-y-4 flex flex-col justify-start">
              {/* Column Header */}
              <div className={`p-3 rounded-xl border ${col.color} flex items-center justify-between font-bold text-xs`}>
                <span>{col.label}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-900/80 text-white font-extrabold text-[11px]">
                  {columnApps.length}
                </span>
              </div>

              {/* Application Cards */}
              <div className="space-y-3">
                {columnApps.length === 0 ? (
                  <p className="text-center text-xs text-gray-500 py-8">No applications</p>
                ) : (
                  columnApps.map((app) => (
                    <div
                      key={app.id}
                      className="glass-card p-4 space-y-3 border border-gray-700/60 hover:border-cyan-500/50 transition-all text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">{app.company}</span>
                          <span className="font-extrabold gradient-text text-sm">{app.matchScore}%</span>
                        </div>
                        <h4 className="font-bold text-sm leading-snug">{app.jobTitle}</h4>
                      </div>

                      <div className="flex flex-col gap-1 text-gray-400 text-[11px]">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-gray-400" /> {app.location}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-cyan-400" /> Applied: {app.appliedAt}</span>
                      </div>

                      <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-[11px] text-cyan-400 font-semibold cursor-pointer">
                        <span>View Status History</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Applications;