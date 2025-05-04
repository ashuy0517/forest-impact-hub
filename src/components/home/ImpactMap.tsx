
import { useState } from "react";
import MapSelector from "../map/MapSelector";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, TreePine } from "lucide-react";

const forestLocations = [
  { id: 1, name: "Amazon Rainforest", lat: -3.4653, lng: -62.2159, trees: 15000, area: "Brazil", co2: 300, water: 45000, habitats: 120 },
  { id: 2, name: "Borneo Forest", lat: 0.9619, lng: 114.5548, trees: 8500, area: "Indonesia", co2: 170, water: 25500, habitats: 85 },
  { id: 3, name: "Taiga Forest", lat: 60.0000, lng: 105.0000, trees: 12000, area: "Russia", co2: 240, water: 36000, habitats: 95 },
  { id: 4, name: "Congo Basin", lat: -0.7832, lng: 23.6558, trees: 9800, area: "Congo", co2: 196, water: 29400, habitats: 78 },
  { id: 5, name: "Great Bear Rainforest", lat: 52.8821, lng: -128.1561, trees: 7200, area: "Canada", co2: 144, water: 21600, habitats: 72 },
  { id: 6, name: "Daintree Rainforest", lat: -16.2500, lng: 145.4167, trees: 5600, area: "Australia", co2: 112, water: 16800, habitats: 56 },
];

const ImpactMap = () => {
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleLocationHover = (id: number | null) => {
    setActiveLocation(id);
  };

  const handleViewAllClick = () => {
    navigate('/map');
  };

  const activeLocationData = activeLocation 
    ? forestLocations.find(loc => loc.id === activeLocation) 
    : null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe className="h-6 w-6 text-forest-600" />
            <h2 className="text-3xl font-bold text-forest-800">Our Global Impact</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our reforestation projects around the world and see the difference we're making together.
          </p>
        </div>

        <div className="bg-forest-50 rounded-lg overflow-hidden shadow-lg border border-forest-100">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 p-6 space-y-2 overflow-y-auto max-h-[500px] bg-white border-r border-forest-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-xl text-forest-800">
                  Project Locations
                </h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-forest-600 border-forest-200 hover:bg-forest-50"
                  onClick={handleViewAllClick}
                >
                  View all
                </Button>
              </div>
              <div className="space-y-3">
                {forestLocations.map((location) => (
                  <div 
                    key={location.id}
                    className={`p-4 rounded-md cursor-pointer transition-all duration-200 ${
                      activeLocation === location.id 
                      ? 'bg-forest-100 border-l-4 border-forest-600 shadow-sm' 
                      : 'hover:bg-forest-50 hover:border-l-4 hover:border-forest-200 border-l-4 border-transparent'
                    }`}
                    onMouseEnter={() => handleLocationHover(location.id)}
                    onMouseLeave={() => handleLocationHover(null)}
                  >
                    <h4 className="font-medium text-forest-800 flex items-center gap-2">
                      <TreePine className="h-4 w-4 text-forest-600" />
                      {location.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{location.area}</p>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-forest-700 font-medium">Trees: {location.trees.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-2/3 relative">
              <MapSelector locations={forestLocations} height="500px" highlightedLocationId={activeLocation} />
              
              {activeLocationData && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md border border-forest-100">
                  <h4 className="font-medium text-forest-800 mb-2">{activeLocationData.name} Impact</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">CO₂ Captured</p>
                      <p className="font-bold text-forest-700">{activeLocationData.co2} tons</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Water Conserved</p>
                      <p className="font-bold text-forest-700">{activeLocationData.water.toLocaleString()} L</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Habitats Created</p>
                      <p className="font-bold text-forest-700">{activeLocationData.habitats}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMap;
