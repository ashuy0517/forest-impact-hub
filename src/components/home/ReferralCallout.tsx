
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";

const ReferralCallout = () => {
  return (
    <section className="py-16 bg-forest-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block bg-forest-100 rounded-full p-3 mb-4">
                <Users className="h-6 w-6 text-forest-600" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-forest-800 mb-4">
                Invite Friends, Grow Forests Together
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6">
                When your friends join Tree Revive and make their first sponsorship, you both earn 100 reward points and an extra tree planted in your names.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/refer">
                  <Button className="bg-forest-600 hover:bg-forest-700">
                    Start Referring
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                <Link to="/rewards">
                  <Button variant="outline">Learn About Rewards</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-forest-600 p-8 md:p-12 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl font-bold mb-2">2x</div>
                <div className="text-xl mb-6">The Impact</div>
                <p className="mb-4">
                  For every friend who joins, twice as many trees get planted and twice as many points get earned!
                </p>
                <div className="flex justify-center space-x-2">
                  <div className="bg-white/20 p-3 rounded">
                    <p className="font-bold text-2xl">100</p>
                    <p className="text-xs">Points for You</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <p className="font-bold text-2xl">+</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <p className="font-bold text-2xl">100</p>
                    <p className="text-xs">Points for Friend</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralCallout;
