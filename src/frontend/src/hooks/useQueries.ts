import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { 
  Movie, 
  UserProfile, 
  Rating, 
  CreatorSubmission, 
  TopPick, 
  WatchParty, 
  BulkUploadItem, 
  RevenueShare, 
  PaymentMethod, 
  RevenueModel,
  SmartRoyalty,
  RoyaltyEvent,
  PayoutRecord,
  CreatorVerification,
  AdminApproval
} from '../backend';
import { Principal } from '@icp-sdk/core/principal';
import { toast } from 'sonner';

// Mock types for features not yet in backend
export type MusicVideo = {
  title: string;
  artist: string;
  description: string;
  thumbnailPath: string;
  videoPath: string;
  genre: string;
};

export type Playlist = {
  name: string;
  musicVideoIds: string[];
};

export type ExtrasContent = {
  title: string;
  description: string;
  contentType: string;
  thumbnailPath: string;
  videoPath: string;
  associatedMovie: string;
};

export type MusicTrack = {
  title: string;
  artist: string;
  album: string;
  genre: string;
  audioPath: string;
  coverImagePath: string;
  price: bigint;
  averageRating: bigint;
  reviewCount: bigint;
  playCount: bigint;
  releaseDate: bigint;
  artistProfile: Principal;
};

export type ArtistProfile = {
  name: string;
  bio: string;
  photoPath: string;
  socialLinks: string[];
  musicTrackIds: string[];
  earnings: bigint;
  followers: bigint;
  verified: boolean;
};

export type MusicPlaylist = {
  name: string;
  musicTrackIds: string[];
  isPublic: boolean;
  created: bigint;
};

export type FilmmakerSubmission = {
  id: string;
  title: string;
  description: string;
  director: string;
  cast: string;
  category: string;
  rating: string;
  posterPath: string;
  trailerPath: string;
  rightsVerification: string;
  contactInfo: string;
  paymentPreferences: string;
  status: string;
  created: bigint;
};

export type SportsContent = {
  title: string;
  description: string;
  sportType: string;
  eventInfo: string;
  thumbnailPath: string;
  videoPath: string;
  accessTier: string;
  averageRating: bigint;
  reviewCount: bigint;
  creator: Principal;
  created: bigint;
};

export type LiveMatch = {
  id: string;
  title: string;
  date: bigint;
  time: string;
  venue: string;
  teamInfo: string;
  countdown: bigint;
  status: string;
  created: bigint;
};

export type SportsCreatorSubmission = {
  id: string;
  title: string;
  description: string;
  creatorName: string;
  sportType: string;
  eventInfo: string;
  contactInfo: string;
  paymentPreferences: string;
  status: string;
  created: bigint;
};

// Admin check with optimized caching
export function useIsAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

// Check if current user is admin (alias for consistency)
export function useIsCurrentUserAdmin() {
  return useIsAdmin();
}

// Mock hook for uploading movie content (for demo purposes)
export function useUploadMovieContent() {
  return useMutation({
    mutationFn: async ({ file, path, onProgress }: { file: File; path: string; onProgress?: (percentage: number) => void }) => {
      if (onProgress) {
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          onProgress(i);
        }
      }
      return { path, url: URL.createObjectURL(file) };
    },
  });
}

