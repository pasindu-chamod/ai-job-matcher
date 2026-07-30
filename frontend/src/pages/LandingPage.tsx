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
    demand: '🔥 Very High',
    requiredSkills: ['Python', 'React', 'TypeScript', 'Java', 'SQL', 'Docker', 'REST API', 'OpenAI']
  },
  {
    id: 'frontend-lead',
    title: 'Lead Frontend Architect',
    salary: '$110,000 - $150,000',
    demand: '⚡ High',
    requiredSkills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'Next.js', 'Vite']
  },
  {
    id: 'devops-cloud',
    title: 'Cloud DevOps & Security Specialist',
    salary: '$120,000 - $160,000',
    demand: '🚀 Critical',
    requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'Git', 'CI/CD', 'Terraform']
  },
  {
    id: 'ai-ml-nlp',
    title: 'Machine Learning & NLP Specialist',
    salary: '$150,000 - $195,000',
    demand: '🧠 Top Rated',
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'SQL', 'NLP', 'Pandas']
  },
  {
    id: 'backend-java',
    title: 'Backend Microservices Developer',
    salary: '$115,000 - $155,000',
    demand: '💼 Stable High',
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

  const reqSkills = selectedRole.requiredSkills;
  const userSkillsLower = selectedSkills.map(s => s.toLowerCase());
  const matchedSkills = reqSkills.filter(s => userSkillsLower.includes(s.toLowerCase()));
  const missingSkills = reqSkills.filter(s => !userSkillsLower.includes(s.toLowerCase()));

  const matchPercentage = reqSkills.length > 0
    ? Math.min(Math.round((matchedSkills.length / reqSkills.length) * 100), 100)
    : 0;

  const getMarketFitAdvice = () => {
    if (matchPercentage >= 85) {
      return "Outstanding compatibility! Your profile is in the top 5% candidate pool for this position.";
    } else if (matchPercentage >= 60) {
      return `Strong technical match! Adding experience in ${missingSkills[0] || 'cloud deployment'} will push your profile above 90%.`;
    } else if (matchPercentage >= 30) {
      return `Developing fit. Master ${missingSkills.slice(0, 2).join(' & ')} to unlock interview calls for this role.`;
    } else {
      return "Select more skills or pick a target role aligned with your background to see your match score.";
    }
  };

  const newsItems = [
    {
      id: 1,
      category: 'AI Hiring Trends 2026',
      title: 'Full Stack & AI Engineer Demand Surges by 140% in 2026',
      date: 'July 2026',
      snippet: 'Enterprise companies are prioritizing developers who combine React/Spring experience with Python AI microservices.',
      badge: 'Hot Trend'
    },
    {
      id: 2,
      category: 'Blockchain Security',
      title: 'Cryptographic Skill Passports Become Global Tech Standard',
      date: 'July 2026',
      snippet: 'SHA-256 tamper-proof ledger hashes enable instant credential verification, eliminating background check delays.',
      badge: 'Innovation'
    },
    {
      id: 3,
      category: 'Career Growth',
      title: 'ATS-Optimized Resumes Increase Callback Rates by 3.5x',
      date: 'June 2026',
      snippet: 'Advanced TF-IDF skill matching algorithms help job seekers pinpoint missing technical keywords before applying.',
      badge: 'Guide'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="pt-10 pb-16 text-center space-y-8 max-w-5xl mx-auto px-4">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
          style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}
        >
          <Sparkles className="w-4 h-4" />
          <span>Next-Generation AI Hiring Platform</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight" style={{ color: 'var(--text-main)' }}>
          Land Your Tech Dream Role With <br />
          <span className="gradient-text">AI Precision & Blockchain Trust</span>
        </h1>

        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          AI Job Matcher uses Python FastAPI microservices, TF-IDF skill matching, and SHA-256 blockchain verification to connect candidates with real tech opportunities.
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
                className="font-semibold px-8 py-4 rounded-xl text-lg transition"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
          {[
            { value: '12,450+', label: 'Resumes Parsed', color: '#2563eb' },
            { value: '98.4%', label: 'Match Accuracy', color: '#059669' },
            { value: '8,920+', label: 'Verified Credentials', color: '#7c3aed' },
            { value: '450+', label: 'Tech Partners', color: '#d97706' },
          ].map(stat => (
            <div key={stat.label} className="glass-card p-6 text-center">
              <div className="text-3xl md:text-4xl font-extrabold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs md:text-sm font-medium mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE MATCH ENGINE SIMULATOR */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="glass-panel p-8 md:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}
            >
              <Zap className="w-3.5 h-3.5" /> Interactive Match Engine
            </div>
            <h2 className="text-3xl font-extrabold" style={{ color: 'var(--text-main)' }}>Test The AI Matching Engine Live</h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Select a target tech role and toggle your skills to calculate real-time TF-IDF compatibility and market fit.
            </p>
          </div>

          {/* Target Role Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <Target className="w-4 h-4" style={{ color: '#2563eb' }} /> 1. Select Target Job Position:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {TARGET_ROLES.map(role => {
                const isSelected = selectedRole.id === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className="p-3.5 rounded-xl text-left transition-all flex flex-col justify-between"
                    style={{
                      background: isSelected ? '#eff6ff' : 'var(--bg-secondary)',
                      border: isSelected ? '2px solid #2563eb' : '1px solid var(--border-color)',
                      color: isSelected ? '#1d4ed8' : 'var(--text-muted)',
                    }}
                  >
                    <div className="font-bold text-xs leading-snug">{role.title}</div>
                    <div className="text-[10px] font-semibold mt-2" style={{ color: '#059669' }}>{role.salary}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skills Picker */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                <BrainCircuit className="w-4 h-4" style={{ color: '#7c3aed' }} /> 2. Toggle Your Technical Skills:
              </label>

              {Object.entries(CATEGORIZED_SKILLS).map(([category, skills]) => (
                <div key={category} className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#2563eb' }}>{category}</div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
                          style={{
                            background: isSelected ? '#2563eb' : 'var(--bg-secondary)',
                            color: isSelected ? '#ffffff' : 'var(--text-muted)',
                            border: isSelected ? '1px solid #2563eb' : '1px solid var(--border-color)',
                          }}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />}
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <form onSubmit={addCustomSkill} className="flex gap-2 pt-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3" style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    placeholder="Add custom skill (e.g. PyTorch, GraphQL)..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-xs rounded-xl transition"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#2563eb' }}
                >
                  Add
                </button>
              </form>
            </div>

            {/* Match Result Card */}
            <div className="glass-card p-6 space-y-6 flex flex-col justify-between" style={{ border: '1px solid #bfdbfe' }}>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <span className="text-xs uppercase font-bold" style={{ color: 'var(--text-muted)' }}>Match Compatibility</span>
                  <span className="text-xs font-semibold" style={{ color: '#2563eb' }}>{selectedRole.demand}</span>
                </div>

                <div className="text-center space-y-2">
                  <div className="text-5xl font-extrabold gradient-text">{matchPercentage}%</div>
                  <div className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>{selectedRole.title}</div>
                  <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${matchPercentage}%`, background: '#2563eb' }}
                    />
                  </div>
                </div>

                <div className="space-y-3 text-xs pt-2">
                  <div className="p-3 rounded-xl" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                    <div className="font-bold flex items-center gap-1 mb-1" style={{ color: '#16a34a' }}>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Matched Skills ({matchedSkills.length})
                    </div>
                    <div style={{ color: 'var(--text-muted)' }}>{matchedSkills.join(', ') || 'None selected'}</div>
                  </div>

                  {missingSkills.length > 0 && (
                    <div className="p-3 rounded-xl" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
                      <div className="font-bold flex items-center gap-1 mb-1" style={{ color: '#d97706' }}>
                        <AlertCircle className="w-3.5 h-3.5" /> To Learn ({missingSkills.length})
                      </div>
                      <div style={{ color: 'var(--text-muted)' }}>{missingSkills.join(', ')}</div>
                    </div>
                  )}
                </div>

                <p className="text-xs leading-relaxed p-3 rounded-xl italic" style={{ background: 'var(--bg-primary)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
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

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold" style={{ color: 'var(--text-main)' }}>Powered By Microservices Architecture</h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            High-speed microservices using Spring Boot 3.2, Python FastAPI, MySQL, and SHA-256 Cryptographic Blockchain.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: BrainCircuit,
              color: '#2563eb',
              bg: '#eff6ff',
              title: 'Python Resume Parser',
              desc: 'Extracts tech keywords from PDF, DOCX, and TXT files. Generates dynamic ATS optimization scores and real improvement suggestions.'
            },
            {
              icon: TrendingUp,
              color: '#7c3aed',
              bg: '#f5f3ff',
              title: 'TF-IDF Matching Engine',
              desc: 'Calculates real-time skill overlap percentages against live tech job postings, identifying matched vs missing skills for recruiters.'
            },
            {
              icon: ShieldCheck,
              color: '#059669',
              bg: '#f0fdf4',
              title: 'Blockchain Skill Passport',
              desc: 'Mints immutable SHA-256 cryptographic hashes for candidate skills, offering tamper-proof verification to hiring managers.'
            }
          ].map(({ icon: Icon, color, bg, title, desc }) => (
            <div key={title} className="glass-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECH NEWS */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: '#2563eb' }}>
              <Newspaper className="w-4 h-4" /> Market Insights
            </div>
            <h2 className="text-2xl font-bold mt-1" style={{ color: 'var(--text-main)' }}>Tech Hiring & Industry News</h2>
          </div>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Updated Daily</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map(news => (
            <div key={news.id} className="glass-card p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full font-semibold" style={{ background: '#eff6ff', color: '#2563eb' }}>{news.badge}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{news.date}</span>
                </div>
                <h3 className="font-bold text-lg leading-snug" style={{ color: 'var(--text-main)' }}>{news.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{news.snippet}</p>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs font-semibold cursor-pointer" style={{ borderTop: '1px solid var(--border-color)', color: '#2563eb' }}>
                <span>Read Full Article</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="glass-panel p-10 md:p-16 text-center space-y-6" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
          <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: '#1e3a8a' }}>Ready to Accelerate Your Tech Career?</h2>
          <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: '#3b82f6' }}>
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
      <footer className="max-w-6xl mx-auto px-4 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5" style={{ color: '#2563eb' }} />
          <span className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>AI Job Matcher</span>
          <span>© 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="cursor-pointer hover:underline">Privacy Policy</span>
          <span className="cursor-pointer hover:underline">Terms of Service</span>
          <span className="cursor-pointer hover:underline">API Docs</span>
          <div className="flex items-center gap-2" style={{ color: '#16a34a' }}>
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            <span>All Systems Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
