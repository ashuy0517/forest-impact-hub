
import { Button } from "@/components/ui/button";
import { TreeDeciduous, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  
  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <TreeDeciduous className="h-6 w-6 text-forest-600" />
          <span className="font-bold text-xl text-forest-800">ForestImpactHub</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-forest-700 hover:text-forest-500 transition-colors">
            Home
          </Link>
          <Link to="/map" className="text-forest-700 hover:text-forest-500 transition-colors">
            Impact Map
          </Link>
          <Link to="/sponsor" className="text-forest-700 hover:text-forest-500 transition-colors">
            Sponsor Trees
          </Link>
          {user && (
            <Link to="/dashboard" className="text-forest-700 hover:text-forest-500 transition-colors">
              Dashboard
            </Link>
          )}
        </nav>
        
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <Link to="/dashboard" className="hidden sm:flex items-center gap-2 text-forest-700 hover:text-forest-600">
                <User size={18} />
                <span>{user.name}</span>
              </Link>
              <Button onClick={logout} variant="outline" className="hidden sm:flex">Sign Out</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="hidden sm:flex">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-forest-600 hover:bg-forest-700">Join Now</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
