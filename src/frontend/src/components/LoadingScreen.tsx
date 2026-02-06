import { Film, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  message?: string;
  progress?: number;
}

export function LoadingScreen({ message, progress }: LoadingScreenProps = {}) {
  const [loadingMessage, setLoadingMessage] = useState(message || 'Loading your favorite films…');
  const [currentProgress, setCurrentProgress] = useState(progress || 0);

  useEffect(() => {
    if (progress !== undefined) {
      setCurrentProgress(progress);
      return;
    }

    // Simulate progress if not provided
    const interval = setInterval(() => {
      setCurrentProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    if (message) {
      setLoadingMessage(message);
    }
  }, [message]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md w-full">
        {/* Animated Logo */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl flex items-center justify-center animate-pulse shadow-2xl shadow-amber-500/50">
              <Film className="w-12 h-12 text-black" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
        </div>
        
        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            TamriStream
          </h1>
          <p className="text-lg md:text-xl text-amber-500 font-medium">
            African Cinema at Your Fingertips
          </p>
        </div>
        
        {/* Loading Animation */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          
          <p className="text-zinc-400 text-base md:text-lg font-medium min-h-[28px]">
            {loadingMessage}
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${Math.min(currentProgress, 100)}%` }} 
          />
        </div>

        {/* Progress Percentage */}
        {currentProgress > 0 && (
          <p className="text-sm text-zinc-500">
            {Math.round(currentProgress)}% complete
          </p>
        )}
      </div>
    </div>
  );
}
