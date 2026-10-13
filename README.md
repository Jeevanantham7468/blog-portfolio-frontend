# Blog Portfolio — Frontend

React (Create React App) + React Router + Tailwind CSS frontend for the Blog
Portfolio app, with **Firebase Authentication** and a protected **Admin Panel**
for managing blog posts.

## Tech stack

- React 18 + React Router 6
- Tailwind CSS
- Axios
- Firebase Authentication (email/password)

## Getting started

```bash
npm install
```

Create a `.env` file (copy `.env.example`) and add your Firebase Web config
(Firebase Console → Project settings → General → Your apps):

```env
REACT_APP_API_URL=http://localhost:5000

REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

> Enable **Email/Password** under Firebase Console → Authentication →
> Sign-in method.

Run:

```bash
npm start        # http://localhost:3000  (backend must be running too)
npm run build    # production build
```

## Pages / routes

| Route | Access | Page |
| --- | --- | --- |
| `/` | Public | Redirects to `/home` |
| `/home` | Public | Portfolio home |
| `/blogs` | Public | Blog list + like |
| `/about` | Public | About me |
| `/contact` | Public | Contact form |
| `/login` | Public | Firebase login |
| `/signup` | Public | Firebase signup |
| `/admin` | **Protected** | Admin CRUD panel (requires login) |

## How auth works

- `src/config/firebase.js` initialises Firebase from the env vars.
- `src/context/AuthContext.jsx` exposes `signup`, `login`, `logout` and the
  current user, and keeps state in sync with `onAuthStateChanged`.
- `src/api.js` is an Axios instance that automatically attaches the user's
  Firebase **ID token** to every request.
- `src/components/ProtectedRoute.jsx` blocks `/admin` for guests and redirects
  them to `/login`.

## Project structure

```
src/
├── api.js                    # Axios + auth token interceptor
├── config/firebase.js        # Firebase init
├── context/AuthContext.jsx   # Auth provider/hook
├── utils/firebaseErrors.js   # Friendly auth error messages
└── components/
    ├── Admin.jsx             # Add / edit / view / delete posts
    ├── Blogs.jsx             # Public blog list
    ├── Login.jsx, Signup.jsx
    ├── ProtectedRoute.jsx
    ├── Home.jsx, About.jsx, Contact.jsx
    └── common/ (Navbar, Footer)
```
