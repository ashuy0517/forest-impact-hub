
import { useState } from "react";
import MapSelector from "../map/MapSelector";

const forestLocations = [
  { id: 1, name: "Amazon Rainforest", lat: -3.4653, lng: -62.2159, trees: 15000, area: "Brazil" },
  { id: 2, name: "Borneo Forest", lat: 0.9619, lng: 114.5548, trees: 8500, area: "Indonesia" },
  { id: 3, name: "Taiga Forest", lat: 60.0000, lng: 105.0000, trees: 12000, area: "Russia" },
  { id: 4, name: "Congo Basin", lat: -0.7832, lng: 23.6558, trees: 9800, area: "Congo" },
  { id: 5, name: "Great Bear Rainforest", lat: 52.8821, lng: -128.1561, trees: 7200, area: "Canada" },
  { id: 6, name: "Daintree Rainforest", lat: -16.2500, lng: 145.4167, trees: 5600, area: "Australia" },
];

const ImpactMap = () => {
  const [activeLocation, setActiveLocation] = useState<number | null>(null);

  const handleLocationHover = (id: number | null) => {
    setActiveLocation(id);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-forest-800 mb-4">Our Global Impact</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our reforestation projects around the world and see the difference we're making together.
          </p>
        </div>

        <div className="bg-forest-50 rounded-lg overflow-hidden shadow-lg">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 p-6 space-y-4 overflow-y-auto max-h-[500px]">
              <h3 className="font-semibold text-xl text-forest-800 mb-4">
                Project Locations
              </h3>
              <div className="space-y-3">
                {forestLocations.map((location) => (
                  <div 
                    key={location.id}
                    className={`p-4 rounded-md cursor-pointer transition-colors ${
                      activeLocation === location.id ? 'bg-forest-100 border-l-4 border-forest-600' : 'hover:bg-forest-50'
                    }`}
                    onMouseEnter={() => handleLocationHover(location.id)}
                    onMouseLeave={() => handleLocationHover(null)}
                  >
                    <h4 className="font-medium text-forest-800">{location.name}</h4>
                    <p className="text-sm text-muted-foreground">{location.area}</p>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-forest-700">Trees planted: {location.trees.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-2/3 relative overflow-hidden">
              <MapSelector locations={forestLocations} height="500px" highlightedLocationId={activeLocation} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMap;
