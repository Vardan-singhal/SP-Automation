import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');


const resolveImageUrl = (path) => {
  if (!path) return '';
  return path.startsWith('/uploads/') ? `${API_ORIGIN}${path}` : path;
};
const emptyForm = {
  name: '',
  category: 'none',
  excerpt: '',
  description: '',
  isActive: true,
};

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [features, setFeatures] = useState(['']);
  const [specs, setSpecs] = useState([{ key: '', value: '' }]);
  const [existingImages, setExistingImages] = useState([]); // paths kept on edit
  const [newFiles, setNewFiles] = useState([]); // File[] to upload
  const [newPreviews, setNewPreviews] = useState([]); // object URLs for new files
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/admin/products'),
        api.get('/admin/categories'),
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // clean up object URLs when they change/unmount
  useEffect(() => {
    return () => newPreviews.forEach((url) => URL.revokeObjectURL(url));
  }, [newPreviews]);

  const resetForm = () => {
    setForm(emptyForm);
    setFeatures(['']);
    setSpecs([{ key: '', value: '' }]);
    setExistingImages([]);
    setNewFiles([]);
    setNewPreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return [];
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // ---- Features (dynamic list) ----
  const updateFeature = (idx, value) => {
    setFeatures((prev) => prev.map((f, i) => (i === idx ? value : f)));
  };
  const addFeature = () => setFeatures((prev) => [...prev, '']);
  const removeFeature = (idx) => setFeatures((prev) => prev.filter((_, i) => i !== idx));

  // ---- Specifications (dynamic key/value) ----
  const updateSpec = (idx, field, value) => {
    setSpecs((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  };
  const addSpec = () => setSpecs((prev) => [...prev, { key: '', value: '' }]);
  const removeSpec = (idx) => setSpecs((prev) => prev.filter((_, i) => i !== idx));

  // ---- Images ----
  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setNewFiles((prev) => [...prev, ...files]);
    setNewPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    e.target.value = ''; // allow re-selecting the same file
  };
  const removeExistingImage = (path) => {
    setExistingImages((prev) => prev.filter((p) => p !== path));
  };
  const removeNewImage = (idx) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== idx));
    setNewPreviews((prev) => {
      URL.revokeObjectURL(prev[idx]);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('category', form.category);
    fd.append('excerpt', form.excerpt);
    fd.append('description', form.description);
    fd.append('isActive', form.isActive);
    fd.append('features', JSON.stringify(features.map((f) => f.trim()).filter(Boolean)));
    fd.append(
      'specifications',
      JSON.stringify(
        specs
          .map((s) => ({ key: s.key.trim(), value: s.value.trim() }))
          .filter((s) => s.key && s.value)
      )
    );
    fd.append('existingImages', JSON.stringify(existingImages));
    newFiles.forEach((file) => fd.append('images', file));
    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    setError('');
    try {
      const fd = buildFormData();
      if (editingId) {
        const { data } = await api.put(`/admin/products/${editingId}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setProducts((prev) => prev.map((p) => (p._id === editingId ? data : p)));
      } else {
        const { data } = await api.post('/admin/products', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setProducts((prev) => [...prev, data]);
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category?._id || 'none',
      excerpt: product.excerpt || '',
      description: product.description || '',
      isActive: product.isActive,
    });
    setFeatures(product.features?.length ? product.features : ['']);
    setSpecs(product.specifications?.length ? product.specifications : [{ key: '', value: '' }]);
    setExistingImages(product.images || []);
    setNewFiles([]);
    setNewPreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return [];
    });
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;
    try {
      await api.delete(`/admin/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const toggleActive = async (product) => {
    try {
      const fd = new FormData();
      fd.append('isActive', !product.isActive);
      const { data } = await api.put(`/admin/products/${product._id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProducts((prev) => prev.map((p) => (p._id === product._id ? data : p)));
    } catch (err) {
      setError('Update failed');
    }
  };

  const move = async (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= products.length) return;

    const reordered = [...products];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    setProducts(reordered);

    try {
      await api.put('/admin/products/reorder', {
        items: reordered.map((p, idx) => ({ id: p._id, order: idx })),
      });
    } catch (err) {
      setError('Reorder failed');
      fetchAll();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Products</h1>
      <p className="text-gray-500 mb-6">
        Manage products. Assign a category, or leave it as "No category" for standalone products.
      </p>

      {error && <p className="bg-red-100 text-red-700 text-sm rounded p-2 mb-4">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Mono-Crystalline Solar Panel 550W"
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="none">No category (standalone product)</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Excerpt <span className="text-gray-400">(short line shown on the product card)</span>
          </label>
          <input
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium mb-2">Key Features</label>
          <div className="space-y-2">
            {features.map((f, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  value={f}
                  onChange={(e) => updateFeature(idx, e.target.value)}
                  placeholder="e.g. Maximum power output: 550W"
                  className="flex-1 border rounded-lg px-3 py-2"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(idx)}
                  className="px-3 text-red-600 hover:underline"
                  disabled={features.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addFeature} className="mt-2 text-sm text-blue-600 hover:underline">
            + Add feature
          </button>
        </div>

        {/* Specifications */}
        <div>
          <label className="block text-sm font-medium mb-2">Specifications</label>
          <div className="space-y-2">
            {specs.map((s, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  value={s.key}
                  onChange={(e) => updateSpec(idx, 'key', e.target.value)}
                  placeholder="Key e.g. power_output"
                  className="w-1/3 border rounded-lg px-3 py-2"
                />
                <input
                  value={s.value}
                  onChange={(e) => updateSpec(idx, 'value', e.target.value)}
                  placeholder="Value e.g. 550W"
                  className="flex-1 border rounded-lg px-3 py-2"
                />
                <button
                  type="button"
                  onClick={() => removeSpec(idx)}
                  className="px-3 text-red-600 hover:underline"
                  disabled={specs.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addSpec} className="mt-2 text-sm text-blue-600 hover:underline">
            + Add specification
          </button>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium mb-2">Images</label>
          <div className="flex flex-wrap gap-3 mb-3">
            {existingImages.map((path) => (
              <div key={path} className="relative w-24 h-24 rounded-lg overflow-hidden border">
                <img src={`${API_ORIGIN}${path}`} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(path)}
                  className="absolute top-0 right-0 bg-black/60 text-white text-xs px-1.5 py-0.5"
                >
                  ✕
                </button>
              </div>
            ))}
            {newPreviews.map((url, idx) => (
              <div key={url} className="relative w-24 h-24 rounded-lg overflow-hidden border border-green-400">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeNewImage(idx)}
                  className="absolute top-0 right-0 bg-black/60 text-white text-xs px-1.5 py-0.5"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <input type="file" accept=".jpg,.jpeg,.png,.webp" multiple onChange={handleFilesSelected} />
          <p className="text-xs text-gray-400 mt-1">First image is used as the card thumbnail. Up to 8 images.</p>
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

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium disabled:opacity-60"
          >
            {saving ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
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
        ) : products.length === 0 ? (
          <p className="p-6 text-gray-500">No products yet — add one above.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr key={product._id} className="border-t">
                  <td className="p-3">
                    <div className="flex flex-col gap-1">
                      <button onClick={() => move(idx, -1)} disabled={idx === 0} className="disabled:opacity-30">
                        <i className="bi bi-caret-up-fill" />
                      </button>
                      <button onClick={() => move(idx, 1)} disabled={idx === products.length - 1} className="disabled:opacity-30">
                        <i className="bi bi-caret-down-fill" />
                      </button>
                    </div>
                  </td>
                  <td className="p-3">
                    {product.images?.[0] ? (
                      <img src={`${API_ORIGIN}${product.images[0]}`} alt="" className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-300">
                        <i className="bi bi-image" />
                      </div>
                    )}
                  </td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3 text-gray-500">
                    {product.category?.name || <span className="italic text-gray-400">Standalone</span>}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleActive(product)}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {product.isActive ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td className="p-3 text-right space-x-3">
                    <button onClick={() => handleEdit(product)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:underline">Delete</button>
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

export default ProductManager;