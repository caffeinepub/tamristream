import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Shuffle, 
  Repeat, 
  Volume2, 
  VolumeX,
  Search, 
  Plus, 
  Music, 
  Heart, 
  List, 
  Download,
  Share,
  MoreHorizontal,
  Headphones,
  TrendingUp,
  Clock,
  User,
  Album,
  Mic
} from 'lucide-react';
import { useGetAllMusicTracks, useSearchMusicTracks, useGetMusicPlaylists, useCreateMusicPlaylist, useAddMusicTrackToPlaylist, useGetAllArtistProfiles, type MusicTrack, type MusicPlaylist, type ArtistProfile } from '../hooks/useQueries';
import { useFileUrl } from '../blob-storage/FileStorage';
import { toast } from 'sonner';

interface CurrentTrack extends MusicTrack {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

export function MusicStreamingSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);
  const [queue, setQueue] = useState<MusicTrack[]>([]);
  const [volume, setVolume] = useState([75]);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('none');
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedArtist, setSelectedArtist] = useState<ArtistProfile | null>(null);
  const [showArtistDialog, setShowArtistDialog] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const { data: allMusicTracks = [] } = useGetAllMusicTracks();
  const { data: searchResults = [] } = useSearchMusicTracks(searchTerm);
  const { data: playlists = [] } = useGetMusicPlaylists();
  const { data: artists = [] } = useGetAllArtistProfiles();
  const createPlaylist = useCreateMusicPlaylist();
  const addToPlaylist = useAddMusicTrackToPlaylist();

  const musicTracks = searchTerm ? searchResults : allMusicTracks;

  const categories = [
    { id: 'all', label: 'All Music', count: musicTracks.length },
    { id: 'afrobeats', label: 'Afrobeats', count: musicTracks.filter(t => t.genre.toLowerCase().includes('afrobeats')).length },
    { id: 'highlife', label: 'Highlife', count: musicTracks.filter(t => t.genre.toLowerCase().includes('highlife')).length },
    { id: 'amapiano', label: 'Amapiano', count: musicTracks.filter(t => t.genre.toLowerCase().includes('amapiano')).length },
    { id: 'gospel', label: 'Gospel', count: musicTracks.filter(t => t.genre.toLowerCase().includes('gospel')).length },
  ];

  const filteredTracks = selectedCategory === 'all' 
    ? musicTracks 
    : musicTracks.filter(track => track.genre.toLowerCase().includes(selectedCategory));

  const trendingTracks = musicTracks.sort((a, b) => Number(b.playCount) - Number(a.playCount)).slice(0, 10);
  const recentTracks = musicTracks.sort((a, b) => Number(b.releaseDate) - Number(a.releaseDate)).slice(0, 10);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.volume = isMuted ? 0 : volume[0] / 100;
    }
  }, [volume, isMuted]);

  const handlePlayTrack = (track: MusicTrack) => {
    if (currentTrack?.title === track.title) {
      togglePlayPause();
    } else {
      setCurrentTrack({
        ...track,
        isPlaying: true,
        currentTime: 0,
        duration: 0,
      });
      setQueue([track, ...filteredTracks.filter(t => t.title !== track.title)]);
    }
  };

  const togglePlayPause = () => {
    if (currentTrack) {
      setCurrentTrack(prev => prev ? { ...prev, isPlaying: !prev.isPlaying } : null);
    }
  };

  const handleNextTrack = () => {
    if (queue.length > 1) {
      const nextTrack = queue[1];
      setCurrentTrack({
        ...nextTrack,
        isPlaying: true,
        currentTime: 0,
        duration: 0,
      });
      setQueue(prev => prev.slice(1));
    }
  };

  const handlePreviousTrack = () => {
    toast.info('Previous track functionality coming soon');
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) {
      toast.error('Please enter a playlist name');
      return;
    }

    try {
      await createPlaylist.mutateAsync({ name: newPlaylistName, isPublic: false });
      toast.success('Playlist created successfully');
      setNewPlaylistName('');
      setShowCreatePlaylist(false);
    } catch (error) {
      toast.error('Failed to create playlist');
    }
  };

  const handleAddToPlaylist = async (playlistName: string, trackTitle: string) => {
    try {
      await addToPlaylist.mutateAsync({ playlistName, musicTrackTitle: trackTitle });
      toast.success('Added to playlist');
    } catch (error) {
      toast.error('Failed to add to playlist');
    }
  };

  const handleArtistClick = (artistProfile: string) => {
    const artist = artists.find(a => a.name === artistProfile);
    if (artist) {
      setSelectedArtist(artist);
      setShowArtistDialog(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gradient-to-r from-primary/20 to-accent/20">
          <img
            src="/assets/generated/music-streaming-interface.jpg"
            alt="Music Streaming Banner"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-foreground">African Music Streaming</h1>
              <p className="text-lg text-muted-foreground">Stream unlimited African music with artist empowerment</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Headphones className="w-4 h-4" />
                  <span>High Quality Audio</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="w-4 h-4" />
                  <span>Offline Downloads</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>Support Artists</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search songs, artists, or albums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">All Songs</h2>
              <Button variant="outline" size="sm">
                <List className="w-4 h-4 mr-2" />
                View as List
              </Button>
            </div>
            
            <div className="space-y-2">
              {filteredTracks.map((track, index) => (
                <MusicTrackRow
                  key={track.title}
                  track={track}
                  index={index + 1}
                  isPlaying={Boolean(currentTrack?.title === track.title && currentTrack?.isPlaying)}
                  onPlay={() => handlePlayTrack(track)}
                  onAddToPlaylist={handleAddToPlaylist}
                  onArtistClick={() => handleArtistClick(track.artist)}
                  playlists={playlists}
                />
              ))}
            </div>

            {filteredTracks.length === 0 && (
              <div className="text-center py-12">
                <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No music tracks found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 'Try adjusting your search terms' : 'Music tracks will appear here once added'}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Trending Now</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trendingTracks.map((track) => (
                <MusicTrackCard
                  key={track.title}
                  track={track}
                  isPlaying={Boolean(currentTrack?.title === track.title && currentTrack?.isPlaying)}
                  onPlay={() => handlePlayTrack(track)}
                  onAddToPlaylist={handleAddToPlaylist}
                  onArtistClick={() => handleArtistClick(track.artist)}
                  playlists={playlists}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="artists" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Featured Artists</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {artists.map((artist) => (
                <ArtistCard
                  key={artist.name}
                  artist={artist}
                  onClick={() => {
                    setSelectedArtist(artist);
                    setShowArtistDialog(true);
                  }}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="playlists" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Your Music Playlists</h2>
            <Button onClick={() => setShowCreatePlaylist(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Playlist
            </Button>
          </div>

          {playlists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {playlists.map((playlist) => (
                <MusicPlaylistCard key={playlist.name} playlist={playlist} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <List className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No playlists yet</h3>
              <p className="text-muted-foreground mb-4">Create your first playlist to organize your favorite music</p>
              <Button onClick={() => setShowCreatePlaylist(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Playlist
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {currentTrack && (
        <MusicPlayer
          track={currentTrack}
          volume={volume}
          isMuted={isMuted}
          isShuffled={isShuffled}
          repeatMode={repeatMode}
          onPlayPause={togglePlayPause}
          onNext={handleNextTrack}
          onPrevious={handlePreviousTrack}
          onVolumeChange={setVolume}
          onMuteToggle={() => setIsMuted(!isMuted)}
          onShuffleToggle={() => setIsShuffled(!isShuffled)}
          onRepeatToggle={() => {
            const modes: ('none' | 'one' | 'all')[] = ['none', 'one', 'all'];
            const currentIndex = modes.indexOf(repeatMode);
            setRepeatMode(modes[(currentIndex + 1) % modes.length]);
          }}
          audioRef={audioRef}
        />
      )}

      <Dialog open={showCreatePlaylist} onOpenChange={setShowCreatePlaylist}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Playlist</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter playlist name..."
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreatePlaylist(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePlaylist} disabled={createPlaylist.isPending}>
                {createPlaylist.isPending ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ArtistDialog
        artist={selectedArtist}
        open={showArtistDialog}
        onOpenChange={setShowArtistDialog}
        tracks={musicTracks.filter(t => t.artist === selectedArtist?.name)}
        onPlayTrack={handlePlayTrack}
      />

      <audio ref={audioRef} />
    </div>
  );
}

interface MusicTrackRowProps {
  track: MusicTrack;
  index: number;
  isPlaying: boolean;
  onPlay: () => void;
  onAddToPlaylist: (playlistName: string, trackTitle: string) => void;
  onArtistClick: () => void;
  playlists: MusicPlaylist[];
}

function MusicTrackRow({ track, index, isPlaying, onPlay, onAddToPlaylist, onArtistClick, playlists }: MusicTrackRowProps) {
  const { data: coverUrl } = useFileUrl(track.coverImagePath);

  return (
    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 group">
      <div className="w-8 text-center text-sm text-muted-foreground group-hover:hidden">
        {index}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8 hidden group-hover:flex"
        onClick={onPlay}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </Button>
      
      <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
        <img
          src={coverUrl || `/assets/generated/${track.coverImagePath}`}
          alt={track.album}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-medium text-foreground truncate">{track.title}</div>
        <button
          onClick={onArtistClick}
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          {track.artist}
        </button>
      </div>
      
      <div className="hidden md:block text-sm text-muted-foreground truncate max-w-32">
        {track.album}
      </div>
      
      <div className="hidden lg:block text-sm text-muted-foreground">
        {Number(track.playCount).toLocaleString()} plays
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Heart className="w-4 h-4" />
        </Button>
        {playlists.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => onAddToPlaylist(playlists[0].name, track.title)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        )}
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

interface MusicTrackCardProps {
  track: MusicTrack;
  isPlaying: boolean;
  onPlay: () => void;
  onAddToPlaylist: (playlistName: string, trackTitle: string) => void;
  onArtistClick: () => void;
  playlists: MusicPlaylist[];
}

function MusicTrackCard({ track, isPlaying, onPlay, onAddToPlaylist, onArtistClick, playlists }: MusicTrackCardProps) {
  const { data: coverUrl } = useFileUrl(track.coverImagePath);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={coverUrl || `/assets/generated/${track.coverImagePath}`}
          alt={track.album}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            size="lg"
            className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
            onClick={onPlay}
          >
            {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white fill-white" />}
          </Button>
        </div>
        <Badge className="absolute top-2 right-2 bg-black/60 text-white">
          {track.genre}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground truncate">{track.title}</h3>
        <button
          onClick={onArtistClick}
          className="text-sm text-muted-foreground hover:text-foreground hover:underline truncate block"
        >
          {track.artist}
        </button>
        <p className="text-xs text-muted-foreground mt-1 truncate">{track.album}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="text-xs text-muted-foreground">
            {Number(track.playCount).toLocaleString()} plays
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ArtistCardProps {
  artist: ArtistProfile;
  onClick: () => void;
}

function ArtistCard({ artist, onClick }: ArtistCardProps) {
  const { data: photoUrl } = useFileUrl(artist.photoPath);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={onClick}>
      <CardContent className="p-6 text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={photoUrl || `/assets/generated/${artist.photoPath}`} />
            <AvatarFallback className="text-lg">
              {artist.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {artist.verified && (
            <Badge className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1">
              ✓
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-foreground mb-1">{artist.name}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{artist.bio}</p>
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <span>{Number(artist.followers).toLocaleString()} followers</span>
          <span>{artist.musicTrackIds?.length || 0} tracks</span>
        </div>
      </CardContent>
    </Card>
  );
}

interface MusicPlaylistCardProps {
  playlist: MusicPlaylist;
}

function MusicPlaylistCard({ playlist }: MusicPlaylistCardProps) {
  const trackCount = playlist.musicTrackIds?.length || 0;

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <List className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{playlist.name}</h4>
            <p className="text-sm text-muted-foreground">{trackCount} tracks</p>
            <div className="flex items-center space-x-2 mt-2">
              <Button variant="ghost" size="sm">
                <Play className="w-3 h-3 mr-1" />
                Play
              </Button>
              <Button variant="ghost" size="sm">
                <Shuffle className="w-3 h-3 mr-1" />
                Shuffle
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface MusicPlayerProps {
  track: CurrentTrack;
  volume: number[];
  isMuted: boolean;
  isShuffled: boolean;
  repeatMode: 'none' | 'one' | 'all';
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onVolumeChange: (value: number[]) => void;
  onMuteToggle: () => void;
  onShuffleToggle: () => void;
  onRepeatToggle: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

function MusicPlayer({
  track,
  volume,
  isMuted,
  isShuffled,
  repeatMode,
  onPlayPause,
  onNext,
  onPrevious,
  onVolumeChange,
  onMuteToggle,
  onShuffleToggle,
  onRepeatToggle,
  audioRef
}: MusicPlayerProps) {
  const { data: coverUrl } = useFileUrl(track.coverImagePath);
  const [progress, setProgress] = useState([0]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress([(audio.currentTime / audio.duration) * 100]);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [audioRef]);

  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      audio.currentTime = (value[0] / 100) * audio.duration;
      setProgress(value);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border p-4 z-40">
      <div className="container mx-auto">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="w-12 h-12 rounded-md overflow-hidden bg-muted shrink-0">
              <img
                src={coverUrl || `/assets/generated/${track.coverImagePath}`}
                alt={track.album}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="font-medium text-foreground truncate">{track.title}</div>
              <div className="text-sm text-muted-foreground truncate">{track.artist}</div>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onShuffleToggle}
                className={isShuffled ? 'text-primary' : ''}
              >
                <Shuffle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onPrevious}>
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="w-10 h-10 rounded-full"
                onClick={onPlayPause}
              >
                {track.isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={onNext}>
                <SkipForward className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onRepeatToggle}
                className={repeatMode !== 'none' ? 'text-primary' : ''}
              >
                <Repeat className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 w-full">
              <span className="text-xs text-muted-foreground">
                {formatTime(track.currentTime)}
              </span>
              <Slider
                value={progress}
                onValueChange={handleProgressChange}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground">
                {formatTime(track.duration)}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 min-w-0 flex-1 justify-end">
            <Button variant="ghost" size="icon" onClick={onMuteToggle}>
              {isMuted || volume[0] === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Slider
              value={isMuted ? [0] : volume}
              onValueChange={onVolumeChange}
              max={100}
              step={1}
              className="w-24"
            />
            <Button variant="ghost" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ArtistDialogProps {
  artist: ArtistProfile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tracks: MusicTrack[];
  onPlayTrack: (track: MusicTrack) => void;
}

function ArtistDialog({ artist, open, onOpenChange, tracks, onPlayTrack }: ArtistDialogProps) {
  const { data: photoUrl } = useFileUrl(artist?.photoPath || '');

  if (!artist) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={photoUrl || `/assets/generated/${artist.photoPath}`} />
              <AvatarFallback className="text-lg">
                {artist.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="flex items-center space-x-2">
                {artist.name}
                {artist.verified && (
                  <Badge className="bg-blue-500 text-white">Verified</Badge>
                )}
              </DialogTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{Number(artist.followers).toLocaleString()} followers</span>
                <span>{tracks.length} tracks</span>
                <span>${Number(artist.earnings).toLocaleString()} earned</span>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-muted-foreground">{artist.bio}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Tracks</h3>
            <div className="space-y-2">
              {tracks.slice(0, 10).map((track, index) => (
                <div
                  key={track.title}
                  className="flex items-center space-x-4 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => onPlayTrack(track)}
                >
                  <div className="w-6 text-center text-sm text-muted-foreground">
                    {index + 1}
                  </div>
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-muted">
                    <img
                      src={`/assets/generated/${track.coverImagePath}`}
                      alt={track.album}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">{track.title}</div>
                    <div className="text-sm text-muted-foreground truncate">{track.album}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Number(track.playCount).toLocaleString()}
                  </div>
                  <Button variant="ghost" size="icon">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
