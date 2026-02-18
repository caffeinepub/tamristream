import { useState, useEffect } from 'react';
import type { QualityLevel } from './useBandwidthMonitor';

const SETTINGS_KEY = 'tamristream_bandwidth_settings';

export interface BandwidthSettings {
  defaultQualityWifi: QualityLevel;
  defaultQualityCellular: QualityLevel;
  autoplayWifi: boolean;
  autoplayCellular: boolean;
  lowBandwidthDefault: boolean;
  dataSaverMode: boolean;
}

const DEFAULT_SETTINGS: BandwidthSettings = {
  defaultQualityWifi: '720p',
  defaultQualityCellular: '360p',
  autoplayWifi: true,
  autoplayCellular: false,
  lowBandwidthDefault: false,
  dataSaverMode: false,
};

export function useBandwidthSettings() {
  const [settings, setSettings] = useState<BandwidthSettings>(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof BandwidthSettings>(
    key: K,
    value: BandwidthSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return {
    settings,
    updateSetting,
  };
}
