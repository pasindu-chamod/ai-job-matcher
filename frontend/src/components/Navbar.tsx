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
    <nav className="sticky top-0 z-50 glass-nav shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight gradient-text">
              AI Job Matcher
            </span>
            <span className="text-[10px] text-cyan-400 font-semibold tracking-wider uppercase -mt-1">
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
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                    {label}
                  </Link>
                );
              })}
            </div>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                location.pathname.startsWith('/admin')
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-300 hover:text-purple-400 hover:bg-slate-800/40'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              Admin Portal
            </Link>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl glass-panel hover:bg-slate-700/50 text-gray-300 transition"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-500" />}
          </button>

          {/* Real-time Notifications Bell */}
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl glass-panel hover:bg-slate-700/50 text-gray-300 transition relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-cyan-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Drawer */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 md:w-96 glass-panel p-4 shadow-2xl z-50 space-y-3 border border-gray-700/80 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-700/60">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <Bell className="w-4 h-4 text-cyan-400" />
                      <span>Live Notifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {notifications.length > 0 && (
                        <button onClick={clearAll} className="text-[11px] text-gray-400 hover:text-red-400">
                          Clear All
                        </button>
                      )}
                      <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-center text-xs text-gray-400 py-6">No new notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markAsRead(n.id)}
                          className={`p-3 rounded-xl text-xs space-y-1 cursor-pointer transition ${
                            n.read ? 'bg-slate-800/40 opacity-75' : 'bg-slate-800/90 border-l-4 border-cyan-400 shadow-md'
                          }`}
                        >
                          <div className="flex items-center justify-between font-semibold">
                            <span className="text-cyan-300">{n.title}</span>
                            <span className="text-[10px] text-gray-400">{n.timestamp}</span>
                          </div>
                          <p className="text-gray-300 text-[11px] leading-relaxed">{n.message}</p>
                          {n.newStatus && (
                            <span className="inline-block px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-bold mt-1">
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
          <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-gray-700/60">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-white text-xs flex items-center justify-center shadow-md">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-slate-800/40 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-slate-800/40"
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