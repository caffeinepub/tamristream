import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, DollarSign, Smartphone, Bitcoin, CreditCard, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function InstantPayoutsSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-500/10 text-purple-600 border-purple-500/20">
            <Zap className="w-3 h-3 mr-1" />
            Fast Payments
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Instant Payouts in Crypto or Fiat
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get paid quickly with flexible payout options. Choose cryptocurrency for instant transfers or traditional fiat for local convenience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="space-y-6">
            <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Instant Crypto Payouts</CardTitle>
                    <CardDescription>Receive funds in minutes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose cryptocurrency payouts for near-instant transfers. Funds arrive in your wallet within minutes, not days.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Bitcoin className="w-3 h-3" />
                    <span>ICP</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Bitcoin className="w-3 h-3" />
                    <span>BTC</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Bitcoin className="w-3 h-3" />
                    <span>ETH</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Bitcoin className="w-3 h-3" />
                    <span>USDC</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Local Fiat Options</CardTitle>
                    <CardDescription>Mobile money & bank transfers</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Prefer traditional currency? We support mobile money, M-Pesa, bank transfers, and local payment methods across Africa.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Smartphone className="w-3 h-3" />
                    <span>Mobile Money</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <CreditCard className="w-3 h-3" />
                    <span>M-Pesa</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <CreditCard className="w-3 h-3" />
                    <span>Bank Transfer</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Flexible Schedule</CardTitle>
                    <CardDescription>Monthly or on-demand</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Choose monthly automatic payouts or request on-demand withdrawals once you reach the $10 minimum threshold.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <img
              src="/assets/generated/instant-payout-interface.dim_800x600.png"
              alt="Instant payout interface showing payment options"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </div>

        {/* Payout Comparison */}
        <div className="bg-card rounded-2xl p-8 border border-border mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Payout Options Comparison</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-purple-500/5 rounded-xl border border-purple-500/20">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bitcoin className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Cryptocurrency</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Speed</span>
                  <span className="font-medium text-purple-600">Instant</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Fees</span>
                  <span className="font-medium">~1-2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Minimum</span>
                  <span className="font-medium">$10</span>
                </div>
              </div>
            </div>

            <div className="text-center p-6 bg-green-500/5 rounded-xl border border-green-500/20">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Mobile Money</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Speed</span>
                  <span className="font-medium text-green-600">1-2 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Fees</span>
                  <span className="font-medium">~2-3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Minimum</span>
                  <span className="font-medium">$10</span>
                </div>
              </div>
            </div>

            <div className="text-center p-6 bg-blue-500/5 rounded-xl border border-blue-500/20">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Bank Transfer</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Speed</span>
                  <span className="font-medium text-blue-600">1-3 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Fees</span>
                  <span className="font-medium">~3-5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Minimum</span>
                  <span className="font-medium">$10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Low Minimum</h4>
            <p className="text-sm text-muted-foreground">
              Only $10 minimum payout
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <Zap className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Fast Processing</h4>
            <p className="text-sm text-muted-foreground">
              Crypto payouts in minutes
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Low Fees</h4>
            <p className="text-sm text-muted-foreground">
              Competitive transaction costs
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Flexible Options</h4>
            <p className="text-sm text-muted-foreground">
              Choose what works for you
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            onClick={() => navigate({ to: '/creator-dashboard' })}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-8"
          >
            <DollarSign className="w-5 h-5 mr-2" />
            Set Up Your Payouts
          </Button>
        </div>
      </div>
    </section>
  );
}
