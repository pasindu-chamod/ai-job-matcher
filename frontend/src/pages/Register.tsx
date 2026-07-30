import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Loader2, User, Mail, Lock, BrainCircuit } from 'lucide-react';
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

const Register = () => {
  const { register, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError('');

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    try {
      await register(fullName, email, password);
      navigate('/dashboard', { replace: true });
    } catch {
      // Handled in context
    }
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
          <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-main)' }}>Create Account</h1>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Join AI Job Matcher & verify your skill passport</p>
        </div>

        {(error || localError) && (
          <div className="text-xs px-4 py-3 rounded-xl" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
            {localError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label style={labelStyle}>Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={inputStyle}
                placeholder="Alex Morgan"
              />
            </div>
          </div>

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

          <div className="space-y-1">
            <label style={labelStyle}>Confirm Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3" style={{ color: 'var(--text-muted)' }} />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
            {loading ? 'Creating Profile...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
          Already registered?{' '}
          <Link to="/login" className="font-bold hover:underline" style={{ color: '#2563eb' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;