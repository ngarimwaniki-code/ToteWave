import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navItems } from "@/nav-items";

const DesktopNav = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Ensure navItems exists and is an array
  const items = Array.isArray(navItems) ? navItems : [];
  
  return (
    <div className="hidden md:flex items-center space-x-4">
      <NavigationMenu>
        <NavigationMenuList>
          {items
            .filter(item => {
              if (!item?.title) return false;
              if (item.adminOnly && (!user || !user.isAdmin)) return false;
              if (item.protected && !user) return false;
              return true;
            })
            .map((item) => (
              <NavigationMenuItem key={item.to}>
                <Link
                  to={item.to}
                  className={`nav-link inline-flex items-center space-x-1 px-2 py-1 ${
                    location.pathname === item.to ? "active" : ""
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.title}</span>
                </Link>
              </NavigationMenuItem>
            ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNav;