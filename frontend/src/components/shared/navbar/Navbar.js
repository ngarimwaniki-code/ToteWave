import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import DesktopActions from "./DesktopActions";
import MobileMenu from "./Mobilemenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}
  `;

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <DesktopNav />
            <DesktopActions cartCount={cartCount} />

            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            cartCount={cartCount}
          />
        )}
      </AnimatePresence>

      <div className="h-16" />
    </>
  );
};

export default Navbar;