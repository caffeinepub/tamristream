import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileVideo, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useSubmitFilmmakerSubmission } from '../hooks/useQueries';

export function FilmmakerUploadSection() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    director: '',
    cast: '',
    category: '',
    rating: '',
    posterPath: '',
    trailerPath: '',
    rightsVerification: '',
    contactInfo: '',
    paymentPreferences: ''
  });

  const submitFilmMutation = useSubmitFilmmakerSubmission();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.director) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await submitFilmMutation.mutateAsync(formData);
      toast.success('Film submitted successfully! Our team will review it soon.');
      setFormData({
        title: '',
        description: '',
        director: '',
        cast: '',
        category: '',
        rating: '',
        posterPath: '',
        trailerPath: '',
        rightsVerification: '',
        contactInfo: '',
        paymentPreferences: ''
      });
    } catch (error) {
      toast.error('Failed to submit film. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <FileVideo className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Submit Your Film</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Share your African story with the world. Submit your film for review and distribution on TamriStream.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Film Submission Form</CardTitle>
            <CardDescription>
              Fill in the details about your film. Our team will review your submission within 5-7 business days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Film Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter film title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="director">Director *</Label>
                  <Input
                    id="director"
                    value={formData.director}
                    onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                    placeholder="Director name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a detailed description of your film"
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cast">Cast</Label>
                  <Input
                    id="cast"
                    value={formData.cast}
                    onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
                    placeholder="Main cast members"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drama">Drama</SelectItem>
                      <SelectItem value="comedy">Comedy</SelectItem>
                      <SelectItem value="action">Action</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="thriller">Thriller</SelectItem>
                      <SelectItem value="documentary">Documentary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactInfo">Contact Information *</Label>
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
                  <Select value={formData.paymentPreferences} onValueChange={(value) => setFormData({ ...formData, paymentPreferences: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mobile-money">Mobile Money</SelectItem>
                      <SelectItem value="mpesa">M-Pesa</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rightsVerification">Rights Verification</Label>
                <Textarea
                  id="rightsVerification"
                  value={formData.rightsVerification}
                  onChange={(e) => setFormData({ ...formData, rightsVerification: e.target.value })}
                  placeholder="Confirm you own the rights to this content"
                  rows={2}
                />
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={submitFilmMutation.isPending} className="flex-1">
                  {submitFilmMutation.isPending ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Submit Film
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => setFormData({
                  title: '',
                  description: '',
                  director: '',
                  cast: '',
                  category: '',
                  rating: '',
                  posterPath: '',
                  trailerPath: '',
                  rightsVerification: '',
                  contactInfo: '',
                  paymentPreferences: ''
                })}>
                  Clear Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
          <CardHeader>
            <CardTitle>Why Submit to TamriStream?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Earn 70% of revenue from your content</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Reach millions of African cinema enthusiasts</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Transparent reporting and timely payouts</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Professional curation and quality control</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
