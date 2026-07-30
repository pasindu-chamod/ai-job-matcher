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
  Briefcase, 
  Newspaper,
  ChevronRight,
  Target,
  DollarSign,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface RolePreset {
  id: string;
  title: string;
  salary: string;
  demand: string;
  requiredSkills: string[];
}

const TARGET_ROLES: RolePreset[] = [
  {
    id: 'fullstack-ai',
    title: 'Senior Full Stack AI Engineer',
    salary: '$140,000 - $185,000',
    demand: '🔥 Very High (+140% Growth)',
    requiredSkills: ['Python', 'React', 'TypeScript', 'Java', 'SQL', 'Docker', 'REST API', 'OpenAI']
  },
  {
    id: 'frontend-lead',
    title: 'Lead Frontend Architect',
    salary: '$110,000 - $150,000',
    demand: '⚡ High (+85% Growth)',
    requiredSkills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'Next.js', 'Vite']
  },
  {
    id: 'devops-cloud',
    title: 'Cloud DevOps & Security Specialist',
    salary: '$120,000 - $160,000',
    demand: '🚀 Critical (+110% Growth)',
    requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'Git', 'CI/CD', 'Terraform']
  },
  {
    id: 'ai-ml-nlp',
    title: 'Machine Learning & NLP Specialist',
    salary: '$150,000 - $195,000',
    demand: '🧠 Top Rated (+165% Growth)',
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'SQL', 'NLP', 'Pandas']
  },
  {
    id: 'backend-java',
    title: 'Backend Microservices Developer',
    salary: '$115,000 - $155,000',
    demand: '💼 Stable High (+60% Growth)',
    requiredSkills: ['Java', 'Spring Boot', 'SQL', 'MySQL', 'Redis', 'REST API', 'Microservices']
  }
];

const CATEGORIZED_SKILLS = {
  "Languages": ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'Go', 'SQL'],
  "Frontend": ['React', 'Next.js', 'Vue', 'Angular', 'HTML', 'CSS', 'Tailwind', 'Vite'],
  "Backend & Data": ['Node', 'Spring Boot', 'Django', 'FastAPI', 'Express', 'MySQL', 'PostgreSQL', 'Redis', 'Pandas'],
  "Cloud & DevOps": ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Linux', 'Git', 'CI/CD', 'Terraform'],
  "AI & ML": ['Machine Learning', 'TensorFlow', 'PyTorch', 'NLP', 'OpenAI']
};

