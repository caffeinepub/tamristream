import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Zap, Shield, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function CreatorFirstHero() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(251, 191, 36) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20">
              <Zap className="w-3 h-3 mr-1" />
              Creator-First Platform
            </Badge>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Empowering African Creators with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Fair Revenue
                </span>
              </h1>
              
              {/* Bold Promise */}
              <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 rounded-xl p-6 backdrop-blur-sm">
                <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                  "TamriStream pays more per view than any major platform"
                </p>
                <div className="flex items-center space-x-2 text-amber-400">
                  <Shield className="w-5 h-5" />
                  <p className="text-lg font-semibold">— and you can verify it yourself</p>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>

              <p className="text-xl text-zinc-300 leading-relaxed">
                TamriStream puts creators first with transparent on-chain payments, 70-90% revenue share, and instant payouts in crypto or fiat.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">70-90% Revenue Share</h3>
                  <p className="text-sm text-zinc-400">Industry-leading creator compensation</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">On-Chain Transparency</h3>
                  <p className="text-sm text-zinc-400">Blockchain-verified payments</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Instant Payouts</h3>
                  <p className="text-sm text-zinc-400">Crypto or fiat, your choice</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Full Ownership</h3>
                  <p className="text-sm text-zinc-400">You keep all rights to your content</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate({ to: '/creator-portal' })}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg px-8 py-6 h-auto rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
              >
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: '/enhanced-creator' })}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-6 h-auto rounded-full transition-all duration-300 hover:scale-105"
              >
                View Dashboard
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-zinc-400">Blockchain Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-zinc-400">No Hidden Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-zinc-400">Instant Payouts</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/assets/generated/creator-first-homepage-hero.dim_1200x600.jpg"
                alt="Creator empowerment showcase"
                className="w-full h-auto"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl p-6 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">70-90%</p>
                  <p className="text-sm text-muted-foreground">Creator Revenue</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl p-6 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">100%</p>
                  <p className="text-sm text-muted-foreground">Transparent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
