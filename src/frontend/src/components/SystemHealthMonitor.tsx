import { useEffect, useState } from 'react';
import { useActor } from '../hooks/useActor';
import { useQueryClient } from '@tanstack/react-query';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, WifiOff, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

type HealthStatus = 'healthy' | 'degraded' | 'offline';

export function SystemHealthMonitor() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [healthStatus, setHealthStatus] = useState<HealthStatus>('healthy');
  const [lastCheck, setLastCheck] = useState<Date>(new Date());
  const [showAlert, setShowAlert] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        if (!actor) {
          setHealthStatus('offline');
          setShowAlert(true);
          return;
        }

        // Perform a lightweight health check
        await actor.getRevenueModel();
        setHealthStatus('healthy');
        setShowAlert(false);
        setRetryCount(0);
        setLastCheck(new Date());
      } catch (err: any) {
        console.error('Health check failed:', err);
        
        if (err.message?.includes('network') || err.message?.includes('timeout')) {
          setHealthStatus('offline');
          setShowAlert(true);
          toast.error('Connection lost. Attempting to reconnect...', {
            id: 'health-check-error',
          });
        } else {
          setHealthStatus('degraded');
          setShowAlert(true);
        }
        
        setRetryCount(prev => prev + 1);
      }
    };

    // Initial check
    checkHealth();

    // Periodic health checks every 30 seconds
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval);
  }, [actor]);

  // Auto-retry on failure
  useEffect(() => {
    if (healthStatus === 'offline' && retryCount < 5) {
      const retryDelay = Math.min(1000 * 2 ** retryCount, 30000);
      const timeout = setTimeout(() => {
        queryClient.invalidateQueries();
      }, retryDelay);

      return () => clearTimeout(timeout);
    }
  }, [healthStatus, retryCount, queryClient]);

  const handleRetry = () => {
    setRetryCount(0);
    queryClient.invalidateQueries();
    toast.info('Reconnecting to TamriStream...', {
      id: 'reconnecting',
    });
  };

  if (!showAlert || healthStatus === 'healthy') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-in slide-in-from-bottom-5">
      {healthStatus === 'offline' && (
        <Alert className="border-red-500 bg-red-950/90 backdrop-blur-sm">
          <WifiOff className="h-5 w-5 text-red-400" />
          <AlertDescription className="text-red-200 flex items-center justify-between">
            <div className="flex-1">
              <p className="font-semibold mb-1">Connection Lost</p>
              <p className="text-sm">
                Unable to connect to TamriStream. {retryCount > 0 && `Retry attempt ${retryCount}/5`}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRetry}
              className="ml-4 border-red-400 text-red-400 hover:bg-red-900"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {healthStatus === 'degraded' && (
        <Alert className="border-yellow-500 bg-yellow-950/90 backdrop-blur-sm">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <AlertDescription className="text-yellow-200 flex items-center justify-between">
            <div className="flex-1">
              <p className="font-semibold mb-1">Service Degraded</p>
              <p className="text-sm">
                Some features may be temporarily unavailable. We're working on it.
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowAlert(false)}
              className="ml-4 text-yellow-400 hover:bg-yellow-900"
            >
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
