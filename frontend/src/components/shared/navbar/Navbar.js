import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, User, ChevronDown } from "lucide-react";
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
      ? name.split(' ').map((n) => n[0]).join('').toUpperCase()
      : 'U';
  };

  return (
    <nav
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 border-b shadow-sm backdrop-blur-sm" 
          : "bg-background/90 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link 
            to="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg tracking-tight">Store</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
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
                  className="flex items-center px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/50 transition-colors"
                >
                  {item.icon && <span className="mr-1.5">{item.icon}</span>}
                  {item.title}
                </Link>
              ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="relative group">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-accent/50"
              >
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
                  <Button 
                    variant="ghost" 
                    className="relative h-8 w-8 rounded-full hover:bg-accent/50"
                  >
                    <Avatar className="h-8 w-8 ring-2 ring-primary/10">
                      <AvatarImage 
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name || 'User'}`} 
                        alt={user.name} 
                      />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout} 
                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild 
                  className="h-8 hover:bg-accent/50"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  asChild 
                  className="h-8 bg-primary hover:bg-primary/90"
                >
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-sm">
          <div className="px-4 py-2 space-y-1">
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
                  className="flex items-center px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.title}
                </Link>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
