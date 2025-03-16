import { images } from '../images';

export const getImageUrl = (key: keyof typeof images): string => {
  const url = images[key];
  if (!url) {
    console.warn(`Image key not found: ${key}`);
    return '';
  }
  return url;
};

export const getOptimizedImageUrl = (url: string, width?: number, quality = 75) => {
  if (!url) return '';
  
  // Only process URLs for our own domain
  if (url.startsWith('http')) {
    return url;
  }

  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  params.set('q', quality.toString());
  
  return `/_next/image?url=${encodeURIComponent(url)}&${params.toString()}`;
};

export const preloadImage = (src: string) => {
  if (typeof window === 'undefined') return;
  const img = new Image();
  img.src = src;
};
