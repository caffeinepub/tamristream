import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Play, Star, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Movie } from '../backend';
import { OptimizedImage } from './OptimizedImage';

interface FeaturedMovieSliderProps {
  onMovieSelect?: (movie: Movie) => void;
  onWatchTrailer?: (movie: Movie) => void;
}

export function FeaturedMovieSlider({ onMovieSelect, onWatchTrailer }: FeaturedMovieSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredMovies: Movie[] = [
    {
      title: 'Hearts of Gold',
      description: 'A powerful drama about family, redemption, and the unbreakable bonds that connect us across generations in modern Lagos.',
      coverImagePath: '/assets/generated/african-drama-poster.jpg',
      trailerPath: '/assets/generated/african-drama-poster.jpg',
      averageRating: BigInt(48),
      reviewCount: BigInt(124)
    },
    {
      title: 'Desert Warriors',
      description: 'An epic action adventure following brave warriors defending their homeland against overwhelming odds in the Sahara.',
      coverImagePath: '/assets/generated/african-action-poster.jpg',
      trailerPath: '/assets/generated/african-action-poster.jpg',
      averageRating: BigInt(46),
      reviewCount: BigInt(89)
    },
    {
      title: 'Lagos Laughs',
      description: 'A hilarious comedy that captures the vibrant spirit of Lagos through the eyes of an aspiring comedian.',
      coverImagePath: '/assets/generated/african-comedy-poster.jpg',
      trailerPath: '/assets/generated/african-comedy-poster.jpg',
      averageRating: BigInt(44),
      reviewCount: BigInt(156)
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying || featuredMovies.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredMovies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredMovies.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? featuredMovies.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === featuredMovies.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (featuredMovies.length === 0) {
    return null;
  }

  const currentMovie = featuredMovies[currentIndex];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">Featured Movies</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            disabled={featuredMovies.length <= 1}
            className="h-8 w-8 sm:h-10 sm:w-10"
            aria-label="Previous movie"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={featuredMovies.length <= 1}
            className="h-8 w-8 sm:h-10 sm:w-10"
            aria-label="Next movie"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <div className="relative">
          <OptimizedImage
            src={currentMovie.coverImagePath}
            alt={`${currentMovie.title} featured movie poster`}
            loading="eager"
            fetchPriority="high"
            className="h-64 md:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
            <div className="max-w-2xl space-y-2 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary text-primary-foreground text-xs sm:text-sm">Featured</Badge>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs sm:text-sm">{Number(currentMovie.averageRating) / 10}</span>
                </div>
                <span className="text-xs sm:text-sm opacity-75">
                  {Number(currentMovie.reviewCount)} reviews
                </span>
              </div>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold line-clamp-2">{currentMovie.title}</h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-200 line-clamp-2 hidden sm:block">
                {currentMovie.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <Button 
                  className="bg-white text-black hover:bg-gray-100 text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4"
                  onClick={() => onWatchTrailer?.(currentMovie)}
                >
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Watch Trailer
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4"
                  onClick={() => onMovieSelect?.(currentMovie)}
                >
                  View Details
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
                  aria-label="Add to favorites"
                >
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {featuredMovies.length > 1 && (
        <div className="flex justify-center space-x-2" role="tablist" aria-label="Featured movies">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              role="tab"
              aria-selected={index === currentIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}
