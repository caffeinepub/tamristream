import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Users, Bell, Search, Film, Music, Star, Heart, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface Creator {
  id: string;
  name: string;
  avatar?: string;
  bio: string;
  specialties: string[];
  followers: number;
  moviesCount: number;
  musicVideosCount: number;
  rating: number;
  isFollowing: boolean;
  isVerified: boolean;
  lastActive: Date;
  recentWork: string[];
}

interface Notification {
  id: string;
  creatorName: string;
  creatorAvatar?: string;
  type: 'new_movie' | 'new_music' | 'announcement' | 'live_event';
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
}

const mockCreators: Creator[] = [
  {
    id: '1',
    name: 'Nia DaCosta',
    bio: 'Award-winning director known for powerful storytelling and visual excellence in African cinema.',
    specialties: ['Drama', 'Fantasy', 'Historical'],
    followers: 15420,
    moviesCount: 8,
    musicVideosCount: 3,
    rating: 4.8,
    isFollowing: true,
    isVerified: true,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2),
    recentWork: ['Echoes of Ancestral Wisdom', 'The Golden Path', 'Voices of Tomorrow'],
  },
  {
    id: '2',
    name: 'Kwame Kwei-Armah',
    bio: 'Celebrated filmmaker and playwright bringing Ghanaian stories to the global stage.',
    specialties: ['Historical Drama', 'Biography', 'Cultural'],
    followers: 12890,
    moviesCount: 12,
    musicVideosCount: 1,
    rating: 4.7,
    isFollowing: true,
    isVerified: true,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 6),
    recentWork: ['The Golden Coast Chronicles', 'Independence Day', 'Heritage'],
  },
  {
    id: '3',
    name: 'Amara Okafor',
    bio: 'Rising star in Nollywood, known for authentic performances and compelling narratives.',
    specialties: ['Romance', 'Comedy', 'Drama'],
    followers: 8750,
    moviesCount: 6,
    musicVideosCount: 5,
    rating: 4.6,
    isFollowing: false,
    isVerified: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 12),
    recentWork: ['Hearts of Gold', 'Lagos Love Story', 'Modern Family'],
  },
  {
    id: '4',
    name: 'Burna Boy',
    bio: 'Grammy-winning artist and music video creator, bringing Afrobeats to the world.',
    specialties: ['Afrobeats', 'Music Videos', 'Live Performances'],
    followers: 25600,
    moviesCount: 2,
    musicVideosCount: 18,
    rating: 4.9,
    isFollowing: false,
    isVerified: true,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24),
    recentWork: ['Lagos Nights', 'African Giant', 'Ye'],
  },
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    creatorName: 'Nia DaCosta',
    type: 'new_movie',
    title: 'New Movie Release',
    description: 'Just released "Echoes of Ancestral Wisdom" - a mystical journey through African traditions.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isRead: false,
  },
  {
    id: '2',
    creatorName: 'Kwame Kwei-Armah',
    type: 'announcement',
    title: 'Behind the Scenes',
    description: 'Sharing exclusive behind-the-scenes content from "The Golden Coast Chronicles".',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    isRead: false,
  },
  {
    id: '3',
    creatorName: 'Burna Boy',
    type: 'new_music',
    title: 'New Music Video',
    description: 'Check out my latest music video "Lagos Nights" featuring stunning visuals.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    isRead: true,
  },
];