// Business model query (mock data with caching)
export function useGetBusinessModel() {
  return useQuery({
    queryKey: ['businessModel'],
    queryFn: async () => {
      return {
        subscriptionTiers: [
          {
            name: 'Free Tier',
            price: 0,
            features: [
              'Access to substantial movie catalog',
              'Standard definition streaming',
              'Ad-supported viewing',
              'Community features access',
              'Basic music library access'
            ],
            accessType: 'Ad-supported'
          },
          {
            name: 'Premium Subscription',
            price: 3,
            features: [
              'Unlimited access to full catalog',
              'HD streaming quality',
              'Ad-free experience',
              'Early access to new releases',
              'Offline downloads',
              'Premium music library'
            ],
            accessType: 'Full'
          },
          {
            name: 'Pay-Per-View',
            price: 1,
            features: [
              'Individual movie rentals',
              'Premium exclusive content',
              'HD streaming quality',
              'No subscription required',
              '48-hour viewing window'
            ],
            accessType: 'Individual'
          }
        ],
        partnershipBenefits: [
          {
            name: 'Nollywood Partnership',
            description: 'Exclusive access to latest Nollywood releases and classic films',
            type: 'Film Industry'
          },
          {
            name: 'Pan-African Distribution',
            description: 'Content from Ghana, Kenya, South Africa, and across the continent',
            type: 'Distribution'
          },
          {
            name: 'Film School Collaboration',
            description: 'Supporting emerging filmmakers through educational partnerships',
            type: 'Education'
          }
        ],
        flexibleAccessOptions: [
          {
            name: 'Mix and Match',
            description: 'Combine free tier with pay-per-view for maximum flexibility',
            type: 'Flexibility'
          },
          {
            name: 'Family Sharing',
            description: 'Share premium subscription with up to 5 family members',
            type: 'Access'
          },
          {
            name: 'Student Discount',
            description: '50% off premium subscription for verified students',
            type: 'Education'
          },
          {
            name: 'Regional Pricing',
            description: 'Adjusted pricing based on local economic conditions',
            type: 'Regional'
          }
        ]
      };
    },
    staleTime: 1000 * 60 * 30,
  });
}

// Audience Rewards & Engagement System Hooks (Mock implementations)
export function useGetTamriTokenBalance() {
  const { actor, isFetching } = useActor();

  return useQuery<number>({
    queryKey: ['tamriTokenBalance'],
    queryFn: async () => {
      if (!actor) return 0;
      return 1250;
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetRewardHistory() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<{ activity: string; tokens: number; timestamp: string }>>({
    queryKey: ['rewardHistory'],
    queryFn: async () => {
      if (!actor) return [];
      return [
        { activity: 'Watched "The Wedding Party"', tokens: 10, timestamp: '2 hours ago' },
        { activity: 'Rated "Lionheart"', tokens: 5, timestamp: '5 hours ago' },
        { activity: 'Shared "King of Boys"', tokens: 8, timestamp: '1 day ago' },
        { activity: 'Wrote review for "October 1"', tokens: 15, timestamp: '2 days ago' },
        { activity: 'Daily login bonus', tokens: 5, timestamp: '3 days ago' },
      ];
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetReferralStats() {
  const { actor, isFetching } = useActor();

  return useQuery<{
    totalReferrals: number;
    conversions: number;
    tokensEarned: number;
    internationalShares: number;
    referralLink: string;
  }>({
    queryKey: ['referralStats'],
    queryFn: async () => {
      if (!actor) return {
        totalReferrals: 0,
        conversions: 0,
        tokensEarned: 0,
        internationalShares: 0,
        referralLink: ''
      };
      return {
        totalReferrals: 12,
        conversions: 5,
        tokensEarned: 450,
        internationalShares: 23,
        referralLink: 'https://tamristream.com/ref/ABC123XYZ'
      };
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetNFTCollectibles() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<{
    id: string;
    name: string;
    category: string;
    imageUrl: string;
    rarity?: string;
    unlockDate: string;
  }>>({
    queryKey: ['nftCollectibles'],
    queryFn: async () => {
      if (!actor) return [];
      return [
        {
          id: '1',
          name: 'The Wedding Party Poster',
          category: 'poster',
          imageUrl: '/assets/generated/african-romance-poster.jpg',
          rarity: 'rare',
          unlockDate: '2024-01-15'
        },
        {
          id: '2',
          name: 'Lionheart BTS Clip',
          category: 'bts',
          imageUrl: '/assets/generated/behind-the-scenes-filmmaking.jpg',
          rarity: 'epic',
          unlockDate: '2024-02-20'
        },
        {
          id: '3',
          name: 'King of Boys Limited Edition',
          category: 'limited',
          imageUrl: '/assets/generated/african-drama-poster.jpg',
          rarity: 'legendary',
          unlockDate: '2024-03-10'
        },
      ];
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export function useGenerateReferralLink() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const randomCode = Math.random().toString(36).substring(2, 11).toUpperCase();
      return `https://tamristream.com/ref/${randomCode}`;
    },
  });
}

export function useClaimReward() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rewardId: string) => {
      if (!actor) throw new Error('Actor not available');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, rewardId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tamriTokenBalance'] });
      queryClient.invalidateQueries({ queryKey: ['rewardHistory'] });
      queryClient.invalidateQueries({ queryKey: ['referralStats'] });
    },
  });
}

// Instant Withdrawal - Mock implementation
export function useWithdrawEarnings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ amount, currency, walletAddress }: { amount: bigint; currency: string; walletAddress: string }) => {
      if (!actor) throw new Error('Actor not available');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      return { 
        success: true, 
        transactionHash: mockTxHash,
        amount: Number(amount) / 100,
        currency,
        walletAddress
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['revenueShare'] });
      toast.success(`Withdrawal successful! ${data.amount} ${data.currency} transferred to your wallet.`, {
        description: `Transaction: ${data.transactionHash.substring(0, 16)}...`,
        duration: 5000,
      });
    },
    onError: (error: Error) => {
      console.error('Withdrawal error:', error);
      toast.error(error.message || 'Failed to process withdrawal. Please try again.');
    },
  });
}

