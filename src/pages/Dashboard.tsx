
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, TreeDeciduous, Calendar, Award } from "lucide-react";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[calc(100vh-160px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-forest-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-forest-800">Welcome, {user.name}!</h1>
              <p className="text-muted-foreground mt-1">Here's your reforestation journey</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-forest-600 hover:bg-forest-700">Plant More Trees</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-forest-50 rounded-lg p-6">
              <div className="flex items-center">
                <div className="bg-forest-100 rounded-full p-3 mr-4">
                  <TreeDeciduous className="h-6 w-6 text-forest-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your trees</p>
                  <p className="text-2xl font-bold text-forest-800">42</p>
                </div>
              </div>
            </div>
            
            <div className="bg-forest-50 rounded-lg p-6">
              <div className="flex items-center">
                <div className="bg-forest-100 rounded-full p-3 mr-4">
                  <MapPin className="h-6 w-6 text-forest-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Regions impacted</p>
                  <p className="text-2xl font-bold text-forest-800">3</p>
                </div>
              </div>
            </div>
            
            <div className="bg-forest-50 rounded-lg p-6">
              <div className="flex items-center">
                <div className="bg-forest-100 rounded-full p-3 mr-4">
                  <Award className="h-6 w-6 text-forest-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Impact points</p>
                  <p className="text-2xl font-bold text-forest-800">1,250</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-gray-100 rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-lg text-forest-800">Your forest locations</h2>
              </div>
              <div className="p-4 h-80 bg-forest-50 rounded-b-lg flex items-center justify-center text-muted-foreground">
                Interactive map will be loaded here
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-lg text-forest-800">Upcoming events</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-forest-100 rounded p-2 mr-3">
                      <Calendar className="h-5 w-5 text-forest-600" />
                    </div>
                    <div>
                      <p className="font-medium text-forest-800">Tree planting day</p>
                      <p className="text-sm text-muted-foreground">June 5, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-forest-100 rounded p-2 mr-3">
                      <Calendar className="h-5 w-5 text-forest-600" />
                    </div>
                    <div>
                      <p className="font-medium text-forest-800">Forest monitoring</p>
                      <p className="text-sm text-muted-foreground">July 12, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-forest-100 rounded p-2 mr-3">
                      <Calendar className="h-5 w-5 text-forest-600" />
                    </div>
                    <div>
                      <p className="font-medium text-forest-800">Community meetup</p>
                      <p className="text-sm text-muted-foreground">August 20, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
