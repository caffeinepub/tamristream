import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from '@tanstack/react-router';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Target, 
  Sparkles, 
  BarChart3, 
  Lightbulb,
  Zap,
  Eye,
  Heart,
  Share2,
  Clock,
  Award,
  ArrowUpRight,
  Info,
  Network,
  Coins,
  Leaf
} from 'lucide-react';

export function TamriIntelligenceHub() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const intelligenceMetrics = {
    aiAccuracy: 87,
    userEngagement: 92,
    contentRelevance: 85,
    predictionConfidence: 79,
  };

  const insights = [
    {
      id: '1',
      type: 'trending',
      title: 'Rising Interest in Nollywood Drama',
      description: 'Drama content showing 45% increase in engagement over the past week',
      impact: 'high',
      actionable: true,
    },
    {
      id: '2',
      type: 'audience',
      title: 'Peak Viewing Time Shift',
      description: 'Your audience is most active between 8-10 PM WAT',
      impact: 'medium',
      actionable: true,
    },
    {
      id: '3',
      type: 'content',
      title: 'Optimal Content Length',
      description: 'Videos between 15-25 minutes have highest completion rates',
      impact: 'high',
      actionable: true,
    },
  ];

  const recommendations = [
    {
      id: '1',
      title: 'Optimize Upload Schedule',
      description: 'Schedule releases for Thursday evenings for maximum reach',
      priority: 'high',
      estimatedImpact: '+23% views',
    },
    {
      id: '2',
      title: 'Enhance Thumbnails',
      description: 'AI analysis suggests brighter colors increase click-through by 18%',
      priority: 'medium',
      estimatedImpact: '+18% CTR',
    },
    {
      id: '3',
      title: 'Cross-Promote Content',
      description: 'Link related content to increase watch time by 31%',
      priority: 'medium',
      estimatedImpact: '+31% watch time',
    },
  ];

  const modules = [
    {
      id: 'neural-studio',
      title: 'Creator Neural Studio',
      description: 'AI-powered content analysis and optimization',
      icon: Brain,
      color: 'purple',
      route: '/neural-studio',
    },
    {
      id: 'knowledge-graph',
      title: 'Cultural Knowledge Graph',
      description: 'Explore cross-cultural connections and collaborations',
      icon: Network,
      color: 'blue',
      route: '/knowledge-graph',
    },
    {
      id: 'tokenized-ecosystem',
      title: 'Tokenized Ecosystem',
      description: 'Creator tokens, NFT badges, and advanced staking',
      icon: Coins,
      color: 'amber',
      route: '/tokenized-ecosystem',
    },
    {
      id: 'grants-portal',
      title: 'Grants Portal',
      description: 'Community-funded projects and impact tracking',
      icon: Leaf,
      color: 'green',
      route: '/grants-portal',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Tamri Intelligence Hub</h1>
            <Badge className="bg-purple-600 text-white">Unified Platform</Badge>
          </div>
          <p className="text-muted-foreground">
            AI-powered insights, analytics, and intelligent tools for creators and the community
          </p>
        </div>

        {/* Demo Alert */}
        <Alert className="mb-6 border-purple-500 bg-purple-950/20">
          <Info className="h-4 w-4 text-purple-400" />
          <AlertDescription className="text-purple-200">
            <strong>Intelligence Hub:</strong> This unified platform integrates AI-powered analytics, content optimization, cultural connections, tokenized features, and community grants with full transparency and ethical AI practices.
          </AlertDescription>
        </Alert>

        {/* Intelligence Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {modules.map((module) => (
            <Card key={module.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate({ to: module.route })}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 bg-${module.color}-500/10 rounded-lg`}>
                      <module.icon className={`w-6 h-6 text-${module.color}-500`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription className="mt-1">{module.description}</CardDescription>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Explore Module
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Intelligence Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-500" />
                AI Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{intelligenceMetrics.aiAccuracy}%</div>
              <Progress value={intelligenceMetrics.aiAccuracy} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                User Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{intelligenceMetrics.userEngagement}%</div>
              <Progress value={intelligenceMetrics.userEngagement} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Content Relevance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{intelligenceMetrics.contentRelevance}%</div>
              <Progress value={intelligenceMetrics.contentRelevance} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Prediction Confidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{intelligenceMetrics.predictionConfidence}%</div>
              <Progress value={intelligenceMetrics.predictionConfidence} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="analytics">Deep Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    Quick Insights
                  </CardTitle>
                  <CardDescription>
                    AI-generated insights from your content performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {insights.map((insight) => (
                    <div key={insight.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{insight.title}</h4>
                        <Badge variant={insight.impact === 'high' ? 'default' : 'secondary'}>
                          {insight.impact}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                      {insight.actionable && (
                        <Button variant="link" className="p-0 h-auto mt-2 text-purple-500">
                          View Details <ArrowUpRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Performance Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    Performance Trends
                  </CardTitle>
                  <CardDescription>
                    Key metrics over the past 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Total Views</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">45.2K</div>
                        <div className="text-xs text-green-500">+12.5%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Engagement Rate</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">8.7%</div>
                        <div className="text-xs text-green-500">+2.3%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">Share Rate</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">3.2%</div>
                        <div className="text-xs text-green-500">+0.8%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span className="text-sm">Avg Watch Time</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">18m 32s</div>
                        <div className="text-xs text-green-500">+5.2%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  AI-Powered Insights
                </CardTitle>
                <CardDescription>
                  Machine learning analysis of your content and audience behavior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Brain className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Advanced AI Insights Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Our AI engine is learning from your content patterns to provide deeper insights 
                    into audience behavior, content optimization, and growth opportunities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>
                  Actionable suggestions to improve your content performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{rec.title}</h4>
                          <Badge variant={rec.priority === 'high' ? 'default' : 'secondary'}>
                            {rec.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-green-500 font-medium">{rec.estimatedImpact}</span>
                        </div>
                      </div>
                      <Button size="sm" className="ml-4">
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deep Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Deep Analytics
                </CardTitle>
                <CardDescription>
                  Comprehensive data analysis and predictive modeling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Advanced Analytics Module</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Detailed analytics dashboards with predictive modeling, cohort analysis, 
                    and advanced segmentation will be available here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Ethical AI Notice */}
        <Card className="mt-8 border-blue-500 bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400" />
              Ethical AI & Transparency
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• All AI algorithms are continuously monitored for bias and fairness</p>
            <p>• You have full control over your data and AI personalization settings</p>
            <p>• Transparency reports are available showing how AI decisions are made</p>
            <p>• Community oversight ensures ethical AI practices across the platform</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
