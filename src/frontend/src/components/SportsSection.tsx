import { useSearchSportsContent, useGetAllLiveMatches } from '../hooks/useQueries';
import { SportsContentCard } from './SportsContentCard';
import { LiveMatchPreview } from './LiveMatchPreview';
import { FeaturedSportsSlider } from './FeaturedSportsSlider';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Search, Calendar, Trophy, Users, Play } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useDebounce } from 'react-use';

export function SportsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState<string>('all');

  // Debounce search query to avoid too many API calls
  useDebounce(
    () => {
      setDebouncedSearchQuery(searchQuery);
    },
    300,
    [searchQuery]
  );

  const { data: sportsContent, isLoading, error } = useSearchSportsContent(debouncedSearchQuery);
  const { data: liveMatches, isLoading: liveMatchesLoading } = useGetAllLiveMatches();

  const sportCategories = [
    { id: 'all', label: 'All Sports', icon: Zap },
    { id: 'football', label: 'Football', icon: Trophy },
    { id: 'basketball', label: 'Basketball', icon: Trophy },
    { id: 'athletics', label: 'Athletics', icon: Trophy },
    { id: 'rugby', label: 'Rugby', icon: Trophy },
    { id: 'cricket', label: 'Cricket', icon: Trophy },
  ];

  const filteredSportsContent = sportsContent?.filter(content => 
    selectedSport === 'all' || content.sportType.toLowerCase() === selectedSport
  ) || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-6 w-96" />
            <Skeleton className="h-10 w-full max-w-md" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video w-full rounded-lg" />
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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error Loading Sports Content</CardTitle>
            <CardDescription>
              There was an error loading the sports content. Please try again later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">African Sports</h2>
            <Badge className="bg-red-600 text-white animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              Live
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Experience the excitement of African sports with live match previews, highlight reels, and exclusive content from across the continent.
          </p>
          
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search sports content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Live Matches Preview - Only show when not searching */}
        {!searchQuery && (
          <LiveMatchPreview matches={liveMatches || []} isLoading={liveMatchesLoading} />
        )}

        {/* Featured Sports Slider - Only show when not searching */}
        {!searchQuery && filteredSportsContent.length > 0 && (
          <FeaturedSportsSlider sportsContent={filteredSportsContent} />
        )}

        {/* Quick Access Cards - Only show when not searching */}
        {!searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50 cursor-pointer bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Live Match Previews</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get real-time updates and previews of upcoming African sports events
                </p>
                <Badge className="bg-green-600 text-white">
                  Live Updates
                </Badge>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50 cursor-pointer bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Highlight Reels</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Watch the best moments from African sports competitions
                </p>
                <Badge className="bg-orange-600 text-white">
                  Best Moments
                </Badge>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50 cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Sports Community</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with fellow sports fans and share your passion
                </p>
                <Badge className="bg-purple-600 text-white">
                  Join Community
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Sports Content Tabs */}
        <Tabs value={selectedSport} onValueChange={setSelectedSport} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            {sportCategories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={selectedSport} className="mt-8">
            {/* Sports Content Grid */}
            {!filteredSportsContent || filteredSportsContent.length === 0 ? (
              <div className="text-center py-16">
                <Zap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {searchQuery ? 'No sports content found' : 'No sports content available'}
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? 'Try adjusting your search terms to find what you\'re looking for.'
                    : 'Check back soon for new sports content and highlights.'
                  }
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 
                   selectedSport === 'all' ? 'All Sports Content' : 
                   `${sportCategories.find(c => c.id === selectedSport)?.label} Content`}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredSportsContent.map((content) => (
                    <SportsContentCard
                      key={content.title}
                      content={content}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Sports Events Calendar - Only show when not searching */}
        {!searchQuery && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Upcoming Sports Events</span>
                <Badge className="bg-blue-600 text-white">Schedule</Badge>
              </CardTitle>
              <CardDescription>
                Stay updated with the latest African sports events and competitions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <img
                    src="/assets/generated/sports-events-calendar.png"
                    alt="Sports Events Calendar"
                    className="w-full aspect-video object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/generated/african-football-match.jpg';
                    }}
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Featured Events:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• CAF Champions League Final</li>
                      <li>• African Athletics Championships</li>
                      <li>• Basketball Africa League</li>
                      <li>• Rugby Africa Cup</li>
                      <li>• Cricket World Cup Qualifiers</li>
                    </ul>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Full Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
