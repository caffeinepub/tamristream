/**
 * Image optimization utilities for TamriStream
 * Provides responsive srcsets with webp conversion and lazy loading helpers
 */

export interface ImageSrcSet {
  src: string;
  srcSet: string;
  sizes: string;
}

/**
 * Generate responsive srcset for images with webp format
 * Provides multiple sizes (400/800/1200px) for optimal performance
 */
export function getResponsiveSrcSet(imagePath: string): ImageSrcSet {
  // Handle absolute URLs
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return {
      src: imagePath,
      srcSet: imagePath,
      sizes: '100vw',
    };
  }

  // Normalize path - ensure it starts with /assets/generated/
  let normalizedPath = imagePath;
  if (!imagePath.startsWith('/')) {
    normalizedPath = `/assets/generated/${imagePath}`;
  } else if (!imagePath.startsWith('/assets/')) {
    normalizedPath = `/assets/generated${imagePath}`;
  }
  
  // Convert to webp format
  const webpPath = normalizedPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // Generate srcset with multiple sizes for responsive images
  const srcSet = [
    `${webpPath.replace('.webp', '-400w.webp')} 400w`,
    `${webpPath.replace('.webp', '-800w.webp')} 800w`,
    `${webpPath.replace('.webp', '-1200w.webp')} 1200w`,
  ].join(', ');

  // Responsive sizes based on viewport breakpoints
  const sizes = '(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px';

  return {
    src: webpPath,
    srcSet,
    sizes,
  };
}

/**
 * Get optimized image props for React img elements
 * Includes webp conversion, responsive srcsets, and proper loading attributes
 */
export function getOptimizedImageProps(
  imagePath: string,
  alt: string,
  loading: 'lazy' | 'eager' = 'lazy',
  fetchPriority?: 'high' | 'low' | 'auto'
) {
  const { src, srcSet, sizes } = getResponsiveSrcSet(imagePath);
  
  return {
    src,
    srcSet,
    sizes,
    alt,
    loading,
    fetchPriority,
    decoding: 'async' as const,
    onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.currentTarget;
      // Fallback to jpg if webp fails
      if (target.src.includes('.webp')) {
        const jpgSrc = target.src.replace(/-\d+w\.webp$/, '.jpg').replace('.webp', '.jpg');
        target.src = jpgSrc;
        target.srcset = '';
      }
    },
  };
}

/**
 * Preload critical images for hero sections
 * Improves LCP (Largest Contentful Paint) for Lighthouse
 */
export function preloadImage(imagePath: string) {
  const { src, srcSet } = getResponsiveSrcSet(imagePath);
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  if (srcSet) {
    link.setAttribute('imagesrcset', srcSet);
    link.setAttribute('imagesizes', '100vw');
  }
  
  document.head.appendChild(link);
}

/**
 * Convert blob/file to optimized webp format
 * Used for user uploads to ensure consistent format
 */
export async function convertToWebP(file: File, quality: number = 0.8): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert image'));
            }
          },
          'image/webp',
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Get thumbnail size for different contexts
 * Helps determine appropriate image dimensions
 */
export function getThumbnailSize(context: 'card' | 'hero' | 'list' | 'preview'): number {
  switch (context) {
    case 'card':
      return 400;
    case 'hero':
      return 1200;
    case 'list':
      return 200;
    case 'preview':
      return 800;
    default:
      return 400;
  }
}

/**
 * Check if browser supports WebP format
 * Used for progressive enhancement
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webpData = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
    const img = new Image();
    img.onload = () => resolve(img.width === 1);
    img.onerror = () => resolve(false);
    img.src = webpData;
  });
}
