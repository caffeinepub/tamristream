import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type ApprovalStatus = { 'pending' : null } |
  { 'approved' : null } |
  { 'rejected' : null };
export interface ArtistProfile {
  'bio' : string,
  'photoPath' : string,
  'verified' : boolean,
  'socialLinks' : List,
  'name' : string,
  'musicTrackIds' : List,
  'earnings' : bigint,
  'followers' : bigint,
}
export interface BulkUploadItem {
  'title' : string,
  'coverImagePath' : string,
  'trailerPath' : string,
  'description' : string,
}
export interface BusinessModel {
  'flexibleAccessOptions' : Array<FlexibleAccessOption>,
  'partnershipBenefits' : Array<PartnershipBenefit>,
  'subscriptionTiers' : Array<SubscriptionTier>,
  'visualDisplays' : Array<VisualDisplay>,
}
export interface ChatMessage {
  'sender' : Principal,
  'message' : string,
  'timestamp' : Time,
}
export interface CreatorSubmission {
  'contactInfo' : string,
  'filmTitle' : string,
  'description' : string,
  'creatorName' : string,
  'category' : string,
}
export interface ExtrasContent {
  'title' : string,
  'contentType' : string,
  'associatedMovie' : string,
  'description' : string,
  'videoPath' : string,
  'thumbnailPath' : string,
}
export interface FileReference { 'hash' : string, 'path' : string }
export interface FilmmakerSubmission {
  'id' : string,
  'status' : string,
  'title' : string,
  'created' : Time,
  'contactInfo' : string,
  'paymentPreferences' : string,
  'trailerPath' : string,
  'cast' : string,
  'posterPath' : string,
  'description' : string,
  'director' : string,
  'category' : string,
  'rating' : string,
  'rightsVerification' : string,
}
export interface FlexibleAccessOption {
  'name' : string,
  'type' : string,
  'description' : string,
}
export interface InviteCode {
  'created' : Time,
  'code' : string,
  'used' : boolean,
}
export type List = [] | [[string, List]];
export type List_1 = [] | [[ChatMessage, List_1]];
export type List_2 = [] | [[Principal, List_2]];
export type List_3 = [] | [[Reaction, List_3]];
export type List_4 = [] | [[PayoutRecord, List_4]];
export interface LiveMatch {
  'id' : string,
  'status' : string,
  'teamInfo' : string,
  'title' : string,
  'created' : Time,
  'venue' : string,
  'date' : Time,
  'time' : string,
  'countdown' : bigint,
}
export interface MentorshipProgram {
  'id' : string,
  'mentee' : Principal,
  'mentor' : Principal,
  'status' : string,
  'topic' : string,
  'endDate' : Time,
  'progress' : bigint,
  'startDate' : Time,
}
export interface Movie {
  'title' : string,
  'coverImagePath' : string,
  'trailerPath' : string,
  'description' : string,
  'averageRating' : bigint,
  'reviewCount' : bigint,
}
export interface MusicPlaylist {
  'created' : Time,
  'name' : string,
  'musicTrackIds' : List,
  'isPublic' : boolean,
}
export interface MusicTrack {
  'title' : string,
  'coverImagePath' : string,
  'album' : string,
  'artistProfile' : Principal,
  'audioPath' : string,
  'playCount' : bigint,
  'averageRating' : bigint,
  'genre' : string,
  'artist' : string,
  'price' : bigint,
  'reviewCount' : bigint,
  'releaseDate' : Time,
}
export interface MusicVideo {
  'title' : string,
  'description' : string,
  'videoPath' : string,
  'thumbnailPath' : string,
  'genre' : string,
  'artist' : string,
}
export interface OnboardingModule {
  'id' : string,
  'title' : string,
  'created' : Time,
  'content' : string,
  'isCompleted' : boolean,
  'type' : string,
  'description' : string,
  'progress' : bigint,
}
export interface PartnershipBenefit {
  'name' : string,
  'type' : string,
  'description' : string,
}
export type PaymentMethod = { 'mobileMoney' : string } |
  { 'crypto' : string } |
  { 'mPesa' : string };
