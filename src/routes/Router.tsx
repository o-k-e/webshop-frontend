import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import { AdminProducts } from "../pages/AdminProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products/:id', element: <ProductDetails /> }
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "products/:id", element: <ProductDetails /> }

    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};