// Movie transparency query (mock implementation)
export function useGetMovieTransparency(title: string) {
  const { actor, isFetching } = useActor();

  return useQuery<{ totalViews: number; totalEarnings: number } | null>({
    queryKey: ['movieTransparency', title],
    queryFn: async () => {
      if (!actor || !title) return null;
      return null;
    },
    enabled: !!actor && !isFetching && !!title,
    staleTime: 1000 * 60 * 5,
  });
}

// Creator earnings query (mock implementation)
export function useGetCreatorEarnings() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['creatorEarnings'],
    queryFn: async () => {
      if (!actor) return null;
      return null;
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

// Partnership Offer queries (mock implementations)
export function useGetPartnershipOffers() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['partnershipOffers'],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export function useGetFeaturedPartnershipOffers() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['featuredPartnershipOffers'],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export function useGetPartnershipApplicationStatus() {
  const { actor, isFetching } = useActor();

  return useQuery<any | null>({
    queryKey: ['partnershipApplicationStatus'],
    queryFn: async () => {
      if (!actor) return null;
      return null;
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetAllPartnershipApplications() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['partnershipApplications'],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useApplyForPartnership() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ creatorName, contactInfo, portfolioLink, partnershipId }: { creatorName: string; contactInfo: string; portfolioLink: string; partnershipId: string }) => {
      if (!actor) throw new Error('Actor not available');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnershipApplicationStatus'] });
      queryClient.invalidateQueries({ queryKey: ['partnershipApplications'] });
      toast.success('Partnership application submitted successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to submit partnership application');
      console.error('Apply for partnership error:', error);
    },
  });
}

export function useReviewPartnershipApplication() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ applicant, approved }: { applicant: Principal; approved: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnershipApplications'] });
      queryClient.invalidateQueries({ queryKey: ['partnershipOffers'] });
      toast.success('Application reviewed successfully');
    },
    onError: (error: Error) => {
      console.error('Review partnership application error:', error);
      toast.error('Failed to review application');
    },
  });
}

export function useCreatePartnershipOffer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (offer: any) => {
      if (!actor) throw new Error('Actor not available');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnershipOffers'] });
      toast.success('Partnership offer created successfully');
    },
    onError: (error: Error) => {
      console.error('Create partnership offer error:', error);
      toast.error('Failed to create partnership offer');
    },
  });
}

// Future Add-ons queries (mock implementations)
export function useGetFutureAddOns() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['futureAddOns'],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 15,
  });
}

export function useGetFutureAddOn(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<any | null>({
    queryKey: ['futureAddOn', id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return null;
    },
    enabled: !!actor && !isFetching && !!id,
    staleTime: 1000 * 60 * 15,
  });
}

export function useAddFutureAddOn() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addOn: any) => {
      if (!actor) throw new Error('Actor not available');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['futureAddOns'] });
      toast.success('Future add-on created successfully');
    },
    onError: (error: Error) => {
      console.error('Add future add-on error:', error);
      toast.error('Failed to create future add-on');
    },
  });
}

