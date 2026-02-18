import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Star, Calendar, Clock, Heart, User, Upload, Users, Film, FileText } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetFavoriteMovies, useAddFavoriteMovie, useRemoveFavoriteMovie, useRateMovie, useGetMovieRatings, useIsAdmin, useUploadMovieContent, useCreateWatchParty, useGetExtrasByMovie, type ExtrasContent } from '../hooks/useQueries';
import { useFileUrl } from '../blob-storage/FileStorage';
import { toast } from 'sonner';
import { useState, useRef, useEffect } from 'react';
import type { Movie } from '../backend';
import { VideoQualitySelector } from './VideoQualitySelector';
import { DataUsageIndicator } from './DataUsageIndicator';
import { DataUsageEstimator } from './DataUsageEstimator';
import { useAdaptiveStreaming } from '../hooks/useAdaptiveStreaming';
import { useDataUsageTracker } from '../hooks/useDataUsageTracker';

interface MovieDialogProps {
  movie: Movie | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWatchPartyCreate?: (partyId: string) => void;
}

export function MovieDialog({ movie, open, onOpenChange, onWatchPartyCreate }: MovieDialogProps) {
  const { identity } = useInternetIdentity();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [uploadingTrailer, setUploadingTrailer] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<ExtrasContent | null>(null);
  const [showExtrasDialog, setShowExtrasDialog] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { data: favoriteMovies = [] } = useGetFavoriteMovies();
  const { data: movieRatings = [] } = useGetMovieRatings(movie?.title || '');
  const { data: isAdmin = false } = useIsAdmin();
  const { data: trailerUrl } = useFileUrl(movie?.trailerPath || '');
  const { data: extrasContent = [] } = useGetExtrasByMovie(movie?.title || '');
  
  const addFavorite = useAddFavoriteMovie();
  const removeFavorite = useRemoveFavoriteMovie();
  const rateMovie = useRateMovie();
  const uploadContent = useUploadMovieContent();
  const createWatchParty = useCreateWatchParty();
  
  const { currentQuality, autoMode, setQuality, toggleAutoMode } = useAdaptiveStreaming();
  const { resetCurrentSession } = useDataUsageTracker();
  
  const isFavorite = movie ? favoriteMovies.includes(movie.title) : false;
  const averageRating = movie ? Number(movie.averageRating) : 0;
  const reviewCount = movie ? Number(movie.reviewCount) : 0;

  // Reset data tracking when dialog closes
  useEffect(() => {
    if (!open) {
      resetCurrentSession();
      setIsPlaying(false);
      setPlaybackTime(0);
    }
  }, [open, resetCurrentSession]);

  // Track video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setPlaybackTime(video.currentTime);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handleToggleFavorite = async () => {
    if (!movie) return;

    try {
      if (isFavorite) {
        await removeFavorite.mutateAsync(movie.title);
        toast.success('Removed from favorites');
      } else {
        await addFavorite.mutateAsync(movie.title);
        toast.success('Added to favorites');
      }
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  const handleSubmitRating = async () => {
    if (!movie || rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    try {
      await rateMovie.mutateAsync({
        movieTitle: movie.title,
        score: rating,
        review: review.trim()
      });
      toast.success('Rating submitted successfully');
      setRating(0);
      setReview('');
    } catch (error) {
      toast.error('Failed to submit rating');
    }
  };

  const handleCreateWatchParty = async () => {
    if (!movie) return;

    try {
      const partyId = await createWatchParty.mutateAsync(movie.title);
      toast.success('Watch party created! Inviting friends...');
      onWatchPartyCreate?.(partyId);
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to create watch party');
    }
  };

  const handleFileUpload = async (file: File, type: 'poster' | 'trailer') => {
    if (!movie) return;

    const isUploading = type === 'poster' ? setUploadingPoster : setUploadingTrailer;
    isUploading(true);

    try {
      const path = `movies/${movie.title.toLowerCase().replace(/\s+/g, '-')}-${type}.${file.name.split('.').pop()}`;
      await uploadContent.mutateAsync({
        file,
        path,
        onProgress: (percentage) => {
          // Could show progress here
        }
      });
      toast.success(`${type === 'poster' ? 'Poster' : 'Trailer'} uploaded successfully`);
    } catch (error) {
      toast.error(`Failed to upload ${type}`);
    } finally {
      isUploading(false);
    }
  };

  const handleExtrasPlay = (extras: ExtrasContent) => {
    setSelectedExtras(extras);
    setShowExtrasDialog(true);
  };

  const renderStars = (count: number, interactive = false, onStarClick?: (star: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= count 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onStarClick?.(star)}
          />
        ))}
      </div>
    );
  };

  if (!movie) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                <img
                  src={`/assets/generated/${movie.coverImagePath}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Data Usage Estimator */}
              <DataUsageEstimator durationMinutes={120} />
              
              {movie.trailerPath && trailerUrl && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">Trailer</h4>
                    <div className="flex items-center gap-2">
                      <DataUsageIndicator
                        quality={currentQuality}
                        isPlaying={isPlaying}
                        playbackTime={playbackTime}
                      />
                      <VideoQualitySelector
                        currentQuality={currentQuality}
                        autoMode={autoMode}
                        onQualityChange={(quality) => setQuality(quality, false)}
                        onAutoModeToggle={toggleAutoMode}
                      />
                    </div>
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden bg-black relative">
                    <video
                      ref={videoRef}
                      controls
                      className="w-full h-full"
                      poster={`/assets/generated/${movie.coverImagePath}`}
                    >
                      <source src={trailerUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              {isAdmin && (
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">Admin Controls</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowUploadSection(!showUploadSection)}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Content
                    </Button>
                  </div>
                  
                  {showUploadSection && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="poster-upload">Upload New Poster</Label>
                        <input
                          id="poster-upload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'poster');
                          }}
                          disabled={uploadingPoster}
                          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="trailer-upload">Upload Trailer</Label>
                        <input
                          id="trailer-upload"
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'trailer');
                          }}
                          disabled={uploadingTrailer}
                          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {movie.title}
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="extras">
                    Extras ({extrasContent.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="flex items-center space-x-4">
                    {renderStars(averageRating)}
                    <span className="text-sm text-muted-foreground">
                      {averageRating > 0 ? `${averageRating}/5` : 'No ratings yet'} 
                      {reviewCount > 0 && ` (${reviewCount} review${reviewCount !== 1 ? 's' : ''})`}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                    <Badge variant="outline">African Cinema</Badge>
                    <Badge variant="outline">HD Quality</Badge>
                    {isFavorite && (
                      <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                        <Heart className="w-3 h-3 mr-1 fill-current" />
                        Favorite
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Synopsis</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {movie.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-border">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Release Year:</span>
                      <span className="font-medium">2024</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">120 min</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                      <Play className="w-5 h-5 mr-2" />
                      Watch Now
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full h-12 text-base font-medium"
                      onClick={handleCreateWatchParty}
                      disabled={createWatchParty.isPending}
                    >
                      <Users className="w-5 h-5 mr-2" />
                      {createWatchParty.isPending ? 'Creating...' : 'Start Watch Party'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full h-12 text-base font-medium"
                      onClick={handleToggleFavorite}
                      disabled={addFavorite.isPending || removeFavorite.isPending}
                    >
                      <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      Streaming feature coming soon
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Rate this Movie</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <Label>Your Rating</Label>
                        {renderStars(rating, true, setRating)}
                      </div>
                      
                      <div>
                        <Label htmlFor="review">Your Review (Optional)</Label>
                        <Textarea
                          id="review"
                          placeholder="Share your thoughts about this movie..."
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <Button
                        onClick={handleSubmitRating}
                        disabled={rating === 0 || rateMovie.isPending}
                        className="w-full"
                      >
                        {rateMovie.isPending ? 'Submitting...' : 'Submit Rating'}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  <h4 className="font-semibold text-foreground">
                    Reviews {reviewCount > 0 && `(${reviewCount})`}
                  </h4>
                  
                  {movieRatings.length > 0 ? (
                    <ScrollArea className="h-64">
                      <div className="space-y-4">
                        {movieRatings.map((rating, index) => (
                          <div key={index} className="space-y-2 p-3 border rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                    <User className="w-3 h-3" />
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">Anonymous User</span>
                              </div>
                              {renderStars(Number(rating.score))}
                            </div>
                            {rating.review && (
                              <p className="text-sm text-muted-foreground">{rating.review}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No reviews yet. Be the first to review this movie!
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="extras" className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Film className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Behind the Scenes & More</h4>
                  </div>
                  
                  {extrasContent.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {extrasContent.map((extras) => (
                        <ExtrasCard
                          key={extras.title}
                          extras={extras}
                          onPlay={() => handleExtrasPlay(extras)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No extras available</h3>
                      <p className="text-muted-foreground">
                        Behind-the-scenes content, interviews, and documentaries will appear here when available.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ExtrasPlayerDialog
        extras={selectedExtras}
        open={showExtrasDialog}
        onOpenChange={setShowExtrasDialog}
      />
    </>
  );
}

interface ExtrasCardProps {
  extras: ExtrasContent;
  onPlay: () => void;
}

function ExtrasCard({ extras, onPlay }: ExtrasCardProps) {
  return (
    <div className="flex gap-4 p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer" onClick={onPlay}>
      <div className="relative w-32 h-20 shrink-0 rounded overflow-hidden bg-muted">
        <img
          src={`/assets/generated/${extras.thumbnailPath}`}
          alt={extras.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Play className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="font-medium text-sm truncate">{extras.title}</h5>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{extras.description}</p>
        <Badge variant="outline" className="mt-2 text-xs">{extras.contentType}</Badge>
      </div>
    </div>
  );
}

interface ExtrasPlayerDialogProps {
  extras: ExtrasContent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ExtrasPlayerDialog({ extras, open, onOpenChange }: ExtrasPlayerDialogProps) {
  const { data: videoUrl } = useFileUrl(extras?.videoPath || '');

  if (!extras) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{extras.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {videoUrl && (
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <video
                controls
                autoPlay
                className="w-full h-full"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <p className="text-sm text-muted-foreground">{extras.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
