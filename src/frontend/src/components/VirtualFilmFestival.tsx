import { useState } from 'react';
import { Calendar, Video, MessageSquare, Users, Clock, Play, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

export function VirtualFilmFestival() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [rsvpStatus, setRsvpStatus] = useState<Record<string, boolean>>({});

  // Mock data for film festival events
  const festivalEvents = [
    {
      id: '1',
      title: 'Nollywood Premiere: The Last Dance',
      date: '2025-12-15',
      time: '19:00 UTC',
      duration: '120 min',
      type: 'Premiere',
      description: 'Join us for the exclusive premiere of this groundbreaking Nigerian drama.',
      attendees: 245,
      hasQA: true,
      speakers: ['Director: Kunle Afolayan', 'Lead Actor: Genevieve Nnaji'],
      thumbnail: '/assets/generated/virtual-film-festival-interface.png',
    },
    {
      id: '2',
      title: 'Q&A with African Filmmakers',
      date: '2025-12-18',
      time: '18:00 UTC',
      duration: '90 min',
      type: 'Q&A Session',
      description: 'Interactive discussion with award-winning African directors.',
      attendees: 180,
      hasQA: true,
      speakers: ['Wanuri Kahiu', 'Tsitsi Dangarembga', 'Abderrahmane Sissako'],
      thumbnail: '/assets/generated/guest-qa-interface.png',
    },
    {
      id: '3',
      title: 'Behind the Scenes: African Cinema',
      date: '2025-12-20',
      time: '20:00 UTC',
      duration: '60 min',
      type: 'Documentary',
      description: 'Explore the making of contemporary African films.',
      attendees: 156,
      hasQA: false,
      speakers: ['Host: Lupita Nyong\'o'],
      thumbnail: '/assets/generated/behind-the-scenes-filmmaking.jpg',
    },
  ];

  const handleRSVP = (eventId: string) => {
    setRsvpStatus({ ...rsvpStatus, [eventId]: true });
    toast.success('RSVP confirmed! You will receive a reminder before the event.');
  };

  const handleJoinEvent = (eventId: string) => {
    toast.info('Joining live event...');
    // In production, this would navigate to the live streaming interface
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <img
              src="/assets/generated/virtual-film-festival-interface.png"
              alt="Virtual Film Festival"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Virtual Film Festival
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Experience African cinema like never before with online premieres, live Q&A sessions, and exclusive behind-the-scenes content
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-zinc-800">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="live">Live Now</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {festivalEvents.map((event) => (
                <Card key={event.id} className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-amber-500 transition-colors">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-amber-500 text-black">
                      {event.type}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{event.title}</CardTitle>
                    <CardDescription className="text-zinc-400">
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time} • {event.duration}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-zinc-300">{event.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} attending</span>
                      </div>
                      {event.hasQA && (
                        <div className="flex items-center gap-2 text-sm text-amber-500">
                          <MessageSquare className="w-4 h-4" />
                          <span>Live Q&A included</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-zinc-500 font-semibold">Speakers:</p>
                      {event.speakers.map((speaker, idx) => (
                        <p key={idx} className="text-sm text-zinc-300">{speaker}</p>
                      ))}
                    </div>

                    {rsvpStatus[event.id] ? (
                      <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        RSVP Confirmed
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                        onClick={() => handleRSVP(event.id)}
                      >
                        RSVP Now
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  Live Event
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center space-y-4">
                    <Video className="w-16 h-16 text-zinc-600 mx-auto" />
                    <p className="text-zinc-400">No live events at the moment</p>
                    <Button
                      variant="outline"
                      className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                    >
                      View Schedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <div className="text-center py-12">
              <Play className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">Past events will be available for replay soon</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Event Section (for creators) */}
        <Card className="mt-12 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Host Your Own Event</CardTitle>
            <CardDescription className="text-zinc-400">
              Create a virtual premiere or Q&A session for your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="event-title" className="text-white">Event Title</Label>
                  <Input
                    id="event-title"
                    placeholder="Enter event title"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-type" className="text-white">Event Type</Label>
                  <Input
                    id="event-type"
                    placeholder="Premiere, Q&A, etc."
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="event-date" className="text-white">Date</Label>
                  <Input
                    id="event-date"
                    type="date"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-time" className="text-white">Time (UTC)</Label>
                  <Input
                    id="event-time"
                    type="time"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-description" className="text-white">Description</Label>
                <Textarea
                  id="event-description"
                  placeholder="Describe your event..."
                  className="bg-zinc-800 border-zinc-700 text-white min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                onClick={(e) => {
                  e.preventDefault();
                  toast.success('Event created successfully!');
                }}
              >
                Create Event
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
