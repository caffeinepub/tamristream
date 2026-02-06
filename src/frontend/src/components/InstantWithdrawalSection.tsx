import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wallet, DollarSign, TrendingUp, CheckCircle, ExternalLink, AlertCircle, Info } from 'lucide-react';
import { useGetRevenueShare, useWithdrawEarnings } from '../hooks/useQueries';
import { toast } from 'sonner';

export function InstantWithdrawalSection() {
  const { data: revenueShare, isLoading } = useGetRevenueShare();
  const withdrawEarnings = useWithdrawEarnings();
  
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<'ICP' | 'USDT' | 'USDC'>('ICP');
  const [walletAddress, setWalletAddress] = useState('');

  const availableBalance = revenueShare ? Number(revenueShare.totalEarnings) - Number(revenueShare.pendingPayouts) : 0;
  const minimumWithdrawal = 10;

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (amount < minimumWithdrawal) {
      toast.error(`Minimum withdrawal amount is $${minimumWithdrawal}`);
      return;
    }

    if (amount > availableBalance) {
      toast.error('Insufficient balance');
      return;
    }

    if (!walletAddress.trim()) {
      toast.error('Please enter your wallet address');
      return;
    }

    try {
      await withdrawEarnings.mutateAsync({
        amount: BigInt(Math.floor(amount * 100)),
        currency: selectedCurrency,
        walletAddress: walletAddress.trim()
      });
      
      setWithdrawAmount('');
      setWalletAddress('');
    } catch (error: any) {
      console.error('Withdrawal error:', error);
    }
  };

  const handleMaxWithdraw = () => {
    setWithdrawAmount(availableBalance.toString());
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Instant Withdrawal</h1>
          <p className="text-lg text-muted-foreground">
            Withdraw your earnings instantly to your crypto wallet
          </p>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Demo Mode:</strong> This is a demonstration of the instant withdrawal feature. In production, withdrawals will be processed through ICP smart contracts with real cryptocurrency transfers.
          </AlertDescription>
        </Alert>

        {/* Balance Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                ${availableBalance.toLocaleString()}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                Ready to withdraw
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                ${revenueShare ? Number(revenueShare.totalEarnings).toLocaleString() : '0'}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                All-time earnings
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
              <Wallet className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                ${revenueShare ? Number(revenueShare.pendingPayouts).toLocaleString() : '0'}
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                Processing
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Withdrawal Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wallet className="w-5 h-5" />
              <span>Withdraw Earnings</span>
            </CardTitle>
            <CardDescription>
              Instant withdrawal to your crypto wallet with zero waiting period
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Instant Processing:</strong> All withdrawals are processed immediately through smart contracts with no delays or pending periods.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={selectedCurrency} onValueChange={(value: any) => setSelectedCurrency(value)}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ICP">ICP (Internet Computer)</SelectItem>
                      <SelectItem value="USDT">USDT (Tether)</SelectItem>
                      <SelectItem value="USDC">USDC (USD Coin)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Withdrawal Amount (USD)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="pl-9"
                      min={minimumWithdrawal}
                      max={availableBalance}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Min: ${minimumWithdrawal}</span>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-xs"
                      onClick={handleMaxWithdraw}
                    >
                      Max: ${availableBalance.toLocaleString()}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wallet">Wallet Address</Label>
                <Input
                  id="wallet"
                  type="text"
                  placeholder={`Enter your ${selectedCurrency} wallet address`}
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Supports Plug Wallet, Stoic Wallet, and Tamri Wallet
                </p>
              </div>

              {parseFloat(withdrawAmount) > 0 && (
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Withdrawal Amount:</span>
                    <span className="font-medium">${parseFloat(withdrawAmount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Network Fee:</span>
                    <span className="font-medium text-green-600">$0.00 (Free)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing Time:</span>
                    <span className="font-medium text-green-600">Instant</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>You will receive:</span>
                      <span className="text-green-600">${parseFloat(withdrawAmount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleWithdraw}
                disabled={withdrawEarnings.isPending || !withdrawAmount || !walletAddress}
                className="w-full h-12 text-base font-medium"
              >
                {withdrawEarnings.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    Withdraw Earnings
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payout History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Withdrawals</CardTitle>
            <CardDescription>
              Your withdrawal history with blockchain verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            {revenueShare && revenueShare.payoutHistory && revenueShare.payoutHistory.length > 0 ? (
              <div className="space-y-4">
                {revenueShare.payoutHistory.slice(0, 5).map((payout: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">${Number(payout.amount).toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(Number(payout.date / BigInt(1000000))).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                        {payout.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No withdrawal history yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Your withdrawals will appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Section */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Blockchain Verified:</strong> All withdrawals are processed through ICP smart contracts and recorded on-chain for complete transparency. You can verify any transaction on the ICP Explorer.
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-6">
          <img 
            src="/assets/generated/instant-withdrawal-interface.dim_800x600.png" 
            alt="Instant withdrawal interface" 
            className="w-full h-auto rounded-lg"
          />
          <img 
            src="/assets/generated/creator-withdrawal-dashboard.dim_800x600.png" 
            alt="Creator withdrawal dashboard" 
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
