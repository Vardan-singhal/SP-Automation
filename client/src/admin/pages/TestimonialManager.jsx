import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const emptyForm = { name: '', designation: '', quote: '' };

const StarPicker = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button type="button" key={n} onClick={() => onChange(n)}>
        <i className={`bi ${n <= value ? 'bi-star-fill text-yellow-400' : 'bi-star text-gray-300'} text-xl`} />
      </button>
    ))}
  </div>
);

const TestimonialManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = statusFilter !== 'all' ? { status: statusFilter } : {};
      const { data } = await api.get('/admin/testimonials', { params });
      setItems(data);
    } catch (err) {
      setError('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [statusFilter]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.quote.trim()) return;
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        const { data } = await api.put(`/admin/testimonials/${editingId}`, form);
        setItems((prev) => prev.map((it) => (it._id === editingId ? data : it)));
      } else {
        // Admin-created testimonials are auto-approved
        const { data } = await api.post('/admin/testimonials', form);
        if (statusFilter === 'all' || statusFilter === 'approved') {
          setItems((prev) => [...prev, data]);
        }
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, designation: item.designation, quote: item.quote});
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.delete(`/admin/testimonials/${id}`);
      setItems((prev) => prev.filter((it) => it._id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.put(`/admin/testimonials/${id}`, { status });
      if (statusFilter === 'all') {
        setItems((prev) => prev.map((it) => (it._id === id ? data : it)));
      } else {
        setItems((prev) => prev.filter((it) => it._id !== id));
      }
    } catch (err) {
      setError('Update failed');
    }
  };

  const toggleActive = async (item) => {
    try {
      const { data } = await api.put(`/admin/testimonials/${item._id}`, { isActive: !item.isActive });
      setItems((prev) => prev.map((it) => (it._id === item._id ? data : it)));
    } catch (err) {
      setError('Update failed');
    }
  };

  const move = async (index, direction) => {
    if (statusFilter !== 'approved') return; // reordering only makes sense within approved list
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;

    const reordered = [...items];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    setItems(reordered);

    try {
      await api.put('/admin/testimonials/reorder', {
        items: reordered.map((it, idx) => ({ id: it._id, order: idx })),
      });
    } catch (err) {
      setError('Reorder failed');
      fetchItems();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Testimonials</h1>
      <p className="text-gray-500 mb-6">Review client submissions, or add testimonials directly.</p>

      {error && <p className="bg-red-100 text-red-700 text-sm rounded p-2 mb-4">{error}</p>}

      {/* Add / Edit form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Designation / Location</label>
          <input name="designation" value={form.designation} onChange={handleChange} placeholder="e.g. Noida, India" className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Review</label>
          <textarea name="quote" value={form.quote} onChange={handleChange} rows={3} className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <div className="flex items-end gap-3">
          <button type="submit" disabled={saving} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium disabled:opacity-60">
            {saving ? 'Saving...' : editingId ? 'Update Testimonial' : 'Add Testimonial (auto-approved)'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-5 py-2 rounded-lg border">Cancel</button>
          )}
        </div>
      </form>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-4">
        {['pending', 'approved', 'rejected', 'all'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${
              statusFilter === s ? 'bg-red-600 text-white' : 'bg-white border text-gray-600'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-gray-500">No {statusFilter !== 'all' ? statusFilter : ''} testimonials.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                {statusFilter === 'approved' && <th className="p-3">Order</th>}
                <th className="p-3">Name</th>
                <th className="p-3">Review</th>
                <th className="p-3">Source</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item._id} className="border-t align-top">
                  {statusFilter === 'approved' && (
                    <td className="p-3">
                      <div className="flex flex-col gap-1">
                        <button onClick={() => move(idx, -1)} disabled={idx === 0} className="disabled:opacity-30">
                          <i className="bi bi-caret-up-fill" />
                        </button>
                        <button onClick={() => move(idx, 1)} disabled={idx === items.length - 1} className="disabled:opacity-30">
                          <i className="bi bi-caret-down-fill" />
                        </button>
                      </div>
                    </td>
                  )}
                  <td className="p-3">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-gray-500 text-xs">{item.designation}</div>
                  </td>
                  <td className="p-3 max-w-sm text-gray-600">{item.quote}</td>
                  <td className="p-3 capitalize text-gray-500">{item.source}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[item.status]}`}>
                      {item.status}
                    </span>
                    {item.status === 'approved' && (
                      <button
                        onClick={() => toggleActive(item)}
                        className={`block mt-1 px-2 py-0.5 rounded-full text-xs ${item.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}
                      >
                        {item.isActive ? 'Visible' : 'Hidden'}
                      </button>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-2 whitespace-nowrap">
                    {item.status !== 'approved' && (
                      <button onClick={() => updateStatus(item._id, 'approved')} className="text-green-600 hover:underline">Approve</button>
                    )}
                    {item.status !== 'rejected' && (
                      <button onClick={() => updateStatus(item._id, 'rejected')} className="text-orange-600 hover:underline">Reject</button>
                    )}
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TestimonialManager;