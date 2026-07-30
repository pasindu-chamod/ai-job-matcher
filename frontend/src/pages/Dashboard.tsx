import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Briefcase, FileCheck, Award, Sparkles, Upload, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { matchService, applicationService, blockchainService } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();

  // Real data from APIs
  const [matchCount, setMatchCount] = useState<number | null>(null);
  const [appCount, setAppCount] = useState<number | null>(null);
  const [verifiedCount, setVerifiedCount] = useState<number | null>(null);
  const [avgMatch, setAvgMatch] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matches, apps, verifications] = await Promise.allSettled([
          matchService.getMatches(),
          applicationService.getUserApplications(),
          blockchainService.getUserVerifications(),
        ]);

        if (matches.status === 'fulfilled') {
          const m = matches.value || [];
          setMatchCount(m.length);
          if (m.length > 0) {
            const avg = Math.round(m.reduce((s: number, x: any) => s + (x.matchScore || 0), 0) / m.length);
            setAvgMatch(avg);
          } else {
            setAvgMatch(0);
          }
        } else {
          setMatchCount(0);
          setAvgMatch(0);
        }

        if (apps.status === 'fulfilled') {
          setAppCount((apps.value || []).length);
        } else {
          setAppCount(0);
        }

        if (verifications.status === 'fulfilled') {
          setVerifiedCount((verifications.value || []).length);
        } else {
          setVerifiedCount(0);
        }
      } catch {
        setMatchCount(0);
        setAppCount(0);
        setVerifiedCount(0);
        setAvgMatch(0);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const hasActivity = (matchCount ?? 0) > 0 || (appCount ?? 0) > 0 || (verifiedCount ?? 0) > 0;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-l-4 border-cyan-400">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> AI Matcher Dashboard
          </div>
          <h1 className="text-3xl font-extrabold">
            Welcome back, <span className="gradient-text">{user?.fullName || 'Candidate'}</span>!
          </h1>
          <p className="text-sm text-gray-400 max-w-xl">
            {hasActivity
              ? `Your profile is active with ${matchCount ?? 0} AI job matches and ${appCount ?? 0} applications tracked.`
              : 'Get started by uploading your resume. Our AI will match you with the best job opportunities instantly.'
            }
          </p>
        </div>

        <div className="flex gap-3">
          <Link to="/matches" className="gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
            <Zap className="w-4 h-4" /> View AI Matches
          </Link>
          <Link to="/upload" className="glass-panel hover:bg-slate-700/50 px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 text-gray-300">
            <Upload className="w-4 h-4" /> {hasActivity ? 'Update Resume' : 'Upload Resume'}
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex justify-between items-center relative overflow-hidden group">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Applications</p>
            <p className="text-3xl font-extrabold gradient-text mt-1">
              {loading ? '…' : appCount ?? 0}
            </p>
            <span className="text-[10px] text-gray-500 font-semibold">
              {(appCount ?? 0) === 0 ? 'No applications yet' : 'Total submitted'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 flex justify-between items-center relative overflow-hidden group">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">AI Job Matches</p>
            <p className="text-3xl font-extrabold text-green-400 mt-1">
              {loading ? '…' : matchCount ?? 0}
            </p>
            <span className="text-[10px] text-gray-500 font-semibold">
              {(matchCount ?? 0) === 0 ? 'Upload resume to get matches' : 'Positions found'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center group-hover:scale-110 transition">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 flex justify-between items-center relative overflow-hidden group">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Average Match Rate</p>
            <p className="text-3xl font-extrabold text-purple-400 mt-1">
              {loading ? '…' : `${avgMatch ?? 0}%`}
            </p>
            <span className="text-[10px] text-gray-500 font-semibold">
              {(avgMatch ?? 0) === 0 ? 'N/A' : (avgMatch ?? 0) >= 80 ? 'Excellent compatibility' : 'Good fit'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 flex justify-between items-center relative overflow-hidden group">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Verified Skills</p>
            <p className="text-3xl font-extrabold text-amber-400 mt-1">
              {loading ? '…' : verifiedCount ?? 0}
            </p>
            <span className="text-[10px] text-gray-500 font-semibold">
              {(verifiedCount ?? 0) === 0 ? 'No verifications yet' : 'Blockchain Verified'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Getting Started / Action Panel */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 glass-panel p-6 space-y-4">
          {!hasActivity ? (
            /* Empty State - Getting Started Guide */
            <div className="space-y-6 py-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" /> Getting Started Guide
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-slate-800/60 border border-cyan-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-sm text-cyan-300">Step 1</h3>
                  <p className="text-xs text-gray-400">Upload your resume (PDF/DOCX) for AI skill extraction</p>
                  <Link to="/upload" className="inline-block text-xs font-bold text-cyan-400 hover:underline">
                    Upload Now →
                  </Link>
                </div>
                <div className="p-5 rounded-xl bg-slate-800/60 border border-purple-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-sm text-purple-300">Step 2</h3>
                  <p className="text-xs text-gray-400">View AI-powered job matches based on your skills</p>
                  <Link to="/matches" className="inline-block text-xs font-bold text-purple-400 hover:underline">
                    View Matches →
                  </Link>
                </div>
                <div className="p-5 rounded-xl bg-slate-800/60 border border-amber-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-sm text-amber-300">Step 3</h3>
                  <p className="text-xs text-gray-400">Verify your credentials on blockchain for employers</p>
                  <Link to="/verify" className="inline-block text-xs font-bold text-amber-400 hover:underline">
                    Verify Skills →
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Has Activity - Show summary */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Your Activity Summary</h2>
                <span className="text-xs text-cyan-400 font-semibold">Live Data</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-gray-700/50">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    <strong className="text-white">{matchCount}</strong> AI job matches found
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-gray-700/50">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">
                    <strong className="text-white">{appCount}</strong> applications submitted
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-gray-700/50">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-gray-300">
                    <strong className="text-white">{verifiedCount}</strong> skills verified on blockchain
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="glass-panel p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Recommended Actions
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-gray-700/60 space-y-1">
                <div className="font-semibold text-cyan-300">Upload Your Resume</div>
                <p className="text-gray-400">Let AI extract your skills and find the best job matches for you.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-gray-700/60 space-y-1">
                <div className="font-semibold text-purple-300">Verify Your Credentials</div>
                <p className="text-gray-400">Add SHA-256 hash to your blockchain skill passport.</p>
              </div>
            </div>
          </div>

          <Link to="/verify" className="w-full glass-panel hover:bg-slate-700/50 py-2.5 text-center text-xs font-semibold text-cyan-400 rounded-xl flex items-center justify-center gap-2">
            Verify Credentials <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;