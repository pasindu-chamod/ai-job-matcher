import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ResumeUpload from './pages/ResumeUpload';
import JobMatches from './pages/JobMatches';
import Applications from './pages/Applications';
import SkillVerification from './pages/SkillVerification';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<ResumeUpload />} />
            <Route path="/matches" element={<JobMatches />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/verify" element={<SkillVerification />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;