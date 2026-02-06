import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, Users, MessageCircle, Video, Mic, Play, Clock, MapPin, Star, Plus, Search, Filter, Bell, Settings, Radio, Trophy, Gift, Zap, Camera, Music, Film } from 'lucide-react';
import { toast } from 'sonner';

interface InAppEvent {
  id: string;
  title: string;
  description: string;
  type: 'qa' | 'festival' | 'listening-party' | 'workshop' | 'premiere' | 'competition';
  host: string;
  hostAvatar: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  maxParticipants: number;
  currentParticipants: number;
  isLive: boolean;
  isVip: boolean;
  coverImage: string;
  tags: string[];
  price: number; // 0 for free
}

interface EventParticipant {
  id: string;
  name: string;
  avatar: string;
  role: 'host' | 'guest' | 'participant';
  joinedAt: Date;
}

interface ChatMessage {
  id: string;
  author: string;
  authorAvatar: string;
  message: string;
  timestamp: Date;
  isHighlighted: boolean;
}

export function InAppEventsSection() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<InAppEvent | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [isInEvent, setIsInEvent] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [newEventData, setNewEventData] = useState({
    title: '',
    description: '',
    type: 'qa' as InAppEvent['type'],
    startTime: '',
    duration: 60,
    maxParticipants: 100,
    isVip: false
  });

  // Mock data - would come from backend
  const events: InAppEvent[] = [
    {
      id: '1',
      title: 'Live Q&A with Hearts of Gold Director',
      description: 'Join director Amara Okafor for an exclusive Q&A session about the making of Hearts of Gold, behind-the-scenes stories, and upcoming projects.',
      type: 'qa',
      host: 'Amara Okafor',
      hostAvatar: '/assets/generated/african-filmmaker.jpg',
      startTime: new Date('2024-12-30T19:00:00'),
      endTime: new Date('2024-12-30T20:30:00'),
      duration: 90,
      maxParticipants: 500,
      currentParticipants: 247,
      isLive: false,
      isVip: false,
      coverImage: '/assets/generated/live-qa-event-interface.png',
      tags: ['Film', 'Director', 'Q&A', 'Hearts of Gold'],
      price: 0
    },
    {
      id: '2',
      title: 'Virtual African Film Festival Opening',
      description: 'Experience the grand opening of our virtual film festival featuring premieres, panel discussions, and exclusive screenings of the best African cinema.',
      type: 'festival',
      host: 'TamriStream Team',
      hostAvatar: '/assets/generated/app-logo.png',
      startTime: new Date('2024-12-31T18:00:00'),
      endTime: new Date('2024-12-31T22:00:00'),
      duration: 240,
      maxParticipants: 1000,
      currentParticipants: 678,
      isLive: false,
      isVip: true,
      coverImage: '/assets/generated/virtual-film-festival-interface.png',
      tags: ['Festival', 'Premiere', 'African Cinema', 'VIP'],
      price: 5
    },
    {
      id: '3',
      title: 'Afrobeats Listening Party with Kemi Adetiba',
      description: 'Join rising star Kemi Adetiba for an intimate listening session of her new album, complete with live commentary and fan interactions.',
      type: 'listening-party',
      host: 'Kemi Adetiba',
      hostAvatar: '/assets/generated/african-musician-portrait.jpg',
      startTime: new Date('2024-12-29T20:00:00'),
      endTime: new Date('2024-12-29T21:30:00'),
      duration: 90,
      maxParticipants: 200,
      currentParticipants: 156,
      isLive: true,
      isVip: false,
      coverImage: '/assets/generated/music-listening-party-interface.png',
      tags: ['Music', 'Afrobeats', 'Album Launch', 'Live'],
      price: 0
    },
    {
      id: '4',
      title: 'Filmmaking Workshop: From Script to Screen',
      description: 'Learn the fundamentals of African filmmaking from industry professionals. Covers scriptwriting, production, and post-production techniques.',
      type: 'workshop',
      host: 'Film Academy Africa',
      hostAvatar: '/assets/generated/creator-onboarding-workshop.jpg',
      startTime: new Date('2025-01-05T14:00:00'),
      endTime: new Date('2025-01-05T17:00:00'),
      duration: 180,
      maxParticipants: 50,
      currentParticipants: 32,
      isLive: false,
      isVip: false,
      coverImage: '/assets/generated/creator-onboarding-workshop.jpg',
      tags: ['Workshop', 'Education', 'Filmmaking', 'Professional'],
      price: 15
    }
  ];

  const liveEvents = events.filter(event => event.isLive);
  const upcomingEvents = events.filter(event => !event.isLive && event.startTime > new Date());
  const pastEvents = events.filter(event => !event.isLive && event.startTime < new Date());

  const eventParticipants: EventParticipant[] = [
    {
      id: '1',
      name: 'Amara Okafor',
      avatar: '/assets/generated/african-filmmaker.jpg',
      role: 'host',
      joinedAt: new Date('2024-12-28T19:00:00')
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: '/assets/generated/creator-spotlight-filmmaker.jpg',
      role: 'guest',
      joinedAt: new Date('2024-12-28T19:05:00')
    },
    {
      id: '3',
      name: 'Michael Chen',
      avatar: '/assets/generated/african-musician-portrait.jpg',
      role: 'participant',
      joinedAt: new Date('2024-12-28T19:10:00')
    }
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      author: 'Amara Okafor',
      authorAvatar: '/assets/generated/african-filmmaker.jpg',
      message: 'Welcome everyone! So excited to share the story behind Hearts of Gold with you all.',
      timestamp: new Date('2024-12-28T19:05:00'),
      isHighlighted: true
    },
    {
      id: '2',
      author: 'Sarah Johnson',
      authorAvatar: '/assets/generated/creator-spotlight-filmmaker.jpg',
      message: 'Thank you for this opportunity! The film was absolutely beautiful.',
      timestamp: new Date('2024-12-28T19:06:00'),
      isHighlighted: false
    },
    {
      id: '3',
      author: 'Michael Chen',
      authorAvatar: '/assets/generated/african-musician-portrait.jpg',
      message: 'What inspired the reconciliation scene? It was so powerful!',
      timestamp: new Date('2024-12-28T19:07:00'),
      isHighlighted: false
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleCreateEvent = () => {
    if (!newEventData.title.trim() || !newEventData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Mock creation - would call backend
    toast.success('Event created successfully!');
    setShowCreateDialog(false);
    setNewEventData({
      title: '',
      description: '',
      type: 'qa',
      startTime: '',
      duration: 60,
      maxParticipants: 100,
      isVip: false
    });
  };

  const handleJoinEvent = (event: InAppEvent) => {
    if (event.isLive) {
      setSelectedEvent(event);
      setIsInEvent(true);
      toast.success(`Joined ${event.title}!`);
    } else {
      toast.success(`RSVP confirmed for ${event.title}!`);
    }
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Mock message sending - would call backend
    toast.success('Message sent!');
    setChatMessage('');
  };

  const getEventTypeIcon = (type: InAppEvent['type']) => {
    switch (type) {
      case 'qa': return <MessageCircle className="w-4 h-4" />;
      case 'festival': return <Film className="w-4 h-4" />;
      case 'listening-party': return <Music className="w-4 h-4" />;
      case 'workshop': return <Video className="w-4 h-4" />;
      case 'premiere': return <Play className="w-4 h-4" />;
      case 'competition': return <Trophy className="w-4 h-4" />;
      default: return <CalendarDays className="w-4 h-4" />;
    }
  };

  const getEventTypeLabel = (type: InAppEvent['type']) => {
    switch (type) {
      case 'qa': return 'Q&A Session';
      case 'festival': return 'Film Festival';
      case 'listening-party': return 'Listening Party';
      case 'workshop': return 'Workshop';
      case 'premiere': return 'Premiere';
      case 'competition': return 'Competition';
      default: return 'Event';
    }
  };

  const EventCard = ({ event }: { event: InAppEvent }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={event.coverImage} 
          alt={event.title}
          className="w-full h-32 object-cover rounded-t-lg"
        />
        {event.isLive && (
          <Badge className="absolute top-2 right-2 bg-red-600 animate-pulse">
            <Radio className="w-3 h-3 mr-1" />
            LIVE
          </Badge>
        )}
        {event.isVip && (
          <Badge className="absolute top-2 left-2 bg-yellow-600">
            <Star className="w-3 h-3 mr-1" />
            VIP
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{event.title}</CardTitle>
            <CardDescription className="text-sm mt-1">
              {event.description.length > 100 
                ? `${event.description.substring(0, 100)}...` 
                : event.description
              }
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center space-x-2 mb-3">
          <Avatar className="w-6 h-6">
            <AvatarImage src={event.hostAvatar} />
            <AvatarFallback>{event.host[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">by {event.host}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {event.duration}m
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {event.currentParticipants}/{event.maxParticipants}
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            {getEventTypeIcon(event.type)}
            <span className="ml-1">{getEventTypeLabel(event.type)}</span>
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            {event.startTime.toLocaleDateString()} at {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {event.price > 0 && (
            <span className="font-semibold text-foreground">${event.price}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {event.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button 
          className="w-full" 
          size="sm"
          variant={event.isLive ? "default" : "outline"}
          onClick={() => handleJoinEvent(event)}
        >
          {event.isLive ? (
            <>
              <Radio className="w-4 h-4 mr-2" />
              Join Live
            </>
          ) : (
            <>
              <CalendarDays className="w-4 h-4 mr-2" />
              RSVP
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );

  const LiveEventView = ({ event }: { event: InAppEvent }) => (
    <div className="space-y-6">
      <div className="relative">
        <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
          <div className="text-center text-white">
            <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Live Event Stream</h3>
            <p className="text-sm opacity-75">Event is currently live</p>
          </div>
        </div>
        <Badge className="absolute top-4 right-4 bg-red-600 animate-pulse">
          <Radio className="w-3 h-3 mr-1" />
          LIVE
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
            <p className="text-muted-foreground mb-4">{event.description}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {event.currentParticipants} watching
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Started {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {eventParticipants.map((participant) => (
                  <div key={participant.id} className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback>{participant.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{participant.name}</span>
                        <Badge variant={participant.role === 'host' ? 'default' : participant.role === 'guest' ? 'secondary' : 'outline'}>
                          {participant.role}
                        </Badge>
                      </div>
                    </div>
                    {participant.role === 'host' && (
                      <Mic className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Live Chat</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-64 p-4">
                <div className="space-y-3">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`p-2 rounded ${message.isHighlighted ? 'bg-primary/10' : ''}`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={message.authorAvatar} />
                          <AvatarFallback>{message.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-semibold">{message.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm">{message.message}</p>
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
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              <Bell className="w-4 h-4 mr-2" />
              Follow
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isInEvent && selectedEvent) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setIsInEvent(false)}>
            ← Leave Event
          </Button>
        </div>
        <LiveEventView event={selectedEvent} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Live Events</h1>
            <p className="text-muted-foreground">
              Join live Q&As, virtual festivals, listening parties, and interactive workshops
            </p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create a New Event</DialogTitle>
                <DialogDescription>
                  Host your own live event for the community
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input
                    id="event-title"
                    value={newEventData.title}
                    onChange={(e) => setNewEventData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <Label htmlFor="event-description">Description</Label>
                  <Textarea
                    id="event-description"
                    value={newEventData.description}
                    onChange={(e) => setNewEventData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your event"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select 
                    value={newEventData.type} 
                    onValueChange={(value: InAppEvent['type']) => 
                      setNewEventData(prev => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="qa">Q&A Session</SelectItem>
                      <SelectItem value="festival">Film Festival</SelectItem>
                      <SelectItem value="listening-party">Listening Party</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="premiere">Premiere</SelectItem>
                      <SelectItem value="competition">Competition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="event-duration">Duration (minutes)</Label>
                    <Input
                      id="event-duration"
                      type="number"
                      value={newEventData.duration}
                      onChange={(e) => setNewEventData(prev => ({ ...prev, duration: parseInt(e.target.value) || 60 }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="event-participants">Max Participants</Label>
                    <Input
                      id="event-participants"
                      type="number"
                      value={newEventData.maxParticipants}
                      onChange={(e) => setNewEventData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) || 100 }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="event-time">Start Time</Label>
                  <Input
                    id="event-time"
                    type="datetime-local"
                    value={newEventData.startTime}
                    onChange={(e) => setNewEventData(prev => ({ ...prev, startTime: e.target.value }))}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="vip-event"
                    checked={newEventData.isVip}
                    onChange={(e) => setNewEventData(prev => ({ ...prev, isVip: e.target.checked }))}
                  />
                  <Label htmlFor="vip-event">VIP Event (Premium access required)</Label>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleCreateEvent} className="flex-1">
                    Create Event
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="live">Live Now</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="my-events">My Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          {liveEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Radio className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Live Events</h3>
              <p className="text-muted-foreground mb-4">
                Check back later for live events or browse upcoming events
              </p>
              <Button onClick={() => setActiveTab('upcoming')}>
                View Upcoming Events
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="qa">Q&A Sessions</SelectItem>
                <SelectItem value="festival">Film Festivals</SelectItem>
                <SelectItem value="listening-party">Listening Parties</SelectItem>
                <SelectItem value="workshop">Workshops</SelectItem>
                <SelectItem value="premiere">Premieres</SelectItem>
                <SelectItem value="competition">Competitions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.filter(event => {
              const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   event.description.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesType = selectedType === 'all' || event.type === selectedType;
              return matchesSearch && matchesType;
            }).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-events" className="space-y-6">
          <div className="text-center py-12">
            <CalendarDays className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Events Yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first event or RSVP to upcoming events
            </p>
            <div className="flex justify-center space-x-2">
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
              <Button variant="outline" onClick={() => setActiveTab('upcoming')}>
                Browse Events
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
