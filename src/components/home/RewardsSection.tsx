
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, GiftIcon, Star, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const RewardsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-forest-800 mb-4">Earn Rewards As You Help The Planet</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our rewarding experience lets you earn points and unlock achievements while making a real difference.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-forest-600 rotate-45 translate-x-8 -translate-y-8"></div>
            <CardContent className="pt-8 pb-8 px-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-forest-100 p-4 rounded-full mb-4">
                  <Star className="h-8 w-8 text-forest-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn Points</h3>
                <p className="text-muted-foreground">
                  Get reward points for every tree you sponsor, referral, and action that helps our mission.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-forest-600 rotate-45 translate-x-8 -translate-y-8"></div>
            <CardContent className="pt-8 pb-8 px-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-forest-100 p-4 rounded-full mb-4">
                  <GiftIcon className="h-8 w-8 text-forest-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Redeem Rewards</h3>
                <p className="text-muted-foreground">
                  Exchange points for eco-friendly merchandise, digital certificates, and unique experiences.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-forest-600 rotate-45 translate-x-8 -translate-y-8"></div>
            <CardContent className="pt-8 pb-8 px-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-forest-100 p-4 rounded-full mb-4">
                  <Award className="h-8 w-8 text-forest-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Unlock Badges</h3>
                <p className="text-muted-foreground">
                  Complete challenges and milestones to earn exclusive badges showing your environmental commitment.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-forest-600 rotate-45 translate-x-8 -translate-y-8"></div>
            <CardContent className="pt-8 pb-8 px-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-forest-100 p-4 rounded-full mb-4">
                  <Leaf className="h-8 w-8 text-forest-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Impact</h3>
                <p className="text-muted-foreground">
                  See how your actions directly contribute to reforestation efforts and carbon reduction.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Link to="/rewards">
            <Button className="bg-forest-600 hover:bg-forest-700">
              Explore Rewards Program
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
