import axios from "axios";
import { auth } from "./config/firebase";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({ baseURL: API_URL });

// Attach the Firebase ID token to every request so the backend can verify
// that the caller is an authenticated user.
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