// Creator verification
export function useGetCreatorVerificationStatus() {
  const { actor, isFetching } = useActor();

  return useQuery<CreatorVerification | null>({
    queryKey: ['creatorVerification'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getCreatorVerificationStatus();
      } catch (error) {
        console.error('Error fetching creator verification:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useGetAllCreatorVerifications() {
  const { actor, isFetching } = useActor();

  return useQuery<CreatorVerification[]>({
    queryKey: ['creatorVerifications'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllCreatorVerifications();
      } catch (error) {
        console.error('Error fetching creator verifications:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useRegisterCreator() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contactInfo, creatorType, identityDocument }: { contactInfo: string; creatorType: string; identityDocument: string | null }) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.registerCreator(contactInfo, creatorType, identityDocument);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creatorVerification'] });
      toast.success('Verification request submitted successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to submit verification request');
      console.error('Register creator error:', error);
    },
  });
}

export function useVerifyCreator() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ creator, verified, feedback }: { creator: Principal; verified: boolean; feedback: string }) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.verifyCreator(creator, verified, feedback);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creatorVerifications'] });
      toast.success('Creator verification updated');
    },
    onError: (error: Error) => {
      console.error('Verify creator error:', error);
      toast.error('Failed to verify creator');
    },
  });
}

// Content approval
export function useGetAllContentApprovals() {
  const { actor, isFetching } = useActor();

  return useQuery<AdminApproval[]>({
    queryKey: ['contentApprovals'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllContentApprovals();
      } catch (error) {
        console.error('Error fetching content approvals:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 3,
    retry: 1,
  });
}

export function useGetContentApprovalStatus(contentId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<AdminApproval | null>({
    queryKey: ['contentApproval', contentId],
    queryFn: async () => {
      if (!actor || !contentId) return null;
      try {
        return await actor.getContentApprovalStatus(contentId);
      } catch (error) {
        console.error('Error fetching content approval status:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!contentId,
    staleTime: 1000 * 60 * 3,
    retry: 1,
  });
}

export function useSubmitContentForApproval() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contentId, feedback }: { contentId: string; feedback: string }) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.submitContentForApproval(contentId, feedback);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentApprovals'] });
      toast.success('Content submitted for approval');
    },
    onError: (error: Error) => {
      toast.error('Failed to submit content for approval');
      console.error('Submit content error:', error);
    },
  });
}

export function useApproveContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contentId, approved, feedback }: { contentId: string; approved: boolean; feedback: string }) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.approveContent(contentId, approved, feedback);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentApprovals'] });
      toast.success('Content approval updated');
    },
    onError: (error: Error) => {
      toast.error('Failed to process approval');
      console.error('Approve content error:', error);
    },
  });
}

// Movie queries with optimized caching
export function useGetAllMovies() {
  const { actor, isFetching } = useActor();

  return useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllMovies();
      } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
    retry: 2,
  });
}

export function useGetMovie(title: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Movie | null>({
    queryKey: ['movie', title],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const result = await actor.getMovie(title);
        return result || null;
      } catch (error) {
        console.error('Error fetching movie:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!title,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

export function useSearchMovies(searchTerm: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Movie[]>({
    queryKey: ['movies', 'search', searchTerm],
    queryFn: async () => {
      if (!actor || !searchTerm) return [];
      try {
        return await actor.searchMovies(searchTerm);
      } catch (error) {
        console.error('Error searching movies:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!searchTerm,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useAddMovie() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movie: { title: string; description: string; coverImagePath: string; trailerPath: string }) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.addMovie(movie.title, movie.description, movie.coverImagePath, movie.trailerPath);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      toast.success('Movie added successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to add movie');
      console.error('Add movie error:', error);
    },
  });
}

export function useBulkUploadMovies() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (items: BulkUploadItem[]) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.bulkUploadMovies(items);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      toast.success('Movies uploaded successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to upload movies');
      console.error('Bulk upload error:', error);
    },
  });
}

// User profile queries with optimized caching
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.getCallerUserProfile();
      } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      toast.success('Profile saved successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to save profile');
      console.error('Save profile error:', error);
    },
  });
}

