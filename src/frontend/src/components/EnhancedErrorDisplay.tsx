import { AlertTriangle, RefreshCw, Home, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface EnhancedErrorDisplayProps {
  error: Error | string;
  onRetry?: () => void;
  onGoHome?: () => void;
  context?: string;
}

export function EnhancedErrorDisplay({ 
  error, 
  onRetry, 
  onGoHome,
  context = 'operation'
}: EnhancedErrorDisplayProps) {
  const errorMessage = typeof error === 'string' ? error : error.message;
  
  const getErrorType = (msg: string): 'network' | 'auth' | 'permission' | 'validation' | 'unknown' => {
    if (msg.includes('network') || msg.includes('timeout') || msg.includes('fetch')) return 'network';
    if (msg.includes('Unauthorized') || msg.includes('authenticated')) return 'auth';
    if (msg.includes('permission') || msg.includes('admin')) return 'permission';
    if (msg.includes('validation') || msg.includes('invalid')) return 'validation';
    return 'unknown';
  };

  const errorType = getErrorType(errorMessage.toLowerCase());

  const getErrorDetails = () => {
    switch (errorType) {
      case 'network':
        return {
          title: 'Connection Error',
          description: 'Unable to connect to TamriStream servers',
          suggestion: 'Please check your internet connection and try again',
          icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
        };
      case 'auth':
        return {
          title: 'Authentication Required',
          description: 'You need to be logged in to access this feature',
          suggestion: 'Please log in and try again',
          icon: <HelpCircle className="w-6 h-6 text-yellow-500" />,
        };
      case 'permission':
        return {
          title: 'Access Denied',
          description: 'You don\'t have permission to perform this action',
          suggestion: 'Contact support if you believe this is an error',
          icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
        };
      case 'validation':
        return {
          title: 'Invalid Input',
          description: 'The provided information is invalid',
          suggestion: 'Please check your input and try again',
          icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
        };
      default:
        return {
          title: 'Something Went Wrong',
          description: `An error occurred during ${context}`,
          suggestion: 'Please try again or contact support if the problem persists',
          icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
        };
    }
  };

  const details = getErrorDetails();

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          {details.icon}
          <CardTitle className="text-2xl">{details.title}</CardTitle>
        </div>
        <CardDescription className="text-base">
          {details.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            {details.suggestion}
          </AlertDescription>
        </Alert>

        {errorMessage && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-mono text-muted-foreground break-words">
              {errorMessage}
            </p>
          </div>
        )}
        
        <div className="flex gap-3 flex-wrap">
          {onRetry && (
            <Button onClick={onRetry} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          )}
          {onGoHome && (
            <Button variant="outline" onClick={onGoHome} className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go to Home
            </Button>
          )}
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/payment-options'}
            className="flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            Get Help
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
