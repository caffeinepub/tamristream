import { useGetFavoriteMovies, useGetAllMovies, useGetDataSaverMode, useSetDataSaverMode } from '../hooks/useQueries';
import { MovieCard } from './MovieCard';
import { MovieDialog } from './MovieDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Heart, User, Wifi, Settings, Trophy, Star, Users, Zap, Award, Crown, Medal, Vote, Coins, Gift, Sparkles, TrendingUp, Languages, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import type { Movie } from '../backend';

// Enhanced user achievements with interactive participation badges
const userAchievements = [
  { id: 'top-reviewer', name: 'Top Reviewer', description: 'Written 25+ high-quality reviews', icon: Star, earned: true, progress: 100 },
  { id: 'movie-buff', name: 'Movie Buff', description: 'Rated 50+ movies', icon: Heart, earned: true, progress: 100 },
  { id: 'watch-party-host', name: 'Watch Party Host', description: 'Hosted 10+ watch parties', icon: Users, earned: false, progress: 60 },
  { id: 'trivia-champion', name: 'Trivia Champion', description: 'Score 1000+ points in trivia', icon: Trophy, earned: false, progress: 75 },
  { id: 'community-leader', name: 'Community Leader', description: 'Active across all features', icon: Crown, earned: false, progress: 40 },
  { id: 'poll-participant', name: 'Poll Participant', description: 'Participated in 20+ live polls', icon: Vote, earned: true, progress: 100 },
  { id: 'premiere-attendee', name: 'Premiere Attendee', description: 'Attended 5+ movie premieres', icon: Medal, earned: false, progress: 80 },
  { id: 'reaction-master', name: 'Reaction Master', description: 'Given 100+ real-time reactions', icon: Zap, earned: true, progress: 100 },
];

const userStats = {
  reviewsWritten: 32,
  moviesRated: 67,
  watchPartiesHosted: 6,
  triviaScore: 750,
  pollsParticipated: 23,
  reactionsGiven: 156,
  premieresAttended: 4,
  favoriteGenre: 'Drama',
  joinDate: '2024-08-15'
};

