import { useState } from 'react';
import { Upload, Loader2, CheckCircle } from 'lucide-react';
import { resumeService } from '../services/api';

const ResumeUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const data = await resumeService.upload(file);
      setResult(data);
    } catch (e: any) {
      setError('Upload failed. Make sure backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Upload Resume</h1>

      <div className="bg-white p-8 rounded-lg shadow text-center">
        <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />
        {file && <p className="text-sm text-gray-600 mb-4">Selected: {file.name}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 flex items-center gap-2 mx-auto"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {loading ? 'Analyzing...' : 'Upload & Analyze'}
        </button>
      </div>

      {result && (
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <h2 className="text-2xl font-bold">Analysis Complete!</h2>
          </div>

          <div className="mb-6">
            <p className="text-lg font-medium">ATS Score: <span className="text-blue-600 font-bold text-2xl">{result.atsScore}/100</span></p>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${result.atsScore}%` }} />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Skills Found:</h3>
            <div className="flex flex-wrap gap-2">
              {result.skills?.map((s: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{s}</span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-green-700">Strengths:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {result.strengths?.map((s: string, i: number) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-orange-700">Suggestions:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {result.suggestions?.map((s: string, i: number) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;