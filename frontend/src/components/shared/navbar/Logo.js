import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Logo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <ShoppingBag className="h-8 w-8 text-primary" />
    <span className="text-xl font-bold">ToteWave</span>
  </Link>
);

export default Logo;