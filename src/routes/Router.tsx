import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import { AdminProducts } from "../pages/admin/AdminProducts";
import ProductForm from "../pages/admin/ProductForm";
import { AuthProvider } from "../auth/contexts/AuthContext";
import RequireAuth from "../auth/routes/RequireAuth";
import Unauthorized from "../auth/pages/Unauthorized";
import Login from "../pages/Login";

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
    element: (
      <RequireAuth allowedRoles={['admin']}>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "products/create-product", element: <ProductForm />}
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

export const Router = () => {
  return <AuthProvider><RouterProvider router={router} /></AuthProvider>;
};