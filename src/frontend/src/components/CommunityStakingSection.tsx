import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllMovies, useGetAllArtistProfiles } from '../hooks/useQueries';
import { Coins, TrendingUp, Users, Star, Clock, Gift, Trophy, Film, Music, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { toast } from 'sonner';

interface StakingPool {
  id: string;
  title: string;
  type: 'movie' | 'artist';
  creator: string;
  description: string;
  totalStaked: number;
  stakersCount: number;
  apy: number;
  minStake: number;
  duration: string;
  rewards: string[];
  thumbnailPath: string;
  isActive: boolean;
  endDate: string;
  userStaked?: number;
}

interface UserStake {
  poolId: string;
  amount: number;
  startDate: string;
  expectedRewards: number;
  status: 'active' | 'completed' | 'cooldown';
}

export function CommunityStakingSection() {
  const { data: movies = [], isLoading: moviesLoading } = useGetAllMovies();
  const { data: artists = [], isLoading: artistsLoading } = useGetAllArtistProfiles();
  const [selectedPool, setSelectedPool] = useState<StakingPool | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeDuration, setStakeDuration] = useState('30');
  const [userBalance] = useState(1250); // Mock user token balance

  const isLoading = moviesLoading || artistsLoading;

  // Mock staking pools data
  const stakingPools: StakingPool[] = [
    {
      id: '1',
      title: 'Hearts of Gold',
      type: 'movie',
      creator: 'Amara Okafor',
      description: 'Support this powerful drama and earn exclusive rewards',
      totalStaked: 15420,
      stakersCount: 89,
      apy: 12.5,
      minStake: 10,
      duration: '30-90 days',
      rewards: ['Director Commentary', 'Behind-the-scenes', 'Early Access'],
      thumbnailPath: '/assets/generated/community-staking-filmmaker.jpg',
      isActive: true,
      endDate: '2024-03-15',
      userStaked: 50
    },
    {
      id: '2',
      title: 'Kemi Adetiba',
      type: 'artist',
      creator: 'Kemi Adetiba',
      description: 'Stake on rising Afrobeats star and support her next album',
      totalStaked: 8750,
      stakersCount: 156,
      apy: 15.2,
      minStake: 5,
      duration: '60-120 days',
      rewards: ['Exclusive Tracks', 'Concert Tickets', 'Meet & Greet'],
      thumbnailPath: '/assets/generated/african-musician-portrait.jpg',
      isActive: true,
      endDate: '2024-04-20'
    },
    {
      id: '3',
      title: 'Desert Warriors',
      type: 'movie',
      creator: 'Kwame Asante',
      description: 'Epic adventure film seeking community support for sequel',
      totalStaked: 22100,
      stakersCount: 203,
      apy: 10.8,
      minStake: 25,
      duration: '45-180 days',
      rewards: ['Sequel Early Access', 'Cast Interviews', 'Props NFTs'],
      thumbnailPath: '/assets/generated/african-action-poster.jpg',
      isActive: true,
      endDate: '2024-05-10'
    },
    {
      id: '4',
      title: 'Burna Boy',
      type: 'artist',
      creator: 'Burna Boy',
      description: 'Support the Grammy winner\'s upcoming documentary project',
      totalStaked: 45600,
      stakersCount: 312,
      apy: 18.5,
      minStake: 50,
      duration: '90-365 days',
      rewards: ['Documentary Access', 'Studio Sessions', 'VIP Events'],
      thumbnailPath: '/assets/generated/african-musician-portrait.jpg',
      isActive: true,
      endDate: '2024-06-30'
    }
  ];

  // Mock user stakes
  const userStakes: UserStake[] = [
    {
      poolId: '1',
      amount: 50,
      startDate: '2024-01-15',
      expectedRewards: 6.25,
      status: 'active'
    }
  ];

  const moviePools = stakingPools.filter(pool => pool.type === 'movie');
  const artistPools = stakingPools.filter(pool => pool.type === 'artist');

  const handleStake = () => {
    const amount = parseFloat(stakeAmount);
    if (!selectedPool || !amount || amount < selectedPool.minStake) {
      toast.error(`Minimum stake is ${selectedPool?.minStake} tokens`);
      return;
    }
    if (amount > userBalance) {
      toast.error('Insufficient balance');
      return;
    }

    toast.success(`Successfully staked ${amount} tokens on ${selectedPool.title}!`);
    setStakeAmount('');
    setSelectedPool(null);
  };

  const handleUnstake = (poolId: string) => {
    toast.info('Unstaking initiated. Tokens will be available after cooldown period.');
  };

  const StakingPoolCard = ({ pool }: { pool: StakingPool }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50">
      <div className="relative">
        <img
          src={pool.thumbnailPath}
          alt={pool.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-green-600 text-white">
            {pool.apy}% APY
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge className={pool.type === 'movie' ? 'bg-blue-600' : 'bg-purple-600'}>
            {pool.type === 'movie' ? <Film className="w-3 h-3 mr-1" /> : <Music className="w-3 h-3 mr-1" />}
            {pool.type === 'movie' ? 'Film' : 'Artist'}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{pool.title}</h3>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{pool.stakersCount}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">
          by {pool.creator}
        </p>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {pool.description}
        </p>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Staked</span>
            <span className="font-medium">{pool.totalStaked.toLocaleString()} tokens</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Min Stake</span>
            <span className="font-medium">{pool.minStake} tokens</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-medium">{pool.duration}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <Label className="text-sm font-medium mb-2 block">Rewards</Label>
          <div className="flex flex-wrap gap-1">
            {pool.rewards.slice(0, 2).map((reward, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {reward}
              </Badge>
            ))}
            {pool.rewards.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{pool.rewards.length - 2} more
              </Badge>
            )}
          </div>
        </div>
        
        {pool.userStaked && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-800">Your Stake</span>
              <span className="text-sm font-bold text-green-800">{pool.userStaked} tokens</span>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => setSelectedPool(pool)}>
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  {pool.type === 'movie' ? <Film className="w-5 h-5" /> : <Music className="w-5 h-5" />}
                  <span>{pool.title}</span>
                  <Badge className="bg-green-600 text-white">
                    {pool.apy}% APY
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Stake tokens to support {pool.creator} and earn rewards
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <img
                  src={pool.thumbnailPath}
                  alt={pool.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Pool Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Staked:</span>
                        <span className="font-medium">{pool.totalStaked.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stakers:</span>
                        <span className="font-medium">{pool.stakersCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>APY:</span>
                        <span className="font-medium text-green-600">{pool.apy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>End Date:</span>
                        <span className="font-medium">{new Date(pool.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Rewards</h4>
                    <div className="space-y-1">
                      {pool.rewards.map((reward, index) => (
                        <Badge key={index} variant="outline" className="block text-center">
                          {reward}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="stake-amount">Stake Amount (tokens)</Label>
                    <Input
                      id="stake-amount"
                      type="number"
                      placeholder={`Min: ${pool.minStake}`}
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      min={pool.minStake}
                      max={userBalance}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Balance: {userBalance} tokens
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="stake-duration">Stake Duration</Label>
                    <Select value={stakeDuration} onValueChange={setStakeDuration}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days (Base APY)</SelectItem>
                        <SelectItem value="60">60 days (+2% APY)</SelectItem>
                        <SelectItem value="90">90 days (+4% APY)</SelectItem>
                        <SelectItem value="180">180 days (+6% APY)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={handleStake} className="w-full bg-primary hover:bg-primary/90">
                    <Coins className="w-4 h-4 mr-2" />
                    Stake Tokens
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          {pool.userStaked ? (
            <Button 
              size="sm" 
              variant="secondary"
              onClick={() => handleUnstake(pool.id)}
            >
              <ArrowDownRight className="w-4 h-4 mr-2" />
              Unstake
            </Button>
          ) : (
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => setSelectedPool(pool)}
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Stake
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
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Community Staking</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Support your favorite creators and earn rewards through community-driven staking
          </p>
        </div>

        {/* User Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <Wallet className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userBalance.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Available Tokens</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {userStakes.reduce((sum, stake) => sum + stake.amount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Staked</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Gift className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {userStakes.reduce((sum, stake) => sum + stake.expectedRewards, 0).toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Expected Rewards</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStakes.length}</div>
              <div className="text-sm text-muted-foreground">Active Stakes</div>
            </CardContent>
          </Card>
        </div>

        {/* How Staking Works */}
        <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Coins className="w-5 h-5 text-yellow-600" />
              <span>How Community Staking Works</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Coins className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold mb-2">Stake Tokens</h3>
                <p className="text-sm text-muted-foreground">
                  Choose creators to support and stake your tokens
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold mb-2">Earn Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Get token rewards and exclusive creator content
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold mb-2">Support Creators</h3>
                <p className="text-sm text-muted-foreground">
                  Help fund new projects and creative endeavors
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold mb-2">Unlock Benefits</h3>
                <p className="text-sm text-muted-foreground">
                  Access exclusive content and special privileges
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Staking Pools */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Pools</TabsTrigger>
            <TabsTrigger value="movies">Movies ({moviePools.length})</TabsTrigger>
            <TabsTrigger value="artists">Artists ({artistPools.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stakingPools.map((pool) => (
                <StakingPoolCard key={pool.id} pool={pool} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="movies" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moviePools.map((pool) => (
                <StakingPoolCard key={pool.id} pool={pool} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="artists" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artistPools.map((pool) => (
                <StakingPoolCard key={pool.id} pool={pool} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* My Stakes */}
        {userStakes.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>My Active Stakes</CardTitle>
              <CardDescription>Track your staking positions and rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userStakes.map((stake, index) => {
                  const pool = stakingPools.find(p => p.id === stake.poolId);
                  if (!pool) return null;
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={pool.thumbnailPath}
                          alt={pool.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">{pool.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Staked: {stake.amount} tokens
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">
                          +{stake.expectedRewards} tokens
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Expected rewards
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUnstake(stake.poolId)}
                      >
                        Unstake
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
