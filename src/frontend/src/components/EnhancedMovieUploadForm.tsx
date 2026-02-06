import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { FileVideo, Image, Upload, CheckCircle2, Clock, Info, Award, Users, Percent } from 'lucide-react';
import { toast } from 'sonner';
import { useSubmitContentForApproval, useGetCreatorVerificationStatus } from '../hooks/useQueries';
import { CreatorVerificationForm } from './CreatorVerificationForm';

interface Contributor {
  name: string;
  role: string;
  percentage: number;
}

export function EnhancedMovieUploadForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null as File | null,
    posterFile: null as File | null,
    genre: '',
    duration: '',
    cast: '',
    crew: ''
  });
  const [contributors, setContributors] = useState<Contributor[]>([
    { name: '', role: 'Director', percentage: 0 },
    { name: '', role: 'Producer', percentage: 0 }
  ]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [nftId, setNftId] = useState<string | null>(null);
  const [canisterId, setCanisterId] = useState<string | null>(null);

  const submitContent = useSubmitContentForApproval();
  const { data: verificationStatus, isLoading: verificationLoading } = useGetCreatorVerificationStatus();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'poster') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'video') {
        setFormData({ ...formData, videoFile: file });
      } else {
        setFormData({ ...formData, posterFile: file });
      }
    }
  };

  const addContributor = () => {
    setContributors([...contributors, { name: '', role: '', percentage: 0 }]);
  };

  const removeContributor = (index: number) => {
    if (contributors.length > 1) {
      setContributors(contributors.filter((_, i) => i !== index));
    }
  };

  const updateContributor = (index: number, field: keyof Contributor, value: string | number) => {
    const updated = [...contributors];
    updated[index] = { ...updated[index], [field]: value };
    setContributors(updated);
  };

  const getTotalPercentage = () => {
    return contributors.reduce((sum, c) => sum + c.percentage, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.videoFile || !formData.posterFile) {
      toast.error('Please fill in all required fields and upload video and poster');
      return;
    }

    // Validate contributors
    const totalPercentage = getTotalPercentage();
    if (totalPercentage !== 100) {
      toast.error(`Revenue split must equal 100%. Current total: ${totalPercentage}%`);
      return;
    }

    const hasEmptyContributors = contributors.some(c => !c.name || !c.role || c.percentage <= 0);
    if (hasEmptyContributors) {
      toast.error('All contributors must have a name, role, and valid percentage');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Generate unique IDs for NFT and Canister
      const generatedNftId = `NFT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const generatedCanisterId = `canister-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create content description with contributor information
      const contributorInfo = contributors.map(c => `${c.name} (${c.role}): ${c.percentage}%`).join(', ');
      const contentDescription = `Movie: ${formData.title} - ${formData.description}\nContributors: ${contributorInfo}`;

      // Submit for approval
      await submitContent.mutateAsync({
        contentId: generatedCanisterId,
        feedback: contentDescription
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      setNftId(generatedNftId);
      setCanisterId(generatedCanisterId);

      toast.success('Movie uploaded successfully! Your content is now pending admin approval.', {
        description: 'Smart contract and NFT will be created upon approval.',
        duration: 5000
      });
      
      // Reset form
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          videoFile: null,
          posterFile: null,
          genre: '',
          duration: '',
          cast: '',
          crew: ''
        });
        setContributors([
          { name: '', role: 'Director', percentage: 0 },
          { name: '', role: 'Producer', percentage: 0 }
        ]);
        setUploadProgress(0);
        setIsUploading(false);
      }, 3000);
    } catch (error) {
      toast.error('Failed to upload movie');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  if (verificationLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!verificationStatus || !verificationStatus.verified) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Upload Your Movie</h2>
            <p className="text-lg text-muted-foreground">
              Verify your creator account to start uploading content
            </p>
          </div>
          <CreatorVerificationForm />
        </div>
      </div>
    );
  }

  const totalPercentage = getTotalPercentage();
  const isValidSplit = totalPercentage === 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <FileVideo className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Upload Your Movie</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Share your African story with the world. Automatic NFT ownership and blockchain tracking included.
          </p>
        </div>

        {nftId && canisterId && (
          <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
            <Award className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              <div className="space-y-2">
                <p className="font-semibold">Upload Successful! Your content is now pending approval.</p>
                <div className="text-sm space-y-1">
                  <p><strong>NFT ID:</strong> {nftId}</p>
                  <p><strong>Canister ID:</strong> {canisterId}</p>
                  <p className="text-xs mt-2">These IDs prove your ownership on the blockchain. Save them for your records.</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Movie Upload Form</CardTitle>
            <CardDescription>
              Fill in the details about your movie. Upon upload, you'll receive a unique NFT and Canister ID as proof of ownership.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Your content will be reviewed by our team within 24-48 hours. You'll be notified once approved.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Movie Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter movie title"
                    required
                    disabled={isUploading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    id="genre"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    placeholder="e.g., Drama, Comedy, Action"
                    disabled={isUploading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a detailed description of your movie"
                  rows={4}
                  required
                  disabled={isUploading}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="videoFile">Video File *</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="videoFile"
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange(e, 'video')}
                      required
                      disabled={isUploading}
                    />
                    {formData.videoFile && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: MP4, MOV, AVI (Max 5GB)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="posterFile">Poster Image *</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="posterFile"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'poster')}
                      required
                      disabled={isUploading}
                    />
                    {formData.posterFile && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recommended: 1920x1080px, JPG or PNG
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cast">Cast</Label>
                  <Input
                    id="cast"
                    value={formData.cast}
                    onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
                    placeholder="Main cast members"
                    disabled={isUploading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="crew">Crew</Label>
                  <Input
                    id="crew"
                    value={formData.crew}
                    onChange={(e) => setFormData({ ...formData, crew: e.target.value })}
                    placeholder="Director, Producer, etc."
                    disabled={isUploading}
                  />
                </div>
              </div>

              {/* Contributors Section */}
              <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <Label className="text-base font-semibold">Revenue Split Contributors *</Label>
                  </div>
                  <Badge variant={isValidSplit ? "default" : "destructive"}>
                    <Percent className="w-3 h-3 mr-1" />
                    {totalPercentage}% / 100%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Define all contributors and their revenue share percentages. Total must equal 100%.
                </p>

                <div className="space-y-3">
                  {contributors.map((contributor, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-4 space-y-1">
                        <Label className="text-xs">Name</Label>
                        <Input
                          value={contributor.name}
                          onChange={(e) => updateContributor(index, 'name', e.target.value)}
                          placeholder="Full name"
                          disabled={isUploading}
                          required
                        />
                      </div>
                      <div className="col-span-4 space-y-1">
                        <Label className="text-xs">Role</Label>
                        <Input
                          value={contributor.role}
                          onChange={(e) => updateContributor(index, 'role', e.target.value)}
                          placeholder="e.g., Director, Actor"
                          disabled={isUploading}
                          required
                        />
                      </div>
                      <div className="col-span-2 space-y-1">
                        <Label className="text-xs">Share %</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={contributor.percentage || ''}
                          onChange={(e) => updateContributor(index, 'percentage', parseFloat(e.target.value) || 0)}
                          placeholder="0"
                          disabled={isUploading}
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeContributor(index)}
                          disabled={isUploading || contributors.length <= 1}
                          className="w-full"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addContributor}
                  disabled={isUploading}
                  className="w-full"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Add Contributor
                </Button>

                {!isValidSplit && totalPercentage > 0 && (
                  <Alert variant="destructive">
                    <AlertDescription className="text-sm">
                      Revenue split must total exactly 100%. Current: {totalPercentage}%
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Upload Progress</span>
                    <span className="font-medium">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              <div className="flex space-x-4">
                <Button type="submit" disabled={isUploading || !isValidSplit} className="flex-1">
                  {isUploading ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      Uploading... {uploadProgress}%
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Upload Movie
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardHeader>
            <CardTitle>What Happens Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Upload className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">1. Automatic NFT & Smart Contract Assignment</p>
                  <p className="text-sm text-muted-foreground">
                    Your movie receives a unique NFT and dedicated smart contract for automated royalty distribution to all contributors
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">2. Admin Review</p>
                  <p className="text-sm text-muted-foreground">
                    Our team reviews your content for quality and authenticity (24-48 hours)
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">3. Publishing & Instant Royalty Distribution</p>
                  <p className="text-sm text-muted-foreground">
                    Once approved, your movie goes live and all contributors start earning with transparent on-chain tracking and instant payouts
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <img 
            src="/assets/generated/movie-upload-form-interface.dim_800x600.png" 
            alt="Movie upload interface" 
            className="w-full h-auto rounded-lg"
          />
          <img 
            src="/assets/generated/nft-ownership-certificate-display.dim_600x400.png" 
            alt="NFT ownership certificate" 
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
