import { Middleware } from '@reduxjs/toolkit';

export const metricsCache: Middleware = () => next => action => {
  if (action && typeof action === 'object' && 'type' in action && typeof action.type === 'string' && action.type.startsWith('factory/')) {
    // Cache metrics data in localStorage
    if (typeof window !== 'undefined' && 'payload' in action) {
      try {
        localStorage.setItem('lastMetrics', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Failed to cache metrics:', error);
      }
    }
  }
  return next(action);
};
