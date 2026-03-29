import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import EditPaste from "./pages/EditPaste";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";
import "./index.css";

const PrivateLayout = () => {
  return (
    <PrivateRoute>
      <Navbar />
      <Outlet />
    </PrivateRoute>
  );
};

const router = createBrowserRouter([
  {
    element: <PrivateLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/pastes", element: <Paste /> },
      { path: "/paste/:id", element: <ViewPaste /> },
      { path: "/edit/:id", element: <EditPaste /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
