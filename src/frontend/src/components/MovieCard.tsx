import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Play, Eye } from 'lucide-react';
import type { Movie } from '../backend';
import { useNavigate } from '@tanstack/react-router';
import { OptimizedImage } from './OptimizedImage';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

export function MovieCard({ movie, onSelect }: MovieCardProps) {
  const navigate = useNavigate();

  const handleViewTransparency = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate({ to: `/movie-transparency/${encodeURIComponent(movie.title)}` });
  };

  return (
    <Card 
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-zinc-900 border-zinc-800"
      onClick={() => onSelect(movie)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <OptimizedImage
          src={movie.coverImagePath}
          alt={`${movie.title} movie poster`}
          loading="lazy"
          aspectRatio="portrait"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <Button 
              size="sm" 
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(movie);
              }}
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Now
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={handleViewTransparency}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Transparency
            </Button>
          </div>
        </div>
        {Number(movie.averageRating) > 0 && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-amber-500 text-black font-semibold">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {Number(movie.averageRating)}/5
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-white line-clamp-1 mb-2">
          {movie.title}
        </h3>
        <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
          {movie.description}
        </p>
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>{Number(movie.reviewCount)} reviews</span>
          <Button 
            variant="link" 
            size="sm" 
            className="h-auto p-0 text-amber-500 hover:text-amber-400"
            onClick={handleViewTransparency}
          >
            Blockchain Verified →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
