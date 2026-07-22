import { NavLink, Outlet } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const AdminDashboard = () => {
  const tabs = [
    { path: '/admin', label: 'Users', end: true },
    { path: '/admin/jobs', label: 'Jobs' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-8 h-8 text-purple-600" />
        <h1 className="text-3xl font-bold">Admin</h1>
      </div>

      <div className="flex gap-1 border-b">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.end}
            className={({ isActive }) =>
              `px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                isActive
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default AdminDashboard;