import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Film, Users, Globe, Send, CheckCircle, TrendingUp, Shield, ExternalLink, Sparkles, Calendar, GraduationCap, Building2, Vote } from 'lucide-react';
import { useSubmitCreatorFilm } from '../hooks/useQueries';
import { toast } from 'sonner';
import { RevenueModelDisplay } from './RevenueModelDisplay';
import { FutureAddOnsSection } from './FutureAddOnsSection';
import { useNavigate } from '@tanstack/react-router';

export function CreatorPortal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    filmTitle: '',
    description: '',
    creatorName: '',
    contactInfo: '',
    category: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitFilm = useSubmitCreatorFilm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.filmTitle || !formData.description || !formData.creatorName || !formData.contactInfo || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await submitFilm.mutateAsync(formData);
      toast.success('Film submission received! We\'ll review it and get back to you.');
      setIsSubmitted(true);
      setFormData({
        filmTitle: '',
        description: '',
        creatorName: '',
        contactInfo: '',
        category: ''
      });
    } catch (error) {
      toast.error('Failed to submit film. Please try again.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header with Bold Promise */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
              <Film className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">For Creators</h1>
              <p className="text-lg text-muted-foreground">Share Your Story with the World</p>
            </div>
          </div>

          {/* Bold Promise Banner */}
          <Alert className="max-w-4xl mx-auto border-2 border-amber-500/50 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
            <Sparkles className="h-5 w-5 text-amber-600" />
            <AlertDescription className="text-lg font-semibold text-amber-900 dark:text-amber-100">
              <div className="space-y-2">
                <p className="text-xl">"TamriStream pays more per view than any major platform"</p>
                <div className="flex items-center justify-center space-x-2 text-amber-700 dark:text-amber-300">
                  <Shield className="w-4 h-4" />
                  <span>— and you can verify it yourself on the blockchain</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </AlertDescription>
          </Alert>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            TamriStream empowers African filmmakers to reach global audiences while earning fair revenue from their content. Submit your film for distribution and join our growing community of storytellers.
          </p>
        </div>

        {/* Tabbed Interface */}
        <Tabs defaultValue="submit" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="submit">
              <Film className="w-4 h-4 mr-2" />
              Submit Film
            </TabsTrigger>
            <TabsTrigger value="originals">
              <Vote className="w-4 h-4 mr-2" />
              Tamri Originals
            </TabsTrigger>
            <TabsTrigger value="academy">
              <GraduationCap className="w-4 h-4 mr-2" />
              Creator Academy
            </TabsTrigger>
            <TabsTrigger value="hubs">
              <Building2 className="w-4 h-4 mr-2" />
              Film Hubs
            </TabsTrigger>
          </TabsList>

          {/* Submit Film Tab */}
          <TabsContent value="submit" className="space-y-8">
            {/* Revenue Model Display */}
            <RevenueModelDisplay />

            {/* Benefits Section */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center border-0 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Global Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Reach audiences worldwide through our international streaming platform with fair revenue sharing.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-gradient-to-br from-accent/5 to-secondary/5">
                <CardHeader>
                  <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                  <CardTitle>Community Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Join a supportive community of African filmmakers and industry professionals with shared success.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                <CardHeader>
                  <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <CardTitle>Fair Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Earn competitive revenue shares with transparent reporting, timely payouts, and local payment options.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Submission Form */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Submit Your Film</CardTitle>
                <CardDescription>
                  Fill out the form below to submit your film for review. Our team will evaluate your submission and contact you within 5-7 business days with revenue sharing details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <h3 className="text-xl font-semibold text-foreground">Submission Received!</h3>
                    <p className="text-muted-foreground">
                      Thank you for submitting your film. Our review team will evaluate your submission and contact you soon with revenue sharing information.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Submit Another Film
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="filmTitle">Film Title *</Label>
                      <Input
                        id="filmTitle"
                        value={formData.filmTitle}
                        onChange={(e) => handleInputChange('filmTitle', e.target.value)}
                        placeholder="Enter your film title"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select film category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="drama">Drama</SelectItem>
                          <SelectItem value="comedy">Comedy</SelectItem>
                          <SelectItem value="action">Action</SelectItem>
                          <SelectItem value="romance">Romance</SelectItem>
                          <SelectItem value="thriller">Thriller</SelectItem>
                          <SelectItem value="documentary">Documentary</SelectItem>
                          <SelectItem value="horror">Horror</SelectItem>
                          <SelectItem value="family">Family</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Film Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Provide a detailed description of your film, including plot, themes, and target audience"
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="creatorName">Creator/Director Name *</Label>
                      <Input
                        id="creatorName"
                        value={formData.creatorName}
                        onChange={(e) => handleInputChange('creatorName', e.target.value)}
                        placeholder="Your name or production company"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactInfo">Contact Information *</Label>
                      <Input
                        id="contactInfo"
                        value={formData.contactInfo}
                        onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                        placeholder="Email address or phone number"
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                        disabled={submitFilm.isPending}
                      >
                        {submitFilm.isPending ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Submit Film for Review
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tamri Originals Tab */}
          <TabsContent value="originals" className="space-y-6">
            <Card className="border-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Vote className="w-6 h-6" />
                  Submit Original Content Proposal
                </CardTitle>
                <CardDescription className="text-zinc-300">
                  Propose your original series or film for community funding through our DAO voting system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Project Title</Label>
                    <Input placeholder="Enter your project title" className="bg-black/40 border-purple-500/30 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Funding Goal ($)</Label>
                    <Input type="number" placeholder="50000" className="bg-black/40 border-purple-500/30 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Project Description</Label>
                  <Textarea placeholder="Describe your original content project..." rows={4} className="bg-black/40 border-purple-500/30 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Budget Breakdown</Label>
                  <Textarea placeholder="Provide detailed budget allocation..." rows={3} className="bg-black/40 border-purple-500/30 text-white" />
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Submit for Community Vote
                </Button>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6 text-center">
                  <Vote className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">DAO Voting</h3>
                  <p className="text-sm text-zinc-400">Community votes on which projects get funded</p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Revenue Sharing</h3>
                  <p className="text-sm text-zinc-400">Funders earn returns based on performance</p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Transparent</h3>
                  <p className="text-sm text-zinc-400">All funding tracked on blockchain</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Creator Academy Tab */}
          <TabsContent value="academy" className="space-y-6">
            <Card className="border-0 bg-gradient-to-r from-blue-900/50 to-cyan-900/50">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <GraduationCap className="w-6 h-6" />
                  Your Learning Dashboard
                </CardTitle>
                <CardDescription className="text-zinc-300">
                  Track your progress through free filmmaking and blockchain courses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-black/40 border-blue-500/30">
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-white mb-1">3</div>
                      <div className="text-sm text-zinc-400">Courses Enrolled</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-black/40 border-cyan-500/30">
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-white mb-1">1</div>
                      <div className="text-sm text-zinc-400">Certifications Earned</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-black/40 border-green-500/30">
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-white mb-1">67%</div>
                      <div className="text-sm text-zinc-400">Overall Progress</div>
                    </CardContent>
                  </Card>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  onClick={() => navigate({ to: '/creator-academy' })}
                >
                  Browse All Courses
                </Button>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Recommended Courses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {['Advanced Cinematography', 'NFT Basics for Creators', 'Script Writing Masterclass'].map((course, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                      <span className="text-zinc-300">{course}</span>
                      <Button size="sm" variant="outline">Enroll</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Your Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-white font-semibold">Filmmaking Fundamentals</div>
                      <div className="text-xs text-zinc-400">Completed Jan 2025</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Film Hubs Tab */}
          <TabsContent value="hubs" className="space-y-6">
            <Card className="border-0 bg-gradient-to-r from-green-900/50 to-emerald-900/50">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Building2 className="w-6 h-6" />
                  Find a Film Hub Near You
                </CardTitle>
                <CardDescription className="text-zinc-300">
                  Access professional equipment and collaborative spaces at regional creator centers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Your Location</Label>
                  <Select>
                    <SelectTrigger className="bg-black/40 border-green-500/30 text-white">
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lagos">Lagos, Nigeria</SelectItem>
                      <SelectItem value="accra">Accra, Ghana</SelectItem>
                      <SelectItem value="nairobi">Nairobi, Kenya</SelectItem>
                      <SelectItem value="cape-town">Cape Town, South Africa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                  Find Nearby Hubs
                </Button>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Hub Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    'Professional camera equipment',
                    'Editing suites with software',
                    'Sound stages & studios',
                    'Networking events',
                    'Mentorship programs'
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Partnership Network</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-zinc-300">
                  <p className="text-sm">We partner with:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• 15+ African universities</li>
                    <li>• 10+ media houses</li>
                    <li>• Regional film institutes</li>
                    <li>• Cultural organizations</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Future Add-ons Section */}
        <div className="pt-8">
          <FutureAddOnsSection />
        </div>

        {/* Additional Information */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 bg-card/30">
            <CardHeader>
              <CardTitle>Submission Guidelines & Revenue Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">What We're Looking For:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Original African stories and perspectives</li>
                    <li>• High production quality (HD minimum)</li>
                    <li>• Complete films ready for distribution</li>
                    <li>• Clear ownership and distribution rights</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Revenue & Payouts:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 70-90% revenue share for creators</li>
                    <li>• Instant payout processing</li>
                    <li>• ICP, USDT, USDC, Paystack, Stripe, Mobile Money</li>
                    <li>• Transparent earnings dashboard</li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">African Content</Badge>
                  <Badge variant="secondary">Global Distribution</Badge>
                  <Badge variant="secondary">70-90% Revenue Share</Badge>
                  <Badge variant="secondary">Local Payments</Badge>
                  <Badge variant="secondary">Marketing Support</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
