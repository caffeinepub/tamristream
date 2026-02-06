import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Plus, Bell, MapPin } from 'lucide-react';
import { useGetAllMovies } from '../hooks/useQueries';
import { toast } from 'sonner';

interface MovieNight {
  id: string;
  title: string;
  movieTitle: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  host: string;
  invitees: string[];
  status: 'upcoming' | 'active' | 'completed';
}

// Sample movie nights data
const sampleMovieNights: MovieNight[] = [
  {
    id: '1',
    title: 'Hearts of Gold Watch Party',
    movieTitle: 'Hearts of Gold',
    description: 'Join us for an emotional journey through contemporary Lagos',
    scheduledDate: '2025-01-15',
    scheduledTime: '20:00',
    host: 'Movie Enthusiast',
    invitees: ['friend1', 'friend2', 'friend3'],
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Comedy Night: Lagos Laughs',
    movieTitle: 'Lagos Laughs',
    description: 'Get ready for a night of laughter and entertainment',
    scheduledDate: '2025-01-18',
    scheduledTime: '19:30',
    host: 'Comedy Lover',
    invitees: ['friend4', 'friend5'],
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Action Adventure Evening',
    movieTitle: 'Desert Warriors',
    description: 'Epic adventure in the Sahara awaits!',
    scheduledDate: '2025-01-22',
    scheduledTime: '21:00',
    host: 'Action Fan',
    invitees: ['friend6', 'friend7', 'friend8', 'friend9'],
    status: 'upcoming'
  }
];

export function MovieNightCalendar() {
  const [movieNights, setMovieNights] = useState<MovieNight[]>(sampleMovieNights);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<'calendar' | 'list'>('list');
  const { data: movies = [] } = useGetAllMovies();

  const [newMovieNight, setNewMovieNight] = useState({
    title: '',
    movieTitle: '',
    description: '',
    scheduledDate: '',
    scheduledTime: '',
    invitees: ''
  });

  const handleCreateMovieNight = () => {
    if (!newMovieNight.title || !newMovieNight.movieTitle || !newMovieNight.scheduledDate || !newMovieNight.scheduledTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    const movieNight: MovieNight = {
      id: Date.now().toString(),
      title: newMovieNight.title,
      movieTitle: newMovieNight.movieTitle,
      description: newMovieNight.description,
      scheduledDate: newMovieNight.scheduledDate,
      scheduledTime: newMovieNight.scheduledTime,
      host: 'You',
      invitees: newMovieNight.invitees.split(',').map(email => email.trim()).filter(email => email),
      status: 'upcoming'
    };

    setMovieNights(prev => [...prev, movieNight]);
    setNewMovieNight({
      title: '',
      movieTitle: '',
      description: '',
      scheduledDate: '',
      scheduledTime: '',
      invitees: ''
    });
    setIsCreateDialogOpen(false);
    toast.success('Movie Night scheduled successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const upcomingMovieNights = movieNights.filter(night => night.status === 'upcoming');
  const todaysDate = new Date().toISOString().split('T')[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Movie Night Calendar</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Schedule watch parties with friends and never miss a great movie night together.
            </p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Schedule Movie Night</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule New Movie Night</DialogTitle>
                <DialogDescription>
                  Create a scheduled watch party and invite your friends
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={newMovieNight.title}
                    onChange={(e) => setNewMovieNight(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Friday Night Movie"
                  />
                </div>

                <div>
                  <Label htmlFor="movie">Select Movie *</Label>
                  <Select value={newMovieNight.movieTitle} onValueChange={(value) => setNewMovieNight(prev => ({ ...prev, movieTitle: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a movie" />
                    </SelectTrigger>
                    <SelectContent>
                      {movies.map((movie) => (
                        <SelectItem key={movie.title} value={movie.title}>
                          {movie.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      min={todaysDate}
                      value={newMovieNight.scheduledDate}
                      onChange={(e) => setNewMovieNight(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newMovieNight.scheduledTime}
                      onChange={(e) => setNewMovieNight(prev => ({ ...prev, scheduledTime: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newMovieNight.description}
                    onChange={(e) => setNewMovieNight(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Add a description for your movie night..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="invitees">Invite Friends (comma-separated emails)</Label>
                  <Textarea
                    id="invitees"
                    value={newMovieNight.invitees}
                    onChange={(e) => setNewMovieNight(prev => ({ ...prev, invitees: e.target.value }))}
                    placeholder="friend1@email.com, friend2@email.com"
                    rows={2}
                  />
                </div>

                <Button onClick={handleCreateMovieNight} className="w-full">
                  Schedule Movie Night
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{upcomingMovieNights.length}</div>
                  <div className="text-sm text-muted-foreground">Upcoming Events</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {movieNights.reduce((sum, night) => sum + night.invitees.length, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Invitees</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Bell className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {movieNights.filter(night => night.status === 'completed').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed Events</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Movie Nights List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Scheduled Movie Nights</h2>
          </div>

          {movieNights.length === 0 ? (
            <Card className="border-0 bg-card/30">
              <CardContent className="text-center py-16">
                <img src="/assets/generated/movie-night-calendar.png" alt="Calendar" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No movie nights scheduled
                </h3>
                <p className="text-muted-foreground mb-4">
                  Create your first movie night and invite friends to join you.
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Movie Night
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {movieNights.map((movieNight) => (
                <Card key={movieNight.id} className="border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <CardTitle className="text-xl">{movieNight.title}</CardTitle>
                          <Badge className={getStatusColor(movieNight.status)}>
                            {movieNight.status.toUpperCase()}
                          </Badge>
                        </div>
                        <CardDescription className="text-base">
                          Watching: <span className="font-medium text-foreground">{movieNight.movieTitle}</span>
                        </CardDescription>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        Hosted by {movieNight.host}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {movieNight.description && (
                        <p className="text-muted-foreground">{movieNight.description}</p>
                      )}
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span className="text-sm">{formatDate(movieNight.scheduledDate)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-accent" />
                          <span className="text-sm">{formatTime(movieNight.scheduledTime)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-accent" />
                          <span className="text-sm">{movieNight.invitees.length} invitees</span>
                        </div>
                      </div>

                      {movieNight.status === 'upcoming' && (
                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" variant="outline">
                            <Bell className="w-4 h-4 mr-2" />
                            Set Reminder
                          </Button>
                          <Button size="sm" variant="outline">
                            <Users className="w-4 h-4 mr-2" />
                            Invite More
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
