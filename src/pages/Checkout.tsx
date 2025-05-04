
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, TreeDeciduous } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface PackageDetails {
  id: string;
  name: string;
  price: number;
  description: string;
  rewardPoints: number;
}

const Checkout = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackageDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      referralCode: ""
    }
  });

  useEffect(() => {
    // Load the selected package from session storage
    const storedPackage = sessionStorage.getItem('selectedPackage');
    if (storedPackage) {
      setSelectedPackage(JSON.parse(storedPackage));
    } else {
      // If no package is selected, redirect to sponsor page
      navigate('/sponsor');
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success!
    toast({
      title: "Payment successful!",
      description: "Thank you for your contribution to reforestation.",
      duration: 5000,
    });
    
    // Simulate addition of reward points to account
    toast({
      title: "Rewards added!",
      description: `You've earned ${selectedPackage?.rewardPoints} points.`,
      duration: 5000,
    });
    
    setIsProcessing(false);
    
    // Clear the selected package from session storage
    sessionStorage.removeItem('selectedPackage');
    
    // Navigate to dashboard or success page
    navigate('/dashboard');
  };

  if (!selectedPackage) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 mt-12 flex justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-forest-600 mx-auto"></div>
            <p className="mt-4">Loading your package details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-forest-800">Complete Your Sponsorship</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
            You're just a few steps away from making a positive impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Package details and rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TreeDeciduous className="h-5 w-5 text-forest-600 mr-2" />
                      <span className="font-medium">{selectedPackage.name}</span>
                    </div>
                    <span>${selectedPackage.price.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${selectedPackage.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between font-bold">
                    <span>Total</span>
                    <span>${selectedPackage.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-4 bg-forest-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-forest-700">
                      You'll earn {selectedPackage.rewardPoints} reward points with this purchase!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Enter your payment details securely</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="mb-4">
                          <Label>Payment Method</Label>
                          <RadioGroup 
                            value={paymentMethod} 
                            onValueChange={setPaymentMethod}
                            className="grid grid-cols-3 gap-4 mt-2"
                          >
                            <div>
                              <RadioGroupItem 
                                value="credit-card" 
                                id="credit-card" 
                                className="peer sr-only" 
                              />
                              <Label
                                htmlFor="credit-card"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-forest-600"
                              >
                                <CreditCard className="mb-2 h-5 w-5" />
                                <span className="text-sm font-medium">Credit Card</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        {paymentMethod === "credit-card" && (
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="cardName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name on Card</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" {...field} required />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="cardNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Card Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="1234 5678 9012 3456" {...field} required />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="expiryDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Expiry Date</FormLabel>
                                    <FormControl>
                                      <Input placeholder="MM/YY" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="cvv"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Security Code (CVV)</FormLabel>
                                    <FormControl>
                                      <Input placeholder="123" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Separator />
                      
                      <FormField
                        control={form.control}
                        name="referralCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Have a referral code?</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter referral code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-forest-600 hover:bg-forest-700" 
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        `Pay $${selectedPackage.price.toFixed(2)}`
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex-col items-start">
                <p className="text-xs text-muted-foreground">
                  Your payment information is encrypted and secure. We never store your full credit card details.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
