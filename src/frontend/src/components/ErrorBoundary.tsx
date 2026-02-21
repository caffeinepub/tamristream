import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Smartphone, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorType: 'network' | 'auth' | 'module' | 'render' | 'unknown';
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    errorType: 'unknown',
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    // Categorize error type
    let errorType: State['errorType'] = 'unknown';
    const errorMessage = error.message.toLowerCase();
    
    if (errorMessage.includes('network') || errorMessage.includes('fetch') || errorMessage.includes('timeout')) {
      errorType = 'network';
    } else if (errorMessage.includes('auth') || errorMessage.includes('identity') || errorMessage.includes('principal')) {
      errorType = 'auth';
    } else if (errorMessage.includes('module') || errorMessage.includes('import') || errorMessage.includes('cannot find')) {
      errorType = 'module';
    } else if (errorMessage.includes('render') || errorMessage.includes('component')) {
      errorType = 'render';
    }

    return { hasError: true, error, errorType };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', {
      error,
      errorInfo,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      online: navigator.onLine,
    });

    this.setState({
      error,
      errorInfo,
    });

    // Store error for diagnostics
    try {
      const errors = JSON.parse(localStorage.getItem('app_errors') || '[]');
      errors.push({
        type: 'boundary',
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('app_errors', JSON.stringify(errors.slice(-20)));
    } catch (e) {
      console.error('Failed to store error:', e);
    }
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorType: 'unknown',
    });
    window.location.reload();
  };

  private handleClearCache = async () => {
    try {
      // Clear service worker caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }
      
      // Clear localStorage
      localStorage.clear();
      
      // Unregister service workers
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map(reg => reg.unregister()));
      }
      
      // Reload
      window.location.reload();
    } catch (error) {
      console.error('Failed to clear cache:', error);
      window.location.reload();
    }
  };

  private getErrorMessage(): { title: string; description: string; suggestions: string[] } {
    const { errorType, error } = this.state;
    const isOnline = navigator.onLine;

    switch (errorType) {
      case 'network':
        return {
          title: 'Network Error',
          description: isOnline 
            ? 'Unable to connect to the server. The service might be temporarily unavailable.'
            : 'You appear to be offline. Please check your internet connection.',
          suggestions: [
            'Check your internet connection',
            'Try switching between WiFi and mobile data',
            'Disable VPN if enabled',
            'Wait a moment and try again',
          ],
        };
      
      case 'auth':
        return {
          title: 'Authentication Error',
          description: 'There was a problem with authentication. You may need to log in again.',
          suggestions: [
            'Try logging out and logging back in',
            'Clear your browser cache',
            'Check if cookies are enabled',
            'Try a different browser',
          ],
        };
      
      case 'module':
        return {
          title: 'Loading Error',
          description: 'Failed to load a required component. This might be due to a network issue or cached data.',
          suggestions: [
            'Refresh the page',
            'Clear your browser cache',
            'Check your internet connection',
            'Try updating your browser',
          ],
        };
      
      case 'render':
        return {
          title: 'Display Error',
          description: 'A component failed to render properly. This is usually a temporary issue.',
          suggestions: [
            'Refresh the page',
            'Try a different page',
            'Clear browser cache',
            'Report this issue if it persists',
          ],
        };
      
      default:
        return {
          title: 'Something Went Wrong',
          description: error?.message || 'An unexpected error occurred. Please try refreshing the page.',
          suggestions: [
            'Refresh the page',
            'Clear browser cache and data',
            'Try a different browser',
            'Contact support if the issue persists',
          ],
        };
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { title, description, suggestions } = this.getErrorMessage();
      const isOnline = navigator.onLine;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="max-w-2xl w-full">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-8 h-8 text-destructive shrink-0" />
                <div className="flex-1">
                  <CardTitle className="text-xl sm:text-2xl">{title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    {isOnline ? (
                      <Wifi className="w-4 h-4 text-green-500" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {isOnline ? 'Online' : 'Offline'}
                    </span>
                    {isMobile && (
                      <>
                        <Smartphone className="w-4 h-4 text-muted-foreground ml-2" />
                        <span className="text-xs text-muted-foreground">Mobile</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <CardDescription className="text-sm sm:text-base">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {this.state.error && (
                <div className="p-3 sm:p-4 bg-muted rounded-lg">
                  <p className="text-xs sm:text-sm font-mono text-muted-foreground break-all">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Try these solutions:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={this.handleReset} 
                  className="flex items-center justify-center gap-2 tap-target"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh Page
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/'}
                  className="tap-target"
                >
                  Go to Home
                </Button>
                <Button 
                  variant="outline" 
                  onClick={this.handleClearCache}
                  className="tap-target"
                >
                  Clear Cache
                </Button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium mb-2 tap-target">
                    Error Details (Development Only)
                  </summary>
                  <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto max-h-96">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  If this problem persists, please visit our{' '}
                  <a href="/diagnostics" className="text-primary hover:underline">
                    diagnostics page
                  </a>{' '}
                  for more information.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
