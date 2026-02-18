import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ListMusic, Users, Heart, Play, Plus, Search, Filter, Music, Crown, Star } from 'lucide-react';
import { toast } from 'sonner';

interface CommunityPlaylist {
  id: string;
  name: string;
  creator: string;
  creatorAvatar?: string;
  description: string;
  musicVideoCount: number;
  followers: number;
  likes: number;
  isFollowing: boolean;
  isLiked: boolean;
  isPublic: boolean;
  category: string;
  thumbnailUrl: string;
  lastUpdated: Date;
  isFeatured: boolean;
}

const mockCommunityPlaylists: CommunityPlaylist[] = [
  {
    id: '1',
    name: 'Best of Nollywood Soundtracks',
    creator: 'Amara Okafor',
    description: 'A curated collection of the most memorable soundtracks from Nollywood films',
    musicVideoCount: 24,
    followers: 1247,
    likes: 892,
    isFollowing: true,
    isLiked: false,
    isPublic: true,
    category: 'Soundtracks',
    thumbnailUrl: '/assets/generated/community-playlist-mockup.png',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Afrobeats Rising Stars',
    creator: 'Kwame Asante',
    description: 'Discover the next generation of Afrobeats artists making waves across the continent',
    musicVideoCount: 18,
    followers: 856,
    likes: 634,
    isFollowing: false,
    isLiked: true,
    isPublic: true,
    category: 'Afrobeats',
    thumbnailUrl: '/assets/generated/community-playlist-mockup.png',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 6),
    isFeatured: false,
  },
  {
    id: '3',
    name: 'African Romance Movie Themes',
    creator: 'Fatima Diallo',
    description: 'Beautiful love songs and romantic themes from African cinema',
    musicVideoCount: 31,
    followers: 2156,
    likes: 1543,
    isFollowing: true,
    isLiked: true,
    isPublic: true,
    category: 'Romance',
    thumbnailUrl: '/assets/generated/community-playlist-mockup.png',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 12),
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Traditional Meets Modern',
    creator: 'Kofi Mensah',
    description: 'A fusion of traditional African music with contemporary sounds',
    musicVideoCount: 15,
    followers: 567,
    likes: 423,
    isFollowing: false,
    isLiked: false,
    isPublic: true,
    category: 'Fusion',
    thumbnailUrl: '/assets/generated/community-playlist-mockup.png',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isFeatured: false,
  },
];