export function CreatorFollowingSection() {
  const [creators, setCreators] = useState(mockCreators);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = ['All', 'Drama', 'Comedy', 'Romance', 'Historical', 'Afrobeats', 'Music Videos'];

  const handleFollowCreator = (creatorId: string) => {
    setCreators(prev => prev.map(creator => {
      if (creator.id === creatorId) {
        const newFollowing = !creator.isFollowing;
        const newFollowers = newFollowing ? creator.followers + 1 : creator.followers - 1;
        
        toast.success(
          newFollowing 
            ? `Now following ${creator.name}` 
            : `Unfollowed ${creator.name}`
        );
        
        return {
          ...creator,
          isFollowing: newFollowing,
          followers: newFollowers,
        };
      }
      return creator;
    }));
  };

  const handleMarkNotificationRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || 
                            creator.specialties.some(s => s.includes(selectedSpecialty));
    
    return matchesSearch && matchesSpecialty;
  });

  const followingCreators = creators.filter(c => c.isFollowing);
  const unreadNotifications = notifications.filter(n => !n.isRead);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_movie':
        return Film;
      case 'new_music':
        return Music;
      case 'live_event':
        return Calendar;
      default:
        return Bell;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <UserPlus className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Creator Following</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Follow your favorite African filmmakers and artists to stay updated on their latest work, announcements, and exclusive content.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{followingCreators.length}</div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Film className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {followingCreators.reduce((sum, c) => sum + c.moviesCount, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Movies</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Music className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {followingCreators.reduce((sum, c) => sum + c.musicVideosCount, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Music Videos</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <Bell className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{unreadNotifications.length}</div>
                  <div className="text-sm text-muted-foreground">Unread Updates</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="discover" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discover">Discover Creators</TabsTrigger>
            <TabsTrigger value="following">Following ({followingCreators.length})</TabsTrigger>
            <TabsTrigger value="updates">
              Updates {unreadNotifications.length > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {unreadNotifications.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search creators..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {specialties.map((specialty) => (
                  <Button
                    key={specialty}
                    variant={selectedSpecialty === specialty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSpecialty(specialty)}
                  >
                    {specialty}
                  </Button>
                ))}
              </div>
            </div>

            {/* Creators Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCreators.map((creator) => (
                <Card key={creator.id} className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={creator.avatar} />
                          <AvatarFallback>
                            {creator.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-foreground">{creator.name}</h4>
                            {creator.isVerified && (
                              <Badge variant="secondary" className="text-xs">
                                ✓ Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {creator.bio}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {creator.specialties.slice(0, 3).map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center text-sm">
                        <div>
                          <div className="font-semibold text-foreground">{creator.followers.toLocaleString()}</div>
                          <div className="text-muted-foreground">Followers</div>
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{creator.moviesCount}</div>
                          <div className="text-muted-foreground">Movies</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center space-x-1">
                            <Star className="w-3 h-3 fill-current text-yellow-500" />
                            <span className="font-semibold text-foreground">{creator.rating}</span>
                          </div>
                          <div className="text-muted-foreground">Rating</div>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        variant={creator.isFollowing ? "outline" : "default"}
                        onClick={() => handleFollowCreator(creator.id)}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        {creator.isFollowing ? 'Following' : 'Follow'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="following" className="space-y-6">
            {followingCreators.length === 0 ? (
              <Card className="border-0 bg-card/30">
                <CardContent className="text-center py-16">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    Not following anyone yet
                  </h4>
                  <p className="text-muted-foreground">
                    Discover and follow creators to see their latest updates here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {followingCreators.map((creator) => (
                  <Card key={creator.id} className="border-0 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={creator.avatar} />
                            <AvatarFallback>
                              {creator.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-foreground">{creator.name}</h4>
                              {creator.isVerified && (
                                <Badge variant="secondary" className="text-xs">
                                  ✓ Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Active {creator.lastActive.toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Recent Work:</h5>
                          <div className="space-y-1">
                            {creator.recentWork.slice(0, 2).map((work) => (
                              <p key={work} className="text-sm text-muted-foreground">
                                • {work}
                              </p>
                            ))}
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => handleFollowCreator(creator.id)}
                        >
                          Following
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="updates" className="space-y-6">
            {notifications.length === 0 ? (
              <Card className="border-0 bg-card/30">
                <CardContent className="text-center py-16">
                  <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    No updates yet
                  </h4>
                  <p className="text-muted-foreground">
                    Follow creators to receive updates about their latest work.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  
                  return (
                    <Card 
                      key={notification.id} 
                      className={`border-0 backdrop-blur-sm cursor-pointer transition-all ${
                        notification.isRead 
                          ? 'bg-card/30' 
                          : 'bg-primary/10 border border-primary/20'
                      }`}
                      onClick={() => handleMarkNotificationRead(notification.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${
                            notification.isRead 
                              ? 'bg-muted' 
                              : 'bg-primary/20'
                          }`}>
                            <IconComponent className={`w-5 h-5 ${
                              notification.isRead 
                                ? 'text-muted-foreground' 
                                : 'text-primary'
                            }`} />
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-foreground">{notification.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  by {notification.creatorName}
                                </p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {notification.timestamp.toLocaleDateString()}
                              </span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              {notification.description}
                            </p>
                            
                            {!notification.isRead && (
                              <Badge variant="default" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
