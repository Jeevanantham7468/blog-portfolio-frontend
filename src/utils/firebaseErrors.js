// Maps Firebase Authentication error codes to friendly messages.
const messages = {
  "auth/email-already-in-use": "This email is already registered. Try logging in instead.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Password should be at least 6 characters long.",
  "auth/missing-password": "Please enter your password.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-credential": "Invalid email or password. Please try again.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
  "auth/network-request-failed": "Network error. Please check your connection.",
  "auth/invalid-api-key": "Firebase is not configured. Add your keys to the frontend .env file.",
  "auth/api-key-not-valid": "Firebase is not configured. Add your keys to the frontend .env file.",
  "auth/operation-not-allowed":
    "Email/Password sign-in is disabled. Enable it in your Firebase project.",
};

export function getAuthErrorMessage(error) {
  if (!error) return "Something went wrong. Please try again.";
  return messages[error.code] || error.message || "Something went wrong. Please try again.";
}
