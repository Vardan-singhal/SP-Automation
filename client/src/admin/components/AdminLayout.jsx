import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const navItems = [
  { label: 'Dashboard', to: '/admin', end: true, ready: true },
  { label: 'Top Navbar', to: '/admin/topbar', ready: true },
  { label: 'Our Team', to: '/admin/team', ready: true },
  { label: 'Footer', to: '/admin/footer', ready: true },
  { label: 'Contact Us', to: '/admin/contact', ready: true },
  { label: 'Enquiries', to: '/admin/enquiries', ready: true },
  { label: 'Testimonials', to: '/admin/testimonials', ready: true },
  { label: 'Categories', to: '/admin/categories', ready: true },
  { label: 'Products', to: '/admin/products', ready: true },
  { label: 'Blogs', to: '/admin/blogs', ready: true },
  { label: 'Navbar', to: '/admin/navbar', ready: true },
];

const AdminLayout = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shrink-0">
        <div className="px-6 py-5 text-lg font-bold border-b border-gray-800">
          SP Automation Admin
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center justify-between px-6 py-3 text-sm ${
                  isActive ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                } ${!item.ready ? 'opacity-40 pointer-events-none' : ''}`
              }
            >
              <span>{item.label}</span>
              {!item.ready && <span className="text-xs">soon</span>}
            </NavLink>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-gray-800 text-sm">
          <p className="mb-2 text-gray-400">{admin?.email}</p>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-300">
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;