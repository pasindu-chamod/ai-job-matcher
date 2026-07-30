import React, { useState, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Loader2, Mail, Lock, BrainCircuit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const inputStyle = {
  width: '100%',
  paddingLeft: '2.5rem',
  paddingRight: '1rem',
  paddingTop: '0.625rem',
  paddingBottom: '0.625rem',
  borderRadius: '0.75rem',
  fontSize: '0.75rem',
  outline: 'none',
  background: 'var(--bg-primary)',
  border: '1px solid var(--border-color)',
  color: 'var(--text-main)',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 600,
  marginBottom: '0.25rem',
  color: 'var(--text-muted)',
};

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
      <div className="glass-panel p-8 md:p-10 space-y-6">
        <div className="text-center space-y-2">
          <div
            className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center"
            style={{ background: '#2563eb' }}
          >
            <BrainCircuit className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-main)' }}>Welcome Back</h1>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Log in to your AI Job Matcher portal</p>
        </div>

        {error && (
          <div className="text-xs px-4 py-3 rounded-xl" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label style={labelStyle}>Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3" style={{ color: 'var(--text-muted)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label style={labelStyle}>Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3" style={{ color: 'var(--text-muted)' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
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

        {/* Demo Shortcuts */}
        <div className="pt-2 space-y-2" style={{ borderTop: '1px solid var(--border-color)' }}>
          <span className="text-[11px] font-semibold block text-center" style={{ color: 'var(--text-muted)' }}>Quick Demo Login:</span>
          <div className="flex gap-2">
            <button
              onClick={fillDemoUser}
              className="flex-1 py-2 rounded-lg text-[11px] font-semibold text-center transition"
              style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb' }}
            >
              Candidate Demo
            </button>
            <button
              onClick={fillDemoAdmin}
              className="flex-1 py-2 rounded-lg text-[11px] font-semibold text-center transition"
              style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', color: '#7c3aed' }}
            >
              Admin Demo
            </button>
          </div>
        </div>

        <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" className="font-bold hover:underline" style={{ color: '#2563eb' }}>
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;