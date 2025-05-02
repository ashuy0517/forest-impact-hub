
import Layout from "@/components/layout/Layout";
import ForestMap from "@/components/map/ForestMap";
import { Button } from "@/components/ui/button";
import PlantingOrganizations from "@/components/map/PlantingOrganizations";
import { useState } from "react";

const Map = () => {
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 mt-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-forest-800">Tree Planting Initiatives in India</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
            Explore organizations making a difference through reforestation across India.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="lg:col-span-1 border-r border-gray-200">
            <PlantingOrganizations onSelectOrg={(id) => setSelectedOrgId(id)} selectedOrgId={selectedOrgId} />
          </div>
          <div className="lg:col-span-3 h-[600px]">
            <ForestMap height="600px" highlightedLocationId={selectedOrgId} />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button className="bg-forest-600 hover:bg-forest-700">
            Partner with an Organization
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Map;
