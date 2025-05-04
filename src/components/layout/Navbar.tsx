
import { Button } from "@/components/ui/button";
import { TreeDeciduous, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <TreeDeciduous className="h-6 w-6 text-forest-600" />
          <span className="font-bold text-xl text-forest-800">Tree Revive</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`transition-colors ${isActive('/') ? 'text-forest-500 font-medium' : 'text-forest-700 hover:text-forest-500'}`}
          >
            Home
          </Link>
          <Link 
            to="/map" 
            className={`transition-colors ${isActive('/map') ? 'text-forest-500 font-medium' : 'text-forest-700 hover:text-forest-500'}`}
          >
            Impact Map
          </Link>
          <Link 
            to="/sponsor" 
            className={`transition-colors ${isActive('/sponsor') ? 'text-forest-500 font-medium' : 'text-forest-700 hover:text-forest-500'}`}
          >
            Sponsor Trees
          </Link>
          <Link 
            to="/rewards" 
            className={`transition-colors ${isActive('/rewards') ? 'text-forest-500 font-medium' : 'text-forest-700 hover:text-forest-500'}`}
          >
            Rewards
          </Link>
          {user && (
            <Link 
              to="/dashboard" 
              className={`transition-colors ${isActive('/dashboard') ? 'text-forest-500 font-medium' : 'text-forest-700 hover:text-forest-500'}`}
            >
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
