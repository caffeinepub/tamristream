import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useRecentRuntimeErrors } from '../hooks/useRecentRuntimeErrors';
import { useBackendHealthStatus } from '../hooks/useBackendHealthStatus';
import { useServiceWorkerDiagnostics } from '../hooks/useServiceWorkerDiagnostics';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Trash2, 
  Clock,
  Server,
  Wifi,
  WifiOff,
  Download,
} from 'lucide-react';

export default function DiagnosticsPage() {
  const { errors, clearErrors } = useRecentRuntimeErrors();
  const { data: backendHealth, isLoading: healthLoading } = useBackendHealthStatus();
  const {
    supported,
    registered,
    controlling,
    updateAvailable,
    error: swError,
    isCheckingUpdate,
    isClearingCache,
    checkForUpdates,
    reloadToUpdate,
    clearCachesAndReload,
  } = useServiceWorkerDiagnostics();

  const buildVersion = import.meta.env.VITE_BUILD_VERSION || 'unknown';

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getHealthStatusColor = (status?: string) => {
    switch (status) {
      case 'Healthy':
        return 'text-green-500';
      case 'Degraded':
        return 'text-yellow-500';
      case 'Offline':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getHealthStatusIcon = (status?: string) => {
    switch (status) {
      case 'Healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Degraded':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'Offline':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">System Diagnostics</h1>
        <p className="text-muted-foreground">
          Monitor application health, service worker status, and runtime errors
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Build Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Build Information</span>
            </CardTitle>
            <CardDescription>Current application version</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Version:</span>
                <Badge variant="outline">{buildVersion}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Environment:</span>
                <Badge variant="outline">{import.meta.env.MODE}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Backend Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="w-5 h-5" />
              <span>Backend Health</span>
            </CardTitle>
            <CardDescription>Connection status to backend canister</CardDescription>
          </CardHeader>
          <CardContent>
            {healthLoading ? (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm">Checking...</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <div className="flex items-center space-x-2">
                    {getHealthStatusIcon(backendHealth?.status)}
                    <span className={`font-medium ${getHealthStatusColor(backendHealth?.status)}`}>
                      {backendHealth?.status || 'Unknown'}
                    </span>
                  </div>
                </div>
                {backendHealth?.lastSuccessfulCheck && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Check:</span>
                    <span className="text-sm font-mono">
                      {formatTimestamp(backendHealth.lastSuccessfulCheck)}
                    </span>
                  </div>
                )}
                {backendHealth?.error && (
                  <div className="mt-2 p-2 bg-destructive/10 rounded text-sm text-destructive">
                    {backendHealth.error}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Service Worker Status */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {controlling ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
              <span>Service Worker</span>
            </CardTitle>
            <CardDescription>Offline support and caching status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Supported:</span>
                  {supported ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Registered:</span>
                  {registered ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Controlling:</span>
                  {controlling ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>

              {updateAvailable && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Download className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-amber-500">Update Available</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        A new version of the application is ready to install
                      </p>
                      <Button
                        onClick={reloadToUpdate}
                        size="sm"
                        className="mt-3"
                      >
                        Reload to Update
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {swError && (
                <div className="p-3 bg-destructive/10 rounded text-sm text-destructive">
                  {swError}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={checkForUpdates}
                  disabled={!supported || isCheckingUpdate}
                  variant="outline"
                  size="sm"
                >
                  {isCheckingUpdate ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Check for Updates
                    </>
                  )}
                </Button>
                <Button
                  onClick={clearCachesAndReload}
                  disabled={isClearingCache}
                  variant="destructive"
                  size="sm"
                >
                  {isClearingCache ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Clearing...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Caches & Reload
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Errors */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>Recent Runtime Errors</span>
                </CardTitle>
                <CardDescription>Last {errors.length} captured errors</CardDescription>
              </div>
              {errors.length > 0 && (
                <Button onClick={clearErrors} variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {errors.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                <p className="font-medium">No errors captured</p>
                <p className="text-sm mt-1">The application is running smoothly</p>
              </div>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {errors.map((error) => (
                    <div
                      key={error.id}
                      className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="destructive" className="text-xs">
                          {error.type}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTimestamp(error.timestamp)}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        {error.message}
                      </p>
                      {error.stack && (
                        <>
                          <Separator className="my-2" />
                          <details className="text-xs">
                            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                              Stack trace
                            </summary>
                            <pre className="mt-2 p-2 bg-muted rounded overflow-x-auto text-xs">
                              {error.stack}
                            </pre>
                          </details>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
