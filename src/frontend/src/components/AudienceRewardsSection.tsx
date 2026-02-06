import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Coins, 
  TrendingUp, 
  Users, 
  Gift, 
  Award, 
  Star, 
  Share2, 
  Eye, 
  MessageSquare, 
  Heart,
  Trophy,
  Zap,
  Crown,
  CheckCircle2,
  Globe,
  Copy,
  ExternalLink,
  Info,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  useGetTamriTokenBalance, 
  useGetRewardHistory, 
  useGetReferralStats, 
  useGetNFTCollectibles,
  useGenerateReferralLink,
  useClaimReward
} from '../hooks/useQueries';

export function AudienceRewardsSection() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const { data: tokenBalance = 0, isLoading: balanceLoading } = useGetTamriTokenBalance();
  const { data: rewardHistory = [], isLoading: historyLoading } = useGetRewardHistory();
  const { data: referralStats, isLoading: referralLoading } = useGetReferralStats();
  const { data: nftCollectibles = [], isLoading: nftLoading } = useGetNFTCollectibles();
  const generateReferralLink = useGenerateReferralLink();
  const claimReward = useClaimReward();

  const handleCopyReferralLink = async () => {
    try {
      const link = await generateReferralLink.mutateAsync();
      await navigator.clipboard.writeText(link);
      toast.success('Referral link copied to clipboard!', {
        description: 'Share this link with friends to earn bonus tokens'
      });
    } catch (error) {
      toast.error('Failed to generate referral link');
    }
  };

  const handleClaimReward = async (rewardId: string) => {
    try {
      await claimReward.mutateAsync(rewardId);
      toast.success('Reward claimed successfully!', {
        description: 'Tokens have been added to your balance'
      });
    } catch (error) {
      toast.error('Failed to claim reward');
    }
  };

  const engagementActivities = [
    { id: 'watch', name: 'Watch Content', icon: Eye, tokens: 10, description: 'Earn tokens for watching movies and shows', color: 'text-blue-500' },
    { id: 'rate', name: 'Rate Content', icon: Star, tokens: 5, description: 'Rate movies and music to earn tokens', color: 'text-yellow-500' },
    { id: 'review', name: 'Write Reviews', icon: MessageSquare, tokens: 15, description: 'Detailed reviews earn more tokens', color: 'text-green-500' },
    { id: 'share', name: 'Share Content', icon: Share2, tokens: 8, description: 'Share African content on social media', color: 'text-purple-500' },
    { id: 'favorite', name: 'Add to Favorites', icon: Heart, tokens: 3, description: 'Curate your favorite content', color: 'text-pink-500' },
  ];

  const activeMissions = [
    { 
      id: 'invite-5', 
      title: 'Invite 5 Friends', 
      description: 'Invite 5 friends to join TamriStream', 
      progress: 3, 
      target: 5, 
      reward: 100,
      status: 'active'
    },
    { 
      id: 'share-10', 
      title: 'Share 10 African Movies', 
      description: 'Share 10 African movies internationally', 
      progress: 7, 
      target: 10, 
      reward: 75,
      status: 'active'
    },
    { 
      id: 'referral-convert', 
      title: 'First Referral Conversion', 
      description: 'Get your first friend to subscribe', 
      progress: 0, 
      target: 1, 
      reward: 150,
      status: 'active'
    },
  ];

  const nftCategories = [
    { id: 'posters', name: 'Movie Posters', count: nftCollectibles.filter(n => n.category === 'poster').length, icon: '🎬' },
    { id: 'bts', name: 'Behind-the-Scenes', count: nftCollectibles.filter(n => n.category === 'bts').length, icon: '🎥' },
    { id: 'limited', name: 'Limited Editions', count: nftCollectibles.filter(n => n.category === 'limited').length, icon: '💎' },
    { id: 'artist', name: 'Artist Memorabilia', count: nftCollectibles.filter(n => n.category === 'artist').length, icon: '🎨' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Demo Mode Alert */}
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <Info className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-sm">
            <strong>Demo Mode:</strong> This is a demonstration of the Audience Rewards & Engagement system. 
            Token balances, rewards, and NFTs shown are sample data. Full backend integration coming soon.
          </AlertDescription>
        </Alert>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
              <Coins className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground">Audience Rewards & Engagement</h2>
              <p className="text-muted-foreground">Earn, share, and collect exclusive rewards</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Earn $TAMRI tokens for watching, rating, and sharing African content. Complete referral missions and unlock exclusive NFT collectibles.
          </p>
        </div>

        {/* Token Balance Card */}
        <Card className="border-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 animate-pulse" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex items-center space-x-2">
                  <Coins className="w-6 h-6 text-amber-500" />
                  <span className="text-sm font-medium text-muted-foreground">Your $TAMRI Balance</span>
                  <Badge variant="outline" className="ml-2">Live</Badge>
                </div>
                <div className="flex items-baseline space-x-3">
                  <div className="text-5xl font-bold text-foreground">
                    {balanceLoading ? '...' : tokenBalance.toLocaleString()}
                  </div>
                  <span className="text-2xl text-amber-500 font-semibold">$TAMRI</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  ≈ ${(tokenBalance * 0.05).toFixed(2)} USD • Updated in real-time
                </p>
              </div>
              <div className="flex flex-col space-y-2 w-full md:w-auto">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Withdraw Tokens
                </Button>
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Blockchain
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Earned</p>
                  <p className="text-3xl font-bold text-foreground">{tokenBalance.toLocaleString()}</p>
                  <p className="text-xs text-green-500 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% this week
                  </p>
                </div>
                <div className="p-3 bg-amber-500/10 rounded-xl">
                  <Coins className="w-8 h-8 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Referrals</p>
                  <p className="text-3xl font-bold text-foreground">{referralStats?.totalReferrals || 0}</p>
                  <p className="text-xs text-blue-500 flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {referralStats?.conversions || 0} converted
                  </p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">NFT Collection</p>
                  <p className="text-3xl font-bold text-foreground">{nftCollectibles.length}</p>
                  <p className="text-xs text-purple-500 flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {nftCollectibles.filter(n => n.rarity === 'legendary').length} legendary
                  </p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Gift className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="watch-to-earn" className="flex items-center gap-2 py-3">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Watch-to-Earn</span>
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center gap-2 py-3">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Referrals</span>
            </TabsTrigger>
            <TabsTrigger value="nfts" className="flex items-center gap-2 py-3">
              <Gift className="w-4 h-4" />
              <span className="hidden sm:inline">NFTs</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Recent Activity */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Rewards</span>
                  <Badge variant="outline" className="text-xs">Last 7 days</Badge>
                </CardTitle>
                <CardDescription>Your latest token earnings and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {historyLoading ? (
                    <div className="text-center py-8">
                      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Loading reward history...</p>
                    </div>
                  ) : rewardHistory.length === 0 ? (
                    <div className="text-center py-12">
                      <Coins className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h4 className="text-lg font-semibold text-foreground mb-2">No rewards yet</h4>
                      <p className="text-muted-foreground mb-6">Start engaging with content to earn your first tokens!</p>
                      <Button>
                        <Eye className="w-4 h-4 mr-2" />
                        Browse Movies
                      </Button>
                    </div>
                  ) : (
                    rewardHistory.slice(0, 5).map((reward, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-amber-500/10 rounded-lg">
                            <Coins className="w-5 h-5 text-amber-500" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{reward.activity}</div>
                            <div className="text-sm text-muted-foreground">{reward.timestamp}</div>
                          </div>
                        </div>
                        <Badge className="bg-amber-500 text-black font-semibold">
                          +{reward.tokens} $TAMRI
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-foreground">Start Earning</h4>
                      <p className="text-sm text-muted-foreground">Watch movies and earn tokens instantly</p>
                      <Button size="sm" className="mt-4">
                        <Eye className="w-4 h-4 mr-2" />
                        Browse Content
                      </Button>
                    </div>
                    <Eye className="w-12 h-12 text-blue-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-foreground">Invite Friends</h4>
                      <p className="text-sm text-muted-foreground">Share your referral link and earn bonuses</p>
                      <Button size="sm" className="mt-4" onClick={handleCopyReferralLink}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                    </div>
                    <Users className="w-12 h-12 text-purple-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Watch-to-Earn Tab */}
          <TabsContent value="watch-to-earn" className="space-y-6">
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Earn Tokens Through Engagement</CardTitle>
                <CardDescription>
                  Complete these activities to earn $TAMRI tokens. Higher quality engagement earns more rewards.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {engagementActivities.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <Card key={activity.id} className="border-0 bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              <div className="p-2 bg-amber-500/10 rounded-lg">
                                <IconComponent className={`w-5 h-5 ${activity.color}`} />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-foreground">{activity.name}</div>
                                <div className="text-sm text-muted-foreground mt-1">{activity.description}</div>
                              </div>
                            </div>
                            <Badge className="bg-amber-500 text-black shrink-0 ml-2 font-semibold">
                              +{activity.tokens}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Daily & Weekly Bonuses */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-blue-500" />
                    <span>Daily Bonus</span>
                  </CardTitle>
                  <CardDescription>Consistent daily engagement rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current Streak</span>
                      <span className="text-2xl font-bold text-foreground">7 days 🔥</span>
                    </div>
                    <Progress value={70} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Next milestone: 10 days</span>
                      <Badge className="bg-blue-500 text-white">+50 $TAMRI</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-purple-500" />
                    <span>Weekly Challenge</span>
                  </CardTitle>
                  <CardDescription>Complete weekly goals for bonus tokens</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Watch 20 movies</span>
                      <span className="text-sm font-medium text-foreground">14/20</span>
                    </div>
                    <Progress value={70} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Reward on completion</span>
                      <Badge className="bg-purple-500 text-white">+200 $TAMRI</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Referral Missions Tab */}
          <TabsContent value="referrals" className="space-y-6">
            {/* Referral Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                      <Users className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {referralStats?.totalReferrals || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Referrals</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-green-500/10 rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {referralStats?.conversions || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Conversions</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-amber-500/10 rounded-xl">
                      <Coins className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {referralStats?.tokensEarned || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Tokens Earned</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-purple-500/10 rounded-xl">
                      <Globe className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {referralStats?.internationalShares || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Int'l Shares</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Referral Link */}
            <Card className="border-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Your Referral Link</CardTitle>
                <CardDescription>Share this link to invite friends and earn bonus tokens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm text-foreground overflow-x-auto">
                    {referralStats?.referralLink || 'https://tamristream.com/ref/YOUR_CODE'}
                  </div>
                  <Button onClick={handleCopyReferralLink} disabled={generateReferralLink.isPending}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Active Missions */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Active Referral Missions</span>
                  <Badge variant="outline">{activeMissions.length} active</Badge>
                </CardTitle>
                <CardDescription>Complete these missions to earn bonus tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeMissions.map((mission) => (
                    <Card key={mission.id} className="border-0 bg-muted/50">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-semibold text-foreground flex items-center gap-2">
                                {mission.title}
                                {mission.progress >= mission.target && (
                                  <Badge className="bg-green-500 text-white">Ready to claim!</Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">{mission.description}</div>
                            </div>
                            <Badge className="bg-amber-500 text-black shrink-0 ml-2 font-semibold">
                              +{mission.reward}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="text-foreground font-medium">
                                {mission.progress}/{mission.target}
                              </span>
                            </div>
                            <Progress value={(mission.progress / mission.target) * 100} className="h-2" />
                          </div>
                          {mission.progress >= mission.target ? (
                            <Button 
                              className="w-full bg-green-500 hover:bg-green-600 text-white"
                              onClick={() => handleClaimReward(mission.id)}
                              disabled={claimReward.isPending}
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Claim {mission.reward} $TAMRI
                            </Button>
                          ) : (
                            <Button variant="outline" className="w-full">
                              <ArrowRight className="w-4 h-4 mr-2" />
                              Continue Mission
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <span>Referral Leaderboard</span>
                </CardTitle>
                <CardDescription>Top referrers this month - compete for bonus rewards!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((rank) => (
                    <div key={rank} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                          rank === 1 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-black' :
                          rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-black' :
                          rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                          'bg-muted text-foreground'
                        }`}>
                          {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">User {rank}</div>
                          <div className="text-sm text-muted-foreground">{50 - rank * 5} referrals</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="font-semibold">
                        {(50 - rank * 5) * 50} $TAMRI
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NFT Collectibles Tab */}
          <TabsContent value="nfts" className="space-y-6">
            {/* NFT Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {nftCategories.map((category) => (
                <Card key={category.id} className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <div className="text-3xl font-bold text-foreground">{category.count}</div>
                    <div className="text-sm text-muted-foreground mt-1">{category.name}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* NFT Collection */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your NFT Collection</span>
                  <Badge variant="outline">{nftCollectibles.length} items</Badge>
                </CardTitle>
                <CardDescription>
                  Exclusive collectibles unlocked through engagement and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                {nftLoading ? (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Loading NFT collection...</p>
                  </div>
                ) : nftCollectibles.length === 0 ? (
                  <div className="text-center py-12">
                    <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h4 className="text-xl font-semibold text-foreground mb-2">No NFTs Yet</h4>
                    <p className="text-muted-foreground mb-6">
                      Start engaging with content to unlock exclusive NFT collectibles
                    </p>
                    <Button>
                      <Eye className="w-4 h-4 mr-2" />
                      Explore Content
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {nftCollectibles.map((nft) => (
                      <Card key={nft.id} className="border-0 bg-muted/50 overflow-hidden group cursor-pointer hover:shadow-lg transition-all hover:scale-105">
                        <div className="aspect-square relative">
                          <img 
                            src={nft.imageUrl} 
                            alt={nft.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                            <Button size="sm" variant="secondary" className="w-full">
                              View Details
                            </Button>
                          </div>
                          {nft.rarity && (
                            <Badge className={`absolute top-2 right-2 ${
                              nft.rarity === 'legendary' ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black' :
                              nft.rarity === 'epic' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                              nft.rarity === 'rare' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                              'bg-gray-500 text-white'
                            }`}>
                              {nft.rarity}
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-3">
                          <div className="font-semibold text-sm text-foreground truncate">{nft.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">{nft.category}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Unlock Requirements */}
            <Card className="border-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Unlock More NFTs</CardTitle>
                <CardDescription>Complete these achievements to unlock exclusive collectibles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Watch 100 Movies', progress: 67, target: 100, nft: 'Legendary Movie Poster', icon: '🎬' },
                    { name: 'Refer 10 Friends', progress: 3, target: 10, nft: 'Exclusive Behind-the-Scenes', icon: '🎥' },
                    { name: 'Earn 1000 Tokens', progress: 450, target: 1000, nft: 'Limited Edition Collectible', icon: '💎' },
                    { name: 'Attend 5 Premieres', progress: 2, target: 5, nft: 'Artist Memorabilia', icon: '🎨' },
                  ].map((achievement, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg space-y-3 hover:bg-muted/70 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{achievement.icon}</span>
                          <div>
                            <div className="font-semibold text-foreground">{achievement.name}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Unlock: {achievement.nft}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {achievement.progress}/{achievement.target}
                        </Badge>
                      </div>
                      <Progress value={(achievement.progress / achievement.target) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
