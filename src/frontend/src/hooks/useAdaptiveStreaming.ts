import { useState, useEffect, useCallback } from 'react';
import { useBandwidthMonitor, type QualityLevel } from './useBandwidthMonitor';
import { useLowBandwidthMode } from './useLowBandwidthMode';

export interface AdaptiveStreamingState {
  currentQuality: QualityLevel;
  autoMode: boolean;
  bufferHealth: number; // 0-100
  isTransitioning: boolean;
}

export function useAdaptiveStreaming() {
  const bandwidth = useBandwidthMonitor();
  const { enabled: lowBandwidthMode, qualityOverride } = useLowBandwidthMode();
  
  const [state, setState] = useState<AdaptiveStreamingState>({
    currentQuality: '360p', // Start low for fast initial load
    autoMode: true,
    bufferHealth: 100,
    isTransitioning: false,
  });

  // Adjust quality based on bandwidth when in auto mode
  useEffect(() => {
    if (!state.autoMode) return;

    const targetQuality = qualityOverride || (lowBandwidthMode ? '240p' : bandwidth.recommendedQuality);
    
    if (targetQuality !== state.currentQuality && !state.isTransitioning) {
      setState((prev) => ({
        ...prev,
        isTransitioning: true,
      }));

      // Simulate smooth transition
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          currentQuality: targetQuality,
          isTransitioning: false,
        }));
      }, 500);
    }
  }, [bandwidth.recommendedQuality, lowBandwidthMode, qualityOverride, state.autoMode, state.currentQuality, state.isTransitioning]);

  const setQuality = useCallback((quality: QualityLevel, auto: boolean = false) => {
    setState((prev) => ({
      ...prev,
      currentQuality: quality,
      autoMode: auto,
      isTransitioning: true,
    }));

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isTransitioning: false,
      }));
    }, 500);
  }, []);

  const toggleAutoMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      autoMode: !prev.autoMode,
    }));
  }, []);

  const updateBufferHealth = useCallback((health: number) => {
    setState((prev) => ({
      ...prev,
      bufferHealth: Math.max(0, Math.min(100, health)),
    }));

    // Preemptively downgrade if buffer is low
    if (health < 30 && state.autoMode && !state.isTransitioning) {
      const qualityLevels: QualityLevel[] = ['240p', '360p', '480p', '720p', '1080p'];
      const currentIndex = qualityLevels.indexOf(state.currentQuality);
      if (currentIndex > 0) {
        setQuality(qualityLevels[currentIndex - 1], true);
      }
    }
  }, [state.autoMode, state.currentQuality, state.isTransitioning, setQuality]);

  return {
    ...state,
    setQuality,
    toggleAutoMode,
    updateBufferHealth,
  };
}
