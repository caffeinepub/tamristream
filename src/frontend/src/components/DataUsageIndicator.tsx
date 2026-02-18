import { Badge } from '@/components/ui/badge';
import { Database, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDataUsageTracker } from '../hooks/useDataUsageTracker';
import type { QualityLevel } from '../hooks/useBandwidthMonitor';

interface DataUsageIndicatorProps {
  quality: QualityLevel;
  isPlaying: boolean;
  playbackTime: number; // seconds
}

export function DataUsageIndicator({ quality, isPlaying, playbackTime }: DataUsageIndicatorProps) {
  const { currentSessionUsage, trackUsage } = useDataUsageTracker();
  const [lastTrackedTime, setLastTrackedTime] = useState(0);

  useEffect(() => {
    if (isPlaying && playbackTime > lastTrackedTime + 10) {
      const elapsed = playbackTime - lastTrackedTime;
      trackUsage(quality, elapsed);
      setLastTrackedTime(playbackTime);
    }
  }, [isPlaying, playbackTime, lastTrackedTime, quality, trackUsage]);

  const getUsageColor = () => {
    if (currentSessionUsage < 50) return 'text-green-500';
    if (currentSessionUsage < 150) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Badge variant="secondary" className="gap-2 bg-black/70 border-white/20">
      <Database className={`w-3 h-3 ${getUsageColor()}`} />
      <span className="text-xs">
        {currentSessionUsage.toFixed(1)} MB
      </span>
      {currentSessionUsage > 100 && (
        <TrendingUp className="w-3 h-3 text-orange-500" />
      )}
    </Badge>
  );
}
