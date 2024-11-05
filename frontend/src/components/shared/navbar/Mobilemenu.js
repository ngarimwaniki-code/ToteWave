import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { X, ShoppingCart, LogIn, UserPlus, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems } from "@/nav-items";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";

const menuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.2 },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

const MobileMenu = ({ isOpen, onClose, cartCount = 0 }) => {
  const { user, logout } = useAuth();

  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={menuVariants}
      className="fixed inset-y-0 right-0 w-full bg-white shadow-xl z-50 md:hidden"
    >
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <button onClick={onClose} className="p-2" aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {navItems
            .filter(item => {
              if (!item.title) return false;
              if (item.adminOnly && (!user || !user.isAdmin)) return false;
              if (item.protected && !user) return false;
              return true;
            })
            .map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
                onClick={onClose}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
        </div>

        <div className="pt-4 border-t space-y-2">
          {user ? (
            <>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/profile" onClick={onClose}>
                  <Settings className="h-5 w-5 mr-2" />
                  Profile
                </Link>
              </Button>
              <Button variant="outline" className="w-full text-red-600" onClick={() => {
                logout();
                onClose();
              }}>
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button className="w-full" asChild>
                <Link to="/login" onClick={onClose}>
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/register" onClick={onClose}>
                  <UserPlus className="h-5 w-5 mr-2" />
                  Register
                </Link>
              </Button>
            </>
          )}
          <Button variant="outline" className="w-full" asChild>
            <Link to="/cart" onClick={onClose}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenu;