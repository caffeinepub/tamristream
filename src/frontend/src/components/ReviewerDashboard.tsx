import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClipboardCheck, Clock, CheckCircle2, XCircle, Eye } from 'lucide-react';
import { useGetFilmmakerSubmissions } from '../hooks/useQueries';

export function ReviewerDashboard() {
  const { data: submissions, isLoading } = useGetFilmmakerSubmissions();

  const pendingSubmissions = submissions?.filter(s => s.status === 'Pending') || [];
  const approvedSubmissions = submissions?.filter(s => s.status === 'Approved') || [];
  const rejectedSubmissions = submissions?.filter(s => s.status === 'Rejected') || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <ClipboardCheck className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Film Review Dashboard</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Review and approve filmmaker submissions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{pendingSubmissions.length}</div>
              <div className="text-sm text-muted-foreground">Pending Review</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{approvedSubmissions.length}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{rejectedSubmissions.length}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{submission.title}</CardTitle>
                      <CardDescription>Director: {submission.director}</CardDescription>
                    </div>
                    <Badge className="bg-orange-600 text-white">Pending</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{submission.description}</p>
                  <div className="flex space-x-2">
                    <Button size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Review
                    </Button>
                    <Button size="sm" variant="outline" className="text-green-600">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {approvedSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{submission.title}</CardTitle>
                      <CardDescription>Director: {submission.director}</CardDescription>
                    </div>
                    <Badge className="bg-green-600 text-white">Approved</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{submission.title}</CardTitle>
                      <CardDescription>Director: {submission.director}</CardDescription>
                    </div>
                    <Badge className="bg-red-600 text-white">Rejected</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
