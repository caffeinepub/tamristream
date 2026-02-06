import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Clock, Users, Award, ExternalLink, TrendingUp } from 'lucide-react';
import { useGetAllPartnershipApplications, useGetPartnershipOffers, useReviewPartnershipApplication } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Principal } from '@icp-sdk/core/principal';

export function AdminPartnershipDashboard() {
  const { data: applications, isLoading: applicationsLoading } = useGetAllPartnershipApplications();
  const { data: offers, isLoading: offersLoading } = useGetPartnershipOffers();
  const reviewApplication = useReviewPartnershipApplication();

  const [selectedTab, setSelectedTab] = useState('pending');

  const activeOffer = offers?.find(offer => offer.isActive);
  const pendingApplications = applications?.filter(app => app.status === 'Pending') || [];
  const approvedApplications = applications?.filter(app => app.status === 'Approved') || [];
  const rejectedApplications = applications?.filter(app => app.status === 'Rejected') || [];

  const handleReview = async (applicantPrincipal: string, approved: boolean) => {
    try {
      await reviewApplication.mutateAsync({
        applicant: Principal.fromText(applicantPrincipal),
        approved,
      });
      toast.success(approved ? 'Application approved successfully' : 'Application rejected');
    } catch (error: any) {
      if (error.message?.includes('full')) {
        toast.error('Partnership program is full. Cannot approve more applications.');
      } else {
        toast.error('Failed to review application');
      }
    }
  };

  if (applicationsLoading || offersLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Partnership Program Management</h1>
          <p className="text-muted-foreground">
            Manage applications for the First 100 African Creators partnership program
          </p>
        </div>

        {/* Stats Overview */}
        {activeOffer && (
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Slots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span className="text-3xl font-bold">{Number(activeOffer.creatorLimit)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-3xl font-bold">{Number(activeOffer.currentCount)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-3xl font-bold">{Number(activeOffer.creatorLimit - activeOffer.currentCount)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span className="text-3xl font-bold">{pendingApplications.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Progress Bar */}
        {activeOffer && (
          <Card>
            <CardHeader>
              <CardTitle>Partnership Program Progress</CardTitle>
              <CardDescription>
                {Number(activeOffer.currentCount)} out of {Number(activeOffer.creatorLimit)} slots filled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="w-full bg-secondary rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-500"
                    style={{ width: `${(Number(activeOffer.currentCount) / Number(activeOffer.creatorLimit)) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {((Number(activeOffer.currentCount) / Number(activeOffer.creatorLimit)) * 100).toFixed(1)}% complete
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Applications Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Partnership Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">
                  Pending ({pendingApplications.length})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Approved ({approvedApplications.length})
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  Rejected ({rejectedApplications.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4 mt-6">
                {pendingApplications.length === 0 ? (
                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                      No pending applications at this time.
                    </AlertDescription>
                  </Alert>
                ) : (
                  pendingApplications.map((app) => (
                    <Card key={app.principal.toString()} className="border-amber-500/20">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{app.creatorName}</CardTitle>
                            <CardDescription className="mt-1">
                              Applied: {new Date(Number(app.applicationDate) / 1000000).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">Pending</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Contact Info</p>
                            <p className="text-sm font-medium">{app.contactInfo}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Portfolio</p>
                            <a 
                              href={app.portfolioLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-amber-500 hover:underline flex items-center gap-1"
                            >
                              View Portfolio <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleReview(app.principal.toString(), true)}
                            disabled={reviewApplication.isPending}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReview(app.principal.toString(), false)}
                            disabled={reviewApplication.isPending}
                            variant="destructive"
                            className="flex-1"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="approved" className="space-y-4 mt-6">
                {approvedApplications.length === 0 ? (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      No approved applications yet.
                    </AlertDescription>
                  </Alert>
                ) : (
                  approvedApplications.map((app) => (
                    <Card key={app.principal.toString()} className="border-green-500/20">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{app.creatorName}</CardTitle>
                            <CardDescription className="mt-1">
                              Applied: {new Date(Number(app.applicationDate) / 1000000).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Badge className="bg-green-600">Approved</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Contact Info</p>
                            <p className="text-sm font-medium">{app.contactInfo}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Portfolio</p>
                            <a 
                              href={app.portfolioLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-amber-500 hover:underline flex items-center gap-1"
                            >
                              View Portfolio <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="rejected" className="space-y-4 mt-6">
                {rejectedApplications.length === 0 ? (
                  <Alert>
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                      No rejected applications.
                    </AlertDescription>
                  </Alert>
                ) : (
                  rejectedApplications.map((app) => (
                    <Card key={app.principal.toString()} className="border-red-500/20">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{app.creatorName}</CardTitle>
                            <CardDescription className="mt-1">
                              Applied: {new Date(Number(app.applicationDate) / 1000000).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Badge variant="destructive">Rejected</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Contact Info</p>
                            <p className="text-sm font-medium">{app.contactInfo}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Portfolio</p>
                            <a 
                              href={app.portfolioLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-amber-500 hover:underline flex items-center gap-1"
                            >
                              View Portfolio <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
