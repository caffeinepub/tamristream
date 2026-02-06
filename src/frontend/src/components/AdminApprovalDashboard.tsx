import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ClipboardCheck, CheckCircle2, XCircle, Eye, Award } from 'lucide-react';
import { useGetAllContentApprovals, useApproveContent } from '../hooks/useQueries';
import { useState } from 'react';
import { toast } from 'sonner';

export function AdminApprovalDashboard() {
  const { data: approvals, isLoading } = useGetAllContentApprovals();
  const approveContent = useApproveContent();
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  const pendingApprovals = approvals?.filter(a => a.status === 'Pending') || [];
  const approvedApprovals = approvals?.filter(a => a.status === 'Approved') || [];
  const rejectedApprovals = approvals?.filter(a => a.status === 'Rejected') || [];

  const handleApprove = async (contentId: string, approved: boolean) => {
    try {
      await approveContent.mutateAsync({
        contentId,
        approved,
        feedback: feedback || (approved ? 'Content approved' : 'Content rejected')
      });
      toast.success(approved ? 'Content approved successfully' : 'Content rejected');
      setFeedback('');
      setSelectedContent(null);
    } catch (error) {
      toast.error('Failed to process approval');
    }
  };

  if (isLoading) {
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
          <div className="flex items-center justify-center space-x-3">
            <ClipboardCheck className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Content Approval Dashboard</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Review and approve creator submissions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <ClipboardCheck className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{pendingApprovals.length}</div>
              <div className="text-sm text-muted-foreground">Pending Review</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{approvedApprovals.length}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{rejectedApprovals.length}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending ({pendingApprovals.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedApprovals.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedApprovals.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingApprovals.map((approval) => (
              <Card key={approval.contentId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{approval.contentId}</CardTitle>
                      <CardDescription>
                        Creator: {approval.creator.toString().substring(0, 20)}...
                      </CardDescription>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline">
                          <Award className="w-3 h-3 mr-1" />
                          NFT Assigned
                        </Badge>
                        <Badge variant="secondary">Pending Review</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Submission Date</Label>
                    <p className="text-sm text-muted-foreground">
                      {new Date(Number(approval.submissionDate / BigInt(1000000))).toLocaleString()}
                    </p>
                  </div>

                  {selectedContent === approval.contentId && (
                    <div className="space-y-2">
                      <Label htmlFor="feedback">Feedback</Label>
                      <Textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Provide feedback for the creator..."
                        rows={3}
                      />
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedContent(selectedContent === approval.contentId ? null : approval.contentId)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {selectedContent === approval.contentId ? 'Hide Details' : 'Review'}
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(approval.contentId, true)}
                      disabled={approveContent.isPending}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleApprove(approval.contentId, false)}
                      disabled={approveContent.isPending}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {pendingApprovals.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No pending approvals</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {approvedApprovals.map((approval) => (
              <Card key={approval.contentId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{approval.contentId}</CardTitle>
                      <CardDescription>
                        Creator: {approval.creator.toString().substring(0, 20)}...
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-600">Approved</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedApprovals.map((approval) => (
              <Card key={approval.contentId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{approval.contentId}</CardTitle>
                      <CardDescription>
                        Creator: {approval.creator.toString().substring(0, 20)}...
                      </CardDescription>
                    </div>
                    <Badge variant="destructive">Rejected</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <img 
          src="/assets/generated/admin-content-approval-dashboard.dim_1000x700.png" 
          alt="Admin approval dashboard" 
          className="w-full max-w-4xl mx-auto h-auto rounded-lg"
        />
      </div>
    </div>
  );
}
