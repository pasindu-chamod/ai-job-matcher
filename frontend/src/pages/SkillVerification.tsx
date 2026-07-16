import React, { useState } from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { blockchainService } from '../services/api';
import { SkillVerification as SkillVerificationType } from '../types';

const SkillVerification: React.FC = () => {
  const [skill, setSkill] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verification, setVerification] = useState<SkillVerificationType | null>(null);

  const handleVerify = async () => {
    if (!skill) return;
    setVerifying(true);
    try {
      const result = await blockchainService.verifySkill('user123', skill);
      setVerification(result);
    } catch (error) {
      console.error(error);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-purple-600" />
        <h1 className="text-3xl font-bold">Skill Verification</h1>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Blockchain-Verified Skills</h2>
        <p className="text-gray-700 mb-6">Verify your skills on the blockchain.</p>
        <div className="flex gap-4">
          <input
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="e.g., React, Python"
            className="flex-1 px-4 py-3 border rounded-lg"
          />
          <button
            onClick={handleVerify}
            disabled={verifying || !skill}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {verifying ? 'Verifying...' : 'Verify Skill'}
          </button>
        </div>
      </div>
      
      {verification && (
        <div className="bg-white p-8 rounded-lg shadow border-2 border-green-200">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <div>
              <h3 className="text-2xl font-bold">Verified!</h3>
              <p className="text-gray-600">Recorded on blockchain</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Skill</p>
              <p className="text-lg font-semibold">{verification.skill}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-600">Blockchain Hash</p>
              <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all">
                {verification.blockchainHash}
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-600">Issued At</p>
              <p className="text-lg">{new Date(verification.issuedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Why Blockchain?</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">✓</span>
            <span><strong>Permanent:</strong> Skills are recorded forever</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">✓</span>
            <span><strong>Tamper-proof:</strong> Cannot be faked</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">✓</span>
            <span><strong>Verifiable:</strong> Employers can check instantly</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SkillVerification;