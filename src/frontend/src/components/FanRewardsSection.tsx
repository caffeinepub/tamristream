import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Star, Trophy, Zap, Heart, Users, Play, Calendar, Ticket, ShoppingBag, Crown, Award, Target } from 'lucide-react';
import { toast } from 'sonner';

interface UserPoints {
  total: number;
  available: number;
  lifetime: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  nextTierPoints: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: 'content' | 'events' | 'merchandise' | 'experiences';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  isAvailable: boolean;
  isRedeemed: boolean;
  expiresAt?: Date;
}

interface Activity {
  id: string;
  action: string;
  points: number;
  description: string;
  icon: any;
  multiplier?: number;
  isCompleted: boolean;
}

export function FanRewardsSection() {
  const [activeTab, setActiveTab] = useState('rewards');
  const [userPoints, setUserPoints] = useState<UserPoints>({
    total: 2450,
    available: 1850,
    lifetime: 4200,
    tier: 'Gold',
    nextTierPoints: 550
  });

  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      title: 'Exclusive Movie Preview',
      description: 'Get early access to upcoming African films before they\'re released to the public.',
      cost: 500,
      category: 'content',
      rarity: 'rare',
      image: '/assets/generated/exclusive-content-unlock.png',
      isAvailable: true,
      isRedeemed: false,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Virtual Meet & Greet',
      description: 'Join an exclusive virtual meet and greet session with featured African filmmakers and musicians.',
      cost: 1200,
      category: 'events',
      rarity: 'epic',
      image: '/assets/generated/guest-qa-interface.png',
      isAvailable: true,
      isRedeemed: false
    },
    {
      id: '3',
      title: 'Limited Edition T-Shirt',
      description: 'Official TamriStream merchandise featuring exclusive African-inspired designs.',
      cost: 800,
      category: 'merchandise',
      rarity: 'rare',
      image: '/assets/generated/creator-merchandise-storefront.png',
      isAvailable: true,
      isRedeemed: false
    },
    {
      id: '4',
      title: 'Behind-the-Scenes Access',
      description: 'Exclusive behind-the-scenes content and director\'s commentary for popular films.',
      cost: 300,
      category: 'content',
      rarity: 'common',
      image: '/assets/generated/behind-the-scenes-filmmaking.jpg',
      isAvailable: true,
      isRedeemed: false
    },
    {
      id: '5',
      title: 'Film Festival VIP Pass',
      description: 'VIP access to virtual African film festival events with priority seating and exclusive content.',
      cost: 2000,
      category: 'experiences',
      rarity: 'legendary',
      image: '/assets/generated/virtual-film-festival-interface.png',
      isAvailable: true,
      isRedeemed: false
    },
    {
      id: '6',
      title: 'Custom Profile Badge',
      description: 'Exclusive profile badge showing your support for African cinema.',
      cost: 150,
      category: 'content',
      rarity: 'common',
      image: '/assets/generated/achievement-badges-collection.png',
      isAvailable: true,
      isRedeemed: true
    }
  ]);

  const activities: Activity[] = [
    {
      id: '1',
      action: 'Watch a Movie',
      points: 10,
      description: 'Earn points for every movie you watch',
      icon: Play,
      isCompleted: false
    },
    {
      id: '2',
      action: 'Rate & Review',
      points: 25,
      description: 'Share your thoughts and help others discover great content',
      icon: Star,
      isCompleted: false
    },
    {
      id: '3',
      action: 'Join Watch Party',
      points: 50,
      description: 'Participate in community watch parties',
      icon: Users,
      multiplier: 2,
      isCompleted: false
    },
    {
      id: '4',
      action: 'Daily Login',
      points: 5,
      description: 'Visit TamriStream daily to earn bonus points',
      icon: Calendar,
      isCompleted: true
    },
    {
      id: '5',
      action: 'Share Content',
      points: 15,
      description: 'Share your favorite movies and music with friends',
      icon: Heart,
      isCompleted: false
    },
    {
      id: '6',
      action: 'Complete Trivia',
      points: 30,
      description: 'Test your knowledge of African cinema and culture',
      icon: Target,
      isCompleted: false
    }
  ];

  const handleRedeemReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return;

    if (userPoints.available < reward.cost) {
      toast.error('Not enough points to redeem this reward');
      return;
    }

    setUserPoints(prev => ({
      ...prev,
      available: prev.available - reward.cost
    }));

    setRewards(prev => prev.map(r => 
      r.id === rewardId ? { ...r, isRedeemed: true } : r
    ));

    toast.success(`Successfully redeemed ${reward.title}!`);
  };

  const handleCompleteActivity = (activityId: string) => {
    const activity = activities.find(a => a.id === activityId);
    if (!activity) return;

    const pointsEarned = activity.points * (activity.multiplier || 1);
    
    setUserPoints(prev => ({
      ...prev,
      total: prev.total + pointsEarned,
      available: prev.available + pointsEarned,
      lifetime: prev.lifetime + pointsEarned
    }));

    toast.success(`+${pointsEarned} points earned!`);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'content': return Play;
      case 'events': return Calendar;
      case 'merchandise': return ShoppingBag;
      case 'experiences': return Crown;
      default: return Gift;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'text-orange-600 bg-orange-100';
      case 'Silver': return 'text-gray-600 bg-gray-100';
      case 'Gold': return 'text-yellow-600 bg-yellow-100';
      case 'Platinum': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tierProgress = ((userPoints.total % 1000) / 1000) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Gift className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Fan Rewards</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Earn points through your activity and redeem them for exclusive content, merchandise, and unique experiences.
        </p>
      </div>

      {/* Points Overview */}
      <Card className="border-0 bg-gradient-to-br from-primary/10 to-accent/10">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{userPoints.available.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Available Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">{userPoints.lifetime.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Lifetime Points</div>
            </div>
            <div className="text-center">
              <Badge className={`text-lg px-4 py-2 ${getTierColor(userPoints.tier)}`}>
                <Crown className="w-4 h-4 mr-2" />
                {userPoints.tier} Tier
              </Badge>
              <div className="text-sm text-muted-foreground mt-2">Current Tier</div>
            </div>
            <div className="text-center">
              <div className="space-y-2">
                <div className="text-sm font-medium">Next Tier Progress</div>
                <Progress value={tierProgress} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {userPoints.nextTierPoints} points to Platinum
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rewards">Rewards Store</TabsTrigger>
          <TabsTrigger value="activities">Earn Points</TabsTrigger>
          <TabsTrigger value="history">My Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="rewards" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Available Rewards</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">All Categories</Button>
              <Button variant="outline" size="sm">Sort by Points</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.filter(r => !r.isRedeemed).map((reward) => {
              const CategoryIcon = getCategoryIcon(reward.category);
              const canAfford = userPoints.available >= reward.cost;
              
              return (
                <Card key={reward.id} className={`overflow-hidden transition-all hover:shadow-lg ${!canAfford ? 'opacity-60' : ''}`}>
                  <div className="relative">
                    <img
                      src={reward.image}
                      alt={reward.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className={`${getRarityColor(reward.rarity)} border`}>
                        {reward.rarity}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        {reward.category}
                      </Badge>
                    </div>
                    {reward.expiresAt && (
                      <div className="absolute bottom-2 right-2">
                        <Badge variant="destructive" className="text-xs">
                          Expires Soon
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{reward.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {reward.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-bold text-foreground">{reward.cost.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground">points</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleRedeemReward(reward.id)}
                          disabled={!canAfford || !reward.isAvailable}
                        >
                          {canAfford ? 'Redeem' : 'Need More Points'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Ways to Earn Points</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {activities.map((activity) => {
                const Icon = activity.icon;
                
                return (
                  <Card key={activity.id} className={`border-l-4 ${activity.isCompleted ? 'border-l-green-500' : 'border-l-primary'}`}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.isCompleted ? 'bg-green-100 dark:bg-green-900' : 'bg-primary/10'}`}>
                            <Icon className={`w-5 h-5 ${activity.isCompleted ? 'text-green-600' : 'text-primary'}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{activity.action}</h4>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold text-foreground">
                              +{activity.points * (activity.multiplier || 1)}
                            </span>
                          </div>
                          {activity.multiplier && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              {activity.multiplier}x multiplier
                            </Badge>
                          )}
                          {activity.isCompleted ? (
                            <Badge className="bg-green-600 text-white text-xs mt-1">
                              Completed Today
                            </Badge>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-2"
                              onClick={() => handleCompleteActivity(activity.id)}
                            >
                              Start
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Bonus Activities */}
          <Card className="border-0 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                <span>Bonus Point Opportunities</span>
              </CardTitle>
              <CardDescription>
                Special activities with extra point rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h4 className="font-medium text-foreground mb-1">Weekly Challenge</h4>
                  <p className="text-xs text-muted-foreground mb-2">Watch 5 different genres</p>
                  <Badge className="bg-yellow-600 text-white">+200 points</Badge>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-foreground mb-1">Referral Bonus</h4>
                  <p className="text-xs text-muted-foreground mb-2">Invite friends to join</p>
                  <Badge className="bg-blue-600 text-white">+500 points</Badge>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-medium text-foreground mb-1">Monthly Goal</h4>
                  <p className="text-xs text-muted-foreground mb-2">Complete all activities</p>
                  <Badge className="bg-purple-600 text-white">+1000 points</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">My Redeemed Rewards</h3>
            {rewards.filter(r => r.isRedeemed).length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-foreground mb-2">No Rewards Yet</h4>
                  <p className="text-muted-foreground mb-4">
                    Start earning points and redeem your first reward!
                  </p>
                  <Button onClick={() => setActiveTab('activities')}>
                    Start Earning Points
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {rewards.filter(r => r.isRedeemed).map((reward) => {
                  const CategoryIcon = getCategoryIcon(reward.category);
                  
                  return (
                    <Card key={reward.id} className="border-l-4 border-l-green-500">
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={reward.image}
                            alt={reward.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold text-foreground">{reward.title}</h4>
                              <Badge className={`${getRarityColor(reward.rarity)} border`}>
                                {reward.rarity}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{reward.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <CategoryIcon className="w-3 h-3 mr-1" />
                                {reward.category}
                              </span>
                              <span className="flex items-center">
                                <Star className="w-3 h-3 mr-1 text-yellow-500" />
                                {reward.cost} points
                              </span>
                            </div>
                          </div>
                          <Badge className="bg-green-600 text-white">
                            Redeemed
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
