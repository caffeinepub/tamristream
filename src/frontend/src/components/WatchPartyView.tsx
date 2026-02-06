import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowLeft, Users, Send, Heart, Smile, ThumbsUp, Play, Pause, Volume2, VolumeX, Laugh, Zap, Flame, Star } from 'lucide-react';
import { useGetWatchParty, useGetMovie } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useFileUrl } from '../blob-storage/FileStorage';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import type { WatchParty, ChatMessage } from '../backend';

interface WatchPartyViewProps {
  partyId: string;
  onBack: () => void;
}

interface EnhancedReaction {
  id: string;
  emoji: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  count: number;
}

interface ReactionFeedItem {
  id: string;
  user: string;
  reaction: string;
  timestamp: number;
  message?: string;
}

export function WatchPartyView({ partyId, onBack }: WatchPartyViewProps) {
  const { identity } = useInternetIdentity();
  const { data: watchParty, isLoading } = useGetWatchParty(partyId);
  const { data: movie } = useGetMovie(watchParty?.movieTitle || '');
  const { data: trailerUrl } = useFileUrl(movie?.trailerPath || '');
  
  const [chatMessage, setChatMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [reactionFeed, setReactionFeed] = useState<ReactionFeedItem[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentUser = identity?.getPrincipal();
  const isHost = watchParty && currentUser && watchParty.host.toString() === currentUser.toString();

  // Enhanced reactions with more options and animations
  const [reactions, setReactions] = useState<EnhancedReaction[]>([
    { id: 'love', emoji: '❤️', label: 'Love', icon: Heart, color: 'text-red-500', count: 12 },
    { id: 'laugh', emoji: '😂', label: 'Laugh', icon: Laugh, color: 'text-yellow-500', count: 8 },
    { id: 'like', emoji: '👍', label: 'Like', icon: ThumbsUp, color: 'text-blue-500', count: 15 },
    { id: 'wow', emoji: '😮', label: 'Wow', icon: Zap, color: 'text-purple-500', count: 5 },
    { id: 'fire', emoji: '🔥', label: 'Fire', icon: Flame, color: 'text-orange-500', count: 9 },
    { id: 'star', emoji: '⭐', label: 'Amazing', icon: Star, color: 'text-yellow-400', count: 7 }
  ]);

  // Mock chat messages for demo (in real implementation, this would come from backend)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: watchParty?.host || currentUser!,
      message: "Welcome to the watch party! 🎬 Let's enjoy this amazing movie together!",
      timestamp: BigInt(Date.now() * 1000000)
    }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Auto-clear reaction feed items after 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setReactionFeed(prev => prev.filter(item => Date.now() - item.timestamp < 5000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = () => {
    if (!chatMessage.trim() || !currentUser) return;

    const newMessage: ChatMessage = {
      sender: currentUser,
      message: chatMessage.trim(),
      timestamp: BigInt(Date.now() * 1000000)
    };

    setChatHistory(prev => [...prev, newMessage]);
    setChatMessage('');
    
    // In real implementation, this would send to backend
    toast.success('Message sent');
  };

  const handleReaction = (reactionId: string) => {
    const reaction = reactions.find(r => r.id === reactionId);
    if (!reaction) return;

    // Update reaction count
    setReactions(prev => prev.map(r => 
      r.id === reactionId ? { ...r, count: r.count + 1 } : r
    ));

    // Add to reaction feed
    const feedItem: ReactionFeedItem = {
      id: Date.now().toString(),
      user: 'You',
      reaction: reaction.emoji,
      timestamp: Date.now()
    };
    setReactionFeed(prev => [...prev, feedItem]);

    // Close reaction picker
    setShowReactionPicker(false);

    // In real implementation, this would send reaction to backend
    toast.success(`Reacted with ${reaction.emoji}`);
  };

  const handleQuickReaction = (reactionId: string, message?: string) => {
    const reaction = reactions.find(r => r.id === reactionId);
    if (!reaction) return;

    // Update reaction count
    setReactions(prev => prev.map(r => 
      r.id === reactionId ? { ...r, count: r.count + 1 } : r
    ));

    // Add to reaction feed with optional message
    const feedItem: ReactionFeedItem = {
      id: Date.now().toString(),
      user: 'You',
      reaction: reaction.emoji,
      timestamp: Date.now(),
      message
    };
    setReactionFeed(prev => [...prev, feedItem]);

    // Add to chat if there's a message
    if (message && currentUser) {
      const chatMessage: ChatMessage = {
        sender: currentUser,
        message: `${reaction.emoji} ${message}`,
        timestamp: BigInt(Date.now() * 1000000)
      };
      setChatHistory(prev => [...prev, chatMessage]);
    }

    toast.success(`Reacted with ${reaction.emoji}${message ? ' and comment' : ''}`);
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);

    // In real implementation, this would sync with all participants
    if (isHost) {
      toast.success(`${isPlaying ? 'Paused' : 'Playing'} for all participants`);
    }
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="aspect-video bg-gray-200 rounded"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!watchParty || !movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Watch Party Not Found</h2>
        <p className="text-muted-foreground mb-6">This watch party may have ended or doesn't exist.</p>
        <Button onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Movies
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{movie.title}</h1>
            <p className="text-muted-foreground">Watch Party</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Users className="w-3 h-3 mr-1" />
            3 watching
          </Badge>
          {isHost && (
            <Badge variant="outline">Host</Badge>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {trailerUrl ? (
              <video
                ref={videoRef}
                className="w-full h-full"
                poster={`/assets/generated/${movie.coverImagePath}`}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={trailerUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={`/assets/generated/${movie.coverImagePath}`}
                  alt={movie.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
            
            {/* Floating Reaction Feed */}
            <div className="absolute top-4 right-4 space-y-2 max-w-xs">
              {reactionFeed.slice(-5).map((item) => (
                <div
                  key={item.id}
                  className="bg-black/70 text-white px-3 py-2 rounded-lg text-sm animate-in slide-in-from-right-5 fade-in duration-300"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{item.reaction}</span>
                    <span className="font-medium">{item.user}</span>
                  </div>
                  {item.message && (
                    <p className="text-xs text-gray-300 mt-1">{item.message}</p>
                  )}
                </div>
              ))}
            </div>
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  {isHost && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePlayPause}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMuteToggle}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <span className="text-sm">{formatTime(currentTime)}</span>
                </div>
                {!isHost && (
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Host controls playback
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Reactions Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {reactions.slice(0, 3).map((reaction) => (
                <Button
                  key={reaction.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleReaction(reaction.id)}
                  className="flex items-center space-x-2 hover:scale-105 transition-transform"
                >
                  <span className="text-lg">{reaction.emoji}</span>
                  <span className="text-sm">{reaction.count}</span>
                </Button>
              ))}
              
              <Popover open={showReactionPicker} onOpenChange={setShowReactionPicker}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="px-3">
                    <Smile className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Choose your reaction</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {reactions.map((reaction) => (
                        <Button
                          key={reaction.id}
                          variant="ghost"
                          onClick={() => handleReaction(reaction.id)}
                          className="flex flex-col items-center space-y-1 h-auto py-3 hover:bg-primary/10"
                        >
                          <span className="text-2xl">{reaction.emoji}</span>
                          <span className="text-xs">{reaction.label}</span>
                          <span className="text-xs text-muted-foreground">{reaction.count}</span>
                        </Button>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Quick reactions with comments</h5>
                      <div className="space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuickReaction('fire', 'This scene is incredible!')}
                          className="w-full justify-start text-sm"
                        >
                          🔥 This scene is incredible!
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuickReaction('laugh', 'So funny!')}
                          className="w-full justify-start text-sm"
                        >
                          😂 So funny!
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuickReaction('wow', 'Did not see that coming!')}
                          className="w-full justify-start text-sm"
                        >
                          😮 Did not see that coming!
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center space-x-2">
              <img src="/assets/generated/enhanced-reactions-interface.png" alt="Enhanced Reactions" className="w-6 h-6 opacity-50" />
              <span className="text-sm text-muted-foreground">Enhanced reactions active</span>
            </div>
          </div>
        </div>

        {/* Chat and Participants */}
        <div className="space-y-6">
          {/* Participants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Participants</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">H</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Host</span>
                <Badge variant="outline" className="text-xs">Host</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">U1</AvatarFallback>
                </Avatar>
                <span className="text-sm">User 1</span>
                <div className="flex space-x-1">
                  <span className="text-xs">❤️</span>
                  <span className="text-xs">😂</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">U2</AvatarFallback>
                </Avatar>
                <span className="text-sm">User 2</span>
                <div className="flex space-x-1">
                  <span className="text-xs">👍</span>
                  <span className="text-xs">🔥</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat */}
          <Card className="flex flex-col h-96">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Chat & Reactions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-4">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-3">
                  {chatHistory.map((message, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Avatar className="w-6 h-6 shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {message.sender.toString() === watchParty.host.toString() ? 'H' : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium">
                            {message.sender.toString() === watchParty.host.toString() ? 'Host' : 'User'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(Number(message.timestamp / BigInt(1000000))).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-foreground break-words">{message.message}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </ScrollArea>
              
              <Separator />
              
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message or reaction..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
