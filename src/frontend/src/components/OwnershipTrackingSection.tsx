import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, FileText, BarChart3, Lock, CheckCircle, Eye, TrendingUp, Award } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function OwnershipTrackingSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-500/10 text-blue-600 border-blue-500/20">
            <Shield className="w-3 h-3 mr-1" />
            Full Ownership
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            You Own Your Content 100%
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Blockchain-verified ownership certificates and transparent rights tracking. Your content, your rules, your revenue.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="relative">
            <img
              src="/assets/generated/ownership-tracking-dashboard.dim_800x600.png"
              alt="Ownership tracking dashboard showing blockchain certificates"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>

          <div className="space-y-6">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Blockchain Certificates</CardTitle>
                    <CardDescription>Immutable proof of ownership</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Every upload generates a unique NFT certificate stored on the Internet Computer blockchain. This is your permanent, tamper-proof proof of ownership.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Lock className="w-3 h-3" />
                    <span>Immutable</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>Secure</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>Verifiable</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Usage Analytics</CardTitle>
                    <CardDescription>Track every view and interaction</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  See exactly how your content is being used. Real-time analytics show views, engagement, geographic distribution, and revenue attribution.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Real-time</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <BarChart3 className="w-3 h-3" />
                    <span>Detailed</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Award className="w-3 h-3" />
                    <span>Transparent</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Rights Protection</CardTitle>
                    <CardDescription>Automated copyright enforcement</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your ownership is protected by smart contracts. Unauthorized use is automatically detected and flagged, with built-in dispute resolution.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ownership Dashboard Preview */}
        <div className="bg-card rounded-2xl p-8 border border-border mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Your Ownership Dashboard</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-500/5 rounded-xl border border-blue-500/20">
              <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Content Registry</h4>
              <p className="text-sm text-muted-foreground">
                All your content with blockchain certificates and ownership proofs
              </p>
            </div>

            <div className="text-center p-6 bg-purple-500/5 rounded-xl border border-purple-500/20">
              <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Usage Tracking</h4>
              <p className="text-sm text-muted-foreground">
                Real-time analytics on views, engagement, and revenue attribution
              </p>
            </div>

            <div className="text-center p-6 bg-green-500/5 rounded-xl border border-green-500/20">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Rights Management</h4>
              <p className="text-sm text-muted-foreground">
                Control licensing, permissions, and automated copyright protection
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">100% Ownership</h4>
            <p className="text-sm text-muted-foreground">
              You retain all rights
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <Lock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Blockchain Secured</h4>
            <p className="text-sm text-muted-foreground">
              Immutable proof of ownership
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <Eye className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Full Transparency</h4>
            <p className="text-sm text-muted-foreground">
              Track every use of your content
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Automated Protection</h4>
            <p className="text-sm text-muted-foreground">
              Smart contract enforcement
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            onClick={() => navigate({ to: '/enhanced-creator' })}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8"
          >
            <Shield className="w-5 h-5 mr-2" />
            View Your Ownership Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
}
