import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, CheckCircle, TrendingUp, Zap } from 'lucide-react';

export function OnChainPaymentsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-500/10 text-blue-600 border-blue-500/20">
            <Shield className="w-3 h-3 mr-1" />
            Blockchain Technology
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent On-Chain Payments
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every transaction is recorded on the Internet Computer blockchain, ensuring complete transparency and security for all creators.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="space-y-6">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Blockchain Verified</CardTitle>
                    <CardDescription>Immutable payment records</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All payments are recorded on the Internet Computer blockchain, providing an immutable and transparent record of every transaction. No hidden fees, no surprises.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Real-Time Tracking</CardTitle>
                    <CardDescription>Monitor your earnings live</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track every view, stream, and purchase in real-time. See exactly how much you're earning and when payments are processed.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Lock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Secure & Private</CardTitle>
                    <CardDescription>Your data is protected</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Built on the Internet Computer's secure infrastructure with end-to-end encryption. Your financial data remains private and protected.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <img
              src="/assets/generated/on-chain-payments-visual.dim_800x600.png"
              alt="On-chain payment flow visualization"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </div>

        {/* Payment Flow */}
        <div className="bg-card rounded-2xl p-8 border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">How On-Chain Payments Work</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold mb-2">User Streams</h4>
              <p className="text-sm text-muted-foreground">
                Fans watch your content on TamriStream
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-semibold mb-2">Revenue Generated</h4>
              <p className="text-sm text-muted-foreground">
                Platform calculates your 70-90% share
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-semibold mb-2">Blockchain Record</h4>
              <p className="text-sm text-muted-foreground">
                Transaction recorded on-chain
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">4</span>
              </div>
              <h4 className="font-semibold mb-2">Instant Payout</h4>
              <p className="text-sm text-muted-foreground">
                Receive funds in crypto or fiat
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">No Middlemen</h4>
            <p className="text-sm text-muted-foreground">
              Direct payments from platform to creator
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Lower Fees</h4>
            <p className="text-sm text-muted-foreground">
              Blockchain reduces transaction costs
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <Zap className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Fast Settlement</h4>
            <p className="text-sm text-muted-foreground">
              Payments processed within minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
