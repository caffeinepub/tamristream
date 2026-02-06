import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Movie {
    title: string;
    coverImagePath: string;
    trailerPath: string;
    description: string;
    averageRating: bigint;
    reviewCount: bigint;
}
export interface WatchParty {
    id: string;
    startTime: Time;
    participants: List_2;
    host: Principal;
    isActive: boolean;
    movieTitle: string;
    reactions: List_3;
    chatHistory: List_1;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TrailerClip {
    title: string;
    description: string;
    videoPath: string;
    thumbnailPath: string;
}
export interface TopPick {
    curatorName: string;
    recommendation: string;
    movieTitle: string;
    reason: string;
}
export type Time = bigint;
export interface Rating {
    review: string;
    score: bigint;
}
export interface PayoutRecord {
    status: string;
    method: PaymentMethod;
    date: Time;
    amount: bigint;
}
export type PaymentMethod = {
    __kind__: "icp";
    icp: string;
} | {
    __kind__: "mobileMoney";
    mobileMoney: string;
} | {
    __kind__: "stripe";
    stripe: string;
} | {
    __kind__: "usdc";
    usdc: string;
} | {
    __kind__: "usdt";
    usdt: string;
} | {
    __kind__: "tamriWallet";
    tamriWallet: string;
} | {
    __kind__: "crypto";
    crypto: string;
} | {
    __kind__: "paystack";
    paystack: string;
} | {
    __kind__: "plugWallet";
    plugWallet: string;
} | {
    __kind__: "stoicWallet";
    stoicWallet: string;
} | {
    __kind__: "mPesa";
    mPesa: string;
};
export type List_2 = [Principal, List_2] | null;
export interface CreatorVerification {
    status: string;
    principal: Principal;
    verified: boolean;
    contactInfo: string;
    verificationDate?: Time;
    creatorType: string;
    identityDocument?: string;
    submissionDate: Time;
}
export interface InviteCode {
    created: Time;
    code: string;
    used: boolean;
}
export interface CreatorSubmission {
    contactInfo: string;
    filmTitle: string;
    description: string;
    creatorName: string;
    category: string;
}
export interface FeaturedMovie {
    id: string;
    title: string;
    coverImagePath: string;
    trailerPath: string;
    description: string;
    director: string;
    genre: string;
    rating: string;
}
export type List_5 = [PayoutRecord, List_5] | null;
export interface CreatorShowcase {
    profileImage: string;
    name: string;
    featuredWork: string;
    description: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type List = [string, List] | null;
export interface ChatMessage {
    sender: Principal;
    message: string;
    timestamp: Time;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface SmartRoyalty {
    contentId: string;
    creator: Principal;
    payoutHistory: List_5;
    lastUpdated: Time;
    revenueModel: RevenueModel;
    totalEarnings: bigint;
    eventLog: List_4;
}
export interface RevenueShare {
    paymentMethod: PaymentMethod;
    payoutHistory: List_5;
    pendingPayouts: bigint;
    totalEarnings: bigint;
}
export interface FileReference {
    hash: string;
    path: string;
}
export type ContentResult = {
    __kind__: "fallback";
    fallback: FeaturedContent;
} | {
    __kind__: "success";
    success: FeaturedContent;
};
export interface Category {
    name: string;
    description: string;
    iconPath: string;
}
export interface BulkUploadItem {
    title: string;
    coverImagePath: string;
    trailerPath: string;
    description: string;
}
export interface AdminApproval {
    status: string;
    contentId: string;
    creator: Principal;
    feedback: string;
    approvalDate?: Time;
    submissionDate: Time;
}
export type List_3 = [Reaction, List_3] | null;
export interface RevenueModel {
    merchandise: bigint;
    subscriptionRevenue: bigint;
    adRevenue: bigint;
    payPerView: bigint;
    tipsDonations: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface RoyaltyEvent {
    user: Principal;
    timestamp: Time;
    details: string;
    amount: bigint;
    eventType: string;
}
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export interface RSVP {
    name: string;
    inviteCode: string;
    timestamp: Time;
    attending: boolean;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface FeaturedContent {
    categories: Array<Category>;
    featuredMovies: Array<FeaturedMovie>;
    creatorShowcases: Array<CreatorShowcase>;
    valueProps: Array<ValueProp>;
    trailerClips: Array<TrailerClip>;
    movies: Array<Movie>;
}
export interface ValueProp {
    supportingPoints: Array<string>;
    headline: string;
    description: string;
}
export type List_1 = [ChatMessage, List_1] | null;
export type List_4 = [RoyaltyEvent, List_4] | null;
export interface UserProfile {
    watchPartyHistory: List;
    favoriteMovies: List;
    dataSaverMode: boolean;
}
export interface Reaction {
    user: Principal;
    reactionType: string;
    timestamp: Time;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFavoriteMovie(movieTitle: string): Promise<void>;
    addMovie(title: string, description: string, coverImagePath: string, trailerPath: string): Promise<void>;
    addReaction(partyId: string, reactionType: string): Promise<void>;
    addTopPick(movieTitle: string, curatorName: string, recommendation: string, reason: string): Promise<void>;
    approveContent(contentId: string, approved: boolean, feedback: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bulkUploadMovies(items: Array<BulkUploadItem>): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createSmartRoyalty(contentId: string, revenueModel: RevenueModel): Promise<void>;
    createWatchParty(movieTitle: string): Promise<string>;
    dropFileReference(path: string): Promise<void>;
    generateInviteCode(): Promise<string>;
    getAllContentApprovals(): Promise<Array<AdminApproval>>;
    getAllCreatorVerifications(): Promise<Array<CreatorVerification>>;
    getAllMovies(): Promise<Array<Movie>>;
    getAllRSVPs(): Promise<Array<RSVP>>;
    getAllSmartRoyalties(): Promise<Array<SmartRoyalty>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContentApprovalStatus(contentId: string): Promise<AdminApproval | null>;
    getCreatorSubmissions(): Promise<Array<CreatorSubmission>>;
    getCreatorVerificationStatus(): Promise<CreatorVerification | null>;
    getDataSaverMode(): Promise<boolean>;
    getFallbackContent(): Promise<FeaturedContent>;
    getFavoriteMovies(): Promise<Array<string>>;
    getFeaturedContent(): Promise<ContentResult>;
    getFileReference(path: string): Promise<FileReference>;
    getInviteCodes(): Promise<Array<InviteCode>>;
    getMovie(title: string): Promise<Movie | null>;
    getMovieRatings(movieTitle: string): Promise<Array<Rating>>;
    getRevenueModel(): Promise<RevenueModel>;
    getRevenueShare(): Promise<RevenueShare>;
    getRevenueSharingInfo(): Promise<Array<RevenueShare>>;
    getRoyaltyEvents(contentId: string): Promise<Array<RoyaltyEvent>>;
    getRoyaltyPayoutHistory(contentId: string): Promise<Array<PayoutRecord>>;
    getSmartRoyaltiesByCreator(creator: Principal): Promise<Array<SmartRoyalty>>;
    getSmartRoyalty(contentId: string): Promise<SmartRoyalty | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getTopPicks(): Promise<Array<TopPick>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWatchParty(partyId: string): Promise<WatchParty | null>;
    getWatchPartyHistory(): Promise<Array<string>>;
    initializeAccessControl(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    joinWatchParty(partyId: string): Promise<void>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    listFileReferences(): Promise<Array<FileReference>>;
    logRoyaltyEvent(contentId: string, eventType: string, amount: bigint, details: string): Promise<void>;
    rateMovie(movieTitle: string, score: bigint, review: string): Promise<void>;
    registerCreator(contactInfo: string, creatorType: string, identityDocument: string | null): Promise<void>;
    registerFileReference(path: string, hash: string): Promise<void>;
    removeFavoriteMovie(movieTitle: string): Promise<void>;
    requestApproval(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchMovies(searchTerm: string): Promise<Array<Movie>>;
    sendChatMessage(partyId: string, message: string): Promise<void>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    setDataSaverMode(enabled: boolean): Promise<void>;
    setPaymentMethod(method: PaymentMethod): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitContentForApproval(contentId: string, feedback: string): Promise<void>;
    submitCreatorFilm(filmTitle: string, description: string, creatorName: string, contactInfo: string, category: string): Promise<void>;
    submitRSVP(name: string, attending: boolean, inviteCode: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateRevenueModel(newRevenueModel: RevenueModel): Promise<void>;
    updateRoyaltyEarnings(contentId: string, amount: bigint): Promise<void>;
    verifyCreator(creator: Principal, verified: boolean, feedback: string): Promise<void>;
}
