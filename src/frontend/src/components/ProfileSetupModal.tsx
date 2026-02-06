import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { toast } from 'sonner';

export function ProfileSetupModal() {
  const [name, setName] = useState('');
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    try {
      // Create a proper UserProfile object with correct List types (null represents empty lists in Motoko)
      await saveProfile.mutateAsync({
        favoriteMovies: null, // Empty list in Motoko
        dataSaverMode: false, // Default to false
        watchPartyHistory: null // Empty list in Motoko
      });
      toast.success(`Welcome to TamriStream, ${name}!`);
    } catch (error) {
      console.error('Profile creation error:', error);
      toast.error('Failed to create profile. Please try again.');
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Welcome to TamriStream!</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            To get started, please tell us your name so we can personalize your experience with authentic African cinema.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                autoFocus
              />
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={saveProfile.isPending || !name.trim()}
            >
              {saveProfile.isPending ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Creating Profile...</span>
                </div>
              ) : (
                'Get Started'
              )}
            </Button>
          </form>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Join thousands of users discovering amazing African stories</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