// Favorite movies
export function useGetFavoriteMovies() {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['favoriteMovies'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getFavoriteMovies();
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useAddFavoriteMovie() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movieTitle: string) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.addFavoriteMovie(movieTitle);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favoriteMovies'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      toast.success('Added to favorites');
    },
    onError: (error: Error) => {
      toast.error('Failed to add to favorites');
      console.error('Add favorite error:', error);
    },
  });
}

export function useRemoveFavoriteMovie() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movieTitle: string) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.removeFavoriteMovie(movieTitle);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favoriteMovies'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      toast.success('Removed from favorites');
    },
    onError: (error: Error) => {
      toast.error('Failed to remove from favorites');
      console.error('Remove favorite error:', error);
    },
  });
}

// Data saver mode
export function useGetDataSaverMode() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['dataSaverMode'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.getDataSaverMode();
      } catch (error) {
        console.error('Error fetching data saver mode:', error);
        return false;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

export function useSetDataSaverMode() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (enabled: boolean) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.setDataSaverMode(enabled);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataSaverMode'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
    onError: (error: Error) => {
      console.error('Set data saver mode error:', error);
    },
  });
}

// Ratings
export function useGetMovieRatings(movieTitle: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Rating[]>({
    queryKey: ['ratings', movieTitle],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getMovieRatings(movieTitle);
      } catch (error) {
        console.error('Error fetching movie ratings:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!movieTitle,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useRateMovie() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ movieTitle, score, review }: { movieTitle: string; score: number; review: string }) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.rateMovie(movieTitle, BigInt(score), review);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ratings', variables.movieTitle] });
      queryClient.invalidateQueries({ queryKey: ['movie', variables.movieTitle] });
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      toast.success('Rating submitted successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to submit rating');
      console.error('Rate movie error:', error);
    },
  });
}

// Creator submissions
export function useGetCreatorSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<CreatorSubmission[]>({
    queryKey: ['creatorSubmissions'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getCreatorSubmissions();
      } catch (error) {
        console.error('Error fetching creator submissions:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useSubmitCreatorFilm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (submission: { filmTitle: string; description: string; creatorName: string; contactInfo: string; category: string }) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.submitCreatorFilm(
        submission.filmTitle,
        submission.description,
        submission.creatorName,
        submission.contactInfo,
        submission.category
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creatorSubmissions'] });
      toast.success('Film submitted successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to submit film');
      console.error('Submit film error:', error);
    },
  });
}

// Top picks
export function useGetTopPicks() {
  const { actor, isFetching } = useActor();

  return useQuery<TopPick[]>({
    queryKey: ['topPicks'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getTopPicks();
      } catch (error) {
        console.error('Error fetching top picks:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

export function useAddTopPick() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (topPick: { movieTitle: string; curatorName: string; recommendation: string; reason: string }) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.addTopPick(topPick.movieTitle, topPick.curatorName, topPick.recommendation, topPick.reason);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topPicks'] });
      toast.success('Top pick added successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to add top pick');
      console.error('Add top pick error:', error);
    },
  });
}

// Watch parties
export function useGetWatchParty(partyId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<WatchParty | null>({
    queryKey: ['watchParty', partyId],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const result = await actor.getWatchParty(partyId);
        return result || null;
      } catch (error) {
        console.error('Error fetching watch party:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!partyId,
    staleTime: 1000 * 30,
    retry: 1,
  });
}

export function useCreateWatchParty() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movieTitle: string) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.createWatchParty(movieTitle);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchParties'] });
      toast.success('Watch party created successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to create watch party');
      console.error('Create watch party error:', error);
    },
  });
}

// Revenue sharing
export function useGetRevenueShare() {
  const { actor, isFetching } = useActor();

  return useQuery<RevenueShare>({
    queryKey: ['revenueShare'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.getRevenueShare();
      } catch (error) {
        console.error('Error fetching revenue share:', error);
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
}

export function useSetPaymentMethod() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (method: PaymentMethod) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.setPaymentMethod(method);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['revenueShare'] });
      toast.success('Payment method updated successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to update payment method');
      console.error('Set payment method error:', error);
    },
  });
}

