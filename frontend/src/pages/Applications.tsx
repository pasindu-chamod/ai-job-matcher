import { useEffect, useState } from 'react';
import { applicationService } from '../services/api';

const Applications = () => {
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    applicationService.getAll().then(setApps).catch(() => {});
  }, []);

  const statuses = ['applied', 'interview', 'offer', 'rejected'];
  const colors: Record<string, string> = {
    applied: 'bg-blue-100 text-blue-800',
    interview: 'bg-yellow-100 text-yellow-800',
    offer: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Applications</h1>
      <div className="grid grid-cols-4 gap-4">
        {statuses.map((status) => (
          <div key={status} className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold capitalize mb-3">{status} ({apps.filter(a => a.status === status).length})</h2>
            <div className="space-y-2">
              {apps.filter(a => a.status === status).map((app) => (
                <div key={app.id} className={`p-3 rounded text-sm ${colors[status]}`}>
                  <p className="font-medium">Job #{app.jobId?.slice(0, 8)}</p>
                  <p className="text-xs mt-1">{new Date(app.appliedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;