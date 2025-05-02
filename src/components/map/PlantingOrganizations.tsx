
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TreeDeciduous, Search, Users, Flag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Organization {
  id: number;
  name: string;
  type: "ngo" | "government" | "community";
  location: string;
  treesPlanted: number;
  description: string;
  yearFounded: number;
}

const organizations: Organization[] = [
  {
    id: 1,
    name: "Green India Mission",
    type: "government",
    location: "Delhi, India",
    treesPlanted: 250000,
    description: "National initiative to increase forest cover and improve quality of forests in India.",
    yearFounded: 2014
  },
  {
    id: 2,
    name: "Grow-Trees",
    type: "ngo",
    location: "Mumbai, India",
    treesPlanted: 120000,
    description: "Leading social enterprise for tree plantation, environmental conservation and rural communities.",
    yearFounded: 2010
  },
  {
    id: 3,
    name: "SankalpTaru Foundation",
    type: "ngo",
    location: "Uttarakhand, India",
    treesPlanted: 180000,
    description: "Technology-driven NGO focusing on environmental sustainability through tree plantation.",
    yearFounded: 2012
  },
  {
    id: 4,
    name: "Rajasthan Forest Department",
    type: "government",
    location: "Jaipur, India",
    treesPlanted: 320000,
    description: "State government initiative to increase green cover across Rajasthan's arid regions.",
    yearFounded: 1985
  },
  {
    id: 5,
    name: "Isha Foundation - Cauvery Calling",
    type: "ngo",
    location: "Tamil Nadu, India",
    treesPlanted: 450000,
    description: "Movement to revitalize river Cauvery through large-scale tree planting along the river basin.",
    yearFounded: 2019
  },
  {
    id: 6,
    name: "Kerala Community Forestry",
    type: "community",
    location: "Kerala, India",
    treesPlanted: 95000,
    description: "Community-led initiative to restore and protect the Western Ghats biodiversity.",
    yearFounded: 2013
  },
  {
    id: 7,
    name: "Himalayan Environmental Trust",
    type: "ngo",
    location: "Himachal Pradesh, India",
    treesPlanted: 75000,
    description: "Focused on reforestation of Himalayan slopes to prevent landslides and preserve biodiversity.",
    yearFounded: 2008
  }
];

interface PlantingOrganizationsProps {
  onSelectOrg: (id: number) => void;
  selectedOrgId: number | null;
}

const PlantingOrganizations = ({ onSelectOrg, selectedOrgId }: PlantingOrganizationsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "ngo" | "government" | "community">("all");
  
  const filteredOrgs = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         org.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || org.type === filter;
    return matchesSearch && matchesFilter;
  });
  
  const getOrgIcon = (type: Organization["type"]) => {
    switch(type) {
      case "ngo": return <TreeDeciduous className="h-5 w-5 text-forest-600" />;
      case "government": return <Flag className="h-5 w-5 text-forest-600" />;
      case "community": return <Users className="h-5 w-5 text-forest-600" />;
      default: return <TreeDeciduous className="h-5 w-5 text-forest-600" />;
    }
  };
  
  const getOrgTypeBadge = (type: Organization["type"]) => {
    switch(type) {
      case "ngo": return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">NGO</Badge>;
      case "government": return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Government</Badge>;
      case "community": return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Community</Badge>;
      default: return null;
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="relative">
          <Input
            className="pl-9"
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="flex gap-2 mt-3 flex-wrap">
          <Button 
            size="sm" 
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-forest-600 hover:bg-forest-700" : ""}
          >
            All
          </Button>
          <Button 
            size="sm" 
            variant={filter === "ngo" ? "default" : "outline"}
            onClick={() => setFilter("ngo")}
            className={filter === "ngo" ? "bg-forest-600 hover:bg-forest-700" : ""}
          >
            NGOs
          </Button>
          <Button 
            size="sm" 
            variant={filter === "government" ? "default" : "outline"}
            onClick={() => setFilter("government")}
            className={filter === "government" ? "bg-forest-600 hover:bg-forest-700" : ""}
          >
            Government
          </Button>
          <Button 
            size="sm" 
            variant={filter === "community" ? "default" : "outline"}
            onClick={() => setFilter("community")}
            className={filter === "community" ? "bg-forest-600 hover:bg-forest-700" : ""}
          >
            Community
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y">
          {filteredOrgs.map((org) => (
            <div 
              key={org.id}
              className={`p-4 cursor-pointer hover:bg-forest-50 ${selectedOrgId === org.id ? 'bg-forest-100 border-l-4 border-forest-600' : ''}`}
              onClick={() => onSelectOrg(org.id)}
            >
              <div className="flex items-start">
                <div className="p-2 mr-3 rounded-full bg-forest-50">
                  {getOrgIcon(org.type)}
                </div>
                <div>
                  <h3 className="font-medium text-forest-800">{org.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getOrgTypeBadge(org.type)}
                    <span className="text-sm text-muted-foreground">{org.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{org.description}</p>
                  <div className="mt-2">
                    <span className="text-sm text-forest-700 font-medium">
                      {org.treesPlanted.toLocaleString()} trees planted
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      Est. {org.yearFounded}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredOrgs.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No organizations found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantingOrganizations;
