import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Upload, CheckCircle2, Clock, XCircle, Info } from 'lucide-react';
import { toast } from 'sonner';
import { useRegisterCreator, useGetCreatorVerificationStatus } from '../hooks/useQueries';

export function CreatorVerificationForm() {
  const [formData, setFormData] = useState({
    contactInfo: '',
    creatorType: '',
    identityDocument: ''
  });

  const registerCreator = useRegisterCreator();
  const { data: verificationStatus, isLoading } = useGetCreatorVerificationStatus();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.contactInfo || !formData.creatorType) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await registerCreator.mutateAsync({
        contactInfo: formData.contactInfo,
        creatorType: formData.creatorType,
        identityDocument: formData.identityDocument || null
      });
      toast.success('Verification request submitted! We will review your application within 24-48 hours.');
    } catch (error) {
      toast.error('Failed to submit verification request');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (verificationStatus) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <div>
                <CardTitle>Creator Verification Status</CardTitle>
                <CardDescription>Your verification application status</CardDescription>
              </div>
            </div>
            <Badge 
              variant={verificationStatus.verified ? 'default' : verificationStatus.status === 'Rejected' ? 'destructive' : 'secondary'}
              className="text-sm"
            >
              {verificationStatus.verified && <CheckCircle2 className="w-4 h-4 mr-1" />}
              {verificationStatus.status === 'Pending' && <Clock className="w-4 h-4 mr-1" />}
              {verificationStatus.status === 'Rejected' && <XCircle className="w-4 h-4 mr-1" />}
              {verificationStatus.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Creator Type</Label>
              <p className="font-medium">{verificationStatus.creatorType}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Contact Info</Label>
              <p className="font-medium">{verificationStatus.contactInfo}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Submission Date</Label>
              <p className="font-medium">
                {new Date(Number(verificationStatus.submissionDate / BigInt(1000000))).toLocaleDateString()}
              </p>
            </div>
            {verificationStatus.verificationDate && (
              <div>
                <Label className="text-muted-foreground">Verification Date</Label>
                <p className="font-medium">
                  {new Date(Number(verificationStatus.verificationDate / BigInt(1000000))).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {verificationStatus.verified && (
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                Your creator account is verified! You can now upload content and start earning.
              </AlertDescription>
            </Alert>
          )}

          {verificationStatus.status === 'Pending' && (
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Your verification is being reviewed. This typically takes 24-48 hours. We'll notify you once complete.
              </AlertDescription>
            </Alert>
          )}

          {verificationStatus.status === 'Rejected' && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                Your verification was not approved. Please contact support for more information.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <div>
            <CardTitle>Creator Verification</CardTitle>
            <CardDescription>Register and verify your identity to start uploading content</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              All creators must verify their identity before uploading content. This ensures quality and authenticity on TamriStream.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="creatorType">Creator Type *</Label>
              <Select value={formData.creatorType} onValueChange={(value) => setFormData({ ...formData, creatorType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select creator type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="filmmaker">Filmmaker</SelectItem>
                  <SelectItem value="musician">Musician</SelectItem>
                  <SelectItem value="sports-creator">Sports Content Creator</SelectItem>
                  <SelectItem value="podcast-creator">Podcast Creator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactInfo">Contact Information *</Label>
              <Input
                id="contactInfo"
                value={formData.contactInfo}
                onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                placeholder="Email or phone number"
                required
              />
              <p className="text-xs text-muted-foreground">
                We'll use this to contact you about your verification status
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="identityDocument">Identity Document (Optional)</Label>
              <Input
                id="identityDocument"
                value={formData.identityDocument}
                onChange={(e) => setFormData({ ...formData, identityDocument: e.target.value })}
                placeholder="Document reference or ID number"
              />
              <p className="text-xs text-muted-foreground">
                Providing identity verification helps speed up the approval process
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={registerCreator.isPending} className="flex-1">
              {registerCreator.isPending ? (
                <>
                  <Upload className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Submit Verification
                </>
              )}
            </Button>
          </div>

          <div className="pt-4 border-t border-border">
            <img 
              src="/assets/generated/creator-identity-verification-interface.dim_800x600.png" 
              alt="Creator verification process" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
