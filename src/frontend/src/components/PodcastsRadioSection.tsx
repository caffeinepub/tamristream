import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Radio, Podcast, Play, Pause, SkipForward, SkipBack, Volume2, Search, Clock, TrendingUp, Mic, Heart, Download, Share2, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PodcastEpisode {
  id: string;
  title: string;
  showName: string;
  host: string;
  description: string;
  duration: string;
  releaseDate: string;
  coverImage: string;
  audioUrl: string;
  category: string;
  playCount: number;
  rating: number;
}

interface RadioStation {
  id: string;
  name: string;
  genre: string;
  region: string;
  streamUrl: string;
  currentShow: string;
  listeners: number;
  coverImage: string;
}

export function PodcastsRadioSection() {
  const [activeTab, setActiveTab] = useState('podcasts');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [volume, setVolume] = useState([75]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const podcasts: PodcastEpisode[] = [
    {
      id: '1',
      title: 'The Rise of African Tech Startups',
      showName: 'African Innovation',
      host: 'Amara Okafor',
      description: 'Exploring the booming tech ecosystem across Africa and the entrepreneurs driving change.',
      duration: '45:30',
      releaseDate: '2 days ago',
      coverImage: '/assets/generated/podcast-creator-dashboard.dim_800x600.png',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      category: 'Business & Technology',
      playCount: 12500,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Traditional Music Meets Modern Beats',
      showName: 'Sounds of Africa',
      host: 'Kwame Mensah',
      description: 'A deep dive into how African musicians are blending traditional sounds with contemporary music.',
      duration: '38:15',
      releaseDate: '5 days ago',
      coverImage: '/assets/generated/african-music-albums.jpg',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      category: 'Music & Arts',
      playCount: 8900,
      rating: 4.9
    },
    {
      id: '3',
      title: 'African Cinema: Past, Present, Future',
      showName: 'Film Talk Africa',
      host: 'Zara Adeyemi',
      description: 'Discussing the evolution of African cinema and its growing global influence.',
      duration: '52:00',
      releaseDate: '1 week ago',
      coverImage: '/assets/generated/african-cinema-hero.jpg',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      category: 'Entertainment',
      playCount: 15200,
      rating: 4.7
    }
  ];

  const radioStations: RadioStation[] = [
    {
      id: '1',
      name: 'Afrobeats Live',
      genre: 'Afrobeats',
      region: 'West Africa',
      streamUrl: 'https://stream.zeno.fm/f3wvbbqmdg8uv',
      currentShow: 'Morning Vibes with DJ Kojo',
      listeners: 45000,
      coverImage: '/assets/generated/live-radio-interface.dim_800x600.png'
    },
    {
      id: '2',
      name: 'African Jazz Radio',
      genre: 'Jazz',
      region: 'Pan-African',
      streamUrl: 'https://stream.zeno.fm/0r0xa792kwzuv',
      currentShow: 'Smooth Jazz Evening',
      listeners: 28000,
      coverImage: '/assets/generated/african-music-artist-studio.jpg'
    },
    {
      id: '3',
      name: 'Lagos Talk FM',
      genre: 'Talk Radio',
      region: 'Nigeria',
      streamUrl: 'https://stream.zeno.fm/f3wvbbqmdg8uv',
      currentShow: 'The Morning Show',
      listeners: 62000,
      coverImage: '/assets/generated/podcast-streaming-interface.dim_800x600.png'
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && activeTab === 'podcasts') {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, activeTab]);

  useEffect(() => {
    // Setup audio event listeners
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      setAudioReady(true);
      setAudioError(null);
    };

    const handleError = () => {
      setIsLoading(false);
      setAudioError('Failed to load audio. Please try again.');
      setIsPlaying(false);
      toast.error('Audio playback error');
    };

    const handleEnded = () => {
      setIsPlaying(false);
      toast.info('Playback ended');
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handlePlayPause = async (id: string) => {
    setAudioError(null);
    
    try {
      if (currentTrack === id && isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
        toast.success('Paused');
      } else {
        const content = activeTab === 'podcasts' 
          ? podcasts.find(p => p.id === id)
          : radioStations.find(s => s.id === id);
        
        if (!content) return;

        const audioUrl = activeTab === 'podcasts' 
          ? (content as PodcastEpisode).audioUrl 
          : (content as RadioStation).streamUrl;

        if (audioRef.current) {
          setIsLoading(true);
          audioRef.current.src = audioUrl;
          audioRef.current.load();
          
          try {
            await audioRef.current.play();
            setCurrentTrack(id);
            setIsPlaying(true);
            toast.success(`Now playing: ${activeTab === 'podcasts' ? (content as PodcastEpisode).title : (content as RadioStation).name}`);
          } catch (error: any) {
            console.error('Playback error:', error);
            setIsLoading(false);
            setAudioError('Unable to play audio. Please check your connection.');
            toast.error('Failed to play audio');
          }
        }
      }
    } catch (error: any) {
      console.error('Audio error:', error);
      setIsLoading(false);
      setAudioError('Audio playback error occurred');
      toast.error('Failed to play audio');
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1.0, 1.25, 1.5, 1.75, 2.0];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    toast.success(`Playback speed: ${nextSpeed}x`);
  };

  const filteredPodcasts = podcasts.filter(podcast =>
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    podcast.showName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    podcast.host.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStations = radioStations.filter(station =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <audio ref={audioRef} preload="metadata" />
        
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Podcast className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Podcasts & Live Radio</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover African podcasts and tune into live radio stations from across the continent
          </p>
        </div>

        {audioError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{audioError}</AlertDescription>
          </Alert>
        )}

        {audioReady && currentTrack && !audioError && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Audio streaming active!</strong> Enjoy high-quality playback with full controls below.
            </AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <Alert>
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertDescription>
              Loading audio stream...
            </AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Podcast className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{podcasts.length}</div>
              <div className="text-sm text-muted-foreground">Podcast Shows</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Radio className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{radioStations.length}</div>
              <div className="text-sm text-muted-foreground">Live Stations</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">135k</div>
              <div className="text-sm text-muted-foreground">Total Listeners</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-muted-foreground">Always On</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search podcasts, shows, or radio stations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="podcasts">
              <Podcast className="w-4 h-4 mr-2" />
              Podcasts
            </TabsTrigger>
            <TabsTrigger value="radio">
              <Radio className="w-4 h-4 mr-2" />
              Live Radio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="podcasts" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPodcasts.map((podcast) => (
                <Card key={podcast.id} className="group hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <img
                      src={podcast.coverImage}
                      alt={podcast.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center rounded-t-lg">
                      <Button
                        size="lg"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                        onClick={() => handlePlayPause(podcast.id)}
                        disabled={isLoading}
                      >
                        {isLoading && currentTrack === podcast.id ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : currentTrack === podcast.id && isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6" />
                        )}
                      </Button>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        {podcast.duration}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <Badge variant="outline" className="mb-2">{podcast.category}</Badge>
                        <h3 className="font-semibold text-lg line-clamp-2">{podcast.title}</h3>
                        <p className="text-sm text-muted-foreground">{podcast.showName}</p>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {podcast.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Mic className="w-4 h-4" />
                          <span>{podcast.host}</span>
                        </div>
                        <span>{podcast.releaseDate}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button size="sm" variant="ghost">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="text-xs text-muted-foreground">{podcast.playCount.toLocaleString()} plays</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="radio" className="space-y-6">
            <Alert>
              <Radio className="h-4 w-4" />
              <AlertDescription>
                <strong>Live Streaming:</strong> All radio stations are broadcasting live 24/7. Click play to tune in!
              </AlertDescription>
            </Alert>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStations.map((station) => (
                <Card key={station.id} className="group hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <img
                      src={station.coverImage}
                      alt={station.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center rounded-t-lg">
                      <Button
                        size="lg"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                        onClick={() => handlePlayPause(station.id)}
                        disabled={isLoading}
                      >
                        {isLoading && currentTrack === station.id ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : currentTrack === station.id && isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6" />
                        )}
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-600 text-white animate-pulse">
                        <Radio className="w-3 h-3 mr-1" />
                        LIVE
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">{station.name}</h3>
                        <p className="text-sm text-muted-foreground">{station.genre} • {station.region}</p>
                      </div>
                      
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium text-foreground">Now Playing:</p>
                        <p className="text-sm text-muted-foreground">{station.currentShow}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <TrendingUp className="w-4 h-4" />
                          <span>{station.listeners.toLocaleString()} listeners</span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Player Controls */}
        {currentTrack && (
          <Card className="fixed bottom-0 left-0 right-0 border-t-2 border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            <CardContent className="p-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      {activeTab === 'podcasts' ? (
                        <Podcast className="w-8 h-8 text-primary" />
                      ) : (
                        <Radio className="w-8 h-8 text-primary animate-pulse" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {activeTab === 'podcasts' 
                          ? podcasts.find(p => p.id === currentTrack)?.title 
                          : radioStations.find(s => s.id === currentTrack)?.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {activeTab === 'podcasts' 
                          ? podcasts.find(p => p.id === currentTrack)?.host 
                          : radioStations.find(s => s.id === currentTrack)?.currentShow}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {activeTab === 'podcasts' && (
                      <Button size="icon" variant="ghost">
                        <SkipBack className="w-5 h-5" />
                      </Button>
                    )}
                    <Button 
                      size="icon" 
                      className="w-12 h-12"
                      onClick={() => currentTrack && handlePlayPause(currentTrack)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </Button>
                    {activeTab === 'podcasts' && (
                      <Button size="icon" variant="ghost">
                        <SkipForward className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {activeTab === 'podcasts' && (
                      <Button size="sm" variant="outline" onClick={handleSpeedChange}>
                        {playbackSpeed}x
                      </Button>
                    )}
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-5 h-5 text-muted-foreground" />
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="w-24"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
