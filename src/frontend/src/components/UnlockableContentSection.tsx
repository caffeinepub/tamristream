import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Lock, Unlock, Star, Play, Clock, Trophy, Gift, Sparkles, Film, Music, Users, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface UnlockableItem {
  id: string;
  title: string;
  description: string;
  type: 'movie' | 'music' | 'interview' | 'behind-scenes' | 'early-access';
  isUnlocked: boolean;
  unlockCriteria: {
    type: 'badges' | 'streak' | 'challenges' | 'staking' | 'premiere';
    requirement: string;
    progress: number;
    target: number;
  };
  thumbnailPath: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  estimatedValue: string;
  unlockDate?: string;
}

export function UnlockableContentSection() {
  const [selectedItem, setSelectedItem] = useState<UnlockableItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock unlockable content data
  const unlockableContent: UnlockableItem[] = [
    {
      id: '1',
      title: 'Director\'s Cut: Hearts of Gold',
      description: 'Extended version with 20 minutes of additional footage and director commentary',
      type: 'movie',
      isUnlocked: true,
      unlockCriteria: {
        type: 'badges',
        requirement: 'Earn 5 achievement badges',
        progress: 5,
        target: 5
      },
      thumbnailPath: '/assets/generated/exclusive-content-unlock.png',
      rarity: 'epic',
      estimatedValue: '$4.99',
      unlockDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Exclusive Acoustic Session',
      description: 'Intimate acoustic performance by Kemi Adetiba featuring unreleased tracks',
      type: 'music',
      isUnlocked: false,
      unlockCriteria: {
        type: 'streak',
        requirement: 'Maintain 7-day listening streak',
        progress: 4,
        target: 7
      },
      thumbnailPath: '/assets/generated/african-music-artist-studio.jpg',
      rarity: 'rare',
      estimatedValue: '$2.99'
    },
    {
      id: '3',
      title: 'Behind the Scenes: Desert Warriors',
      description: 'Exclusive documentary showing the making of Desert Warriors in the Sahara',
      type: 'behind-scenes',
      isUnlocked: false,
      unlockCriteria: {
        type: 'challenges',
        requirement: 'Complete 10 daily challenges',
        progress: 7,
        target: 10
      },
      thumbnailPath: '/assets/generated/behind-the-scenes-filmmaking.jpg',
      rarity: 'common',
      estimatedValue: '$1.99'
    },
    {
      id: '4',
      title: 'Early Access: Nollywood Rising',
      description: 'Watch the highly anticipated new release 48 hours before public release',
      type: 'early-access',
      isUnlocked: false,
      unlockCriteria: {
        type: 'staking',
        requirement: 'Stake 100 tokens on African films',
        progress: 65,
        target: 100
      },
      thumbnailPath: '/assets/generated/african-cinema-hero.jpg',
      rarity: 'legendary',
      estimatedValue: '$9.99'
    },
    {
      id: '5',
      title: 'Cast Interview: Love in Accra',
      description: 'Exclusive 30-minute interview with the cast discussing their roles and experiences',
      type: 'interview',
      isUnlocked: true,
      unlockCriteria: {
        type: 'premiere',
        requirement: 'Attend 2 live premiere events',
        progress: 2,
        target: 2
      },
      thumbnailPath: '/assets/generated/guest-qa-interface.png',
      rarity: 'rare',
      estimatedValue: '$3.99',
      unlockDate: '2024-01-20'
    },
    {
      id: '6',
      title: 'Burna Boy Studio Sessions',
      description: 'Rare footage from Burna Boy\'s recording sessions with behind-the-scenes commentary',
      type: 'music',
      isUnlocked: false,
      unlockCriteria: {
        type: 'badges',
        requirement: 'Earn Music Lover badge',
        progress: 0,
        target: 1
      },
      thumbnailPath: '/assets/generated/african-music-artist-studio.jpg',
      rarity: 'epic',
      estimatedValue: '$6.99'
    }
  ];

  const unlockedContent = unlockableContent.filter(item => item.isUnlocked);
  const lockedContent = unlockableContent.filter(item => !item.isUnlocked);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'movie': return <Film className="w-4 h-4" />;
      case 'music': return <Music className="w-4 h-4" />;
      case 'interview': return <Users className="w-4 h-4" />;
      case 'behind-scenes': return <Play className="w-4 h-4" />;
      case 'early-access': return <Clock className="w-4 h-4" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  const handleUnlockAttempt = (item: UnlockableItem) => {
    if (item.unlockCriteria.progress >= item.unlockCriteria.target) {
      toast.success(`${item.title} has been unlocked!`);
    } else {
      toast.info(`Keep going! You need ${item.unlockCriteria.target - item.unlockCriteria.progress} more to unlock this content.`);
    }
  };

  const UnlockableCard = ({ item }: { item: UnlockableItem }) => (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${
      item.isUnlocked ? 'border-green-200 bg-green-50/30' : 'border-border'
    }`}>
      <div className="relative">
        <img
          src={item.thumbnailPath}
          alt={item.title}
          className={`w-full h-48 object-cover rounded-t-lg ${
            !item.isUnlocked ? 'filter grayscale opacity-60' : ''
          }`}
        />
        
        <div className="absolute top-2 left-2">
          <Badge className={getRarityColor(item.rarity)}>
            {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
          </Badge>
        </div>
        
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {item.estimatedValue}
          </Badge>
        </div>
        
        <div className="absolute bottom-2 left-2">
          <Badge className={item.isUnlocked ? 'bg-green-600' : 'bg-gray-600'}>
            {item.isUnlocked ? <Unlock className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
            {item.isUnlocked ? 'Unlocked' : 'Locked'}
          </Badge>
        </div>
        
        <div className="absolute bottom-2 right-2">
          <Badge variant="outline" className="bg-white/90">
            {getTypeIcon(item.type)}
            <span className="ml-1 capitalize">{item.type.replace('-', ' ')}</span>
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {item.description}
        </p>
        
        {!item.isUnlocked && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {item.unlockCriteria.progress}/{item.unlockCriteria.target}
              </span>
            </div>
            <Progress 
              value={(item.unlockCriteria.progress / item.unlockCriteria.target) * 100} 
              className="mb-2"
            />
            <p className="text-xs text-muted-foreground">
              {item.unlockCriteria.requirement}
            </p>
          </div>
        )}
        
        {item.isUnlocked && item.unlockDate && (
          <div className="mb-4">
            <Badge variant="outline" className="text-green-700 border-green-300">
              <Trophy className="w-3 h-3 mr-1" />
              Unlocked on {new Date(item.unlockDate).toLocaleDateString()}
            </Badge>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => setSelectedItem(item)}>
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  {getTypeIcon(item.type)}
                  <span>{item.title}</span>
                  <Badge className={getRarityColor(item.rarity)}>
                    {item.rarity}
                  </Badge>
                </DialogTitle>
                <DialogDescription>{item.description}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <img
                  src={item.thumbnailPath}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Unlock Requirements</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.unlockCriteria.requirement}
                    </p>
                    {!item.isUnlocked && (
                      <Progress 
                        value={(item.unlockCriteria.progress / item.unlockCriteria.target) * 100} 
                        className="mt-2"
                      />
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Content Value</h4>
                    <p className="text-sm text-muted-foreground">
                      Estimated worth: {item.estimatedValue}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Rarity: {item.rarity}
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          {item.isUnlocked ? (
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Play className="w-4 h-4 mr-2" />
              Access Now
            </Button>
          ) : (
            <Button 
              size="sm" 
              variant="secondary"
              onClick={() => handleUnlockAttempt(item)}
            >
              <Lock className="w-4 h-4 mr-2" />
              Unlock
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <Skeleton className="h-10 w-64" />
            </div>
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="text-center">
                <CardContent className="p-6">
                  <Skeleton className="w-8 h-8 mx-auto mb-2" />
                  <Skeleton className="h-8 w-16 mx-auto mb-1" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="w-full h-48 rounded-t-lg" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-2 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Exclusive Content</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlock premium content through engagement, achievements, and community participation
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <Unlock className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{unlockedContent.length}</div>
              <div className="text-sm text-muted-foreground">Unlocked</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Lock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{lockedContent.length}</div>
              <div className="text-sm text-muted-foreground">Available to Unlock</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {unlockableContent.filter(item => item.rarity === 'legendary').length}
              </div>
              <div className="text-sm text-muted-foreground">Legendary Items</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Gift className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                ${unlockableContent.reduce((sum, item) => 
                  sum + parseFloat(item.estimatedValue.replace('$', '')), 0
                ).toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Total Value</div>
            </CardContent>
          </Card>
        </div>

        {/* How to Unlock */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>How to Unlock Exclusive Content</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Earn Badges</h3>
                <p className="text-sm text-muted-foreground">
                  Complete achievements to unlock premium content
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Daily Streaks</h3>
                <p className="text-sm text-muted-foreground">
                  Maintain consistent activity to unlock rewards
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Community Staking</h3>
                <p className="text-sm text-muted-foreground">
                  Support creators to unlock exclusive content
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Play className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Live Events</h3>
                <p className="text-sm text-muted-foreground">
                  Attend premieres and special events
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">High Engagement</h3>
                <p className="text-sm text-muted-foreground">
                  Rate, review, and participate actively
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="unlocked">
              Unlocked ({unlockedContent.length})
            </TabsTrigger>
            <TabsTrigger value="locked">
              Available ({lockedContent.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unlockableContent.map((item) => (
                <UnlockableCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="unlocked" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unlockedContent.map((item) => (
                <UnlockableCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="locked" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lockedContent.map((item) => (
                <UnlockableCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
