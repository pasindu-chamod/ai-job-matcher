import React, { useState, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Loader2, Mail, Lock, BrainCircuit, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      // Handled in context
    }
  };

  const fillDemoUser = () => {
    setEmail('alex@example.com');
    setPassword('User@123');
  };

  const fillDemoAdmin = () => {
    setEmail('admin@jobmatcher.com');
    setPassword('Admin@123');
  };

  return (
    <div className="max-w-md mx-auto my-12">
      <div className="glass-panel p-8 md:p-10 space-y-6 relative overflow-hidden border border-gray-700/80">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <BrainCircuit className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Welcome Back</h1>
          <p className="text-xs text-gray-400">Log in to your AI Job Matcher portal</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-btn py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Autofill Shortcuts */}
        <div className="pt-2 border-t border-gray-800 space-y-2">
          <span className="text-[11px] text-gray-400 font-semibold block text-center">Quick Demo Login:</span>
          <div className="flex gap-2">
            <button
              onClick={fillDemoUser}
              className="flex-1 py-2 glass-panel hover:bg-slate-700/50 text-[11px] font-semibold text-cyan-400 rounded-lg text-center"
            >
              Candidate Demo
            </button>
            <button
              onClick={fillDemoAdmin}
              className="flex-1 py-2 glass-panel hover:bg-slate-700/50 text-[11px] font-semibold text-purple-400 rounded-lg text-center"
            >
              Admin Demo
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-cyan-400 font-bold hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;