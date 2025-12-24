import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ConfirmationModal from '../../../components/ConfirmationModal';

interface FAQ {
  _id: string;
  keywords: string[];
  response: string;
  language: string;
  category: string;
  isActive: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

interface ChatSession {
  _id: string;
  sessionId: string;
  startedAt: string;
  endedAt?: string;
  lastActivity: string;
  userInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  totalMessages: number;
  status: string;
}

const ManageChatbot: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faqs' | 'sessions'>('faqs');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // FAQ Form State
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [faqForm, setFaqForm] = useState({
    keywords: '',
    response: '',
    category: 'general',
    language: 'en',
    priority: 0,
    isActive: true
  });

  // Delete Confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string>('');
  const [deleteType, setDeleteType] = useState<'faq' | 'session'>('faq');

  const token = useSelector((state: any) => state.user.token);
  const role = useSelector((state:any) => state.user.role);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (activeTab === 'faqs') {
      fetchFAQs();
    } else {
      fetchSessions();
    }
  }, [activeTab]);

  const fetchFAQs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_URL}/faqs`, {
        headers: { Authorization: `Bearer ${token}` ,Role:role}
      });
      setFaqs(response.data);
    } catch (err: any) {
      setError('Failed to load FAQs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_URL}/chat-sessions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSessions(response.data);
    } catch (err: any) {
      setError('Failed to load chat sessions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFAQ = async () => {
    setError('');
    setSuccess('');
    
    try {
      const keywords = faqForm.keywords.split(',').map(k => k.trim()).filter(k => k);
      
      if (keywords.length === 0 || !faqForm.response) {
        setError('Keywords and response are required');
        return;
      }

      const payload = {
        keywords,
        response: faqForm.response,
        category: faqForm.category,
        language: faqForm.language,
        priority: Number(faqForm.priority),
        isActive: faqForm.isActive
      };

      if (editingFaq) {
        await axios.put(`${API_URL}/faqs/${editingFaq._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('FAQ updated successfully');
      } else {
        await axios.post(`${API_URL}/faqs`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('FAQ created successfully');
      }

      setShowFaqModal(false);
      resetFaqForm();
      fetchFAQs();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save FAQ');
    }
  };

  const handleEditFAQ = (faq: FAQ) => {
    setEditingFaq(faq);
    setFaqForm({
      keywords: faq.keywords.join(', '),
      response: faq.response,
      category: faq.category,
      language: faq.language,
      priority: faq.priority,
      isActive: faq.isActive
    });
    setShowFaqModal(true);
  };

  const handleDeleteFAQ = async () => {
    try {
      await axios.delete(`${API_URL}/faqs/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('FAQ deleted successfully');
      setShowDeleteModal(false);
      fetchFAQs();
    } catch (err: any) {
      setError('Failed to delete FAQ');
    }
  };

  const handleDeleteSession = async () => {
    try {
      await axios.delete(`${API_URL}/chat-sessions/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Session deleted successfully');
      setShowDeleteModal(false);
      fetchSessions();
    } catch (err: any) {
      setError('Failed to delete session');
    }
  };

  const resetFaqForm = () => {
    setEditingFaq(null);
    setFaqForm({
      keywords: '',
      response: '',
      category: 'general',
      language: 'en',
      priority: 0,
      isActive: true
    });
  };

  const confirmDelete = (id: string, type: 'faq' | 'session') => {
    setDeleteId(id);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Chatbot Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage FAQ responses and view chat sessions
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('faqs')}
          className={`px-6 py-3 font-medium transition-colors border-b-2 ${
            activeTab === 'faqs'
              ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          FAQs ({faqs.length})
        </button>
        <button
          onClick={() => setActiveTab('sessions')}
          className={`px-6 py-3 font-medium transition-colors border-b-2 ${
            activeTab === 'sessions'
              ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Chat Sessions ({sessions.length})
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 rounded-lg">
          {success}
        </div>
      )}

      {/* FAQs Tab */}
      {activeTab === 'faqs' && (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <button
              onClick={() => {
                resetFaqForm();
                setShowFaqModal(true);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add FAQ
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">No FAQs found. Create your first FAQ!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {faqs.map((faq) => (
                <div
                  key={faq._id}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          faq.isActive
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {faq.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400">
                          {faq.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Priority: {faq.priority}
                        </span>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Keywords:</p>
                        <div className="flex flex-wrap gap-2">
                          {faq.keywords.map((keyword, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Response:</p>
                        <p className="text-gray-900 dark:text-white">{faq.response}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEditFAQ(faq)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => confirmDelete(faq._id, 'faq')}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === 'sessions' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Chat Sessions
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">No chat sessions found</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {sessions.map((session) => (
                <div
                  key={session._id}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          session.status === 'active'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : session.status === 'ended'
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        }`}>
                          {session.status}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {session.totalMessages} messages
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Session ID</p>
                          <p className="text-sm font-mono text-gray-900 dark:text-white">{session.sessionId}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Last Activity</p>
                          <p className="text-sm text-gray-900 dark:text-white">
                            {new Date(session.lastActivity).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {session.userInfo && (
                        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">User Information</p>
                          <div className="grid grid-cols-3 gap-3 text-sm">
                            {session.userInfo.name && (
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">Name:</span>{' '}
                                <span className="text-gray-900 dark:text-white">{session.userInfo.name}</span>
                              </div>
                            )}
                            {session.userInfo.email && (
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">Email:</span>{' '}
                                <span className="text-gray-900 dark:text-white">{session.userInfo.email}</span>
                              </div>
                            )}
                            {session.userInfo.phone && (
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">Phone:</span>{' '}
                                <span className="text-gray-900 dark:text-white">{session.userInfo.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => confirmDelete(session._id, 'session')}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors ml-4"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={faqForm.keywords}
                    onChange={(e) => setFaqForm({ ...faqForm, keywords: e.target.value })}
                    placeholder="appointment, book, schedule"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Response
                  </label>
                  <textarea
                    value={faqForm.response}
                    onChange={(e) => setFaqForm({ ...faqForm, response: e.target.value })}
                    placeholder="Enter the bot's response..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={faqForm.category}
                      onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="general">General</option>
                      <option value="appointment">Appointment</option>
                      <option value="departments">Departments</option>
                      <option value="hours">Hours</option>
                      <option value="emergency">Emergency</option>
                      <option value="location">Location</option>
                      <option value="insurance">Insurance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priority
                    </label>
                    <input
                      type="number"
                      value={faqForm.priority}
                      onChange={(e) => setFaqForm({ ...faqForm, priority: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={faqForm.isActive}
                    onChange={(e) => setFaqForm({ ...faqForm, isActive: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Active
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveFAQ}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  {editingFaq ? 'Update' : 'Create'}
                </button>
                <button
                  onClick={() => {
                    setShowFaqModal(false);
                    resetFaqForm();
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteType === 'faq' ? handleDeleteFAQ : handleDeleteSession}
        title={`Delete ${deleteType === 'faq' ? 'FAQ' : 'Session'}`}
        message={`Are you sure you want to delete this ${deleteType}? This action cannot be undone.`}
        confirmText="Delete"
      />
    </div>
  );
};

export default ManageChatbot;
