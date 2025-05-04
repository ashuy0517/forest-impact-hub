
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Gift, Leaf, Star, TreeDeciduous, Trophy } from "lucide-react";

const rewardItems = [
  {
    id: 1,
    name: "Tree Revive Water Bottle",
    points: 250,
    description: "Eco-friendly stainless steel water bottle with Tree Revive logo",
    image: "water-bottle.jpg",
    category: "merchandise"
  },
  {
    id: 2,
    name: "Digital Tree Certificate",
    points: 100,
    description: "Customized digital certificate for your tree sponsorship",
    image: "certificate.jpg",
    category: "digital"
  },
  {
    id: 3,
    name: "Tree Guardian Badge",
    points: 500,
    description: "Exclusive digital badge for your profile showing your commitment",
    image: "badge.jpg",
    category: "digital"
  },
  {
    id: 4,
    name: "Tree Revive T-Shirt",
    points: 750,
    description: "Organic cotton t-shirt with tree revival design",
    image: "tshirt.jpg",
    category: "merchandise"
  },
  {
    id: 5,
    name: "Virtual Plantation Tour",
    points: 1000,
    description: "Guided virtual tour of the plantation sites where your trees are growing",
    image: "tour.jpg",
    category: "experience"
  },
  {
    id: 6,
    name: "Plant 5 More Trees",
    points: 1200,
    description: "Use your points to plant 5 additional trees in your name",
    image: "trees.jpg",
    category: "impact"
  }
];

const achievements = [
  {
    id: 1,
    name: "First Tree",
    description: "Sponsored your first tree",
    icon: <TreeDeciduous className="h-6 w-6 text-forest-600" />,
    unlocked: true
  },
  {
    id: 2,
    name: "Forest Friends",
    description: "Referred 3 friends who made their first sponsorship",
    icon: <Star className="h-6 w-6 text-forest-600" />,
    unlocked: false,
    progress: 33
  },
  {
    id: 3,
    name: "Ecosystem Guardian",
    description: "Sponsored 50+ trees",
    icon: <Trophy className="h-6 w-6 text-forest-600" />,
    unlocked: false,
    progress: 20
  },
  {
    id: 4,
    name: "Green Commitment",
    description: "Maintain active sponsorship for 6 months",
    icon: <Leaf className="h-6 w-6 text-forest-600" />,
    unlocked: false,
    progress: 50
  }
];

const Rewards = () => {
  // Mock user points
  const userPoints = 350;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-forest-800 mb-4">Rewards & Achievements</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Earn points for your contributions and redeem exciting rewards while tracking your impact.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center">
              <div className="bg-forest-100 p-3 rounded-full mr-4">
                <Award className="h-10 w-10 text-forest-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Points</p>
                <p className="text-3xl font-bold text-forest-800">{userPoints}</p>
              </div>
            </div>
            
            <div className="flex-1 max-w-md">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Level Progress</span>
                <span className="text-sm font-medium text-forest-600">Level 2 (350/500 XP)</span>
              </div>
              <Progress value={70} className="h-3" />
            </div>
            
            <div>
              <Link to="/refer">
                <Button className="bg-forest-600 hover:bg-forest-700">
                  <Gift className="mr-2 h-4 w-4" />
                  Refer a Friend
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="rewards">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
            <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rewards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewardItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="h-48 bg-forest-50 flex items-center justify-center">
                    <Gift className="h-20 w-20 text-forest-300" />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <span className="text-forest-600 font-medium">{item.points} pts</span>
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={userPoints >= item.points ? "default" : "outline"}
                      disabled={userPoints < item.points}
                    >
                      {userPoints >= item.points ? "Redeem" : `Need ${item.points - userPoints} more points`}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`overflow-hidden ${achievement.unlocked ? 'border-forest-500' : ''}`}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className={`p-2 rounded-full ${achievement.unlocked ? 'bg-forest-100' : 'bg-gray-100'}`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {achievement.name}
                        {achievement.unlocked && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                      </CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </div>
                  </CardHeader>
                  
                  {!achievement.unlocked && achievement.progress && (
                    <CardContent>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium">{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </CardContent>
                  )}
                  
                  <CardFooter>
                    <p className={`text-sm ${achievement.unlocked ? 'text-forest-600' : 'text-muted-foreground'}`}>
                      {achievement.unlocked ? 'Achievement unlocked!' : 'Achievement in progress...'}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Rewards;
