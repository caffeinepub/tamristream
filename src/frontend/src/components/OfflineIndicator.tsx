import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Cloud, CloudOff } from 'lucide-react';
import { useOfflineStatus } from '../hooks/useOfflineStatus';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function OfflineIndicator() {
  const { isOnline, cachedContentAvailable, lastOnline } = useOfflineStatus();

  if (isOnline) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className="gap-2 bg-orange-500/10 border-orange-500/50 text-orange-500"
          >
            <WifiOff className="w-3 h-3" />
            <span className="hidden sm:inline">Offline</span>
            {cachedContentAvailable && (
              <Cloud className="w-3 h-3" />
            )}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-semibold">You're offline</p>
            {cachedContentAvailable ? (
              <p className="text-xs">Some cached content is available</p>
            ) : (
              <p className="text-xs">No cached content available</p>
            )}
            {lastOnline && (
              <p className="text-xs text-muted-foreground">
                Last online: {new Date(lastOnline).toLocaleTimeString()}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
