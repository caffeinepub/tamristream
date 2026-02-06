import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DollarSign, TrendingUp, Calendar, CreditCard, Smartphone, Bitcoin, CheckCircle, Clock, AlertCircle, Wallet, Info } from 'lucide-react';
import { useGetRevenueShare, useSetPaymentMethod } from '../hooks/useQueries';
import { PaymentMethod, PayoutRecord } from '../backend';
import { toast } from 'sonner';

export function CreatorDashboard() {
  const { data: revenueShare, isLoading } = useGetRevenueShare();
  const setPaymentMethod = useSetPaymentMethod();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState('');

  const handlePaymentMethodUpdate = async () => {
    if (!selectedPaymentMethod || !paymentDetails) {
      toast.error('Please select a payment method and provide details');
      return;
    }

    let method: PaymentMethod;
    switch (selectedPaymentMethod) {
      case 'icp':
        method = { __kind__: 'icp', icp: paymentDetails };
        break;
      case 'usdt':
        method = { __kind__: 'usdt', usdt: paymentDetails };
        break;
      case 'usdc':
        method = { __kind__: 'usdc', usdc: paymentDetails };
        break;
      case 'plugWallet':
        method = { __kind__: 'plugWallet', plugWallet: paymentDetails };
        break;
      case 'stoicWallet':
        method = { __kind__: 'stoicWallet', stoicWallet: paymentDetails };
        break;
      case 'tamriWallet':
        method = { __kind__: 'tamriWallet', tamriWallet: paymentDetails };
        break;
      case 'mobileMoney':
        method = { __kind__: 'mobileMoney', mobileMoney: paymentDetails };
        break;
      case 'mPesa':
        method = { __kind__: 'mPesa', mPesa: paymentDetails };
        break;
      case 'stripe':
        method = { __kind__: 'stripe', stripe: paymentDetails };
        break;
      case 'paystack':
        method = { __kind__: 'paystack', paystack: paymentDetails };
        break;
      case 'crypto':
        method = { __kind__: 'crypto', crypto: paymentDetails };
        break;
      default:
        toast.error('Invalid payment method selected');
        return;
    }

    try {
      await setPaymentMethod.mutateAsync(method);
      toast.success('Payment method updated successfully');
      setSelectedPaymentMethod('');
      setPaymentDetails('');
    } catch (error) {
      toast.error('Failed to update payment method');
    }
  };

  const convertPayoutHistoryToArray = (payoutHistory: any): PayoutRecord[] => {
    const payouts: PayoutRecord[] = [];
    let current = payoutHistory;
    
    while (current !== null && current !== undefined) {
      if (Array.isArray(current) && current.length === 2) {
        payouts.push(current[0]);
        current = current[1];
      } else {
        break;
      }
    }
    
    return payouts;
  };

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method.__kind__) {
      case 'icp':
      case 'usdt':
      case 'usdc':
        return <Bitcoin className="w-4 h-4" />;
      case 'plugWallet':
      case 'stoicWallet':
      case 'tamriWallet':
        return <Wallet className="w-4 h-4" />;
      case 'mobileMoney':
      case 'mPesa':
        return <Smartphone className="w-4 h-4" />;
      case 'stripe':
      case 'paystack':
        return <CreditCard className="w-4 h-4" />;
      case 'crypto':
        return <Bitcoin className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getPaymentMethodLabel = (method: PaymentMethod) => {
    switch (method.__kind__) {
      case 'icp':
        return 'ICP Token';
      case 'usdt':
        return 'USDT Stablecoin';
      case 'usdc':
        return 'USDC Stablecoin';
      case 'plugWallet':
        return 'Plug Wallet';
      case 'stoicWallet':
        return 'Stoic Wallet';
      case 'tamriWallet':
        return 'Tamri Wallet';
      case 'mobileMoney':
        return 'Mobile Money';
      case 'mPesa':
        return 'M-Pesa';
      case 'stripe':
        return 'Stripe';
      case 'paystack':
        return 'Paystack';
      case 'crypto':
        return 'Cryptocurrency';
      default:
        return 'Unknown';
    }
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

  const totalEarnings = Number(revenueShare?.totalEarnings || 0);
  const pendingPayouts = Number(revenueShare?.pendingPayouts || 0);
  const availableBalance = totalEarnings - pendingPayouts;
  const payoutHistoryArray = revenueShare ? convertPayoutHistoryToArray(revenueShare.payoutHistory) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Creator Dashboard</h1>
              <p className="text-lg text-muted-foreground">Track Your Earnings & Manage Payouts</p>
            </div>
          </div>
        </div>

        {/* Revenue Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                ${totalEarnings.toFixed(2)}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                Lifetime revenue from your content
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                ${availableBalance.toFixed(2)}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Ready for payout
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                ${pendingPayouts.toFixed(2)}
              </div>
              <p className="text-xs text-orange-600 dark:text-orange-400">
                Processing payments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Sharing Visualization */}
        <Card className="border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Revenue Sharing Model</span>
            </CardTitle>
            <CardDescription>
              Transparent breakdown of how platform revenue is distributed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Revenue Split</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Creator Share</span>
                    <span className="font-semibold text-green-600">70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Platform Operations</span>
                    <span className="font-semibold text-blue-600">20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Marketing & Growth</span>
                    <span className="font-semibold text-purple-600">10%</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <img 
                  src="/assets/generated/revenue-split-infographic.png" 
                  alt="Revenue sharing infographic" 
                  className="w-full max-w-sm h-auto rounded-lg"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">70%</p>
                  <p className="text-sm text-muted-foreground">Goes directly to creators</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">Monthly</p>
                  <p className="text-sm text-muted-foreground">Payout frequency</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">$10</p>
                  <p className="text-sm text-muted-foreground">Minimum payout threshold</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for detailed information */}
        <Tabs defaultValue="payouts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payouts">Payout History</TabsTrigger>
            <TabsTrigger value="payment">Withdrawal Methods</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="payouts" className="space-y-4">
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Payout History</CardTitle>
                <CardDescription>
                  Track all your past payments and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {payoutHistoryArray.length > 0 ? (
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
                      {payoutHistoryArray.map((payout, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {new Date(Number(payout.date / BigInt(1000000))).toLocaleDateString()}
                          </TableCell>
                          <TableCell>${Number(payout.amount).toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="flex items-center space-x-1 w-fit">
                              {getPaymentMethodIcon(payout.method)}
                              <span>{getPaymentMethodLabel(payout.method)}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={payout.status === 'completed' ? 'default' : 
                                      payout.status === 'pending' ? 'secondary' : 'destructive'}
                            >
                              {payout.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                              {payout.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                              {payout.status === 'failed' && <AlertCircle className="w-3 h-3 mr-1" />}
                              {payout.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No payout history yet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Your first payout will appear here once you reach the minimum threshold
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Withdrawal Method Setup</CardTitle>
                <CardDescription>
                  Configure how you want to receive your earnings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Choose your preferred withdrawal method. Crypto wallets offer instant payouts with zero fees. Traditional methods process within 3-5 business days.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod">Withdrawal Method</Label>
                      <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select withdrawal method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plugWallet">
                            <div className="flex items-center space-x-2">
                              <Wallet className="w-4 h-4" />
                              <span>Plug Wallet (ICP) - Recommended</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="stoicWallet">
                            <div className="flex items-center space-x-2">
                              <Wallet className="w-4 h-4" />
                              <span>Stoic Wallet (ICP)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="tamriWallet">
                            <div className="flex items-center space-x-2">
                              <Wallet className="w-4 h-4" />
                              <span>Tamri Wallet (Coming Soon)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="icp">
                            <div className="flex items-center space-x-2">
                              <Bitcoin className="w-4 h-4" />
                              <span>ICP Token</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="usdt">
                            <div className="flex items-center space-x-2">
                              <Bitcoin className="w-4 h-4" />
                              <span>USDT Stablecoin</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="usdc">
                            <div className="flex items-center space-x-2">
                              <Bitcoin className="w-4 h-4" />
                              <span>USDC Stablecoin</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="stripe">
                            <div className="flex items-center space-x-2">
                              <CreditCard className="w-4 h-4" />
                              <span>Stripe (Bank Transfer)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="paystack">
                            <div className="flex items-center space-x-2">
                              <CreditCard className="w-4 h-4" />
                              <span>Paystack (African Gateway)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="mobileMoney">
                            <div className="flex items-center space-x-2">
                              <Smartphone className="w-4 h-4" />
                              <span>Mobile Money</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="mPesa">
                            <div className="flex items-center space-x-2">
                              <Smartphone className="w-4 h-4" />
                              <span>M-Pesa</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="crypto">
                            <div className="flex items-center space-x-2">
                              <Bitcoin className="w-4 h-4" />
                              <span>Other Cryptocurrency</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentDetails">
                        {selectedPaymentMethod === 'plugWallet' ? 'Plug Wallet Principal ID' :
                         selectedPaymentMethod === 'stoicWallet' ? 'Stoic Wallet Address' :
                         selectedPaymentMethod === 'tamriWallet' ? 'Tamri Wallet ID (Coming Soon)' :
                         selectedPaymentMethod === 'icp' ? 'ICP Wallet Address' :
                         selectedPaymentMethod === 'usdt' ? 'USDT Wallet Address' :
                         selectedPaymentMethod === 'usdc' ? 'USDC Wallet Address' :
                         selectedPaymentMethod === 'stripe' ? 'Bank Account / Email' :
                         selectedPaymentMethod === 'paystack' ? 'Account Number / Email' :
                         selectedPaymentMethod === 'mobileMoney' ? 'Mobile Number' :
                         selectedPaymentMethod === 'mPesa' ? 'M-Pesa Number' :
                         selectedPaymentMethod === 'crypto' ? 'Wallet Address' : 'Withdrawal Details'}
                      </Label>
                      <Input
                        id="paymentDetails"
                        value={paymentDetails}
                        onChange={(e) => setPaymentDetails(e.target.value)}
                        placeholder={
                          selectedPaymentMethod === 'plugWallet' ? 'xxxxx-xxxxx-xxxxx-xxxxx-xxx' :
                          selectedPaymentMethod === 'stoicWallet' ? 'xxxxx-xxxxx-xxxxx-xxxxx-xxx' :
                          selectedPaymentMethod === 'tamriWallet' ? 'Coming soon...' :
                          selectedPaymentMethod === 'icp' ? 'ICP wallet address' :
                          selectedPaymentMethod === 'usdt' ? 'USDT wallet address' :
                          selectedPaymentMethod === 'usdc' ? 'USDC wallet address' :
                          selectedPaymentMethod === 'stripe' ? 'email@example.com or account number' :
                          selectedPaymentMethod === 'paystack' ? 'email@example.com or account number' :
                          selectedPaymentMethod === 'mobileMoney' ? '+254 700 000 000' :
                          selectedPaymentMethod === 'mPesa' ? '+254 700 000 000' :
                          selectedPaymentMethod === 'crypto' ? '0x...' : 'Enter withdrawal details'
                        }
                        disabled={selectedPaymentMethod === 'tamriWallet'}
                      />
                      {selectedPaymentMethod && (
                        <p className="text-xs text-muted-foreground">
                          {selectedPaymentMethod === 'plugWallet' && '✓ Zero fees • Instant transfers • Secure ICP wallet'}
                          {selectedPaymentMethod === 'stoicWallet' && '✓ Zero fees • Fast processing • ICP ecosystem wallet'}
                          {selectedPaymentMethod === 'tamriWallet' && 'Coming in Q2 2025 with exclusive creator benefits'}
                          {selectedPaymentMethod === 'icp' && 'Receive payouts in ICP tokens with minimal network fees'}
                          {selectedPaymentMethod === 'usdt' && 'Receive payouts in USDT stablecoin (1:1 USD)'}
                          {selectedPaymentMethod === 'usdc' && 'Receive payouts in USDC stablecoin (1:1 USD)'}
                          {selectedPaymentMethod === 'stripe' && 'Stripe supports bank transfers and card payouts globally (2.9% + $0.30 fee)'}
                          {selectedPaymentMethod === 'paystack' && 'Paystack supports African bank accounts and mobile money (1.5% + local fees)'}
                          {selectedPaymentMethod === 'mobileMoney' && 'Enter your mobile money number with country code'}
                          {selectedPaymentMethod === 'mPesa' && 'Enter your M-Pesa number with country code'}
                          {selectedPaymentMethod === 'crypto' && 'Enter your cryptocurrency wallet address'}
                        </p>
                      )}
                    </div>

                    <Button 
                      onClick={handlePaymentMethodUpdate}
                      disabled={setPaymentMethod.isPending || selectedPaymentMethod === 'tamriWallet'}
                      className="w-full"
                    >
                      {setPaymentMethod.isPending ? 'Updating...' : 'Update Withdrawal Method'}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Current Withdrawal Method</h4>
                    {revenueShare?.paymentMethod ? (
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          {getPaymentMethodIcon(revenueShare.paymentMethod)}
                          <span className="font-medium">
                            {getPaymentMethodLabel(revenueShare.paymentMethod)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground break-all">
                          {revenueShare.paymentMethod.__kind__ === 'icp' ? revenueShare.paymentMethod.icp :
                           revenueShare.paymentMethod.__kind__ === 'usdt' ? revenueShare.paymentMethod.usdt :
                           revenueShare.paymentMethod.__kind__ === 'usdc' ? revenueShare.paymentMethod.usdc :
                           revenueShare.paymentMethod.__kind__ === 'plugWallet' ? revenueShare.paymentMethod.plugWallet :
                           revenueShare.paymentMethod.__kind__ === 'stoicWallet' ? revenueShare.paymentMethod.stoicWallet :
                           revenueShare.paymentMethod.__kind__ === 'tamriWallet' ? revenueShare.paymentMethod.tamriWallet :
                           revenueShare.paymentMethod.__kind__ === 'stripe' ? revenueShare.paymentMethod.stripe :
                           revenueShare.paymentMethod.__kind__ === 'paystack' ? revenueShare.paymentMethod.paystack :
                           revenueShare.paymentMethod.__kind__ === 'mobileMoney' ? revenueShare.paymentMethod.mobileMoney :
                           revenueShare.paymentMethod.__kind__ === 'mPesa' ? revenueShare.paymentMethod.mPesa :
                           revenueShare.paymentMethod.crypto}
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 bg-muted/50 rounded-lg text-center">
                        <p className="text-muted-foreground">No withdrawal method configured</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <h5 className="font-medium text-foreground">Withdrawal Information</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Payouts are processed monthly</li>
                        <li>• Minimum payout threshold: $10</li>
                        <li>• Crypto: Instant (0 fees for Plug/Stoic)</li>
                        <li>• Stripe: 3-5 days (2.9% + $0.30 fee)</li>
                        <li>• Paystack: 3-5 days (1.5% + local fees)</li>
                        <li>• Mobile Money: 1-2 days (operator fees)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <img 
                    src="/assets/generated/multi-currency-payout.dim_800x600.png" 
                    alt="Multi-currency payout options" 
                    className="w-full max-w-2xl mx-auto h-auto rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>
                  Detailed breakdown of your content performance and earnings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Analytics Coming Soon</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Detailed performance metrics and revenue analytics will be available here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
