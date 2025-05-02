
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Environmental Activist",
    avatar: "/placeholder.svg",
    content: "The ability to track the growth of my sponsored trees with satellite imagery is incredible. I feel genuinely connected to the impact I'm making."
  },
  {
    name: "Maya Patel",
    role: "Eco-conscious Entrepreneur",
    avatar: "/placeholder.svg",
    content: "I've sponsored trees on behalf of my company, and the gamification elements have gotten our whole team involved. It's a fun way to make a real difference."
  },
  {
    name: "Thomas Chen",
    role: "Teacher",
    avatar: "/placeholder.svg",
    content: "I use ForestImpactHub with my students to teach them about climate action. They love earning badges and watching their trees grow over time."
  },
  {
    name: "Sophia Garcia",
    role: "Tech Professional",
    avatar: "/placeholder.svg",
    content: "The transparency of this platform is what sets it apart. I can actually see where my contribution is going and the progress being made."
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-forest-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-forest-800 mb-4">What Our Community Says</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from people who are making a difference through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-forest-100">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-forest-200 text-forest-700">
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-forest-800">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="italic text-muted-foreground">&ldquo;{testimonial.content}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
