// Clean rebuild of TamriStream actor to ensure reliable loading and cache clearing
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import Registry "blob-storage/registry";
import BlobStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import UserApproval "user-approval/approval";
import InviteLinksModule "invite-links/invite-links-module";
import Random "mo:base/Random";
import OrderedMap "mo:base/OrderedMap";

actor TamriStream {
  transient let textMap = OrderedMap.Make<Text>(Text.compare);
  transient let principalMap = OrderedMap.Make<Principal>(Principal.compare);

  // Initialize the access control system
  let accessControlState = AccessControl.initState();

  var movies = textMap.empty<Movie>();
  var userProfiles = principalMap.empty<UserProfile>();
  var ratings = textMap.empty<OrderedMap.Map<Principal, Rating>>();
  var creatorSubmissions = textMap.empty<CreatorSubmission>();
  var topPicks = textMap.empty<TopPick>();
  var watchParties = textMap.empty<WatchParty>();
  var revenueSharing = principalMap.empty<RevenueShare>();
  var musicVideos = textMap.empty<MusicVideo>();
  var playlists = textMap.empty<OrderedMap.Map<Text, Playlist>>();
  var extrasContent = textMap.empty<ExtrasContent>();
  var livePolls = textMap.empty<LivePoll>();
  var triviaQuestions = textMap.empty<TriviaQuestion>();
  var userBadges = principalMap.empty<List.List<Badge>>();
  var movieNights = textMap.empty<MovieNight>();
  var communityVotes = textMap.empty<CommunityVote>();
  var leaderboards = textMap.empty<Leaderboard>();
  var messages = textMap.empty<MessageThread>();
  var recommendations = textMap.empty<Recommendation>();
  var creatorFollows = principalMap.empty<List.List<Principal>>();
  var dailyChallenges = textMap.empty<DailyChallenge>();
  var streaks = principalMap.empty<Streak>();
  var unlockableContent = textMap.empty<UnlockableContent>();
  var comingSoon = textMap.empty<ComingSoonItem>();
  var videoReviews = textMap.empty<VideoReview>();
  var communityPlaylists = textMap.empty<CommunityPlaylist>();
  var musicTracks = textMap.empty<MusicTrack>();
  var artistProfiles = principalMap.empty<ArtistProfile>();
  var musicPlaylists = principalMap.empty<OrderedMap.Map<Text, MusicPlaylist>>();
  var filmmakerSubmissions = textMap.empty<FilmmakerSubmission>();
  var reviewAssignments = textMap.empty<ReviewAssignment>();
  var onboardingModules = textMap.empty<OnboardingModule>();
  var workshopSessions = textMap.empty<WorkshopSession>();
  var mentorshipPrograms = textMap.empty<MentorshipProgram>();
  var sportsContent = textMap.empty<SportsContent>();
  var liveMatches = textMap.empty<LiveMatch>();
  var sportsCreatorSubmissions = textMap.empty<SportsCreatorSubmission>();
  var sportsPlaylists = principalMap.empty<OrderedMap.Map<Text, SportsPlaylist>>();
  var kidsZoneContent = textMap.empty<KidsZoneContent>();
  var parentalControls = principalMap.empty<ParentalControlSettings>();
  var learningGames = textMap.empty<LearningGame>();
  var gameProgress = principalMap.empty<OrderedMap.Map<Text, GameProgress>>();
  var educationalAchievements = principalMap.empty<List.List<EducationalAchievement>>();
  var safeContentDiscovery = principalMap.empty<List.List<Text>>();
  var podcastEpisodes = textMap.empty<PodcastEpisode>();
  var podcastPlaylists = principalMap.empty<OrderedMap.Map<Text, PodcastPlaylist>>();
  var podcastCreatorSubmissions = textMap.empty<PodcastCreatorSubmission>();
  var liveRadioStations = textMap.empty<LiveRadioStation>();
  var radioPlaylists = principalMap.empty<OrderedMap.Map<Text, RadioPlaylist>>();
  var radioListeningHistory = principalMap.empty<List.List<Text>>();
  var podcastListeningHistory = principalMap.empty<List.List<Text>>();
  var podcastCreatorProfiles = principalMap.empty<PodcastCreatorProfile>();
  var radioListeningPreferences = principalMap.empty<RadioListeningPreference>();
  var revenueModel : RevenueModel = {
    subscriptionRevenue = 80;
    adRevenue = 75;
    payPerView = 85;
    tipsDonations = 100;
    merchandise = 90;
  };
  var smartRoyalties = textMap.empty<SmartRoyalty>();
  var creatorVerification = principalMap.empty<CreatorVerification>();
  var adminApprovals = textMap.empty<AdminApproval>();
  var partnershipOffers = textMap.empty<PartnershipOffer>();
  var partnershipApplications = principalMap.empty<PartnershipApplication>();
  var futureAddOns = textMap.empty<FutureAddOn>();
  var contentOwnership = textMap.empty<Principal>();
  var stripeConfig : ?Stripe.StripeConfiguration = null;
  var checkoutSessions = textMap.empty<Principal>();
  var fallbackContent : FeaturedContent = {
    movies = [
      {
        title = "The Witness";
        description = "A gripping detective thriller set in Nairobi, directed by Jane Njeri";
        coverImagePath = "/images/movies/the-witness.webp";
        trailerPath = "/movies/the-witness/trailer.mp4";
        averageRating = 4;
        reviewCount = 235;
      },
      {
        title = "Journey to Addis";
        description = "An inspiring road trip story across East Africa, by Lekan Adu";
        coverImagePath = "/images/movies/journey-to-addis.webp";
        trailerPath = "/movies/journey-to-addis/trailer.mp4";
        averageRating = 5;
        reviewCount = 189;
      },
      {
        title = "Legacy in Lagos";
        description = "A powerful drama about family and tradition, by Omotola Ekeinde";
        coverImagePath = "/images/movies/legacy-in-lagos.webp";
        trailerPath = "/movies/legacy-in-lagos/trailer.mp4";
        averageRating = 5;
        reviewCount = 152;
      },
      {
        title = "Safari Spirits";
        description = "A captivating adventure in the Serengeti, by Sifa Mutua";
        coverImagePath = "/images/movies/safari-spirits.webp";
        trailerPath = "/movies/safari-spirits/trailer.mp4";
        averageRating = 4;
        reviewCount = 198;
      },
      {
        title = "Rhythm of Accra";
        description = "A vibrant story exploring Ghanaian music culture, by Nana Ama Mensah";
        coverImagePath = "/images/movies/rhythm-of-accra.webp";
        trailerPath = "/movies/rhythm-of-accra/trailer.mp4";
        averageRating = 5;
        reviewCount = 176;
      },
    ];
    featuredMovies = [
      {
        id = "fm1";
        title = "The Witness";
        description = "An award-winning detective thriller, nominated for the African Movie Academy Awards";
        coverImagePath = "/images/movies/the-witness-featured.webp";
        trailerPath = "/movies/the-witness/trailer.mp4";
        genre = "Thriller";
        director = "Jane Njeri";
        rating = "PG-13";
      },
      {
        id = "fm2";
        title = "Journey to Addis";
        description = "Winner of Best Road Movie at the Pan-African Film Festival";
        coverImagePath = "/images/movies/journey-to-addis-featured.webp";
        trailerPath = "/movies/journey-to-addis/trailer.mp4";
        genre = "Adventure";
        director = "Lekan Adu";
        rating = "PG";
      },
      {
        id = "fm3";
        title = "Legacy in Lagos";
        description = "Named Best Family Drama by the Nollywood Awards";
        coverImagePath = "/images/movies/legacy-in-lagos-featured.webp";
        trailerPath = "/movies/legacy-in-lagos/trailer.mp4";
        genre = "Drama";
        director = "Omotola Ekeinde";
        rating = "PG";
      },
      {
        id = "fm4";
        title = "Safari Spirits";
        description = "Critically acclaimed African adventure film, nominated for Best Cinematography";
        coverImagePath = "/images/movies/safari-spirits-featured.webp";
        trailerPath = "/movies/safari-spirits/trailer.mp4";
        genre = "Adventure";
        director = "Sifa Mutua";
        rating = "PG";
      },
      {
        id = "fm5";
        title = "Rhythm of Accra";
        description = "Best Musical Feature at the Ghana Film Awards";
        coverImagePath = "/images/movies/rhythm-of-accra-featured.webp";
        trailerPath = "/movies/rhythm-of-accra/trailer.mp4";
        genre = "Music Drama";
        director = "Nana Ama Mensah";
        rating = "PG";
      },
    ];
    categories = [
      {
        name = "Movies";
        description = "Explore a rich library of African films and documentaries";
        iconPath = "/icons/categories/movies.svg";
      },
      {
        name = "Music";
        description = "Stream the best African music videos and live performances";
        iconPath = "/icons/categories/music.svg";
      },
      {
        name = "Sports";
        description = "Watch live sports events, highlights, and exclusive content";
        iconPath = "/icons/categories/sports.svg";
      },
      {
        name = "Live";
        description = "Enjoy live streaming events, concerts, and talk shows";
        iconPath = "/icons/categories/live.svg";
      },
      {
        name = "Kids Zone";
        description = "Safe, educational content for kids and families";
        iconPath = "/icons/categories/kids-zone.svg";
      },
      {
        name = "Podcasts";
        description = "Discover African podcasts across various topics";
        iconPath = "/icons/categories/podcasts.svg";
      },
    ];
    creatorShowcases = [
      {
        name = "Jane Njeri";
        description = "Award-winning Nairobi-based filmmaker specializing in thrillers";
        profileImage = "/images/creators/jane-njeri.webp";
        featuredWork = "The Witness";
      },
      {
        name = "Lekan Adu";
        description = "Filmmaker from Lagos focused on contemporary African road movies";
        profileImage = "/images/creators/lekan-adu.webp";
        featuredWork = "Journey to Addis";
      },
      {
        name = "Omotola Ekeinde";
        description = "Nollywood superstar and acclaimed drama director";
        profileImage = "/images/creators/omotola-ekeinde.webp";
        featuredWork = "Legacy in Lagos";
      },
      {
        name = "Sifa Mutua";
        description = "Adventure film specialist from Tanzania";
        profileImage = "/images/creators/sifa-mutua.webp";
        featuredWork = "Safari Spirits";
      },
      {
        name = "Nana Ama Mensah";
        description = "Ghanaian filmmaker blending music and film";
        profileImage = "/images/creators/nana-ama-mensah.webp";
        featuredWork = "Rhythm of Accra";
      },
    ];
    trailerClips = [
      {
        title = "The Witness Trailer";
        videoPath = "/movies/the-witness/trailer.mp4";
        thumbnailPath = "/images/trailers/the-witness.webp";
        description = "Detective thriller set in modern-day Nairobi";
      },
      {
        title = "Journey to Addis - Road Trip Adventure";
        videoPath = "/movies/journey-to-addis/trailer.mp4";
        thumbnailPath = "/images/trailers/journey-to-addis.webp";
        description = "Cross-country adventure from Addis Ababa to Nairobi";
      },
      {
        title = "Legacy in Lagos - Family Drama";
        videoPath = "/movies/legacy-in-lagos/trailer.mp4";
        thumbnailPath = "/images/trailers/legacy-in-lagos.webp";
        description = "Emotional story about family legacy in Lagos";
      },
      {
        title = "Safari Spirits - Wildlife Adventure";
        videoPath = "/movies/safari-spirits/trailer.mp4";
        thumbnailPath = "/images/trailers/safari-spirits.webp";
        description = "Explore the thrill of African safaris";
      },
      {
        title = "Rhythm of Accra - Music Feature";
        videoPath = "/movies/rhythm-of-accra/trailer.mp4";
        thumbnailPath = "/images/trailers/rhythm-of-accra.webp";
        description = "Behind the scenes of Accra's music scene";
      },
    ];
    valueProps = [
      {
        headline = "Transparent Royalties";
        description = "Earnings are tracked on blockchain for full transparency";
        supportingPoints = [
          "70-90% revenue share for creators",
          "Instant payouts in local currency or crypto",
          "No hidden fees or complex contracts",
        ];
      },
      {
        headline = "Accessible Everywhere";
        description = "Optimized for Africa's unique connectivity challenges";
        supportingPoints = [
          "Data saver mode with low-bandwidth streaming",
          "Mobile money payment options",
          "Works on any device - mobile, desktop, smart TV",
        ];
      },
      {
        headline = "Curated African Content";
        description = "Enjoy the best in African cinema, music, and culture";
        supportingPoints = [
          "CPA award-winning collection",
          "Diverse range of genres and languages",
          "Streamlined interface for easy discovery",
        ];
      },
      {
        headline = "Creator-First Platform";
        description = "Empowering African creators with transparent, fair payment";
        supportingPoints = [
          "Smart Royalty Contracts",
          "Community-driven ratings and reviews",
          "Global reach with local focus",
        ];
      },
      {
        headline = "Innovative Technology";
        description = "Leveraging blockchain for secure, scalable content delivery";
        supportingPoints = [
          "Seamless authentication via Internet Identity",
          "Secure asset management with full control",
          "Future-proof platform for next generation creators",
        ];
      },
    ];
  };

  let registry = Registry.new();
  let approvalState = UserApproval.initState(accessControlState);
  let inviteState = InviteLinksModule.initState();
  include BlobStorage(registry);

  type Movie = {
    title : Text;
    description : Text;
    coverImagePath : Text;
    trailerPath : Text;
    averageRating : Nat;
    reviewCount : Nat;
  };

  type UserProfile = {
    favoriteMovies : List.List<Text>;
    dataSaverMode : Bool;
    watchPartyHistory : List.List<Text>;
  };

  type Rating = {
    score : Nat;
    review : Text;
  };

  type CreatorSubmission = {
    filmTitle : Text;
    description : Text;
    creatorName : Text;
    contactInfo : Text;
    category : Text;
  };

  type TopPick = {
    movieTitle : Text;
    curatorName : Text;
    recommendation : Text;
    reason : Text;
  };

  type WatchParty = {
    id : Text;
    movieTitle : Text;
    host : Principal;
    participants : List.List<Principal>;
    chatHistory : List.List<ChatMessage>;
    reactions : List.List<Reaction>;
    startTime : Time.Time;
    isActive : Bool;
  };

  type ChatMessage = {
    sender : Principal;
    message : Text;
    timestamp : Time.Time;
  };

  type Reaction = {
    user : Principal;
    reactionType : Text;
    timestamp : Time.Time;
  };

  type BulkUploadItem = {
    title : Text;
    description : Text;
    coverImagePath : Text;
    trailerPath : Text;
  };

  type RevenueShare = {
    totalEarnings : Nat;
    pendingPayouts : Nat;
    payoutHistory : List.List<PayoutRecord>;
    paymentMethod : PaymentMethod;
  };

  type PayoutRecord = {
    amount : Nat;
    date : Time.Time;
    method : PaymentMethod;
    status : Text;
  };

  type PaymentMethod = {
    #mobileMoney : Text;
    #mPesa : Text;
    #crypto : Text;
    #stripe : Text;
    #paystack : Text;
    #plugWallet : Text;
    #icp : Text;
    #usdt : Text;
    #usdc : Text;
    #stoicWallet : Text;
    #tamriWallet : Text;
  };

  type MusicVideo = {
    title : Text;
    artist : Text;
    description : Text;
    thumbnailPath : Text;
    videoPath : Text;
    genre : Text;
  };

  type Playlist = {
    name : Text;
    musicVideoIds : List.List<Text>;
  };

  type ExtrasContent = {
    title : Text;
    description : Text;
    contentType : Text;
    thumbnailPath : Text;
    videoPath : Text;
    associatedMovie : Text;
  };

  type LivePoll = {
    id : Text;
    question : Text;
    options : List.List<Text>;
    votes : OrderedMap.Map<Text, Nat>;
    isActive : Bool;
    startTime : Time.Time;
    endTime : Time.Time;
  };

  type TriviaQuestion = {
    id : Text;
    question : Text;
    options : List.List<Text>;
    correctAnswer : Text;
    points : Nat;
  };

  type Badge = {
    name : Text;
    description : Text;
    criteria : Text;
    dateEarned : Time.Time;
  };

  type MovieNight = {
    id : Text;
    movieTitle : Text;
    host : Principal;
    scheduledTime : Time.Time;
    participants : List.List<Principal>;
    reminders : List.List<Reminder>;
  };

  type Reminder = {
    user : Principal;
    reminderTime : Time.Time;
  };

  type CommunityVote = {
    id : Text;
    question : Text;
    options : List.List<Text>;
    votes : OrderedMap.Map<Text, Nat>;
    isActive : Bool;
    startTime : Time.Time;
    endTime : Time.Time;
  };

  type Leaderboard = {
    id : Text;
    category : Text;
    entries : List.List<LeaderboardEntry>;
    lastUpdated : Time.Time;
  };

  type LeaderboardEntry = {
    user : Principal;
    score : Nat;
    rank : Nat;
  };

  type MessageThread = {
    id : Text;
    participants : List.List<Principal>;
    messages : List.List<Message>;
    lastUpdated : Time.Time;
  };

  type Message = {
    sender : Principal;
    content : Text;
    timestamp : Time.Time;
  };

  type Recommendation = {
    id : Text;
    sender : Principal;
    recipient : Principal;
    movieTitle : Text;
    note : Text;
    rating : Nat;
    timestamp : Time.Time;
    status : Text;
  };

  type DailyChallenge = {
    id : Text;
    description : Text;
    type_ : Text;
    points : Nat;
    isActive : Bool;
    startTime : Time.Time;
    endTime : Time.Time;
  };

  type Streak = {
    user : Principal;
    type_ : Text;
    count : Nat;
    lastUpdated : Time.Time;
    milestone : Nat;
  };

  type UnlockableContent = {
    id : Text;
    title : Text;
    description : Text;
    type_ : Text;
    unlockCriteria : Text;
    isUnlocked : Bool;
    unlockDate : Time.Time;
  };

  type ComingSoonItem = {
    id : Text;
    title : Text;
    description : Text;
    releaseDate : Time.Time;
    trailerPath : Text;
    thumbnailPath : Text;
    status : Text;
  };

  type VideoReview = {
    id : Text;
    user : Principal;
    movieTitle : Text;
    videoPath : Text;
    rating : Nat;
    reviewText : Text;
    timestamp : Time.Time;
    likes : Nat;
    comments : List.List<ReviewComment>;
  };

  type ReviewComment = {
    user : Principal;
    content : Text;
    timestamp : Time.Time;
  };

  type CommunityPlaylist = {
    id : Text;
    name : Text;
    creator : Principal;
    musicVideoIds : List.List<Text>;
    contributors : List.List<Principal>;
    votes : Nat;
    isPublic : Bool;
    created : Time.Time;
  };

  type RevenueModel = {
    subscriptionRevenue : Nat;
    adRevenue : Nat;
    payPerView : Nat;
    tipsDonations : Nat;
    merchandise : Nat;
  };

  type MusicTrack = {
    title : Text;
    artist : Text;
    album : Text;
    genre : Text;
    audioPath : Text;
    coverImagePath : Text;
    price : Nat;
    averageRating : Nat;
    reviewCount : Nat;
    playCount : Nat;
    releaseDate : Time.Time;
    artistProfile : Principal;
  };

  type ArtistProfile = {
    name : Text;
    bio : Text;
    photoPath : Text;
    socialLinks : List.List<Text>;
    musicTrackIds : List.List<Text>;
    earnings : Nat;
    followers : Nat;
    verified : Bool;
  };

  type MusicPlaylist = {
    name : Text;
    musicTrackIds : List.List<Text>;
    isPublic : Bool;
    created : Time.Time;
  };

  type FilmmakerSubmission = {
    id : Text;
    title : Text;
    description : Text;
    director : Text;
    cast : Text;
    category : Text;
    rating : Text;
    posterPath : Text;
    trailerPath : Text;
    rightsVerification : Text;
    contactInfo : Text;
    paymentPreferences : Text;
    status : Text;
    created : Time.Time;
  };

  type ReviewAssignment = {
    id : Text;
    submissionId : Text;
    reviewer : Principal;
    stage : Text;
    feedback : Text;
    status : Text;
    assigned : Time.Time;
  };

  type OnboardingModule = {
    id : Text;
    title : Text;
    description : Text;
    content : Text;
    type_ : Text;
    progress : Nat;
    isCompleted : Bool;
    created : Time.Time;
  };

  type WorkshopSession = {
    id : Text;
    title : Text;
    description : Text;
    type_ : Text;
    date : Time.Time;
    duration : Nat;
    isLive : Bool;
    attendees : Nat;
    created : Time.Time;
  };

  type MentorshipProgram = {
    id : Text;
    mentor : Principal;
    mentee : Principal;
    topic : Text;
    status : Text;
    startDate : Time.Time;
    endDate : Time.Time;
    progress : Nat;
  };

  type SportsContent = {
    title : Text;
    description : Text;
    sportType : Text;
    eventInfo : Text;
    thumbnailPath : Text;
    videoPath : Text;
    accessTier : Text;
    averageRating : Nat;
    reviewCount : Nat;
    creator : Principal;
    created : Time.Time;
  };

  type LiveMatch = {
    id : Text;
    title : Text;
    date : Time.Time;
    time : Text;
    venue : Text;
    teamInfo : Text;
    countdown : Nat;
    status : Text;
    created : Time.Time;
  };

  type SportsCreatorSubmission = {
    id : Text;
    title : Text;
    description : Text;
    creatorName : Text;
    sportType : Text;
    eventInfo : Text;
    contactInfo : Text;
    paymentPreferences : Text;
    status : Text;
    created : Time.Time;
  };

  type SportsPlaylist = {
    name : Text;
    sportsContentIds : List.List<Text>;
    isPublic : Bool;
    created : Time.Time;
  };

  type KidsZoneContent = {
    id : Text;
    title : Text;
    description : Text;
    ageCategory : Text;
    educationalTopic : Text;
    thumbnailPath : Text;
    videoPath : Text;
    accessTier : Text;
    averageRating : Nat;
    reviewCount : Nat;
    creator : Principal;
    created : Time.Time;
  };

  type ParentalControlSettings = {
    user : Principal;
    viewingRestrictions : List.List<Text>;
    timeLimits : Nat;
    contentFiltering : List.List<Text>;
    familyAccount : Bool;
    created : Time.Time;
  };

  type LearningGame = {
    id : Text;
    title : Text;
    description : Text;
    gameType : Text;
    educationalContent : Text;
    difficultyLevel : Text;
    ageCategory : Text;
    creator : Principal;
    created : Time.Time;
  };

  type GameProgress = {
    user : Principal;
    gameId : Text;
    progress : Nat;
    score : Nat;
    achievements : List.List<Text>;
    lastPlayed : Time.Time;
  };

  type EducationalAchievement = {
    user : Principal;
    achievementType : Text;
    description : Text;
    dateEarned : Time.Time;
    points : Nat;
  };

  type PodcastEpisode = {
    id : Text;
    title : Text;
    showName : Text;
    host : Text;
    audioPath : Text;
    description : Text;
    accessTier : Text;
    averageRating : Nat;
    reviewCount : Nat;
    playCount : Nat;
    releaseDate : Time.Time;
    creator : Principal;
  };

  type PodcastPlaylist = {
    name : Text;
    podcastEpisodeIds : List.List<Text>;
    isPublic : Bool;
    created : Time.Time;
  };

  type PodcastCreatorSubmission = {
    id : Text;
    title : Text;
    description : Text;
    creatorName : Text;
    showName : Text;
    host : Text;
    contactInfo : Text;
    paymentPreferences : Text;
    status : Text;
    created : Time.Time;
  };

  type LiveRadioStation = {
    id : Text;
    name : Text;
    streamingUrl : Text;
    genre : Text;
    programSchedule : Text;
    region : Text;
    language : Text;
    accessTier : Text;
    creator : Principal;
    created : Time.Time;
  };

  type RadioPlaylist = {
    name : Text;
    radioStationIds : List.List<Text>;
    isPublic : Bool;
    created : Time.Time;
  };

  type PodcastCreatorProfile = {
    name : Text;
    bio : Text;
    photoPath : Text;
    socialLinks : List.List<Text>;
    podcastEpisodeIds : List.List<Text>;
    earnings : Nat;
    followers : Nat;
    verified : Bool;
  };

  type RadioListeningPreference = {
    user : Principal;
    preferredGenres : List.List<Text>;
    favoriteStations : List.List<Text>;
    listeningHistory : List.List<Text>;
    created : Time.Time;
  };

  type SmartRoyalty = {
    contentId : Text;
    creator : Principal;
    revenueModel : RevenueModel;
    totalEarnings : Nat;
    payoutHistory : List.List<PayoutRecord>;
    eventLog : List.List<RoyaltyEvent>;
    lastUpdated : Time.Time;
  };

  type RoyaltyEvent = {
    eventType : Text;
    amount : Nat;
    timestamp : Time.Time;
    user : Principal;
    details : Text;
  };

  type CreatorVerification = {
    principal : Principal;
    verified : Bool;
    verificationDate : ?Time.Time;
    identityDocument : ?Text;
    contactInfo : Text;
    creatorType : Text;
    status : Text;
    submissionDate : Time.Time;
  };

  type AdminApproval = {
    contentId : Text;
    creator : Principal;
    status : Text;
    approvalDate : ?Time.Time;
    feedback : Text;
    submissionDate : Time.Time;
  };

  type PartnershipOffer = {
    id : Text;
    title : Text;
    description : Text;
    benefits : List.List<Text>;
    creatorLimit : Nat;
    currentCount : Nat;
    isActive : Bool;
    created : Time.Time;
    isFeatured : Bool;
    isEarlyAccess : Bool;
    reducedFee : Nat;
    marketingSupport : Bool;
  };

  type PartnershipApplication = {
    principal : Principal;
    creatorName : Text;
    contactInfo : Text;
    portfolioLink : Text;
    status : Text;
    applicationDate : Time.Time;
    partnershipId : Text;
  };

  type FutureAddOn = {
    id : Text;
    title : Text;
    description : Text;
    status : Text;
    expectedRelease : Time.Time;
    created : Time.Time;
  };

  type FeaturedContent = {
    movies : [Movie];
    featuredMovies : [FeaturedMovie];
    categories : [Category];
    creatorShowcases : [CreatorShowcase];
    trailerClips : [TrailerClip];
    valueProps : [ValueProp];
  };

  type FeaturedMovie = {
    id : Text;
    title : Text;
    description : Text;
    coverImagePath : Text;
    trailerPath : Text;
    genre : Text;
    director : Text;
    rating : Text;
  };

  type Category = {
    name : Text;
    description : Text;
    iconPath : Text;
  };

  type CreatorShowcase = {
    name : Text;
    description : Text;
    profileImage : Text;
    featuredWork : Text;
  };

  type TrailerClip = {
    title : Text;
    videoPath : Text;
    thumbnailPath : Text;
    description : Text;
  };

  type ValueProp = {
    headline : Text;
    description : Text;
    supportingPoints : [Text];
  };

  type ContentResult = {
    #success : FeaturedContent;
    #fallback : FeaturedContent;
  };

  // ============================================
  // ACCESS CONTROL FUNCTIONS (REQUIRED)
  // ============================================
  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  // ============================================
  // USER APPROVAL FUNCTIONS (REQUIRED)
  // ============================================
  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };

  // ============================================
  // INVITE LINKS FUNCTIONS (REQUIRED)
  // ============================================
  public shared ({ caller }) func generateInviteCode() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can generate invite codes");
    };
    let blob = await Random.blob();
    let code = InviteLinksModule.generateUUID(blob);
    InviteLinksModule.generateInviteCode(inviteState, code);
    code;
  };

  public shared func submitRSVP(name : Text, attending : Bool, inviteCode : Text) : async () {
    InviteLinksModule.submitRSVP(inviteState, name, attending, inviteCode);
  };

  public query ({ caller }) func getAllRSVPs() : async [InviteLinksModule.RSVP] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view RSVPs");
    };
    InviteLinksModule.getAllRSVPs(inviteState);
  };

  public query ({ caller }) func getInviteCodes() : async [InviteLinksModule.InviteCode] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view invite codes");
    };
    InviteLinksModule.getInviteCodes(inviteState);
  };

  // ============================================
  // USER PROFILE FUNCTIONS (REQUIRED)
  // ============================================
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view profiles");
    };
    principalMap.get(userProfiles, caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only view your own profile");
    };
    principalMap.get(userProfiles, user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles := principalMap.put(userProfiles, caller, profile);
  };

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  func isVerifiedCreator(principal : Principal) : Bool {
    switch (principalMap.get(creatorVerification, principal)) {
      case (null) { false };
      case (?verification) {
        verification.verified and verification.status == "Verified";
      };
    };
  };

  func isContentOwner(contentId : Text, principal : Principal) : Bool {
    switch (textMap.get(contentOwnership, contentId)) {
      case (null) { false };
      case (?owner) { owner == principal };
    };
  };

  func setContentOwner(contentId : Text, owner : Principal) {
    contentOwnership := textMap.put(contentOwnership, contentId, owner);
  };

  func isWatchPartyParticipant(partyId : Text, principal : Principal) : Bool {
    switch (textMap.get(watchParties, partyId)) {
      case (null) { false };
      case (?party) {
        party.host == principal or List.some<Principal>(
          party.participants,
          func(p : Principal) : Bool { p == principal }
        );
      };
    };
  };

  func isMessageThreadParticipant(threadId : Text, principal : Principal) : Bool {
    switch (textMap.get(messages, threadId)) {
      case (null) { false };
      case (?thread) {
        List.some<Principal>(
          thread.participants,
          func(p : Principal) : Bool { p == principal }
        );
      };
    };
  };

  func isSessionOwner(sessionId : Text, principal : Principal) : Bool {
    switch (textMap.get(checkoutSessions, sessionId)) {
      case (null) { false };
      case (?owner) { owner == principal };
    };
  };

  // ============================================
  // CREATOR VERIFICATION
  // ============================================
  public shared ({ caller }) func registerCreator(contactInfo : Text, creatorType : Text, identityDocument : ?Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can register as creators");
    };

    switch (principalMap.get(creatorVerification, caller)) {
      case (?existing) {
        if (existing.status == "Pending" or existing.status == "Verified") {
          Debug.trap("Creator registration already exists");
        };
      };
      case (null) {};
    };

    let verification : CreatorVerification = {
      principal = caller;
      verified = false;
      verificationDate = null;
      identityDocument;
      contactInfo;
      creatorType;
      status = "Pending";
      submissionDate = Time.now();
    };
    creatorVerification := principalMap.put(creatorVerification, caller, verification);
  };

  public query ({ caller }) func getCreatorVerificationStatus() : async ?CreatorVerification {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view verification status");
    };
    principalMap.get(creatorVerification, caller);
  };

  public shared ({ caller }) func verifyCreator(creator : Principal, verified : Bool, feedback : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can verify creators");
    };

    switch (principalMap.get(creatorVerification, creator)) {
      case (null) {
        Debug.trap("Creator verification not found");
      };
      case (?verification) {
        let updatedVerification : CreatorVerification = {
          verification with
          verified;
          verificationDate = ?Time.now();
          status = if (verified) { "Verified" } else { "Rejected" };
        };
        creatorVerification := principalMap.put(creatorVerification, creator, updatedVerification);
      };
    };
  };

  public query ({ caller }) func getAllCreatorVerifications() : async [CreatorVerification] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view all verifications");
    };
    Iter.toArray(principalMap.vals(creatorVerification));
  };

  // ============================================
  // CONTENT APPROVAL
  // ============================================
  public shared ({ caller }) func submitContentForApproval(contentId : Text, feedback : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can submit content");
    };

    if (not isVerifiedCreator(caller)) {
      Debug.trap("Unauthorized: Only verified creators can submit content for approval");
    };

    if (not isContentOwner(contentId, caller)) {
      Debug.trap("Unauthorized: Can only submit your own content for approval");
    };

    switch (textMap.get(adminApprovals, contentId)) {
      case (?existing) {
        if (existing.status == "Pending") {
          Debug.trap("Content approval already pending");
        };
      };
      case (null) {};
    };

    let approval : AdminApproval = {
      contentId;
      creator = caller;
      status = "Pending";
      approvalDate = null;
      feedback;
      submissionDate = Time.now();
    };
    adminApprovals := textMap.put(adminApprovals, contentId, approval);
  };

  public shared ({ caller }) func approveContent(contentId : Text, approved : Bool, feedback : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can approve content");
    };

    switch (textMap.get(adminApprovals, contentId)) {
      case (null) {
        Debug.trap("Content approval not found");
      };
      case (?approval) {
        let updatedApproval : AdminApproval = {
          approval with
          status = if (approved) { "Approved" } else { "Rejected" };
          approvalDate = ?Time.now();
          feedback;
        };
        adminApprovals := textMap.put(adminApprovals, contentId, updatedApproval);
      };
    };
  };

  public query ({ caller }) func getContentApprovalStatus(contentId : Text) : async ?AdminApproval {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view approval status");
    };

    switch (textMap.get(adminApprovals, contentId)) {
      case (null) { null };
      case (?approval) {
        if (approval.creator == caller or AccessControl.isAdmin(accessControlState, caller)) {
          ?approval;
        } else {
          Debug.trap("Unauthorized: Can only view your own content approval status");
        };
      };
    };
  };

  public query ({ caller }) func getAllContentApprovals() : async [AdminApproval] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view all approvals");
    };
    Iter.toArray(textMap.vals(adminApprovals));
  };

  // ============================================
  // SMART ROYALTIES
  // ============================================
  public shared ({ caller }) func createSmartRoyalty(contentId : Text, revenueModel : RevenueModel) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can create smart royalties");
    };

    if (not isVerifiedCreator(caller)) {
      Debug.trap("Unauthorized: Only verified creators can create smart royalties");
    };

    if (not isContentOwner(contentId, caller)) {
      Debug.trap("Unauthorized: Can only create smart royalties for your own content");
    };

    switch (textMap.get(smartRoyalties, contentId)) {
      case (?existing) {
        Debug.trap("Smart royalty already exists for this content");
      };
      case (null) {};
    };

    let smartRoyalty : SmartRoyalty = {
      contentId;
      creator = caller;
      revenueModel;
      totalEarnings = 0;
      payoutHistory = List.nil();
      eventLog = List.nil();
      lastUpdated = Time.now();
    };
    smartRoyalties := textMap.put(smartRoyalties, contentId, smartRoyalty);
  };

  public shared ({ caller }) func logRoyaltyEvent(contentId : Text, eventType : Text, amount : Nat, details : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can log royalty events");
    };

    switch (textMap.get(smartRoyalties, contentId)) {
      case (null) {
        Debug.trap("Smart royalty not found");
      };
      case (?smartRoyalty) {
        let event : RoyaltyEvent = {
          eventType;
          amount;
          timestamp = Time.now();
          user = caller;
          details;
        };

        let updatedRoyalty : SmartRoyalty = {
          smartRoyalty with
          eventLog = List.push(event, smartRoyalty.eventLog);
          totalEarnings = smartRoyalty.totalEarnings + amount;
          lastUpdated = Time.now();
        };
        smartRoyalties := textMap.put(smartRoyalties, contentId, updatedRoyalty);
      };
    };
  };

  public shared ({ caller }) func updateRoyaltyEarnings(contentId : Text, amount : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update royalty earnings");
    };

    switch (textMap.get(smartRoyalties, contentId)) {
      case (null) {
        Debug.trap("Smart royalty not found");
      };
      case (?smartRoyalty) {
        let updatedRoyalty : SmartRoyalty = {
          smartRoyalty with
          totalEarnings = smartRoyalty.totalEarnings + amount;
          lastUpdated = Time.now();
        };
        smartRoyalties := textMap.put(smartRoyalties, contentId, updatedRoyalty);
      };
    };
  };

  public query ({ caller }) func getSmartRoyalty(contentId : Text) : async ?SmartRoyalty {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view smart royalties");
    };

    switch (textMap.get(smartRoyalties, contentId)) {
      case (null) { null };
      case (?smartRoyalty) {
        if (smartRoyalty.creator == caller or AccessControl.isAdmin(accessControlState, caller)) {
          ?smartRoyalty;
        } else {
          Debug.trap("Unauthorized: Can only view your own smart royalties");
        };
      };
    };
  };

  public query ({ caller }) func getAllSmartRoyalties() : async [SmartRoyalty] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view all royalties");
    };
    Iter.toArray(textMap.vals(smartRoyalties));
  };

  public query ({ caller }) func getSmartRoyaltiesByCreator(creator : Principal) : async [SmartRoyalty] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view royalties");
    };

    if (caller != creator and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only view your own royalties");
    };

    let filteredRoyalties = Iter.filter<SmartRoyalty>(
      textMap.vals(smartRoyalties),
      func(royalty : SmartRoyalty) : Bool {
        royalty.creator == creator;
      },
    );
    Iter.toArray(filteredRoyalties);
  };

  public query ({ caller }) func getRoyaltyEvents(contentId : Text) : async [RoyaltyEvent] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view royalty events");
    };

    switch (textMap.get(smartRoyalties, contentId)) {
      case (null) { [] };
      case (?smartRoyalty) {
        if (smartRoyalty.creator == caller or AccessControl.isAdmin(accessControlState, caller)) {
          List.toArray(smartRoyalty.eventLog);
        } else {
          Debug.trap("Unauthorized: Can only view your own royalty events");
        };
      };
    };
  };

  public query ({ caller }) func getRoyaltyPayoutHistory(contentId : Text) : async [PayoutRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view payout history");
    };

    switch (textMap.get(smartRoyalties, contentId)) {
      case (null) { [] };
      case (?smartRoyalty) {
        if (smartRoyalty.creator != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Debug.trap("Unauthorized: Can only view your own payout history");
        };
        List.toArray(smartRoyalty.payoutHistory);
      };
    };
  };

  public query func getRevenueModel() : async RevenueModel {
    revenueModel;
  };

  public shared ({ caller }) func updateRevenueModel(newRevenueModel : RevenueModel) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update revenue model");
    };
    revenueModel := newRevenueModel;
  };

  // ============================================
  // MOVIE MANAGEMENT
  // ============================================
  public shared ({ caller }) func addMovie(title : Text, description : Text, coverImagePath : Text, trailerPath : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can add movies");
    };

    if (not isVerifiedCreator(caller)) {
      Debug.trap("Unauthorized: Only verified creators can add movies");
    };

    let movie : Movie = {
      title;
      description;
      coverImagePath;
      trailerPath;
      averageRating = 0;
      reviewCount = 0;
    };
    movies := textMap.put(movies, title, movie);
    setContentOwner(title, caller);
  };

  public shared ({ caller }) func bulkUploadMovies(items : [BulkUploadItem]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can upload movies");
    };

    if (not isVerifiedCreator(caller)) {
      Debug.trap("Unauthorized: Only verified creators can perform bulk uploads");
    };

    for (item in Iter.fromArray(items)) {
      let movie : Movie = {
        title = item.title;
        description = item.description;
        coverImagePath = item.coverImagePath;
        trailerPath = item.trailerPath;
        averageRating = 0;
        reviewCount = 0;
      };
      movies := textMap.put(movies, item.title, movie);
      setContentOwner(item.title, caller);
    };
  };

  public query func getMovie(title : Text) : async ?Movie {
    textMap.get(movies, title);
  };

  public query func getAllMovies() : async [Movie] {
    Iter.toArray(textMap.vals(movies));
  };

  public query func searchMovies(searchTerm : Text) : async [Movie] {
    let lowerSearchTerm = Text.toLowercase(searchTerm);
    let filteredMovies = Iter.filter<Movie>(
      textMap.vals(movies),
      func(movie : Movie) : Bool {
        let lowerTitle = Text.toLowercase(movie.title);
        let lowerDescription = Text.toLowercase(movie.description);
        Text.contains(lowerTitle, #text lowerSearchTerm) or Text.contains(lowerDescription, #text lowerSearchTerm);
      },
    );
    Iter.toArray(filteredMovies);
  };

  // ============================================
  // USER FAVORITES
  // ============================================
  public shared ({ caller }) func addFavoriteMovie(movieTitle : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can add favorites");
    };

    switch (principalMap.get(userProfiles, caller)) {
      case (null) {
        let newProfile : UserProfile = {
          favoriteMovies = List.push(movieTitle, List.nil());
          dataSaverMode = false;
          watchPartyHistory = List.nil();
        };
        userProfiles := principalMap.put(userProfiles, caller, newProfile);
      };
      case (?profile) {
        let updatedProfile : UserProfile = {
          favoriteMovies = List.push(movieTitle, profile.favoriteMovies);
          dataSaverMode = profile.dataSaverMode;
          watchPartyHistory = profile.watchPartyHistory;
        };
        userProfiles := principalMap.put(userProfiles, caller, updatedProfile);
      };
    };
  };

  public shared ({ caller }) func removeFavoriteMovie(movieTitle : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can remove favorites");
    };

    switch (principalMap.get(userProfiles, caller)) {
      case (null) {};
      case (?profile) {
        let updatedProfile : UserProfile = {
          favoriteMovies = List.filter<Text>(
            profile.favoriteMovies,
            func(title : Text) : Bool {
              title != movieTitle;
            },
          );
          dataSaverMode = profile.dataSaverMode;
          watchPartyHistory = profile.watchPartyHistory;
        };
        userProfiles := principalMap.put(userProfiles, caller, updatedProfile);
      };
    };
  };

  public query ({ caller }) func getFavoriteMovies() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view favorites");
    };

    switch (principalMap.get(userProfiles, caller)) {
      case (null) { [] };
      case (?profile) {
        List.toArray(profile.favoriteMovies);
      };
    };
  };

  public shared ({ caller }) func setDataSaverMode(enabled : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can set data saver mode");
    };

    switch (principalMap.get(userProfiles, caller)) {
      case (null) {
        let newProfile : UserProfile = {
          favoriteMovies = List.nil();
          dataSaverMode = enabled;
          watchPartyHistory = List.nil();
        };
        userProfiles := principalMap.put(userProfiles, caller, newProfile);
      };
      case (?profile) {
        let updatedProfile : UserProfile = {
          favoriteMovies = profile.favoriteMovies;
          dataSaverMode = enabled;
          watchPartyHistory = profile.watchPartyHistory;
        };
        userProfiles := principalMap.put(userProfiles, caller, updatedProfile);
      };
    };
  };

  public query ({ caller }) func getDataSaverMode() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view data saver mode");
    };

    switch (principalMap.get(userProfiles, caller)) {
      case (null) { false };
      case (?profile) {
        profile.dataSaverMode;
      };
    };
  };

  // ============================================
  // FILE REGISTRY
  // ============================================
  public shared ({ caller }) func registerFileReference(path : Text, hash : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can register files");
    };
    Registry.add(registry, path, hash);
  };

  public query func getFileReference(path : Text) : async Registry.FileReference {
    Registry.get(registry, path);
  };

  public query func listFileReferences() : async [Registry.FileReference] {
    Registry.list(registry);
  };

  public shared ({ caller }) func dropFileReference(path : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can drop file references");
    };
    Registry.remove(registry, path);
  };

  // ============================================
  // RATINGS
  // ============================================
  public shared ({ caller }) func rateMovie(movieTitle : Text, score : Nat, review : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can rate movies");
    };

    if (score < 1 or score > 5) {
      Debug.trap("Rating must be between 1 and 5");
    };

    switch (textMap.get(ratings, movieTitle)) {
      case (null) {
        let newRatingMap = principalMap.empty<Rating>();
        ratings := textMap.put(ratings, movieTitle, principalMap.put(newRatingMap, caller, { score; review }));
      };
      case (?existingRatings) {
        ratings := textMap.put(ratings, movieTitle, principalMap.put(existingRatings, caller, { score; review }));
      };
    };

    updateMovieRating(movieTitle);
  };

  func updateMovieRating(movieTitle : Text) {
    switch (textMap.get(ratings, movieTitle)) {
      case (null) {};
      case (?movieRatings) {
        let totalRatings = principalMap.size(movieRatings);
        var sumRatings = 0;
        for (rating in principalMap.vals(movieRatings)) {
          sumRatings += rating.score;
        };

        let averageRating = if (totalRatings > 0) {
          sumRatings / totalRatings;
        } else {
          0;
        };

        switch (textMap.get(movies, movieTitle)) {
          case (null) {};
          case (?movie) {
            let updatedMovie : Movie = {
              movie with
              averageRating;
              reviewCount = totalRatings;
            };
            movies := textMap.put(movies, movieTitle, updatedMovie);
          };
        };
      };
    };
  };

  public query func getMovieRatings(movieTitle : Text) : async [Rating] {
    switch (textMap.get(ratings, movieTitle)) {
      case (null) { [] };
      case (?movieRatings) {
        Iter.toArray(principalMap.vals(movieRatings));
      };
    };
  };

  // ============================================
  // CREATOR SUBMISSIONS
  // ============================================
  public shared ({ caller }) func submitCreatorFilm(filmTitle : Text, description : Text, creatorName : Text, contactInfo : Text, category : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can submit films");
    };

    if (not isVerifiedCreator(caller)) {
      Debug.trap("Unauthorized: Only verified creators can submit films");
    };

    let submission : CreatorSubmission = {
      filmTitle;
      description;
      creatorName;
      contactInfo;
      category;
    };
    creatorSubmissions := textMap.put(creatorSubmissions, filmTitle, submission);
    setContentOwner(filmTitle, caller);
  };

  public query ({ caller }) func getCreatorSubmissions() : async [CreatorSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view all submissions");
    };
    Iter.toArray(textMap.vals(creatorSubmissions));
  };

  // ============================================
  // TOP PICKS
  // ============================================
  public shared ({ caller }) func addTopPick(movieTitle : Text, curatorName : Text, recommendation : Text, reason : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add top picks");
    };

    let topPick : TopPick = {
      movieTitle;
      curatorName;
      recommendation;
      reason;
    };
    topPicks := textMap.put(topPicks, movieTitle, topPick);
  };

  public query func getTopPicks() : async [TopPick] {
    Iter.toArray(textMap.vals(topPicks));
  };

  // ============================================
  // WATCH PARTIES
  // ============================================
  public shared ({ caller }) func createWatchParty(movieTitle : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can create watch parties");
    };

    let partyId = Text.concat(movieTitle, Int.toText(Time.now()));

    let watchParty : WatchParty = {
      id = partyId;
      movieTitle;
      host = caller;
      participants = List.push(caller, List.nil());
      chatHistory = List.nil();
      reactions = List.nil();
      startTime = Time.now();
      isActive = true;
    };

    watchParties := textMap.put(watchParties, partyId, watchParty);

    switch (principalMap.get(userProfiles, caller)) {
      case (null) {};
      case (?profile) {
        let updatedProfile : UserProfile = {
          favoriteMovies = profile.favoriteMovies;
          dataSaverMode = profile.dataSaverMode;
          watchPartyHistory = List.push(partyId, profile.watchPartyHistory);
        };
        userProfiles := principalMap.put(userProfiles, caller, updatedProfile);
      };
    };

    partyId;
  };

  public query ({ caller }) func getWatchParty(partyId : Text) : async ?WatchParty {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view watch parties");
    };

    switch (textMap.get(watchParties, partyId)) {
      case (null) { null };
      case (?party) {
        if (isWatchPartyParticipant(partyId, caller) or AccessControl.isAdmin(accessControlState, caller)) {
          ?party;
        } else {
          Debug.trap("Unauthorized: Must be a participant to view watch party");
        };
      };
    };
  };

  public query ({ caller }) func getWatchPartyHistory() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view watch party history");
    };

    switch (principalMap.get(userProfiles, caller)) {
      case (null) { [] };
      case (?profile) {
        List.toArray(profile.watchPartyHistory);
      };
    };
  };

  public shared ({ caller }) func joinWatchParty(partyId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can join watch parties");
    };

    switch (textMap.get(watchParties, partyId)) {
      case (null) {
        Debug.trap("Watch party not found");
      };
      case (?party) {
        let isParticipant = List.some<Principal>(
          party.participants,
          func(p : Principal) : Bool { p == caller }
        );

        if (not isParticipant) {
          let updatedParty : WatchParty = {
            party with
            participants = List.push(caller, party.participants);
          };
          watchParties := textMap.put(watchParties, partyId, updatedParty);
        };
      };
    };
  };

  public shared ({ caller }) func sendChatMessage(partyId : Text, message : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can send messages");
    };

    if (not isWatchPartyParticipant(partyId, caller)) {
      Debug.trap("Unauthorized: Must be a participant to send messages");
    };

    switch (textMap.get(watchParties, partyId)) {
      case (null) {
        Debug.trap("Watch party not found");
      };
      case (?party) {
        let chatMessage : ChatMessage = {
          sender = caller;
          message;
          timestamp = Time.now();
        };

        let updatedParty : WatchParty = {
          party with
          chatHistory = List.push(chatMessage, party.chatHistory);
        };
        watchParties := textMap.put(watchParties, partyId, updatedParty);
      };
    };
  };

  public shared ({ caller }) func addReaction(partyId : Text, reactionType : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can add reactions");
    };

    if (not isWatchPartyParticipant(partyId, caller)) {
      Debug.trap("Unauthorized: Must be a participant to add reactions");
    };

    switch (textMap.get(watchParties, partyId)) {
      case (null) {
        Debug.trap("Watch party not found");
      };
      case (?party) {
        let reaction : Reaction = {
          user = caller;
          reactionType;
          timestamp = Time.now();
        };

        let updatedParty : WatchParty = {
          party with
          reactions = List.push(reaction, party.reactions);
        };
        watchParties := textMap.put(watchParties, partyId, updatedParty);
      };
    };
  };

  // ============================================
  // REVENUE SHARING
  // ============================================
  public shared ({ caller }) func setPaymentMethod(method : PaymentMethod) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can set payment methods");
    };

    if (not isVerifiedCreator(caller)) {
      Debug.trap("Unauthorized: Only verified creators can set payment methods");
    };

    let revenueShare = switch (principalMap.get(revenueSharing, caller)) {
      case (null) {
        {
          totalEarnings = 0;
          pendingPayouts = 0;
          payoutHistory = List.nil();
          paymentMethod = method;
        };
      };
      case (?existing) {
        {
          existing with
          paymentMethod = method;
        };
      };
    };
    revenueSharing := principalMap.put(revenueSharing, caller, revenueShare);
  };

  public query ({ caller }) func getRevenueShare() : async RevenueShare {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view revenue share");
    };

    if (not isVerifiedCreator(caller)) {
      Debug.trap("Unauthorized: Only verified creators can view revenue share");
    };

    switch (principalMap.get(revenueSharing, caller)) {
      case (null) {
        {
          totalEarnings = 0;
          pendingPayouts = 0;
          payoutHistory = List.nil();
          paymentMethod = #mobileMoney("");
        };
      };
      case (?revenueShare) {
        revenueShare;
      };
    };
  };

  public query ({ caller }) func getRevenueSharingInfo() : async [RevenueShare] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view all revenue sharing info");
    };
    Iter.toArray(principalMap.vals(revenueSharing));
  };

  // ============================================
  // STRIPE INTEGRATION
  // ============================================
  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) {
        Debug.trap("Stripe configuration not set");
      };
      case (?config) {
        config;
      };
    };
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can check session status");
    };

    if (not isSessionOwner(sessionId, caller) and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only check your own session status");
    };

    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can create checkout sessions");
    };

    let sessionId = await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
    checkoutSessions := textMap.put(checkoutSessions, sessionId, caller);
    sessionId;
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ============================================
  // FEATURED CONTENT FUNCTIONS
  // ============================================
  public query func getFeaturedContent() : async ContentResult {
    #success({ fallbackContent with movies = Iter.toArray(textMap.vals(movies)) });
  };

  public query func getFallbackContent() : async FeaturedContent {
    fallbackContent;
  };
};
