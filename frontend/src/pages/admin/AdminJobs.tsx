import React, { useEffect, useState, FormEvent } from 'react';
import { Plus, Pencil, Trash2, X, Briefcase, Building2, MapPin, DollarSign } from 'lucide-react';
import { adminService } from '../../services/api';
import type { Job } from '../../types';

const emptyForm = {
  title: '',
  company: '',
  description: '',
  location: '',
  salary: '',
  type: 'Full-time',
  requiredSkills: '',
};

const mockAdminJobs: Job[] = [
  {
    id: 'j1',
    title: 'Senior Full Stack AI Engineer',
    company: 'TechCorp Innovation Lab',
    description: 'Architect and build scalable web applications integrated with OpenAI & LLM APIs.',
    location: 'San Francisco, CA',
    salary: '$140,000 - $185,000',
    type: 'Full-time',
    requiredSkills: ['Python', 'React', 'Java', 'Spring', 'SQL', 'Docker']
  },
  {
    id: 'j2',
    title: 'Lead Frontend Architect',
    company: 'StartupXYZ Tech',
    description: 'Create high-performance user interfaces with React 18, TypeScript, TailwindCSS.',
    location: 'Remote',
    salary: '$110,000 - $150,000',
    type: 'Full-time',
    requiredSkills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS']
  }
];

const AdminJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Job | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const res = await adminService.getJobs();
      setJobs(res && res.length > 0 ? res : mockAdminJobs);
    } catch {
      setJobs(mockAdminJobs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (job: Job) => {
    setEditing(job);
    setForm({
      title: job.title,
      company: job.company,
      description: job.description,
      location: job.location,
      salary: job.salary,
      type: job.type,
      requiredSkills: job.requiredSkills?.join(', ') || '',
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      requiredSkills: form.requiredSkills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };
    try {
      if (editing) {
        const updated = await adminService.updateJob(editing.id, payload);
        setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
      } else {
        const created = await adminService.createJob(payload);
        setJobs((prev) => [created, ...prev]);
      }
      setShowForm(false);
    } catch {
      // Local fallback edit/create
      const dummyId = editing ? editing.id : 'j-' + Date.now();
      const newJobObj: Job = { id: dummyId, ...payload };
      if (editing) {
        setJobs((prev) => prev.map((j) => (j.id === editing.id ? newJobObj : j)));
      } else {
        setJobs((prev) => [newJobObj, ...prev]);
      }
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (job: Job) => {
    if (!confirm(`Delete "${job.title}" at ${job.company}?`)) return;
    try {
      await adminService.deleteJob(job.id);
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
    } catch {
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-purple-400" /> Active Job Listings ({jobs.length})
        </h2>
        <button
          onClick={openCreate}
          className="gradient-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Post New Job
        </button>
      </div>

      <div className="glass-panel overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900/80 text-gray-400 font-semibold border-b border-gray-800">
              <tr>
                <th className="px-5 py-3.5">Position Title</th>
                <th className="px-5 py-3.5">Company</th>
                <th className="px-5 py-3.5">Location</th>
                <th className="px-5 py-3.5">Salary Range</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-5 py-4 font-bold text-cyan-300">{job.title}</td>
                  <td className="px-5 py-4 text-gray-300 font-medium">{job.company}</td>
                  <td className="px-5 py-4 text-gray-400">{job.location}</td>
                  <td className="px-5 py-4 text-green-400 font-semibold">{job.salary}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(job)} className="p-2 rounded-lg glass-panel hover:bg-slate-700/50 text-cyan-400">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(job)} className="p-2 rounded-lg glass-panel hover:bg-slate-700/50 text-red-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-panel p-6 w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto border border-purple-500/30">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h2 className="text-lg font-bold">{editing ? 'Edit Job Posting' : 'Create New Job Posting'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <input
                required
                placeholder="Job Title (e.g. Senior AI Engineer)"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
              <input
                required
                placeholder="Company Name"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
              <textarea
                placeholder="Job Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                rows={3}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Location (e.g. Remote, SF)"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                />
                <input
                  placeholder="Salary Range"
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <input
                placeholder="Required skills (comma separated: Python, React, SQL)"
                value={form.requiredSkills}
                onChange={(e) => setForm({ ...form, requiredSkills: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />

              <button
                type="submit"
                disabled={saving}
                className="w-full gradient-btn py-3 rounded-xl font-bold text-xs"
              >
                {saving ? 'Saving Position...' : editing ? 'Save Changes' : 'Create Job Posting'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;