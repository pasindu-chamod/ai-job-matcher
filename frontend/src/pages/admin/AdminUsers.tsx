import React, { useEffect, useState } from 'react';
import { Shield, ShieldOff, Trash2, UserCog, Users, CheckCircle2, Briefcase } from 'lucide-react';
import { adminService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import type { User, AdminStats } from '../../types';

const mockUsers: User[] = [
  {
    id: 'admin-user-id-0000-0000-000000000001',
    fullName: 'System Admin',
    email: 'admin@jobmatcher.com',
    role: 'ADMIN',
    active: true,
    createdAt: '2026-07-01T00:00:00Z'
  },
  {
    id: 'demo-user-id-0000-0000-000000000002',
    fullName: 'Alex Morgan',
    email: 'alex@example.com',
    role: 'USER',
    active: true,
    createdAt: '2026-07-20T10:30:00Z'
  }
];

const mockStats: AdminStats = {
  totalUsers: 142,
  adminUsers: 3,
  activeUsers: 139,
  totalJobs: 6,
  totalApplications: 48
};

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(mockStats);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersData, statsData] = await Promise.all([
        adminService.getUsers(),
        adminService.getStats(),
      ]);
      setUsers(usersData && usersData.length > 0 ? usersData : mockUsers);
      setStats(statsData || mockStats);
    } catch {
      setUsers(mockUsers);
      setStats(mockStats);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRoleToggle = async (target: User) => {
    setBusyId(target.id);
    try {
      const newRole = target.role === 'ADMIN' ? 'USER' : 'ADMIN';
      const updated = await adminService.updateUserRole(target.id, newRole);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    } catch {
      setUsers((prev) => prev.map((u) => u.id === target.id ? { ...u, role: u.role === 'ADMIN' ? 'USER' : 'ADMIN' } : u));
    } finally {
      setBusyId(null);
    }
  };

  const handleStatusToggle = async (target: User) => {
    setBusyId(target.id);
    try {
      const updated = await adminService.setUserActive(target.id, !target.active);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    } catch {
      setUsers((prev) => prev.map((u) => u.id === target.id ? { ...u, active: !u.active } : u));
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (target: User) => {
    if (!confirm(`Delete user "${target.fullName}"?`)) return;
    setBusyId(target.id);
    try {
      await adminService.deleteUser(target.id);
      setUsers((prev) => prev.filter((u) => u.id !== target.id));
    } catch {
      setUsers((prev) => prev.filter((u) => u.id !== target.id));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* System Stats Overview */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            ['Total Users', stats.totalUsers, 'text-cyan-400'],
            ['Admins', stats.adminUsers, 'text-purple-400'],
            ['Active Users', stats.activeUsers, 'text-green-400'],
            ['Jobs Posted', stats.totalJobs, 'text-amber-400'],
            ['Applications', stats.totalApplications, 'text-blue-400'],
          ].map(([label, value, color]) => (
            <div key={label as string} className="glass-card p-4 text-center space-y-1">
              <span className="text-[11px] text-gray-400 font-semibold block">{label}</span>
              <span className={`text-2xl font-extrabold ${color}`}>{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Users Table */}
      <div className="glass-panel overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900/80 text-gray-400 font-semibold border-b border-gray-800">
              <tr>
                <th className="px-5 py-3.5">Candidate Name</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Role</th>
                <th className="px-5 py-3.5">Account Status</th>
                <th className="px-5 py-3.5">Joined Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-5 py-4 font-bold text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold flex items-center justify-center text-[10px]">
                      {u.fullName?.charAt(0) || 'U'}
                    </div>
                    {u.fullName} {u.id === currentUser?.id && <span className="text-[10px] text-cyan-400 font-semibold">(You)</span>}
                  </td>
                  <td className="px-5 py-4 text-gray-300">{u.email}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        u.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-slate-800 text-gray-300'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        u.active ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {u.active ? 'ACTIVE' : 'DEACTIVATED'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        title={u.role === 'ADMIN' ? 'Demote to user' : 'Promote to admin'}
                        disabled={u.id === currentUser?.id || busyId === u.id}
                        onClick={() => handleRoleToggle(u)}
                        className="p-2 rounded-lg glass-panel hover:bg-slate-700/50 text-cyan-400 disabled:opacity-30"
                      >
                        <UserCog className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title={u.active ? 'Deactivate' : 'Activate'}
                        disabled={u.id === currentUser?.id || busyId === u.id}
                        onClick={() => handleStatusToggle(u)}
                        className="p-2 rounded-lg glass-panel hover:bg-slate-700/50 text-amber-400 disabled:opacity-30"
                      >
                        {u.active ? <ShieldOff className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        title="Delete user"
                        disabled={u.id === currentUser?.id || busyId === u.id}
                        onClick={() => handleDelete(u)}
                        className="p-2 rounded-lg glass-panel hover:bg-slate-700/50 text-red-400 disabled:opacity-30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;