export interface PayoutRecord {
  'status' : string,
  'method' : PaymentMethod,
  'date' : Time,
  'amount' : bigint,
}
export interface Playlist { 'name' : string, 'musicVideoIds' : List }
export interface RSVP {
  'name' : string,
  'inviteCode' : string,
  'timestamp' : Time,
  'attending' : boolean,
}
export interface Rating { 'review' : string, 'score' : bigint }
export interface Reaction {
  'user' : Principal,
  'reactionType' : string,
  'timestamp' : Time,
}
export interface RevenueShare {
  'paymentMethod' : PaymentMethod,
  'payoutHistory' : List_4,
  'pendingPayouts' : bigint,
  'totalEarnings' : bigint,
}
export interface ReviewAssignment {
  'id' : string,
  'status' : string,
  'assigned' : Time,
  'feedback' : string,
  'stage' : string,
  'submissionId' : string,
  'reviewer' : Principal,
}
export interface ShoppingItem {
  'productName' : string,
  'currency' : string,
  'quantity' : bigint,
  'priceInCents' : bigint,
  'productDescription' : string,
}
export interface SportsContent {
  'title' : string,
  'created' : Time,
  'creator' : Principal,
  'description' : string,
  'accessTier' : string,
  'sportType' : string,
  'videoPath' : string,
  'averageRating' : bigint,
  'thumbnailPath' : string,
  'reviewCount' : bigint,
  'eventInfo' : string,
}
export interface SportsCreatorSubmission {
  'id' : string,
  'status' : string,
  'title' : string,
  'created' : Time,
  'contactInfo' : string,
  'paymentPreferences' : string,
  'description' : string,
  'sportType' : string,
  'creatorName' : string,
  'eventInfo' : string,
}
export interface SportsPlaylist {
  'sportsContentIds' : List,
  'created' : Time,
  'name' : string,
  'isPublic' : boolean,
}
export interface StripeConfiguration {
  'allowedCountries' : Array<string>,
  'secretKey' : string,
}
export type StripeSessionStatus = {
    'completed' : { 'userPrincipal' : [] | [string], 'response' : string }
  } |
  { 'failed' : { 'error' : string } };
export interface SubscriptionTier {
  'features' : Array<string>,
  'name' : string,
  'accessType' : string,
  'price' : bigint,
}
export type Time = bigint;
export interface TopPick {
  'curatorName' : string,
  'recommendation' : string,
  'movieTitle' : string,
  'reason' : string,
}
export interface TransformationInput {
  'context' : Uint8Array | number[],
  'response' : http_request_result,
}
export interface TransformationOutput {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<http_header>,
}
export interface UserApprovalInfo {
  'status' : ApprovalStatus,
  'principal' : Principal,
}
export interface UserProfile {
  'watchPartyHistory' : List,
  'favoriteMovies' : List,
  'dataSaverMode' : boolean,
}
export type UserRole = { 'admin' : null } |
  { 'user' : null } |
  { 'guest' : null };
