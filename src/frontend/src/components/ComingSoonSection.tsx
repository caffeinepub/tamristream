import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, Bell, Play, Star } from 'lucide-react';
import { toast } from 'sonner';

interface ComingSoonItem {
  id: string;
  title: string;
  description: string;
  releaseDate: Date;
  thumbnail: string;
  trailer: string;
  genre: string;
  director: string;
  isNotified: boolean;
}

export function ComingSoonSection() {
  const comingSoonItems: ComingSoonItem[] = [
    {
      id: '1',
      title: 'The Last Kingdom',
      description: 'An epic tale of power, betrayal, and redemption set in ancient Africa.',
      releaseDate: new Date('2025-02-15'),
      thumbnail: '/assets/generated/african-drama-poster.jpg',
      trailer: '/assets/generated/coming-soon-section.png',
      genre: 'Drama',
      director: 'Amara Okafor',
      isNotified: false
    },
    {
      id: '2',
      title: 'Lagos Nights',
      description: 'A romantic comedy exploring love and life in modern Lagos.',
      releaseDate: new Date('2025-03-01'),
      thumbnail: '/assets/generated/african-romance-poster.jpg',
      trailer: '/assets/generated/coming-soon-section.png',
      genre: 'Romance',
      director: 'Kemi Adetiba',
      isNotified: true
    },
    {
      id: '3',
      title: 'The Warrior\'s Path',
      description: 'An action-packed adventure following a legendary African warrior.',
      releaseDate: new Date('2025-03-20'),
      thumbnail: '/assets/generated/african-action-poster.jpg',
      trailer: '/assets/generated/coming-soon-section.png',
      genre: 'Action',
      director: 'Kwame Asante',
      isNotified: false
    }
  ];

  const handleNotifyMe = (itemId: string) => {
    toast.success('You\'ll be notified when this movie is released!');
  };

  const getDaysUntilRelease = (releaseDate: Date) => {
    const now = new Date();
    const diff = releaseDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Clock className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Coming Soon</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get ready for exciting new releases! Set reminders so you don't miss out.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comingSoonItems.map((item) => {
            const daysUntilRelease = getDaysUntilRelease(item.releaseDate);
            
            return (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-orange-600 text-white">
                      <Clock className="w-3 h-3 mr-1" />
                      {daysUntilRelease} days
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">{item.genre}</Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Release: {item.releaseDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4" />
                      <span>Director: {item.director}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant={item.isNotified ? "outline" : "default"}
                      onClick={() => handleNotifyMe(item.id)}
                      className="flex-1"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      {item.isNotified ? 'Notified' : 'Notify Me'}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
