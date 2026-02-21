import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';
import { useGetAllMovies } from '../hooks/useQueries';
import { MovieCard } from './MovieCard';
import { MovieDialog } from './MovieDialog';
import { Movie } from '../backend';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from '@tanstack/react-router';

export function MovieCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: movies = [], isLoading } = useGetAllMovies();
  const navigate = useNavigate();

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-8">
            <Skeleton className="h-12 w-64 bg-zinc-800" />
            <Skeleton className="h-12 w-full bg-zinc-800" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="h-96 bg-zinc-800" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Movie Catalog</h1>
            <p className="text-lg text-muted-foreground">
              Discover amazing African cinema from talented creators
            </p>
          </div>

          {/* AI Indie Discovery Section */}
          <div className="bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-blue-500/20 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                  AI-Powered Indie Discovery
                </h2>
                <p className="text-muted-foreground">
                  Our transparent algorithm surfaces hidden gems and underrated independent films
                  based on quality, not just popularity.
                </p>
              </div>
              <Button
                onClick={() => navigate({ to: '/ai-personalization' })}
                className="tap-target shrink-0"
              >
                Explore AI Features
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="search"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          {/* Movie Grid */}
          <div className="scrollable">
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map((movie, index) => (
                  <MovieCard
                    key={index}
                    movie={movie}
                    onClick={() => handleMovieClick(movie)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No movies found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search terms
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <MovieDialog movie={selectedMovie} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
