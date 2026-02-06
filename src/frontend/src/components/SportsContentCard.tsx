import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Star, Clock, Zap } from 'lucide-react';
import type { SportsContent } from '../hooks/useQueries';
import { OptimizedImage } from './OptimizedImage';

interface SportsContentCardProps {
  content: SportsContent;
  onClick?: () => void;
}

export function SportsContentCard({ content, onClick }: SportsContentCardProps) {
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp / BigInt(1000000)));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

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
    <Card 
      className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border hover:border-primary/50 overflow-hidden"
      onClick={onClick}
    >
      <div className="relative">
        <OptimizedImage
          src={content.thumbnailPath}
          alt={`${content.title} - ${content.sportType} content`}
          loading="lazy"
          aspectRatio="video"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <Button
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white text-black"
          >
            <Play className="w-5 h-5" />
          </Button>
        </div>
        <Badge 
          className={`absolute top-2 left-2 text-white text-xs ${getAccessTierColor(content.accessTier)}`}
        >
          {content.accessTier}
        </Badge>
        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs">
          <Zap className="w-3 h-3 mr-1" />
          {content.sportType}
        </Badge>
      </div>
      
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-2 sm:space-y-3">
          <div>
            <h3 className="font-semibold text-base sm:text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {content.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-1">
              {content.description}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
              <span>{(Number(content.averageRating) / 10).toFixed(1)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs">{formatDate(content.created)}</span>
            </div>
          </div>
          
          {content.eventInfo && (
            <div className="text-xs text-muted-foreground bg-muted/50 rounded p-2">
              <strong>Event:</strong> {content.eventInfo}
            </div>
          )}
          
          <div className="text-xs text-muted-foreground">
            {Number(content.reviewCount)} reviews
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
