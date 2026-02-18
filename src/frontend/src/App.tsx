import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { Header } from './components/Header';
import Footer from './components/Footer';
import { LoginScreen } from './components/LoginScreen';
import { MovieCatalog } from './components/MovieCatalog';
import { UserProfile } from './components/UserProfile';
import { CreatorPortal } from './components/CreatorPortal';
import WatchPartyViewWrapper from './components/WatchPartyViewWrapper';
import TopPicksSectionWrapper from './components/TopPicksSectionWrapper';
import { PaymentOptions } from './components/PaymentOptions';
import { MusicVideosSection } from './components/MusicVideosSection';
import { InteractiveTrivia } from './components/InteractiveTrivia';
import { CommunityPlaylistsSection } from './components/CommunityPlaylistsSection';
import { CreatorFollowingSection } from './components/CreatorFollowingSection';
import { BusinessModelSection } from './components/BusinessModelSection';
import { MusicStreamingSection } from './components/MusicStreamingSection';
import { ArtistDashboard } from './components/ArtistDashboard';
import { PersonalizedRecommendations } from './components/PersonalizedRecommendations';
import { UnlockableContentSection } from './components/UnlockableContentSection';
import { CommunityStakingSection } from './components/CommunityStakingSection';
import { LivePremiereEvents } from './components/LivePremiereEvents';
import { CreatorSpotlightSection } from './components/CreatorSpotlightSection';
import { FanRewardsSection } from './components/FanRewardsSection';
import { UserGeneratedPlaylistsSection } from './components/UserGeneratedPlaylistsSection';
import { SportsCreatorDashboard } from './components/SportsCreatorDashboard';
import { AdvancedAnalyticsDashboard } from './components/AdvancedAnalyticsDashboard';
import { InAppEventsSection } from './components/InAppEventsSection';
import { MerchandiseStore } from './components/MerchandiseStore';
import { KidsZoneSection } from './components/KidsZoneSection';
import { InteractiveLearningGames } from './components/InteractiveLearningGames';
import { SocialSharingSection } from './components/SocialSharingSection';
import { PodcastsRadioSection } from './components/PodcastsRadioSection';
import { MessagingCenter } from './components/MessagingCenter';
import { DailyChallenges } from './components/DailyChallenges';
import { ComingSoonSection } from './components/ComingSoonSection';
import { VideoReviewsSection } from './components/VideoReviewsSection';
import { FilmmakerUploadSection } from './components/FilmmakerUploadSection';
import { CreatorOnboardingProgram } from './components/CreatorOnboardingProgram';
import { ReviewerDashboard } from './components/ReviewerDashboard';
import { FanClubsSection } from './components/FanClubsSection';
import { SportsSection } from './components/SportsSection';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import GDPRConsentBanner from './components/GDPRConsentBanner';
import { OnChainPaymentsSection } from './components/OnChainPaymentsSection';
import { OwnershipTrackingSection } from './components/OwnershipTrackingSection';
import { InstantPayoutsSection } from './components/InstantPayoutsSection';
import { RevenueModelDisplay } from './components/RevenueModelDisplay';
import { SmartRoyaltiesDashboard } from './components/SmartRoyaltiesDashboard';
import { SmartRoyaltiesSection } from './components/SmartRoyaltiesSection';
import { CreatorVerificationForm } from './components/CreatorVerificationForm';
import { EnhancedMovieUploadForm } from './components/EnhancedMovieUploadForm';
import { EnhancedCreatorDashboard } from './components/EnhancedCreatorDashboard';
import { AdminApprovalDashboard } from './components/AdminApprovalDashboard';
import { TechnicalDocumentation } from './components/TechnicalDocumentation';
import { ProductionReadinessCheck } from './components/ProductionReadinessCheck';
import { PartnershipOfferSection } from './components/PartnershipOfferSection';
import { PartnershipApplicationForm } from './components/PartnershipApplicationForm';
import { AdminPartnershipDashboard } from './components/AdminPartnershipDashboard';
import { InstantWithdrawalSection } from './components/InstantWithdrawalSection';
import { MovieTransparencyPage } from './components/MovieTransparencyPage';
import { FutureAddOnsSection } from './components/FutureAddOnsSection';
import { VirtualFilmFestival } from './components/VirtualFilmFestival';
import { AIContentModeration } from './components/AIContentModeration';
import { CreatorAcademy } from './components/CreatorAcademy';
import { GeoTargetedContent } from './components/GeoTargetedContent';
import { VoiceSearchInterface } from './components/VoiceSearchInterface';
import { SmartTVInterface } from './components/SmartTVInterface';
import { AudienceRewardsSection } from './components/AudienceRewardsSection';
import { AIPersonalizationDashboard } from './components/AIPersonalizationDashboard';
import { TamriOriginalsSection } from './components/TamriOriginalsSection';
import { CreatorAcademySection } from './components/CreatorAcademySection';
import { LocalFilmHubsSection } from './components/LocalFilmHubsSection';
import { CreatorDAOInterface } from './components/CreatorDAOInterface';
import { TamriIntelligenceHub } from './components/TamriIntelligenceHub';
import DiagnosticsPage from './components/DiagnosticsPage';
import { InstallPromptBanner } from './components/InstallPromptBanner';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <GDPRConsentBanner />
      <InstallPromptBanner />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LoginScreen,
});

const moviesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/movies',
  component: MovieCatalog,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: UserProfile,
});

const creatorPortalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/creator-portal',
  component: CreatorPortal,
});

const watchPartyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/watch-party/$partyId',
  component: WatchPartyViewWrapper,
});

const topPicksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/top-picks',
  component: TopPicksSectionWrapper,
});

const paymentOptionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-options',
  component: PaymentOptions,
});

const musicVideosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/music-videos',
  component: MusicVideosSection,
});

const triviaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trivia',
  component: InteractiveTrivia,
});

const communityPlaylistsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/community-playlists',
  component: CommunityPlaylistsSection,
});

const creatorFollowingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/creator-following',
  component: CreatorFollowingSection,
});

const businessModelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/business-model',
  component: BusinessModelSection,
});

const musicStreamingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/music-streaming',
  component: MusicStreamingSection,
});

const artistDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/artist-dashboard',
  component: ArtistDashboard,
});

const personalizedRecommendationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/personalized-recommendations',
  component: PersonalizedRecommendations,
});

const unlockableContentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/unlockable-content',
  component: UnlockableContentSection,
});

const communityStakingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/community-staking',
  component: CommunityStakingSection,
});

const livePremiereRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/live-premiere',
  component: LivePremiereEvents,
});

const creatorSpotlightRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/creator-spotlight',
  component: CreatorSpotlightSection,
});

const fanRewardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/fan-rewards',
  component: FanRewardsSection,
});

const userPlaylistsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/user-playlists',
  component: UserGeneratedPlaylistsSection,
});

const sportsCreatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sports-creator',
  component: SportsCreatorDashboard,
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/analytics',
  component: AdvancedAnalyticsDashboard,
});

const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/events',
  component: InAppEventsSection,
});

const merchandiseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/merchandise',
  component: MerchandiseStore,
});

const kidsZoneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kids-zone',
  component: KidsZoneSection,
});

const learningGamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learning-games',
  component: InteractiveLearningGames,
});

const socialSharingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/social-sharing',
  component: SocialSharingSection,
});

const podcastsRadioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/podcasts-radio',
  component: PodcastsRadioSection,
});

const messagingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/messaging',
  component: MessagingCenter,
});

const challengesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/challenges',
  component: DailyChallenges,
});

const comingSoonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/coming-soon',
  component: ComingSoonSection,
});

const videoReviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/video-reviews',
  component: VideoReviewsSection,
});

const filmmakerUploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/filmmaker-upload',
  component: FilmmakerUploadSection,
});

const creatorOnboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/creator-onboarding',
  component: CreatorOnboardingProgram,
});

const reviewerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reviewer-dashboard',
  component: ReviewerDashboard,
});

const fanClubsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/fan-clubs',
  component: FanClubsSection,
});

const sportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sports',
  component: SportsSection,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyPolicy,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsOfService,
});

const onChainPaymentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/on-chain-payments',
  component: OnChainPaymentsSection,
});

const ownershipTrackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ownership-tracking',
  component: OwnershipTrackingSection,
});

const instantPayoutsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/instant-payouts',
  component: InstantPayoutsSection,
});

const revenueModelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/revenue-model',
  component: RevenueModelDisplay,
});

const smartRoyaltiesDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/smart-royalties-dashboard',
  component: SmartRoyaltiesDashboard,
});

const smartRoyaltiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/smart-royalties',
  component: SmartRoyaltiesSection,
});

const creatorVerificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/creator-verification',
  component: CreatorVerificationForm,
});

const enhancedUploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/enhanced-upload',
  component: EnhancedMovieUploadForm,
});

const enhancedCreatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/enhanced-creator',
  component: EnhancedCreatorDashboard,
});

const adminApprovalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin-approval',
  component: AdminApprovalDashboard,
});

const technicalDocsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/technical-docs',
  component: TechnicalDocumentation,
});

const productionReadinessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/production-readiness',
  component: ProductionReadinessCheck,
});

const partnershipOfferRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/partnership-offer',
  component: PartnershipOfferSection,
});

const partnershipApplicationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/partnership-application',
  component: PartnershipApplicationForm,
});

const adminPartnershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin-partnership',
  component: AdminPartnershipDashboard,
});

const instantWithdrawalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/instant-withdrawal',
  component: InstantWithdrawalSection,
});

const movieTransparencyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/movie-transparency/$movieId',
  component: MovieTransparencyPage,
});

const futureAddOnsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/future-addons',
  component: FutureAddOnsSection,
});

const virtualFestivalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/virtual-festival',
  component: VirtualFilmFestival,
});

const aiModerationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai-moderation',
  component: AIContentModeration,
});

const creatorAcademyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/creator-academy',
  component: CreatorAcademy,
});

const geoTargetedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/geo-targeted',
  component: GeoTargetedContent,
});

const voiceSearchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/voice-search',
  component: VoiceSearchInterface,
});

const smartTVRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/smart-tv',
  component: SmartTVInterface,
});

const audienceRewardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/audience-rewards',
  component: AudienceRewardsSection,
});

const aiPersonalizationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai-personalization',
  component: AIPersonalizationDashboard,
});

const tamriOriginalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tamri-originals',
  component: TamriOriginalsSection,
});

const creatorAcademySectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/creator-academy-section',
  component: CreatorAcademySection,
});

const localFilmHubsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/local-film-hubs',
  component: LocalFilmHubsSection,
});

const creatorDAORoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/creator-dao',
  component: CreatorDAOInterface,
});

const intelligenceHubRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/intelligence-hub',
  component: TamriIntelligenceHub,
});

const diagnosticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/diagnostics',
  component: DiagnosticsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  moviesRoute,
  profileRoute,
  creatorPortalRoute,
  watchPartyRoute,
  topPicksRoute,
  paymentOptionsRoute,
  musicVideosRoute,
  triviaRoute,
  communityPlaylistsRoute,
  creatorFollowingRoute,
  businessModelRoute,
  musicStreamingRoute,
  artistDashboardRoute,
  personalizedRecommendationsRoute,
  unlockableContentRoute,
  communityStakingRoute,
  livePremiereRoute,
  creatorSpotlightRoute,
  fanRewardsRoute,
  userPlaylistsRoute,
  sportsCreatorRoute,
  analyticsRoute,
  eventsRoute,
  merchandiseRoute,
  kidsZoneRoute,
  learningGamesRoute,
  socialSharingRoute,
  podcastsRadioRoute,
  messagingRoute,
  challengesRoute,
  comingSoonRoute,
  videoReviewsRoute,
  filmmakerUploadRoute,
  creatorOnboardingRoute,
  reviewerDashboardRoute,
  fanClubsRoute,
  sportsRoute,
  privacyRoute,
  termsRoute,
  onChainPaymentsRoute,
  ownershipTrackingRoute,
  instantPayoutsRoute,
  revenueModelRoute,
  smartRoyaltiesDashboardRoute,
  smartRoyaltiesRoute,
  creatorVerificationRoute,
  enhancedUploadRoute,
  enhancedCreatorRoute,
  adminApprovalRoute,
  technicalDocsRoute,
  productionReadinessRoute,
  partnershipOfferRoute,
  partnershipApplicationRoute,
  adminPartnershipRoute,
  instantWithdrawalRoute,
  movieTransparencyRoute,
  futureAddOnsRoute,
  virtualFestivalRoute,
  aiModerationRoute,
  creatorAcademyRoute,
  geoTargetedRoute,
  voiceSearchRoute,
  smartTVRoute,
  audienceRewardsRoute,
  aiPersonalizationRoute,
  tamriOriginalsRoute,
  creatorAcademySectionRoute,
  localFilmHubsRoute,
  creatorDAORoute,
  intelligenceHubRoute,
  diagnosticsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
            <RouterProvider router={router} />
          </Suspense>
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
