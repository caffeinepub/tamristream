import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Users, Eye, Heart, Play, Download, DollarSign, Calendar, Globe, Target, BarChart3, PieChart, Activity, Zap, Star, Award } from 'lucide-react';

interface AnalyticsData {
  totalViews: number;
  totalEarnings: number;
  totalFollowers: number;
  engagementRate: number;
  topContent: ContentMetric[];
  audienceData: AudienceMetric[];
  revenueBreakdown: RevenueMetric[];
  performanceMetrics: PerformanceMetric[];
}

interface ContentMetric {
  id: string;
  title: string;
  type: 'movie' | 'music' | 'sports';
  views: number;
  earnings: number;
  engagement: number;
  thumbnail: string;
}

interface AudienceMetric {
  country: string;
  percentage: number;
  growth: number;
}

interface RevenueMetric {
  source: string;
  amount: number;
  percentage: number;
  growth: number;
}

interface PerformanceMetric {
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export function AdvancedAnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedContentType, setSelectedContentType] = useState('all');

  // Mock data - would come from backend
  const analyticsData: AnalyticsData = {
    totalViews: 125847,
    totalEarnings: 3247.50,
    totalFollowers: 8934,
    engagementRate: 7.2,
    topContent: [
      {
        id: '1',
        title: 'Hearts of Gold',
        type: 'movie',
        views: 45623,
        earnings: 1247.80,
        engagement: 8.5,
        thumbnail: '/assets/generated/african-drama-poster.jpg'
      },
      {
        id: '2',
        title: 'African Dreams',
        type: 'music',
        views: 32145,
        earnings: 892.30,
        engagement: 9.2,
        thumbnail: '/assets/generated/african-music-albums.jpg'
      },
      {
        id: '3',
        title: 'CAF Champions League Highlights',
        type: 'sports',
        views: 28934,
        earnings: 567.40,
        engagement: 6.8,
        thumbnail: '/assets/generated/african-football-match.jpg'
      }
    ],
    audienceData: [
      { country: 'Nigeria', percentage: 35, growth: 12 },
      { country: 'Ghana', percentage: 22, growth: 8 },
      { country: 'South Africa', percentage: 18, growth: 15 },
      { country: 'Kenya', percentage: 12, growth: 5 },
      { country: 'Other', percentage: 13, growth: 3 }
    ],
    revenueBreakdown: [
      { source: 'Streaming Revenue', amount: 1847.20, percentage: 57, growth: 15 },
      { source: 'Merchandise Sales', amount: 892.50, percentage: 27, growth: 23 },
      { source: 'Fan Club Subscriptions', amount: 345.80, percentage: 11, growth: 8 },
      { source: 'Event Tickets', amount: 162.00, percentage: 5, growth: 45 }
    ],
    performanceMetrics: [
      { metric: 'Average View Duration', value: 78, change: 5, trend: 'up' },
      { metric: 'Click-through Rate', value: 4.2, change: -0.3, trend: 'down' },
      { metric: 'Conversion Rate', value: 2.8, change: 0.5, trend: 'up' },
      { metric: 'Retention Rate', value: 85, change: 2, trend: 'up' }
    ]
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getContentTypeIcon = (type: 'movie' | 'music' | 'sports') => {
    switch (type) {
      case 'movie': return <Play className="w-4 h-4" />;
      case 'music': return <Heart className="w-4 h-4" />;
      case 'sports': return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Advanced Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into your content performance and audience engagement
            </p>
          </div>
          <div className="flex space-x-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedContentType} onValueChange={setSelectedContentType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Content</SelectItem>
                <SelectItem value="movie">Movies</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData.totalViews)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsData.totalEarnings.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +18.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData.totalFollowers)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8.7% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.engagementRate}%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +0.8% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="content">Top Content</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>Your best performing content across all categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topContent.map((content, index) => (
                  <div key={content.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                      <span className="text-sm font-bold">#{index + 1}</span>
                    </div>
                    <img 
                      src={content.thumbnail} 
                      alt={content.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{content.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {getContentTypeIcon(content.type)}
                          <span className="ml-1">{content.type}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {formatNumber(content.views)} views
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          ${content.earnings}
                        </span>
                        <span className="flex items-center">
                          <Target className="w-3 h-3 mr-1" />
                          {content.engagement}% engagement
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Audience by Country</CardTitle>
                <CardDescription>Geographic distribution of your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.audienceData.map((audience) => (
                    <div key={audience.country} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{audience.country}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{audience.percentage}%</span>
                          <div className="flex items-center text-xs text-green-600">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +{audience.growth}%
                          </div>
                        </div>
                      </div>
                      <Progress value={audience.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>How your audience interacts with your content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium">Likes</span>
                    </div>
                    <span className="text-sm font-bold">24.5K</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">Reviews</span>
                    </div>
                    <span className="text-sm font-bold">1.2K</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">Shares</span>
                    </div>
                    <span className="text-sm font-bold">892</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Your earnings across different revenue streams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.revenueBreakdown.map((revenue) => (
                  <div key={revenue.source} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{revenue.source}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">${revenue.amount}</span>
                        <div className="flex items-center text-xs text-green-600">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +{revenue.growth}%
                        </div>
                      </div>
                    </div>
                    <Progress value={revenue.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators for your content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analyticsData.performanceMetrics.map((metric) => (
                  <div key={metric.metric} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="text-2xl font-bold mb-1">{metric.value}%</div>
                    <div className={`text-xs ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change >= 0 ? '+' : ''}{metric.change}% from last period
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>Personalized recommendations to improve your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-800">Opportunity</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Your sports content has 23% higher engagement. Consider creating more sports-related content.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-800">Growth</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Your audience from Ghana is growing rapidly (+15%). Consider localized content for this market.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-semibold text-yellow-800">Optimization</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Your click-through rate decreased by 0.3%. Try updating your thumbnails and titles.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Milestones</CardTitle>
                <CardDescription>Goals you're close to achieving</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">10K Followers</span>
                      <span className="text-sm text-muted-foreground">1,066 to go</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">$5K Monthly Revenue</span>
                      <span className="text-sm text-muted-foreground">$1,752 to go</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">100K Total Views</span>
                      <span className="text-sm text-muted-foreground">25,847 to go</span>
                    </div>
                    <Progress value={74} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
