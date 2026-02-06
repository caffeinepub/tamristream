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
              onClick={() => isAuthenticated ? navigate({ to: '/enhanced-creator-dashboard' }) : handleAuth()}
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
                On-Chain Smart Contracts
              </h2>
            </div>
            <p className="text-2xl text-zinc-200 max-w-4xl mx-auto mb-8 font-semibold">
              Every film gets a unique on-chain ID (NFT/canister) with transparent royalty tracking and instant payouts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-black/60 rounded-2xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Film className="w-7 h-7 text-purple-400" />
                Unique NFT Per Film
              </h3>
              <p className="text-zinc-300 text-lg mb-6">
                Each uploaded film is minted as a unique NFT representing digital rights ownership. 
                All transactions and royalties are tracked on the blockchain.
              </p>
              <ul className="space-y-4 text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                  <span>Unique canister ID for each film</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                  <span>NFT ownership certificate</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                  <span>Immutable blockchain record</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                  <span>Public verification on ICP Explorer</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/60 rounded-2xl p-8 border border-blue-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Users className="w-7 h-7 text-blue-400" />
                Multi-Contributor Royalties
              </h3>
              <p className="text-zinc-300 text-lg mb-6">
                Define revenue splits for all contributors: directors, producers, actors, editors, and more. 
                Automatic distribution based on smart contract rules.
              </p>
              <ul className="space-y-4 text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <span>Customizable revenue split percentages</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <span>Automatic payout distribution</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <span>Real-time earnings tracking per contributor</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <span>Transparent transaction history</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => isAuthenticated ? navigate({ to: '/upload' }) : handleAuth()}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-10 py-7 text-xl font-bold rounded-xl shadow-2xl hover:shadow-purple-500/50 transition-all"
            >
              <Film className="w-6 h-6 mr-3" />
              {isAuthenticated ? 'Upload Your Film' : 'Login to Upload Film'}
            </Button>
          </div>
        </div>
      </section>

      {/* Creator DAO - Enhanced Visibility */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-8">
        <div className="bg-gradient-to-r from-green-900/50 via-emerald-900/50 to-green-900/50 rounded-3xl p-10 border-2 border-green-500/50 shadow-2xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg">
                <Vote className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-5xl font-bold text-white">
                Creator DAO Governance
              </h2>
            </div>
            <p className="text-2xl text-zinc-200 max-w-4xl mx-auto mb-8 font-semibold">
              Democratic platform governance. Vote on policies, royalty splits, content standards, and feature development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-black/60 rounded-xl p-6 border border-green-500/30 text-center">
              <Vote className="w-10 h-10 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Platform Policies</h3>
              <p className="text-zinc-400">Vote on platform rules and governance</p>
            </div>
            <div className="bg-black/60 rounded-xl p-6 border border-emerald-500/30 text-center">
              <Coins className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Royalty Splits</h3>
              <p className="text-zinc-400">Decide revenue sharing percentages</p>
            </div>
            <div className="bg-black/60 rounded-xl p-6 border border-teal-500/30 text-center">
              <Shield className="w-10 h-10 text-teal-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Content Standards</h3>
              <p className="text-zinc-400">Set quality and moderation guidelines</p>
            </div>
            <div className="bg-black/60 rounded-xl p-6 border border-cyan-500/30 text-center">
              <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Feature Development</h3>
              <p className="text-zinc-400">Propose and vote on new features</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => isAuthenticated ? navigate({ to: '/creator-dao' }) : handleAuth()}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-10 py-7 text-xl font-bold rounded-xl shadow-2xl hover:shadow-green-500/50 transition-all"
            >
              <Vote className="w-6 h-6 mr-3" />
              {isAuthenticated ? 'Participate in DAO' : 'Login to Join DAO'}
            </Button>
          </div>
        </div>
      </section>

      {/* AI + Personalization Layer - Enhanced Visibility */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-8" aria-labelledby="ai-personalization-heading">
        <div className="bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-green-900/50 rounded-3xl p-10 border-2 border-purple-500/50 shadow-2xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-12 h-12 text-purple-400" />
              <Languages className="w-10 h-10 text-blue-400" />
              <TrendingUp className="w-10 h-10 text-green-400" />
            </div>
            <h2 id="ai-personalization-heading" className="text-5xl font-bold text-white mb-6">
              AI-Powered Personalization
            </h2>
            <p className="text-2xl text-zinc-200 max-w-4xl mx-auto mb-8 font-semibold">
              Transparent AI recommendation engine, multi-language support for 10+ languages, and bias-free ranking system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-black/60 rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500 transition-all hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Sparkles className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Indie Discovery</h3>
              </div>
              <p className="text-zinc-300 text-lg mb-6">
                AI surfaces hidden gems and independent African films, ensuring equal visibility for all creators
              </p>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                  <span>Quality-based recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                  <span>Balanced content promotion</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                  <span>Creator diversity focus</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/60 rounded-2xl p-8 border border-blue-500/30 hover:border-blue-500 transition-all hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Languages className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Multi-Language</h3>
              </div>
              <p className="text-zinc-300 text-lg mb-6">
                AI-powered translation supporting 10+ languages including Swahili, Yoruba, Hausa, French, Arabic
              </p>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <span>Real-time subtitle generation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <span>Cultural context tooltips</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <span>Interactive language learning</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/60 rounded-2xl p-8 border border-green-500/30 hover:border-green-500 transition-all hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Transparent Ranking</h3>
              </div>
              <p className="text-zinc-300 text-lg mb-6">
                Open-source algorithm with complete transparency. See exactly why content is trending
              </p>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span>Bias-free ranking factors</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span>Algorithm explanations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span>User control over preferences</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => isAuthenticated ? navigate({ to: '/ai-personalization' }) : handleAuth()}
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 hover:from-purple-700 hover:via-blue-700 hover:to-green-700 text-white px-10 py-7 text-xl font-bold rounded-xl shadow-2xl hover:shadow-purple-500/50 transition-all"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              {isAuthenticated ? 'Explore AI Features' : 'Login to Explore AI Features'}
            </Button>
          </div>
        </div>
      </section>

      {/* Audience Rewards & Engagement - Enhanced Visibility */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-8" aria-labelledby="audience-rewards-heading">
        <div className="bg-gradient-to-r from-amber-900/50 via-orange-900/50 to-amber-900/50 rounded-3xl p-10 border-2 border-amber-500/50 shadow-2xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Coins className="w-12 h-12 text-amber-400" />
              <Users className="w-10 h-10 text-orange-400" />
              <Gift className="w-10 h-10 text-amber-400" />
            </div>
            <h2 id="audience-rewards-heading" className="text-5xl font-bold text-white mb-6">
              Audience Rewards & Engagement
            </h2>
            <p className="text-2xl text-zinc-200 max-w-4xl mx-auto mb-8 font-semibold">
              Earn $TAMRI tokens for watching, rating, and sharing. Complete referral missions and unlock exclusive NFT collectibles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-black/60 rounded-2xl p-8 border border-amber-500/30 hover:border-amber-500 transition-all hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <Coins className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Watch-to-Earn</h3>
              </div>
              <p className="text-zinc-300 text-lg mb-6">
                Earn tokens for every movie you watch, review you write, and content you share
              </p>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                  <span>10 tokens per movie watched</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                  <span>15 tokens for detailed reviews</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                  <span>Daily & weekly bonuses</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/60 rounded-2xl p-8 border border-orange-500/30 hover:border-orange-500 transition-all hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <Users className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Referral Missions</h3>
              </div>
              <p className="text-zinc-300 text-lg mb-6">
                Invite friends and earn bonus tokens. Complete missions for international shares
              </p>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-400 mt-1 shrink-0" />
                  <span>50 tokens per referral</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-400 mt-1 shrink-0" />
                  <span>Bonus for international shares</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-400 mt-1 shrink-0" />
                  <span>Leaderboard competitions</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/60 rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500 transition-all hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Gift className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">NFT Collectibles</h3>
              </div>
              <p className="text-zinc-300 text-lg mb-6">
                Unlock exclusive NFT collectibles including movie posters and behind-the-scenes content
              </p>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                  <span>Exclusive movie posters</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                  <span>Behind-the-scenes clips</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                  <span>Limited edition collectibles</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => isAuthenticated ? navigate({ to: '/audience-rewards' }) : handleAuth()}
              size="lg"
              className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 hover:from-amber-700 hover:via-orange-700 hover:to-amber-700 text-black px-10 py-7 text-xl font-bold rounded-xl shadow-2xl hover:shadow-amber-500/50 transition-all"
            >
              <Coins className="w-6 h-6 mr-3" />
              {isAuthenticated ? 'Start Earning Rewards' : 'Login to Start Earning'}
            </Button>
          </div>
        </div>
      </section>

      <PartnershipOfferSection />

      {/* Community & Cultural Impact Section - Enhanced Visibility */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-8">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-white mb-6">Community & Cultural Impact</h2>
          <p className="text-2xl text-zinc-300 max-w-4xl mx-auto mb-10 font-semibold">
            Empowering African creators through community funding, free education, and regional support networks. 
            Join us in building the future of African storytelling.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-3 bg-purple-900/50 px-6 py-4 rounded-xl border border-purple-500/30">
              <Film className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-semibold text-white">Tamri Originals</span>
            </div>
            <div className="flex items-center gap-3 bg-blue-900/50 px-6 py-4 rounded-xl border border-blue-500/30">
              <GraduationCap className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-semibold text-white">Creator Academy</span>
            </div>
            <div className="flex items-center gap-3 bg-green-900/50 px-6 py-4 rounded-xl border border-green-500/30">
              <Building2 className="w-8 h-8 text-green-400" />
              <span className="text-xl font-semibold text-white">Local Film Hubs</span>
            </div>
          </div>
        </div>
      </section>

      <TamriOriginalsSection />
      <CreatorAcademySection />
      <LocalFilmHubsSection />

      {/* Financial Ecosystem Expansion - Enhanced Visibility */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-8">
        <div className="bg-gradient-to-r from-cyan-900/50 via-teal-900/50 to-cyan-900/50 rounded-3xl p-10 border-2 border-cyan-500/50 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold text-white mb-6">
              Financial Ecosystem Expansion
            </h2>
            <p className="text-2xl text-zinc-200 max-w-4xl mx-auto mb-8 font-semibold">
              Creator staking, multi-currency payments, and Tamri Wallet for seamless financial management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-black/60 rounded-2xl p-8 border border-cyan-500/30 text-center">
              <div className="p-4 bg-cyan-500/20 rounded-xl inline-block mb-6">
                <TrendingUp className="w-10 h-10 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Creator Staking</h3>
              <p className="text-zinc-300 text-lg">
                Stake tokens to support favorite creators and earn rewards based on their performance
              </p>
            </div>

            <div className="bg-black/60 rounded-2xl p-8 border border-teal-500/30 text-center">
              <div className="p-4 bg-teal-500/20 rounded-xl inline-block mb-6">
                <Coins className="w-10 h-10 text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Multi-Currency</h3>
              <p className="text-zinc-300 text-lg">
                Accept payments in crypto (ICP, USDT, USDC) and mobile money (M-Pesa, Paystack)
              </p>
            </div>

            <div className="bg-black/60 rounded-2xl p-8 border border-blue-500/30 text-center">
              <div className="p-4 bg-blue-500/20 rounded-xl inline-block mb-6">
                <Shield className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Tamri Wallet</h3>
              <p className="text-zinc-300 text-lg">
                Integrated wallet for managing earnings, staking, and instant withdrawals
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => isAuthenticated ? navigate({ to: '/instant-withdrawal' }) : handleAuth()}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-10 py-7 text-xl font-bold rounded-xl shadow-2xl hover:shadow-cyan-500/50 transition-all"
            >
              <Coins className="w-6 h-6 mr-3" />
              {isAuthenticated ? 'Manage Finances' : 'Login to Access Wallet'}
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="security-heading">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4" role="img" aria-label="Security icons">
            <Shield className="w-8 h-8 text-blue-600" aria-hidden="true" />
            <Lock className="w-6 h-6 text-blue-600" aria-hidden="true" />
          </div>
          <h2 id="security-heading" className="text-3xl font-bold text-white mb-4">
            Secure & Private Streaming
          </h2>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto mb-6">
            Your data is protected with enterprise-grade encryption. All connections are secured via HTTPS/SSL, 
            and we use decentralized Internet Identity for authentication—no passwords to remember or compromise.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-300" role="list" aria-label="Security features">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
              <span>SSL/TLS Encrypted</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
              <span>GDPR Compliant</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
              <span>Decentralized Identity</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
              <span>Blockchain Verified</span>
            </li>
          </ul>
        </div>

        <article className="bg-zinc-900 rounded-2xl shadow-2xl p-8 max-w-md mx-auto mb-16 border border-zinc-800" aria-labelledby="login-heading">
          <div className="flex justify-center mb-6">
            <img
              src="/assets/generated/app-logo.png"
              alt="TamriStream logo - African streaming platform"
              className="h-16 w-auto"
              loading="eager"
            />
          </div>
          <h1 id="login-heading" className="text-3xl font-bold text-center text-white mb-2">
            Welcome to TamriStream
          </h1>
          <p className="text-center text-zinc-400 mb-8">
            Creator-first streaming platform for African content
          </p>

          <Button
            onClick={handleAuth}
            disabled={disabled}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black py-6 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black mb-4"
            aria-label={buttonText}
            aria-busy={disabled}
          >
            {buttonText}
          </Button>

          {isAuthenticated && (
            <Button
              onClick={handleGetStarted}
              variant="outline"
              className="w-full border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black py-6 text-lg font-semibold rounded-lg transition-all duration-200"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Watching
            </Button>
          )}

          <p className="text-xs text-zinc-500 text-center mt-4">
            By logging in, you agree to our{' '}
            <a href="/terms" className="text-amber-500 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-500 rounded">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-amber-500 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-500 rounded">
              Privacy Policy
            </a>
          </p>
        </article>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16" aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">Platform Features</h2>
          
          <article className="text-center p-6 bg-zinc-900 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-zinc-800">
            <Film className="w-12 h-12 text-amber-500 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-white mb-2">African Cinema</h3>
            <p className="text-zinc-400">
              Discover thousands of movies from Nollywood, Ghallywood, and beyond
            </p>
          </article>

          <article className="text-center p-6 bg-zinc-900 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-zinc-800">
            <Music className="w-12 h-12 text-amber-500 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-white mb-2">Music Streaming</h3>
            <p className="text-zinc-400">
              Listen to the best African music with 70-90% artist revenue share
            </p>
          </article>

          <article className="text-center p-6 bg-zinc-900 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-zinc-800">
            <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-white mb-2">Sports Content</h3>
            <p className="text-zinc-400">
              Watch highlights, analysis, and live previews of African sports
            </p>
          </article>

          <article className="text-center p-6 bg-zinc-900 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-zinc-800">
            <Radio className="w-12 h-12 text-amber-500 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-white mb-2">Podcasts & Radio</h3>
            <p className="text-zinc-400">
              Enjoy African podcasts and live radio from across the continent
            </p>
          </article>
        </section>

        <aside className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 text-black text-center mb-16" aria-labelledby="benefits-heading">
          <Sparkles className="w-12 h-12 mx-auto mb-4" aria-hidden="true" />
          <h2 id="benefits-heading" className="text-3xl font-bold mb-4">Why Choose TamriStream?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Creator-First</h3>
              <p className="text-amber-950">
                70-90% revenue share with transparent on-chain payments
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Instant Payouts</h3>
              <p className="text-amber-950">
                Get paid in crypto or fiat with flexible payout options
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Full Ownership</h3>
              <p className="text-amber-950">
                You own your content with blockchain-verified rights
              </p>
            </div>
          </div>
        </aside>
      </section>

      <SmartRoyaltiesSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <RevenueModelDisplay />
      </section>

      <OnChainPaymentsSection />
      <InstantPayoutsSection />
      <OwnershipTrackingSection />
      
      <FutureAddOnsSection />
      
      <GenresSection onMovieSelect={() => {}} />
      <HowItWorksSection />
      <BusinessModelSection />

      <GDPRConsentBanner />
    </div>
  );
}

export default LoginScreen;

