import Header from "./components/header";
import "./App.css"
import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter, Router, RouterProvider } from "react-router-dom";
import routes from "./Routes/routes";
import { doGetUserList } from "./firebase/auth";

function App() {
  doGetUserList();
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;
