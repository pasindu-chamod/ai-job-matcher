import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldX, LogIn, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

// 403 Forbidden Page - shown when user tries to access admin area
const ForbiddenPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 px-4">
      <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center animate-pulse-glow">
        <ShieldX className="w-10 h-10 text-red-400" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold text-red-400">403</h1>
        <h2 className="text-xl font-bold">Access Denied</h2>
        <p className="text-sm text-gray-400 max-w-sm mx-auto">
          You do not have permission to access the Admin Control Panel. 
          This area is restricted to administrators only.
        </p>
      </div>
      <div className="flex gap-3 pt-2">
        <Link
          to="/"
          className="gradient-btn px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <Home className="w-4 h-4" /> Go Home
        </Link>
      </div>
    </div>
  );
};

const AdminRoute: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  // Not logged in at all → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but NOT admin → show 403 page (don't expose login page to logged-in users)
  if (!isAdmin) {
    return <ForbiddenPage />;
  }

  // Admin → allow through
  return <Outlet />;
};

export default AdminRoute;