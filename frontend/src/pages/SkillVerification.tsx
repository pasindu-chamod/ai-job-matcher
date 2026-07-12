import { useState } from 'react';
import { Award, Shield, CheckCircle } from 'lucide-react';
import { blockchainService } from '../services/api';

const SkillVerification = () => {
  const [skill, setSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = async () => {
    if (!skill) return;
    setLoading(true);
    try {
      const data = await blockchainService.verify(skill);
      setResult(data);
    } catch (e) {
      alert('Verification failed. Make sure backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-purple-600" />
        <h1 className="text-3xl font-bold">Skill Verification</h1>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg">
        <p className="text-gray-700 mb-6">Verify your skills on blockchain - permanent, tamper-proof credentials!</p>
        <div className="flex gap-4">
          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="Enter skill (e.g., React, Python)"
            className="flex-1 px-4 py-3 border rounded-lg"
          />
          <button
            onClick={handleVerify}
            disabled={loading || !skill}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white p-8 rounded-lg shadow border-2 border-green-200">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <div>
              <h3 className="text-2xl font-bold">Skill Verified!</h3>
              <p className="text-gray-600">Recorded on blockchain</p>
            </div>
          </div>
          <div className="space-y-3">
            <p><strong>Skill:</strong> {result.skill}</p>
            <p><strong>Hash:</strong> <code className="text-xs bg-gray-100 p-1 rounded break-all">{result.blockchainHash}</code></p>
            <p><strong>Issued:</strong> {new Date(result.issuedAt).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillVerification;