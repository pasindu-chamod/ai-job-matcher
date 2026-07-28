import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Briefcase, FileCheck, Award, Sparkles, Upload, ArrowRight, Zap, CheckCircle2, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const applicationStats = [
    { month: 'Jan', count: 4, matches: 80 },
    { month: 'Feb', count: 6, matches: 85 },
    { month: 'Mar', count: 9, matches: 89 },
    { month: 'Apr', count: 12, matches: 94 },
    { month: 'May', count: 15, matches: 96 },
  ];

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
            Your candidate profile is active. You have 3 top-tier AI job matches with an average compatibility score of 89%.
          </p>
        </div>

        <div className="flex gap-3">
          <Link to="/matches" className="gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
            <Zap className="w-4 h-4" /> View AI Matches
          </Link>
          <Link to="/upload" className="glass-panel hover:bg-slate-700/50 px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 text-gray-300">
            <Upload className="w-4 h-4" /> Update Resume
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex justify-between items-center relative overflow-hidden group">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Active Applications</p>
            <p className="text-3xl font-extrabold gradient-text mt-1">12</p>
            <span className="text-[10px] text-green-400 font-semibold">+3 this month</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 flex justify-between items-center relative overflow-hidden group">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Scheduled Interviews</p>
            <p className="text-3xl font-extrabold text-green-400 mt-1">3</p>
            <span className="text-[10px] text-gray-400">Next: TechCorp (Tomorrow)</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center group-hover:scale-110 transition">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 flex justify-between items-center relative overflow-hidden group">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Average Match Rate</p>
            <p className="text-3xl font-extrabold text-purple-400 mt-1">89%</p>
            <span className="text-[10px] text-purple-400 font-semibold">Top 5% candidate</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 flex justify-between items-center relative overflow-hidden group">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Verified Skills</p>
            <p className="text-3xl font-extrabold text-amber-400 mt-1">5</p>
            <span className="text-[10px] text-amber-400 font-semibold">Blockchain Verified</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Analytics Chart & Quick Activity */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Applications & Match Velocity</h2>
            <span className="text-xs text-cyan-400 font-semibold">2026 Metrics</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={applicationStats}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.5rem', color: '#fff' }}
                />
                <Area type="monotone" dataKey="count" stroke="#06b6d4" fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Panel */}
        <div className="glass-panel p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Recommended Actions
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-gray-700/60 space-y-1">
                <div className="font-semibold text-cyan-300">Upload Updated Resume</div>
                <p className="text-gray-400">Increase ATS score by including Docker & Kubernetes skills.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-gray-700/60 space-y-1">
                <div className="font-semibold text-purple-300">Verify Python Credential</div>
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