import Header from "./components/header";

import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter, Router, RouterProvider } from "react-router-dom";
import routes from "./Routes/routes";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes}  />
    </AuthProvider>
  );
}

export default App;
