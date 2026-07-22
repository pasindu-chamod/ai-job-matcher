import { useEffect, useState } from 'react';
import { Shield, ShieldOff, Trash2, UserCog } from 'lucide-react';
import { adminService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import type { User, AdminStats } from '../../types';

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersData, statsData] = await Promise.all([
        adminService.getUsers(),
        adminService.getStats(),
      ]);
      setUsers(usersData);
      setStats(statsData);
    } catch (e) {
      setError('Could not load users. Make sure you are logged in as an admin.');
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
    } catch (e: any) {
      alert(e.response?.data?.message || 'Could not update role.');
    } finally {
      setBusyId(null);
    }
  };

  const handleStatusToggle = async (target: User) => {
    setBusyId(target.id);
    try {
      const updated = await adminService.setUserActive(target.id, !target.active);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    } catch (e: any) {
      alert(e.response?.data?.message || 'Could not update status.');
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (target: User) => {
    if (!confirm(`Delete ${target.fullName}? This cannot be undone.`)) return;
    setBusyId(target.id);
    try {
      await adminService.deleteUser(target.id);
      setUsers((prev) => prev.filter((u) => u.id !== target.id));
    } catch (e: any) {
      alert(e.response?.data?.message || 'Could not delete user.');
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <p className="text-center py-12">Loading users...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin · Users</h1>

      {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            ['Total Users', stats.totalUsers],
            ['Admins', stats.adminUsers],
            ['Active', stats.activeUsers],
            ['Jobs Posted', stats.totalJobs],
            ['Applications', stats.totalApplications],
          ].map(([label, value]) => (
            <div key={label as string} className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-3 font-medium">
                  {u.fullName} {u.id === currentUser?.id && <span className="text-xs text-gray-400">(you)</span>}
                </td>
                <td className="px-4 py-3 text-gray-600">{u.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      u.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {u.active ? 'Active' : 'Deactivated'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      title={u.role === 'ADMIN' ? 'Demote to user' : 'Promote to admin'}
                      disabled={u.id === currentUser?.id || busyId === u.id}
                      onClick={() => handleRoleToggle(u)}
                      className="p-2 rounded hover:bg-gray-100 disabled:opacity-30"
                    >
                      <UserCog className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      title={u.active ? 'Deactivate' : 'Activate'}
                      disabled={u.id === currentUser?.id || busyId === u.id}
                      onClick={() => handleStatusToggle(u)}
                      className="p-2 rounded hover:bg-gray-100 disabled:opacity-30"
                    >
                      {u.active ? (
                        <ShieldOff className="w-4 h-4 text-orange-600" />
                      ) : (
                        <Shield className="w-4 h-4 text-green-600" />
                      )}
                    </button>
                    <button
                      title="Delete user"
                      disabled={u.id === currentUser?.id || busyId === u.id}
                      onClick={() => handleDelete(u)}
                      className="p-2 rounded hover:bg-gray-100 disabled:opacity-30"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;