import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaBriefcaseMedical, FaPlus, FaSpinner, FaSearch } from 'react-icons/fa';
import Loading from '../../../components/Loading';
import { useSelector } from 'react-redux';

interface Job {
  _id: string;
  title: string;
  type: string;
  location: string;
  department?: string;
  description?: string;
  requirements?: string[];
  postedAt?: string;
  isOpen?: boolean;
}

const ManageHire = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    type: 'Full-Time',
    location: '',
    department: '',
    description: '',
    requirements: '' 
  });

  const token = useSelector((state: any) => state.user.token);
  const role = useSelector((state: any) => state.user.role);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs`);
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error('Error fetching jobs', err);
      toast.error('Failed to load job positions');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        title: form.title,
        type: form.type,
        location: form.location,
        department: form.department,
        description: form.description,
        requirements: form.requirements ? form.requirements.split(',').map(s => s.trim()).filter(Boolean) : []
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/api/jobs`, payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });

      toast.success('Job created');
      setIsCreateOpen(false);
      setForm({ title: '', type: 'Full-Time', location: '', department: '', description: '', requirements: '' });
      fetchJobs();
    } catch (err) {
      console.error('Error creating job', err);
      toast.error('Failed to create job (check permissions)');
    } finally {
      setActionLoading(false);
    }
  };

  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (j.department || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden font-sans transition-colors duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2">
            <FaBriefcaseMedical className="text-sky-600 dark:text-sky-500" />
            Job Opportunities
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">View and manage job positions posted on the site.</p>
        </div>

          <div className="flex items-center gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search roles, location or department..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all w-full md:w-72"
            />
          </div>
            {role === 'admin' && (
              <button
                onClick={() => setIsCreateOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors font-medium text-sm"
              >
                <FaPlus /> Create
              </button>
            )}
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="py-8"><Loading /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No open positions found.</div>
        ) : (
          <div className="space-y-4">
            {filtered.map(job => (
              <div key={job._id} className="border p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-gray-800 dark:text-slate-100">{job.title}</div>
                  <div className="text-sm text-gray-500">{job.department} • {job.location} • {job.type}</div>
                  {job.description && <div className="mt-2 text-sm text-gray-600 line-clamp-3">{job.description}</div>}
                </div>
                <div className="text-sm text-gray-500 text-right">
                  <div>Posted: {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : '-'}</div>
                  <div className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${job.isOpen ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{job.isOpen ? 'Open' : 'Closed'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Job Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100 mb-3">Create Job Position</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800">
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Contract</option>
                    <option>Temporary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Location</label>
                  <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Department</label>
                  <input value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800" rows={4} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Requirements (comma separated)</label>
                <input value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800" />
              </div>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsCreateOpen(false)} disabled={actionLoading} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" disabled={actionLoading} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg flex items-center gap-2">
                  {actionLoading && <FaSpinner className="animate-spin" />}
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageHire;
