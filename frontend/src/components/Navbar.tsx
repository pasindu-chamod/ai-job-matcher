import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Upload, Target, FileCheck, Award } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Dashboard', icon: Target },
    { path: '/upload', label: 'Upload', icon: Upload },
    { path: '/matches', label: 'Matches', icon: FileCheck },
    { path: '/applications', label: 'Applications', icon: Briefcase },
    { path: '/verify', label: 'Verify', icon: Award },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
        <div className="flex items-center gap-2">
          <Briefcase className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold">AI Job Matcher</span>
        </div>
        <div className="flex gap-6">
          {links.map(({ path, label, icon: Icon }) => (
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;