import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const TYPE_META = {
  address: { label: 'Address', icon: 'bi-geo-alt-fill', placeholder: 'B-71, Ground Floor, Sector 69, Noida 201301' },
  email:   { label: 'Email',   icon: 'bi-envelope-fill', placeholder: 'sales@spautomation.org' },
  phone:   { label: 'Phone',   icon: 'bi-telephone-fill', placeholder: '+91 99100 89643' },
};

const emptyForm = { type: 'address', value: '', link: '', isActive: true };

const ContactInfoManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/contact-info');
      setItems(data);
    } catch (err) {
      setError('Failed to load contact info');
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
        const { data } = await api.put(`/admin/contact-info/${editingId}`, form);
        setItems((prev) => prev.map((it) => (it._id === editingId ? data : it)));
      } else {
        const { data } = await api.post('/admin/contact-info', form);
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
    setForm({ type: item.type, value: item.value, link: item.link || '', isActive: item.isActive });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await api.delete(`/admin/contact-info/${id}`);
      setItems((prev) => prev.filter((it) => it._id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const toggleActive = async (item) => {
    try {
      const { data } = await api.put(`/admin/contact-info/${item._id}`, { isActive: !item.isActive });
      setItems((prev) => prev.map((it) => (it._id === item._id ? data : it)));
    } catch (err) {
      setError('Update failed');
    }
  };

  const move = async (index, direction) => {
    const sameType = items.filter((it) => it.type === items[index].type);
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    if (items[newIndex].type !== items[index].type) return; // keep reordering within same category

    const reordered = [...items];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    setItems(reordered);

    try {
      await api.put('/admin/contact-info/reorder', {
        items: reordered.map((it, idx) => ({ id: it._id, order: idx })),
      });
    } catch (err) {
      setError('Reorder failed');
      fetchItems();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Contact Us Section</h1>
      <p className="text-gray-500 mb-6">Manage the addresses, emails and phone numbers shown on the Contact page cards.</p>

      {error && <p className="bg-red-100 text-red-700 text-sm rounded p-2 mb-4">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
            {Object.entries(TYPE_META).map(([key, meta]) => (
              <option key={key} value={key}>{meta.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Value</label>
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
            Link <span className="text-gray-400">(optional — mailto:, tel:, maps URL)</span>
          </label>
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder={form.type === 'email' ? 'mailto:sales@spautomation.org' : form.type === 'phone' ? 'tel:+919910089643' : ''}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} id="isActive" />
          <label htmlFor="isActive" className="text-sm">Active (visible on site)</label>
        </div>

        <div className="flex items-end gap-3 md:col-span-2">
          <button type="submit" disabled={saving} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium disabled:opacity-60">
            {saving ? 'Saving...' : editingId ? 'Update Item' : 'Add Item'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-5 py-2 rounded-lg border">Cancel</button>
          )}
        </div>
      </form>

      {/* List grouped by type */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        Object.entries(TYPE_META).map(([typeKey, meta]) => {
          const typeItems = items.filter((it) => it.type === typeKey);
          return (
            <div key={typeKey} className="bg-white rounded-xl shadow mb-6 overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 font-semibold flex items-center gap-2">
                <i className={`bi ${meta.icon}`} /> {meta.label}s
              </div>
              {typeItems.length === 0 ? (
                <p className="p-4 text-gray-500 text-sm">No {meta.label.toLowerCase()} entries yet.</p>
              ) : (
                <table className="w-full text-sm">
                  <tbody>
                    {typeItems.map((item) => {
                      const globalIndex = items.findIndex((it) => it._id === item._id);
                      return (
                        <tr key={item._id} className="border-t">
                          <td className="p-3 w-16">
                            <div className="flex flex-col gap-1">
                              <button onClick={() => move(globalIndex, -1)} disabled={typeItems[0]._id === item._id} className="disabled:opacity-30">
                                <i className="bi bi-caret-up-fill" />
                              </button>
                              <button onClick={() => move(globalIndex, 1)} disabled={typeItems[typeItems.length - 1]._id === item._id} className="disabled:opacity-30">
                                <i className="bi bi-caret-down-fill" />
                              </button>
                            </div>
                          </td>
                          <td className="p-3">{item.value}</td>
                          <td className="p-3 text-gray-500">{item.link || '—'}</td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleActive(item)}
                              className={`px-2 py-1 rounded-full text-xs font-medium ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}
                            >
                              {item.isActive ? 'Active' : 'Hidden'}
                            </button>
                          </td>
                          <td className="p-3 text-right space-x-3">
                            <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">Edit</button>
                            <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:underline">Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ContactInfoManager;