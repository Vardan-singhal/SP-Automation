// Blogs.jsx
import React, { useState, useEffect } from 'react';
import blogsData from '../../data/Blogs.json';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

/**
 * BlogGrid Component
 * Fetches and displays a grid of all blog posts (first 3 as per original).
 * On card click, navigates to the detail page using React Router.
 */
const Blog = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Use imported data
    const sortedData = [...blogsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    setPosts(sortedData.slice(0, 3));
  }, []);

  const handlePostClick = (slug) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="bg-white py-6">
      <div className="container mx-auto max-w-7xl p-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="flex items-center justify-center text-[#89EA5F] font-semibold text-sm uppercase tracking-wider mb-2">
            <i className="bi bi-calendar3 text-3xl mr-2"></i> RECENT ARTICLES
          </p>
          
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
              onClick={() => handlePostClick(post.slug)}
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={post.mainImage}
                  alt={post.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-green-900 mb-3 group-hover:text-green-600 transition-colors">
                  {post.title}
                </h3>

                {/* Meta Info */}
                <div className="flex items-center gap-x-4 text-sm text-gray-500 mb-5">
                  <div className="flex items-center gap-1.5">
                    <i className="bi bi-calendar3 text-green-500"></i>
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <i className="bi bi-tag-fill text-green-500"></i>
                    <span>{post.category}</span>
                  </div>
                </div>
                
                {/* Read More Button (Appears on Hover) */}
                <div
                  className="
                    opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20
                    transition-all duration-500 ease-in-out
                  "
                >
                  <span
                    className="inline-block bg-[#89EA5F] text-green-950 font-semibold px-5 py-2 rounded-lg text-sm"
                  >
                    Read More
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;