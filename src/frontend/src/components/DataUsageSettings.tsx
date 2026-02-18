import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Database, TrendingUp, Calendar, RotateCcw } from 'lucide-react';
import { useDataUsageTracker } from '../hooks/useDataUsageTracker';
import { toast } from 'sonner';

export function DataUsageSettings() {
  const { stats, resetStats } = useDataUsageTracker();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data usage statistics?')) {
      resetStats();
      toast.success('Data usage statistics reset');
    }
  };

  const formatSize = (mb: number) => {
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    return `${(mb / 1024).toFixed(2)} GB`;
  };

  const dailyLimit = 500; // MB
  const weeklyLimit = 2000; // MB
  const monthlyLimit = 5000; // MB

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Data Usage Statistics
          </CardTitle>
          <CardDescription>
            Track your streaming data consumption
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Daily Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Today</span>
              </div>
              <span className="text-sm font-semibold">{formatSize(stats.daily)}</span>
            </div>
            <Progress value={(stats.daily / dailyLimit) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {((stats.daily / dailyLimit) * 100).toFixed(0)}% of {formatSize(dailyLimit)} daily estimate
            </p>
          </div>

          {/* Weekly Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="font-medium">This Week</span>
              </div>
              <span className="text-sm font-semibold">{formatSize(stats.weekly)}</span>
            </div>
            <Progress value={(stats.weekly / weeklyLimit) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {((stats.weekly / weeklyLimit) * 100).toFixed(0)}% of {formatSize(weeklyLimit)} weekly estimate
            </p>
          </div>

          {/* Monthly Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-500" />
                <span className="font-medium">This Month</span>
              </div>
              <span className="text-sm font-semibold">{formatSize(stats.monthly)}</span>
            </div>
            <Progress value={(stats.monthly / monthlyLimit) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {((stats.monthly / monthlyLimit) * 100).toFixed(0)}% of {formatSize(monthlyLimit)} monthly estimate
            </p>
          </div>

          {/* Average per session */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Average per session</span>
              <span className="font-medium">
                {stats.sessions.length > 0
                  ? formatSize(stats.monthly / stats.sessions.length)
                  : '0 MB'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Total sessions</span>
              <span className="font-medium">{stats.sessions.length}</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Statistics
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
