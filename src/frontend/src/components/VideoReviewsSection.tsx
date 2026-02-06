import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Video, ThumbsUp, MessageCircle, Share2, Play, Star } from 'lucide-react';
import { toast } from 'sonner';

interface VideoReview {
  id: string;
  user: string;
  userAvatar: string;
  movieTitle: string;
  videoThumbnail: string;
  rating: number;
  reviewText: string;
  likes: number;
  comments: number;
  timestamp: Date;
  isLiked: boolean;
}

export function VideoReviewsSection() {
  const videoReviews: VideoReview[] = [
    {
      id: '1',
      user: 'Amara Okafor',
      userAvatar: '/assets/generated/african-filmmaker.jpg',
      movieTitle: 'Hearts of Gold',
      videoThumbnail: '/assets/generated/african-drama-poster.jpg',
      rating: 5,
      reviewText: 'An absolutely stunning film that captures the essence of African storytelling!',
      likes: 234,
      comments: 45,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isLiked: false
    },
    {
      id: '2',
      user: 'Kemi Adetiba',
      userAvatar: '/assets/generated/african-musician-portrait.jpg',
      movieTitle: 'Lagos Laughs',
      videoThumbnail: '/assets/generated/african-comedy-poster.jpg',
      rating: 4,
      reviewText: 'Hilarious and heartwarming! A must-watch for comedy lovers.',
      likes: 189,
      comments: 32,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      isLiked: true
    }
  ];

  const handleLike = (reviewId: string) => {
    toast.success('Review liked!');
  };

  const handleShare = (reviewId: string) => {
    toast.success('Review shared!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Video className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Video Reviews</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch authentic video reviews from our community members
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {videoReviews.map((review) => (
            <Card key={review.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative group cursor-pointer">
                <img
                  src={review.videoThumbnail}
                  alt={review.movieTitle}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <Button size="lg" className="rounded-full">
                    <Play className="w-6 h-6" />
                  </Button>
                </div>
                <Badge className="absolute top-2 left-2 bg-black/70 text-white">
                  Video Review
                </Badge>
              </div>
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={review.userAvatar} />
                      <AvatarFallback>{review.user[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{review.user}</h4>
                      <p className="text-sm text-muted-foreground">
                        {review.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-lg">{review.movieTitle}</CardTitle>
                <CardDescription>{review.reviewText}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(review.id)}
                      className={review.isLiked ? 'text-red-500' : ''}
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      {review.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {review.comments}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(review.id)}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