// Revenue model
export function useGetRevenueModel() {
  const { actor, isFetching } = useActor();

  return useQuery<RevenueModel>({
    queryKey: ['revenueModel'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.getRevenueModel();
      } catch (error) {
        console.error('Error fetching revenue model:', error);
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });
}

// Smart Royalties queries
export function useGetSmartRoyalty(contentId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<SmartRoyalty | null>({
    queryKey: ['smartRoyalty', contentId],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getSmartRoyalty(contentId);
      } catch (error) {
        console.error('Error fetching smart royalty:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!contentId,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
}

export function useGetAllSmartRoyalties() {
  const { actor, isFetching } = useActor();

  return useQuery<SmartRoyalty[]>({
    queryKey: ['smartRoyalties'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllSmartRoyalties();
      } catch (error) {
        console.error('Error fetching smart royalties:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useGetSmartRoyaltiesByCreator(creator: Principal | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<SmartRoyalty[]>({
    queryKey: ['smartRoyalties', 'creator', creator?.toString()],
    queryFn: async () => {
      if (!actor || !creator) return [];
      try {
        return await actor.getSmartRoyaltiesByCreator(creator);
      } catch (error) {
        console.error('Error fetching smart royalties by creator:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!creator,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
}

export function useGetRoyaltyEvents(contentId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<RoyaltyEvent[]>({
    queryKey: ['royaltyEvents', contentId],
    queryFn: async () => {
      if (!actor || !contentId) return [];
      try {
        return await actor.getRoyaltyEvents(contentId);
      } catch (error) {
        console.error('Error fetching royalty events:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!contentId,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
}

export function useGetRoyaltyPayoutHistory(contentId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<PayoutRecord[]>({
    queryKey: ['royaltyPayoutHistory', contentId],
    queryFn: async () => {
      if (!actor || !contentId) return [];
      try {
        return await actor.getRoyaltyPayoutHistory(contentId);
      } catch (error) {
        console.error('Error fetching royalty payout history:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!contentId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useCreateSmartRoyalty() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contentId, revenueModel }: { contentId: string; revenueModel: RevenueModel }) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.createSmartRoyalty(contentId, revenueModel);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smartRoyalties'] });
      toast.success('Smart Royalty created successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to create Smart Royalty');
      console.error('Create Smart Royalty error:', error);
    },
  });
}

export function useLogRoyaltyEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contentId, eventType, amount, details }: { contentId: string; eventType: string; amount: bigint; details: string }) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.logRoyaltyEvent(contentId, eventType, amount, details);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['royaltyEvents', variables.contentId] });
      queryClient.invalidateQueries({ queryKey: ['smartRoyalty', variables.contentId] });
      queryClient.invalidateQueries({ queryKey: ['smartRoyalties'] });
    },
    onError: (error: Error) => {
      toast.error('Failed to log royalty event');
      console.error('Log royalty event error:', error);
    },
  });
}

export function useUpdateRoyaltyEarnings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contentId, amount }: { contentId: string; amount: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.updateRoyaltyEarnings(contentId, amount);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['smartRoyalty', variables.contentId] });
      queryClient.invalidateQueries({ queryKey: ['smartRoyalties'] });
      toast.success('Earnings updated successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to update earnings');
      console.error('Update earnings error:', error);
    },
  });
}

// Mock implementations for Music/Sports/Filmmaker features
export function useGetAllMusicVideos() {
  const { actor, isFetching } = useActor();

  return useQuery<MusicVideo[]>({
    queryKey: ['musicVideos'],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export function useSearchMusicVideos(searchTerm: string) {
  const { actor, isFetching } = useActor();

  return useQuery<MusicVideo[]>({
    queryKey: ['musicVideos', 'search', searchTerm],
    queryFn: async () => {
      if (!actor || !searchTerm) return [];
      return [];
    },
    enabled: !!actor && !isFetching && !!searchTerm,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetPlaylists() {
  const { actor, isFetching } = useActor();

  return useQuery<Playlist[]>({
    queryKey: ['playlists'],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreatePlaylist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error('Actor not available');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
      toast.success('Playlist created successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to create playlist');
      console.error('Create playlist error:', error);
    },
  });
}

export function useAddMusicVideoToPlaylist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ playlistName, musicVideoTitle }: { playlistName: string; musicVideoTitle: string }) => {
      if (!actor) throw new Error('Actor not available');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
      toast.success('Added to playlist');
    },
    onError: (error: Error) => {
      toast.error('Failed to add to playlist');
      console.error('Add to playlist error:', error);
    },
  });
}

export function useGetExtrasByMovie(movieTitle: string) {
  const { actor, isFetching } = useActor();

  return useQuery<ExtrasContent[]>({
    queryKey: ['extrasContent', movieTitle],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching && !!movieTitle,
    staleTime: 1000 * 60 * 10,
  });
}

export function useGetAllMusicTracks() {
  const { actor, isFetching } = useActor();

  return useQuery<MusicTrack[]>({
    queryKey: ['musicTracks'],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export function useSearchMusicTracks(searchTerm: string) {
  const { actor, isFetching } = useActor();

  return useQuery<MusicTrack[]>({
    queryKey: ['musicTracks', 'search', searchTerm],
    queryFn: async () => {
      if (!actor || !searchTerm) return [];
      return [];
    },
    enabled: !!actor && !isFetching && !!searchTerm,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAddMusicTrack() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (track: any) => {
      if (!actor) throw new Error('Actor not available');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['musicTracks'] });
      toast.success('Music track added successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to add music track');
      console.error('Add music track error:', error);
    },
  });
}

export function useGetArtistProfile() {
  const { actor, isFetching } = useActor();

  return useQuery<ArtistProfile | null>({
    queryKey: ['artistProfile'],
    queryFn: async () => {
      if (!actor) return null;
      return null;
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetAllArtistProfiles() {
  const { actor, isFetching } = useActor();

  return useQuery<ArtistProfile[]>({
    queryKey: ['artistProfiles'],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export function useCreateArtistProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: any) => {
      if (!actor) throw new Error('Actor not available');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artistProfile'] });
      toast.success('Artist profile created successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to create artist profile');
      console.error('Create artist profile error:', error);
    },
  });
}

export function useGetMusicPlaylists() {
  const { actor, isFetching } = useActor();

  return useQuery<MusicPlaylist[]>({
    queryKey: ['musicPlaylists'],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateMusicPlaylist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, isPublic }: { name: string; isPublic: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['musicPlaylists'] });
      toast.success('Music playlist created successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to create music playlist');
      console.error('Create music playlist error:', error);
    },
  });
}

export function useAddMusicTrackToPlaylist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ playlistName, musicTrackTitle }: { playlistName: string; musicTrackTitle: string }) => {
      if (!actor) throw new Error('Actor not available');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['musicPlaylists'] });
      toast.success('Added to playlist');
    },
    onError: (error: Error) => {
      toast.error('Failed to add to playlist');
      console.error('Add to playlist error:', error);
    },
  });
}

