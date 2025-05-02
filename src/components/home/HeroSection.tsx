
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";

const HeroSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-map-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background"></div>
      <div className="relative min-h-[90vh] container mx-auto px-4 py-12 flex flex-col justify-center items-center text-center">
        <div className="animate-grow space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-forest-900 mb-6">
            Plant Trees, <span className="text-forest-600">Track Impact</span>,<br />
            Change the World
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our global community in restoring forests across the planet.
            Sponsor trees, track reforestation with satellite imagery, and earn rewards for your impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-forest-600 hover:bg-forest-700 text-white font-medium px-8 py-6 text-lg"
              size="lg"
            >
              Sponsor Trees Now
            </Button>
            <Button 
              variant="outline" 
              className="border-forest-600 text-forest-600 hover:bg-forest-50 font-medium px-8 py-6 text-lg"
              size="lg"
            >
              Explore Our Impact
            </Button>
          </div>
        </div>
        
        <button 
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-forest-600 hover:text-forest-700 transition-colors"
          aria-label="Scroll to features"
        >
          <ArrowDown className="h-10 w-10 animate-bounce" />
        </button>
      </div>
      <div ref={featuresRef}></div>
    </div>
  );
};

export default HeroSection;
