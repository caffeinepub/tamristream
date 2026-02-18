import { useState, useEffect } from 'react';
import type { QualityLevel } from './useBandwidthMonitor';

const LOW_BANDWIDTH_KEY = 'tamristream_low_bandwidth_mode';
const QUALITY_OVERRIDE_KEY = 'tamristream_quality_override';

export interface LowBandwidthModeState {
  enabled: boolean;
  qualityOverride: QualityLevel | null;
}

export function useLowBandwidthMode() {
  const [state, setState] = useState<LowBandwidthModeState>(() => {
    const stored = localStorage.getItem(LOW_BANDWIDTH_KEY);
    const qualityOverride = localStorage.getItem(QUALITY_OVERRIDE_KEY) as QualityLevel | null;
    return {
      enabled: stored === 'true',
      qualityOverride,
    };
  });

  const toggleMode = () => {
    setState((prev) => {
      const newEnabled = !prev.enabled;
      localStorage.setItem(LOW_BANDWIDTH_KEY, String(newEnabled));
      return { ...prev, enabled: newEnabled };
    });
  };

  const setQualityOverride = (quality: QualityLevel | null) => {
    setState((prev) => {
      if (quality) {
        localStorage.setItem(QUALITY_OVERRIDE_KEY, quality);
      } else {
        localStorage.removeItem(QUALITY_OVERRIDE_KEY);
      }
      return { ...prev, qualityOverride: quality };
    });
  };

  return {
    ...state,
    toggleMode,
    setQualityOverride,
  };
}
