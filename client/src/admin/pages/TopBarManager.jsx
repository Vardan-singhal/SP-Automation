import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const TYPE_META = {
  hours:   { label: 'Working Hours', icon: 'bi-clock-fill',             placeholder: 'Mon-Fri, 10:00-7:00' },
  address: { label: 'Address',       icon: 'bi-geo-alt-fill',           placeholder: 'B-71, Ground Floor, Sector 69, Noida' },
  email:   { label: 'Email',         icon: 'bi-envelope-fill',          placeholder: 'sales@spautomation.org' },
  phone:   { label: 'Phone',         icon: 'bi-telephone-outbound-fill',placeholder: '+91 99100 89643' },
};

const emptyForm = { type: 'hours', value: '', link: '', icon: '', isActive: true };

const TopBarManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/topbar');
      setItems(data);
    } catch (err) {
      setError('Failed to load top bar items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.value.trim()) return;
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        const { data } = await api.put(`/admin/topbar/${editingId}`, form);
        setItems((prev) => prev.map((it) => (it._id === editingId ? data : it)));
      } else {
        const { data } = await api.post('/admin/topbar', form);
        setItems((prev) => [...prev, data]);
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      type: item.type,
      value: item.value,
      link: item.link || '',
      icon: item.icon || '',
      isActive: item.isActive,
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await api.delete(`/admin/topbar/${id}`);
      setItems((prev) => prev.filter((it) => it._id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const toggleActive = async (item) => {
    try {
      const { data } = await api.put(`/admin/topbar/${item._id}`, { isActive: !item.isActive });
      setItems((prev) => prev.map((it) => (it._id === item._id ? data : it)));
    } catch (err) {
      setError('Update failed');
    }
  };

  const move = async (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;

    const reordered = [...items];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    setItems(reordered);

    try {
      await api.put('/admin/topbar/reorder', {
        items: reordered.map((it, idx) => ({ id: it._id, order: idx })),
      });
    } catch (err) {
      setError('Reorder failed');
      fetchItems();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Top Navbar</h1>
      <p className="text-gray-500 mb-6">Manage the address, hours, email and phone shown in the top strip.</p>

      {error && <p className="bg-red-100 text-red-700 text-sm rounded p-2 mb-4">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            {Object.entries(TYPE_META).map(([key, meta]) => (
              <option key={key} value={key}>{meta.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Value (shown to visitors)</label>
          <input
            name="value"
            value={form.value}
            onChange={handleChange}
            placeholder={TYPE_META[form.type].placeholder}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Link <span className="text-gray-400">(optional — e.g. mailto:, tel:, maps URL)</span>
          </label>
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder={form.type === 'email' ? 'mailto:sales@spautomation.org' : form.type === 'phone' ? 'tel:+919910089643' : ''}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Icon class <span className="text-gray-400">(optional override, bootstrap-icons)</span>
          </label>
          <input
            name="icon"
            value={form.icon}
            onChange={handleChange}
            placeholder={TYPE_META[form.type].icon}
            className="w-full border rounded-lg px-3 py-2"
          />
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

        <div className="flex items-end gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium disabled:opacity-60"
          >
            {saving ? 'Saving...' : editingId ? 'Update Item' : 'Add Item'}
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
        ) : items.length === 0 ? (
          <p className="p-6 text-gray-500">No top navbar items yet — add one above.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Type</th>
                <th className="p-3">Value</th>
                <th className="p-3">Link</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item._id} className="border-t">
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
                  <td className="p-3">
                    <i className={`bi ${item.icon || TYPE_META[item.type].icon} mr-2`} />
                    {TYPE_META[item.type].label}
                  </td>
                  <td className="p-3">{item.value}</td>
                  <td className="p-3 text-gray-500">{item.link || '—'}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleActive(item)}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {item.isActive ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td className="p-3 text-right space-x-3">
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

export default TopBarManager;