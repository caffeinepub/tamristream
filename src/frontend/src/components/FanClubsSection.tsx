import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Users, MessageCircle, Star, Crown, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface FanClub {
  id: string;
  name: string;
  creator: string;
  creatorAvatar: string;
  description: string;
  memberCount: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  benefits: string[];
  isMember: boolean;
  monthlyFee: number;
}

export function FanClubsSection() {
  const [fanClubs, setFanClubs] = useState<FanClub[]>([
    {
      id: '1',
      name: 'Amara\'s Inner Circle',
      creator: 'Amara Okafor',
      creatorAvatar: '/assets/generated/african-filmmaker.jpg',
      description: 'Exclusive access to behind-the-scenes content and early film previews',
      memberCount: 1247,
      tier: 'gold',
      benefits: [
        'Early access to new films',
        'Behind-the-scenes content',
        'Monthly Q&A sessions',
        'Exclusive merchandise discounts'
      ],
      isMember: false,
      monthlyFee: 5
    },
    {
      id: '2',
      name: 'Kemi\'s Music Family',
      creator: 'Kemi Adetiba',
      creatorAvatar: '/assets/generated/african-musician-portrait.jpg',
      description: 'Join the music family for exclusive tracks and live sessions',
      memberCount: 2156,
      tier: 'platinum',
      benefits: [
        'Exclusive unreleased tracks',
        'Live virtual concerts',
        'Personal shoutouts',
        'VIP event access'
      ],
      isMember: true,
      monthlyFee: 10
    }
  ]);

  const handleJoinClub = (clubId: string) => {
    setFanClubs(prev => prev.map(club =>
      club.id === clubId
        ? { ...club, isMember: !club.isMember, memberCount: club.isMember ? club.memberCount - 1 : club.memberCount + 1 }
        : club
    ));
    
    const club = fanClubs.find(c => c.id === clubId);
    if (club) {
      toast.success(club.isMember ? `Left ${club.name}` : `Joined ${club.name}!`);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'bg-orange-100 text-orange-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'platinum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Heart className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Fan Clubs</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join exclusive fan clubs to get closer to your favorite creators and access premium content
          </p>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All Clubs</TabsTrigger>
            <TabsTrigger value="my-clubs">My Clubs</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {fanClubs.map((club) => (
                <Card key={club.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={club.creatorAvatar} />
                          <AvatarFallback>{club.creator[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{club.name}</CardTitle>
                          <CardDescription>by {club.creator}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getTierColor(club.tier)}>
                        <Crown className="w-3 h-3 mr-1" />
                        {club.tier}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <p className="text-sm text-muted-foreground">{club.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {club.memberCount.toLocaleString()} members
                        </span>
                      </div>
                      <span className="font-bold text-primary">${club.monthlyFee}/month</span>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {club.benefits.map((benefit, index) => (
                          <li key={index} className="text-xs text-muted-foreground flex items-start">
                            <Star className="w-3 h-3 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button
                      onClick={() => handleJoinClub(club.id)}
                      variant={club.isMember ? "outline" : "default"}
                      className="w-full"
                    >
                      {club.isMember ? 'Leave Club' : 'Join Club'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-clubs" className="space-y-6">
            {fanClubs.filter(c => c.isMember).length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Fan Clubs Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Join a fan club to get exclusive access to your favorite creators
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {fanClubs.filter(c => c.isMember).map((club) => (
                  <Card key={club.id}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={club.creatorAvatar} />
                          <AvatarFallback>{club.creator[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{club.name}</CardTitle>
                          <CardDescription>Member since Jan 2025</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        View Club Feed
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
