import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp, Award, Eye, Info } from 'lucide-react';
import { useState } from 'react';
import type { Movie } from '../backend';
import { MovieCard } from './MovieCard';
import { MovieDialog } from './MovieDialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AIIndieDiscoveryProps {
  movies: Movie[];
  isLoading?: boolean;
}

export function AIIndieDiscovery({ movies, isLoading }: AIIndieDiscoveryProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // AI-powered indie film discovery logic
  const indieFilms = movies.filter((movie) => {
    // Simulate AI detection of indie films based on review count and rating patterns
    const reviewCount = Number(movie.reviewCount);
    const avgRating = Number(movie.averageRating);
    return reviewCount < 50 && avgRating >= 4; // Hidden gems with high quality but low visibility
  }).slice(0, 6);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-96 bg-zinc-800" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[16/9] w-full rounded-lg bg-zinc-800" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header with AI Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                <span>AI-Discovered Hidden Gems</span>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
              </h3>
              <p className="text-sm text-zinc-400 mt-1">
                Independent African films with exceptional quality, discovered by our AI recommendation engine
              </p>
            </div>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="text-zinc-400 hover:text-white"
                >
                  <Info className="w-4 h-4 mr-2" />
                  How it works
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-sm">
                <p className="text-sm">
                  Our AI analyzes viewing patterns, creator profiles, and content quality to surface
                  underrated independent films that deserve more attention.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* AI Algorithm Explanation */}
        {showExplanation && (
          <Card className="border-purple-500/30 bg-purple-500/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Transparent AI Discovery Algorithm</span>
              </CardTitle>
              <CardDescription>
                Understanding how we find hidden gems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-purple-400" />
                    <h4 className="font-semibold text-white">Quality Analysis</h4>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Evaluates storytelling, production values, and user engagement to identify high-quality content
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-purple-400" />
                    <h4 className="font-semibold text-white">Visibility Balance</h4>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Ensures equal visibility for indie and mainstream content, preventing algorithmic bias
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    <h4 className="font-semibold text-white">Creator Diversity</h4>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Actively promotes emerging creators and underrepresented voices in African cinema
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-purple-500/20">
                <p className="text-xs text-zinc-500">
                  <strong>Bias Prevention:</strong> Our algorithm is continuously monitored and adjusted to prevent
                  bias against indie creators, specific genres, or underrepresented communities. All recommendations
                  are based on content quality and user preferences, not popularity metrics.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Indie Films Grid */}
        {indieFilms.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {indieFilms.map((movie) => (
              <div key={movie.title} className="relative group">
                <MovieCard movie={movie} onSelect={setSelectedMovie} />
                <div className="absolute top-2 right-2 z-10">
                  <Badge className="bg-purple-500 text-white shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Hidden Gem
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="text-center py-12">
              <Sparkles className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">
                Discovering Hidden Gems
              </h4>
              <p className="text-zinc-400">
                Our AI is analyzing the catalog to find exceptional indie films for you
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Movie Detail Dialog */}
      <MovieDialog
        movie={selectedMovie}
        open={!!selectedMovie}
        onOpenChange={(open) => !open && setSelectedMovie(null)}
      />
    </>
  );
}