export function useGetFilmmakerSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<FilmmakerSubmission[]>({
    queryKey: ['filmmakerSubmissions'],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSubmitFilmmakerSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (submission: any) => {
      if (!actor) throw new Error('Actor not available');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filmmakerSubmissions'] });
      toast.success('Filmmaker submission successful');
    },
    onError: (error: Error) => {
      toast.error('Failed to submit filmmaker submission');
      console.error('Submit filmmaker submission error:', error);
    },
  });
}

export function useSearchSportsContent(searchTerm: string) {
  const { actor, isFetching } = useActor();

  return useQuery<SportsContent[]>({
    queryKey: ['sportsContent', 'search', searchTerm],
    queryFn: async () => {
      if (!actor || !searchTerm) return [];
      return [];
    },
    enabled: !!actor && !isFetching && !!searchTerm,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetAllLiveMatches() {
  const { actor, isFetching } = useActor();

  return useQuery<LiveMatch[]>({
    queryKey: ['liveMatches'],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

export function useGetSportsCreatorSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<SportsCreatorSubmission[]>({
    queryKey: ['sportsCreatorSubmissions'],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSubmitSportsCreatorSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (submission: any) => {
      if (!actor) throw new Error('Actor not available');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sportsCreatorSubmissions'] });
      toast.success('Sports content submitted successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to submit sports content');
      console.error('Submit sports content error:', error);
    },
  });
}