export function CommunityPlaylistsSection() {
  const [playlists, setPlaylists] = useState(mockCommunityPlaylists);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');

  const categories = ['All', 'Soundtracks', 'Afrobeats', 'Romance', 'Fusion', 'Traditional'];

  const handleFollowPlaylist = (playlistId: string) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        const newFollowing = !playlist.isFollowing;
        const newFollowers = newFollowing ? playlist.followers + 1 : playlist.followers - 1;
        
        toast.success(
          newFollowing 
            ? `Following "${playlist.name}"` 
            : `Unfollowed "${playlist.name}"`
        );
        
        return {
          ...playlist,
          isFollowing: newFollowing,
          followers: newFollowers,
        };
      }
      return playlist;
    }));
  };

  const handleLikePlaylist = (playlistId: string) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        const newLiked = !playlist.isLiked;
        const newLikes = newLiked ? playlist.likes + 1 : playlist.likes - 1;
        
        return {
          ...playlist,
          isLiked: newLiked,
          likes: newLikes,
        };
      }
      return playlist;
    }));
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) {
      toast.error('Please enter a playlist name');
      return;
    }
    
    toast.success('Community playlist created successfully!');
    setNewPlaylistName('');
    setNewPlaylistDescription('');
  };

  const filteredPlaylists = playlists.filter(playlist => {
    const matchesSearch = playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         playlist.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         playlist.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || playlist.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPlaylists = filteredPlaylists.filter(p => p.isFeatured);
  const regularPlaylists = filteredPlaylists.filter(p => !p.isFeatured);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <ListMusic className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Community Playlists</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover and contribute to community-curated music playlists. Follow your favorites and collaborate with other music enthusiasts.
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
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
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Playlist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Community Playlist</DialogTitle>
                <DialogDescription>
                  Create a public playlist that others can follow and contribute to
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Playlist Name</label>
                  <Input
                    placeholder="Enter playlist name..."
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    placeholder="Describe your playlist..."
                    value={newPlaylistDescription}
                    onChange={(e) => setNewPlaylistDescription(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleCreatePlaylist}>
                    Create Playlist
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <ListMusic className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{playlists.length}</div>
                  <div className="text-sm text-muted-foreground">Total Playlists</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {playlists.reduce((sum, p) => sum + p.followers, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Followers</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {playlists.reduce((sum, p) => sum + p.likes, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Likes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Music className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {playlists.reduce((sum, p) => sum + p.musicVideoCount, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Music Videos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Playlists */}
        {featuredPlaylists.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              <h3 className="text-2xl font-bold text-foreground">Featured Playlists</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPlaylists.map((playlist) => (
                <Card key={playlist.id} className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border-yellow-500/20">
                  <div className="relative">
                    <img
                      src={playlist.thumbnailUrl}
                      alt={playlist.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-yellow-500 text-black">
                        <Crown className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        {playlist.musicVideoCount} videos
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{playlist.name}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {playlist.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={playlist.creatorAvatar} />
                          <AvatarFallback className="text-xs">
                            {playlist.creator.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{playlist.creator}</span>
                        <Badge variant="outline" className="text-xs">{playlist.category}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span>{playlist.followers.toLocaleString()} followers</span>
                          <span>{playlist.likes.toLocaleString()} likes</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant={playlist.isFollowing ? "default" : "outline"}
                            onClick={() => handleFollowPlaylist(playlist.id)}
                          >
                            <Users className="w-3 h-3 mr-1" />
                            {playlist.isFollowing ? 'Following' : 'Follow'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleLikePlaylist(playlist.id)}
                            className={playlist.isLiked ? 'text-red-500 border-red-500' : ''}
                          >
                            <Heart className={`w-3 h-3 ${playlist.isLiked ? 'fill-current' : ''}`} />
                          </Button>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Play className="w-3 h-3 mr-1" />
                          Play
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Playlists */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-foreground">
            {selectedCategory === 'All' ? 'All Playlists' : `${selectedCategory} Playlists`}
          </h3>
          
          {regularPlaylists.length === 0 ? (
            <Card className="border-0 bg-card/30">
              <CardContent className="text-center py-16">
                <ListMusic className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  {searchQuery ? 'No playlists found' : 'No playlists yet'}
                </h4>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? 'Try adjusting your search terms or category filter.'
                    : 'Be the first to create a community playlist!'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPlaylists.map((playlist) => (
                <Card key={playlist.id} className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all">
                  <div className="relative">
                    <img
                      src={playlist.thumbnailUrl}
                      alt={playlist.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        {playlist.musicVideoCount} videos
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{playlist.name}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {playlist.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={playlist.creatorAvatar} />
                          <AvatarFallback className="text-xs">
                            {playlist.creator.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{playlist.creator}</span>
                        <Badge variant="outline" className="text-xs">{playlist.category}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span>{playlist.followers.toLocaleString()} followers</span>
                          <span>{playlist.likes.toLocaleString()} likes</span>
                        </div>
                        <span>{playlist.lastUpdated.toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant={playlist.isFollowing ? "default" : "outline"}
                            onClick={() => handleFollowPlaylist(playlist.id)}
                          >
                            <Users className="w-3 h-3 mr-1" />
                            {playlist.isFollowing ? 'Following' : 'Follow'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleLikePlaylist(playlist.id)}
                            className={playlist.isLiked ? 'text-red-500 border-red-500' : ''}
                          >
                            <Heart className={`w-3 h-3 ${playlist.isLiked ? 'fill-current' : ''}`} />
                          </Button>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Play className="w-3 h-3 mr-1" />
                          Play
                        </Button>
                      </div>
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
