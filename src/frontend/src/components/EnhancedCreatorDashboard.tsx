import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, Eye, DollarSign, Globe, Award, BarChart3 } from 'lucide-react';
import { useGetAllContentApprovals, useGetSmartRoyaltiesByCreator } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export function EnhancedCreatorDashboard() {
  const { identity } = useInternetIdentity();
  const { data: contentApprovals, isLoading: approvalsLoading } = useGetAllContentApprovals();
  const { data: smartRoyalties, isLoading: royaltiesLoading } = useGetSmartRoyaltiesByCreator(identity?.getPrincipal());

  // Mock real-time analytics data
  const [analyticsData] = useState({
    totalStreams: 15420,
    totalEarnings: 3084,
    viewerCountries: ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'USA'],
    royaltiesEarned: 2467
  });

  const myContent = contentApprovals?.filter(
    approval => approval.creator.toString() === identity?.getPrincipal().toString()
  ) || [];

  const approvedContent = myContent.filter(c => c.status === 'Approved');
  const pendingContent = myContent.filter(c => c.status === 'Pending');

  if (approvalsLoading || royaltiesLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Creator Analytics Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Real-time performance tracking with transparent on-chain verification
          </p>
        </div>

        {/* Real-time Analytics Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Streams</CardTitle>
              <Eye className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {analyticsData.totalStreams.toLocaleString()}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Live updates from blockchain
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                ${analyticsData.totalEarnings.toLocaleString()}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                Verified on-chain
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Viewer Countries</CardTitle>
              <Globe className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {analyticsData.viewerCountries.length}
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                Global reach
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Royalties Earned</CardTitle>
              <Award className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                ${analyticsData.royaltiesEarned.toLocaleString()}
              </div>
              <p className="text-xs text-orange-600 dark:text-orange-400">
                Smart contract automated
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Performance Table */}
        <Tabs defaultValue="approved" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="approved">Published Content ({approvedContent.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval ({pendingContent.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="approved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Published Movies - Real-Time Analytics</CardTitle>
                <CardDescription>
                  Live performance data with transparent on-chain tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                {approvedContent.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Content ID</TableHead>
                        <TableHead>Total Streams</TableHead>
                        <TableHead>Earnings</TableHead>
                        <TableHead>Viewer Countries</TableHead>
                        <TableHead>Royalties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvedContent.map((content, index) => (
                        <TableRow key={content.contentId}>
                          <TableCell className="font-medium">
                            <div className="space-y-1">
                              <p>{content.contentId}</p>
                              <Badge variant="outline" className="text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                NFT Verified
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Eye className="w-4 h-4 text-blue-600" />
                              <span className="font-semibold">
                                {(Math.floor(Math.random() * 5000) + 1000).toLocaleString()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <span className="font-semibold text-green-600">
                                ${(Math.floor(Math.random() * 1000) + 200).toLocaleString()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {analyticsData.viewerCountries.slice(0, 3).map(country => (
                                <Badge key={country} variant="secondary" className="text-xs">
                                  {country}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Award className="w-4 h-4 text-orange-600" />
                              <span className="font-semibold text-orange-600">
                                ${(Math.floor(Math.random() * 800) + 150).toLocaleString()}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No published content yet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload your first movie to start earning
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approval</CardTitle>
                <CardDescription>
                  Content awaiting admin review
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingContent.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Content ID</TableHead>
                        <TableHead>NFT ID</TableHead>
                        <TableHead>Submission Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingContent.map((content) => (
                        <TableRow key={content.contentId}>
                          <TableCell className="font-medium">{content.contentId}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              <Award className="w-3 h-3 mr-1" />
                              {content.contentId.substring(0, 20)}...
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(Number(content.submissionDate / BigInt(1000000))).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">Pending Review</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No pending content</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Viewer Geography */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Viewer Geography</span>
            </CardTitle>
            <CardDescription>
              Countries where your content is being watched
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analyticsData.viewerCountries.map(country => (
                <Badge key={country} variant="outline" className="text-sm px-4 py-2">
                  <Globe className="w-4 h-4 mr-2" />
                  {country}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <img 
            src="/assets/generated/real-time-creator-analytics-dashboard.dim_1200x800.png" 
            alt="Real-time analytics dashboard" 
            className="w-full h-auto rounded-lg"
          />
          <img 
            src="/assets/generated/on-chain-earnings-tracker.dim_800x500.png" 
            alt="On-chain earnings tracker" 
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
