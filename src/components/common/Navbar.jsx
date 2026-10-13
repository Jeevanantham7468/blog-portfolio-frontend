import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/home");
  };

  return (
    <div className="py-5 flex justify-between items-center flex-wrap gap-3">
      <h2 className="text-2xl font-bold">Personal</h2>
      <div className="flex items-center flex-wrap">
        <Link className="list-none px-4" to={"/home"}>Home</Link>
        <Link className="list-none px-4" to={"/blogs"}>Blogs</Link>
        <Link className="list-none px-4" to={"/about"}>About</Link>
        <Link className="list-none px-4" to={"/contact"}>Contact</Link>

        {user ? (
          <>
            <Link className="list-none px-4" to={"/admin"}>Admin</Link>
            <span className="hidden md:inline px-3 text-sm text-gray-500">
              {user.email}
            </span>
            <button className="button-style" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="button-style" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
