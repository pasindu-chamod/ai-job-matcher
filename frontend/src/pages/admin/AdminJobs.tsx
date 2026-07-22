import { useEffect, useState, FormEvent } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
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
      setJobs(await adminService.getJobs());
    } catch {
      // handled by empty state below
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
      alert('Could not save job. Please check the fields and try again.');
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
      alert('Could not delete job.');
    }
  };

  if (loading) return <p className="text-center py-12">Loading jobs...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin · Jobs</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> New Job
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="px-4 py-3 font-medium">{job.title}</td>
                <td className="px-4 py-3 text-gray-600">{job.company}</td>
                <td className="px-4 py-3 text-gray-600">{job.location}</td>
                <td className="px-4 py-3 text-gray-600">{job.type}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(job)} className="p-2 rounded hover:bg-gray-100">
                      <Pencil className="w-4 h-4 text-blue-600" />
                    </button>
                    <button onClick={() => handleDelete(job)} className="p-2 rounded hover:bg-gray-100">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {jobs.length === 0 && <p className="text-center text-gray-500 py-8">No jobs posted yet.</p>}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{editing ? 'Edit Job' : 'New Job'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                placeholder="Job title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                required
                placeholder="Company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  placeholder="Salary"
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
              <input
                placeholder="Required skills (comma separated)"
                value={form.requiredSkills}
                onChange={(e) => setForm({ ...form, requiredSkills: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />

              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Job'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;