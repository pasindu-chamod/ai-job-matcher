import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MapPin, DollarSign } from 'lucide-react';
import { matchService } from '../services/api';
import { JobMatch } from '../types';

const JobMatches = () => {
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    matchService.getMatches()
      .then(setMatches)
      .catch(() => setMatches([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-12">Loading matches...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Job Matches</h1>
      <p className="text-gray-600">Found {matches.length} matches</p>

      <div className="space-y-4">
        {matches.map((match, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/jobs/${match.job.id}`, { state: { match } })}
            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-md hover:ring-1 hover:ring-blue-200 transition"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-bold">{match.job.title}</h3>
                <p className="text-gray-600">{match.job.company}</p>
                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{match.job.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{match.job.salary}</span>
                </div>
              </div>
              <span className={`text-2xl font-bold ${match.matchScore >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                {match.matchScore}%
              </span>
            </div>

            <div className="mb-3">
              <p className="text-sm font-medium mb-1">You have:</p>
              <div className="flex flex-wrap gap-1">
                {match.matchedSkills.map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">✓ {s}</span>
                ))}
              </div>
            </div>

            {match.missingSkills.length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium mb-1">Learn these:</p>
                <div className="flex flex-wrap gap-1">
                  {match.missingSkills.map((s, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{s}</span>
                  ))}
                </div>
              </div>
            )}

            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">{match.reasoning}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobMatches;