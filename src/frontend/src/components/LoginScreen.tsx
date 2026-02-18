import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Film, Music, Trophy, Radio, Sparkles, Shield, Lock, CheckCircle, Languages, TrendingUp, Users, Coins, Gift, Play, Vote, GraduationCap, Building2 } from 'lucide-react';
import { HeroBanner } from './HeroBanner';
import { CreatorFirstHero } from './CreatorFirstHero';
import { OnChainPaymentsSection } from './OnChainPaymentsSection';
import { InstantPayoutsSection } from './InstantPayoutsSection';
import { OwnershipTrackingSection } from './OwnershipTrackingSection';
import { BusinessModelSection } from './BusinessModelSection';
import { GenresSection } from './GenresSection';
import { HowItWorksSection } from './HowItWorksSection';
import { RevenueModelDisplay } from './RevenueModelDisplay';
import { SmartRoyaltiesSection } from './SmartRoyaltiesSection';
import { PartnershipOfferSection } from './PartnershipOfferSection';
import { FutureAddOnsSection } from './FutureAddOnsSection';
import { TamriOriginalsSection } from './TamriOriginalsSection';
import { CreatorAcademySection } from './CreatorAcademySection';
import { LocalFilmHubsSection } from './LocalFilmHubsSection';
import GDPRConsentBanner from './GDPRConsentBanner';
import { useNavigate } from '@tanstack/react-router';

