
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TreeDeciduous } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-forest-50">
      <div className="text-center px-4 max-w-md">
        <div className="mb-6 flex justify-center">
          <TreeDeciduous className="h-20 w-20 text-forest-600 animate-leaf-sway" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-forest-800">404</h1>
        <p className="text-xl text-forest-700 mb-6">
          Oops! We couldn't find the page you're looking for.
        </p>
        <p className="text-muted-foreground mb-8">
          It seems you've wandered off the trail. Let's get you back to exploring our forests.
        </p>
        <Button asChild size="lg" className="bg-forest-600 hover:bg-forest-700">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
