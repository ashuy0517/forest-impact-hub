
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const packages = [
  {
    id: "seedling",
    name: "Seedling",
    price: 25,
    description: "Plant 5 trees and begin your reforestation journey",
    features: [
      "Plant 5 native trees",
      "Basic tree growth tracking",
      "Personalized certificate",
      "1 starter badge",
      "25 reward points"
    ],
    popular: false,
    rewardPoints: 25
  },
  {
    id: "forest-builder",
    name: "Forest Builder",
    price: 100,
    description: "Create a mini-forest with 25 trees and enhanced tracking features",
    features: [
      "Plant 25 native trees",
      "Quarterly satellite imagery updates",
      "Detailed impact reports",
      "Premium digital certificate",
      "3 achievement badges",
      "Forest Builder community access",
      "125 reward points"
    ],
    popular: true,
    rewardPoints: 125
  },
  {
    id: "ecosystem-restorer",
    name: "Ecosystem Restorer",
    price: 500,
    description: "Make a significant impact with 150 trees and comprehensive monitoring",
    features: [
      "Plant 150 native trees",
      "Monthly satellite imagery updates",
      "Advanced impact analytics",
      "Personalized impact webpage",
      "All achievement badges",
      "Exclusive restoration events",
      "Name inscription at plantation site",
      "750 reward points"
    ],
    popular: false,
    rewardPoints: 750
  }
];

const SponsorshipPackages = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChoosePackage = (packageItem: typeof packages[0]) => {
    // Store the selected package in session storage to retrieve it in checkout
    sessionStorage.setItem('selectedPackage', JSON.stringify(packageItem));
    
    // Show a toast confirmation
    toast({
      title: `${packageItem.name} package selected!`,
      description: `You'll earn ${packageItem.rewardPoints} reward points with this purchase.`,
      duration: 3000,
    });
    
    // Navigate to checkout page
    navigate('/checkout');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-forest-50" id="packages">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-forest-800 mb-4">Choose Your Impact</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select from our tree sponsorship packages and start making a difference today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card key={index} className={`relative overflow-hidden ${pkg.popular ? 'border-forest-500 shadow-lg' : ''}`}>
              {pkg.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-forest-600 text-white py-1 px-4 text-sm font-medium transform rotate-45 translate-x-6 translate-y-3">
                    Popular
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-forest-800">{pkg.name}</CardTitle>
                <CardDescription>
                  <div className="mt-1">
                    <span className="text-3xl font-bold text-forest-700">${pkg.price}</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">{pkg.description}</p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-forest-600 mr-2 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${pkg.popular ? 'bg-forest-600 hover:bg-forest-700' : ''}`}
                  variant={pkg.popular ? 'default' : 'outline'}
                  onClick={() => handleChoosePackage(pkg)}
                >
                  Choose {pkg.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorshipPackages;
