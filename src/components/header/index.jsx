import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import { NavLink } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <>
      <nav className="flex flex-col w-full h-auto bg-blue-600 text-white shadow-md fixed top-0 left-0 z-20">
        <div className="flex  justify-between px-6 py-2">
          <div className="text-2xl font-bold flex gap-x-4">
            <HeaderIcon /> UserDB
          </div>
          <div className="flex gap-x-4">
            {userLoggedIn ? (
              <button
                onClick={() => {
                  doSignOut().then(() => {
                    navigate("/login");
                  });
                }}
                className="bg-white text-blue-600 py-2 px-4 rounded-md shadow-md hover:bg-gray-100 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-blue-600 py-2 px-4 rounded-md shadow-md hover:bg-gray-100 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 py-2 px-4 rounded-md shadow-md hover:bg-gray-100 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
        {userLoggedIn && <TabNavigation />}
      </nav>

      {/* Display TabNavigation if user is logged in */}
    </>
  );
};

export default Header;
const HeaderIcon = () => (
  <svg
    class="h-8 w-8 text-white-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    {" "}
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />{" "}
    <circle cx="9" cy="7" r="4" /> <path d="M23 21v-2a4 4 0 0 0-3-3.87" />{" "}
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TabNavigation = () => {
  const routes = [
    { path: "/home", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/users", label: "Users" },
    { path: "/contact", label: "Contact" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <div className="flex gap-x-4  justify-center bg-blue-500 text-white p-2 shadow-sm">
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) =>
            `px-3 py-2 rounded transition ${
              isActive ? "bg-blue-700" : "hover:bg-blue-600"
            }`
          }
        >
          {route.label}
        </NavLink>
      ))}
    </div>
  );
};
