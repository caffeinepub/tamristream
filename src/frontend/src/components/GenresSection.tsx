import { Card } from '@/components/ui/card';
import { Film, Heart, Laugh, Zap, Drama, Users } from 'lucide-react';
import type { Movie } from '../backend';

interface GenresSectionProps {
  onMovieSelect: (movie: Movie | null) => void;
}

export function GenresSection({ onMovieSelect }: GenresSectionProps) {
  const genres = [
    {
      name: 'Drama',
      icon: Drama,
      color: 'from-purple-500 to-pink-500',
      description: 'Powerful stories that move the soul'
    },
    {
      name: 'Comedy',
      icon: Laugh,
      color: 'from-yellow-500 to-orange-500',
      description: 'Laughter from across the continent'
    },
    {
      name: 'Action',
      icon: Zap,
      color: 'from-red-500 to-orange-500',
      description: 'High-octane African adventures'
    },
    {
      name: 'Romance',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      description: 'Love stories that warm the heart'
    },
    {
      name: 'Thriller',
      icon: Film,
      color: 'from-blue-500 to-cyan-500',
      description: 'Edge-of-your-seat suspense'
    },
    {
      name: 'Family',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      description: 'Entertainment for everyone'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-black via-zinc-900 to-black py-20">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Explore by Genre
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Discover African cinema across all your favorite genres
            </p>
          </div>

          {/* Genres Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {genres.map((genre) => {
              const Icon = genre.icon;
              return (
                <Card
                  key={genre.name}
                  className="group relative overflow-hidden bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-all duration-300 cursor-pointer hover:scale-105"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative p-8 space-y-4">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${genre.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-amber-500 transition-colors">
                        {genre.name}
                      </h3>
                      <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        {genre.description}
                      </p>
                    </div>

                    {/* Arrow Indicator */}
                    <div className="flex items-center text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold">Explore →</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
