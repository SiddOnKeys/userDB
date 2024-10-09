import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import Dashboard from "../components/dashboard";
import Profile from "../components/profile/profile";
import ProtectedRoute from "./protectedRoute";
import Layout from "../components/layouts/layout";
import Contact from "../components/contact/contact";
import UserList from "../components/userList/userList";
import Home from "../components/home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        ),
      },

      {
        path: "contact",
        element: (
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      {
        path: "*",
        element: <Login />,
      },
    ],
  },
]);

export default routes;
