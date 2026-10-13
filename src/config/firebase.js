import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Values come from the frontend .env file (REACT_APP_FIREBASE_*).
// See .env.example for the full list.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "REPLACE_WITH_YOUR_FIREBASE_API_KEY",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
};

// Used to warn the user in the UI when keys have not been filled in yet.
export const isFirebaseConfigured =
  Boolean(process.env.REACT_APP_FIREBASE_API_KEY) &&
  Boolean(process.env.REACT_APP_FIREBASE_PROJECT_ID);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
