import { useState, useEffect } from 'react';

export interface RuntimeError {
  id: string;
  timestamp: number;
  message: string;
  stack?: string;
  type: 'error' | 'unhandledrejection';
}

const MAX_ERRORS = 20;
const errors: RuntimeError[] = [];

export function useRecentRuntimeErrors() {
  const [recentErrors, setRecentErrors] = useState<RuntimeError[]>([]);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const error: RuntimeError = {
        id: `${Date.now()}-${Math.random()}`,
        timestamp: Date.now(),
        message: event.message || 'Unknown error',
        stack: event.error?.stack,
        type: 'error',
      };
      
      errors.unshift(error);
      if (errors.length > MAX_ERRORS) {
        errors.pop();
      }
      setRecentErrors([...errors]);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error: RuntimeError = {
        id: `${Date.now()}-${Math.random()}`,
        timestamp: Date.now(),
        message: event.reason?.message || String(event.reason) || 'Unhandled promise rejection',
        stack: event.reason?.stack,
        type: 'unhandledrejection',
      };
      
      errors.unshift(error);
      if (errors.length > MAX_ERRORS) {
        errors.pop();
      }
      setRecentErrors([...errors]);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Initialize with existing errors
    setRecentErrors([...errors]);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const clearErrors = () => {
    errors.length = 0;
    setRecentErrors([]);
  };

  return {
    errors: recentErrors,
    clearErrors,
  };
}
