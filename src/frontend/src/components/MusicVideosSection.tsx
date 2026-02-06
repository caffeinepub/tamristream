import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play, Search, Plus, Music, Heart, List, Shuffle } from 'lucide-react';
import { useGetAllMusicVideos, useSearchMusicVideos, useGetPlaylists, useCreatePlaylist, useAddMusicVideoToPlaylist, type MusicVideo, type Playlist } from '../hooks/useQueries';
import { useFileUrl } from '../blob-storage/FileStorage';
import { toast } from 'sonner';

export function MusicVideosSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<MusicVideo | null>(null);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: allMusicVideos = [] } = useGetAllMusicVideos();
  const { data: searchResults = [] } = useSearchMusicVideos(searchTerm);
  const { data: playlists = [] } = useGetPlaylists();
  const createPlaylist = useCreatePlaylist();
  const addToPlaylist = useAddMusicVideoToPlaylist();

  const musicVideos = searchTerm ? searchResults : allMusicVideos;

  const featuredPlaylists = [
    { name: 'Afrobeats Hits', count: 25, thumbnail: '/assets/generated/african-music-video-thumbnail.jpg' },
    { name: 'New Releases', count: 12, thumbnail: '/assets/generated/african-artist-performance.jpg' },
    { name: 'Classic African Music', count: 18, thumbnail: '/assets/generated/music-playlist-interface.png' },
  ];

  const categories = [
    { id: 'all', label: 'All Videos', count: musicVideos.length },
    { id: 'afrobeats', label: 'Afrobeats', count: musicVideos.filter(v => v.genre.toLowerCase().includes('afrobeats')).length },
    { id: 'highlife', label: 'Highlife', count: musicVideos.filter(v => v.genre.toLowerCase().includes('highlife')).length },
    { id: 'amapiano', label: 'Amapiano', count: musicVideos.filter(v => v.genre.toLowerCase().includes('amapiano')).length },
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? musicVideos 
    : musicVideos.filter(video => video.genre.toLowerCase().includes(selectedCategory));

  const handleVideoPlay = (video: MusicVideo) => {
    setSelectedVideo(video);
    setShowVideoDialog(true);
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) {
      toast.error('Please enter a playlist name');
      return;
    }

    try {
      await createPlaylist.mutateAsync(newPlaylistName);
      toast.success('Playlist created successfully');
      setNewPlaylistName('');
      setShowCreatePlaylist(false);
    } catch (error) {
      toast.error('Failed to create playlist');
    }
  };

  const handleAddToPlaylist = async (playlistName: string, videoTitle: string) => {
    try {
      await addToPlaylist.mutateAsync({ playlistName, musicVideoTitle: videoTitle });
      toast.success('Added to playlist');
    } catch (error) {
      toast.error('Failed to add to playlist');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gradient-to-r from-primary/20 to-accent/20">
          <img
            src="/assets/generated/african-artist-performance.jpg"
            alt="Music Videos Banner"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-foreground">African Music Videos</h1>
              <p className="text-lg text-muted-foreground">Discover the best of African music and culture</p>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search music videos, artists, or genres..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="videos">Music Videos</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <MusicVideoCard
                key={video.title}
                video={video}
                onPlay={() => handleVideoPlay(video)}
                onAddToPlaylist={handleAddToPlaylist}
                playlists={playlists}
              />
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No music videos found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try adjusting your search terms' : 'Music videos will appear here once added'}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="playlists" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Your Playlists</h2>
            <Button onClick={() => setShowCreatePlaylist(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Playlist
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Featured Playlists</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredPlaylists.map((playlist) => (
                <Card key={playlist.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={playlist.thumbnail}
                          alt={playlist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{playlist.name}</h4>
                        <p className="text-sm text-muted-foreground">{playlist.count} videos</p>
                        <Badge variant="secondary" className="mt-1">Featured</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Your Playlists</h3>
            {playlists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {playlists.map((playlist) => (
                  <PlaylistCard key={playlist.name} playlist={playlist} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <List className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No playlists yet</h3>
                <p className="text-muted-foreground mb-4">Create your first playlist to organize your favorite music videos</p>
                <Button onClick={() => setShowCreatePlaylist(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Playlist
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <VideoPlayerDialog
        video={selectedVideo}
        open={showVideoDialog}
        onOpenChange={setShowVideoDialog}
      />

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
    </div>
  );
}

interface MusicVideoCardProps {
  video: MusicVideo;
  onPlay: () => void;
  onAddToPlaylist: (playlistName: string, videoTitle: string) => void;
  playlists: Playlist[];
}

function MusicVideoCard({ video, onPlay, onAddToPlaylist, playlists }: MusicVideoCardProps) {
  const { data: thumbnailUrl } = useFileUrl(video.thumbnailPath);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnailUrl || `/assets/generated/${video.thumbnailPath}`}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            size="lg"
            className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
            onClick={onPlay}
          >
            <Play className="w-6 h-6 text-white fill-white" />
          </Button>
        </div>
        <Badge className="absolute top-2 right-2 bg-black/60 text-white">
          {video.genre}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground truncate">{video.title}</h3>
        <p className="text-sm text-muted-foreground truncate">{video.artist}</p>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{video.description}</p>
        <div className="flex items-center justify-between mt-3">
          <Button variant="ghost" size="sm">
            <Heart className="w-4 h-4 mr-1" />
            Like
          </Button>
          {playlists.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddToPlaylist(playlists[0].name, video.title)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface PlaylistCardProps {
  playlist: Playlist;
}

function PlaylistCard({ playlist }: PlaylistCardProps) {
  const videoCount = playlist.musicVideoIds ? playlist.musicVideoIds.length : 0;

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <List className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{playlist.name}</h4>
            <p className="text-sm text-muted-foreground">{videoCount} videos</p>
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

interface VideoPlayerDialogProps {
  video: MusicVideo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function VideoPlayerDialog({ video, open, onOpenChange }: VideoPlayerDialogProps) {
  const { data: videoUrl } = useFileUrl(video?.videoPath || '');

  if (!video) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{video.title} - {video.artist}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <video
              controls
              autoPlay
              className="w-full h-full"
              poster={`/assets/generated/${video.thumbnailPath}`}
            >
              <source src={videoUrl || `/assets/generated/${video.videoPath}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{video.title}</h3>
                <p className="text-muted-foreground">{video.artist}</p>
              </div>
              <Badge variant="outline">{video.genre}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{video.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
