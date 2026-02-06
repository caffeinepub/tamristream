import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Users, Gift, Vote, Smartphone, ArrowRight, Bell, Calendar } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface FutureFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  expectedRelease: string;
  status: 'Coming Soon' | 'In Development' | 'Beta Testing';
}

export function FutureAddOnsSection() {
  const [notificationSignups, setNotificationSignups] = useState<Set<string>>(new Set());

  const futureFeatures: FutureFeature[] = [
    {
      id: 'nft-ownership',
      title: 'NFT Ownership',
      description: 'Purchase fractional NFTs of your favorite films and earn royalties based on your ownership percentage. Trade NFT shares with other fans in a transparent marketplace.',
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      benefits: [
        'Buy fractional ownership of films',
        'Earn royalties from film revenue',
        'Track earnings in real-time',
        'Trade NFT shares on marketplace',
        'Blockchain-verified ownership'
      ],
      expectedRelease: 'Q2 2025',
      status: 'In Development'
    },
    {
      id: 'referral-system',
      title: 'Referral System',
      description: 'Share your favorite films with friends and earn bonuses when they sign up or watch content. Build your referral network and unlock exclusive rewards.',
      icon: <Users className="w-8 h-8 text-blue-500" />,
      benefits: [
        'Generate unique referral links',
        'Earn bonuses for successful referrals',
        'Track referral performance',
        'Unlock achievement badges',
        'Share across social media'
      ],
      expectedRelease: 'Q3 2025',
      status: 'Coming Soon'
    },
    {
      id: 'community-dao',
      title: 'Community DAO',
      description: 'Participate in platform governance through decentralized voting. Creators can propose platform updates and vote on community fund allocations.',
      icon: <Vote className="w-8 h-8 text-green-500" />,
      benefits: [
        'Vote on platform updates',
        'Propose new features',
        'Allocate community funds',
        'Governance token rewards',
        'Transparent voting records'
      ],
      expectedRelease: 'Q4 2025',
      status: 'Coming Soon'
    },
    {
      id: 'mobile-money',
      title: 'Mobile Money Integration',
      description: 'Withdraw earnings directly to M-Pesa and MTN Mobile Money accounts. Seamless integration with African mobile payment systems for instant payouts.',
      icon: <Smartphone className="w-8 h-8 text-amber-500" />,
      benefits: [
        'Direct M-Pesa withdrawals',
        'MTN Mobile Money support',
        'Instant payout processing',
        'Low transaction fees',
        'Regional payment coverage'
      ],
      expectedRelease: 'Q2 2025',
      status: 'Beta Testing'
    }
  ];

  const handleNotificationSignup = (featureId: string) => {
    if (notificationSignups.has(featureId)) {
      toast.info('You\'re already signed up for notifications about this feature!');
      return;
    }

    setNotificationSignups(prev => new Set(prev).add(featureId));
    toast.success('You\'ll be notified when this feature launches!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Beta Testing':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'In Development':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full border border-purple-500/20">
            <Calendar className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-semibold text-purple-500">Coming Soon</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Future Add-ons
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Exciting new features in development to enhance your TamriStream experience. 
            Sign up for notifications to be the first to know when they launch.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {futureFeatures.map((feature) => (
            <Card 
              key={feature.id} 
              className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <Badge className={getStatusColor(feature.status)}>
                  {feature.status}
                </Badge>
              </div>

              <CardHeader className="space-y-4 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Benefits List */}
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
                    Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expected Release */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Expected Release
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {feature.expectedRelease}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleNotificationSignup(feature.id)}
                      variant={notificationSignups.has(feature.id) ? 'outline' : 'default'}
                      size="sm"
                      className="gap-2"
                    >
                      <Bell className="w-4 h-4" />
                      {notificationSignups.has(feature.id) ? 'Subscribed' : 'Notify Me'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Visual Teaser Banner */}
        <Card className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 border-2 border-purple-500/20">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Be Part of the Future
                </h3>
                <p className="text-muted-foreground">
                  These features are being built based on community feedback. Join our early access program 
                  to test new features before they launch and help shape the future of TamriStream.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Join Early Access
                  </Button>
                  <Button variant="outline" className="gap-2">
                    View Roadmap
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="/assets/generated/future-features-roadmap.dim_1000x700.png"
                  alt="TamriStream future features roadmap visualization"
                  className="rounded-lg shadow-2xl w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Have a feature request? <a href="/creator-portal" className="text-primary hover:underline font-medium">Let us know</a> and help us build the platform you want.
          </p>
        </div>
      </div>
    </section>
  );
}
