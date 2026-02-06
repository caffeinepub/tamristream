import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DollarSign, TrendingUp, Zap, Info, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { useGetRevenueModel } from '../hooks/useQueries';

export function RevenueModelDisplay() {
  const { data: revenueModel, isLoading } = useGetRevenueModel();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!revenueModel) {
    return null;
  }

  const revenueStreams = [
    {
      name: 'Subscriptions',
      creatorShare: Number(revenueModel.subscriptionRevenue),
      platformFee: 100 - Number(revenueModel.subscriptionRevenue),
      description: 'Monthly and annual subscription fees are distributed with creators receiving their share of revenue generated from their content consumption.',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950'
    },
    {
      name: 'Ad Revenue',
      creatorShare: Number(revenueModel.adRevenue),
      platformFee: 100 - Number(revenueModel.adRevenue),
      description: 'Ad revenue from free-tier users is shared with creators receiving their percentage of revenue from ads displayed during their content.',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950'
    },
    {
      name: 'Pay-per-view/Rentals',
      creatorShare: Number(revenueModel.payPerView),
      platformFee: 100 - Number(revenueModel.payPerView),
      description: 'Individual content purchases and rentals provide creators with the highest revenue share, maximizing earnings from premium content.',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950'
    },
    {
      name: 'Tips/Donations',
      creatorShare: Number(revenueModel.tipsDonations),
      platformFee: 100 - Number(revenueModel.tipsDonations),
      description: 'Direct fan support goes 100% to creators with no platform fees, enabling pure fan-to-creator financial support.',
      icon: Sparkles,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950'
    },
    {
      name: 'Merchandise/NFT Drops',
      creatorShare: Number(revenueModel.merchandise),
      platformFee: 100 - Number(revenueModel.merchandise),
      description: 'Creator merchandise and NFT sales provide high revenue share, supporting creator brand building and fan engagement.',
      icon: CheckCircle,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-950'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <DollarSign className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Creator Revenue Model</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          TamriStream's transparent revenue-sharing model ensures creators receive fair compensation across all income streams with instant payouts and no hidden fees.
        </p>
      </div>

      {/* Visual Infographic */}
      <Card className="border-0 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/assets/generated/revenue-split-detailed-infographic.dim_800x600.png" 
                alt="Detailed Revenue Split Infographic" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Industry-Leading Revenue Sharing</h3>
              <p className="text-muted-foreground">
                Our creator-first approach ensures you keep the majority of your earnings across all revenue streams.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Transparent calculations with real-time tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Instant payouts upon transaction completion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">No hidden fees or surprise deductions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Blockchain-verified payment records</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Revenue Table */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Revenue Split by Source</span>
          </CardTitle>
          <CardDescription>
            Detailed breakdown of creator earnings across all revenue streams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Revenue Source</TableHead>
                  <TableHead className="text-center">Creator Share</TableHead>
                  <TableHead className="text-center">Platform Fee</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueStreams.map((stream, index) => {
                  const Icon = stream.icon;
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <div className={`w-8 h-8 rounded-full ${stream.bgColor} flex items-center justify-center`}>
                            <Icon className={`w-4 h-4 ${stream.color}`} />
                          </div>
                          <span>{stream.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-green-600 text-white font-bold">
                          {stream.creatorShare}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">
                          {stream.platformFee}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {stream.description}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Visual Progress Bars */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {revenueStreams.map((stream, index) => {
          const Icon = stream.icon;
          return (
            <Card key={index} className={`border-0 ${stream.bgColor}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-5 h-5 ${stream.color}`} />
                    <CardTitle className="text-base">{stream.name}</CardTitle>
                  </div>
                  <Badge className="bg-green-600 text-white">
                    {stream.creatorShare}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Creator</span>
                    <span className="font-semibold text-green-600">{stream.creatorShare}%</span>
                  </div>
                  <Progress value={stream.creatorShare} className="h-3" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Platform</span>
                    <span className="font-semibold">{stream.platformFee}%</span>
                  </div>
                  <Progress value={stream.platformFee} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Key Benefits */}
      <Card className="border-0 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>Why Our Revenue Model is Different</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="font-semibold">Fairness</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Industry-leading revenue shares that prioritize creator earnings over platform profits.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-semibold">Transparency</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Real-time earnings tracking with detailed breakdowns and blockchain verification.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-semibold">Instant Payouts</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Receive payments immediately upon transaction completion with no waiting periods.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Explanatory Notes */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Platform fees support:</strong> Infrastructure costs, payment processing, content delivery networks, 
          marketing and promotion, customer support, and continuous platform improvements. All fees are transparently 
          disclosed with no hidden charges.
        </AlertDescription>
      </Alert>

      {/* Revenue Calculator Preview */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Estimate Your Earnings</CardTitle>
          <CardDescription>
            Use our revenue calculator to see potential earnings based on different revenue streams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <img 
              src="/assets/generated/revenue-calculator-interface.dim_800x600.png" 
              alt="Revenue Calculator Interface" 
              className="w-full max-w-2xl mx-auto h-auto rounded-lg shadow-lg"
            />
            <p className="text-sm text-muted-foreground mt-4">
              Interactive calculator coming soon - estimate your potential monthly earnings
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
