import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useGetBusinessModel } from '../hooks/useQueries';
import { Check, Star, Zap, Shield, Globe, Users, TrendingUp, Building2, GraduationCap, Heart, Smartphone, CreditCard, DollarSign } from 'lucide-react';

export function BusinessModelSection() {
  const { data: businessModel, isLoading } = useGetBusinessModel();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading pricing information...</p>
        </div>
      </div>
    );
  }

  if (!businessModel) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Business model information not available.</p>
        </div>
      </div>
    );
  }

  const subscriptionTiers = businessModel.subscriptionTiers;
  const partnershipBenefits = businessModel.partnershipBenefits;
  const flexibleAccessOptions = businessModel.flexibleAccessOptions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Flexible Pricing for Everyone
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              TamriStream offers multiple access options designed specifically for African audiences, 
              ensuring everyone can enjoy authentic African cinema regardless of their budget or payment method.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Heart className="w-4 h-4 mr-2" />
                Free Tier Available
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <DollarSign className="w-4 h-4 mr-2" />
                Low-Cost Premium
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Smartphone className="w-4 h-4 mr-2" />
                Pay-Per-View
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Globe className="w-4 h-4 mr-2" />
                Local Payments
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Business Model Infographic */}
      <div className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Business Model at a Glance
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Visual overview of TamriStream's flexible pricing structure and partnership benefits
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <img 
              src="/assets/generated/business-model-infographic.png" 
              alt="TamriStream Business Model Infographic" 
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Subscription Tiers */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From completely free access to premium features, we have options that work for every budget and viewing preference.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subscriptionTiers.map((tier, index) => {
              const isPopular = tier.name.includes('Premium');
              const isFree = tier.name.includes('Free');
              const isPremium = tier.name.includes('Premium') && !tier.name.includes('Pay-Per-View');
              
              return (
                <Card key={index} className={`relative ${isPopular ? 'border-primary shadow-lg scale-105' : 'border-border'} ${isFree ? 'bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950' : ''}`}>
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                      {isFree && <Heart className="w-8 h-8 text-green-600" />}
                      {isPremium && <Zap className="w-8 h-8 text-primary" />}
                      {tier.name.includes('Pay-Per-View') && <CreditCard className="w-8 h-8 text-accent" />}
                    </div>
                    <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-foreground">
                        ${Number(tier.price)}
                      </span>
                      <span className="text-muted-foreground">
                        {tier.name.includes('Pay-Per-View') ? '/movie' : '/month'}
                      </span>
                    </div>
                    <CardDescription className="mt-2">
                      {tier.accessType} access to TamriStream
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${isPopular ? 'bg-primary hover:bg-primary/90' : ''}`}
                      variant={isPopular ? 'default' : 'outline'}
                    >
                      {isFree ? 'Get Started Free' : isPremium ? 'Start Premium' : 'Browse Movies'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pricing Comparison */}
      <div className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How We Compare to Global Platforms
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See how TamriStream's pricing stacks up against major streaming services
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <img 
              src="/assets/generated/pricing-comparison-interactive.png" 
              alt="Pricing Comparison Chart" 
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900 px-6 py-3 rounded-full">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-green-800 dark:text-green-200 font-medium">
                Up to 75% more affordable than global platforms
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Benefits */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Strategic Partnerships
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our collaborations with African film industries and institutions bring you exclusive content and special benefits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {partnershipBenefits.map((benefit, index) => {
              const getIcon = (type: string) => {
                switch (type) {
                  case 'Film Industry': return Building2;
                  case 'Distribution': return Globe;
                  case 'Education': return GraduationCap;
                  default: return Users;
                }
              };
              
              const Icon = getIcon(benefit.type);
              
              return (
                <Card key={index} className="text-center border-0 bg-gradient-to-br from-card to-card/50">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{benefit.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                    <Badge variant="secondary" className="mt-4">
                      {benefit.type}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center">
            <img 
              src="/assets/generated/african-film-partnerships-banner.jpg" 
              alt="African Film Partnerships" 
              className="w-full max-w-4xl mx-auto h-64 object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Flexible Access Options */}
      <div className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Maximum Flexibility
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We understand that everyone's needs are different. That's why we offer multiple ways to access and pay for content.
            </p>
          </div>

          <Tabs defaultValue="flexibility" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="flexibility">Flexibility</TabsTrigger>
              <TabsTrigger value="access">Access</TabsTrigger>
              <TabsTrigger value="discount">Discounts</TabsTrigger>
              <TabsTrigger value="regional">Regional</TabsTrigger>
            </TabsList>
            
            <TabsContent value="flexibility" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {flexibleAccessOptions
                  .filter(option => option.type === 'Flexibility')
                  .map((option, index) => (
                    <Card key={index} className="border-0 bg-card/50">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Zap className="w-5 h-5 text-primary" />
                          <span>{option.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{option.description}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="access" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {flexibleAccessOptions
                  .filter(option => option.type === 'Access')
                  .map((option, index) => (
                    <Card key={index} className="border-0 bg-card/50">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Shield className="w-5 h-5 text-accent" />
                          <span>{option.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{option.description}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="discount" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {flexibleAccessOptions
                  .filter(option => option.type === 'Discount' || option.type === 'Education')
                  .map((option, index) => (
                    <Card key={index} className="border-0 bg-card/50">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          {option.type === 'Education' ? (
                            <GraduationCap className="w-5 h-5 text-green-600" />
                          ) : (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          )}
                          <span>{option.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{option.description}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="regional" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {flexibleAccessOptions
                  .filter(option => option.type === 'Regional')
                  .map((option, index) => (
                    <Card key={index} className="border-0 bg-card/50">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Globe className="w-5 h-5 text-blue-600" />
                          <span>{option.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{option.description}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose TamriStream?
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <img 
              src="/assets/generated/value-proposition-graphic.png" 
              alt="TamriStream Value Proposition" 
              className="w-full h-auto rounded-2xl shadow-xl mb-8"
            />
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Affordable</h3>
              <p className="text-sm text-muted-foreground">Starting from free with premium options under $3/month</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Local Focus</h3>
              <p className="text-sm text-muted-foreground">Authentic African content with local payment methods</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Flexible</h3>
              <p className="text-sm text-muted-foreground">Multiple access options to fit your lifestyle and budget</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Creator-First</h3>
              <p className="text-sm text-muted-foreground">70% revenue share supporting African filmmakers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users already enjoying authentic African cinema with flexible pricing that works for everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              View All Movies
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground">
            <p>No credit card required • Cancel anytime • Local payment methods accepted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
