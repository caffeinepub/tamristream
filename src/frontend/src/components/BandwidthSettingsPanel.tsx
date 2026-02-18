import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Wifi, Smartphone, Zap, Play } from 'lucide-react';
import { useBandwidthSettings } from '../hooks/useBandwidthSettings';
import { ConnectionSpeedTest } from './ConnectionSpeedTest';
import type { QualityLevel } from '../hooks/useBandwidthMonitor';

export function BandwidthSettingsPanel() {
  const { settings, updateSetting } = useBandwidthSettings();

  const qualityOptions: QualityLevel[] = ['240p', '360p', '480p', '720p', '1080p'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Data & Bandwidth Settings
          </CardTitle>
          <CardDescription>
            Optimize your streaming experience for your connection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* WiFi Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold">WiFi Connection</h3>
            </div>
            
            <div className="space-y-3 pl-7">
              <div className="space-y-2">
                <Label htmlFor="wifi-quality">Default Video Quality</Label>
                <Select
                  value={settings.defaultQualityWifi}
                  onValueChange={(value) => updateSetting('defaultQualityWifi', value as QualityLevel)}
                >
                  <SelectTrigger id="wifi-quality" className="min-h-[44px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {qualityOptions.map((quality) => (
                      <SelectItem key={quality} value={quality} className="min-h-[44px]">
                        {quality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between min-h-[44px]">
                <Label htmlFor="wifi-autoplay" className="cursor-pointer">
                  Autoplay videos
                </Label>
                <Switch
                  id="wifi-autoplay"
                  checked={settings.autoplayWifi}
                  onCheckedChange={(checked) => updateSetting('autoplayWifi', checked)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Cellular Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold">Cellular Connection</h3>
            </div>
            
            <div className="space-y-3 pl-7">
              <div className="space-y-2">
                <Label htmlFor="cellular-quality">Default Video Quality</Label>
                <Select
                  value={settings.defaultQualityCellular}
                  onValueChange={(value) => updateSetting('defaultQualityCellular', value as QualityLevel)}
                >
                  <SelectTrigger id="cellular-quality" className="min-h-[44px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {qualityOptions.map((quality) => (
                      <SelectItem key={quality} value={quality} className="min-h-[44px]">
                        {quality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Lower quality saves mobile data
                </p>
              </div>

              <div className="flex items-center justify-between min-h-[44px]">
                <Label htmlFor="cellular-autoplay" className="cursor-pointer">
                  Autoplay videos
                </Label>
                <Switch
                  id="cellular-autoplay"
                  checked={settings.autoplayCellular}
                  onCheckedChange={(checked) => updateSetting('autoplayCellular', checked)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* General Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Play className="w-5 h-5" />
              General Preferences
            </h3>
            
            <div className="space-y-3 pl-7">
              <div className="flex items-center justify-between min-h-[44px]">
                <div>
                  <Label htmlFor="low-bandwidth-default" className="cursor-pointer">
                    Enable Low Bandwidth Mode by default
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Optimizes for slow connections
                  </p>
                </div>
                <Switch
                  id="low-bandwidth-default"
                  checked={settings.lowBandwidthDefault}
                  onCheckedChange={(checked) => updateSetting('lowBandwidthDefault', checked)}
                />
              </div>

              <div className="flex items-center justify-between min-h-[44px]">
                <div>
                  <Label htmlFor="data-saver" className="cursor-pointer">
                    Data Saver Mode
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Reduces image quality and preloading
                  </p>
                </div>
                <Switch
                  id="data-saver"
                  checked={settings.dataSaverMode}
                  onCheckedChange={(checked) => updateSetting('dataSaverMode', checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connection Speed Test */}
      <ConnectionSpeedTest />
    </div>
  );
}
