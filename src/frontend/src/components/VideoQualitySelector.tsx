import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Settings, Wifi, WifiOff, Zap } from 'lucide-react';
import { useBandwidthMonitor, type QualityLevel } from '../hooks/useBandwidthMonitor';
import { useLowBandwidthMode } from '../hooks/useLowBandwidthMode';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface VideoQualitySelectorProps {
  currentQuality: QualityLevel;
  autoMode: boolean;
  onQualityChange: (quality: QualityLevel) => void;
  onAutoModeToggle: () => void;
}

export function VideoQualitySelector({
  currentQuality,
  autoMode,
  onQualityChange,
  onAutoModeToggle,
}: VideoQualitySelectorProps) {
  const bandwidth = useBandwidthMonitor();
  const { enabled: lowBandwidthMode, toggleMode } = useLowBandwidthMode();
  const [open, setOpen] = useState(false);

  const qualityOptions: QualityLevel[] = ['240p', '360p', '480p', '720p', '1080p'];

  const getConnectionIcon = () => {
    if (bandwidth.connectionType === 'wifi' || bandwidth.downlink > 5) {
      return <Wifi className="w-4 h-4 text-green-500" />;
    }
    return <WifiOff className="w-4 h-4 text-orange-500" />;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-black/50 border-white/20 hover:bg-black/70"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">{currentQuality}</span>
          {autoMode && <Badge variant="secondary" className="ml-1 text-xs">Auto</Badge>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              Video Quality
              {getConnectionIcon()}
            </h4>
            <p className="text-xs text-muted-foreground">
              Connection: {bandwidth.connectionType.toUpperCase()} • {bandwidth.downlink.toFixed(1)} Mbps
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-quality" className="text-sm">Auto Quality</Label>
              <Switch
                id="auto-quality"
                checked={autoMode}
                onCheckedChange={onAutoModeToggle}
              />
            </div>

            {!autoMode && (
              <div className="space-y-2">
                <Label htmlFor="quality-select" className="text-sm">Manual Quality</Label>
                <Select value={currentQuality} onValueChange={(value) => onQualityChange(value as QualityLevel)}>
                  <SelectTrigger id="quality-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {qualityOptions.map((quality) => (
                      <SelectItem key={quality} value={quality}>
                        {quality}
                        {quality === bandwidth.recommendedQuality && (
                          <span className="ml-2 text-xs text-green-500">(Recommended)</span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <Label htmlFor="low-bandwidth" className="text-sm">Low Bandwidth Mode</Label>
              </div>
              <Switch
                id="low-bandwidth"
                checked={lowBandwidthMode}
                onCheckedChange={toggleMode}
              />
            </div>
            {lowBandwidthMode && (
              <p className="text-xs text-muted-foreground">
                Optimized for slow connections. Maximum quality: 360p
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
