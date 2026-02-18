import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Clock, Wifi } from 'lucide-react';
import { useDataUsageTracker } from '../hooks/useDataUsageTracker';
import { useBandwidthMonitor, type QualityLevel } from '../hooks/useBandwidthMonitor';

interface DataUsageEstimatorProps {
  durationMinutes: number;
}

export function DataUsageEstimator({ durationMinutes }: DataUsageEstimatorProps) {
  const { estimateUsage } = useDataUsageTracker();
  const bandwidth = useBandwidthMonitor();

  const qualities: QualityLevel[] = ['240p', '360p', '480p', '720p', '1080p'];

  return (
    <Card className="bg-gradient-to-br from-blue-950/30 to-purple-950/30 border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-400" />
          Estimated Data Usage
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          For {durationMinutes} minutes of playback
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {qualities.map((quality) => {
            const usage = estimateUsage(quality, durationMinutes);
            const isRecommended = quality === bandwidth.recommendedQuality;
            
            return (
              <div
                key={quality}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  isRecommended
                    ? 'border-green-500/50 bg-green-500/10'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Badge variant={isRecommended ? 'default' : 'outline'} className="w-16">
                    {quality}
                  </Badge>
                  {isRecommended && (
                    <div className="flex items-center gap-1 text-xs text-green-400">
                      <Wifi className="w-3 h-3" />
                      Recommended
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-semibold">{usage.toFixed(1)} MB</div>
                  <div className="text-xs text-muted-foreground">
                    {(usage / 1024).toFixed(2)} GB
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          * Estimates based on average bitrates. Actual usage may vary.
        </p>
      </CardContent>
    </Card>
  );
}
