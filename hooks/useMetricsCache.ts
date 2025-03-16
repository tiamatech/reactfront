import { useState, useEffect } from 'react';
import { MetricDataPoint } from '../types';

export const useMetricsCache = () => {
  const [cachedMetrics, setCachedMetrics] = useState<MetricDataPoint[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('lastMetrics');
      if (cached) {
        try {
          setCachedMetrics(JSON.parse(cached));
        } catch (error) {
          console.error('Failed to parse cached metrics:', error);
          setCachedMetrics([]);
        }
      }
    }
  }, []);

  return cachedMetrics;
};
