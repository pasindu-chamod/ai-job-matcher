import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ShieldCheck, Users, Briefcase, Sparkles } from 'lucide-react';

const AdminDashboard = () => {
  const tabs = [
    { path: '/admin', label: 'Candidate Users', icon: Users, end: true },
    { path: '/admin/jobs', label: 'Job Postings', icon: Briefcase },
  ];

  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <div className="glass-panel p-8 relative overflow-hidden flex items-center justify-between border-l-4 border-purple-500">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> System Administration
          </div>
          <h1 className="text-3xl font-extrabold flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-purple-400" /> Admin Control Panel
          </h1>
          <p className="text-sm text-gray-400">
            Manage users, job positions, database schemas, and microservice status.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-gray-800 pb-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.end}
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'glass-panel text-gray-400 hover:text-white'
              }`
            }
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default AdminDashboard;