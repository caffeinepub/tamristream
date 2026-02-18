import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Play, Star, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { SportsContent } from '../hooks/useQueries';

interface FeaturedSportsSliderProps {
  sportsContent: SportsContent[];
}

export function FeaturedSportsSlider({ sportsContent }: FeaturedSportsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || sportsContent.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === sportsContent.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, sportsContent.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? sportsContent.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === sportsContent.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (!sportsContent || sportsContent.length === 0) {
    return null;
  }

  const currentContent = sportsContent[currentIndex];

  const getAccessTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'free':
        return 'bg-green-600';
      case 'subscription':
        return 'bg-blue-600';
      case 'pay-per-view':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">Featured Sports Content</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            disabled={sportsContent.length <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={sportsContent.length <= 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-0">
        <div className="relative">
          <img
            src={currentContent.thumbnailPath}
            alt={currentContent.title}
            className="w-full h-64 md:h-80 object-cover"
            onError={(e) => {
              e.currentTarget.src = '/assets/generated/african-football-match.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center space-x-2 flex-wrap">
                <Badge className={`text-white ${getAccessTierColor(currentContent.accessTier)}`}>
                  {currentContent.accessTier}
                </Badge>
                <Badge className="bg-primary text-primary-foreground">
                  <Zap className="w-3 h-3 mr-1" />
                  {currentContent.sportType}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{(Number(currentContent.averageRating) / 10).toFixed(1)}</span>
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold">{currentContent.title}</h2>
              <p className="text-sm md:text-base text-gray-200 line-clamp-2">
                {currentContent.description}
              </p>
              
              {currentContent.eventInfo && (
                <p className="text-sm text-gray-300">
                  <strong>Event:</strong> {currentContent.eventInfo}
                </p>
              )}
              
              <div className="flex items-center space-x-4 flex-wrap gap-2">
                <Button className="bg-white text-black hover:bg-gray-100">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Now
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {sportsContent.length > 1 && (
        <div className="flex justify-center space-x-2">
          {sportsContent.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
