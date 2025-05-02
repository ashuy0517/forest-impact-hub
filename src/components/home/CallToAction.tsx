
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 bg-forest-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of others who are restoring our planet's forests, one tree at a time.
          Start your reforestation journey today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg"
            className="bg-white text-forest-700 hover:bg-forest-50"
          >
            Sponsor Trees Now
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-forest-700"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
