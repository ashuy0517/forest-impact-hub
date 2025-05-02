
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-forest-100 h-full">
      <CardHeader>
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest-100">
          {icon}
        </div>
        <CardTitle className="text-xl text-forest-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground text-base">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
