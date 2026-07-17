import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Briefcase } from 'lucide-react';
import { jobService } from '../services/api';
import { Job, JobMatch } from '../types';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const stateMatch = (location.state as { match?: JobMatch } | null)?.match;

  const [job, setJob] = useState<Job | null>(stateMatch ? stateMatch.job : null);
  const [loading, setLoading] = useState(!stateMatch);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (stateMatch || !id) return;
    jobService.getJobById(id)
      .then(setJob)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id, stateMatch]);

  if (loading) return <p className="text-center py-12">Loading job...</p>;

  if (notFound || !job) {
    return (
      <div className="space-y-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-blue-600 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <p className="text-gray-600">Job not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-blue-600 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to matches
      </button>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-600 flex items-center gap-1 mt-1">
              <Briefcase className="w-4 h-4" /> {job.company}
            </p>
          </div>
          {stateMatch && (
            <span className={`text-2xl font-bold ${stateMatch.matchScore >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
              {stateMatch.matchScore}%
            </span>
          )}
        </div>

        <div className="flex gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
          <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{job.salary}</span>
          <span>{job.type}</span>
        </div>

        <div>
          <h2 className="font-semibold mb-1">Description</h2>
          <p className="text-gray-700">{job.description}</p>
        </div>

        <div>
          <h2 className="font-semibold mb-1">Required Skills</h2>
          <div className="flex flex-wrap gap-1">
            {job.requiredSkills.map((s, i) => (
              <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{s}</span>
            ))}
          </div>
        </div>

        {stateMatch && (
          <>
            <div>
              <h2 className="font-semibold mb-1">You have</h2>
              <div className="flex flex-wrap gap-1">
                {stateMatch.matchedSkills.map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">✓ {s}</span>
                ))}
              </div>
            </div>
            {stateMatch.missingSkills.length > 0 && (
              <div>
                <h2 className="font-semibold mb-1">Learn these</h2>
                <div className="flex flex-wrap gap-1">
                  {stateMatch.missingSkills.map((s, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{s}</span>
                  ))}
                </div>
              </div>
            )}
            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">{stateMatch.reasoning}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default JobDetail;