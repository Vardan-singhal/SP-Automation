import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios'; 
import {
  FaBoxOpen,
  FaList,
  FaBlog,
  FaEnvelope,
  FaUsers,
  FaQuoteLeft,
  FaPlus,
  FaArrowRight,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    blogs: 0,
    enquiries: 0,
    team: 0,
    testimonials: 0,
  });

  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

const fetchDashboard = async () => {
  try {
    const { data } = await api.get('/dashboard'); // NOT `${API}/api/admin/dashboard`
    setStats({
      products: data.products,
      categories: data.categories,
      blogs: data.blogs,
      enquiries: data.enquiries,
      team: data.team,
      testimonials: data.testimonials,
    });
    setRecentBlogs(data.recentBlogs);
    setRecentEnquiries(data.recentEnquiries);
  } catch (err) {
    console.log(err);
  }
};

  const cards = [
    {
      title: "Products",
      value: stats.products,
      icon: <FaBoxOpen />,
      color: "bg-blue-500",
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: <FaList />,
      color: "bg-green-500",
    },
    {
      title: "Blogs",
      value: stats.blogs,
      icon: <FaBlog />,
      color: "bg-orange-500",
    },
    {
      title: "Enquiries",
      value: stats.enquiries,
      icon: <FaEnvelope />,
      color: "bg-red-500",
    },
    {
      title: "Team",
      value: stats.team,
      icon: <FaUsers />,
      color: "bg-purple-500",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: <FaQuoteLeft />,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here's an overview of your website.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map((card, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex justify-between items-center"
          >

            <div>

              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {card.value}
              </h2>

            </div>

            <div
              className={`${card.color} w-16 h-16 rounded-xl flex items-center justify-center text-white text-3xl shadow-lg`}
            >
              {card.icon}
            </div>

          </div>

        ))}

      </div>

      {/* Tables */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        {/* Blogs */}

        <div className="bg-white rounded-2xl shadow-md">

          <div className="border-b px-6 py-4">
            <h3 className="font-semibold text-lg">
              Recent Blogs
            </h3>
          </div>

          <div className="p-6">

            {recentBlogs.length === 0 ? (

              <p className="text-gray-500">
                No blogs found.
              </p>

            ) : (

              <table className="w-full">

                <thead>

                  <tr className="text-left border-b">

                    <th className="pb-3">Title</th>

                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  {recentBlogs.map((blog) => (

                    <tr
                      key={blog._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="py-3">
                        {blog.title}
                      </td>

                      <td>

                        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                          Published
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

        {/* Enquiries */}

        <div className="bg-white rounded-2xl shadow-md">

          <div className="border-b px-6 py-4">

            <h3 className="font-semibold text-lg">
              Recent Enquiries
            </h3>

          </div>

          <div className="p-6">

            {recentEnquiries.length === 0 ? (

              <p className="text-gray-500">
                No enquiries found.
              </p>

            ) : (

              <table className="w-full">

                <thead>

                  <tr className="border-b text-left">

                    <th className="pb-3">Name</th>

                    <th>Email</th>

                  </tr>

                </thead>

                <tbody>

                  {recentEnquiries.map((item) => (

                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="py-3">
                        {item.name}
                      </td>

                      <td>{item.email}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        {/* Quick Actions */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">

          <h3 className="font-semibold text-lg mb-6">
            Quick Actions
          </h3>

          <div className="flex flex-wrap gap-4">
  <button
    onClick={() => navigate('/admin/products')}
    className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
  >
    <FaPlus /> Add Product
  </button>

  <button
    onClick={() => navigate('/admin/blogs')}
    className="bg-green-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
  >
    <FaPlus /> Add Blog
  </button>

  <button
    onClick={() => navigate('/admin/categories')}
    className="bg-orange-500 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition"
  >
    <FaPlus /> Add Category
  </button>

  <button
    onClick={() => navigate('/admin/enquiries')}
    className="bg-red-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
  >
    View Enquiries <FaArrowRight />
  </button>
</div>

        </div>



      </div>

    </div>
  );
};

export default Dashboard;