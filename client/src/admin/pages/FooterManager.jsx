import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const FooterManager = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const { data } = await api.get('/admin/footer');
        setDescription(data.description);
      } catch (err) {
        setError('Failed to load footer description');
      } finally {
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const { data } = await api.put('/admin/footer', { description });
      setDescription(data.description);
      setSuccess('Footer description updated successfully.');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Footer</h1>
      <p className="text-gray-500 mb-6">
        Edit the description shown under the logo in the site footer.
      </p>

      {error && <p className="bg-red-100 text-red-700 text-sm rounded p-2 mb-4">{error}</p>}
      {success && <p className="bg-green-100 text-green-700 text-sm rounded p-2 mb-4">{success}</p>}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 max-w-2xl">
          <label className="block text-sm font-medium mb-2">Footer Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <p className="text-xs text-gray-400 mt-1 mb-4">
            {description.length} characters
          </p>

          <button
            type="submit"
            disabled={saving}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}
    </div>
  );
};

export default FooterManager;