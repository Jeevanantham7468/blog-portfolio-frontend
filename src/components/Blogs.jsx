import React, { useEffect, useState } from "react";
import api from "../api";
import Footer from "./common/Footer";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get("/api/blogs");
      setBlogs(data);
      setError("");
    } catch (err) {
      setError("Error fetching blogs. Please make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  const handleLike = async (blogId) => {
    try {
      await api.patch(`/api/blogs/like/${blogId}`);
      fetchBlogs();
    } catch (error) {
      console.error("Error liking the blog post:", error);
    }
  };

  return (
    <div className="blog-section py-14">
      <h2 className="text-center text-5xl font-bold mb-14">
        Latest <span className="text-orange-400">Blogs</span> 📚
      </h2>

      {loading && <p className="text-center text-gray-500">Loading blogs…</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && blogs.length === 0 && (
        <p className="text-center text-gray-500">No blogs yet. Check back soon!</p>
      )}

      <div className="blogs-container grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto px-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-post mb-8 p-6 bg-white shadow-lg rounded-lg">
            <h3 className="blog-title font-semibold text-2xl text-gray-800 mb-3">
              {blog.newTitle}
            </h3>
            <p className="blog-date text-gray-400 text-sm mb-4">{blog.date}</p>
            <p className="blog-content text-gray-600 mb-4">{blog.newContent}</p>
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => handleLike(blog._id)}
            >
              Like
            </span>
            <span className="ml-2">{blog.likes} Likes</span>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Blogs;
