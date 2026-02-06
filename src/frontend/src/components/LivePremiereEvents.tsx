import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tv, Calendar, Users, MessageCircle, Play, Clock, Star, Gift, Mic, Video, Send, Heart, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner';

interface PremiereEvent {
  id: string;
  title: string;
  type: 'movie' | 'music' | 'documentary';
  creator: string;
  description: string;
  scheduledTime: string;
  duration: number; // in minutes
  attendees: number;
  maxAttendees?: number;
  status: 'upcoming' | 'live' | 'ended';
  thumbnailPath: string;
  features: string[];
  specialGuests: string[];
  isRSVPed: boolean;
  hasQA: boolean;
  chatEnabled: boolean;
  pollsEnabled: boolean;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  type: 'message' | 'reaction' | 'system';
}

interface LivePoll {
  id: string;
  question: string;
  options: string[];
  votes: number[];
  isActive: boolean;
}

export function LivePremiereEvents() {
  const [selectedEvent, setSelectedEvent] = useState<PremiereEvent | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock premiere events data
  const premiereEvents: PremiereEvent[] = [
    {
      id: '1',
      title: 'Nollywood Rising - World Premiere',
      type: 'movie',
      creator: 'Amara Okafor',
      description: 'Join us for the exclusive world premiere of the most anticipated African film of the year',
      scheduledTime: '2024-02-15T19:00:00Z',
      duration: 150,
      attendees: 1247,
      maxAttendees: 2000,
      status: 'upcoming',
      thumbnailPath: '/assets/generated/live-premiere-audience.jpg',
      features: ['Live Chat', 'Director Q&A', 'Behind-the-scenes', 'Exclusive Interviews'],
      specialGuests: ['Director Amara Okafor', 'Lead Actor Kwame Asante', 'Producer Sarah Johnson'],
      isRSVPed: true,
      hasQA: true,
      chatEnabled: true,
      pollsEnabled: true
    },
    {
      id: '2',
      title: 'Burna Boy: African Giant Documentary',
      type: 'documentary',
      creator: 'Burna Boy',
      description: 'Exclusive premiere of the documentary chronicling Burna Boy\'s rise to global stardom',
      scheduledTime: '2024-02-20T20:00:00Z',
      duration: 90,
      attendees: 892,
      maxAttendees: 1500,
      status: 'live',
      thumbnailPath: '/assets/generated/african-musician-portrait.jpg',
      features: ['Live Performance', 'Artist Q&A', 'Fan Meet & Greet', 'Exclusive Music'],
      specialGuests: ['Burna Boy', 'Grammy Producer Mike Dean', 'Music Journalist Adesola Gold'],
      isRSVPed: false,
      hasQA: true,
      chatEnabled: true,
      pollsEnabled: true
    },
    {
      id: '3',
      title: 'Kemi Adetiba - Acoustic Sessions',
      type: 'music',
      creator: 'Kemi Adetiba',
      description: 'Intimate acoustic performance featuring new songs and fan favorites',
      scheduledTime: '2024-02-25T18:00:00Z',
      duration: 60,
      attendees: 456,
      maxAttendees: 800,
      status: 'upcoming',
      thumbnailPath: '/assets/generated/african-music-artist-studio.jpg',
      features: ['Live Performance', 'Song Requests', 'Fan Chat', 'Exclusive Previews'],
      specialGuests: ['Kemi Adetiba', 'Producer Kel-P', 'Songwriter Tems'],
      isRSVPed: true,
      hasQA: false,
      chatEnabled: true,
      pollsEnabled: false
    },
    {
      id: '4',
      title: 'African Cinema Roundtable',
      type: 'documentary',
      creator: 'TamriStream',
      description: 'Panel discussion with leading African filmmakers about the future of cinema',
      scheduledTime: '2024-03-01T16:00:00Z',
      duration: 120,
      attendees: 234,
      status: 'upcoming',
      thumbnailPath: '/assets/generated/film-critic-curator.jpg',
      features: ['Panel Discussion', 'Audience Q&A', 'Industry Insights', 'Networking'],
      specialGuests: ['Genevieve Nnaji', 'Kunle Afolayan', 'Wanuri Kahiu', 'Haile Gerima'],
      isRSVPed: false,
      hasQA: true,
      chatEnabled: true,
      pollsEnabled: true
    }
  ];

  // Mock chat messages
  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      user: 'FilmLover23',
      message: 'So excited for this premiere! 🎬',
      timestamp: '19:45',
      type: 'message'
    },
    {
      id: '2',
      user: 'NollywoodFan',
      message: 'Been waiting for this movie all year!',
      timestamp: '19:46',
      type: 'message'
    },
    {
      id: '3',
      user: 'System',
      message: 'Director Amara Okafor has joined the chat',
      timestamp: '19:47',
      type: 'system'
    },
    {
      id: '4',
      user: 'CinemaQueen',
      message: '❤️ Love the trailer!',
      timestamp: '19:48',
      type: 'reaction'
    }
  ];

  // Mock live poll
  const livePoll: LivePoll = {
    id: '1',
    question: 'What\'s your favorite aspect of African cinema?',
    options: ['Storytelling', 'Cultural Authenticity', 'Music & Soundtrack', 'Visual Cinematography'],
    votes: [45, 32, 28, 19],
    isActive: true
  };

  const upcomingEvents = premiereEvents.filter(event => event.status === 'upcoming');
  const liveEvents = premiereEvents.filter(event => event.status === 'live');
  const endedEvents = premiereEvents.filter(event => event.status === 'ended');

  const handleRSVP = (eventId: string) => {
    toast.success('RSVP confirmed! You\'ll receive a reminder before the event starts.');
  };

  const handleJoinEvent = (event: PremiereEvent) => {
    if (event.status === 'live') {
      setSelectedEvent(event);
      toast.success(`Joined ${event.title}!`);
    } else {
      toast.info('Event is not currently live.');
    }
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      toast.success('Message sent!');
      setChatMessage('');
    }
  };

  const handlePollVote = (optionIndex: number) => {
    setSelectedPollOption(optionIndex);
    toast.success('Vote submitted!');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-red-600 text-white animate-pulse">🔴 LIVE</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-600 text-white">📅 Upcoming</Badge>;
      case 'ended':
        return <Badge className="bg-gray-600 text-white">⏹️ Ended</Badge>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'movie': return <Tv className="w-4 h-4" />;
      case 'music': return <Mic className="w-4 h-4" />;
      case 'documentary': return <Video className="w-4 h-4" />;
      default: return <Play className="w-4 h-4" />;
    }
  };

  const PremiereEventCard = ({ event }: { event: PremiereEvent }) => (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${
      event.status === 'live' ? 'border-red-200 bg-red-50/30' : 'border-border'
    }`}>
      <div className="relative">
        <img
          src={event.thumbnailPath}
          alt={event.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        
        <div className="absolute top-2 left-2">
          {getStatusBadge(event.status)}
        </div>
        
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-white/90">
            {getTypeIcon(event.type)}
            <span className="ml-1 capitalize">{event.type}</span>
          </Badge>
        </div>
        
        <div className="absolute bottom-2 left-2">
          <Badge className="bg-black/70 text-white">
            <Clock className="w-3 h-3 mr-1" />
            {event.duration}min
          </Badge>
        </div>
        
        <div className="absolute bottom-2 right-2">
          <Badge className="bg-black/70 text-white">
            <Users className="w-3 h-3 mr-1" />
            {event.attendees}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{event.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">by {event.creator}</p>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">
            {new Date(event.scheduledTime).toLocaleDateString()} at{' '}
            {new Date(event.scheduledTime).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {event.features.slice(0, 2).map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
          {event.features.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{event.features.length - 2} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  {getTypeIcon(event.type)}
                  <span>{event.title}</span>
                  {getStatusBadge(event.status)}
                </DialogTitle>
                <DialogDescription>
                  {event.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-hidden">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-4">
                  <img
                    src={event.thumbnailPath}
                    alt={event.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Event Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Creator:</span>
                          <span className="font-medium">{event.creator}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="font-medium">{event.duration} minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Attendees:</span>
                          <span className="font-medium">{event.attendees}</span>
                        </div>
                        {event.maxAttendees && (
                          <div className="flex justify-between">
                            <span>Capacity:</span>
                            <span className="font-medium">{event.maxAttendees}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Special Guests</h4>
                      <div className="space-y-1">
                        {event.specialGuests.map((guest, index) => (
                          <Badge key={index} variant="outline" className="block text-center text-xs">
                            {guest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.features.map((feature, index) => (
                        <Badge key={index} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Live Chat & Polls */}
                {event.status === 'live' && (
                  <div className="space-y-4">
                    {/* Live Chat */}
                    {event.chatEnabled && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center space-x-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>Live Chat</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <ScrollArea className="h-48 px-4">
                            <div className="space-y-2">
                              {chatMessages.map((msg) => (
                                <div key={msg.id} className="text-sm">
                                  {msg.type === 'system' ? (
                                    <div className="text-center text-muted-foreground italic">
                                      {msg.message}
                                    </div>
                                  ) : (
                                    <div>
                                      <span className="font-medium text-primary">
                                        {msg.user}
                                      </span>
                                      <span className="text-xs text-muted-foreground ml-2">
                                        {msg.timestamp}
                                      </span>
                                      <div className="mt-1">{msg.message}</div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                          <div className="p-4 border-t">
                            <div className="flex space-x-2">
                              <Input
                                placeholder="Type a message..."
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                              />
                              <Button size="sm" onClick={handleSendMessage}>
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Live Poll */}
                    {event.pollsEnabled && livePoll.isActive && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Live Poll</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <h4 className="font-medium mb-3">{livePoll.question}</h4>
                          <div className="space-y-2">
                            {livePoll.options.map((option, index) => (
                              <Button
                                key={index}
                                variant={selectedPollOption === index ? "default" : "outline"}
                                size="sm"
                                className="w-full justify-between"
                                onClick={() => handlePollVote(index)}
                              >
                                <span>{option}</span>
                                <span>{livePoll.votes[index]}%</span>
                              </Button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          
          {event.status === 'live' ? (
            <Button 
              size="sm" 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => handleJoinEvent(event)}
            >
              <Play className="w-4 h-4 mr-2" />
              Join Live
            </Button>
          ) : event.status === 'upcoming' ? (
            <Button 
              size="sm" 
              variant={event.isRSVPed ? "secondary" : "default"}
              onClick={() => handleRSVP(event.id)}
              className={!event.isRSVPed ? "bg-primary hover:bg-primary/90" : ""}
            >
              {event.isRSVPed ? (
                <>
                  <Star className="w-4 h-4 mr-2" />
                  RSVP'd
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 mr-2" />
                  RSVP
                </>
              )}
            </Button>
          ) : (
            <Button size="sm" variant="outline">
              <Play className="w-4 h-4 mr-2" />
              Watch Replay
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <Skeleton className="h-10 w-64" />
            </div>
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="text-center">
                <CardContent className="p-6">
                  <Skeleton className="w-8 h-8 mx-auto mb-2" />
                  <Skeleton className="h-8 w-16 mx-auto mb-1" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="w-full h-48 rounded-t-lg" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Tv className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Live Premiere Events</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join exclusive live premieres, Q&As, and special events with your favorite African creators
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              </div>
              <div className="text-2xl font-bold">{liveEvents.length}</div>
              <div className="text-sm text-muted-foreground">Live Now</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{upcomingEvents.length}</div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {premiereEvents.reduce((sum, event) => sum + event.attendees, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Attendees</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {premiereEvents.filter(event => event.isRSVPed).length}
              </div>
              <div className="text-sm text-muted-foreground">Your RSVPs</div>
            </CardContent>
          </Card>
        </div>

        {/* Live Events Alert */}
        {liveEvents.length > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-700">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <span>Live Events Happening Now!</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {liveEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg border">
                    <img
                      src={event.thumbnailPath}
                      alt={event.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.attendees} watching
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleJoinEvent(event)}
                    >
                      Join Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Events Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="live">
              Live ({liveEvents.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="ended">
              Ended ({endedEvents.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiereEvents.map((event) => (
                <PremiereEventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="live" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveEvents.map((event) => (
                <PremiereEventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <PremiereEventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="ended" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {endedEvents.map((event) => (
                <PremiereEventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
