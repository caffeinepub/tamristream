import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Shield, Award, Eye, Download, Lock, CheckCircle } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function OwnershipTrackingSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">
            <Award className="w-3 h-3 mr-1" />
            Content Ownership
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Full Ownership & Rights Tracking
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Maintain complete ownership of your content with blockchain-verified rights management and transparent tracking.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="relative">
            <img
              src="/assets/generated/ownership-tracking-dashboard.dim_800x600.png"
              alt="Ownership tracking dashboard interface"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">You Own Your Content</h3>
                <p className="text-muted-foreground">
                  Unlike traditional platforms, you retain 100% ownership of your movies, music, and content. We never claim rights to your work.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Blockchain Certificates</h3>
                <p className="text-muted-foreground">
                  Every upload receives a blockchain certificate proving your ownership and upload date, creating an immutable record.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Usage Analytics</h3>
                <p className="text-muted-foreground">
                  Track exactly where and how your content is being viewed, with detailed analytics on views, streams, and engagement.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Rights Protection</h3>
                <p className="text-muted-foreground">
                  Automated content protection with takedown capabilities. Your intellectual property is safeguarded at all times.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ownership Dashboard Preview */}
        <Card className="border-0 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
          <CardHeader>
            <CardTitle className="text-2xl">Your Ownership Dashboard</CardTitle>
            <CardDescription>
              Comprehensive tracking and management of all your uploaded content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Content Registry</h4>
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    All uploads cataloged
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Blockchain timestamps
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Ownership certificates
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Usage Tracking</h4>
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Real-time view counts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Geographic analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Engagement metrics
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Rights Management</h4>
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Content protection
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Licensing controls
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Takedown tools
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={() => navigate({ to: '/creator-dashboard' })}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Access Your Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-4 gap-6 mt-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold mb-2">100% Ownership</h4>
            <p className="text-sm text-muted-foreground">
              You keep all rights
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold mb-2">Protected</h4>
            <p className="text-sm text-muted-foreground">
              Blockchain verified
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold mb-2">Transparent</h4>
            <p className="text-sm text-muted-foreground">
              Full visibility
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-amber-600" />
            </div>
            <h4 className="font-semibold mb-2">Documented</h4>
            <p className="text-sm text-muted-foreground">
              Immutable records
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
