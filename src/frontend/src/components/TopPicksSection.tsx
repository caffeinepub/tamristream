import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Award, User } from 'lucide-react';
import { useGetMovie } from '../hooks/useQueries';
import type { TopPick, Movie } from '../backend';

interface TopPicksSectionProps {
  topPicks: TopPick[];
  isLoading: boolean;
  onMovieSelect: (movie: Movie) => void;
}

function TopPickCard({ topPick, onMovieSelect }: { topPick: TopPick; onMovieSelect: (movie: Movie) => void }) {
  const { data: movie, isLoading } = useGetMovie(topPick.movieTitle);

  if (isLoading || !movie) {
    return (
      <Card className="overflow-hidden">
        <div className="flex">
          <Skeleton className="w-24 h-36 shrink-0" />
          <div className="flex-1 p-4 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onMovieSelect(movie)}>
      <div className="flex">
        <div className="w-24 h-36 shrink-0 relative overflow-hidden">
          <img
            src={`/assets/generated/${movie.coverImagePath}`}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              <Award className="w-3 h-3 mr-1" />
              Top Pick
            </Badge>
          </div>
        </div>
        <CardContent className="flex-1 p-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {movie.title}
            </h4>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <User className="w-3 h-3" />
              <span>Curated by {topPick.curatorName}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {topPick.recommendation}
            </p>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= Number(movie.averageRating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {Number(movie.reviewCount)} reviews
              </span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export function TopPicksSection({ topPicks, isLoading, onMovieSelect }: TopPicksSectionProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Skeleton className="w-8 h-8" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="flex">
                <Skeleton className="w-24 h-36 shrink-0" />
                <div className="flex-1 p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!topPicks || topPicks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
          <Award className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Top Picks</h3>
          <p className="text-sm text-muted-foreground">Curated by local film critics and influencers</p>
        </div>
      </div>
      
      <div className="relative">
        <img
          src="/assets/generated/top-picks-banner.jpg"
          alt="Top Picks Banner"
          className="w-full h-32 object-cover rounded-lg opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topPicks.slice(0, 4).map((topPick) => (
          <TopPickCard
            key={topPick.movieTitle}
            topPick={topPick}
            onMovieSelect={onMovieSelect}
          />
        ))}
      </div>
    </div>
  );
}
