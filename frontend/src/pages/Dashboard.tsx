import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Briefcase, FileCheck, Award } from 'lucide-react';

const Dashboard = () => {
  const data = [
    { month: 'Jan', count: 4 },
    { month: 'Feb', count: 6 },
    { month: 'Mar', count: 9 },
    { month: 'Apr', count: 12 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Applications</p>
            <p className="text-3xl font-bold">12</p>
          </div>
          <Briefcase className="w-10 h-10 text-blue-500" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Interviews</p>
            <p className="text-3xl font-bold">3</p>
          </div>
          <FileCheck className="w-10 h-10 text-green-500" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Match Rate</p>
            <p className="text-3xl font-bold">76%</p>
          </div>
          <TrendingUp className="w-10 h-10 text-purple-500" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Verified Skills</p>
            <p className="text-3xl font-bold">5</p>
          </div>
          <Award className="w-10 h-10 text-yellow-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Applications Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;