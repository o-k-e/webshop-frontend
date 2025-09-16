import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import ProductForm from "../pages/admin/ProductForm";
import { AuthProvider } from "../auth/providers/AuthProvider";
import RequireAuth from "../auth/routes/RequireAuth";
import Unauthorized from "../auth/pages/Unauthorized";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import SearchResultsPage from "../pages/SearchResultsPage";
import ProductUpdateForm from "../pages/admin/ProductUpdateForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <SearchResultsPage /> },
      { path: "products/:id", element: <ProductDetails /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <RequireAuth allowedRole={"admin"}>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "products/create-product", element: <ProductForm /> },
      { path: "products/edit/:id", element: <ProductUpdateForm /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  { path: "/unauthorized", element: <Unauthorized /> },
]);

export const Router = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);