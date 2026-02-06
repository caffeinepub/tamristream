import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Star } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Movie } from '../backend';

interface TrailersSectionProps {
  onMovieSelect?: (movie: Movie) => void;
}

export function TrailersSection({ onMovieSelect }: TrailersSectionProps) {
  const [selectedTrailer, setSelectedTrailer] = useState<Movie | null>(null);

  // Mock trailers data
  const trailers: Movie[] = [
    {
      title: 'Hearts of Gold',
      description: 'A powerful drama about family and redemption',
      coverImagePath: '/assets/generated/african-drama-poster.jpg',
      trailerPath: '/assets/generated/african-drama-poster.jpg',
      averageRating: BigInt(48),
      reviewCount: BigInt(124)
    },
    {
      title: 'Desert Warriors',
      description: 'Epic action adventure in the Sahara',
      coverImagePath: '/assets/generated/african-action-poster.jpg',
      trailerPath: '/assets/generated/african-action-poster.jpg',
      averageRating: BigInt(46),
      reviewCount: BigInt(89)
    },
    {
      title: 'Lagos Laughs',
      description: 'Comedy capturing the spirit of Lagos',
      coverImagePath: '/assets/generated/african-comedy-poster.jpg',
      trailerPath: '/assets/generated/african-comedy-poster.jpg',
      averageRating: BigInt(44),
      reviewCount: BigInt(156)
    },
    {
      title: 'Midnight Romance',
      description: 'A beautiful love story set in Accra',
      coverImagePath: '/assets/generated/african-romance-poster.jpg',
      trailerPath: '/assets/generated/african-romance-poster.jpg',
      averageRating: BigInt(42),
      reviewCount: BigInt(98)
    },
    {
      title: 'Shadow Hunter',
      description: 'Thrilling mystery in the heart of Africa',
      coverImagePath: '/assets/generated/african-thriller-poster.jpg',
      trailerPath: '/assets/generated/african-thriller-poster.jpg',
      averageRating: BigInt(45),
      reviewCount: BigInt(76)
    }
  ];

  const categories = [
    { name: 'Latest Trailers', movies: trailers.slice(0, 3) },
    { name: 'Popular This Week', movies: trailers.slice(2, 5) },
    { name: 'Coming Soon', movies: trailers.slice(1, 4) }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">Movie Trailers</h3>
        <Button variant="outline">View All Trailers</Button>
      </div>

      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <h4 className="text-xl font-semibold text-foreground">{category.name}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.movies.map((movie, index) => (
              <Card 
                key={`${categoryIndex}-${index}`}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border hover:border-primary/50"
                onClick={() => setSelectedTrailer(movie)}
              >
                <div className="relative">
                  <img
                    src={movie.coverImagePath}
                    alt={movie.title}
                    className="w-full aspect-video object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-t-lg flex items-center justify-center">
                    <Button
                      size="lg"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white text-black rounded-full"
                    >
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                    Trailer
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                      {movie.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {movie.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{Number(movie.averageRating) / 10}</span>
                        <span className="text-sm text-muted-foreground">
                          ({Number(movie.reviewCount)})
                        </span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMovieSelect?.(movie);
                        }}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Trailer Modal */}
      <Dialog open={!!selectedTrailer} onOpenChange={(open) => !open && setSelectedTrailer(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedTrailer?.title} - Trailer</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Trailer Preview</p>
              <p className="text-sm opacity-75">Video player would be integrated here</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
