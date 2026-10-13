import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import Footer from "./common/Footer";

const emptyForm = { newTitle: "", newContent: "" };

function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/blogs");
      setBlogs(data);
    } catch (err) {
      setMessage({ type: "error", text: "Could not load blogs." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadBlogs();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    try {
      if (editingId) {
        await api.put(`/api/blogs/${editingId}`, { ...form, date });
        setMessage({ type: "success", text: "Blog updated successfully." });
      } else {
        await api.post("/api/blogs", { ...form, date, likes: 0 });
        setMessage({ type: "success", text: "Blog added successfully." });
      }
      resetForm();
      loadBlogs();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setForm({ newTitle: blog.newTitle, newContent: blog.newContent });
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    setMessage(null);
    try {
      await api.delete(`/api/blogs/${id}`);
      setMessage({ type: "success", text: "Blog deleted." });
      if (editingId === id) resetForm();
      loadBlogs();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Could not delete the blog.",
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/home");
  };

  return (
    <div className="py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
          <h2 className="text-4xl font-bold">
            Admin <span className="text-orange-400">Panel</span> 🛠️
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Signed in as <span className="font-medium text-gray-700">{user?.email}</span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-900 transition"
        >
          Logout
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded border ${
            message.type === "success"
              ? "bg-green-50 border-green-300 text-green-700"
              : "bg-red-50 border-red-300 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-10 flex flex-col gap-4"
      >
        <h3 className="text-xl font-semibold text-gray-800">
          {editingId ? "Edit Blog Post" : "Add New Blog Post"}
        </h3>
        <input
          type="text"
          name="newTitle"
          placeholder="Blog Title"
          value={form.newTitle}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <textarea
          name="newContent"
          placeholder="Blog Content"
          value={form.newContent}
          onChange={handleChange}
          className="p-2 border rounded"
          rows="5"
          required
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-orange-400 text-white px-5 py-2 rounded hover:bg-orange-600 transition"
          >
            {editingId ? "Update Blog" : "Add Blog"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-2xl font-bold mb-4">
        Manage Posts <span className="text-gray-400 text-lg">({blogs.length})</span>
      </h3>

      {loading ? (
        <p className="text-gray-500">Loading blogs…</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500">No blogs yet. Add your first post above.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow rounded-lg p-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
            >
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">{blog.newTitle}</h4>
                <p className="text-gray-400 text-sm mb-2">{blog.date}</p>
                <p className="text-gray-600">{blog.newContent}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {blog.likes} likes{blog.author ? ` • by ${blog.author}` : ""}
                </p>
              </div>
              <div className="flex sm:flex-col gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Admin;
