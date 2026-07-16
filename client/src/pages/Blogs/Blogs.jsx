// Blogs.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/blogs`)
      .then((res) => setPosts(res.data.slice(0, 6)))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const handlePostClick = (slug) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div>
      <div className="relative w-full h-64 lg:h-72 overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
          <source src="/assets/blogs/blogsbn.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="bg-white py-16">
        <div className="container mb-12 mx-auto max-w-7xl">
          <div className="text-center">
            <p className="flex items-center justify-center text-[#89EA5F] font-semibold text-sm uppercase tracking-wider mb-2">
              <i className="bi bi-calendar3 text-xl mr-2"></i> RECENT ARTICLES
            </p>
            <h1 className="text-4xl sm:text-5xl mb-9 font-bold text-green-900 leading-tight">
              Our Latest News
            </h1>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500">No blog posts yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
                  onClick={() => handlePostClick(post.slug)}
                >
                  <div className="overflow-hidden">
                    <img
                      src={post.mainImage}
                      alt={post.title}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-900 mb-3 group-hover:text-green-600 transition-colors">
                      {post.title}
                    </h3>

                    <div className="flex items-center gap-x-4 text-sm text-gray-500 mb-5">
                      <div className="flex items-center gap-1.5">
                        <i className="bi bi-calendar3 text-green-500"></i>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <i className="bi bi-tag-fill text-green-500"></i>
                        <span>{post.category}</span>
                      </div>
                    </div>

                    <div className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 ease-in-out">
                      <span className="inline-block bg-[#89EA5F] text-green-950 font-semibold px-5 py-2 rounded-lg text-sm">
                        Read More
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;