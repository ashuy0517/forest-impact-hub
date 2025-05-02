
import { TreeDeciduous, Map, Star, Users } from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  const features = [
    {
      icon: <TreeDeciduous className="h-6 w-6 text-forest-600" />,
      title: "Sponsor Reforestation",
      description: "Choose from various tree sponsorship packages to support global reforestation efforts in critical areas.",
    },
    {
      icon: <Map className="h-6 w-6 text-forest-600" />,
      title: "Track with Satellite Imagery",
      description: "Monitor your sponsored trees' growth over time with high-resolution satellite imagery and detailed visual reports.",
    },
    {
      icon: <Star className="h-6 w-6 text-forest-600" />,
      title: "Earn Rewards & Badges",
      description: "Complete challenges, milestone achievements, and earn recognition for your environmental contributions.",
    },
    {
      icon: <Users className="h-6 w-6 text-forest-600" />,
      title: "Join a Global Community",
      description: "Connect with like-minded individuals and organizations committed to forest conservation worldwide.",
    },
  ];

  return (
    <section className="py-16 bg-forest-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-forest-800 mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform makes it easy to participate in reforestation efforts and track the real impact of your contributions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