export function LoginScreen() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';
  const buttonText = loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login with Internet Identity';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate({ to: '/movies' });
    } else {
      handleAuth();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
      <HeroBanner />

      <CreatorFirstHero />

      {/* Creator Empowerment Showcase - Enhanced Visibility */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-8" aria-labelledby="creator-empowerment-heading">
        <div className="bg-gradient-to-r from-amber-900/50 via-orange-900/50 to-amber-900/50 rounded-3xl p-10 border-2 border-amber-500/50 shadow-2xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg">
                <Film className="w-12 h-12 text-white" />
              </div>
              <h2 id="creator-empowerment-heading" className="text-5xl font-bold text-white">
                Creator Empowerment
              </h2>
            </div>
            <p className="text-2xl text-zinc-200 max-w-4xl mx-auto mb-8 font-semibold">
              TamriStream pays more per view than any major platform — and you can verify it yourself on the blockchain
            </p>
          </div>

          {/* Showcase Image */}
          <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/assets/generated/creator-empowerment-showcase.dim_800x600.jpg"
              alt="Creator Empowerment Showcase - African filmmakers and musicians earning fair revenue"
              width={800}
              height={600}
              className="w-full h-auto"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-black/60 rounded-2xl p-8 border border-amber-500/30 hover:border-amber-500 transition-all hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">70-90% Revenue Share</h3>
              </div>
              <p className="text-zinc-300 text-lg mb-4">
                Industry-leading revenue split. Keep 70-90% of all earnings from subscriptions, ads, and pay-per-view.
              </p>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                  <span>Subscription revenue: 80% to creators</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                  <span>Ad revenue: 75% to creators</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                  <span>Pay-per-view: 85% to creators</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                  <span>Tips & donations: 100% to creators</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/60 rounded-2xl p-8 border border-blue-500/30 hover:border-blue-500 transition-all hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Full Content Ownership</h3>
              </div>
              <p className="text-zinc-300 text-lg mb-4">
                You own your content 100%. Blockchain-verified ownership certificates and transparent rights tracking.
              </p>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <span>NFT-based ownership certificates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <span>On-chain rights verification</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <span>Usage analytics dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <span>Rights protection & enforcement</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/60 rounded-2xl p-8 border border-green-500/30 hover:border-green-500 transition-all hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Coins className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Instant Payouts</h3>
              </div>
              <p className="text-zinc-300 text-lg mb-4">
                Get paid instantly with crypto or local payment methods. No waiting periods, no minimum thresholds.
              </p>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span>ICP, USDT, USDC crypto payments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span>Mobile money (M-Pesa, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span>Stripe & Paystack integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span>Real-time earnings tracking</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => isAuthenticated ? navigate({ to: '/enhanced-creator' }) : handleAuth()}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black px-10 py-7 text-xl font-bold rounded-xl shadow-2xl hover:shadow-amber-500/50 transition-all"
            >
              <TrendingUp className="w-6 h-6 mr-3" />
              {isAuthenticated ? 'View Creator Dashboard' : 'Start Earning as a Creator'}
            </Button>
          </div>
        </div>
      </section>

      {/* On-Chain Smart Contracts Per Film - Enhanced Visibility */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-8">
        <div className="bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-purple-900/50 rounded-3xl p-10 border-2 border-purple-500/50 shadow-2xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-lg">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-5xl font-bold text-white">
                Smart Royalties System
              </h2>
            </div>
            <p className="text-2xl text-zinc-200 max-w-4xl mx-auto mb-8 font-semibold">
              Every film gets its own blockchain smart contract. Track every view, every payment, every split — all transparent and verifiable.
            </p>
          </div>

          {/* Smart Royalties Image */}
          <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/assets/generated/smart-royalties-infographic.dim_800x600.png"
              alt="Smart Royalties System - Blockchain-verified transparent payments"
              width={800}
              height={600}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-black/60 rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500 transition-all">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-purple-400" />
                Multi-Contributor Splits
              </h3>
              <p className="text-zinc-300 text-lg mb-4">
                Define revenue splits for directors, producers, actors, editors, and all contributors. Smart contracts automatically distribute earnings.
              </p>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                  <span>Automatic percentage-based splits</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                  <span>Real-time payment distribution</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                  <span>Transparent transaction logs</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/60 rounded-2xl p-8 border border-blue-500/30 hover:border-blue-500 transition-all">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-blue-400" />
                NFT Ownership Certificates
              </h3>
              <p className="text-zinc-300 text-lg mb-4">
                Each film gets a unique NFT certificate proving ownership and rights. Immutable, verifiable, and transferable.
              </p>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <span>Unique canister ID per film</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <span>On-chain ownership verification</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <span>ICP Explorer integration</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate({ to: '/smart-royalties' })}
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-black px-10 py-7 text-xl font-bold rounded-xl transition-all"
            >
              <Shield className="w-6 h-6 mr-3" />
              Explore Smart Royalties
            </Button>
          </div>
        </div>
      </section>

      <OnChainPaymentsSection />
      <InstantPayoutsSection />
      <OwnershipTrackingSection />

      <RevenueModelDisplay />
      <SmartRoyaltiesSection />

      <PartnershipOfferSection />

      <TamriOriginalsSection />
      <CreatorAcademySection />
      <LocalFilmHubsSection />

      <GenresSection onMovieSelect={() => {}} />
      <HowItWorksSection />

      <BusinessModelSection />

      <FutureAddOnsSection />

      {/* Platform Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            From streaming to earning, from discovery to community — TamriStream has it all
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Movies */}
          <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 rounded-2xl p-8 border border-red-500/30 hover:border-red-500 transition-all hover:scale-105 cursor-pointer"
            onClick={() => navigate({ to: '/movies' })}>
            <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Film className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Movies & Series</h3>
            <p className="text-zinc-300">
              Stream thousands of African films, documentaries, and series
            </p>
          </div>

          {/* Music */}
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500 transition-all hover:scale-105 cursor-pointer"
            onClick={() => navigate({ to: '/music-streaming' })}>
            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Music className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Music Streaming</h3>
            <p className="text-zinc-300">
              Discover and stream the best African music and music videos
            </p>
          </div>

          {/* Sports */}
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-2xl p-8 border border-green-500/30 hover:border-green-500 transition-all hover:scale-105 cursor-pointer"
            onClick={() => navigate({ to: '/sports' })}>
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Trophy className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Sports Content</h3>
            <p className="text-zinc-300">
              Watch live matches, highlights, and exclusive sports content
            </p>
          </div>

          {/* Podcasts & Radio */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-2xl p-8 border border-blue-500/30 hover:border-blue-500 transition-all hover:scale-105 cursor-pointer"
            onClick={() => navigate({ to: '/podcasts-radio' })}>
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Radio className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Podcasts & Radio</h3>
            <p className="text-zinc-300">
              Listen to African podcasts and live radio stations
            </p>
          </div>

          {/* AI Personalization */}
          <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/30 rounded-2xl p-8 border border-amber-500/30 hover:border-amber-500 transition-all hover:scale-105 cursor-pointer"
            onClick={() => navigate({ to: '/ai-personalization' })}>
            <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">AI Discovery</h3>
            <p className="text-zinc-300">
              Find hidden gems with AI-powered recommendations
            </p>
          </div>

          {/* Community Features */}
          <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/30 rounded-2xl p-8 border border-pink-500/30 hover:border-pink-500 transition-all hover:scale-105 cursor-pointer"
            onClick={() => navigate({ to: '/fan-rewards' })}>
            <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Gift className="w-8 h-8 text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Fan Rewards</h3>
            <p className="text-zinc-300">
              Earn tokens, unlock NFTs, and get exclusive perks
            </p>
          </div>

          {/* Watch Parties */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/30 rounded-2xl p-8 border border-cyan-500/30 hover:border-cyan-500 transition-all hover:scale-105 cursor-pointer"
            onClick={() => navigate({ to: '/events' })}>
            <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Live Events</h3>
            <p className="text-zinc-300">
              Join watch parties, Q&As, and virtual festivals
            </p>
          </div>

          {/* Creator Tools */}
          <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 rounded-2xl p-8 border border-orange-500/30 hover:border-orange-500 transition-all hover:scale-105 cursor-pointer"
            onClick={() => navigate({ to: '/creator-portal' })}>
            <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Play className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Creator Portal</h3>
            <p className="text-zinc-300">
              Upload content, track earnings, and grow your audience
            </p>
          </div>
        </div>
      </section>

      {/* Community & Governance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-indigo-900/50 via-purple-900/50 to-indigo-900/50 rounded-3xl p-10 border-2 border-indigo-500/50 shadow-2xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg">
                <Vote className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-5xl font-bold text-white">
                Community & Cultural Impact
              </h2>
            </div>
            <p className="text-2xl text-zinc-200 max-w-4xl mx-auto mb-8 font-semibold">
              More than a platform — a movement to empower African creators and preserve cultural heritage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/60 rounded-2xl p-8 border border-indigo-500/30 hover:border-indigo-500 transition-all hover:scale-105 cursor-pointer"
              onClick={() => navigate({ to: '/tamri-originals' })}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-500/20 rounded-xl">
                  <Film className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Tamri Originals</h3>
              </div>
              <p className="text-zinc-300 text-lg">
                Community-funded African original content with DAO voting and revenue sharing
              </p>
            </div>

            <div className="bg-black/60 rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500 transition-all hover:scale-105 cursor-pointer"
              onClick={() => navigate({ to: '/creator-academy-section' })}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <GraduationCap className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Creator Academy</h3>
              </div>
              <p className="text-zinc-300 text-lg">
                Free training for African youth in filmmaking, editing, and blockchain literacy
              </p>
            </div>

            <div className="bg-black/60 rounded-2xl p-8 border border-pink-500/30 hover:border-pink-500 transition-all hover:scale-105 cursor-pointer"
              onClick={() => navigate({ to: '/local-film-hubs' })}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-pink-500/20 rounded-xl">
                  <Building2 className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Local Film Hubs</h3>
              </div>
              <p className="text-zinc-300 text-lg">
                Regional creator centers with equipment, training, and networking opportunities
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button
              onClick={() => navigate({ to: '/creator-dao' })}
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-black px-10 py-7 text-xl font-bold rounded-xl transition-all"
            >
              <Vote className="w-6 h-6 mr-3" />
              Join Creator DAO
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-16 text-center shadow-2xl">
          <h2 className="text-5xl font-bold text-black mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-2xl text-black/80 mb-10 max-w-3xl mx-auto">
            Join thousands of African creators and fans on the platform that puts creators first
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={handleGetStarted}
              disabled={disabled}
              size="lg"
              className="bg-black hover:bg-black/90 text-white px-12 py-8 text-2xl font-bold rounded-xl shadow-2xl"
            >
              {buttonText}
            </Button>
            <Button
              onClick={() => navigate({ to: '/movies' })}
              size="lg"
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-2 border-black/30 text-black hover:bg-white hover:text-black px-12 py-8 text-2xl font-bold rounded-xl"
            >
              Browse Movies
            </Button>
          </div>
        </div>
      </section>

      <GDPRConsentBanner />
    </div>
  );
}
