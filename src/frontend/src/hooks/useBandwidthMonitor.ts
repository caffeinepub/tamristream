import { useState, useEffect } from 'react';

export type QualityLevel = '240p' | '360p' | '480p' | '720p' | '1080p';
export type ConnectionType = 'slow-2g' | '2g' | '3g' | '4g' | 'wifi' | 'unknown';

interface NetworkInformation extends EventTarget {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  addEventListener(type: 'change', listener: () => void): void;
  removeEventListener(type: 'change', listener: () => void): void;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

export interface BandwidthState {
  connectionType: ConnectionType;
  downlink: number; // Mbps
  rtt: number; // ms
  saveData: boolean;
  recommendedQuality: QualityLevel;
}

export function useBandwidthMonitor(): BandwidthState {
  const [bandwidthState, setBandwidthState] = useState<BandwidthState>({
    connectionType: 'unknown',
    downlink: 10,
    rtt: 50,
    saveData: false,
    recommendedQuality: '720p',
  });

  useEffect(() => {
    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

    const updateBandwidth = () => {
      if (connection) {
        const effectiveType = connection.effectiveType || 'unknown';
        const downlink = connection.downlink || 10;
        const rtt = connection.rtt || 50;
        const saveData = connection.saveData || false;

        let connectionType: ConnectionType = 'unknown';
        switch (effectiveType) {
          case 'slow-2g':
            connectionType = 'slow-2g';
            break;
          case '2g':
            connectionType = '2g';
            break;
          case '3g':
            connectionType = '3g';
            break;
          case '4g':
            connectionType = '4g';
            break;
          default:
            connectionType = downlink > 5 ? 'wifi' : 'unknown';
        }

        // Determine recommended quality based on connection
        let recommendedQuality: QualityLevel = '720p';
        if (saveData || connectionType === 'slow-2g' || connectionType === '2g') {
          recommendedQuality = '240p';
        } else if (connectionType === '3g' || downlink < 2) {
          recommendedQuality = '360p';
        } else if (downlink < 5) {
          recommendedQuality = '480p';
        } else if (downlink < 10) {
          recommendedQuality = '720p';
        } else {
          recommendedQuality = '1080p';
        }

        setBandwidthState({
          connectionType,
          downlink,
          rtt,
          saveData,
          recommendedQuality,
        });
      } else {
        // Fallback: assume decent connection
        setBandwidthState({
          connectionType: 'wifi',
          downlink: 10,
          rtt: 50,
          saveData: false,
          recommendedQuality: '720p',
        });
      }
    };

    updateBandwidth();

    if (connection) {
      connection.addEventListener('change', updateBandwidth);
      return () => {
        connection.removeEventListener('change', updateBandwidth);
      };
    }
  }, []);

  return bandwidthState;
}
