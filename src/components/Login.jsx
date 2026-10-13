import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAuthErrorMessage } from "../utils/firebaseErrors";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const redirectTo = location.state?.from?.pathname || "/admin";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      await login(email, password);
      setMessage("Login successful! Redirecting…");
      setTimeout(() => navigate(redirectTo), 800);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="p-10 bg-white rounded-lg shadow-md"
        style={{ width: "75%" }}
      >
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Login</h2>

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
        <p
          className="text-blue-600 cursor-pointer my-2"
          onClick={() => navigate("/signup")}
        >
          New user? Register here
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out disabled:opacity-60"
        >
          {submitting ? "Logging in…" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
