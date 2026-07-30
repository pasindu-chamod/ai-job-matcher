import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Briefcase, FileCheck, Award, Sparkles, Upload, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { matchService, applicationService, blockchainService } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();

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

  const kpiCards = [
    {
      label: 'Applications',
      value: loading ? '…' : String(appCount ?? 0),
      subtext: (appCount ?? 0) === 0 ? 'No applications yet' : 'Total submitted',
      color: '#2563eb',
      bg: '#eff6ff',
      icon: Briefcase,
    },
    {
      label: 'AI Job Matches',
      value: loading ? '…' : String(matchCount ?? 0),
      subtext: (matchCount ?? 0) === 0 ? 'Upload resume to get matches' : 'Positions found',
      color: '#059669',
      bg: '#f0fdf4',
      icon: FileCheck,
    },
    {
      label: 'Average Match Rate',
      value: loading ? '…' : `${avgMatch ?? 0}%`,
      subtext: (avgMatch ?? 0) === 0 ? 'N/A' : (avgMatch ?? 0) >= 80 ? 'Excellent compatibility' : 'Good fit',
      color: '#7c3aed',
      bg: '#f5f3ff',
      icon: TrendingUp,
    },
    {
      label: 'Verified Skills',
      value: loading ? '…' : String(verifiedCount ?? 0),
      subtext: (verifiedCount ?? 0) === 0 ? 'No verifications yet' : 'Blockchain Verified',
      color: '#d97706',
      bg: '#fffbeb',
      icon: Award,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div
        className="glass-panel p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{ borderLeft: '4px solid #2563eb' }}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: '#2563eb' }}>
            <Sparkles className="w-4 h-4" /> AI Matcher Dashboard
          </div>
          <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-main)' }}>
            Welcome back, <span style={{ color: '#2563eb' }}>{user?.fullName || 'Candidate'}</span>!
          </h1>
          <p className="text-sm max-w-xl" style={{ color: 'var(--text-muted)' }}>
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
          <Link
            to="/upload"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
          >
            <Upload className="w-4 h-4" /> {hasActivity ? 'Update Resume' : 'Upload Resume'}
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {kpiCards.map(({ label, value, subtext, color, bg, icon: Icon }) => (
          <div key={label} className="glass-card p-6 flex justify-between items-center group">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</p>
              <p className="text-3xl font-extrabold mt-1" style={{ color }}>{value}</p>
              <span className="text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>{subtext}</span>
            </div>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition"
              style={{ background: bg }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Getting Started / Activity Panel */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 glass-panel p-6 space-y-4">
          {!hasActivity ? (
            <div className="space-y-6 py-4">
              <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                <Sparkles className="w-5 h-5" style={{ color: '#2563eb' }} /> Getting Started Guide
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    step: 'Step 1',
                    title: 'Upload Resume',
                    desc: 'Upload your resume (PDF/DOCX) for AI skill extraction',
                    link: '/upload',
                    linkText: 'Upload Now →',
                    color: '#2563eb',
                    bg: '#eff6ff',
                    border: '#bfdbfe',
                    icon: Upload,
                  },
                  {
                    step: 'Step 2',
                    title: 'View Matches',
                    desc: 'View AI-powered job matches based on your skills',
                    link: '/matches',
                    linkText: 'View Matches →',
                    color: '#7c3aed',
                    bg: '#f5f3ff',
                    border: '#ddd6fe',
                    icon: Zap,
                  },
                  {
                    step: 'Step 3',
                    title: 'Verify Skills',
                    desc: 'Verify your credentials on blockchain for employers',
                    link: '/verify',
                    linkText: 'Verify Skills →',
                    color: '#d97706',
                    bg: '#fffbeb',
                    border: '#fde68a',
                    icon: Award,
                  },
                ].map(({ step, title, desc, link, linkText, color, bg, border, icon: Icon }) => (
                  <div
                    key={step}
                    className="p-5 rounded-xl text-center space-y-3"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto" style={{ background: '#fff' }}>
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <h3 className="font-bold text-sm" style={{ color }}>{step}</h3>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                    <Link to={link} className="inline-block text-xs font-bold hover:underline" style={{ color }}>
                      {linkText}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>Your Activity Summary</h2>
                <span className="text-xs font-semibold" style={{ color: '#2563eb' }}>Live Data</span>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  { icon: CheckCircle2, color: '#059669', text: <><strong>{matchCount}</strong> AI job matches found</> },
                  { icon: Briefcase, color: '#2563eb', text: <><strong>{appCount}</strong> applications submitted</> },
                  { icon: Award, color: '#d97706', text: <><strong>{verifiedCount}</strong> skills verified on blockchain</> },
                ].map(({ icon: Icon, color, text }, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                    <span style={{ color: 'var(--text-muted)' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="glass-panel p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-bold text-base flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
              <Zap className="w-4 h-4" style={{ color: '#2563eb' }} /> Recommended Actions
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { title: 'Upload Your Resume', desc: 'Let AI extract your skills and find the best job matches for you.', color: '#2563eb', bg: '#eff6ff' },
                { title: 'Verify Your Credentials', desc: 'Add SHA-256 hash to your blockchain skill passport.', color: '#7c3aed', bg: '#f5f3ff' },
              ].map(({ title, desc, color, bg }) => (
                <div
                  key={title}
                  className="p-3 rounded-xl space-y-1"
                  style={{ background: bg, border: '1px solid var(--border-color)' }}
                >
                  <div className="font-semibold" style={{ color }}>{title}</div>
                  <p style={{ color: 'var(--text-muted)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/verify"
            className="w-full py-2.5 text-center text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition"
            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: '#2563eb' }}
          >
            Verify Credentials <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;