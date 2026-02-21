import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { TopPicksSection } from './TopPicksSection';
import { MovieDialog } from './MovieDialog';
import { useGetTopPicks } from '../hooks/useQueries';
import type { Movie } from '../backend';

export default function TopPicksSectionWrapper() {
  const navigate = useNavigate();
  const { data: topPicks = [], isLoading } = useGetTopPicks();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showMovieDialog, setShowMovieDialog] = useState(false);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowMovieDialog(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <TopPicksSection
        topPicks={topPicks}
        isLoading={isLoading}
        onMovieSelect={handleMovieSelect}
      />
      <MovieDialog
        movie={selectedMovie}
        open={showMovieDialog}
        onOpenChange={setShowMovieDialog}
      />
    </div>
  );
}
