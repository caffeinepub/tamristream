import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Download, Upload, Clock, CheckCircle2 } from 'lucide-react';
import { useConnectionSpeedTest } from '../hooks/useConnectionSpeedTest';
import { Progress } from '@/components/ui/progress';

export function ConnectionSpeedTest() {
  const { isRunning, result, runTest } = useConnectionSpeedTest();

  const getSpeedRating = (speed: number) => {
    if (speed < 2) return { label: 'Slow', color: 'text-red-500', quality: '240p-360p recommended' };
    if (speed < 5) return { label: 'Medium', color: 'text-yellow-500', quality: '480p recommended' };
    if (speed < 10) return { label: 'Good', color: 'text-green-500', quality: '720p recommended' };
    return { label: 'Excellent', color: 'text-blue-500', quality: '1080p available' };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-500" />
          Connection Speed Test
        </CardTitle>
        <CardDescription>
          Test your current internet speed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={runTest}
          disabled={isRunning}
          className="w-full min-h-[44px]"
          size="lg"
        >
          {isRunning ? (
            <>
              <Activity className="w-4 h-4 mr-2 animate-spin" />
              Testing Connection...
            </>
          ) : (
            <>
              <Activity className="w-4 h-4 mr-2" />
              Run Speed Test
            </>
          )}
        </Button>

        {isRunning && (
          <div className="space-y-2">
            <Progress value={50} className="h-2" />
            <p className="text-xs text-center text-muted-foreground">
              Measuring your connection speed...
            </p>
          </div>
        )}

        {result && !isRunning && (
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Test completed</span>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2 text-blue-500">
                  <Download className="w-4 h-4" />
                  <span className="text-xs font-medium">Download</span>
                </div>
                <div className="text-2xl font-bold">{result.downloadSpeed.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">Mbps</div>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2 text-green-500">
                  <Upload className="w-4 h-4" />
                  <span className="text-xs font-medium">Upload</span>
                </div>
                <div className="text-2xl font-bold">{result.uploadSpeed.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">Mbps</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Latency</span>
              </div>
              <span className="text-lg font-bold">{result.latency} ms</span>
            </div>

            {(() => {
              const rating = getSpeedRating(result.downloadSpeed);
              return (
                <div className="space-y-2 p-4 rounded-lg bg-muted">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Connection Rating</span>
                    <Badge variant="outline" className={rating.color}>
                      {rating.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {rating.quality}
                  </p>
                </div>
              );
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
