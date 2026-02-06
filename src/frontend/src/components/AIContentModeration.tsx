import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Flag, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export function AIContentModeration() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Mock flagged content data
  const flaggedContent = [
    {
      id: '1',
      type: 'Comment',
      content: 'This is a sample comment that was flagged by AI...',
      author: 'User123',
      severity: 'Medium',
      reason: 'Potential spam detected',
      timestamp: '2025-11-02 14:30',
      status: 'Pending',
      aiConfidence: 78,
    },
    {
      id: '2',
      type: 'Review',
      content: 'Movie review content that triggered moderation...',
      author: 'Reviewer456',
      severity: 'Low',
      reason: 'Language filter triggered',
      timestamp: '2025-11-02 13:15',
      status: 'Pending',
      aiConfidence: 65,
    },
    {
      id: '3',
      type: 'Video Title',
      content: 'Potentially misleading video title',
      author: 'Creator789',
      severity: 'High',
      reason: 'Misleading content detected',
      timestamp: '2025-11-02 12:00',
      status: 'Pending',
      aiConfidence: 92,
    },
  ];

  const moderationStats = {
    totalFlagged: 156,
    autoApproved: 89,
    autoRejected: 23,
    pendingReview: 44,
    accuracy: 94,
  };

  const handleApprove = (id: string) => {
    toast.success('Content approved and published');
  };

  const handleReject = (id: string) => {
    toast.success('Content rejected and removed');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-amber-500';
      case 'Low':
        return 'bg-blue-500';
      default:
        return 'bg-zinc-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <img
              src="/assets/generated/ai-content-moderation-dashboard.dim_800x600.png"
              alt="AI Content Moderation"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Content Moderation
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Automated content screening with intelligent flagging and review workflows to keep the community safe
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-zinc-400">Total Flagged</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{moderationStats.totalFlagged}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-zinc-400">Auto Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{moderationStats.autoApproved}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-zinc-400">Auto Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">{moderationStats.autoRejected}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-zinc-400">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-500">{moderationStats.pendingReview}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-zinc-400">AI Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">{moderationStats.accuracy}%</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-zinc-800">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {flaggedContent.map((item) => (
                  <Card key={item.id} className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge className={getSeverityColor(item.severity)}>
                              {item.severity}
                            </Badge>
                            <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                              {item.type}
                            </Badge>
                          </div>
                          <CardTitle className="text-white text-lg">{item.reason}</CardTitle>
                          <CardDescription className="text-zinc-400">
                            By {item.author} • {item.timestamp}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-zinc-400 mb-1">AI Confidence</div>
                          <div className="text-2xl font-bold text-amber-500">{item.aiConfidence}%</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <p className="text-zinc-300 text-sm">{item.content}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm text-zinc-400">Confidence Level</div>
                        <Progress value={item.aiConfidence} className="h-2" />
                      </div>

                      <div className="flex gap-3">
                        <Button
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(item.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          className="flex-1 bg-red-600 hover:bg-red-700"
                          onClick={() => handleReject(item.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          variant="outline"
                          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="approved">
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">No approved items to display</p>
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="text-center py-12">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">No rejected items to display</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* AI Moderation Settings */}
        <Card className="mt-8 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Moderation Settings
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Configure AI moderation sensitivity and rules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">Detection Categories</h3>
                  <div className="space-y-2">
                    {['Hate Speech', 'Spam', 'Harassment', 'Inappropriate Content', 'Misleading Information'].map((category) => (
                      <div key={category} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                        <span className="text-zinc-300">{category}</span>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">Performance Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">False Positive Rate</span>
                      <span className="text-white font-semibold">6%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Detection Speed</span>
                      <span className="text-white font-semibold">&lt; 1s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Languages Supported</span>
                      <span className="text-white font-semibold">15+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
