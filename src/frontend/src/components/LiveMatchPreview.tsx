import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, MapPin, Bell, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { LiveMatch } from '../hooks/useQueries';

interface LiveMatchPreviewProps {
  matches: LiveMatch[];
  isLoading: boolean;
}

export function LiveMatchPreview({ matches, isLoading }: LiveMatchPreviewProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (matchDate: bigint) => {
    const matchTime = new Date(Number(matchDate / BigInt(1000000)));
    const diff = matchTime.getTime() - currentTime.getTime();
    
    if (diff <= 0) {
      return 'Live Now';
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp / BigInt(1000000)));
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 border-red-200 dark:border-red-800">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3 bg-white dark:bg-card rounded-lg p-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span>Live Match Previews</span>
          </CardTitle>
          <CardDescription>
            No upcoming matches scheduled at the moment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Check back soon for upcoming sports events</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 border-red-200 dark:border-red-800">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
          <span>Live Match Previews</span>
          <Badge className="bg-red-600 text-white">Live</Badge>
        </CardTitle>
        <CardDescription>
          Real-time updates and previews of upcoming African sports events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {matches.slice(0, 3).map((match) => {
            const countdown = formatCountdown(match.date);
            const isLive = countdown === 'Live Now';
            
            return (
              <div key={match.id} className="bg-white dark:bg-card rounded-lg p-4 border border-red-100 dark:border-red-900">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm line-clamp-1">{match.title}</h4>
                    <Badge 
                      className={isLive ? 'bg-red-600 text-white animate-pulse' : 'bg-orange-600 text-white'}
                    >
                      {countdown}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(match.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>{match.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3 h-3" />
                      <span className="line-clamp-1">{match.venue}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs bg-gray-50 dark:bg-muted rounded p-2">
                    <strong>Teams:</strong> {match.teamInfo}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Bell className="w-3 h-3 mr-1" />
                      Remind Me
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {match.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {matches.length > 3 && (
          <div className="mt-6 text-center">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              View All Matches
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
