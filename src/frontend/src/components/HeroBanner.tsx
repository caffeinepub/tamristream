import { Button } from '@/components/ui/button';
import { Play, Upload } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export function HeroBanner() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const handleStartWatching = () => {
    if (isAuthenticated) {
      navigate({ to: '/movies' });
    } else {
      const moviesSection = document.getElementById('movies-section');
      if (moviesSection) {
        moviesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBrowseMovies = () => {
    if (isAuthenticated) {
      navigate({ to: '/movies' });
    } else {
      const moviesSection = document.getElementById('movies-section');
      if (moviesSection) {
        moviesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-black"
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Background Image with Overlay */}
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div 
            className="absolute inset-0 bg-zinc-900 animate-pulse" 
            aria-hidden="true"
          />
        )}
        
        <img
          src="/assets/generated/african-cinema-hero.jpg"
          alt="African cinema showcase featuring diverse storytelling and cultural content"
          loading="eager"
          fetchPriority="high"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-60' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient Overlays for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" aria-hidden="true" />
        
        {/* Content Container */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-4xl space-y-6 sm:space-y-8">
            {/* Brand Name */}
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                TamriStream
              </h1>
            </div>
            
            {/* Main Headline */}
            <h2 
              id="hero-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight animate-fade-in"
              style={{ animationDelay: '0.1s', fontFamily: 'Poppins, sans-serif' }}
            >
              Stream African Movies & Series — Anywhere, Anytime
            </h2>
            
            {/* Supporting Text */}
            <p 
              className="text-lg sm:text-xl md:text-2xl text-zinc-200 leading-relaxed animate-fade-in max-w-3xl"
              style={{ animationDelay: '0.2s', fontFamily: 'Poppins, sans-serif' }}
            >
              Watch Nollywood and African stories you love. Affordable. Mobile-friendly. Built for Africa.
            </p>

            {/* Dual CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in" 
              style={{ animationDelay: '0.3s' }}
            >
              <Button 
                size="lg"
                onClick={handleStartWatching}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 h-auto rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto tap-target"
                aria-label={isAuthenticated ? "Start watching movies now" : "Browse movies and sign up"}
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" aria-hidden="true" />
                Start Watching
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={handleBrowseMovies}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 font-bold text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 h-auto rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto tap-target"
                aria-label="Browse all movies"
              >
                Browse Movies
              </Button>
            </div>

            {/* Trust Indicators */}
            <div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-zinc-300 animate-fade-in text-sm sm:text-base" 
              style={{ animationDelay: '0.4s' }}
              role="complementary"
              aria-label="Platform features"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" aria-hidden="true"></span>
                Works on low data
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" aria-hidden="true"></span>
                Mobile & desktop
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" aria-hidden="true"></span>
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" aria-hidden="true"></div>
    </section>
  );
}
