import { Home, ShoppingBag, PackageIcon, ShoppingCartIcon, Heart, Tag, Gift, Package } from "lucide-react"; 
import { lazy } from "react";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// Lazy load all pages
const HomePage = lazy(() => import("@/pages/Home"));
const Products = lazy(() => import("@/pages/Products"));
const AdminProducts = lazy(() => import("@/pages/AdminProducts"));
const AdminOrders = lazy(() => import("@/pages/AdminOrders"));
const Orders = lazy(() => import("@/pages/Orders"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));
const Deals = lazy(() => import("@/pages/Deals"));
const GiftCards = lazy(() => import("@/pages/GiftCards"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <HomePage />,
    protected: false,
    adminOnly: false
  },
  {
    title: "Products",
    to: "/products",
    icon: <ShoppingBag className="h-4 w-4" />,
    page: <Products />,
    protected: false,
    adminOnly: false
  },
  {
    title: "Deals",
    to: "/deals",
    icon: <Tag className="h-4 w-4" />,
    page: <Deals />,
    protected: false,
    adminOnly: false
  },
  {
    title: "My Orders",
    to: "/orders",
    icon: <Package className="h-4 w-4" />,
    page: <Orders />,
    protected: true,
    adminOnly: false
  },
  {
    title: "Wishlist",
    to: "/wishlist",
    icon: <Heart className="h-4 w-4" />,
    page: <Wishlist />,
    protected: true,
    adminOnly: false
  },
  {
    title: "Gift Cards",
    to: "/gift-cards",
    icon: <Gift className="h-4 w-4" />,
    page: <GiftCards />,
    protected: false,
    adminOnly: false
  },
  {
    title: "Manage Products",
    to: "/admin/products",
    icon: <PackageIcon className="h-4 w-4" />,
    page: (
      <AdminProtectedRoute>
        <AdminProducts />
      </AdminProtectedRoute>
    ),
    protected: true,
    adminOnly: true
  },
  {
    title: "Manage Orders",
    to: "/admin/orders",
    icon: <ShoppingCartIcon className="h-4 w-4" />,
    page: (
      <AdminProtectedRoute>
        <AdminOrders />
      </AdminProtectedRoute>
    ),
    protected: true,
    adminOnly: true
  },
  {
    to: "/login",
    page: <Login />,
    protected: false,
    adminOnly: false
  },
  {
    to: "/register",
    page: <Register />,
    protected: false,
    adminOnly: false
  }
];