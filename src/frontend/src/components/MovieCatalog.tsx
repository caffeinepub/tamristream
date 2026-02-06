import { useSearchMovies, useGetTopPicks } from '../hooks/useQueries';
import { MovieCard } from './MovieCard';
import { MovieDialog } from './MovieDialog';
import { TopPicksSection } from './TopPicksSection';
import { FeaturedMovieSlider } from './FeaturedMovieSlider';
import { HeroBanner } from './HeroBanner';
import { GenresSection } from './GenresSection';
import { HowItWorksSection } from './HowItWorksSection';
import { AIIndieDiscovery } from './AIIndieDiscovery';
import { TransparentRanking } from './TransparentRanking';
import { Skeleton } from '@/components/ui/skeleton';
import { Film, Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useDebounce } from 'react-use';
import { useNavigate } from '@tanstack/react-router';
import type { Movie } from '../backend';

interface MovieCatalogProps {
  onWatchPartyCreate?: (partyId: string) => void;
}

export function MovieCatalog({ onWatchPartyCreate }: MovieCatalogProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const navigate = useNavigate();

  useDebounce(
    () => {
      setDebouncedSearchQuery(searchQuery);
    },
    300,
    [searchQuery]
  );

  const { data: movies, isLoading } = useSearchMovies(debouncedSearchQuery);
  const { data: topPicks, isLoading: topPicksLoading } = useGetTopPicks();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-16">
        <div className="w-full h-[600px] md:h-[700px] bg-gradient-to-b from-zinc-900 to-black animate-pulse" />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-12 w-64 bg-zinc-800" />
              <Skeleton className="h-6 w-96 bg-zinc-800" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[16/9] w-full rounded-lg bg-zinc-800" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Banner - Only show when not searching */}
      {!searchQuery && <HeroBanner />}

      {/* Featured Movies Carousel - Only show when not searching */}
      {!searchQuery && (
        <div className="container mx-auto px-4 py-16">
          <FeaturedMovieSlider 
            onMovieSelect={setSelectedMovie}
            onWatchTrailer={setSelectedMovie}
          />
        </div>
      )}

      {/* AI Indie Discovery Section - Only show when not searching */}
      {!searchQuery && (
        <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-black via-purple-950/10 to-black">
          <AIIndieDiscovery movies={movies || []} isLoading={isLoading} />
          <div className="mt-8 text-center">
            <Button
              onClick={() => navigate({ to: '/ai-personalization' })}
              variant="outline"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Explore More AI Features
            </Button>
          </div>
        </div>
      )}

      {/* Transparent Ranking Section - Only show when not searching */}
      {!searchQuery && (
        <div className="container mx-auto px-4 py-16">
          <TransparentRanking showDetailed={false} />
        </div>
      )}

      {/* Genres Section - Only show when not searching */}
      {!searchQuery && <GenresSection onMovieSelect={setSelectedMovie} />}

      {/* How It Works Section - Only show when not searching */}
      {!searchQuery && <HowItWorksSection />}

      {/* Search and Movies Section */}
      <div className="container mx-auto px-4 py-16" id="movies-section">
        <div className="space-y-12">
          {/* Search Header */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Film className="w-8 h-8 text-amber-500" />
              <h2 className="text-3xl font-bold text-white">Browse Movies</h2>
            </div>
            
            {/* Search */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <Input
                placeholder="Search movies by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Top Picks Section - Only show when not searching */}
          {!searchQuery && (
            <TopPicksSection 
              topPicks={topPicks || []} 
              isLoading={topPicksLoading}
              onMovieSelect={setSelectedMovie}
            />
          )}

          {/* Movies Grid */}
          {!movies || movies.length === 0 ? (
            <div className="text-center py-16">
              <Film className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchQuery ? 'No movies found' : 'No movies available'}
              </h3>
              <p className="text-zinc-400">
                {searchQuery 
                  ? 'Try adjusting your search terms to find what you\'re looking for.'
                  : 'Check back soon for new additions to our catalog.'
                }
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Movies'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.title}
                    movie={movie}
                    onSelect={setSelectedMovie}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Movie Detail Dialog */}
      <MovieDialog
        movie={selectedMovie}
        open={!!selectedMovie}
        onOpenChange={(open) => !open && setSelectedMovie(null)}
        onWatchPartyCreate={onWatchPartyCreate}
      />
    </div>
  );
}

