import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Play, Share2, Heart, Users, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Movie } from '../backend';
import { useNavigate } from '@tanstack/react-router';
import type { QualityLevel } from '../hooks/useBandwidthMonitor';

interface MovieDialogProps {
  movie: Movie | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MovieDialog({ movie, open, onOpenChange }: MovieDialogProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rating, setRating] = useState(0);
  const [currentQuality, setCurrentQuality] = useState<QualityLevel>('720p');
  const [autoMode, setAutoMode] = useState(true);
  const [playbackTime, setPlaybackTime] = useState(0);
  const navigate = useNavigate();

  if (!movie) return null;

  const handleWatchParty = () => {
    onOpenChange(false);
    navigate({ to: '/watch-party/$partyId', params: { partyId: 'new' } });
  };

  const handleTransparency = () => {
    onOpenChange(false);
    navigate({ to: '/movie-transparency/$movieId', params: { movieId: movie.title } });
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setPlaybackTime(e.currentTarget.currentTime);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto scrollable">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{movie.title}</DialogTitle>
          <DialogDescription className="text-base">{movie.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video Player */}
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {isPlaying ? (
              <div className="relative w-full h-full">
                <video
                  src={movie.trailerPath}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                  onEnded={() => setIsPlaying(false)}
                  onTimeUpdate={handleTimeUpdate}
                />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={movie.coverImagePath}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button
                    size="lg"
                    onClick={() => setIsPlaying(true)}
                    className="tap-target rounded-full w-20 h-20"
                  >
                    <Play className="w-8 h-8" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Movie Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Rating</h3>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="tap-target p-1 transition-colors"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={`w-6 h-6 md:w-8 md:h-8 ${
                            star <= (rating || Number(movie.averageRating))
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({movie.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="tap-target">
                    <Heart className="w-4 h-4 mr-2" />
                    Add to Favorites
                  </Button>
                  <Button variant="outline" className="tap-target">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Watch Together</h3>
                <Button onClick={handleWatchParty} className="w-full tap-target">
                  <Users className="w-4 h-4 mr-2" />
                  Start Watch Party
                </Button>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Blockchain Transparency</h3>
                <Button
                  variant="outline"
                  onClick={handleTransparency}
                  className="w-full tap-target"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View On-Chain Data
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  See verified earnings, views, and royalty distribution
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Reviews</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto scrollable">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= 4 ? 'fill-amber-500 text-amber-500' : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                    <Badge variant="secondary">Verified Viewer</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Great movie! The storytelling and cinematography were excellent.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
