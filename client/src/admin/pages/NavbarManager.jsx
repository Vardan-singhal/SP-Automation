import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const NavbarManager = () => {
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [addCategoryId, setAddCategoryId] = useState('');
  const [addProductId, setAddProductId] = useState('');
  const [childProductId, setChildProductId] = useState({}); // { [itemIndex]: productId }

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [menuRes, catRes, prodRes] = await Promise.all([
        api.get('/admin/navbar/products-menu'),
        api.get('/admin/categories'),
        api.get('/admin/products'),
      ]);
      setMenu(menuRes.data.productMenu || []);
      setCategories(catRes.data || []);
      setProducts(prodRes.data || []);
    } catch (err) {
      setError('Failed to load navbar data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const usedCategoryIds = menu.filter((i) => i.type === 'category').map((i) => i.category?._id);
  const usedProductIds = menu.flatMap((i) => [
    ...(i.type === 'product' ? [i.product?._id] : []),
    ...(i.children || []).map((c) => c.product?._id),
  ]);

  const availableCategories = categories.filter((c) => !usedCategoryIds.includes(c._id));
  const availableProducts = products.filter((p) => !usedProductIds.includes(p._id));

  const toPayload = (list) =>
    list.map((item, idx) => ({
      type: item.type,
      category: item.type === 'category' ? item.category._id : null,
      product: item.type === 'product' ? item.product._id : null,
      order: idx,
      children:
        item.type === 'category'
          ? (item.children || []).map((c, cidx) => ({ product: c.product._id, order: cidx }))
          : [],
    }));

  const persist = async (newMenu) => {
    setSaving(true);
    setError('');
    try {
      const { data } = await api.put('/admin/navbar/products-menu', { productMenu: toPayload(newMenu) });
      setMenu(data.productMenu || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
      fetchAll(); // resync on failure
    } finally {
      setSaving(false);
    }
  };

  const handleAddCategory = () => {
    if (!addCategoryId) return;
    const category = categories.find((c) => c._id === addCategoryId);
    const newMenu = [...menu, { type: 'category', category, children: [] }];
    setAddCategoryId('');
    persist(newMenu);
  };

  const handleAddStandaloneProduct = () => {
    if (!addProductId) return;
    const product = products.find((p) => p._id === addProductId);
    const newMenu = [...menu, { type: 'product', product }];
    setAddProductId('');
    persist(newMenu);
  };

  const handleAddChildProduct = (itemIdx) => {
    const productId = childProductId[itemIdx];
    if (!productId) return;
    const product = products.find((p) => p._id === productId);
    const newMenu = menu.map((item, idx) =>
      idx === itemIdx ? { ...item, children: [...(item.children || []), { product }] } : item
    );
    setChildProductId((prev) => ({ ...prev, [itemIdx]: '' }));
    persist(newMenu);
  };

  const moveItem = (idx, direction) => {
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= menu.length) return;
    const newMenu = [...menu];
    [newMenu[idx], newMenu[newIdx]] = [newMenu[newIdx], newMenu[idx]];
    persist(newMenu);
  };

  const moveChild = (itemIdx, childIdx, direction) => {
    const item = menu[itemIdx];
    const newChildIdx = childIdx + direction;
    if (newChildIdx < 0 || newChildIdx >= item.children.length) return;
    const newChildren = [...item.children];
    [newChildren[childIdx], newChildren[newChildIdx]] = [newChildren[newChildIdx], newChildren[childIdx]];
    const newMenu = menu.map((it, idx) => (idx === itemIdx ? { ...it, children: newChildren } : it));
    persist(newMenu);
  };

  const removeItem = (idx) => {
    if (!window.confirm('Remove this from the Products navbar dropdown?')) return;
    persist(menu.filter((_, i) => i !== idx));
  };

  const removeChild = (itemIdx, childIdx) => {
    const newMenu = menu.map((item, idx) =>
      idx === itemIdx
        ? { ...item, children: item.children.filter((_, ci) => ci !== childIdx) }
        : item
    );
    persist(newMenu);
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Navbar — Products Dropdown</h1>
      <p className="text-gray-500 mb-6">
        Control what shows in the "Products" menu and in what order. Add a category to group its
        products under a submenu, or add a product standalone to list it flat — independent of that
        product's actual category assignment.
      </p>

      {error && <p className="bg-red-100 text-red-700 text-sm rounded p-2 mb-4">{error}</p>}
      {saving && <p className="text-xs text-gray-400 mb-2">Saving...</p>}

      {/* Add controls */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 flex flex-wrap gap-6">
        <div className="flex items-end gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Add Category</label>
            <select
              value={addCategoryId}
              onChange={(e) => setAddCategoryId(e.target.value)}
              className="border rounded-lg px-3 py-2 min-w-[220px]"
            >
              <option value="">Select category...</option>
              {availableCategories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddCategory}
            disabled={!addCategoryId}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg disabled:opacity-40"
          >
            Add
          </button>
        </div>

        <div className="flex items-end gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Add Standalone Product</label>
            <select
              value={addProductId}
              onChange={(e) => setAddProductId(e.target.value)}
              className="border rounded-lg px-3 py-2 min-w-[220px]"
            >
              <option value="">Select product...</option>
              {availableProducts.map((p) => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddStandaloneProduct}
            disabled={!addProductId}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg disabled:opacity-40"
          >
            Add
          </button>
        </div>
      </div>

      {/* Menu tree */}
      <div className="bg-white rounded-xl shadow p-6">
        {menu.length === 0 ? (
          <p className="text-gray-500">Nothing in the Products dropdown yet — add a category or product above.</p>
        ) : (
          <div className="space-y-4">
            {menu.map((item, idx) => (
              <div key={item._id || idx} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <button onClick={() => moveItem(idx, -1)} disabled={idx === 0} className="disabled:opacity-30">
                        <i className="bi bi-caret-up-fill" />
                      </button>
                      <button onClick={() => moveItem(idx, 1)} disabled={idx === menu.length - 1} className="disabled:opacity-30">
                        <i className="bi bi-caret-down-fill" />
                      </button>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.type === 'category' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {item.type === 'category' ? 'Category' : 'Standalone Product'}
                    </span>
                    <span className="font-medium">
                      {item.type === 'category' ? item.category?.name : item.product?.name}
                    </span>
                  </div>
                  <button onClick={() => removeItem(idx)} className="text-red-600 hover:underline text-sm">
                    Remove
                  </button>
                </div>

                {item.type === 'category' && (
                  <div className="mt-3 ml-9">
                    {item.children?.length > 0 && (
                      <ul className="space-y-1 mb-3">
                        {item.children.map((child, cidx) => (
                          <li key={child._id || cidx} className="flex items-center justify-between text-sm bg-gray-50 rounded px-3 py-1.5">
                            <div className="flex items-center gap-2">
                              <button onClick={() => moveChild(idx, cidx, -1)} disabled={cidx === 0} className="disabled:opacity-30">
                                <i className="bi bi-caret-up-fill" />
                              </button>
                              <button onClick={() => moveChild(idx, cidx, 1)} disabled={cidx === item.children.length - 1} className="disabled:opacity-30">
                                <i className="bi bi-caret-down-fill" />
                              </button>
                              <span>{child.product?.name}</span>
                            </div>
                            <button onClick={() => removeChild(idx, cidx)} className="text-red-600 hover:underline">
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex items-end gap-2">
                      <select
                        value={childProductId[idx] || ''}
                        onChange={(e) => setChildProductId((prev) => ({ ...prev, [idx]: e.target.value }))}
                        className="border rounded-lg px-2 py-1.5 text-sm min-w-[200px]"
                      >
                        <option value="">Add product to this category...</option>
                        {availableProducts.map((p) => (
                          <option key={p._id} value={p._id}>{p.name}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleAddChildProduct(idx)}
                        disabled={!childProductId[idx]}
                        className="text-sm bg-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 rounded-lg disabled:opacity-40"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarManager;