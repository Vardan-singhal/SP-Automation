import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
const emptyForm = { name: '', role: '', description: '', isActive: true };

const TeamManager = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/team');
      setMembers(data);
    } catch (err) {
      setError('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setPreview('');
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim()) return;

    setSaving(true);
    setError('');

    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('role', form.role);
    fd.append('description', form.description);
    fd.append('isActive', form.isActive);
    if (imageFile) fd.append('image', imageFile);

    try {
      if (editingId) {
        const { data } = await api.put(`/admin/team/${editingId}`, fd);
        setMembers((prev) => prev.map((m) => (m._id === editingId ? data : m)));
      } else {
        const { data } = await api.post('/admin/team', fd);
        setMembers((prev) => [...prev, data]);
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (member) => {
    setForm({
      name: member.name,
      role: member.role,
      description: member.description || '',
      isActive: member.isActive,
    });
    setImageFile(null);
    setPreview(member.image ? `${SERVER_URL}${member.image}` : '');
    setEditingId(member._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this team member?')) return;
    try {
      await api.delete(`/admin/team/${id}`);
      setMembers((prev) => prev.filter((m) => m._id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const toggleActive = async (member) => {
    try {
      const fd = new FormData();
      fd.append('isActive', !member.isActive);
      const { data } = await api.put(`/admin/team/${member._id}`, fd);
      setMembers((prev) => prev.map((m) => (m._id === member._id ? data : m)));
    } catch (err) {
      setError('Update failed');
    }
  };

  const move = async (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= members.length) return;

    const reordered = [...members];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    setMembers(reordered);

    try {
      await api.put('/admin/team/reorder', {
        items: reordered.map((m, idx) => ({ id: m._id, order: idx })),
      });
    } catch (err) {
      setError('Reorder failed');
      fetchMembers();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">About Section — Our Team</h1>
      <p className="text-gray-500 mb-6">Add, edit, reorder or hide the team members shown on the About page.</p>

      {error && <p className="bg-red-100 text-red-700 text-sm rounded p-2 mb-4">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role / Designation</label>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Bio / Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Photo</label>
          <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} />
          {preview && (
            <img src={preview} alt="preview" className="w-20 h-20 rounded-full object-cover mt-2 border" />
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
            id="isActive"
          />
          <label htmlFor="isActive" className="text-sm">Active (visible on site)</label>
        </div>

        <div className="flex items-end gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium disabled:opacity-60"
          >
            {saving ? 'Saving...' : editingId ? 'Update Member' : 'Add Member'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-5 py-2 rounded-lg border">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : members.length === 0 ? (
          <p className="p-6 text-gray-500">No team members yet — add one above.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Photo</th>
                <th className="p-3">Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, idx) => (
                <tr key={member._id} className="border-t">
                  <td className="p-3">
                    <div className="flex flex-col gap-1">
                      <button onClick={() => move(idx, -1)} disabled={idx === 0} className="disabled:opacity-30">
                        <i className="bi bi-caret-up-fill" />
                      </button>
                      <button onClick={() => move(idx, 1)} disabled={idx === members.length - 1} className="disabled:opacity-30">
                        <i className="bi bi-caret-down-fill" />
                      </button>
                    </div>
                  </td>
                  <td className="p-3">
                    {member.image ? (
                      <img src={`${SERVER_URL}${member.image}`} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200" />
                    )}
                  </td>
                  <td className="p-3 font-medium">{member.name}</td>
                  <td className="p-3 text-gray-500">{member.role}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleActive(member)}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {member.isActive ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td className="p-3 text-right space-x-3">
                    <button onClick={() => handleEdit(member)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(member._id)} className="text-red-600 hover:underline">Delete</button>
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

export default TeamManager;