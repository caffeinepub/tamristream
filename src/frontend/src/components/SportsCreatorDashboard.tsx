import { useGetSportsCreatorSubmissions, useSubmitSportsCreatorSubmission, useGetRevenueShare, useSetPaymentMethod } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Zap, Upload, DollarSign, BarChart3, Clock, CheckCircle, XCircle, Smartphone, Bitcoin } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import type { PaymentMethod } from '../backend';

export function SportsCreatorDashboard() {
  const { data: submissions, isLoading: submissionsLoading } = useGetSportsCreatorSubmissions();
  const { data: revenueShare, isLoading: revenueLoading } = useGetRevenueShare();
  const submitSubmission = useSubmitSportsCreatorSubmission();
  const setPaymentMethod = useSetPaymentMethod();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    creatorName: '',
    sportType: '',
    eventInfo: '',
    contactInfo: '',
    paymentPreferences: ''
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitSubmission.mutateAsync(formData);
      toast.success('Sports content submission successful!');
      setFormData({
        title: '',
        description: '',
        creatorName: '',
        sportType: '',
        eventInfo: '',
        contactInfo: '',
        paymentPreferences: ''
      });
    } catch (error) {
      toast.error('Failed to submit sports content');
    }
  };

  const handlePaymentMethodUpdate = async () => {
    if (!selectedPaymentMethod || !paymentDetails) {
      toast.error('Please select a payment method and provide details');
      return;
    }

    try {
      let method: PaymentMethod;
      switch (selectedPaymentMethod) {
        case 'mobileMoney':
          method = { __kind__: 'mobileMoney', mobileMoney: paymentDetails };
          break;
        case 'mPesa':
          method = { __kind__: 'mPesa', mPesa: paymentDetails };
          break;
        case 'crypto':
          method = { __kind__: 'crypto', crypto: paymentDetails };
          break;
        default:
          throw new Error('Invalid payment method');
      }

      await setPaymentMethod.mutateAsync(method);
      toast.success('Payment method updated successfully!');
      setSelectedPaymentMethod('');
      setPaymentDetails('');
    } catch (error) {
      toast.error('Failed to update payment method');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-600';
      case 'pending':
        return 'bg-yellow-600';
      case 'rejected':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const formatCurrency = (amount: bigint) => {
    return `$${(Number(amount) / 100).toFixed(2)}`;
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp / BigInt(1000000)));
    return date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Sports Creator Dashboard</h1>
            <Badge className="bg-blue-600 text-white">Sports</Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            Manage your sports content, track earnings, and grow your audience on TamriStream.
          </p>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Upload Content</TabsTrigger>
            <TabsTrigger value="submissions">My Submissions</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Upload Content Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Submit Sports Content</span>
                </CardTitle>
                <CardDescription>
                  Upload your sports highlights, analysis, or documentaries to share with the TamriStream community.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Content Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., CAF Champions League Highlights"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creatorName">Creator Name</Label>
                      <Input
                        id="creatorName"
                        value={formData.creatorName}
                        onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
                        placeholder="Your name or channel name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your sports content..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="sportType">Sport Type</Label>
                      <Select
                        value={formData.sportType}
                        onValueChange={(value) => setFormData({ ...formData, sportType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select sport type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="football">Football</SelectItem>
                          <SelectItem value="basketball">Basketball</SelectItem>
                          <SelectItem value="athletics">Athletics</SelectItem>
                          <SelectItem value="rugby">Rugby</SelectItem>
                          <SelectItem value="cricket">Cricket</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventInfo">Event Information</Label>
                      <Input
                        id="eventInfo"
                        value={formData.eventInfo}
                        onChange={(e) => setFormData({ ...formData, eventInfo: e.target.value })}
                        placeholder="e.g., Final Match, Championship 2024"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactInfo">Contact Information</Label>
                      <Input
                        id="contactInfo"
                        value={formData.contactInfo}
                        onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                        placeholder="Email or phone number"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentPreferences">Payment Preferences</Label>
                      <Input
                        id="paymentPreferences"
                        value={formData.paymentPreferences}
                        onChange={(e) => setFormData({ ...formData, paymentPreferences: e.target.value })}
                        placeholder="Mobile Money, M-Pesa, Crypto, etc."
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={submitSubmission.isPending}
                  >
                    {submitSubmission.isPending ? 'Submitting...' : 'Submit Sports Content'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Submissions</CardTitle>
                <CardDescription>
                  Track the status of your submitted sports content.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submissionsLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : !submissions || submissions.length === 0 ? (
                  <div className="text-center py-8">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No submissions yet. Upload your first sports content!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <div key={submission.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h4 className="font-semibold">{submission.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {submission.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>Sport: {submission.sportType}</span>
                              <span>Submitted: {formatDate(submission.created)}</span>
                            </div>
                          </div>
                          <Badge className={`text-white ${getStatusColor(submission.status)}`}>
                            {submission.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            {revenueLoading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-8 w-24 mb-2" />
                      <Skeleton className="h-6 w-16" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-muted-foreground">Total Earnings</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(revenueShare?.totalEarnings || BigInt(0))}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <span className="text-sm font-medium text-muted-foreground">Pending Payouts</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">
                        {formatCurrency(revenueShare?.pendingPayouts || BigInt(0))}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-muted-foreground">Revenue Share</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">70%</p>
                      <p className="text-xs text-muted-foreground">Industry leading</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Sharing Benefits</CardTitle>
                    <CardDescription>
                      TamriStream offers the best revenue sharing in the industry for sports creators.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Why Choose TamriStream?</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>70% revenue share (vs 55% on other platforms)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Monthly payouts with local payment methods</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>No hidden fees or complex calculations</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Direct fan support through community staking</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold">Payment Methods</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Smartphone className="w-4 h-4 text-blue-600" />
                            <span>Mobile Money (MTN, Airtel, etc.)</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Smartphone className="w-4 h-4 text-green-600" />
                            <span>M-Pesa and other mobile payments</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Bitcoin className="w-4 h-4 text-orange-600" />
                            <span>Cryptocurrency payments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>
                  Configure your preferred payment method for receiving earnings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mobileMoney">Mobile Money</SelectItem>
                        <SelectItem value="mPesa">M-Pesa</SelectItem>
                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Details</Label>
                    <Input
                      value={paymentDetails}
                      onChange={(e) => setPaymentDetails(e.target.value)}
                      placeholder={
                        selectedPaymentMethod === 'mobileMoney' ? 'Mobile number' :
                        selectedPaymentMethod === 'mPesa' ? 'M-Pesa number' :
                        selectedPaymentMethod === 'crypto' ? 'Wallet address' :
                        'Enter payment details'
                      }
                    />
                  </div>

                  <Button 
                    onClick={handlePaymentMethodUpdate}
                    disabled={setPaymentMethod.isPending || !selectedPaymentMethod || !paymentDetails}
                  >
                    {setPaymentMethod.isPending ? 'Updating...' : 'Update Payment Method'}
                  </Button>
                </div>

                {revenueShare?.paymentMethod && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Current Payment Method</h4>
                    <div className="text-sm text-muted-foreground">
                      {revenueShare.paymentMethod.__kind__ === 'mobileMoney' && (
                        <span>Mobile Money: {revenueShare.paymentMethod.mobileMoney}</span>
                      )}
                      {revenueShare.paymentMethod.__kind__ === 'mPesa' && (
                        <span>M-Pesa: {revenueShare.paymentMethod.mPesa}</span>
                      )}
                      {revenueShare.paymentMethod.__kind__ === 'crypto' && (
                        <span>Crypto: {revenueShare.paymentMethod.crypto}</span>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