export function UserProfile() {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { data: favoriteMovies = [], isLoading: favoritesLoading } = useGetFavoriteMovies();
  const { data: allMovies = [], isLoading: moviesLoading } = useGetAllMovies();
  const { data: dataSaverMode = false, isLoading: dataSaverLoading } = useGetDataSaverMode();
  const setDataSaverMode = useSetDataSaverMode();

  const favoriteMovieObjects = allMovies.filter(movie => 
    favoriteMovies.includes(movie.title)
  );

  const handleDataSaverToggle = async (enabled: boolean) => {
    try {
      await setDataSaverMode.mutateAsync(enabled);
      toast.success(`Data Saver Mode ${enabled ? 'enabled' : 'disabled'}`);
    } catch (error) {
      toast.error('Failed to update Data Saver Mode');
    }
  };

  const earnedBadges = userAchievements.filter(achievement => achievement.earned);
  const inProgressBadges = userAchievements.filter(achievement => !achievement.earned);

  if (favoritesLoading || moviesLoading || dataSaverLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-6 w-96" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">My Profile</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Track your achievements, manage preferences, and view your favorite African movies with enhanced interactive features.
          </p>
        </div>

        {/* Quick Access to Key Features */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card 
            className="border-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => navigate({ to: '/audience-rewards' })}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-6 h-6 text-amber-500" />
                    <h4 className="text-lg font-semibold text-foreground">Audience Rewards</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Earn $TAMRI tokens, complete missions, and collect NFTs
                  </p>
                  <Button size="sm" className="mt-4 bg-amber-500 hover:bg-amber-600 text-black">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    View Rewards
                  </Button>
                </div>
                <Gift className="w-12 h-12 text-amber-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => navigate({ to: '/ai-personalization' })}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-6 h-6 text-purple-500" />
                    <h4 className="text-lg font-semibold text-foreground">AI Personalization</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Discover indie films, multi-language support, transparent ranking
                  </p>
                  <Button size="sm" className="mt-4 bg-purple-500 hover:bg-purple-600 text-white">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Explore AI
                  </Button>
                </div>
                <Languages className="w-12 h-12 text-purple-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => navigate({ to: '/enhanced-creator' })}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                    <h4 className="text-lg font-semibold text-foreground">Creator Dashboard</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Real-time analytics, on-chain earnings, NFT tracking
                  </p>
                  <Button size="sm" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
                <Award className="w-12 h-12 text-blue-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{userStats.reviewsWritten}</div>
                  <div className="text-sm text-muted-foreground">Reviews</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{userStats.moviesRated}</div>
                  <div className="text-sm text-muted-foreground">Rated</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{userStats.watchPartiesHosted}</div>
                  <div className="text-sm text-muted-foreground">Parties</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{userStats.triviaScore}</div>
                  <div className="text-sm text-muted-foreground">Trivia</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Vote className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{userStats.pollsParticipated}</div>
                  <div className="text-sm text-muted-foreground">Polls</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <Zap className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{userStats.reactionsGiven}</div>
                  <div className="text-sm text-muted-foreground">Reactions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <Medal className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{userStats.premieresAttended}</div>
                  <div className="text-sm text-muted-foreground">Premieres</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Achievement Badges */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Interactive Achievement Badges</h3>
          </div>

          {/* Earned Badges */}
          {earnedBadges.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span>Earned Badges ({earnedBadges.length})</span>
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {earnedBadges.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <Card key={achievement.id} className="border-0 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/20 rounded-lg">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-foreground">{achievement.name}</div>
                            <div className="text-sm text-muted-foreground">{achievement.description}</div>
                          </div>
                          <Badge className="bg-green-500 text-white">
                            ✓ Earned
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* In Progress Badges */}
          {inProgressBadges.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                <Zap className="w-5 h-5 text-accent" />
                <span>In Progress ({inProgressBadges.length})</span>
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inProgressBadges.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <Card key={achievement.id} className="border-0 bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-muted rounded-lg">
                              <IconComponent className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-foreground">{achievement.name}</div>
                              <div className="text-sm text-muted-foreground">{achievement.description}</div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="text-foreground">{achievement.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${achievement.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Settings Section */}
        <Card className="border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Settings className="w-6 h-6 text-primary" />
              <CardTitle>Preferences</CardTitle>
            </div>
            <CardDescription>
              Customize your viewing experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Wifi className="w-5 h-5 text-accent" />
                  <Label htmlFor="data-saver" className="text-base font-medium">
                    Data Saver Mode
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically optimize video quality to reduce data usage by up to 75%
                </p>
              </div>
              <Switch
                id="data-saver"
                checked={dataSaverMode}
                onCheckedChange={handleDataSaverToggle}
                disabled={setDataSaverMode.isPending}
              />
            </div>
            
            {dataSaverMode && (
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Wifi className="w-4 h-4 text-accent" />
                  <p className="text-sm font-medium text-accent">Data Saver Active</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Videos will stream at optimized quality to minimize data consumption. You can disable this anytime.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Favorites Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">My Favorites</h3>
          </div>

          {favoriteMovieObjects.length === 0 ? (
            <Card className="border-0 bg-card/30">
              <CardContent className="text-center py-16">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  No favorites yet
                </h4>
                <p className="text-muted-foreground">
                  Start exploring movies and add them to your favorites to see them here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteMovieObjects.map((movie) => (
                <MovieCard
                  key={movie.title}
                  movie={movie}
                  onSelect={setSelectedMovie}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Movie Detail Dialog */}
      <MovieDialog
        movie={selectedMovie}
        open={!!selectedMovie}
        onOpenChange={(open) => !open && setSelectedMovie(null)}
      />
    </div>
  );
}