export interface VisualDisplay { 'content' : string, 'type' : string }
export interface WatchParty {
  'id' : string,
  'startTime' : Time,
  'participants' : List_2,
  'host' : Principal,
  'isActive' : boolean,
  'movieTitle' : string,
  'reactions' : List_3,
  'chatHistory' : List_1,
}
export interface WorkshopSession {
  'id' : string,
  'title' : string,
  'created' : Time,
  'duration' : bigint,
  'date' : Time,
  'type' : string,
  'description' : string,
  'isLive' : boolean,
  'attendees' : bigint,
}
export interface http_header { 'value' : string, 'name' : string }
export interface http_request_result {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<http_header>,
}
export interface _SERVICE {
  'addExtrasContent' : ActorMethod<
    [string, string, string, string, string, string],
    undefined
  >,
  'addFavoriteMovie' : ActorMethod<[string], undefined>,
  'addMentorshipProgram' : ActorMethod<[Principal, string], undefined>,
  'addMovie' : ActorMethod<[string, string, string, string], undefined>,
  'addMusicTrack' : ActorMethod<
    [string, string, string, string, string, string, bigint],
    undefined
  >,
  'addMusicTrackToPlaylist' : ActorMethod<[string, string], undefined>,
  'addMusicVideo' : ActorMethod<
    [string, string, string, string, string, string],
    undefined
  >,
  'addMusicVideoToPlaylist' : ActorMethod<[string, string], undefined>,
  'addOnboardingModule' : ActorMethod<
    [string, string, string, string],
    undefined
  >,
  'addSportsContent' : ActorMethod<
    [string, string, string, string, string, string, string],
    undefined
  >,
  'addSportsContentToPlaylist' : ActorMethod<[string, string], undefined>,
  'addTopPick' : ActorMethod<[string, string, string, string], undefined>,
  'addWorkshopSession' : ActorMethod<
    [string, string, string, bigint, boolean],
    undefined
  >,
  'assignCallerUserRole' : ActorMethod<[Principal, UserRole], undefined>,
  'assignReview' : ActorMethod<[string, string], undefined>,
  'bulkUploadMovies' : ActorMethod<[Array<BulkUploadItem>], undefined>,
  'createArtistProfile' : ActorMethod<
    [string, string, string, Array<string>],
    undefined
  >,
  'createCheckoutSession' : ActorMethod<
    [Array<ShoppingItem>, string, string],
    string
  >,
  'createLiveMatch' : ActorMethod<
    [string, Time, string, string, string],
    undefined
  >,
  'createMusicPlaylist' : ActorMethod<[string, boolean], undefined>,
  'createPlaylist' : ActorMethod<[string], undefined>,
  'createSportsPlaylist' : ActorMethod<[string, boolean], undefined>,
  'createWatchParty' : ActorMethod<[string], string>,
  'dropFileReference' : ActorMethod<[string], undefined>,
  'generateInviteCode' : ActorMethod<[], string>,
  'getAllArtistProfiles' : ActorMethod<[], Array<ArtistProfile>>,
  'getAllExtrasContent' : ActorMethod<[], Array<ExtrasContent>>,
  'getAllLiveMatches' : ActorMethod<[], Array<LiveMatch>>,
  'getAllMovies' : ActorMethod<[], Array<Movie>>,
  'getAllMusicTracks' : ActorMethod<[], Array<MusicTrack>>,
  'getAllMusicVideos' : ActorMethod<[], Array<MusicVideo>>,
  'getAllRSVPs' : ActorMethod<[], Array<RSVP>>,
  'getAllSportsContent' : ActorMethod<[], Array<SportsContent>>,
  'getArtistProfile' : ActorMethod<[], [] | [ArtistProfile]>,
  'getBusinessModel' : ActorMethod<[], BusinessModel>,
  'getCallerUserProfile' : ActorMethod<[], [] | [UserProfile]>,
  'getCallerUserRole' : ActorMethod<[], UserRole>,
  'getCreatorSubmissions' : ActorMethod<[], Array<CreatorSubmission>>,
  'getDataSaverMode' : ActorMethod<[], boolean>,
  'getExtrasByMovie' : ActorMethod<[string], Array<ExtrasContent>>,
  'getExtrasContent' : ActorMethod<[string], [] | [ExtrasContent]>,
  'getFavoriteMovies' : ActorMethod<[], Array<string>>,
  'getFileReference' : ActorMethod<[string], FileReference>,
  'getFilmmakerSubmissions' : ActorMethod<[], Array<FilmmakerSubmission>>,
  'getInviteCodes' : ActorMethod<[], Array<InviteCode>>,
  'getLiveMatch' : ActorMethod<[string], [] | [LiveMatch]>,
  'getMentorshipPrograms' : ActorMethod<[], Array<MentorshipProgram>>,
  'getMovie' : ActorMethod<[string], [] | [Movie]>,
  'getMovieRatings' : ActorMethod<[string], Array<Rating>>,
  'getMusicPlaylists' : ActorMethod<[], Array<MusicPlaylist>>,
  'getMusicTrack' : ActorMethod<[string], [] | [MusicTrack]>,
  'getMusicVideo' : ActorMethod<[string], [] | [MusicVideo]>,
  'getOnboardingModules' : ActorMethod<[], Array<OnboardingModule>>,
  'getPlaylists' : ActorMethod<[], Array<Playlist>>,
  'getRevenueShare' : ActorMethod<[], RevenueShare>,
  'getRevenueSharingInfo' : ActorMethod<[], Array<RevenueShare>>,
  'getReviewAssignments' : ActorMethod<[], Array<ReviewAssignment>>,
  'getSportsContent' : ActorMethod<[string], [] | [SportsContent]>,
  'getSportsCreatorSubmissions' : ActorMethod<
    [],
    Array<SportsCreatorSubmission>
  >,
  'getSportsPlaylists' : ActorMethod<[], Array<SportsPlaylist>>,
  'getStripeSessionStatus' : ActorMethod<[string], StripeSessionStatus>,
  'getTopPicks' : ActorMethod<[], Array<TopPick>>,
  'getUserProfile' : ActorMethod<[Principal], [] | [UserProfile]>,
  'getWatchParty' : ActorMethod<[string], [] | [WatchParty]>,
  'getWatchPartyHistory' : ActorMethod<[], Array<string>>,
  'getWorkshopSessions' : ActorMethod<[], Array<WorkshopSession>>,
  'initializeAccessControl' : ActorMethod<[], undefined>,
  'isCallerAdmin' : ActorMethod<[], boolean>,
  'isCallerApproved' : ActorMethod<[], boolean>,
  'isStripeConfigured' : ActorMethod<[], boolean>,
  'listApprovals' : ActorMethod<[], Array<UserApprovalInfo>>,
  'listFileReferences' : ActorMethod<[], Array<FileReference>>,
  'rateMovie' : ActorMethod<[string, bigint, string], undefined>,
  'registerFileReference' : ActorMethod<[string, string], undefined>,
  'removeFavoriteMovie' : ActorMethod<[string], undefined>,
  'removeMusicTrackFromPlaylist' : ActorMethod<[string, string], undefined>,
  'removeMusicVideoFromPlaylist' : ActorMethod<[string, string], undefined>,
  'removeSportsContentFromPlaylist' : ActorMethod<[string, string], undefined>,
  'requestApproval' : ActorMethod<[], undefined>,
  'saveCallerUserProfile' : ActorMethod<[UserProfile], undefined>,
  'searchLiveMatches' : ActorMethod<[string], Array<LiveMatch>>,
  'searchMovies' : ActorMethod<[string], Array<Movie>>,
  'searchMusicTracks' : ActorMethod<[string], Array<MusicTrack>>,
  'searchMusicVideos' : ActorMethod<[string], Array<MusicVideo>>,
  'searchSportsContent' : ActorMethod<[string], Array<SportsContent>>,
  'setApproval' : ActorMethod<[Principal, ApprovalStatus], undefined>,
  'setDataSaverMode' : ActorMethod<[boolean], undefined>,
  'setPaymentMethod' : ActorMethod<[PaymentMethod], undefined>,
  'setStripeConfiguration' : ActorMethod<[StripeConfiguration], undefined>,
  'submitCreatorFilm' : ActorMethod<
    [string, string, string, string, string],
    undefined
  >,
  'submitFilmmakerSubmission' : ActorMethod<
    [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
    ],
    undefined
  >,
  'submitRSVP' : ActorMethod<[string, boolean, string], undefined>,
  'submitSportsCreatorSubmission' : ActorMethod<
    [string, string, string, string, string, string, string],
    undefined
  >,
  'transform' : ActorMethod<[TransformationInput], TransformationOutput>,
  'updateBusinessModel' : ActorMethod<[BusinessModel], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
