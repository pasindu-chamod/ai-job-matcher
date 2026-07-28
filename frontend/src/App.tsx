import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
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

const HomeOrDashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Dashboard /> : <LandingPage />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 max-w-7xl w-full mx-auto py-6 px-4">
                <Routes>
                  {/* Public Landing & Auth Routes */}
                  <Route path="/" element={<HomeOrDashboard />} />
                  <Route path="/home" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/jobs/:id" element={<JobDetail />} />

                  {/* Logged-in Candidates */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/upload" element={<ResumeUpload />} />
                    <Route path="/matches" element={<JobMatches />} />
                    <Route path="/applications" element={<Applications />} />
                    <Route path="/verify" element={<SkillVerification />} />
                  </Route>

                  {/* Admins Only */}
                  <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminDashboard />}>
                      <Route index element={<AdminUsers />} />
                      <Route path="jobs" element={<AdminJobs />} />
                    </Route>
                  </Route>

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </Router>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;