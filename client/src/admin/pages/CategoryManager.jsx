import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/categories');
      setCategories(data);
    } catch (err) {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setName('');
    setIsActive(true);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    setError('');

    try {
      if (editingId) {
        const { data } = await api.put(`/admin/categories/${editingId}`, { name, isActive });
        setCategories((prev) => prev.map((c) => (c._id === editingId ? data : c)));
      } else {
        const { data } = await api.post('/admin/categories', { name, isActive });
        setCategories((prev) => [...prev, data]);
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setIsActive(category.isActive);
    setEditingId(category._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category? Products in this category will need to be reassigned once Products is built.')) return;
    try {
      await api.delete(`/admin/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c._id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const toggleActive = async (category) => {
    try {
      const { data } = await api.put(`/admin/categories/${category._id}`, { isActive: !category.isActive });
      setCategories((prev) => prev.map((c) => (c._id === category._id ? data : c)));
    } catch (err) {
      setError('Update failed');
    }
  };

  const move = async (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= categories.length) return;

    const reordered = [...categories];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    setCategories(reordered);

    try {
      await api.put('/admin/categories/reorder', {
        items: reordered.map((c, idx) => ({ id: c._id, order: idx })),
      });
    } catch (err) {
      setError('Reorder failed');
      fetchCategories();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Categories</h1>
      <p className="text-gray-500 mb-6">
        Manage product categories. These will be assignable to products in the Products module.
      </p>

      {error && <p className="bg-red-100 text-red-700 text-sm rounded p-2 mb-4">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">Category Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="e.g. Solar Panels"
            required
          />
        </div>

        <div className="flex items-center gap-2 pb-2">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} id="isActive" />
          <label htmlFor="isActive" className="text-sm">Active</label>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium disabled:opacity-60">
            {saving ? 'Saving...' : editingId ? 'Update Category' : 'Add Category'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-5 py-2 rounded-lg border">Cancel</button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : categories.length === 0 ? (
          <p className="p-6 text-gray-500">No categories yet — add one above.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Name</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, idx) => (
                <tr key={category._id} className="border-t">
                  <td className="p-3">
                    <div className="flex flex-col gap-1">
                      <button onClick={() => move(idx, -1)} disabled={idx === 0} className="disabled:opacity-30">
                        <i className="bi bi-caret-up-fill" />
                      </button>
                      <button onClick={() => move(idx, 1)} disabled={idx === categories.length - 1} className="disabled:opacity-30">
                        <i className="bi bi-caret-down-fill" />
                      </button>
                    </div>
                  </td>
                  <td className="p-3 font-medium">{category.name}</td>
                  <td className="p-3 text-gray-500">{category.slug}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleActive(category)}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${category.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}
                    >
                      {category.isActive ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td className="p-3 text-right space-x-3">
                    <button onClick={() => handleEdit(category)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(category._id)} className="text-red-600 hover:underline">Delete</button>
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

export default CategoryManager;