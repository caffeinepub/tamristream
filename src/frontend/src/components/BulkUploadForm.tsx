import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FolderUp, Film, Image, Video, X, Plus, Upload, Eye, Check, AlertCircle } from 'lucide-react';
import { useBulkUploadMovies, useUploadMovieContent } from '../hooks/useQueries';
import { toast } from 'sonner';

interface MovieItem {
  id: string;
  title: string;
  description: string;
  posterFile: File | null;
  trailerFile: File | null;
  posterPath?: string;
  trailerPath?: string;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  progress: number;
  error?: string;
}

export function BulkUploadForm() {
  const [movieItems, setMovieItems] = useState<MovieItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const bulkUpload = useBulkUploadMovies();
  const uploadContent = useUploadMovieContent();

  const addNewMovie = () => {
    const newMovie: MovieItem = {
      id: Date.now().toString(),
      title: '',
      description: '',
      posterFile: null,
      trailerFile: null,
      status: 'pending',
      progress: 0,
    };
    setMovieItems([...movieItems, newMovie]);
  };

  const removeMovie = (id: string) => {
    setMovieItems(movieItems.filter(item => item.id !== id));
  };

  const updateMovie = (id: string, updates: Partial<MovieItem>) => {
    setMovieItems(movieItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    
    // Create new movie items for dropped files
    const newMovies: MovieItem[] = [];
    const maxItems = Math.max(imageFiles.length, videoFiles.length);
    
    for (let i = 0; i < maxItems; i++) {
      const newMovie: MovieItem = {
        id: (Date.now() + i).toString(),
        title: '',
        description: '',
        posterFile: imageFiles[i] || null,
        trailerFile: videoFiles[i] || null,
        status: 'pending',
        progress: 0,
      };
      newMovies.push(newMovie);
    }
    
    setMovieItems([...movieItems, ...newMovies]);
    toast.success(`Added ${newMovies.length} movie items from dropped files`);
  }, [movieItems]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const uploadAllFiles = async () => {
    if (movieItems.length === 0) {
      toast.error('Please add at least one movie');
      return;
    }

    const validMovies = movieItems.filter(item => item.title.trim() && item.description.trim());
    if (validMovies.length === 0) {
      toast.error('Please fill in title and description for at least one movie');
      return;
    }

    setIsUploading(true);
    setOverallProgress(0);

    try {
      let completedItems = 0;
      const totalItems = validMovies.length;

      // Upload files for each movie
      for (const movie of validMovies) {
        updateMovie(movie.id, { status: 'uploading', progress: 0 });

        try {
          let posterPath = '';
          let trailerPath = '';

          // Upload poster if provided
          if (movie.posterFile) {
            const posterResult = await uploadContent.mutateAsync({
              file: movie.posterFile,
              path: `movies/${movie.title.toLowerCase().replace(/\s+/g, '-')}-poster.${movie.posterFile.name.split('.').pop()}`,
              onProgress: (percentage) => {
                updateMovie(movie.id, { progress: percentage * 0.5 });
              }
            });
            posterPath = posterResult.path;
          }

          // Upload trailer if provided
          if (movie.trailerFile) {
            const trailerResult = await uploadContent.mutateAsync({
              file: movie.trailerFile,
              path: `movies/${movie.title.toLowerCase().replace(/\s+/g, '-')}-trailer.${movie.trailerFile.name.split('.').pop()}`,
              onProgress: (percentage) => {
                updateMovie(movie.id, { progress: 50 + (percentage * 0.5) });
              }
            });
            trailerPath = trailerResult.path;
          }

          updateMovie(movie.id, { 
            posterPath, 
            trailerPath, 
            progress: 100, 
            status: 'completed' 
          });

          completedItems++;
          setOverallProgress((completedItems / totalItems) * 100);

        } catch (error) {
          updateMovie(movie.id, { 
            status: 'error', 
            error: 'Failed to upload files',
            progress: 0 
          });
          console.error(`Upload error for ${movie.title}:`, error);
        }
      }

      // Submit all movies to backend
      const completedMovies = movieItems.filter(item => item.status === 'completed');
      if (completedMovies.length > 0) {
        const bulkItems = completedMovies.map(movie => ({
          title: movie.title,
          description: movie.description,
          coverImagePath: movie.posterPath || '',
          trailerPath: movie.trailerPath || '',
        }));

        await bulkUpload.mutateAsync(bulkItems);
        toast.success(`Successfully uploaded ${completedMovies.length} movies!`);
        
        // Reset form
        setMovieItems([]);
        setShowPreview(false);
      }

    } catch (error) {
      toast.error('Failed to complete bulk upload');
      console.error('Bulk upload error:', error);
    } finally {
      setIsUploading(false);
      setOverallProgress(0);
    }
  };

  const getStatusIcon = (status: MovieItem['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'uploading':
        return <Upload className="w-4 h-4 text-blue-500 animate-pulse" />;
      default:
        return <Film className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <FolderUp className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-3xl font-bold text-foreground">Bulk Upload Movies</h2>
              <p className="text-lg text-muted-foreground">Add multiple movies to the catalog in one session</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-sm">
              {movieItems.length} movies
            </Badge>
            {movieItems.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Hide' : 'Preview'}
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FolderUp className="w-5 h-5" />
                  <span>Drag & Drop Files</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <FolderUp className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">Drop your files here</p>
                      <p className="text-sm text-muted-foreground">
                        Images and videos will be automatically organized
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Image className="w-3 h-3" />
                        <span>Images: PNG, JPG</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Video className="w-3 h-3" />
                        <span>Videos: MP4, MOV</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <Button onClick={addNewMovie} variant="outline" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Movie Manually</span>
              </Button>
              
              {movieItems.length > 0 && (
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setMovieItems([])}
                    variant="outline"
                    size="sm"
                  >
                    Clear All
                  </Button>
                  <Button
                    onClick={uploadAllFiles}
                    disabled={isUploading || movieItems.length === 0}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{isUploading ? 'Uploading...' : 'Upload All'}</span>
                  </Button>
                </div>
              )}
            </div>

            {isUploading && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{Math.round(overallProgress)}%</span>
                    </div>
                    <Progress value={overallProgress} />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Movie Items List */}
          <div className="space-y-6">
            {movieItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Movie Queue ({movieItems.length})</span>
                    <Badge variant={showPreview ? "default" : "outline"}>
                      {showPreview ? 'Preview Mode' : 'Edit Mode'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {movieItems.map((movie, index) => (
                        <Card key={movie.id} className="relative">
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(movie.status)}
                                <span className="font-medium">Movie {index + 1}</span>
                                {movie.status === 'uploading' && (
                                  <Badge variant="outline" className="text-xs">
                                    {Math.round(movie.progress)}%
                                  </Badge>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeMovie(movie.id)}
                                disabled={isUploading}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>

                            {showPreview ? (
                              <div className="space-y-2">
                                <div>
                                  <p className="font-medium">{movie.title || 'Untitled'}</p>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {movie.description || 'No description'}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                  {movie.posterFile && (
                                    <div className="flex items-center space-x-1">
                                      <Image className="w-3 h-3" />
                                      <span>{movie.posterFile.name}</span>
                                    </div>
                                  )}
                                  {movie.trailerFile && (
                                    <div className="flex items-center space-x-1">
                                      <Video className="w-3 h-3" />
                                      <span>{movie.trailerFile.name}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`title-${movie.id}`}>Title *</Label>
                                  <Input
                                    id={`title-${movie.id}`}
                                    value={movie.title}
                                    onChange={(e) => updateMovie(movie.id, { title: e.target.value })}
                                    placeholder="Enter movie title"
                                    disabled={isUploading}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`description-${movie.id}`}>Description *</Label>
                                  <Textarea
                                    id={`description-${movie.id}`}
                                    value={movie.description}
                                    onChange={(e) => updateMovie(movie.id, { description: e.target.value })}
                                    placeholder="Enter movie description"
                                    rows={3}
                                    disabled={isUploading}
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Poster</Label>
                                    <div className="border border-border rounded p-3 text-center">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => updateMovie(movie.id, { posterFile: e.target.files?.[0] || null })}
                                        className="hidden"
                                        id={`poster-${movie.id}`}
                                        disabled={isUploading}
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => document.getElementById(`poster-${movie.id}`)?.click()}
                                        disabled={isUploading}
                                        className="w-full"
                                      >
                                        <Image className="w-4 h-4 mr-2" />
                                        {movie.posterFile ? movie.posterFile.name.slice(0, 15) + '...' : 'Choose'}
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label>Trailer</Label>
                                    <div className="border border-border rounded p-3 text-center">
                                      <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => updateMovie(movie.id, { trailerFile: e.target.files?.[0] || null })}
                                        className="hidden"
                                        id={`trailer-${movie.id}`}
                                        disabled={isUploading}
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => document.getElementById(`trailer-${movie.id}`)?.click()}
                                        disabled={isUploading}
                                        className="w-full"
                                      >
                                        <Video className="w-4 h-4 mr-2" />
                                        {movie.trailerFile ? movie.trailerFile.name.slice(0, 15) + '...' : 'Choose'}
                                      </Button>
                                    </div>
                                  </div>
                                </div>

                                {movie.status === 'uploading' && (
                                  <Progress value={movie.progress} className="h-2" />
                                )}

                                {movie.error && (
                                  <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-2 rounded">
                                    {movie.error}
                                  </div>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}

            {movieItems.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Film className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No movies added yet</p>
                    <p className="text-sm text-muted-foreground">
                      Drag and drop files or add movies manually to get started
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
