
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Users, Gift, Trophy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReferralProgram = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // Mock referral code
  const referralCode = "TREEREVIVE2025";
  const referralLink = `https://treerevive.com/signup?ref=${referralCode}`;
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    
    toast({
      title: `${type} copied!`,
      description: "Share it with your friends and earn rewards together.",
      duration: 3000,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-forest-800 mb-4">Refer Friends, Plant Trees Together</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Invite your friends to join Tree Revive and earn rewards for both of you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-forest-100 p-3 rounded-full">
                  <Users className="h-8 w-8 text-forest-600" />
                </div>
              </div>
              <CardTitle>Invite Friends</CardTitle>
              <CardDescription>
                Share your unique referral link or code with friends
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-forest-100 p-3 rounded-full">
                  <Gift className="h-8 w-8 text-forest-600" />
                </div>
              </div>
              <CardTitle>They Join & Plant</CardTitle>
              <CardDescription>
                When they sign up and make their first sponsorship
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-forest-100 p-3 rounded-full">
                  <Trophy className="h-8 w-8 text-forest-600" />
                </div>
              </div>
              <CardTitle>Both Get Rewarded</CardTitle>
              <CardDescription>
                You both receive 100 reward points and an extra tree planted
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        
        <Card className="max-w-2xl mx-auto mb-12">
          <CardHeader>
            <CardTitle>Your Referral Information</CardTitle>
            <CardDescription>
              Share these with your friends to earn rewards together
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">Your Referral Code</label>
              <div className="flex">
                <Input value={referralCode} readOnly className="rounded-r-none" />
                <Button 
                  variant="outline" 
                  className="rounded-l-none border-l-0"
                  onClick={() => copyToClipboard(referralCode, "Referral code")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-2">Your Referral Link</label>
              <div className="flex">
                <Input value={referralLink} readOnly className="rounded-r-none text-xs sm:text-sm" />
                <Button 
                  variant="outline" 
                  className="rounded-l-none border-l-0"
                  onClick={() => copyToClipboard(referralLink, "Referral link")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start">
            <p className="text-sm text-muted-foreground">
              You can also share directly to social media platforms
            </p>
            <div className="flex gap-4 mt-4">
              <Button variant="outline" size="sm">
                Facebook
              </Button>
              <Button variant="outline" size="sm">
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                WhatsApp
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
            <TabsTrigger value="active">Active Referrals</TabsTrigger>
            <TabsTrigger value="history">Reward History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Referrals</CardTitle>
                <CardDescription>
                  Friends who have signed up using your referral
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Rahul Sharma</p>
                      <p className="text-sm text-muted-foreground">Joined 3 days ago</p>
                    </div>
                    <div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs py-1 px-2 rounded">Pending Purchase</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Priya Patel</p>
                      <p className="text-sm text-muted-foreground">Joined 1 week ago</p>
                    </div>
                    <div>
                      <span className="bg-green-100 text-green-800 text-xs py-1 px-2 rounded">Reward Earned</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Reward History</CardTitle>
                <CardDescription>
                  Points and trees earned through referrals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border-b">
                    <div>
                      <p className="font-medium">Priya Patel referred</p>
                      <p className="text-sm text-muted-foreground">May 2, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-forest-600">+100 points</p>
                      <p className="text-sm text-muted-foreground">+1 tree planted</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border-b">
                    <div>
                      <p className="font-medium">Amit Kumar referred</p>
                      <p className="text-sm text-muted-foreground">April 15, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-forest-600">+100 points</p>
                      <p className="text-sm text-muted-foreground">+1 tree planted</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Total earned: 200 points, 2 trees planted
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ReferralProgram;
