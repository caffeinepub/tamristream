import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, Film, Image, Video } from 'lucide-react';
import { useAddMovie, useUploadMovieContent } from '../hooks/useQueries';
import { toast } from 'sonner';

export function UploadMovieForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [trailerFile, setTrailerFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const addMovie = useAddMovie();
  const uploadContent = useUploadMovieContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      let posterPath = '';
      let trailerPath = '';

      // Upload poster if provided
      if (posterFile) {
        setUploadProgress(25);
        const posterResult = await uploadContent.mutateAsync({
          file: posterFile,
          path: `movies/${title.toLowerCase().replace(/\s+/g, '-')}-poster.${posterFile.name.split('.').pop()}`,
          onProgress: (percentage) => {
            setUploadProgress(25 + (percentage * 0.25));
          }
        });
        posterPath = posterResult.path;
      }

      // Upload trailer if provided
      if (trailerFile) {
        setUploadProgress(50);
        const trailerResult = await uploadContent.mutateAsync({
          file: trailerFile,
          path: `movies/${title.toLowerCase().replace(/\s+/g, '-')}-trailer.${trailerFile.name.split('.').pop()}`,
          onProgress: (percentage) => {
            setUploadProgress(50 + (percentage * 0.25));
          }
        });
        trailerPath = trailerResult.path;
      }

      // Add movie to backend
      setUploadProgress(75);
      await addMovie.mutateAsync({
        title,
        description,
        coverImagePath: posterPath,
        trailerPath
      });

      setUploadProgress(100);
      toast.success('Movie added successfully!');
      
      // Reset form
      setTitle('');
      setDescription('');
      setPosterFile(null);
      setTrailerFile(null);
      
    } catch (error) {
      toast.error('Failed to add movie');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <Upload className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-3xl font-bold text-foreground">Upload Movie</h2>
            <p className="text-lg text-muted-foreground">Add new African movies to the catalog</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Film className="w-5 h-5" />
              <span>Movie Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Movie Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter movie title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter movie description"
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="poster">Movie Poster</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Image className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <input
                      id="poster"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPosterFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('poster')?.click()}
                      disabled={isUploading}
                    >
                      {posterFile ? posterFile.name : 'Choose Poster'}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trailer">Movie Trailer</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Video className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <input
                      id="trailer"
                      type="file"
                      accept="video/*"
                      onChange={(e) => setTrailerFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('trailer')?.click()}
                      disabled={isUploading}
                    >
                      {trailerFile ? trailerFile.name : 'Choose Trailer'}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      MP4, MOV up to 100MB
                    </p>
                  </div>
                </div>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isUploading || !title.trim() || !description.trim()}
              >
                {isUploading ? 'Uploading...' : 'Add Movie'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
