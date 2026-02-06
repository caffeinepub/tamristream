import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Users, Play, Heart, Star, TrendingUp, Film, Music, Eye, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface Creator {
  id: string;
  name: string;
  type: 'filmmaker' | 'musician';
  avatar: string;
  bio: string;
  location: string;
  followers: number;
  totalViews: number;
  achievements: string[];
  recentWork: {
    title: string;
    thumbnail: string;
    views: number;
    rating: number;
  }[];
  isFollowing: boolean;
  isVerified: boolean;
}

export function CreatorSpotlightSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [creators, setCreators] = useState<Creator[]>([
    {
      id: '1',
      name: 'Amara Okafor',
      type: 'filmmaker',
      avatar: '/assets/generated/african-filmmaker.jpg',
      bio: 'Award-winning filmmaker from Lagos, Nigeria, specializing in contemporary African stories that bridge tradition and modernity.',
      location: 'Lagos, Nigeria',
      followers: 12500,
      totalViews: 2400000,
      achievements: ['Best Director - AMAA 2023', 'Rising Star Award', 'Cultural Impact Award'],
      recentWork: [
        {
          title: 'Hearts of Gold',
          thumbnail: '/assets/generated/african-drama-poster.jpg',
          views: 850000,
          rating: 4.8
        },
        {
          title: 'Lagos Stories',
          thumbnail: '/assets/generated/african-cinema-hero.jpg',
          views: 620000,
          rating: 4.6
        }
      ],
      isFollowing: false,
      isVerified: true
    },
    {
      id: '2',
      name: 'Kemi Adetiba',
      type: 'musician',
      avatar: '/assets/generated/african-musician-portrait.jpg',
      bio: 'Rising Afrobeats sensation from Accra, Ghana, blending traditional rhythms with contemporary sounds to create music that speaks to the soul.',
      location: 'Accra, Ghana',
      followers: 8900,
      totalViews: 1800000,
      achievements: ['Best New Artist - AFRIMA 2023', 'Breakthrough Artist', 'Cultural Ambassador'],
      recentWork: [
        {
          title: 'African Dreams',
          thumbnail: '/assets/generated/african-music-albums.jpg',
          views: 450000,
          rating: 4.9
        },
        {
          title: 'Rhythm of the Heart',
          thumbnail: '/assets/generated/african-music-video-thumbnail.jpg',
          views: 380000,
          rating: 4.7
        }
      ],
      isFollowing: true,
      isVerified: true
    },
    {
      id: '3',
      name: 'Kwame Asante',
      type: 'filmmaker',
      avatar: '/assets/generated/creator-spotlight-filmmaker.jpg',
      bio: 'Documentary filmmaker from Nairobi, Kenya, passionate about telling untold stories of African innovation and resilience.',
      location: 'Nairobi, Kenya',
      followers: 6700,
      totalViews: 950000,
      achievements: ['Documentary Excellence Award', 'Social Impact Recognition', 'Emerging Talent'],
      recentWork: [
        {
          title: 'Innovators of Africa',
          thumbnail: '/assets/generated/african-youth-watching.jpg',
          views: 320000,
          rating: 4.5
        }
      ],
      isFollowing: false,
      isVerified: false
    },
    {
      id: '4',
      name: 'Fatima Diallo',
      type: 'musician',
      avatar: '/assets/generated/creator-spotlight-musician.jpg',
      bio: 'Senegalese singer-songwriter combining traditional Wolof music with modern production, creating a unique sound that celebrates African heritage.',
      location: 'Dakar, Senegal',
      followers: 11200,
      totalViews: 1600000,
      achievements: ['World Music Award', 'Cultural Heritage Champion', 'International Recognition'],
      recentWork: [
        {
          title: 'Teranga Spirit',
          thumbnail: '/assets/generated/african-music-albums.jpg',
          views: 520000,
          rating: 4.8
        }
      ],
      isFollowing: false,
      isVerified: true
    }
  ]);

  const handleFollow = (creatorId: string) => {
    setCreators(prev => prev.map(creator => 
      creator.id === creatorId 
        ? { ...creator, isFollowing: !creator.isFollowing, followers: creator.isFollowing ? creator.followers - 1 : creator.followers + 1 }
        : creator
    ));
    
    const creator = creators.find(c => c.id === creatorId);
    if (creator) {
      toast.success(creator.isFollowing ? `Unfollowed ${creator.name}` : `Now following ${creator.name}!`);
    }
  };

  const handleSupport = (creatorId: string) => {
    const creator = creators.find(c => c.id === creatorId);
    if (creator) {
      toast.success(`Supporting ${creator.name}! Your contribution helps them create more amazing content.`);
    }
  };

  const filteredCreators = creators.filter(creator => 
    activeTab === 'all' || creator.type === activeTab
  );

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Award className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Creator Spotlight</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover and support emerging African filmmakers and musicians who are shaping the future of African entertainment.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="pt-6">
            <Film className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {creators.filter(c => c.type === 'filmmaker').length}
            </div>
            <div className="text-sm text-muted-foreground">Featured Filmmakers</div>
          </CardContent>
        </Card>

        <Card className="text-center border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardContent className="pt-6">
            <Music className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {creators.filter(c => c.type === 'musician').length}
            </div>
            <div className="text-sm text-muted-foreground">Rising Musicians</div>
          </CardContent>
        </Card>

        <Card className="text-center border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="pt-6">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {formatNumber(creators.reduce((sum, c) => sum + c.followers, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Total Followers</div>
          </CardContent>
        </Card>

        <Card className="text-center border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <CardContent className="pt-6">
            <Eye className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {formatNumber(creators.reduce((sum, c) => sum + c.totalViews, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </CardContent>
        </Card>
      </div>

      {/* Creator Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Creators</TabsTrigger>
          <TabsTrigger value="filmmaker">Filmmakers</TabsTrigger>
          <TabsTrigger value="musician">Musicians</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredCreators.map((creator) => (
              <Card key={creator.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={creator.avatar} alt={creator.name} />
                        <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {creator.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{creator.name}</h3>
                          <p className="text-sm text-muted-foreground">{creator.location}</p>
                        </div>
                        <Badge variant={creator.type === 'filmmaker' ? 'default' : 'secondary'}>
                          {creator.type === 'filmmaker' ? (
                            <><Film className="w-3 h-3 mr-1" />Filmmaker</>
                          ) : (
                            <><Music className="w-3 h-3 mr-1" />Musician</>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {creator.bio}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold text-foreground">{formatNumber(creator.followers)}</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold text-foreground">{formatNumber(creator.totalViews)}</div>
                      <div className="text-xs text-muted-foreground">Total Views</div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-yellow-500" />
                      Achievements
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {creator.achievements.slice(0, 2).map((achievement, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {achievement}
                        </Badge>
                      ))}
                      {creator.achievements.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{creator.achievements.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Recent Work */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                      Recent Work
                    </h4>
                    <div className="space-y-3">
                      {creator.recentWork.map((work, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 bg-muted/30 rounded-lg">
                          <img
                            src={work.thumbnail}
                            alt={work.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium text-sm text-foreground">{work.title}</h5>
                            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                              <span className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {formatNumber(work.views)}
                              </span>
                              <span className="flex items-center">
                                <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
                                {work.rating}
                              </span>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Play className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button
                      variant={creator.isFollowing ? "outline" : "default"}
                      onClick={() => handleFollow(creator.id)}
                      className="flex-1"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      {creator.isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSupport(creator.id)}
                      className="flex-1"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <Card className="border-0 bg-gradient-to-r from-primary/10 to-accent/10">
        <CardContent className="text-center py-8">
          <Award className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Are You a Creator?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our platform and showcase your talent to a global audience. Get discovered, build your following, and monetize your creative work.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Calendar className="w-4 h-4 mr-2" />
              Apply for Spotlight
            </Button>
            <Button variant="outline">
              <Film className="w-4 h-4 mr-2" />
              Creator Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
