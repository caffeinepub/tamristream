import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Trophy, Star, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  total: number;
  isCompleted: boolean;
  expiresIn: string;
  category: 'watch' | 'social' | 'engage' | 'discover';
}

export function DailyChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Movie Marathon',
      description: 'Watch 3 different movies today',
      points: 100,
      progress: 1,
      total: 3,
      isCompleted: false,
      expiresIn: '18h',
      category: 'watch'
    },
    {
      id: '2',
      title: 'Social Butterfly',
      description: 'Share 2 movies with friends',
      points: 50,
      progress: 0,
      total: 2,
      isCompleted: false,
      expiresIn: '18h',
      category: 'social'
    },
    {
      id: '3',
      title: 'Critic\'s Choice',
      description: 'Rate and review 5 movies',
      points: 75,
      progress: 3,
      total: 5,
      isCompleted: false,
      expiresIn: '18h',
      category: 'engage'
    },
    {
      id: '4',
      title: 'Genre Explorer',
      description: 'Watch movies from 3 different genres',
      points: 80,
      progress: 2,
      total: 3,
      isCompleted: false,
      expiresIn: '18h',
      category: 'discover'
    }
  ]);

  const handleCompleteChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge =>
      challenge.id === challengeId
        ? { ...challenge, isCompleted: true, progress: challenge.total }
        : challenge
    ));
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      toast.success(`Challenge completed! +${challenge.points} points earned!`);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'watch': return 'bg-blue-100 text-blue-800';
      case 'social': return 'bg-green-100 text-green-800';
      case 'engage': return 'bg-purple-100 text-purple-800';
      case 'discover': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPoints = challenges.reduce((sum, c) => sum + (c.isCompleted ? c.points : 0), 0);
  const completedCount = challenges.filter(c => c.isCompleted).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Target className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Daily Challenges</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete daily challenges to earn bonus points and unlock exclusive rewards
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="border-0 bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{totalPoints}</div>
                <div className="text-sm text-muted-foreground">Points Earned Today</div>
              </div>
              <div className="text-center">
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{completedCount}/{challenges.length}</div>
                <div className="text-sm text-muted-foreground">Challenges Completed</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">18h</div>
                <div className="text-sm text-muted-foreground">Time Remaining</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {challenges.map((challenge) => {
            const progressPercentage = (challenge.progress / challenge.total) * 100;
            
            return (
              <Card key={challenge.id} className={`border-l-4 ${challenge.isCompleted ? 'border-l-green-500' : 'border-l-primary'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    </div>
                    <Badge className={getCategoryColor(challenge.category)}>
                      {challenge.category}
                    </Badge>
                  </div>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{challenge.progress}/{challenge.total}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-foreground">+{challenge.points}</span>
                      <span className="text-sm text-muted-foreground">points</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{challenge.expiresIn}</span>
                    </div>
                  </div>
                  
                  {challenge.isCompleted ? (
                    <Badge className="w-full justify-center bg-green-600 text-white">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Completed
                    </Badge>
                  ) : (
                    <Button
                      onClick={() => handleCompleteChallenge(challenge.id)}
                      className="w-full"
                      disabled={challenge.progress < challenge.total}
                    >
                      {challenge.progress < challenge.total ? 'In Progress' : 'Claim Reward'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Weekly Bonus */}
        <Card className="border-0 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span>Weekly Bonus Challenge</span>
            </CardTitle>
            <CardDescription>
              Complete all daily challenges for 7 consecutive days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground mb-1">3/7 Days</div>
                <p className="text-sm text-muted-foreground">Keep your streak going!</p>
              </div>
              <Badge className="bg-yellow-600 text-white text-lg px-4 py-2">
                +500 Bonus Points
              </Badge>
            </div>
            <Progress value={42.86} className="h-2 mt-4" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
