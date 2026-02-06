import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Mic, Music, DollarSign, TrendingUp, Users, Play, Upload, Star, Clock, Calendar, Eye, Heart, Download, BarChart3, Headphones, Award, Zap } from 'lucide-react';
import { useGetArtistProfile, useCreateArtistProfile, useGetAllMusicTracks, useAddMusicTrack, useGetRevenueShare, useSetPaymentMethod } from '../hooks/useQueries';
import { useFileUpload } from '../blob-storage/FileStorage';
import { toast } from 'sonner';
import type { PaymentMethod } from '../backend';

export function ArtistDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [showUploadTrack, setShowUploadTrack] = useState(false);
  
  // Profile creation state
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    socialLinks: ['']
  });
  
  // Track upload state
  const [trackData, setTrackData] = useState({
    title: '',
    album: '',
    genre: '',
    price: ''
  });
  
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState({ audio: 0, cover: 0 });
  const [isUploading, setIsUploading] = useState(false);

  const { data: artistProfile, isLoading: profileLoading } = useGetArtistProfile();
  const { data: musicTracks = [], isLoading: tracksLoading } = useGetAllMusicTracks();
  const { data: revenueShare, isLoading: revenueLoading } = useGetRevenueShare();
  
  const createProfile = useCreateArtistProfile();
  const addTrack = useAddMusicTrack();
  const setPaymentMethod = useSetPaymentMethod();
  const { uploadFile } = useFileUpload();

  const handleCreateProfile = async () => {
    if (!profileData.name.trim() || !profileData.bio.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await createProfile.mutateAsync({
        name: profileData.name,
        bio: profileData.bio,
        photoPath: '/assets/generated/african-musician-portrait.jpg', // Default photo
        socialLinks: profileData.socialLinks.filter(link => link.trim())
      });
      
      setShowCreateProfile(false);
      setProfileData({ name: '', bio: '', socialLinks: [''] });
    } catch (error) {
      console.error('Profile creation error:', error);
    }
  };

  const handleUploadTrack = async () => {
    if (!trackData.title || !trackData.album || !trackData.genre || !audioFile || !coverFile) {
      toast.error('Please fill in all fields and select audio and cover files');
      return;
    }

    setIsUploading(true);

    try {
      // Upload audio file
      const audioResult = await uploadFile(
        `music/${trackData.title}/audio-${Date.now()}.${audioFile.name.split('.').pop()}`,
        audioFile,
        (progress) => setUploadProgress(prev => ({ ...prev, audio: progress }))
      );

      // Upload cover image
      const coverResult = await uploadFile(
        `music/${trackData.title}/cover-${Date.now()}.${coverFile.name.split('.').pop()}`,
        coverFile,
        (progress) => setUploadProgress(prev => ({ ...prev, cover: progress }))
      );

      // Add track to backend
      await addTrack.mutateAsync({
        title: trackData.title,
        artist: artistProfile?.name || 'Unknown Artist',
        album: trackData.album,
        genre: trackData.genre,
        audioPath: audioResult.path,
        coverImagePath: coverResult.path,
        price: BigInt(Math.floor(parseFloat(trackData.price) * 100)) // Convert to cents as bigint
      });

      // Reset form
      setTrackData({ title: '', album: '', genre: '', price: '' });
      setAudioFile(null);
      setCoverFile(null);
      setUploadProgress({ audio: 0, cover: 0 });
      setShowUploadTrack(false);
      
    } catch (error) {
      toast.error('Failed to upload track');
      console.error('Track upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePaymentMethodChange = async (method: string) => {
    let paymentMethod: PaymentMethod;
    
    switch (method) {
      case 'mobile-money':
        paymentMethod = { __kind__: 'mobileMoney', mobileMoney: 'Mobile Money Account' };
        break;
      case 'm-pesa':
        paymentMethod = { __kind__: 'mPesa', mPesa: 'M-Pesa Account' };
        break;
      case 'crypto':
        paymentMethod = { __kind__: 'crypto', crypto: 'Crypto Wallet' };
        break;
      default:
        return;
    }

    try {
      await setPaymentMethod.mutateAsync(paymentMethod);
    } catch (error) {
      console.error('Payment method error:', error);
    }
  };

  const addSocialLink = () => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, '']
    }));
  };

  const updateSocialLink = (index: number, value: string) => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) => i === index ? value : link)
    }));
  };

  const removeSocialLink = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  // Mock data for demonstration
  const mockStats = {
    totalStreams: 45678,
    monthlyListeners: 12345,
    totalEarnings: 2847.50,
    pendingPayouts: 456.78,
    tracksUploaded: musicTracks.length,
    followers: artistProfile?.followers ? Number(artistProfile.followers) : 0
  };

  const mockAnalytics = {
    streamsByMonth: [
      { month: 'Jan', streams: 1200 },
      { month: 'Feb', streams: 1800 },
      { month: 'Mar', streams: 2400 },
      { month: 'Apr', streams: 3200 },
      { month: 'May', streams: 2800 },
      { month: 'Jun', streams: 3600 }
    ],
    topTracks: musicTracks.slice(0, 5).map((track, index) => ({
      title: track.title,
      streams: Math.floor(Math.random() * 10000) + 1000,
      revenue: Math.floor(Math.random() * 500) + 50
    })),
    demographics: {
      countries: [
        { name: 'Nigeria', percentage: 35 },
        { name: 'Ghana', percentage: 22 },
        { name: 'Kenya', percentage: 18 },
        { name: 'South Africa', percentage: 15 },
        { name: 'Others', percentage: 10 }
      ],
      ageGroups: [
        { range: '18-24', percentage: 28 },
        { range: '25-34', percentage: 35 },
        { range: '35-44', percentage: 22 },
        { range: '45+', percentage: 15 }
      ]
    }
  };

  if (profileLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading artist dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!artistProfile && !showCreateProfile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Mic className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Welcome to Your Artist Dashboard</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Create your artist profile to start uploading music, tracking earnings, and connecting with fans across Africa.
          </p>
          <Button 
            onClick={() => setShowCreateProfile(true)}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            <Mic className="w-5 h-5 mr-2" />
            Create Artist Profile
          </Button>
        </div>
      </div>
    );
  }

  if (showCreateProfile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Create Your Artist Profile</CardTitle>
              <CardDescription>
                Set up your profile to start sharing your music with the world
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="artist-name">Artist Name *</Label>
                <Input
                  id="artist-name"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your stage name or band name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="artist-bio">Biography *</Label>
                <Textarea
                  id="artist-bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell your story, musical influences, and what makes your music unique"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Social Media Links</Label>
                {profileData.socialLinks.map((link, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      value={link}
                      onChange={(e) => updateSocialLink(index, e.target.value)}
                      placeholder="https://instagram.com/yourusername"
                    />
                    {profileData.socialLinks.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeSocialLink(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSocialLink}
                  className="w-full"
                >
                  Add Social Link
                </Button>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleCreateProfile}
                  disabled={createProfile.isPending}
                  className="flex-1"
                >
                  {createProfile.isPending ? 'Creating...' : 'Create Profile'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateProfile(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Mic className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {artistProfile?.name || 'Artist Dashboard'}
              </h1>
              <p className="text-muted-foreground">
                Manage your music, track earnings, and grow your fanbase
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowUploadTrack(true)}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Track
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{mockStats.totalStreams.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Streams</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Headphones className="w-4 h-4 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{mockStats.monthlyListeners.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Monthly Listeners</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">${mockStats.totalEarnings.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">Total Earnings</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold">${mockStats.pendingPayouts.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">Pending Payouts</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Music className="w-4 h-4 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">{mockStats.tracksUploaded}</div>
                  <div className="text-xs text-muted-foreground">Tracks Uploaded</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-red-600" />
                <div>
                  <div className="text-2xl font-bold">{mockStats.followers.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Followers</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tracks">My Tracks</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New track uploaded</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Payout processed</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New follower milestone</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Tracks */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Tracks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.topTracks.slice(0, 3).map((track, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded flex items-center justify-center text-xs font-bold text-primary-foreground">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{track.title}</p>
                            <p className="text-xs text-muted-foreground">{track.streams.toLocaleString()} streams</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${track.revenue}</p>
                          <p className="text-xs text-muted-foreground">revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Sharing Info */}
            <Card className="border-0 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span>Artist Revenue Sharing</span>
                </CardTitle>
                <CardDescription>
                  TamriStream offers industry-leading revenue sharing for African artists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">70%</div>
                    <p className="text-sm text-muted-foreground">Artist Revenue Share</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">$10</div>
                    <p className="text-sm text-muted-foreground">Minimum Payout</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">Monthly</div>
                    <p className="text-sm text-muted-foreground">Payout Schedule</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracks" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">My Music Tracks</h3>
              <Button onClick={() => setShowUploadTrack(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload New Track
              </Button>
            </div>

            {tracksLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading tracks...</p>
              </div>
            ) : musicTracks.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Tracks Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload your first track to start sharing your music with the world
                  </p>
                  <Button onClick={() => setShowUploadTrack(true)}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Your First Track
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {musicTracks.map((track) => (
                  <Card key={track.title}>
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                      <Music className="w-12 h-12 text-primary" />
                    </div>
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-1">{track.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{track.album}</p>
                      <div className="flex items-center justify-between text-sm">
                        <Badge variant="outline">{track.genre}</Badge>
                        <span className="font-medium">${Number(track.price) / 100}</span>
                      </div>
                      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Play className="w-3 h-3 mr-1" />
                          {Number(track.playCount)} plays
                        </span>
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          {Number(track.averageRating) / 10}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stream Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.streamsByMonth.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{data.month}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(data.streams / 4000) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{data.streams.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Top Countries</h4>
                      {mockAnalytics.demographics.countries.map((country, index) => (
                        <div key={index} className="flex items-center justify-between mb-2">
                          <span className="text-sm">{country.name}</span>
                          <span className="text-sm font-medium">{country.percentage}%</span>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Age Groups</h4>
                      {mockAnalytics.demographics.ageGroups.map((group, index) => (
                        <div key={index} className="flex items-center justify-between mb-2">
                          <span className="text-sm">{group.range}</span>
                          <span className="text-sm font-medium">{group.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  {revenueLoading ? (
                    <div className="text-center py-8">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading revenue data...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Total Earnings</span>
                        <span className="text-2xl font-bold text-green-600">
                          ${Number(revenueShare?.totalEarnings || 0) / 100}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Pending Payouts</span>
                        <span className="text-xl font-semibold text-yellow-600">
                          ${Number(revenueShare?.pendingPayouts || 0) / 100}
                        </span>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <h4 className="font-medium">Payment Method</h4>
                        <Select onValueChange={handlePaymentMethodChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mobile-money">Mobile Money</SelectItem>
                            <SelectItem value="m-pesa">M-Pesa</SelectItem>
                            <SelectItem value="crypto">Cryptocurrency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payout History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Monthly Payout</p>
                        <p className="text-xs text-muted-foreground">December 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">$234.56</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Monthly Payout</p>
                        <p className="text-xs text-muted-foreground">November 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">$189.23</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Monthly Payout</p>
                        <p className="text-xs text-muted-foreground">October 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">$156.78</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Artist Profile</CardTitle>
                <CardDescription>
                  Manage your public artist information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {artistProfile ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Artist Name</Label>
                      <p className="text-lg font-semibold">{artistProfile.name}</p>
                    </div>
                    <div>
                      <Label>Biography</Label>
                      <p className="text-muted-foreground">{artistProfile.bio}</p>
                    </div>
                    <div>
                      <Label>Verification Status</Label>
                      <div className="flex items-center space-x-2">
                        {artistProfile.verified ? (
                          <Badge className="bg-blue-600">
                            <Zap className="w-3 h-3 mr-1" />
                            Verified Artist
                          </Badge>
                        ) : (
                          <Badge variant="outline">Unverified</Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label>Statistics</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Followers</p>
                          <p className="text-xl font-bold">{Number(artistProfile.followers).toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Total Earnings</p>
                          <p className="text-xl font-bold">${Number(artistProfile.earnings) / 100}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No profile information available.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Upload Track Modal */}
        {showUploadTrack && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4">
              <CardHeader>
                <CardTitle>Upload New Track</CardTitle>
                <CardDescription>
                  Share your music with fans across Africa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="track-title">Track Title *</Label>
                    <Input
                      id="track-title"
                      value={trackData.title}
                      onChange={(e) => setTrackData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter track title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="track-album">Album *</Label>
                    <Input
                      id="track-album"
                      value={trackData.album}
                      onChange={(e) => setTrackData(prev => ({ ...prev, album: e.target.value }))}
                      placeholder="Album name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="track-genre">Genre *</Label>
                    <Select value={trackData.genre} onValueChange={(value) => setTrackData(prev => ({ ...prev, genre: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="afrobeats">Afrobeats</SelectItem>
                        <SelectItem value="highlife">Highlife</SelectItem>
                        <SelectItem value="amapiano">Amapiano</SelectItem>
                        <SelectItem value="gospel">Gospel</SelectItem>
                        <SelectItem value="hip-hop">Hip Hop</SelectItem>
                        <SelectItem value="r&b">R&B</SelectItem>
                        <SelectItem value="reggae">Reggae</SelectItem>
                        <SelectItem value="traditional">Traditional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="track-price">Price (USD) *</Label>
                    <Input
                      id="track-price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={trackData.price}
                      onChange={(e) => setTrackData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.99"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Audio File *</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <Input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="audio-upload"
                      />
                      <Label htmlFor="audio-upload" className="cursor-pointer">
                        <div className="space-y-2">
                          <Music className="w-8 h-8 text-muted-foreground mx-auto" />
                          <p className="text-sm">Choose audio file</p>
                        </div>
                      </Label>
                      {audioFile && (
                        <p className="text-sm text-muted-foreground mt-2">{audioFile.name}</p>
                      )}
                      {uploadProgress.audio > 0 && (
                        <Progress value={uploadProgress.audio} className="mt-2" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Cover Image *</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="cover-upload"
                      />
                      <Label htmlFor="cover-upload" className="cursor-pointer">
                        <div className="space-y-2">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                          <p className="text-sm">Choose cover image</p>
                        </div>
                      </Label>
                      {coverFile && (
                        <p className="text-sm text-muted-foreground mt-2">{coverFile.name}</p>
                      )}
                      {uploadProgress.cover > 0 && (
                        <Progress value={uploadProgress.cover} className="mt-2" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleUploadTrack}
                    disabled={isUploading}
                    className="flex-1"
                  >
                    {isUploading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>Uploading...</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Track
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowUploadTrack(false);
                      setTrackData({ title: '', album: '', genre: '', price: '' });
                      setAudioFile(null);
                      setCoverFile(null);
                      setUploadProgress({ audio: 0, cover: 0 });
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
