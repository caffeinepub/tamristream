import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, Smartphone, Banknote, Globe, Shield, Clock, CheckCircle, Wallet, Info, Bitcoin, DollarSign } from 'lucide-react';

export function PaymentOptions() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Payment & Withdrawal Options</h1>
              <p className="text-lg text-muted-foreground">Flexible Payment Methods for Everyone</p>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We support multiple payment and withdrawal methods including crypto, stablecoins, and traditional payment gateways to make TamriStream accessible across Africa and beyond.
          </p>
        </div>

        {/* Tabs for User Payments and Creator Withdrawals */}
        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="payments">User Payments</TabsTrigger>
            <TabsTrigger value="withdrawals">Creator Withdrawals</TabsTrigger>
          </TabsList>

          {/* User Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Choose your preferred payment method at checkout. All transactions are secure and encrypted.
              </AlertDescription>
            </Alert>

            {/* Cryptocurrency Payments */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">Cryptocurrency Payments</h2>
                <p className="text-lg text-muted-foreground">
                  Pay with crypto for instant, secure, and low-fee transactions
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/30">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>ICP Payments</span>
                          <Badge className="bg-blue-600">Native</Badge>
                        </CardTitle>
                        <CardDescription>Internet Computer Protocol</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Pay directly with ICP tokens on the Internet Computer blockchain - fast, secure, and decentralized.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Native on-chain payments</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Instant confirmation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Near-zero fees</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/30">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>USDT Payments</span>
                          <Badge className="bg-green-600">Stablecoin</Badge>
                        </CardTitle>
                        <CardDescription>Tether USD Stablecoin</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Pay with USDT stablecoin for price stability and reduced volatility concerns.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Price stable (1:1 USD)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Fast transactions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Global acceptance</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/30">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>USDC Payments</span>
                          <Badge className="bg-purple-600">Stablecoin</Badge>
                        </CardTitle>
                        <CardDescription>USD Coin Stablecoin</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Pay with USDC stablecoin for reliable, dollar-pegged cryptocurrency payments.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Fully backed by USD</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Transparent reserves</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Wide ecosystem support</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Card Payments Section */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">Card Payments</h2>
                <p className="text-lg text-muted-foreground">
                  Traditional credit and debit card payments with automatic crypto conversion
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <CardTitle>Stripe</CardTitle>
                        <CardDescription>Global Payment Processing</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Accept credit and debit cards from customers worldwide with industry-leading security. Payments are automatically converted to platform tokens.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Visa, Mastercard, Amex</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">PCI-DSS Compliant</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">3D Secure Authentication</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Auto crypto conversion</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>Paystack</span>
                          <Badge className="bg-teal-600">African Gateway</Badge>
                        </CardTitle>
                        <CardDescription>Built for Africa</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Built for Africa - accept payments from customers across the continent with local payment methods and automatic crypto conversion.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Local Cards & Mobile Money</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Bank Transfers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">USSD & QR Payments</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Auto crypto conversion</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Payment Flow Visualization */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">How Payment Works</CardTitle>
                <CardDescription className="text-lg">
                  Seamless payment processing with automatic conversion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <CreditCard className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">1. Choose Payment Method</h4>
                    <p className="text-sm text-muted-foreground">
                      Select ICP, USDT, USDC, Stripe, or Paystack at checkout
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                      <Shield className="w-8 h-8 text-accent" />
                    </div>
                    <h4 className="font-semibold text-foreground">2. Secure Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Card payments auto-convert to platform tokens via Smart Royalties
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-secondary" />
                    </div>
                    <h4 className="font-semibold text-foreground">3. Instant Access</h4>
                    <p className="text-sm text-muted-foreground">
                      Your subscription activates immediately after confirmation
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <img 
                    src="/assets/generated/secure-payment-flow.dim_800x600.png" 
                    alt="Secure payment flow" 
                    className="w-full max-w-2xl mx-auto h-auto rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Creator Withdrawals Tab */}
          <TabsContent value="withdrawals" className="space-y-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Configure your preferred withdrawal method in your creator dashboard. All options support instant payouts with transparent Smart Royalties tracking.
              </AlertDescription>
            </Alert>

            {/* Crypto Wallet Withdrawals */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">Crypto Wallet Withdrawals</h2>
                <p className="text-lg text-muted-foreground">
                  Receive your earnings directly to your crypto wallet - instant and secure
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/30">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>Plug Wallet</span>
                          <Badge className="bg-blue-600">Recommended</Badge>
                        </CardTitle>
                        <CardDescription>ICP Ecosystem Wallet</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Direct withdrawal to Plug Wallet for ICP and other supported cryptocurrencies with secure wallet connection.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">ICP token withdrawals</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Instant transfers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Zero withdrawal fees</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Secure connection</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        <strong>Setup:</strong> Connect your Plug Wallet in the creator dashboard and provide your Principal ID
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/30">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>Stoic Wallet</span>
                          <Badge className="bg-purple-600">ICP Native</Badge>
                        </CardTitle>
                        <CardDescription>Internet Computer Wallet</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Direct withdrawal to Stoic Wallet for Internet Computer ecosystem tokens with seamless integration.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">ICP ecosystem tokens</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Fast processing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Low transaction costs</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Multi-token support</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="text-xs text-purple-700 dark:text-purple-300">
                        <strong>Setup:</strong> Link your Stoic Wallet and provide your wallet address in settings
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-2 border-orange/30">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>Tamri Wallet</span>
                          <Badge className="bg-orange-600">Coming Soon</Badge>
                        </CardTitle>
                        <CardDescription>TamriStream Native Wallet</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upcoming Tamri Wallet with enhanced features and platform-specific benefits for TamriStream creators.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Platform-native wallet</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Enhanced creator features</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Exclusive benefits</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Integrated analytics</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="text-xs text-orange-700 dark:text-orange-300">
                        <strong>Status:</strong> In development - will be available in Q2 2025
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Traditional Withdrawal Methods */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">Traditional Withdrawal Methods</h2>
                <p className="text-lg text-muted-foreground">
                  Receive payouts via mobile money, bank transfers, and payment gateways
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-8 h-8 text-primary" />
                      <CardTitle>Mobile Money</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Receive payouts directly to your mobile money account - M-Pesa, Airtel Money, MTN Mobile Money.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Direct mobile money transfers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Processing within 24 hours</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Low transaction fees</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Banknote className="w-8 h-8 text-accent" />
                      <CardTitle>Bank Transfers</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Receive payouts via bank transfer through Stripe or Paystack to your local bank account.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Secure bank-to-bank transfers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Support for major African banks</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Processing within 3-5 business days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Withdrawal Information */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Withdrawal Information</CardTitle>
                <CardDescription className="text-lg">
                  Transparent payout process with Smart Royalties automation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Payout Schedule</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>Frequency:</strong> Monthly automated payouts</li>
                      <li>• <strong>Minimum threshold:</strong> $10 USD equivalent</li>
                      <li>• <strong>Processing time:</strong> Instant for crypto, 3-5 days for fiat</li>
                      <li>• <strong>Currency support:</strong> ICP, USDT, USDC, USD, local currencies</li>
                      <li>• <strong>Smart Royalties:</strong> Automated blockchain distribution</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Withdrawal Fees</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>Plug Wallet:</strong> Zero fees</li>
                      <li>• <strong>Stoic Wallet:</strong> Zero fees</li>
                      <li>• <strong>ICP/USDT/USDC:</strong> Network fees only (minimal)</li>
                      <li>• <strong>Stripe:</strong> 2.9% + $0.30 per transaction</li>
                      <li>• <strong>Paystack:</strong> 1.5% + local fees</li>
                      <li>• <strong>Mobile Money:</strong> Operator fees apply</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6">
                  <img 
                    src="/assets/generated/creator-withdrawal-dashboard.dim_800x600.png" 
                    alt="Creator withdrawal dashboard" 
                    className="w-full max-w-2xl mx-auto h-auto rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Notes */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-primary" />
                  <CardTitle>Security & Best Practices</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Wallet Security</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Never share your private keys or seed phrases</li>
                      <li>• Use hardware wallets for large amounts</li>
                      <li>• Enable two-factor authentication (2FA)</li>
                      <li>• Verify wallet addresses before confirming</li>
                      <li>• Keep your wallet software updated</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Payment Security</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• All transactions are encrypted end-to-end</li>
                      <li>• Smart Royalties provide transparent tracking</li>
                      <li>• Blockchain verification for all payouts</li>
                      <li>• No sensitive data stored on our servers</li>
                      <li>• PCI-DSS compliant payment processing</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Security & Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center border-0 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Secure Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All transactions are encrypted and processed through secure, certified payment gateways with PCI-DSS compliance and blockchain verification.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 bg-gradient-to-br from-accent/5 to-secondary/5">
            <CardHeader>
              <Clock className="w-12 h-12 text-accent mx-auto mb-4" />
              <CardTitle>Instant Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Crypto payments are instant. Card payments activate immediately after confirmation with automatic conversion to platform tokens.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 bg-gradient-to-br from-secondary/5 to-primary/5">
            <CardHeader>
              <Globe className="w-12 h-12 text-secondary mx-auto mb-4" />
              <CardTitle>Global Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Support for multiple currencies and payment methods across Africa and worldwide with local pricing and payment options.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
