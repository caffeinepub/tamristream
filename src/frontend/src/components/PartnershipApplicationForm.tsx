import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Clock, XCircle, Send, Award, Sparkles } from 'lucide-react';
import { useApplyForPartnership, useGetPartnershipApplicationStatus, useGetPartnershipOffers } from '../hooks/useQueries';
import { toast } from 'sonner';

export function PartnershipApplicationForm() {
  const [formData, setFormData] = useState({
    creatorName: '',
    contactInfo: '',
    portfolioLink: '',
  });

  const { data: applicationStatus, isLoading: statusLoading } = useGetPartnershipApplicationStatus();
  const { data: offers, isLoading: offersLoading } = useGetPartnershipOffers();
  const applyForPartnership = useApplyForPartnership();

  const activeOffer = offers?.find(offer => offer.isActive);
  const slotsRemaining = activeOffer ? Number(activeOffer.creatorLimit - activeOffer.currentCount) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.creatorName || !formData.contactInfo || !formData.portfolioLink) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!activeOffer) {
      toast.error('No active partnership offer available');
      return;
    }

    try {
      await applyForPartnership.mutateAsync({
        ...formData,
        partnershipId: activeOffer.id,
      });
      toast.success('Partnership application submitted successfully!');
      setFormData({
        creatorName: '',
        contactInfo: '',
        portfolioLink: '',
      });
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (statusLoading || offersLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  // Show application status if already applied
  if (applicationStatus) {
    const statusConfig = {
      Pending: {
        icon: Clock,
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
        title: 'Application Under Review',
        description: 'Your partnership application is being reviewed by our team. We\'ll notify you once a decision has been made.',
      },
      Approved: {
        icon: CheckCircle,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30',
        title: 'Application Approved!',
        description: 'Congratulations! You\'ve been accepted into the First 100 Partnership Program. You now have access to all exclusive benefits.',
      },
      Rejected: {
        icon: XCircle,
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
        title: 'Application Not Approved',
        description: 'Unfortunately, your application was not approved at this time. You can still join TamriStream with standard creator benefits.',
      },
    };

    const config = statusConfig[applicationStatus.status as keyof typeof statusConfig];
    const StatusIcon = config.icon;

    return (
      <div className="container mx-auto px-4 py-8">
        <Card className={`max-w-2xl mx-auto ${config.bgColor} border-2 ${config.borderColor}`}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <StatusIcon className={`w-12 h-12 ${config.color}`} />
              <div>
                <CardTitle className="text-2xl">{config.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  Application Date: {new Date(Number(applicationStatus.applicationDate) / 1000000).toLocaleDateString()}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{config.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Creator Name:</span>
                <span className="text-sm font-medium">{applicationStatus.creatorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Contact Info:</span>
                <span className="text-sm font-medium">{applicationStatus.contactInfo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Portfolio:</span>
                <a href={applicationStatus.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-amber-500 hover:underline">
                  View Portfolio
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant={applicationStatus.status === 'Approved' ? 'default' : 'secondary'}>
                  {applicationStatus.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show application form
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-amber-500" />
            <h1 className="text-4xl font-bold">Partnership Application</h1>
            <Sparkles className="w-8 h-8 text-amber-500" />
          </div>
          <p className="text-xl text-muted-foreground">
            Apply to join the first 100 African creators on TamriStream
          </p>
          {activeOffer && (
            <Alert className="max-w-2xl mx-auto bg-amber-500/10 border-amber-500/30">
              <Award className="h-5 w-5 text-amber-500" />
              <AlertDescription className="text-amber-100">
                <strong>{slotsRemaining} spots remaining</strong> out of {Number(activeOffer.creatorLimit)} total partnership slots
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Benefits Reminder */}
        <Card className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              Exclusive Partnership Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-2 gap-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">Featured placement on launch page</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">Early access to analytics tools</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">Lifetime 10% platform fee (90% revenue share)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">Marketing support via TamriStream socials</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
            <CardDescription>
              Fill out the form below to apply for the partnership program. Our team will review your application and get back to you within 3-5 business days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="creatorName">Creator/Artist Name *</Label>
                <Input
                  id="creatorName"
                  value={formData.creatorName}
                  onChange={(e) => handleInputChange('creatorName', e.target.value)}
                  placeholder="Your name or stage name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactInfo">Contact Information *</Label>
                <Input
                  id="contactInfo"
                  type="email"
                  value={formData.contactInfo}
                  onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                  placeholder="Email address or phone number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolioLink">Portfolio Link *</Label>
                <Input
                  id="portfolioLink"
                  type="url"
                  value={formData.portfolioLink}
                  onChange={(e) => handleInputChange('portfolioLink', e.target.value)}
                  placeholder="https://your-portfolio.com or social media profile"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Provide a link to your portfolio, website, or social media profile showcasing your work
                </p>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black"
                  disabled={applyForPartnership.isPending || !activeOffer || slotsRemaining <= 0}
                >
                  {applyForPartnership.isPending ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : slotsRemaining <= 0 ? (
                    'Partnership Program Full'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="bg-card/30">
          <CardHeader>
            <CardTitle>What Happens Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                <span className="text-amber-500 font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Application Review</h4>
                <p className="text-sm text-muted-foreground">Our team reviews your portfolio and creator profile</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                <span className="text-amber-500 font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Decision Notification</h4>
                <p className="text-sm text-muted-foreground">You'll receive an email with our decision within 3-5 business days</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                <span className="text-amber-500 font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Onboarding & Benefits</h4>
                <p className="text-sm text-muted-foreground">If approved, you'll get immediate access to all partnership benefits</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
