import { useState, useEffect, useCallback } from 'react';
import type { QualityLevel } from './useBandwidthMonitor';

const DATA_USAGE_KEY = 'tamristream_data_usage';

interface DataUsageStats {
  daily: number;
  weekly: number;
  monthly: number;
  lastReset: string;
  sessions: Array<{
    date: string;
    amount: number;
    quality: QualityLevel;
  }>;
}

interface BitrateEstimates {
  '240p': number;
  '360p': number;
  '480p': number;
  '720p': number;
  '1080p': number;
}

// Bitrate estimates in Mbps
const BITRATES: BitrateEstimates = {
  '240p': 0.3,
  '360p': 0.7,
  '480p': 1.5,
  '720p': 3.0,
  '1080p': 6.0,
};

export function useDataUsageTracker() {
  const [stats, setStats] = useState<DataUsageStats>(() => {
    const stored = localStorage.getItem(DATA_USAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      daily: 0,
      weekly: 0,
      monthly: 0,
      lastReset: new Date().toISOString(),
      sessions: [],
    };
  });

  const [currentSessionUsage, setCurrentSessionUsage] = useState(0);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(DATA_USAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  // Reset counters based on time periods
  useEffect(() => {
    const checkReset = () => {
      const now = new Date();
      const lastReset = new Date(stats.lastReset);
      
      const daysDiff = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff >= 30) {
        setStats((prev) => ({ ...prev, monthly: 0, weekly: 0, daily: 0, lastReset: now.toISOString() }));
      } else if (daysDiff >= 7) {
        setStats((prev) => ({ ...prev, weekly: 0, daily: 0 }));
      } else if (daysDiff >= 1) {
        setStats((prev) => ({ ...prev, daily: 0 }));
      }
    };

    checkReset();
    const interval = setInterval(checkReset, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval);
  }, [stats.lastReset]);

  const estimateUsage = useCallback((quality: QualityLevel, durationMinutes: number): number => {
    const bitrateMbps = BITRATES[quality];
    const megabytes = (bitrateMbps * 60 * durationMinutes) / 8;
    return Math.round(megabytes * 10) / 10;
  }, []);

  const trackUsage = useCallback((quality: QualityLevel, durationSeconds: number) => {
    const durationMinutes = durationSeconds / 60;
    const usage = estimateUsage(quality, durationMinutes);
    
    setCurrentSessionUsage((prev) => prev + usage);
    
    setStats((prev) => ({
      ...prev,
      daily: prev.daily + usage,
      weekly: prev.weekly + usage,
      monthly: prev.monthly + usage,
      sessions: [
        ...prev.sessions.slice(-99), // Keep last 100 sessions
        {
          date: new Date().toISOString(),
          amount: usage,
          quality,
        },
      ],
    }));
  }, [estimateUsage]);

  const resetStats = useCallback(() => {
    setStats({
      daily: 0,
      weekly: 0,
      monthly: 0,
      lastReset: new Date().toISOString(),
      sessions: [],
    });
    setCurrentSessionUsage(0);
  }, []);

  const resetCurrentSession = useCallback(() => {
    setCurrentSessionUsage(0);
  }, []);

  return {
    stats,
    currentSessionUsage,
    estimateUsage,
    trackUsage,
    resetStats,
    resetCurrentSession,
  };
}
