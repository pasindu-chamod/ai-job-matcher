import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, Upload, Target, FileCheck, Award, LogIn, LogOut, ShieldCheck, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const links = [
    { path: '/', label: 'Dashboard', icon: Target },
    { path: '/upload', label: 'Upload', icon: Upload },
    { path: '/matches', label: 'Matches', icon: FileCheck },
    { path: '/applications', label: 'Applications', icon: Briefcase },
    { path: '/verify', label: 'Verify', icon: Award },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
        <Link to="/" className="flex items-center gap-2">
          <Briefcase className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold">AI Job Matcher</span>
        </Link>

        <div className="flex items-center gap-6">
          {isAuthenticated &&
            links.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1 text-sm font-medium ${
                  location.pathname === path ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}

          {isAdmin && (
            <Link
              to="/admin"
              className={`flex items-center gap-1 text-sm font-medium ${
                location.pathname.startsWith('/admin') ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Admin
            </Link>
          )}

          <div className="flex items-center gap-4 pl-4 border-l">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-500 hidden sm:inline">
                  Hi, {user?.fullName?.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;