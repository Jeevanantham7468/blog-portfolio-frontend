import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAuthErrorMessage } from "../utils/firebaseErrors";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      await signup(email, password);
      setMessage("Account created successfully! Redirecting…");
      setTimeout(() => navigate("/admin"), 900);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-10 bg-white rounded-lg shadow-lg"
        style={{ width: "70%" }}
      >
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Sign In</h2>

        {message && (
          <p className="mb-4 px-3 py-2 rounded bg-green-50 border border-green-300 text-green-700 text-sm">
            {message}
          </p>
        )}
        {error && (
          <p className="mb-4 px-3 py-2 rounded bg-red-50 border border-red-300 text-red-700 text-sm">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <p
          className="text-blue-600 cursor-pointer my-2"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login here
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-200 ease-in-out disabled:opacity-60"
        >
          {submitting ? "Registering…" : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
