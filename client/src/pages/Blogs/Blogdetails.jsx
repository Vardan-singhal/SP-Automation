import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Blogdetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setPost(null);
    setNotFound(false);

    axios
      .get(`${API_URL}/blogs/${slug}`)
      .then((res) => setPost(res.data))
      .catch(() => setNotFound(true));

    axios
      .get(`${API_URL}/blogs`)
      .then((res) => setAllPosts(res.data))
      .catch(() => setAllPosts([]));
  }, [slug]);

  if (notFound) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-lg font-semibold gap-4">
        <p>Blog post not found.</p>
        <button onClick={() => navigate("/blogs")} className="text-primary underline">
          ← Back to Blogs
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold">
        Loading blog...
      </div>
    );
  }

  const categories = allPosts.reduce((acc, p) => {
    const exist = acc.find((c) => c.name === p.category);
    if (exist) exist.count++;
    else acc.push({ name: p.category, count: 1 });
    return acc;
  }, []);

  const recentPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <div className="bg-white text-gray-900">
      <div className="container mx-auto max-w-7xl p-4 md:p-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <article className="lg:col-span-2">
            <button onClick={() => navigate("/blogs")} className="mb-6 text-primary font-medium transition">
              ← Back to Blogs
            </button>

            <img
              src={post.mainImage}
              alt={post.title}
              className="w-full h-auto md:h-[430px] object-cover rounded-2xl shadow-lg"
            />

            <div className="flex flex-wrap items-center gap-4 text-gray-500 mt-6 text-sm">
              <span className="flex items-center gap-2">
                <i className="bi bi-person-fill text-primary"></i> {post.author}
              </span>
              <span className="flex items-center gap-2">
                <i className="bi bi-calendar3 text-primary"></i> {new Date(post.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <i className="bi bi-tag-fill text-primary"></i> {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-primary mt-6 mb-6 leading-tight">
              {post.title}
            </h1>

            <div
              className="blog-content text-[17px] leading-[1.75] text-gray-800 space-y-4"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </article>

          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-gray-50 p-6 rounded-2xl shadow">
              <h3 className="text-2xl font-bold text-primary mb-6">Recent Posts</h3>
              <div className="space-y-5">
                {recentPosts.map((rp) => (
                  <div
                    key={rp._id}
                    onClick={() => navigate(`/blog/${rp.slug}`)}
                    className="flex items-center gap-4 cursor-pointer group"
                  >
                    <img src={rp.mainImage} alt={rp.title} className="w-20 h-20 object-cover rounded-lg" />
                    <div>
                      <p className="text-sm text-gray-500">{new Date(rp.date).toLocaleDateString()}</p>
                      <h4 className="font-semibold text-gray-800 group-hover:text-primary transition">
                        {rp.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl shadow">
              <h3 className="text-2xl font-bold text-primary mb-6">Categories</h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <span className="flex justify-between items-center text-gray-700 hover:text-primary transition cursor-pointer">
                      <span className="flex items-center gap-2">
                        <i className="bi bi-chevron-right text-primary text-sm" />
                        {cat.name}
                      </span>
                      <span className="text-sm text-gray-500">({cat.count})</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Blogdetails;