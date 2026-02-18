import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Baby, Star, Trophy, Play, Search, Shield, Clock, Users, Gift, Zap, BookOpen, Gamepad2, Music, Film } from 'lucide-react';
import { toast } from 'sonner';

interface KidsContent {
  id: string;
  title: string;
  description: string;
  ageGroup: '3-6' | '7-10' | '11-13';
  type: 'movie' | 'educational' | 'music' | 'game';
  duration: string;
  rating: number;
  thumbnailUrl: string;
  isWatched: boolean;
  educationalValue: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  points: number;
}

interface ParentalControl {
  maxWatchTime: number;
  allowedAgeGroups: string[];
  contentFilters: string[];
  isEnabled: boolean;
}

export function KidsZoneSection() {
  const [activeTab, setActiveTab] = useState('content');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [watchTime, setWatchTime] = useState(45); // minutes watched today

  // Mock data
  const kidsContent: KidsContent[] = [
    {
      id: '1',
      title: 'Anansi the Spider Tales',
      description: 'Traditional West African folktales featuring the clever spider Anansi and his adventures.',
      ageGroup: '3-6',
      type: 'movie',
      duration: '25 min',
      rating: 4.9,
      thumbnailUrl: '/assets/generated/kids-movie-posters.jpg',
      isWatched: false,
      educationalValue: ['Cultural Heritage', 'Problem Solving', 'Storytelling']
    },
    {
      id: '2',
      title: 'African Animal Adventures',
      description: 'Learn about amazing African animals through fun songs and colorful animations.',
      ageGroup: '3-6',
      type: 'educational',
      duration: '30 min',
      rating: 4.8,
      thumbnailUrl: '/assets/generated/kids-educational-content.jpg',
      isWatched: true,
      educationalValue: ['Wildlife', 'Geography', 'Conservation']
    },
    {
      id: '3',
      title: 'Ubuntu: The Power of Togetherness',
      description: 'A heartwarming story about community, sharing, and the African philosophy of Ubuntu.',
      ageGroup: '7-10',
      type: 'movie',
      duration: '45 min',
      rating: 4.7,
      thumbnailUrl: '/assets/generated/kids-movie-posters.jpg',
      isWatched: false,
      educationalValue: ['Community Values', 'Empathy', 'African Philosophy']
    },
    {
      id: '4',
      title: 'African Rhythms for Kids',
      description: 'Interactive music videos teaching traditional African rhythms and instruments.',
      ageGroup: '7-10',
      type: 'music',
      duration: '20 min',
      rating: 4.6,
      thumbnailUrl: '/assets/generated/african-music-albums.jpg',
      isWatched: false,
      educationalValue: ['Music', 'Cultural Traditions', 'Rhythm']
    },
    {
      id: '5',
      title: 'Young Inventors of Africa',
      description: 'Meet inspiring young African inventors and learn about innovation and creativity.',
      ageGroup: '11-13',
      type: 'educational',
      duration: '35 min',
      rating: 4.8,
      thumbnailUrl: '/assets/generated/kids-educational-content.jpg',
      isWatched: false,
      educationalValue: ['Innovation', 'STEM', 'Inspiration']
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Culture Explorer',
      description: 'Watch 5 cultural content videos',
      icon: '🌍',
      progress: 3,
      maxProgress: 5,
      isUnlocked: false,
      points: 100
    },
    {
      id: '2',
      title: 'Animal Friend',
      description: 'Complete all animal-themed content',
      icon: '🦁',
      progress: 2,
      maxProgress: 3,
      isUnlocked: false,
      points: 150
    },
    {
      id: '3',
      title: 'Music Maker',
      description: 'Watch 3 music videos',
      icon: '🎵',
      progress: 1,
      maxProgress: 3,
      isUnlocked: false,
      points: 75
    },
    {
      id: '4',
      title: 'Story Listener',
      description: 'Complete your first story',
      icon: '📚',
      progress: 1,
      maxProgress: 1,
      isUnlocked: true,
      points: 50
    }
  ];

  const parentalControls: ParentalControl = {
    maxWatchTime: 60, // minutes per day
    allowedAgeGroups: ['3-6', '7-10'],
    contentFilters: ['Educational', 'Cultural'],
    isEnabled: true
  };

  const filteredContent = kidsContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAge = selectedAgeGroup === 'all' || content.ageGroup === selectedAgeGroup;
    return matchesSearch && matchesAge;
  });

  const handleWatchContent = (contentId: string) => {
    if (watchTime >= parentalControls.maxWatchTime) {
      toast.error('Daily watch time limit reached! Take a break and come back tomorrow.');
      return;
    }
    toast.success('Starting video! Enjoy learning!');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'movie': return <Film className="w-4 h-4" />;
      case 'educational': return <BookOpen className="w-4 h-4" />;
      case 'music': return <Music className="w-4 h-4" />;
      case 'game': return <Gamepad2 className="w-4 h-4" />;
      default: return <Play className="w-4 h-4" />;
    }
  };

  const getAgeGroupColor = (ageGroup: string) => {
    switch (ageGroup) {
      case '3-6': return 'bg-green-100 text-green-800 border-green-300';
      case '7-10': return 'bg-blue-100 text-blue-800 border-blue-300';
      case '11-13': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center">
              <Baby className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Kids Zone</h1>
              <p className="text-lg text-muted-foreground">Safe, Fun, Educational</p>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A safe and educational space for children to explore African culture, stories, and values through age-appropriate content with parental controls.
          </p>
        </div>

        {/* Watch Time & Parental Controls */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-foreground">{watchTime} min</div>
                  <div className="text-sm text-muted-foreground">Watched Today</div>
                  <Progress 
                    value={(watchTime / parentalControls.maxWatchTime) * 100} 
                    className="mt-2 h-2"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {parentalControls.maxWatchTime - watchTime} min remaining
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">Safe</div>
                  <div className="text-sm text-muted-foreground">Parental Controls Active</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Age-appropriate content only
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {achievements.filter(a => a.isUnlocked).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Achievements Earned</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Keep learning to earn more!
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="trivia">Fun Trivia</TabsTrigger>
              <TabsTrigger value="parents">For Parents</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for fun content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedAgeGroup === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedAgeGroup('all')}
                  >
                    All Ages
                  </Button>
                  <Button
                    variant={selectedAgeGroup === '3-6' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedAgeGroup('3-6')}
                  >
                    3-6 years
                  </Button>
                  <Button
                    variant={selectedAgeGroup === '7-10' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedAgeGroup('7-10')}
                  >
                    7-10 years
                  </Button>
                  <Button
                    variant={selectedAgeGroup === '11-13' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedAgeGroup('11-13')}
                  >
                    11-13 years
                  </Button>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.map((content) => (
                  <Card key={content.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <img
                        src={content.thumbnailUrl}
                        alt={content.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className={`${getAgeGroupColor(content.ageGroup)} border`}>
                          Ages {content.ageGroup}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-black/50 text-white">
                          {content.duration}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <Button
                          size="lg"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                          onClick={() => handleWatchContent(content.id)}
                        >
                          <Play className="w-6 h-6" />
                        </Button>
                      </div>
                      {content.isWatched && (
                        <div className="absolute bottom-2 right-2">
                          <Badge className="bg-green-600 text-white">
                            ✓ Watched
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-lg line-clamp-1">{content.title}</h3>
                          <Badge variant="outline" className="ml-2">
                            {getTypeIcon(content.type)}
                            <span className="ml-1 capitalize">{content.type}</span>
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {content.description}
                        </p>
                        
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-current text-yellow-500" />
                            <span className="text-sm font-medium">{content.rating}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">What you'll learn:</h4>
                          <div className="flex flex-wrap gap-1">
                            {content.educationalValue.slice(0, 2).map((value, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {value}
                              </Badge>
                            ))}
                            {content.educationalValue.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{content.educationalValue.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span>Learning Achievements</span>
                  </CardTitle>
                  <CardDescription>
                    Earn badges by watching educational content and completing activities!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <Card key={achievement.id} className={`border-l-4 ${achievement.isUnlocked ? 'border-l-green-500' : 'border-l-gray-300'}`}>
                        <CardContent className="pt-4">
                          <div className="flex items-start space-x-3">
                            <div className={`text-2xl ${achievement.isUnlocked ? 'grayscale-0' : 'grayscale'}`}>
                              {achievement.icon}
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                                {achievement.isUnlocked && (
                                  <Badge className="bg-green-600 text-white">
                                    <Trophy className="w-3 h-3 mr-1" />
                                    Earned!
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>Progress</span>
                                  <span>{achievement.progress}/{achievement.maxProgress}</span>
                                </div>
                                <Progress 
                                  value={(achievement.progress / achievement.maxProgress) * 100} 
                                  className="h-2"
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge variant="outline">
                                  <Gift className="w-3 h-3 mr-1" />
                                  {achievement.points} points
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trivia" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-blue-500" />
                    <span>Fun African Trivia</span>
                  </CardTitle>
                  <CardDescription>
                    Test your knowledge about African culture, animals, and geography!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <img
                      src="/assets/generated/kids-trivia-interface.png"
                      alt="Kids Trivia Game"
                      className="w-64 h-48 object-cover rounded-lg mx-auto mb-6"
                    />
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Interactive Trivia Games
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Play fun trivia games designed for kids to learn about African culture, wildlife, and traditions in an engaging way.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl mb-2">🦁</div>
                        <h4 className="font-medium">Animal Quiz</h4>
                        <p className="text-xs text-muted-foreground">Learn about African wildlife</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl mb-2">🌍</div>
                        <h4 className="font-medium">Geography Fun</h4>
                        <p className="text-xs text-muted-foreground">Explore African countries</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl mb-2">🎭</div>
                        <h4 className="font-medium">Culture Quest</h4>
                        <p className="text-xs text-muted-foreground">Discover traditions</p>
                      </div>
                    </div>
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <Play className="w-5 h-5 mr-2" />
                      Start Trivia Game
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="parents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>Parental Controls & Safety</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your child's viewing experience with comprehensive parental controls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Current Settings</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <span className="text-sm">Daily Watch Limit</span>
                            <Badge variant="outline">{parentalControls.maxWatchTime} minutes</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <span className="text-sm">Age Groups Allowed</span>
                            <div className="flex gap-1">
                              {parentalControls.allowedAgeGroups.map((age, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {age}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <span className="text-sm">Content Filters</span>
                            <Badge className="bg-green-600 text-white">Active</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Safety Features</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-green-600" />
                            <span>All content is pre-screened and age-appropriate</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span>No social features or chat functionality</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-purple-600" />
                            <span>Built-in watch time limits and breaks</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-orange-600" />
                            <span>Educational value in all content</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <h4 className="font-semibold text-foreground mb-4">Educational Benefits</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                          <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <h5 className="font-medium text-foreground mb-1">Cultural Learning</h5>
                          <p className="text-xs text-muted-foreground">
                            Authentic African stories and traditions
                          </p>
                        </div>
                        <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                          <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <h5 className="font-medium text-foreground mb-1">Interactive Learning</h5>
                          <p className="text-xs text-muted-foreground">
                            Engaging activities and trivia games
                          </p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                          <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                          <h5 className="font-medium text-foreground mb-1">Achievement System</h5>
                          <p className="text-xs text-muted-foreground">
                            Motivating progress tracking and rewards
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
