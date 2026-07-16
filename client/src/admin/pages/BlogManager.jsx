import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import RichTextEditor from '../components/RichTextEditor';

const emptyForm = {
  title: '',
  slug: '',
  author: '',
  category: '',
  date: new Date().toISOString().slice(0, 10),
  excerpt: '',
  contentHtml: '',
  isPublished: true,
};

const slugify = (text) =>
  text.toString().trim().toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/blogs');
      setBlogs(data);
    } catch (err) {
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const [formKey, setFormKey] = useState(0);
  const resetForm = () => {
    setForm(emptyForm);
    setMainImageFile(null);
    setImagePreview('');
    setEditingId(null);
    setSlugTouched(false);
    setFormKey((k) => k + 1);
  };

  const handleTitleChange = (title) => {
    setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));
  };

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMainImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.contentHtml.trim()) {
      setError('Title and content are required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, val]) => payload.append(key, val));
      if (mainImageFile) payload.append('mainImage', mainImageFile);

      let data;
      if (editingId) {
        ({ data } = await api.put(`/admin/blogs/${editingId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }));
        setBlogs((prev) => prev.map((b) => (b._id === editingId ? data : b)));
      } else {
        ({ data } = await api.post('/admin/blogs', payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }));
        setBlogs((prev) => [data, ...prev]);
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      slug: blog.slug,
      author: blog.author,
      category: blog.category,
      date: blog.date?.slice(0, 10) || new Date().toISOString().slice(0, 10),
      excerpt: blog.excerpt,
      contentHtml: blog.contentHtml,
      isPublished: blog.isPublished,
    });
    setImagePreview(blog.mainImage || '');
    setMainImageFile(null);
    setEditingId(blog._id);
    setSlugTouched(true);
    setFormKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post? This cannot be undone.')) return;
    try {
      await api.delete(`/admin/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const togglePublished = async (blog) => {
    try {
      const { data } = await api.put(`/admin/blogs/${blog._id}/publish`, {
        isPublished: !blog.isPublished,
      });
      setBlogs((prev) => prev.map((b) => (b._id === blog._id ? data : b)));
    } catch (err) {
      setError('Update failed');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Blogs</h1>
      <p className="text-gray-500 mb-6">Create and manage blog posts shown on the public site.</p>

      {error && <p className="bg-red-100 text-red-700 text-sm rounded p-2 mb-4">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="e.g. Solar Energy is Powerful"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              value={form.slug}
              onChange={(e) => { setSlugTouched(true); setForm((f) => ({ ...f, slug: e.target.value })); }}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="solar-energy-is-powerful"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="e.g. Priya Sharma"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="e.g. Solar Energy"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Main Image</label>
            <input type="file" accept="image/*" onChange={handleImageFile} className="w-full text-sm" />
            {imagePreview && (
              <img src={imagePreview} alt="preview" className="mt-2 h-24 rounded-lg object-cover" />
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
            rows={2}
            placeholder="Short summary shown on the blog listing card"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <RichTextEditor
          key={formKey}
            value={form.contentHtml}
            onChange={(html) => setForm((f) => ({ ...f, contentHtml: html }))}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPublished"
            checked={form.isPublished}
            onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
          />
          <label htmlFor="isPublished" className="text-sm">Published (visible on public site)</label>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium disabled:opacity-60">
            {saving ? 'Saving...' : editingId ? 'Update Post' : 'Publish Post'}
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
        ) : blogs.length === 0 ? (
          <p className="p-6 text-gray-500">No blog posts yet — create one above.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-t">
                  <td className="p-3">
                    <img src={blog.mainImage} alt={blog.title} className="w-14 h-14 object-cover rounded-lg" />
                  </td>
                  <td className="p-3 font-medium">{blog.title}</td>
                  <td className="p-3 text-gray-500">{blog.category}</td>
                  <td className="p-3 text-gray-500">{blog.date?.slice(0, 10)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => togglePublished(blog)}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}
                    >
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="p-3 text-right space-x-3">
                    <button onClick={() => handleEdit(blog)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:underline">Delete</button>
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

export default BlogManager;