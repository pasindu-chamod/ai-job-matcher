import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  BrainCircuit, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Briefcase, 
  Building2, 
  FileText, 
  Layers, 
  Newspaper,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Interactive Skill Match Simulator State
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Python', 'React', 'SQL']);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [simulatedScore, setSimulatedScore] = useState<number | null>(88);

  const availableSkills = ['Python', 'Java', 'React', 'TypeScript', 'Docker', 'AWS', 'Spring', 'Machine Learning', 'SQL', 'Node'];

  const toggleSkill = (skill: string) => {
    let updated: string[];
    if (selectedSkills.includes(skill)) {
      updated = selectedSkills.filter(s => s !== skill);
    } else {
      updated = [...selectedSkills, skill];
    }
    setSelectedSkills(updated);
    calculateDemoScore(updated);
  };

  const addCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkillInput.trim() && !selectedSkills.includes(customSkillInput.trim())) {
      const updated = [...selectedSkills, customSkillInput.trim()];
      setSelectedSkills(updated);
      setCustomSkillInput('');
      calculateDemoScore(updated);
    }
  };

  const calculateDemoScore = (skills: string[]) => {
    if (skills.length === 0) {
      setSimulatedScore(0);
      return;
    }
    const score = Math.min(45 + skills.length * 12, 99);
    setSimulatedScore(score);
  };

  // Tech News Data
  const newsItems = [
    {
      id: 1,
      category: 'AI Hiring Trends',
      title: 'Full Stack & AI Engineer Demand Surges by 140% in 2026',
      date: 'July 2026',
      snippet: 'Companies are prioritizing developers who bridge the gap between web applications and LLM microservice integrations.',
      badge: 'Hot Trend'
    },
    {
      id: 2,
      category: 'Blockchain Tech',
      title: 'Cryptographic Skill Passports Become Standard for Tech Verification',
      date: 'July 2026',
      snippet: 'Immutable hashes ensure resumes are 100% authentic, eliminating background check delays for top candidates.',
      badge: 'Innovation'
    },
    {
      id: 3,
      category: 'Career Growth',
      title: 'ATS Optimizing Resumes Increases Interview Callbacks by 3.5x',
      date: 'June 2026',
      snippet: 'AI parsing tools help jobseekers identify missing high-impact technical keywords before applying.',
      badge: 'Guide'
    }
  ];

  return (
    <div className="space-y-20 pb-16 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 text-center space-y-8 max-w-5xl mx-auto px-4">
        {/* Glow backdrop shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-20 right-10 -z-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow" />

        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-400 text-sm font-semibold animate-float">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Next-Generation Microservices AI Hiring Platform</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Land Your Dream Tech Job With <br />
          <span className="gradient-text">AI Precision & Blockchain Trust</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 dark:text-gray-300 light-theme:text-gray-600 max-w-3xl mx-auto leading-relaxed">
          AI Job Matcher uses high-speed Python FastAPI microservices, TF-IDF skill matching algorithms, and SHA-256 blockchain verification to connect developers with top tech opportunities.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {user ? (
            <Link
              to="/matches"
              className="gradient-btn px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-3"
            >
              <Zap className="w-5 h-5 fill-white" /> View Your Matches
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="gradient-btn px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5" /> Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="glass-panel hover:bg-slate-800/80 text-white font-semibold px-8 py-4 rounded-xl text-lg border border-gray-700 transition"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* LIVE STATS COUNTER */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl md:text-4xl font-extrabold gradient-text">12,450+</div>
            <div className="text-xs md:text-sm text-gray-400 font-medium mt-1">Resumes Parsed</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-cyan-400">98.4%</div>
            <div className="text-xs md:text-sm text-gray-400 font-medium mt-1">Match Accuracy</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-purple-400">8,920+</div>
            <div className="text-xs md:text-sm text-gray-400 font-medium mt-1">Verified Credentials</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-green-400">450+</div>
            <div className="text-xs md:text-sm text-gray-400 font-medium mt-1">Tech Partners</div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SKILL MATCH SIMULATOR */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl" />

          <div className="text-center max-w-2xl mx-auto space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" /> Interactive Match Simulator
            </div>
            <h2 className="text-3xl font-bold">Test The AI Matching Engine Live</h2>
            <p className="text-sm text-gray-400">
              Select your technical skills below or type custom ones to see how our microservice calculates real-time job compatibility scores.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Skill Selector */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 block">
                  Select Your Skills:
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map(skill => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                            : 'glass-panel hover:bg-slate-700/50 text-gray-300 border-gray-700'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-4 h-4 inline mr-1.5" />}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add Custom Skill Form */}
              <form onSubmit={addCustomSkill} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    placeholder="Add custom skill (e.g. Kubernetes, Vue, PyTorch)..."
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-800/60 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button type="submit" className="glass-panel px-5 py-2.5 hover:bg-slate-700 font-semibold text-sm rounded-xl">
                  Add
                </button>
              </form>
            </div>

            {/* Simulated Score Meter Card */}
            <div className="glass-card p-6 text-center space-y-4 border border-cyan-500/30">
              <div className="text-xs uppercase font-semibold text-gray-400">Calculated Compatibility</div>
              <div className="relative inline-flex items-center justify-center">
                <div className="text-5xl font-extrabold gradient-text">{simulatedScore}%</div>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 h-full transition-all duration-500"
                  style={{ width: `${simulatedScore}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">
                {simulatedScore! >= 80 ? '🎯 Excellent Match! High chance of recruiter interview.' : '💡 Strong base! Add 1-2 more skills for 90%+ match.'}
              </p>
              <Link to="/register" className="w-full gradient-btn py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                Unlock Full AI Analysis <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold">Powered By Modern Microservices</h2>
          <p className="text-gray-400 text-sm">
            Built using Spring Boot 3.2, Python FastAPI, PostgreSQL/MySQL, and Redis architecture.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 space-y-4 relative group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">AI Resume Parser</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Extracts text from PDF/DOCX resumes, detects years of experience, auto-tags tech skills, and generates actionable ATS scores.
            </p>
          </div>

          <div className="glass-card p-8 space-y-4 relative group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Smart TF-IDF Matcher</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Compares candidate profiles against job postings, calculates missing skills, and explains why a job is a good fit.
            </p>
          </div>

          <div className="glass-card p-8 space-y-4 relative group">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Blockchain Verification</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Issues tamper-proof SHA-256 cryptographic hashes for candidate skills, guaranteeing credential authenticity to employers.
            </p>
          </div>
        </div>
      </section>

      {/* TECH NEWS & INDUSTRY INSIGHTS */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Newspaper className="w-4 h-4" /> Live Insights
            </div>
            <h2 className="text-2xl font-bold mt-1">Tech Hiring & Industry News</h2>
          </div>
          <span className="text-xs text-gray-400">Updated Daily</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map(news => (
            <div key={news.id} className="glass-card p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold">{news.badge}</span>
                  <span className="text-gray-500">{news.date}</span>
                </div>
                <h3 className="font-bold text-lg leading-snug hover:text-cyan-400 transition cursor-pointer">{news.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{news.snippet}</p>
              </div>
              <div className="pt-2 border-t border-gray-800/60 flex items-center justify-between text-xs text-cyan-400 font-semibold cursor-pointer">
                <span>Read Full Article</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="glass-panel p-10 md:p-16 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl" />
          <h2 className="text-3xl md:text-4xl font-extrabold">Ready to Accelerate Your Career?</h2>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto">
            Upload your resume, discover instant match percentages, verify your credentials on the blockchain, and track applications in real time.
          </p>
          <div className="pt-2">
            <Link to="/register" className="gradient-btn px-8 py-3.5 rounded-xl font-bold text-base inline-flex items-center gap-2">
              Create Your Account Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-4 pt-12 border-t border-gray-800/80 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-sm text-white">AI Job Matcher</span>
          <span>© 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-cyan-400 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-cyan-400 cursor-pointer">Terms of Service</span>
          <span className="hover:text-cyan-400 cursor-pointer">API Docs</span>
          <div className="flex items-center gap-2 text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
            <span>All Systems Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
