import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

export type HealthStatus = 'Healthy' | 'Degraded' | 'Offline';

export interface BackendHealth {
  status: HealthStatus;
  lastSuccessfulCheck: number | null;
  error?: string;
}

export function useBackendHealthStatus() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<BackendHealth>({
    queryKey: ['backendHealth'],
    queryFn: async (): Promise<BackendHealth> => {
      if (!actor) {
        return {
          status: 'Offline',
          lastSuccessfulCheck: null,
          error: 'Actor not initialized',
        };
      }

      try {
        // Use a lightweight query to check backend health
        await actor.getRevenueModel();
        return {
          status: 'Healthy',
          lastSuccessfulCheck: Date.now(),
        };
      } catch (error: any) {
        return {
          status: 'Degraded',
          lastSuccessfulCheck: null,
          error: error.message || 'Backend check failed',
        };
      }
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 30000, // Check every 30 seconds
    retry: 1,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
  };
}
