import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems } from "@/nav-items";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CartPreview from "./CartPreview";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(0);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : 'U';
  };

  return (
    <nav
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        isScrolled ? "bg-background/95 border-b shadow-sm" : "bg-background/90 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center space-x-1.5">
            <ShoppingBag className="h-5 w-5" />
            <span className="font-semibold text-base">Store</span>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            {navItems
              .filter(item => {
                if (!item.title) return false;
                if (item.adminOnly && (!user || !user.isAdmin)) return false;
                return true;
              })
              .map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-link py-1.5 text-sm"
                >
                  {item.icon}
                  <span className="ml-1.5">{item.title}</span>
                </Link>
              ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="relative group">
              <Button variant="ghost" size="sm" className="relative h-8 w-8">
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 text-xs flex items-center justify-center bg-primary text-primary-foreground rounded-full">
                    {cartCount}
                  </span>
                )}
              </Button>
              <CartPreview cartCount={cartCount} />
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-7 w-7 rounded-full">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name || 'User'}`} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end" forceMount>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-3.5 w-3.5" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="sm" asChild className="h-8">
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="default" size="sm" asChild className="h-8">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-1.5 hover:bg-accent rounded-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t bg-background/95">
          <div className="px-2 py-2 space-y-0.5">
            {navItems
              .filter(item => {
                if (!item.title) return false;
                if (item.adminOnly && (!user || !user.isAdmin)) return false;
                return true;
              })
              .map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-link block py-1.5 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span className="ml-1.5">{item.title}</span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
