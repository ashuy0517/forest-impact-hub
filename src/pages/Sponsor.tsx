
import Layout from "@/components/layout/Layout";
import SponsorshipPackages from "@/components/home/SponsorshipPackages";
import { Button } from "@/components/ui/button";
import { MapPin, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Sponsor = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-forest-800 mb-4">Sponsor Trees in India</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Make a direct impact on reforestation efforts and earn rewards while doing so.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="bg-forest-100 p-3 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-forest-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Strategic Locations</h3>
            <p className="text-muted-foreground">
              Trees are planted in carefully selected areas across India to maximize ecological impact and restoration.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="bg-forest-100 p-3 rounded-full mb-4">
              <Award className="h-8 w-8 text-forest-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
            <p className="text-muted-foreground">
              Collect points with every tree you sponsor and redeem them for exclusive benefits and merchandise.
            </p>
            <Link to="/rewards" className="mt-4">
              <Button variant="outline" size="sm">View Rewards Program</Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="bg-forest-100 p-3 rounded-full mb-4">
              <Users className="h-8 w-8 text-forest-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Refer Friends</h3>
            <p className="text-muted-foreground">
              Invite friends to join Tree Revive and both of you will receive bonus reward points and trees.
            </p>
            <Link to="/refer" className="mt-4">
              <Button variant="outline" size="sm">Referral Program</Button>
            </Link>
          </div>
        </div>
        
        <SponsorshipPackages />
      </div>
    </Layout>
  );
};

export default Sponsor;
