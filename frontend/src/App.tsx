import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ResumeUpload from './pages/ResumeUpload';
import JobMatches from './pages/JobMatches';
import JobDetail from './pages/JobDetail';
import Applications from './pages/Applications';
import SkillVerification from './pages/SkillVerification';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminJobs from './pages/admin/AdminJobs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-7xl mx-auto py-6 px-4">
            <Routes>
              {/* Public */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs/:id" element={<JobDetail />} />

              {/* Logged-in users */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/upload" element={<ResumeUpload />} />
                <Route path="/matches" element={<JobMatches />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/verify" element={<SkillVerification />} />
              </Route>

              {/* Admins only */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />}>
                  <Route index element={<AdminUsers />} />
                  <Route path="jobs" element={<AdminJobs />} />
                </Route>
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;