export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const List_1 = IDL.Rec();
  const List_2 = IDL.Rec();
  const List_3 = IDL.Rec();
  const List_4 = IDL.Rec();
  const UserRole = IDL.Variant({
    'admin' : IDL.Null,
    'user' : IDL.Null,
    'guest' : IDL.Null,
  });
  const BulkUploadItem = IDL.Record({
    'title' : IDL.Text,
    'coverImagePath' : IDL.Text,
    'trailerPath' : IDL.Text,
    'description' : IDL.Text,
  });
  const ShoppingItem = IDL.Record({
    'productName' : IDL.Text,
    'currency' : IDL.Text,
    'quantity' : IDL.Nat,
    'priceInCents' : IDL.Nat,
    'productDescription' : IDL.Text,
  });
  const Time = IDL.Int;
  List.fill(IDL.Opt(IDL.Tuple(IDL.Text, List)));
  const ArtistProfile = IDL.Record({
    'bio' : IDL.Text,
    'photoPath' : IDL.Text,
    'verified' : IDL.Bool,
    'socialLinks' : List,
    'name' : IDL.Text,
    'musicTrackIds' : List,
    'earnings' : IDL.Nat,
    'followers' : IDL.Nat,
  });
  const ExtrasContent = IDL.Record({
    'title' : IDL.Text,
    'contentType' : IDL.Text,
    'associatedMovie' : IDL.Text,
    'description' : IDL.Text,
    'videoPath' : IDL.Text,
    'thumbnailPath' : IDL.Text,
  });
  const LiveMatch = IDL.Record({
    'id' : IDL.Text,
    'status' : IDL.Text,
    'teamInfo' : IDL.Text,
    'title' : IDL.Text,
    'created' : Time,
    'venue' : IDL.Text,
    'date' : Time,
    'time' : IDL.Text,
    'countdown' : IDL.Nat,
  });
  const Movie = IDL.Record({
    'title' : IDL.Text,
    'coverImagePath' : IDL.Text,
    'trailerPath' : IDL.Text,
    'description' : IDL.Text,
    'averageRating' : IDL.Nat,
    'reviewCount' : IDL.Nat,
  });
  const MusicTrack = IDL.Record({
    'title' : IDL.Text,
    'coverImagePath' : IDL.Text,
    'album' : IDL.Text,
    'artistProfile' : IDL.Principal,
    'audioPath' : IDL.Text,
    'playCount' : IDL.Nat,
    'averageRating' : IDL.Nat,
    'genre' : IDL.Text,
    'artist' : IDL.Text,
    'price' : IDL.Nat,
    'reviewCount' : IDL.Nat,
    'releaseDate' : Time,
  });
  const MusicVideo = IDL.Record({
    'title' : IDL.Text,
    'description' : IDL.Text,
    'videoPath' : IDL.Text,
    'thumbnailPath' : IDL.Text,
    'genre' : IDL.Text,
    'artist' : IDL.Text,
  });
  const RSVP = IDL.Record({
    'name' : IDL.Text,
    'inviteCode' : IDL.Text,
    'timestamp' : Time,
    'attending' : IDL.Bool,
  });
  const SportsContent = IDL.Record({
    'title' : IDL.Text,
    'created' : Time,
    'creator' : IDL.Principal,
    'description' : IDL.Text,
    'accessTier' : IDL.Text,
    'sportType' : IDL.Text,
    'videoPath' : IDL.Text,
    'averageRating' : IDL.Nat,
    'thumbnailPath' : IDL.Text,
    'reviewCount' : IDL.Nat,
    'eventInfo' : IDL.Text,
  });
  const FlexibleAccessOption = IDL.Record({
    'name' : IDL.Text,
    'type' : IDL.Text,
    'description' : IDL.Text,
  });
  const PartnershipBenefit = IDL.Record({
    'name' : IDL.Text,
    'type' : IDL.Text,
    'description' : IDL.Text,
  });
  const SubscriptionTier = IDL.Record({
    'features' : IDL.Vec(IDL.Text),
    'name' : IDL.Text,
    'accessType' : IDL.Text,
    'price' : IDL.Nat,
  });
  const VisualDisplay = IDL.Record({ 'content' : IDL.Text, 'type' : IDL.Text });
  const BusinessModel = IDL.Record({
    'flexibleAccessOptions' : IDL.Vec(FlexibleAccessOption),
    'partnershipBenefits' : IDL.Vec(PartnershipBenefit),
    'subscriptionTiers' : IDL.Vec(SubscriptionTier),
    'visualDisplays' : IDL.Vec(VisualDisplay),
  });
  const UserProfile = IDL.Record({
    'watchPartyHistory' : List,
    'favoriteMovies' : List,
    'dataSaverMode' : IDL.Bool,
  });
  const CreatorSubmission = IDL.Record({
    'contactInfo' : IDL.Text,
    'filmTitle' : IDL.Text,
    'description' : IDL.Text,
    'creatorName' : IDL.Text,
    'category' : IDL.Text,
  });
  const FileReference = IDL.Record({ 'hash' : IDL.Text, 'path' : IDL.Text });
  const FilmmakerSubmission = IDL.Record({
    'id' : IDL.Text,
    'status' : IDL.Text,
    'title' : IDL.Text,
    'created' : Time,
    'contactInfo' : IDL.Text,
    'paymentPreferences' : IDL.Text,
    'trailerPath' : IDL.Text,
    'cast' : IDL.Text,
    'posterPath' : IDL.Text,
    'description' : IDL.Text,
    'director' : IDL.Text,
    'category' : IDL.Text,
    'rating' : IDL.Text,
    'rightsVerification' : IDL.Text,
  });
  const InviteCode = IDL.Record({
    'created' : Time,
    'code' : IDL.Text,
    'used' : IDL.Bool,
  });
  const MentorshipProgram = IDL.Record({
    'id' : IDL.Text,
    'mentee' : IDL.Principal,
    'mentor' : IDL.Principal,
    'status' : IDL.Text,
    'topic' : IDL.Text,
    'endDate' : Time,
    'progress' : IDL.Nat,
    'startDate' : Time,
  });
  const Rating = IDL.Record({ 'review' : IDL.Text, 'score' : IDL.Nat });
  const MusicPlaylist = IDL.Record({
    'created' : Time,
    'name' : IDL.Text,
    'musicTrackIds' : List,
    'isPublic' : IDL.Bool,
  });
  const OnboardingModule = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'created' : Time,
    'content' : IDL.Text,
    'isCompleted' : IDL.Bool,
    'type' : IDL.Text,
    'description' : IDL.Text,
    'progress' : IDL.Nat,
  });
  const Playlist = IDL.Record({ 'name' : IDL.Text, 'musicVideoIds' : List });
  const PaymentMethod = IDL.Variant({
    'mobileMoney' : IDL.Text,
    'crypto' : IDL.Text,
    'mPesa' : IDL.Text,
  });
  const PayoutRecord = IDL.Record({
    'status' : IDL.Text,
    'method' : PaymentMethod,
    'date' : Time,
    'amount' : IDL.Nat,
  });
  List_4.fill(IDL.Opt(IDL.Tuple(PayoutRecord, List_4)));
  const RevenueShare = IDL.Record({
    'paymentMethod' : PaymentMethod,
    'payoutHistory' : List_4,
    'pendingPayouts' : IDL.Nat,
    'totalEarnings' : IDL.Nat,
  });
  const ReviewAssignment = IDL.Record({
    'id' : IDL.Text,
    'status' : IDL.Text,
    'assigned' : Time,
    'feedback' : IDL.Text,
    'stage' : IDL.Text,
    'submissionId' : IDL.Text,
    'reviewer' : IDL.Principal,
  });
  const SportsCreatorSubmission = IDL.Record({
    'id' : IDL.Text,
    'status' : IDL.Text,
    'title' : IDL.Text,
    'created' : Time,
    'contactInfo' : IDL.Text,
    'paymentPreferences' : IDL.Text,
    'description' : IDL.Text,
    'sportType' : IDL.Text,
    'creatorName' : IDL.Text,
    'eventInfo' : IDL.Text,
  });
  const SportsPlaylist = IDL.Record({
    'sportsContentIds' : List,
    'created' : Time,
    'name' : IDL.Text,
    'isPublic' : IDL.Bool,
  });
  const StripeSessionStatus = IDL.Variant({
    'completed' : IDL.Record({
      'userPrincipal' : IDL.Opt(IDL.Text),
      'response' : IDL.Text,
    }),
    'failed' : IDL.Record({ 'error' : IDL.Text }),
  });
  const TopPick = IDL.Record({
    'curatorName' : IDL.Text,
    'recommendation' : IDL.Text,
    'movieTitle' : IDL.Text,
    'reason' : IDL.Text,
  });
  List_2.fill(IDL.Opt(IDL.Tuple(IDL.Principal, List_2)));
  const Reaction = IDL.Record({
    'user' : IDL.Principal,
    'reactionType' : IDL.Text,
    'timestamp' : Time,
  });
  List_3.fill(IDL.Opt(IDL.Tuple(Reaction, List_3)));
  const ChatMessage = IDL.Record({
    'sender' : IDL.Principal,
    'message' : IDL.Text,
    'timestamp' : Time,
  });
  List_1.fill(IDL.Opt(IDL.Tuple(ChatMessage, List_1)));
  const WatchParty = IDL.Record({
    'id' : IDL.Text,
    'startTime' : Time,
    'participants' : List_2,
    'host' : IDL.Principal,
    'isActive' : IDL.Bool,
    'movieTitle' : IDL.Text,
    'reactions' : List_3,
    'chatHistory' : List_1,
  });
  const WorkshopSession = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'created' : Time,
    'duration' : IDL.Nat,
    'date' : Time,
    'type' : IDL.Text,
    'description' : IDL.Text,
    'isLive' : IDL.Bool,
    'attendees' : IDL.Nat,
  });
  const ApprovalStatus = IDL.Variant({
    'pending' : IDL.Null,
    'approved' : IDL.Null,
    'rejected' : IDL.Null,
  });
  const UserApprovalInfo = IDL.Record({
    'status' : ApprovalStatus,
    'principal' : IDL.Principal,
  });
  const StripeConfiguration = IDL.Record({
    'allowedCountries' : IDL.Vec(IDL.Text),
    'secretKey' : IDL.Text,
  });
  const http_header = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
  const http_request_result = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(http_header),
  });
  const TransformationInput = IDL.Record({
    'context' : IDL.Vec(IDL.Nat8),
    'response' : http_request_result,
  });
  const TransformationOutput = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(http_header),
  });
  return IDL.Service({
    'addExtrasContent' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'addFavoriteMovie' : IDL.Func([IDL.Text], [], []),
    'addMentorshipProgram' : IDL.Func([IDL.Principal, IDL.Text], [], []),
    'addMovie' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [], []),
    'addMusicTrack' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Nat],
        [],
        [],
      ),
    'addMusicTrackToPlaylist' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'addMusicVideo' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'addMusicVideoToPlaylist' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'addOnboardingModule' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'addSportsContent' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'addSportsContentToPlaylist' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'addTopPick' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [], []),
    'addWorkshopSession' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Nat, IDL.Bool],
        [],
        [],
      ),
    'assignCallerUserRole' : IDL.Func([IDL.Principal, UserRole], [], []),
    'assignReview' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'bulkUploadMovies' : IDL.Func([IDL.Vec(BulkUploadItem)], [], []),
    'createArtistProfile' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Vec(IDL.Text)],
        [],
        [],
      ),
    'createCheckoutSession' : IDL.Func(
        [IDL.Vec(ShoppingItem), IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'createLiveMatch' : IDL.Func(
        [IDL.Text, Time, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'createMusicPlaylist' : IDL.Func([IDL.Text, IDL.Bool], [], []),
    'createPlaylist' : IDL.Func([IDL.Text], [], []),
    'createSportsPlaylist' : IDL.Func([IDL.Text, IDL.Bool], [], []),
    'createWatchParty' : IDL.Func([IDL.Text], [IDL.Text], []),
    'dropFileReference' : IDL.Func([IDL.Text], [], []),
    'generateInviteCode' : IDL.Func([], [IDL.Text], []),
    'getAllArtistProfiles' : IDL.Func([], [IDL.Vec(ArtistProfile)], ['query']),
    'getAllExtrasContent' : IDL.Func([], [IDL.Vec(ExtrasContent)], ['query']),
    'getAllLiveMatches' : IDL.Func([], [IDL.Vec(LiveMatch)], ['query']),
    'getAllMovies' : IDL.Func([], [IDL.Vec(Movie)], ['query']),
    'getAllMusicTracks' : IDL.Func([], [IDL.Vec(MusicTrack)], ['query']),
    'getAllMusicVideos' : IDL.Func([], [IDL.Vec(MusicVideo)], ['query']),
    'getAllRSVPs' : IDL.Func([], [IDL.Vec(RSVP)], ['query']),
    'getAllSportsContent' : IDL.Func([], [IDL.Vec(SportsContent)], ['query']),
    'getArtistProfile' : IDL.Func([], [IDL.Opt(ArtistProfile)], ['query']),
    'getBusinessModel' : IDL.Func([], [BusinessModel], ['query']),
    'getCallerUserProfile' : IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
    'getCallerUserRole' : IDL.Func([], [UserRole], ['query']),
    'getCreatorSubmissions' : IDL.Func(
        [],
        [IDL.Vec(CreatorSubmission)],
        ['query'],
      ),
    'getDataSaverMode' : IDL.Func([], [IDL.Bool], ['query']),
    'getExtrasByMovie' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(ExtrasContent)],
        ['query'],
      ),
    'getExtrasContent' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(ExtrasContent)],
        ['query'],
      ),
    'getFavoriteMovies' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getFileReference' : IDL.Func([IDL.Text], [FileReference], ['query']),
    'getFilmmakerSubmissions' : IDL.Func(
        [],
        [IDL.Vec(FilmmakerSubmission)],
        ['query'],
      ),
    'getInviteCodes' : IDL.Func([], [IDL.Vec(InviteCode)], ['query']),
    'getLiveMatch' : IDL.Func([IDL.Text], [IDL.Opt(LiveMatch)], ['query']),
    'getMentorshipPrograms' : IDL.Func(
        [],
        [IDL.Vec(MentorshipProgram)],
        ['query'],
      ),
    'getMovie' : IDL.Func([IDL.Text], [IDL.Opt(Movie)], ['query']),
    'getMovieRatings' : IDL.Func([IDL.Text], [IDL.Vec(Rating)], ['query']),
    'getMusicPlaylists' : IDL.Func([], [IDL.Vec(MusicPlaylist)], ['query']),
    'getMusicTrack' : IDL.Func([IDL.Text], [IDL.Opt(MusicTrack)], ['query']),
    'getMusicVideo' : IDL.Func([IDL.Text], [IDL.Opt(MusicVideo)], ['query']),
    'getOnboardingModules' : IDL.Func(
        [],
        [IDL.Vec(OnboardingModule)],
        ['query'],
      ),
    'getPlaylists' : IDL.Func([], [IDL.Vec(Playlist)], ['query']),
    'getRevenueShare' : IDL.Func([], [RevenueShare], ['query']),
    'getRevenueSharingInfo' : IDL.Func([], [IDL.Vec(RevenueShare)], ['query']),
    'getReviewAssignments' : IDL.Func(
        [],
        [IDL.Vec(ReviewAssignment)],
        ['query'],
      ),
    'getSportsContent' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(SportsContent)],
        ['query'],
      ),
    'getSportsCreatorSubmissions' : IDL.Func(
        [],
        [IDL.Vec(SportsCreatorSubmission)],
        ['query'],
      ),
    'getSportsPlaylists' : IDL.Func([], [IDL.Vec(SportsPlaylist)], ['query']),
    'getStripeSessionStatus' : IDL.Func([IDL.Text], [StripeSessionStatus], []),
    'getTopPicks' : IDL.Func([], [IDL.Vec(TopPick)], ['query']),
    'getUserProfile' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(UserProfile)],
        ['query'],
      ),
    'getWatchParty' : IDL.Func([IDL.Text], [IDL.Opt(WatchParty)], ['query']),
    'getWatchPartyHistory' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getWorkshopSessions' : IDL.Func([], [IDL.Vec(WorkshopSession)], ['query']),
    'initializeAccessControl' : IDL.Func([], [], []),
    'isCallerAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'isCallerApproved' : IDL.Func([], [IDL.Bool], ['query']),
    'isStripeConfigured' : IDL.Func([], [IDL.Bool], ['query']),
    'listApprovals' : IDL.Func([], [IDL.Vec(UserApprovalInfo)], ['query']),
    'listFileReferences' : IDL.Func([], [IDL.Vec(FileReference)], ['query']),
    'rateMovie' : IDL.Func([IDL.Text, IDL.Nat, IDL.Text], [], []),
    'registerFileReference' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'removeFavoriteMovie' : IDL.Func([IDL.Text], [], []),
    'removeMusicTrackFromPlaylist' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'removeMusicVideoFromPlaylist' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'removeSportsContentFromPlaylist' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'requestApproval' : IDL.Func([], [], []),
    'saveCallerUserProfile' : IDL.Func([UserProfile], [], []),
    'searchLiveMatches' : IDL.Func([IDL.Text], [IDL.Vec(LiveMatch)], ['query']),
    'searchMovies' : IDL.Func([IDL.Text], [IDL.Vec(Movie)], ['query']),
    'searchMusicTracks' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MusicTrack)],
        ['query'],
      ),
    'searchMusicVideos' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MusicVideo)],
        ['query'],
      ),
    'searchSportsContent' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(SportsContent)],
        ['query'],
      ),
    'setApproval' : IDL.Func([IDL.Principal, ApprovalStatus], [], []),
    'setDataSaverMode' : IDL.Func([IDL.Bool], [], []),
    'setPaymentMethod' : IDL.Func([PaymentMethod], [], []),
    'setStripeConfiguration' : IDL.Func([StripeConfiguration], [], []),
    'submitCreatorFilm' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'submitFilmmakerSubmission' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
        ],
        [],
        [],
      ),
    'submitRSVP' : IDL.Func([IDL.Text, IDL.Bool, IDL.Text], [], []),
    'submitSportsCreatorSubmission' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'transform' : IDL.Func(
        [TransformationInput],
        [TransformationOutput],
        ['query'],
      ),
    'updateBusinessModel' : IDL.Func([BusinessModel], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
