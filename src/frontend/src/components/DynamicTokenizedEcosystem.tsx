import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Coins, 
  Award, 
  TrendingUp, 
  Wallet, 
  Gift,
  Zap,
  Trophy,
  Star,
  Info,
  ArrowUpRight,
  DollarSign,
  Lock,
  Unlock,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export function DynamicTokenizedEcosystem() {
  const [tipAmount, setTipAmount] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');

  const mockWalletData = {
    tamriBalance: 5420,
    creatorTokens: [
      { name: 'GENN', creator: 'Genevieve Nnaji', balance: 150, value: 450 },
      { name: 'BURNA', creator: 'Burna Boy', balance: 200, value: 800 },
      { name: 'LUPITA', creator: 'Lupita Nyong\'o', balance: 100, value: 350 },
    ],
    nftBadges: [
      { id: '1', name: 'Early Supporter', rarity: 'legendary', tier: 'gold', unlocked: true },
      { id: '2', name: 'Community Champion', rarity: 'epic', tier: 'silver', unlocked: true },
      { id: '3', name: 'Content Curator', rarity: 'rare', tier: 'bronze', unlocked: true },
      { id: '4', name: 'Cultural Ambassador', rarity: 'legendary', tier: 'gold', unlocked: false },
    ],
    stakingPools: [
      { creator: 'Genevieve Nnaji', staked: 500, rewards: 45, apy: 12 },
      { creator: 'Burna Boy', staked: 750, rewards: 82, apy: 15 },
    ],
    rewardTiers: [
      { tier: 'Bronze', minTokens: 100, benefits: ['Basic NFT badges', 'Community access'], current: true },
      { tier: 'Silver', minTokens: 500, benefits: ['Exclusive content', 'Early access'], current: true },
      { tier: 'Gold', minTokens: 1000, benefits: ['VIP events', 'Creator meet & greets'], current: true },
      { tier: 'Platinum', minTokens: 5000, benefits: ['All benefits', 'Governance voting'], current: true },
    ]
  };

  const handleTip = () => {
    if (!tipAmount || parseFloat(tipAmount) <= 0) {
      toast.error('Please enter a valid tip amount');
      return;
    }
    toast.success(`Tipped ${tipAmount} TAMRI tokens!`);
    setTipAmount('');
  };

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast.error('Please enter a valid stake amount');
      return;
    }
    toast.success(`Staked ${stakeAmount} tokens successfully!`);
    setStakeAmount('');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Dynamic Tokenized Ecosystem</h1>
            <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">Enhanced</Badge>
          </div>
          <p className="text-muted-foreground">
            Creator tokens, NFT badges, tipping, and advanced staking features
          </p>
        </div>

        {/* Demo Alert */}
        <Alert className="mb-6 border-amber-500 bg-amber-950/20">
          <Info className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200">
            <strong>Tokenized Ecosystem Preview:</strong> This enhanced wallet system supports creator tokens, NFT badges, multi-token tipping, and advanced staking with social reward tiers.
          </AlertDescription>
        </Alert>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Wallet className="w-4 h-4 text-amber-500" />
                TAMRI Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockWalletData.tamriBalance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Platform tokens</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Coins className="w-4 h-4 text-blue-500" />
                Creator Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockWalletData.creatorTokens.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Different creators</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-500" />
                NFT Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockWalletData.nftBadges.filter(b => b.unlocked).length}/{mockWalletData.nftBadges.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Unlocked badges</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Staking Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockWalletData.stakingPools.reduce((sum, pool) => sum + pool.rewards, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Pending rewards</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tokens" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tokens">Creator Tokens</TabsTrigger>
            <TabsTrigger value="badges">NFT Badges</TabsTrigger>
            <TabsTrigger value="tipping">Tipping</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
          </TabsList>

          {/* Creator Tokens Tab */}
          <TabsContent value="tokens" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Creator Tokens</CardTitle>
                <CardDescription>
                  Support your favorite creators by holding their tokens and earn exclusive benefits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockWalletData.creatorTokens.map((token, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="font-mono">${token.name}</Badge>
                          <span className="font-semibold">{token.creator}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Balance: {token.balance} tokens
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">${token.value}</div>
                        <p className="text-xs text-muted-foreground">Est. value</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trade
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Zap className="w-3 h-3 mr-1" />
                        Stake
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Gift className="w-3 h-3 mr-1" />
                        Send
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">How Creator Tokens Work</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Coins className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <p>Each creator can mint their own tokens representing their brand and content</p>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <p>Token value increases with creator success and community engagement</p>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                  <p>Holding tokens grants access to exclusive content, voting rights, and special perks</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NFT Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>NFT Badge Collection</CardTitle>
                <CardDescription>
                  Earn exclusive NFT badges through engagement and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockWalletData.nftBadges.map((badge) => (
                    <div 
                      key={badge.id} 
                      className={`p-4 border rounded-lg ${badge.unlocked ? 'bg-gradient-to-br from-amber-950/20 to-orange-950/20 border-amber-500/30' : 'opacity-50'}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {badge.unlocked ? (
                            <Unlock className="w-5 h-5 text-amber-500" />
                          ) : (
                            <Lock className="w-5 h-5 text-muted-foreground" />
                          )}
                          <div>
                            <h4 className="font-semibold">{badge.name}</h4>
                            <p className="text-xs text-muted-foreground capitalize">{badge.rarity}</p>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={
                            badge.tier === 'gold' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                            badge.tier === 'silver' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                            'bg-orange-500/10 text-orange-500 border-orange-500/20'
                          }
                        >
                          {badge.tier}
                        </Badge>
                      </div>
                      {badge.unlocked ? (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Star className="w-3 h-3 mr-1" />
                            Display
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trade
                          </Button>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" className="w-full" disabled>
                          <Lock className="w-3 h-3 mr-1" />
                          Locked
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Reward Tiers</CardTitle>
                <CardDescription>
                  Unlock higher tiers by earning more tokens and engaging with the community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockWalletData.rewardTiers.map((tier, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${tier.current ? 'bg-muted/50' : 'opacity-50'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Trophy className={`w-5 h-5 ${tier.current ? 'text-amber-500' : 'text-muted-foreground'}`} />
                        <span className="font-semibold">{tier.tier}</span>
                      </div>
                      {tier.current && <Badge>Current</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Requires {tier.minTokens.toLocaleString()} TAMRI tokens
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tier.benefits.map((benefit, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tipping Tab */}
          <TabsContent value="tipping" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Token Tipping</CardTitle>
                <CardDescription>
                  Support creators with TAMRI tokens, creator tokens, or other cryptocurrencies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Creator</label>
                  <select className="w-full p-2 border rounded-lg bg-background">
                    <option>Genevieve Nnaji</option>
                    <option>Burna Boy</option>
                    <option>Lupita Nyong'o</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Token</label>
                  <select className="w-full p-2 border rounded-lg bg-background">
                    <option>TAMRI (Platform Token)</option>
                    <option>ICP</option>
                    <option>USDT</option>
                    <option>USDC</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={tipAmount}
                      onChange={(e) => setTipAmount(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setTipAmount('10')}>10</Button>
                  <Button variant="outline" onClick={() => setTipAmount('25')}>25</Button>
                  <Button variant="outline" onClick={() => setTipAmount('50')}>50</Button>
                  <Button variant="outline" onClick={() => setTipAmount('100')}>100</Button>
                </div>

                <Button 
                  onClick={handleTip}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Send Tip
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Social Tipping Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <p>Public recognition on creator profiles and community leaderboards</p>
                </div>
                <div className="flex items-start gap-2">
                  <Trophy className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                  <p>Earn special badges and rewards for generous tipping</p>
                </div>
                <div className="flex items-start gap-2">
                  <Gift className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <p>Group tipping for collaborative support of creators</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staking Tab */}
          <TabsContent value="staking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Staking Pools</CardTitle>
                <CardDescription>
                  Stake tokens to support creators and earn rewards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockWalletData.stakingPools.map((pool, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{pool.creator}</h4>
                        <p className="text-sm text-muted-foreground">
                          {pool.staked} tokens staked
                        </p>
                      </div>
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                        {pool.apy}% APY
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Pending Rewards</span>
                        <span className="font-medium">{pool.rewards} TAMRI</span>
                      </div>
                      <Progress value={(pool.rewards / pool.staked) * 100} className="h-2" />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        Add More
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Coins className="w-3 h-3 mr-1" />
                        Claim Rewards
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stake New Tokens</CardTitle>
                <CardDescription>
                  Choose a creator to support and start earning rewards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Creator</label>
                  <select className="w-full p-2 border rounded-lg bg-background">
                    <option>Genevieve Nnaji (12% APY)</option>
                    <option>Burna Boy (15% APY)</option>
                    <option>Lupita Nyong'o (10% APY)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount to Stake</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleStake}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Stake Tokens
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
