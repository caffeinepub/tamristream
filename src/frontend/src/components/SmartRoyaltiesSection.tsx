import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Shield, Zap, TrendingUp, CheckCircle, ExternalLink } from 'lucide-react';

export function SmartRoyaltiesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Coins className="w-10 h-10 text-blue-600" />
            <h2 className="text-4xl font-bold text-foreground">Smart Royalties System</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionary blockchain-powered payment system that ensures transparent, instant, and automated creator compensation
          </p>
        </div>

        {/* Main Infographic */}
        <Card className="border-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <img 
              src="/assets/generated/smart-royalties-dashboard.dim_800x600.png" 
              alt="Smart Royalties Dashboard" 
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Unique Canister ID</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Each uploaded content receives a unique blockchain identifier for permanent tracking and ownership verification
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Event Logging</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Every stream, rental, and purchase is automatically logged on the Internet Computer blockchain
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardHeader>
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Auto Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Smart contracts automatically calculate and distribute 70-90% of revenue directly to creator wallets
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
            <CardHeader>
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Instant Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Receive payments in crypto or fiat immediately upon content consumption with zero delays
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Example Showcase */}
        <Card className="border-0 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
          <CardHeader>
            <CardTitle className="text-2xl">See Smart Royalties in Action</CardTitle>
            <CardDescription className="text-base">
              Real-world example of how creators earn with complete transparency
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">10K</span>
                </div>
                <h4 className="font-semibold text-foreground">Views</h4>
                <p className="text-sm text-muted-foreground">Movie X received 10,000 streams</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">200</span>
                </div>
                <h4 className="font-semibold text-foreground">ICP Earned</h4>
                <p className="text-sm text-muted-foreground">Total revenue generated</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">160</span>
                </div>
                <h4 className="font-semibold text-foreground">ICP to Creator</h4>
                <p className="text-sm text-muted-foreground">Auto-sent to wallet (80%)</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Badge className="bg-green-600 text-white text-base px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                Payment completed in seconds
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>For Creators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Complete Transparency</h4>
                  <p className="text-sm text-muted-foreground">View every transaction on the blockchain</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Instant Payments</h4>
                  <p className="text-sm text-muted-foreground">No waiting periods or minimum thresholds</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Ownership Protection</h4>
                  <p className="text-sm text-muted-foreground">Blockchain-verified content rights</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Zero Middlemen</h4>
                  <p className="text-sm text-muted-foreground">Direct wallet-to-wallet transfers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Technical Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">ICP Smart Contracts</h4>
                  <p className="text-sm text-muted-foreground">Powered by Internet Computer Protocol</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Immutable Records</h4>
                  <p className="text-sm text-muted-foreground">Permanent transaction history</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Multi-Currency Support</h4>
                  <p className="text-sm text-muted-foreground">ICP, Bitcoin, Ethereum, USDC, and fiat</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Public Audit Trail</h4>
                  <p className="text-sm text-muted-foreground">Anyone can verify transactions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Ready to Experience Smart Royalties?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join TamriStream and start earning with the most transparent and creator-friendly payment system in streaming
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Coins className="w-5 h-5 mr-2" />
              Start Earning Now
            </Button>
            <Button size="lg" variant="outline">
              <ExternalLink className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
