import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Coins, TrendingUp, Zap, Shield, CheckCircle, Clock, Copy, Info } from 'lucide-react';
import { useGetSmartRoyaltiesByCreator, useGetRoyaltyEvents, useGetRoyaltyPayoutHistory } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { toast } from 'sonner';

export function SmartRoyaltiesDashboard() {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal();
  const { data: smartRoyalties, isLoading } = useGetSmartRoyaltiesByCreator(principal);
  const [selectedContentId, setSelectedContentId] = useState<string>('');

  const { data: royaltyEvents } = useGetRoyaltyEvents(selectedContentId);
  const { data: payoutHistory } = useGetRoyaltyPayoutHistory(selectedContentId);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const formatTimestamp = (timestamp: bigint) => {
    return new Date(Number(timestamp / BigInt(1000000))).toLocaleString();
  };

  const formatAmount = (amount: bigint) => {
    return `${Number(amount)} ICP`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const totalEarnings = smartRoyalties?.reduce((sum, royalty) => sum + Number(royalty.totalEarnings), 0) || 0;
  const totalContent = smartRoyalties?.length || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Coins className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Smart Royalties Dashboard</h1>
              <p className="text-lg text-muted-foreground">Blockchain-Powered Transparent Payments</p>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {totalEarnings.toFixed(2)} ICP
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Across all content
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Content</CardTitle>
              <Zap className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {totalContent}
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                Earning royalties
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blockchain Verified</CardTitle>
              <Shield className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                100%
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                All transactions on-chain
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Smart Royalties Explanation */}
        <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-600" />
              <span>How Smart Royalties Work</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="/assets/generated/smart-royalties-infographic.dim_800x600.png" 
                  alt="Smart Royalties System Infographic" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Unique Canister ID</h4>
                    <p className="text-sm text-muted-foreground">Each content piece gets a unique blockchain identifier</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Automatic Event Logging</h4>
                    <p className="text-sm text-muted-foreground">Every stream, rental, and purchase is logged on-chain</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Instant Payouts</h4>
                    <p className="text-sm text-muted-foreground">Earnings are automatically sent to your wallet</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content List */}
        <Card className="border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Your Content & Royalties</CardTitle>
            <CardDescription>
              Track earnings and blockchain transactions for each piece of content
            </CardDescription>
          </CardHeader>
          <CardContent>
            {smartRoyalties && smartRoyalties.length > 0 ? (
              <div className="space-y-4">
                {smartRoyalties.map((royalty) => (
                  <Card key={royalty.contentId} className="border border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-foreground">{royalty.contentId}</h3>
                            <Badge variant="outline" className="flex items-center space-x-1">
                              <Shield className="w-3 h-3" />
                              <span>Verified</span>
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Coins className="w-4 h-4" />
                              <span>Total Earnings: {formatAmount(royalty.totalEarnings)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>Last Updated: {formatTimestamp(royalty.lastUpdated)}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">Canister ID:</span>
                            <code className="text-xs bg-muted px-2 py-1 rounded">{royalty.contentId}</code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(royalty.contentId)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedContentId(royalty.contentId)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Coins className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No content with Smart Royalties yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Upload content to start earning with transparent blockchain payments
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detailed View */}
        {selectedContentId && (
          <Tabs defaultValue="events" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="events">Transaction Events</TabsTrigger>
              <TabsTrigger value="payouts">Payout History</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-4">
              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Blockchain Transaction Log</CardTitle>
                  <CardDescription>
                    All revenue-generating events recorded on the Internet Computer blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {royaltyEvents && royaltyEvents.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {royaltyEvents.map((event, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Badge variant="outline">{event.eventType}</Badge>
                            </TableCell>
                            <TableCell className="font-semibold">{formatAmount(event.amount)}</TableCell>
                            <TableCell className="text-xs font-mono">{event.user.toString().slice(0, 10)}...</TableCell>
                            <TableCell className="text-sm">{formatTimestamp(event.timestamp)}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{event.details}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No events recorded yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payouts" className="space-y-4">
              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Automated Payout History</CardTitle>
                  <CardDescription>
                    All payments automatically processed and sent to your wallet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {payoutHistory && payoutHistory.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payoutHistory.map((payout, index) => (
                          <TableRow key={index}>
                            <TableCell>{formatTimestamp(payout.date)}</TableCell>
                            <TableCell className="font-semibold">{formatAmount(payout.amount)}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {payout.method.__kind__}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={payout.status === 'completed' ? 'default' : 
                                        payout.status === 'pending' ? 'secondary' : 'destructive'}
                              >
                                {payout.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                                {payout.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <Coins className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No payouts yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Example Display */}
        <Card className="border-0 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-600" />
              <span>Smart Royalties in Action</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <img 
                src="/assets/generated/smart-royalties-example-display.dim_800x600.png" 
                alt="Smart Royalties Example" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Example:</strong> Movie X received 10,000 views → earned 200 ICP → 160 ICP automatically sent to creator wallet within seconds
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
