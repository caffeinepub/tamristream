import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ListMusic, Plus, Heart, Users, Play, Search, Filter, Star, Eye, Calendar, Music, Film, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface UserPlaylist {
  id: string;
  title: string;
  description: string;
  creator: string;
  creatorAvatar: string;
  type: 'movies' | 'music' | 'mixed';
  itemCount: number;
  followers: number;
  likes: number;
  isPublic: boolean;
  isFollowing: boolean;
  isLiked: boolean;
  createdAt: Date;
  updatedAt: Date;
  thumbnail: string;
  tags: string[];
  items: PlaylistItem[];
}

interface PlaylistItem {
  id: string;
  title: string;
  type: 'movie' | 'music';
  thumbnail: string;
  duration?: string;
  artist?: string;
  rating: number;
}

interface NewPlaylist {
  title: string;
  description: string;
  type: 'movies' | 'music' | 'mixed';
  isPublic: boolean;
  tags: string[];
}

export function UserGeneratedPlaylistsSection() {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState<NewPlaylist>({
    title: '',
    description: '',
    type: 'movies',
    isPublic: true,
    tags: []
  });

  const [playlists, setPlaylists] = useState<UserPlaylist[]>([
    {
      id: '1',
      title: 'Best of Nollywood 2024',
      description: 'A curated collection of the finest Nollywood films released this year, featuring outstanding performances and compelling stories.',
      creator: 'Amara Okafor',
      creatorAvatar: '/assets/generated/african-filmmaker.jpg',
      type: 'movies',
      itemCount: 12,
      followers: 1247,
      likes: 892,
      isPublic: true,
      isFollowing: false,
      isLiked: false,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-12-20'),
      thumbnail: '/assets/generated/user-generated-playlists-mockup.png',
      tags: ['Nollywood', '2024', 'Drama', 'Comedy'],
      items: [
        {
          id: '1',
          title: 'Hearts of Gold',
          type: 'movie',
          thumbnail: '/assets/generated/african-drama-poster.jpg',
          duration: '2h 15m',
          rating: 4.8
        },
        {
          id: '2',
          title: 'Lagos Laughs',
          type: 'movie',
          thumbnail: '/assets/generated/african-comedy-poster.jpg',
          duration: '1h 45m',
          rating: 4.6
        }
      ]
    },
    {
      id: '2',
      title: 'Afrobeats Essentials',
      description: 'The ultimate collection of Afrobeats tracks that define the genre. From classic hits to modern masterpieces.',
      creator: 'Kemi Adetiba',
      creatorAvatar: '/assets/generated/african-musician-portrait.jpg',
      type: 'music',
      itemCount: 25,
      followers: 2156,
      likes: 1834,
      isPublic: true,
      isFollowing: true,
      isLiked: true,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-12-18'),
      thumbnail: '/assets/generated/african-music-albums.jpg',
      tags: ['Afrobeats', 'Essential', 'Nigerian Music', 'Ghana'],
      items: [
        {
          id: '3',
          title: 'African Dreams',
          type: 'music',
          thumbnail: '/assets/generated/african-music-albums.jpg',
          duration: '3:45',
          artist: 'Kemi Adetiba',
          rating: 4.9
        },
        {
          id: '4',
          title: 'Lagos Vibes',
          type: 'music',
          thumbnail: '/assets/generated/african-music-video-thumbnail.jpg',
          duration: '4:12',
          artist: 'Burna Boy',
          rating: 4.7
        }
      ]
    },
    {
      id: '3',
      title: 'African Cinema Classics',
      description: 'Timeless African films that have shaped cinema across the continent. A journey through cinematic history.',
      creator: 'Kwame Asante',
      creatorAvatar: '/assets/generated/creator-spotlight-filmmaker.jpg',
      type: 'movies',
      itemCount: 18,
      followers: 856,
      likes: 634,
      isPublic: true,
      isFollowing: false,
      isLiked: false,
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-12-15'),
      thumbnail: '/assets/generated/african-cinema-hero.jpg',
      tags: ['Classic', 'African Cinema', 'History', 'Cultural'],
      items: []
    },
    {
      id: '4',
      title: 'Weekend Vibes Mix',
      description: 'Perfect blend of African movies and music for a relaxing weekend. Entertainment that celebrates our culture.',
      creator: 'Fatima Diallo',
      creatorAvatar: '/assets/generated/creator-spotlight-musician.jpg',
      type: 'mixed',
      itemCount: 30,
      followers: 1423,
      likes: 1156,
      isPublic: true,
      isFollowing: false,
      isLiked: false,
      createdAt: new Date('2024-04-05'),
      updatedAt: new Date('2024-12-22'),
      thumbnail: '/assets/generated/community-playlist-mockup.png',
      tags: ['Weekend', 'Mixed', 'Relaxing', 'Culture'],
      items: []
    }
  ]);

  const myPlaylists = playlists.slice(0, 2); // Mock user's playlists

  const handleFollowPlaylist = (playlistId: string) => {
    setPlaylists(prev => prev.map(playlist => 
      playlist.id === playlistId 
        ? { 
            ...playlist, 
            isFollowing: !playlist.isFollowing,
            followers: playlist.isFollowing ? playlist.followers - 1 : playlist.followers + 1
          }
        : playlist
    ));
    
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist) {
      toast.success(playlist.isFollowing ? `Unfollowed ${playlist.title}` : `Now following ${playlist.title}!`);
    }
  };

  const handleLikePlaylist = (playlistId: string) => {
    setPlaylists(prev => prev.map(playlist => 
      playlist.id === playlistId 
        ? { 
            ...playlist, 
            isLiked: !playlist.isLiked,
            likes: playlist.isLiked ? playlist.likes - 1 : playlist.likes + 1
          }
        : playlist
    ));
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylist.title.trim() || !newPlaylist.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const playlist: UserPlaylist = {
      id: Date.now().toString(),
      ...newPlaylist,
      creator: 'You',
      creatorAvatar: '/assets/generated/african-filmmaker.jpg',
      itemCount: 0,
      followers: 0,
      likes: 0,
      isFollowing: false,
      isLiked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      thumbnail: '/assets/generated/user-generated-playlists-mockup.png',
      items: []
    };

    setPlaylists(prev => [playlist, ...prev]);
    setShowCreateDialog(false);
    setNewPlaylist({
      title: '',
      description: '',
      type: 'movies',
      isPublic: true,
      tags: []
    });
    
    toast.success('Playlist created successfully!');
  };

  const filteredPlaylists = playlists.filter(playlist => {
    const matchesSearch = playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         playlist.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         playlist.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || playlist.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'movies': return <Film className="w-4 h-4" />;
      case 'music': return <Music className="w-4 h-4" />;
      case 'mixed': return <ListMusic className="w-4 h-4" />;
      default: return <ListMusic className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'movies': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'music': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'mixed': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const PlaylistCard = ({ playlist }: { playlist: UserPlaylist }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={playlist.thumbnail}
          alt={playlist.title}
          className="w-full h-32 object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <Button
            size="lg"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
          >
            <Play className="w-6 h-6" />
          </Button>
        </div>
        <div className="absolute top-2 left-2">
          <Badge className={`${getTypeColor(playlist.type)} border`}>
            {getTypeIcon(playlist.type)}
            <span className="ml-1 capitalize">{playlist.type}</span>
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/50 text-white">
            {playlist.itemCount} items
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {playlist.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {playlist.description}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={playlist.creatorAvatar} />
              <AvatarFallback>{playlist.creator[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">by {playlist.creator}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {formatNumber(playlist.followers)}
              </span>
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {formatNumber(playlist.likes)}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {playlist.updatedAt.toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {playlist.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {playlist.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{playlist.tags.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={playlist.isFollowing ? "default" : "outline"}
              size="sm"
              onClick={() => handleFollowPlaylist(playlist.id)}
              className="flex-1"
            >
              <Users className="w-4 h-4 mr-2" />
              {playlist.isFollowing ? 'Following' : 'Follow'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLikePlaylist(playlist.id)}
            >
              <Heart className={`w-4 h-4 ${playlist.isLiked ? 'fill-current text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <ListMusic className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Community Playlists</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover curated collections created by the community. Create your own playlists and share your favorite African movies and music.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="pt-6">
            <Film className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {playlists.filter(p => p.type === 'movies').length}
            </div>
            <div className="text-sm text-muted-foreground">Movie Playlists</div>
          </CardContent>
        </Card>

        <Card className="text-center border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardContent className="pt-6">
            <Music className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {playlists.filter(p => p.type === 'music').length}
            </div>
            <div className="text-sm text-muted-foreground">Music Playlists</div>
          </CardContent>
        </Card>

        <Card className="text-center border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="pt-6">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {formatNumber(playlists.reduce((sum, p) => sum + p.followers, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Total Followers</div>
          </CardContent>
        </Card>

        <Card className="text-center border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <CardContent className="pt-6">
            <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {playlists.filter(p => p.type === 'mixed').length}
            </div>
            <div className="text-sm text-muted-foreground">Mixed Playlists</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="my-playlists">My Playlists</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search playlists..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="movies">Movies</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
                
                <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Playlist
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Playlist</DialogTitle>
                      <DialogDescription>
                        Create a curated collection of your favorite African movies and music
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="playlist-title">Playlist Title</Label>
                        <Input
                          id="playlist-title"
                          value={newPlaylist.title}
                          onChange={(e) => setNewPlaylist(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter playlist title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="playlist-description">Description</Label>
                        <Textarea
                          id="playlist-description"
                          value={newPlaylist.description}
                          onChange={(e) => setNewPlaylist(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe your playlist"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="playlist-type">Type</Label>
                        <Select 
                          value={newPlaylist.type} 
                          onValueChange={(value: 'movies' | 'music' | 'mixed') => 
                            setNewPlaylist(prev => ({ ...prev, type: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="movies">Movies Only</SelectItem>
                            <SelectItem value="music">Music Only</SelectItem>
                            <SelectItem value="mixed">Movies & Music</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="public-playlist"
                          checked={newPlaylist.isPublic}
                          onChange={(e) => setNewPlaylist(prev => ({ ...prev, isPublic: e.target.checked }))}
                        />
                        <Label htmlFor="public-playlist">Make this playlist public</Label>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleCreatePlaylist} className="flex-1">
                          Create Playlist
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaylists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="following" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.filter(p => p.isFollowing).map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
            {playlists.filter(p => p.isFollowing).length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <ListMusic className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Followed Playlists</h3>
                  <p className="text-muted-foreground mb-4">
                    Follow playlists to see them here and get updates when they're updated
                  </p>
                  <Button onClick={() => setActiveTab('discover')}>
                    Discover Playlists
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="my-playlists" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myPlaylists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
            {myPlaylists.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <ListMusic className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Playlists Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first playlist to organize your favorite African movies and music
                  </p>
                  <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Playlist
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