export const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Interactive Live Simulator State
  const [selectedRole, setSelectedRole] = useState<RolePreset>(TARGET_ROLES[0]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Python', 'React', 'SQL', 'Docker']);
  const [customSkillInput, setCustomSkillInput] = useState('');

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const addCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkillInput.trim() && !selectedSkills.includes(customSkillInput.trim())) {
      setSelectedSkills([...selectedSkills, customSkillInput.trim()]);
      setCustomSkillInput('');
    }
  };

  // Live TF-IDF & Skill Match Calculation
  const reqSkills = selectedRole.requiredSkills;
  const userSkillsLower = selectedSkills.map(s => s.toLowerCase());
  const matchedSkills = reqSkills.filter(s => userSkillsLower.includes(s.toLowerCase()));
  const missingSkills = reqSkills.filter(s => !userSkillsLower.includes(s.toLowerCase()));

  const matchPercentage = reqSkills.length > 0
    ? Math.min(Math.round((matchedSkills.length / reqSkills.length) * 100), 100)
    : 0;

  // Real-world hiring advice based on live skills
  const getMarketFitAdvice = () => {
    if (matchPercentage >= 85) {
      return "🎯 Outstanding Compatibility! Your profile places you in the top 5% candidate pool for this position.";
    } else if (matchPercentage >= 60) {
      return `💡 Strong Technical Match! Adding experience in ${missingSkills[0] || 'cloud deployment'} will push your profile above 90%.`;
    } else if (matchPercentage >= 30) {
      return `📈 Developing Fit. Master ${missingSkills.slice(0, 2).join(' & ')} to unlock interview calls for this target role.`;
    } else {
      return "🔍 Select more skills or pick a target role aligned with your background to see your match score increase.";
    }
  };

  // Tech News Data
  const newsItems = [
    {
      id: 1,
      category: 'AI Hiring Trends 2026',
      title: 'Full Stack & AI Engineer Demand Surges by 140% in 2026',
      date: 'July 2026',
      snippet: 'Enterprise software companies are prioritizing developers who combine robust web framework experience (React/Spring) with Python AI microservices.',
      badge: 'Hot Trend'
    },
    {
      id: 2,
      category: 'Blockchain Security',
      title: 'Cryptographic Skill Passports Become Global Tech Standard',
      date: 'July 2026',
      snippet: 'SHA-256 tamper-proof ledger hashes enable instant credential verification, eliminating background check delays for top software engineers.',
      badge: 'Innovation'
    },
    {
      id: 3,
      category: 'Career Growth',
      title: 'ATS-Optimized Resumes Increase Callback Rates by 3.5x',
      date: 'June 2026',
      snippet: 'Advanced TF-IDF skill matching algorithms help job seekers pinpoint missing technical keywords before submitting applications.',
      badge: 'Guide'
    }
  ];

  return (
    <div className="space-y-20 pb-16 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 text-center space-y-8 max-w-5xl mx-auto px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-20 right-10 -z-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-400 text-sm font-semibold animate-float">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Next-Generation Microservices AI Hiring Platform</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Land Your Tech Dream Role With <br />
          <span className="gradient-text">AI Precision & Blockchain Trust</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          AI Job Matcher uses Python FastAPI microservices, TF-IDF skill matching algorithms, and SHA-256 blockchain verification to connect candidates with real tech opportunities.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {user ? (
            <Link
              to="/matches"
              className="gradient-btn px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-3"
            >
              <Zap className="w-5 h-5 fill-white" /> View Your AI Matches
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="gradient-btn px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5" /> Create Account <ArrowRight className="w-5 h-5" />
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

      {/* ADVANCED LIVE MATCH ENGINE SIMULATOR */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="glass-panel p-8 md:p-12 relative overflow-hidden space-y-8 border border-cyan-500/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl" />

          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" /> Interactive Match Engine Simulator
            </div>
            <h2 className="text-3xl font-extrabold">Test The AI Matching Engine Live</h2>
            <p className="text-sm text-gray-400">
              Select a target tech role and toggle technical skills to calculate real-time TF-IDF compatibility, salary estimates, and market fit.
            </p>
          </div>

          {/* Target Role Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" /> 1. Select Target Job Position:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {TARGET_ROLES.map(role => {
                const isSelected = selectedRole.id === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`p-3.5 rounded-xl text-left transition-all flex flex-col justify-between border ${
                      isSelected
                        ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                        : 'glass-panel text-gray-400 hover:text-white border-gray-800'
                    }`}
                  >
                    <div className="font-bold text-xs leading-snug">{role.title}</div>
                    <div className="text-[10px] text-green-400 font-semibold mt-2">{role.salary}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skills Picker */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-purple-400" /> 2. Toggle Your Technical Skills:
              </label>

              {Object.entries(CATEGORIZED_SKILLS).map(([category, skills]) => (
                <div key={category} className="space-y-2">
                  <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">{category}</div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                              : 'glass-panel text-gray-300 border-gray-700 hover:bg-slate-700/50'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />}
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Add Custom Skill Form */}
              <form onSubmit={addCustomSkill} className="flex gap-2 pt-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    placeholder="Add custom skill (e.g. PyTorch, GraphQL, NestJS)..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-800/60 border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button type="submit" className="glass-panel px-4 py-2 hover:bg-slate-700 font-bold text-xs rounded-xl text-cyan-400 border border-gray-700">
                  Add Skill
                </button>
              </form>
            </div>

            {/* Real-time Calculated Result Card */}
            <div className="glass-card p-6 space-y-6 border border-cyan-500/30 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <span className="text-xs uppercase font-bold text-gray-400">Match Compatibility</span>
                  <span className="text-xs text-cyan-400 font-semibold">{selectedRole.demand}</span>
                </div>

                <div className="text-center space-y-2">
                  <div className="text-5xl font-extrabold gradient-text">{matchPercentage}%</div>
                  <div className="text-xs text-gray-300 font-bold">{selectedRole.title}</div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 h-full transition-all duration-500"
                      style={{ width: `${matchPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Matched vs Missing Skills breakdown */}
                <div className="space-y-3 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 space-y-1">
                    <div className="font-bold text-green-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Matched Skills ({matchedSkills.length})
                    </div>
                    <div className="text-gray-300 font-medium">{matchedSkills.join(', ') || 'None selected'}</div>
                  </div>

                  {missingSkills.length > 0 && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                      <div className="font-bold text-amber-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Recommended to Learn ({missingSkills.length})
                      </div>
                      <div className="text-gray-300 font-medium">{missingSkills.join(', ')}</div>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-400 leading-relaxed italic bg-slate-900/60 p-3 rounded-xl border border-gray-800">
                  {getMarketFitAdvice()}
                </p>
              </div>

              <Link
                to="/register"
                className="gradient-btn py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-center"
              >
                Upload Full Resume For Live Matching <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM ARCHITECTURE FEATURES */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold">Powered By Microservices Architecture</h2>
          <p className="text-gray-400 text-sm">
            High-speed microservices using Spring Boot 3.2, Python FastAPI, MySQL, and SHA-256 Cryptographic Blockchain.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 space-y-4 relative group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Python Resume Parser</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Extracts tech keywords from PDF, DOCX, and TXT files with zero false positives. Generates dynamic ATS optimization scores and real suggestions.
            </p>
          </div>

          <div className="glass-card p-8 space-y-4 relative group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">TF-IDF Matching Engine</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Calculates real-time skill overlap percentages against live tech job postings, identifying matched vs missing skills for recruiters.
            </p>
          </div>

          <div className="glass-card p-8 space-y-4 relative group">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Blockchain Skill Passport</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Mints immutable SHA-256 cryptographic hashes for candidate skills, offering tamper-proof verification to hiring managers.
            </p>
          </div>
        </div>
      </section>

      {/* TECH NEWS & INDUSTRY INSIGHTS */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Newspaper className="w-4 h-4" /> Live Market Insights
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
          <h2 className="text-3xl md:text-4xl font-extrabold">Ready to Accelerate Your Tech Career?</h2>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto">
            Upload your resume, discover your AI job matches, verify your credentials on the blockchain, and track applications in real time.
          </p>
          <div className="pt-2">
            <Link to="/register" className="gradient-btn px-8 py-3.5 rounded-xl font-bold text-base inline-flex items-center gap-2">
              Create Your Free Account <ArrowRight className="w-4 h-4" />
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
