import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Share2, Facebook, Twitter, Instagram, MessageCircle, Link2, Heart, MessageSquare, TrendingUp, Users, Award, Music, Film, Trophy } from 'lucide-react';
import { toast } from 'sonner';

interface SharedContent {
  id: string;
  type: 'movie' | 'music' | 'achievement' | 'playlist';
  title: string;
  description: string;
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

interface SocialPlatform {
  id: string;
  name: string;
  icon: any;
  color: string;
  enabled: boolean;
}

export function SocialSharingSection() {
  const [activeTab, setActiveTab] = useState('feed');
  const [privacySettings, setPrivacySettings] = useState({
    shareToFeed: true,
    allowComments: true,
    showActivity: true
  });

  const socialPlatforms: SocialPlatform[] = [
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600', enabled: true },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-sky-500', enabled: true },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600', enabled: true },
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'text-green-600', enabled: true }
  ];

  const communityFeed: SharedContent[] = [
    {
      id: '1',
      type: 'movie',
      title: 'Hearts of Gold',
      description: 'Just watched this amazing African drama! Highly recommend! 🎬',
      user: { name: 'Amara Johnson', avatar: '/assets/generated/african-filmmaker.jpg' },
      timestamp: '2 hours ago',
      likes: 45,
      comments: 12,
      shares: 8
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Culture Explorer Badge',
      description: 'Earned the Culture Explorer badge by watching 5 cultural content videos! 🏆',
      user: { name: 'Kwame Osei', avatar: '/assets/generated/african-musician-portrait.jpg' },
      timestamp: '5 hours ago',
      likes: 32,
      comments: 7,
      shares: 3
    },
    {
      id: '3',
      type: 'playlist',
      title: 'Best of Afrobeats 2024',
      description: 'Created a new playlist with the hottest Afrobeats tracks! Check it out! 🎵',
      user: { name: 'Zara Mensah', avatar: '/assets/generated/african-artist-performance.jpg' },
      timestamp: '1 day ago',
      likes: 89,
      comments: 23,
      shares: 15
    }
  ];

  const handleShare = (platform: string, content: string) => {
    toast.success(`Shared to ${platform}!`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'movie': return <Film className="w-4 h-4" />;
      case 'music': return <Music className="w-4 h-4" />;
      case 'achievement': return <Trophy className="w-4 h-4" />;
      case 'playlist': return <Music className="w-4 h-4" />;
      default: return <Share2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Share2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Social Sharing</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Share your favorite content, achievements, and playlists with friends and the community
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Share2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm text-muted-foreground">Total Shares</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">892</div>
              <div className="text-sm text-muted-foreground">Likes Received</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">234</div>
              <div className="text-sm text-muted-foreground">Comments</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">1.2k</div>
              <div className="text-sm text-muted-foreground">Reach</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="share">Share Content</TabsTrigger>
            <TabsTrigger value="settings">Privacy Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Community Activity</span>
                </CardTitle>
                <CardDescription>See what others are sharing and enjoying</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {communityFeed.map((item) => (
                  <div key={item.id} className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={item.user.avatar} alt={item.user.name} />
                        <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-foreground">{item.user.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {getTypeIcon(item.type)}
                            <span className="ml-1 capitalize">{item.type}</span>
                          </Badge>
                          <span className="text-sm text-muted-foreground">{item.timestamp}</span>
                        </div>
                        <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span>{item.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            <span>{item.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span>{item.shares}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="share" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Share to Social Media</CardTitle>
                <CardDescription>Connect your accounts and share content with one click</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {socialPlatforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <Card key={platform.id} className="border-2">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-12 h-12 bg-muted rounded-xl flex items-center justify-center`}>
                                <Icon className={`w-6 h-6 ${platform.color}`} />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">{platform.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {platform.enabled ? 'Connected' : 'Not connected'}
                                </p>
                              </div>
                            </div>
                            <Badge variant={platform.enabled ? 'default' : 'outline'}>
                              {platform.enabled ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <Button 
                            className="w-full" 
                            variant={platform.enabled ? 'default' : 'outline'}
                            onClick={() => handleShare(platform.name, 'Sample content')}
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Now
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-foreground mb-4">Quick Share Options</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" onClick={handleCopyLink}>
                      <Link2 className="w-4 h-4 mr-2" />
                      Copy Link to Share
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Share via Messaging
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Sharing Settings</CardTitle>
                <CardDescription>Control who can see your shared content and activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Share to Community Feed</h4>
                      <p className="text-sm text-muted-foreground">Allow your shares to appear in the community feed</p>
                    </div>
                    <Button
                      variant={privacySettings.shareToFeed ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPrivacySettings(prev => ({ ...prev, shareToFeed: !prev.shareToFeed }))}
                    >
                      {privacySettings.shareToFeed ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Allow Comments</h4>
                      <p className="text-sm text-muted-foreground">Let others comment on your shared content</p>
                    </div>
                    <Button
                      variant={privacySettings.allowComments ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPrivacySettings(prev => ({ ...prev, allowComments: !prev.allowComments }))}
                    >
                      {privacySettings.allowComments ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Show Activity</h4>
                      <p className="text-sm text-muted-foreground">Display your viewing and listening activity</p>
                    </div>
                    <Button
                      variant={privacySettings.showActivity ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPrivacySettings(prev => ({ ...prev, showActivity: !prev.showActivity }))}
                    >
                      {privacySettings.showActivity ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Privacy Note</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Your privacy is important to us. You have full control over what you share and who can see it. 
                    You can change these settings at any time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
