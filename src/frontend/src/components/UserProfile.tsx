import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Heart, Trophy, Star, Sparkles, TrendingUp, Database } from 'lucide-react';
import { useGetCallerUserProfile, useGetFavoriteMovies } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { Skeleton } from '@/components/ui/skeleton';
import { DataUsageSettings } from './DataUsageSettings';
import { BandwidthSettingsPanel } from './BandwidthSettingsPanel';

export function UserProfile() {
  const { data: profile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: favoriteMovies = [], isLoading: favoritesLoading } = useGetFavoriteMovies();
  const navigate = useNavigate();

  if (profileLoading || favoritesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <Skeleton className="h-32 w-full bg-zinc-800" />
            <Skeleton className="h-64 w-full bg-zinc-800" />
          </div>
        </div>
      </div>
    );
  }

  // Mock watch party history count
  const watchPartyHistoryCount = profile?.watchPartyHistory ? 
    (Array.isArray(profile.watchPartyHistory) ? profile.watchPartyHistory.length : 0) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black pt-24 pb-16 overflow-y-auto scrollable">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl">My Profile</CardTitle>
                  <CardDescription>Manage your TamriStream experience</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card 
              className="cursor-pointer hover:bg-accent/50 transition-colors border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-transparent tap-target"
              onClick={() => navigate({ to: '/audience-rewards' })}
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
                  Audience Rewards
                </CardTitle>
                <CardDescription>Earn tokens & unlock NFTs</CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:bg-accent/50 transition-colors border-blue-500/20 bg-gradient-to-br from-blue-950/30 to-transparent tap-target"
              onClick={() => navigate({ to: '/ai-personalization' })}
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-500 shrink-0" />
                  AI Personalization
                </CardTitle>
                <CardDescription>Discover hidden gems</CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:bg-accent/50 transition-colors border-green-500/20 bg-gradient-to-br from-green-950/30 to-transparent tap-target"
              onClick={() => navigate({ to: '/enhanced-creator' })}
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500 shrink-0" />
                  Creator Dashboard
                </CardTitle>
                <CardDescription>Track your earnings</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="data-bandwidth" className="text-xs md:text-sm">
                <Database className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Data & Bandwidth</span>
                <span className="sm:hidden">Data</span>
              </TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 scrollable">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500 shrink-0" />
                      Favorite Movies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{favoriteMovies.length}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                      Watch Parties
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{watchPartyHistoryCount}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 shrink-0" />
                      Achievement Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">5</div>
                  </CardContent>
                </Card>
              </div>

              {/* Achievement Badges */}
              <Card>
                <CardHeader>
                  <CardTitle>Achievement Badges</CardTitle>
                  <CardDescription>Your earned achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="text-sm py-2 px-4 tap-target">
                      <Trophy className="w-4 h-4 mr-2 shrink-0" />
                      First Watch
                    </Badge>
                    <Badge variant="secondary" className="text-sm py-2 px-4 tap-target">
                      <Heart className="w-4 h-4 mr-2 shrink-0" />
                      Movie Lover
                    </Badge>
                    <Badge variant="secondary" className="text-sm py-2 px-4 tap-target">
                      <Star className="w-4 h-4 mr-2 shrink-0" />
                      Top Reviewer
                    </Badge>
                    <Badge variant="secondary" className="text-sm py-2 px-4 tap-target">
                      <User className="w-4 h-4 mr-2 shrink-0" />
                      Community Member
                    </Badge>
                    <Badge variant="secondary" className="text-sm py-2 px-4 tap-target">
                      <Sparkles className="w-4 h-4 mr-2 shrink-0" />
                      Early Adopter
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-6 scrollable">
              <Card>
                <CardHeader>
                  <CardTitle>Favorite Movies</CardTitle>
                  <CardDescription>
                    {favoriteMovies.length} movie{favoriteMovies.length !== 1 ? 's' : ''} in your favorites
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {favoriteMovies.length > 0 ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto scrollable">
                      {favoriteMovies.map((movie, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <Heart className="w-5 h-5 text-red-500 fill-current shrink-0" />
                            <span className="font-medium truncate">{movie}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="tap-target shrink-0">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No favorite movies yet</p>
                      <p className="text-sm">Start adding movies to your favorites!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="data-bandwidth" className="space-y-6 scrollable">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DataUsageSettings />
                <BandwidthSettingsPanel />
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 scrollable">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 shrink-0" />
                    Account Settings
                  </CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium">Data Saver Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        {profile?.dataSaverMode ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                    <Badge variant={profile?.dataSaverMode ? 'default' : 'outline'} className="shrink-0">
                      {profile?.dataSaverMode ? 'On' : 'Off'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium">Watch Party History</h4>
                      <p className="text-sm text-muted-foreground">
                        {watchPartyHistoryCount} parties attended
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="tap-target shrink-0">
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
