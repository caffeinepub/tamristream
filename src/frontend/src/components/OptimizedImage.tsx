import { useState } from 'react';
import { getOptimizedImageProps } from '../lib/imageOptimization';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  aspectRatio?: 'video' | 'square' | 'portrait';
  showSkeleton?: boolean;
}

/**
 * Optimized image component with webp support, responsive srcsets, and lazy loading
 * Automatically converts images to webp format with fallback to jpg/png
 * Provides loading skeletons and proper aspect ratios for better UX
 */
export function OptimizedImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority,
  aspectRatio,
  showSkeleton = true,
}: OptimizedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageProps = getOptimizedImageProps(src, alt, loading, fetchPriority);

  const aspectRatioClass = aspectRatio
    ? aspectRatio === 'video'
      ? 'aspect-video'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : 'aspect-[2/3]'
    : '';

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    imageProps.onError(e);
  };

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass} ${className}`}>
      {showSkeleton && !imageLoaded && !imageError && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      <img
        {...imageProps}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        width={aspectRatio === 'portrait' ? 400 : aspectRatio === 'square' ? 400 : 800}
        height={aspectRatio === 'portrait' ? 600 : aspectRatio === 'square' ? 400 : 450}
      />
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-zinc-500 text-sm">
          Image unavailable
        </div>
      )}
    </div>
  );
}
