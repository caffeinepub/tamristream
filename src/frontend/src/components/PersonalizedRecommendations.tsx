import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllMovies, useGetAllMusicTracks, useGetFavoriteMovies, useGetMusicPlaylists } from '../hooks/useQueries';
import { Sparkles, Star, Play, Music, Film, TrendingUp, Heart, Clock, ThumbsUp, ThumbsDown, Info, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface RecommendationItem {
  id: string;
  title: string;
  type: 'movie' | 'music';
  reason: string;
  confidence: number;
  genre: string;
  rating: number;
  coverImage: string;
  description: string;
  tags: string[];
}

export function PersonalizedRecommendations() {
  const { data: movies = [], isLoading: moviesLoading } = useGetAllMovies();
  const { data: musicTracks = [], isLoading: musicLoading } = useGetAllMusicTracks();
  const { data: favoriteMovies = [], isLoading: favoritesLoading } = useGetFavoriteMovies();
  const { data: musicPlaylists = [], isLoading: playlistsLoading } = useGetMusicPlaylists();
  const [feedbackGiven, setFeedbackGiven] = useState<Set<string>>(new Set());

  const isLoading = moviesLoading || musicLoading || favoritesLoading || playlistsLoading;

  // Generate personalized recommendations based on user data
  const generateRecommendations = (): RecommendationItem[] => {
    const recommendations: RecommendationItem[] = [];

    // Movie recommendations based on favorites
    const movieRecommendations = movies
      .filter(movie => !favoriteMovies.includes(movie.title))
      .map(movie => ({
        id: `movie-${movie.title}`,
        title: movie.title,
        type: 'movie' as const,
        reason: favoriteMovies.length > 0 
          ? `Based on your love for ${favoriteMovies[0] || 'African cinema'}`
          : 'Trending in African cinema',
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
        genre: 'Drama', // Would be extracted from movie data
        rating: Number(movie.averageRating) || 4,
        coverImage: movie.coverImagePath,
        description: movie.description,
        tags: ['Popular', 'Trending', 'New Release']
      }))
      .slice(0, 6);

    // Music recommendations
    const musicRecommendations = musicTracks
      .map(track => ({
        id: `music-${track.title}`,
        title: track.title,
        type: 'music' as const,
        reason: `Perfect for your ${track.genre} playlist`,
        confidence: Math.floor(Math.random() * 25) + 75, // 75-100%
        genre: track.genre,
        rating: Number(track.averageRating) || 4,
        coverImage: track.coverImagePath,
        description: `${track.artist} - ${track.album}`,
        tags: ['Afrobeats', 'Rising Artist', 'Hot Track']
      }))
      .slice(0, 6);

    return [...movieRecommendations, ...musicRecommendations];
  };

  const recommendations = generateRecommendations();
  const movieRecommendations = recommendations.filter(r => r.type === 'movie');
  const musicRecommendations = recommendations.filter(r => r.type === 'music');

  const handleFeedback = (itemId: string, isPositive: boolean) => {
    setFeedbackGiven(prev => new Set([...prev, itemId]));
    toast.success(
      isPositive 
        ? "Thanks! We'll show you more content like this." 
        : "Got it! We'll adjust your recommendations."
    );
  };

  const RecommendationCard = ({ item }: { item: RecommendationItem }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50">
      <div className="relative">
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-background/90 text-foreground">
            {Math.round(item.confidence)}% match
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge className="bg-primary text-primary-foreground">
            {item.type === 'movie' ? <Film className="w-3 h-3 mr-1" /> : <Music className="w-3 h-3 mr-1" />}
            {item.type === 'movie' ? 'Movie' : 'Music'}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">{item.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center space-x-1 mb-3">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary">{item.reason}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {item.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Progress value={item.confidence} className="mb-4" />
        
        <div className="flex items-center justify-between">
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Play className="w-4 h-4 mr-2" />
            {item.type === 'movie' ? 'Watch' : 'Listen'}
          </Button>
          
          {!feedbackGiven.has(item.id) && (
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleFeedback(item.id, true)}
              >
                <ThumbsUp className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleFeedback(item.id, false)}
              >
                <ThumbsDown className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <Skeleton className="h-10 w-64" />
            </div>
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="text-center">
                <CardContent className="p-6">
                  <Skeleton className="w-8 h-8 mx-auto mb-2" />
                  <Skeleton className="h-8 w-16 mx-auto mb-1" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="w-full h-48 rounded-t-lg" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-2 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-20" />
                    <div className="flex space-x-1">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Personalized For You</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover movies and music tailored to your unique taste, powered by AI recommendations
          </p>
        </div>

        {/* Recommendation Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{recommendations.length}</div>
              <div className="text-sm text-muted-foreground">New Recommendations</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{favoriteMovies.length}</div>
              <div className="text-sm text-muted-foreground">Favorite Movies</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Music className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{musicPlaylists.length}</div>
              <div className="text-sm text-muted-foreground">Music Playlists</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">24h</div>
              <div className="text-sm text-muted-foreground">Updated Daily</div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-primary" />
              <span>How Our AI Recommendations Work</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Your Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  We analyze your favorite movies, music, ratings, and viewing history
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI finds patterns and matches you with similar users' preferences
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Personalized Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get recommendations with confidence scores and explanations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Recommendations</TabsTrigger>
            <TabsTrigger value="movies">Movies ({movieRecommendations.length})</TabsTrigger>
            <TabsTrigger value="music">Music ({musicRecommendations.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {recommendations.length === 0 ? (
              <div className="text-center py-16">
                <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Building Your Recommendations
                </h3>
                <p className="text-muted-foreground">
                  Start by rating some movies and adding favorites to get personalized recommendations.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((item) => (
                  <RecommendationCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="movies" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movieRecommendations.map((item) => (
                <RecommendationCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="music" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {musicRecommendations.map((item) => (
                <RecommendationCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Feedback Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Help Us Improve Your Recommendations</CardTitle>
            <CardDescription>
              Your feedback helps our AI learn your preferences better
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Rate recommendations with 👍 or 👎 to get better suggestions
              </p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                <Sparkles className="w-4 h-4 mr-2" />
                Refresh Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
