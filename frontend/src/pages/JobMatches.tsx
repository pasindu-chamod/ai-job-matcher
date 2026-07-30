import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { MapPin, DollarSign, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Zap, Building2, Briefcase, Upload, Search } from 'lucide-react';
import { matchService } from '../services/api';
import { JobMatch } from '../types';
import { Link } from 'react-router-dom';

const JobMatches = () => {
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    matchService.getMatches()
      .then(res => {
        setMatches(res && res.length > 0 ? res : []);
      })
      .catch(() => setMatches([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-cyan-400 font-semibold">Running TF-IDF AI Skill Matching Microservice...</p>
      </div>
    );
  }

  // Empty State — no matches found for this user
  if (matches.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> AI Recommendations
          </div>
          <h1 className="text-3xl font-extrabold">Matched Job Positions</h1>
        </div>

        <div className="glass-panel p-12 text-center space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto">
            <Search className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold">No Job Matches Yet</h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Upload your resume first so our AI can extract your skills and match you with the best job opportunities.
            </p>
          </div>
          <div className="flex gap-3 justify-center pt-2">
            <Link to="/upload" className="gradient-btn px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload Resume
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> AI Recommendations
          </div>
          <h1 className="text-3xl font-extrabold">Matched Job Positions</h1>
          <p className="text-sm text-gray-400">
            Calculated in real-time based on your parsed resume skills and job requirements.
          </p>
        </div>

        <div className="glass-panel px-4 py-2 text-xs font-bold text-cyan-400 flex items-center gap-2">
          <Zap className="w-4 h-4" /> {matches.length} Matches Found
        </div>
      </div>

      {/* Match List */}
      <div className="space-y-6">
        {matches.map((match, idx) => {
          const isHighMatch = match.matchScore >= 85;
          return (
            <div
              key={idx}
              onClick={() => navigate(`/jobs/${match.job.id}`, { state: { match } })}
              className="glass-card p-6 md:p-8 cursor-pointer relative overflow-hidden space-y-6 group border border-gray-700/60 hover:border-cyan-500/50 transition-all"
            >
              {/* Score Badge Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{match.job.company}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold group-hover:text-cyan-300 transition">{match.job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400 pt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" />{match.job.location}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-green-400" />{match.job.salary}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-purple-400" />{match.job.type || 'Full-time'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-gray-400 font-medium">Match Score</div>
                    <div className={`text-3xl font-extrabold ${isHighMatch ? 'gradient-text' : 'text-amber-400'}`}>
                      {match.matchScore}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Breakdown */}
              <div className="grid md:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-green-500/20 space-y-2">
                  <div className="font-bold text-green-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Matched Skills ({match.matchedSkills.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {match.matchedSkills.map((s, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-green-500/10 text-green-300 border border-green-500/30 font-medium">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                {match.missingSkills.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/20 space-y-2">
                    <div className="font-bold text-amber-400 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" /> Recommended to Learn ({match.missingSkills.length})
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {match.missingSkills.map((s, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium">
                          + {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Reasoning Banner */}
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 flex items-center justify-between gap-4">
                <span>💡 <strong className="text-white">AI Recommendation:</strong> {match.reasoning}</span>
                <span className="font-bold text-cyan-400 flex items-center gap-1 shrink-0">
                  View Job Details <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobMatches;