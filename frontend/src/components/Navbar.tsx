import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Upload, 
  Target, 
  FileCheck, 
  Award, 
  LogIn, 
  LogOut, 
  ShieldCheck, 
  UserPlus, 
  Sun, 
  Moon, 
  Bell, 
  X, 
  CheckCircle2, 
  BrainCircuit, 
  Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadCount, markAsRead, clearAll } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

  const links = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: Target },
    { path: '/upload', label: 'Upload Resume', icon: Upload },
    { path: '/matches', label: 'AI Matches', icon: FileCheck },
    { path: '/applications', label: 'Applications', icon: Briefcase },
    { path: '/verify', label: 'Skill Passport', icon: Award },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 glass-nav shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
            style={{ background: '#2563eb' }}
          >
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight" style={{ color: '#2563eb' }}>
              AI Job Matcher
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase -mt-1" style={{ color: 'var(--text-muted)' }}>
              Microservices Engine
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1 mr-2">
              {links.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: isActive ? '#eff6ff' : 'transparent',
                      color: isActive ? '#2563eb' : 'var(--text-muted)',
                      border: isActive ? '1px solid #bfdbfe' : '1px solid transparent',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </div>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: location.pathname.startsWith('/admin') ? '#f5f3ff' : 'transparent',
                color: location.pathname.startsWith('/admin') ? '#7c3aed' : 'var(--text-muted)',
                border: location.pathname.startsWith('/admin') ? '1px solid #ddd6fe' : '1px solid transparent',
              }}
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Portal
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl transition"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" style={{ color: '#d97706' }} /> : <Moon className="w-4 h-4" style={{ color: '#7c3aed' }} />}
          </button>

          {/* Notifications Bell */}
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl transition relative"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div
                  className="absolute right-0 mt-3 w-80 md:w-96 glass-panel p-4 shadow-xl z-50 space-y-3"
                  style={{ border: '1px solid var(--border-color)' }}
                >
                  <div className="flex items-center justify-between pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <div className="flex items-center gap-2 font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                      <Bell className="w-4 h-4" style={{ color: '#2563eb' }} />
                      <span>Notifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {notifications.length > 0 && (
                        <button onClick={clearAll} className="text-[11px] hover:text-red-500" style={{ color: 'var(--text-muted)' }}>
                          Clear All
                        </button>
                      )}
                      <button onClick={() => setShowNotifications(false)} style={{ color: 'var(--text-muted)' }}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-center text-xs py-6" style={{ color: 'var(--text-muted)' }}>No new notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markAsRead(n.id)}
                          className="p-3 rounded-xl text-xs space-y-1 cursor-pointer transition"
                          style={{
                            background: n.read ? 'var(--bg-primary)' : '#eff6ff',
                            border: n.read ? '1px solid var(--border-color)' : '1px solid #bfdbfe',
                            borderLeft: n.read ? undefined : '4px solid #2563eb',
                          }}
                        >
                          <div className="flex items-center justify-between font-semibold">
                            <span style={{ color: '#2563eb' }}>{n.title}</span>
                            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{n.timestamp}</span>
                          </div>
                          <p style={{ color: 'var(--text-muted)' }}>{n.message}</p>
                          {n.newStatus && (
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold mt-1" style={{ background: '#eff6ff', color: '#2563eb' }}>
                              Status: {n.newStatus}
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Auth Section */}
          <div className="flex items-center gap-3 pl-2 sm:pl-3" style={{ borderLeft: '1px solid var(--border-color)' }}>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full font-bold text-white text-xs flex items-center justify-center shadow-sm"
                  style={{ background: '#2563eb' }}
                >
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl transition"
                  style={{ color: 'var(--text-muted)' }}
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 hover:text-red-500" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl transition"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link
                  to="/register"
                  className="gradient-btn flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-xl"
                >
                  <UserPlus className="w-4 h-4" /> Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;