import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Vote, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';
import { useGetAllMovies } from '../hooks/useQueries';
import { toast } from 'sonner';

interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  totalVotes: number;
  endDate: string;
  status: 'active' | 'closed';
  userVoted: boolean;
  userVote?: string;
}

interface PollOption {
  id: string;
  movieTitle: string;
  votes: number;
  percentage: number;
}

// Sample polls data
const samplePolls: Poll[] = [
  {
    id: '1',
    title: 'Next Featured Movie of the Week',
    description: 'Help us choose which African movie should be featured next week in our Top Picks section!',
    options: [
      { id: 'opt1', movieTitle: 'Hearts of Gold', votes: 45, percentage: 35 },
      { id: 'opt2', movieTitle: 'Lagos Laughs', votes: 38, percentage: 30 },
      { id: 'opt3', movieTitle: 'Desert Warriors', votes: 28, percentage: 22 },
      { id: 'opt4', movieTitle: 'Love in Accra', votes: 17, percentage: 13 }
    ],
    totalVotes: 128,
    endDate: '2025-01-20',
    status: 'active',
    userVoted: false
  },
  {
    id: '2',
    title: 'Best Nollywood Comedy of 2024',
    description: 'Vote for your favorite Nollywood comedy from this year to be featured in our special collection.',
    options: [
      { id: 'opt5', movieTitle: 'Lagos Laughs', votes: 67, percentage: 42 },
      { id: 'opt6', movieTitle: 'Comedy Central', votes: 52, percentage: 33 },
      { id: 'opt7', movieTitle: 'Funny Business', votes: 25, percentage: 16 },
      { id: 'opt8', movieTitle: 'Laugh Track', votes: 15, percentage: 9 }
    ],
    totalVotes: 159,
    endDate: '2025-01-25',
    status: 'active',
    userVoted: true,
    userVote: 'opt5'
  },
  {
    id: '3',
    title: 'Most Anticipated African Film',
    description: 'Which upcoming African film are you most excited to see on TamriStream?',
    options: [
      { id: 'opt9', movieTitle: 'Sahara Dreams', votes: 89, percentage: 38 },
      { id: 'opt10', movieTitle: 'Accra Nights', votes: 76, percentage: 32 },
      { id: 'opt11', movieTitle: 'Lagos Rising', votes: 45, percentage: 19 },
      { id: 'opt12', movieTitle: 'Desert Storm', votes: 25, percentage: 11 }
    ],
    totalVotes: 235,
    endDate: '2025-01-15',
    status: 'closed',
    userVoted: true,
    userVote: 'opt9'
  }
];

export function CommunityVoting() {
  const [polls, setPolls] = useState<Poll[]>(samplePolls);
  const { data: movies = [] } = useGetAllMovies();

  const handleVote = (pollId: string, optionId: string) => {
    setPolls(prevPolls => 
      prevPolls.map(poll => {
        if (poll.id === pollId && !poll.userVoted && poll.status === 'active') {
          const updatedOptions = poll.options.map(option => ({
            ...option,
            votes: option.id === optionId ? option.votes + 1 : option.votes
          }));
          
          const newTotalVotes = poll.totalVotes + 1;
          const optionsWithPercentage = updatedOptions.map(option => ({
            ...option,
            percentage: Math.round((option.votes / newTotalVotes) * 100)
          }));

          toast.success('Your vote has been recorded!');
          
          return {
            ...poll,
            options: optionsWithPercentage,
            totalVotes: newTotalVotes,
            userVoted: true,
            userVote: optionId
          };
        }
        return poll;
      })
    );
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-500' : 'bg-gray-500';
  };

  const formatEndDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Ended';
    if (diffDays === 0) return 'Ends today';
    if (diffDays === 1) return 'Ends tomorrow';
    return `Ends in ${diffDays} days`;
  };

  const activePolls = polls.filter(poll => poll.status === 'active');
  const closedPolls = polls.filter(poll => poll.status === 'closed');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-8">
          <div className="flex items-center justify-center space-x-3">
            <Vote className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Community Voting</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help shape TamriStream by voting on featured movies, upcoming content, and community decisions.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Vote className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{activePolls.length}</div>
                  <div className="text-sm text-muted-foreground">Active Polls</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {polls.reduce((sum, poll) => sum + poll.totalVotes, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Votes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {polls.filter(poll => poll.userVoted).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Your Votes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Polls */}
        {activePolls.length > 0 && (
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
              <Vote className="w-6 h-6 text-primary" />
              <span>Active Polls</span>
            </h2>
            
            {activePolls.map((poll) => (
              <Card key={poll.id} className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{poll.title}</CardTitle>
                      <CardDescription>{poll.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(poll.status)}>
                        {poll.status.toUpperCase()}
                      </Badge>
                      {poll.userVoted && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Voted
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{poll.totalVotes} votes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{formatEndDate(poll.endDate)}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {poll.options.map((option) => (
                        <div key={option.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{option.movieTitle}</span>
                            <span className="text-sm text-muted-foreground">
                              {option.votes} votes ({option.percentage}%)
                            </span>
                          </div>
                          <div className="relative">
                            <Progress value={option.percentage} className="h-2" />
                            {poll.userVote === option.id && (
                              <div className="absolute right-0 top-0 h-2 w-2 bg-green-500 rounded-full translate-x-1 -translate-y-0.5" />
                            )}
                          </div>
                          {!poll.userVoted && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVote(poll.id, option.id)}
                              className="w-full"
                            >
                              Vote for {option.movieTitle}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Closed Polls */}
        {closedPolls.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Poll Results</h2>
            
            {closedPolls.map((poll) => (
              <Card key={poll.id} className="border-0 bg-card/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-xl text-muted-foreground">{poll.title}</CardTitle>
                      <CardDescription>{poll.description}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(poll.status)}>
                      CLOSED
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{poll.totalVotes} total votes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Winner: {poll.options.reduce((prev, current) => (prev.votes > current.votes) ? prev : current).movieTitle}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {poll.options
                        .sort((a, b) => b.votes - a.votes)
                        .map((option, index) => (
                          <div key={option.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                {index === 0 && <TrendingUp className="w-4 h-4 text-yellow-500" />}
                                <span className={`font-medium ${index === 0 ? 'text-yellow-600' : ''}`}>
                                  {option.movieTitle}
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {option.votes} votes ({option.percentage}%)
                              </span>
                            </div>
                            <Progress value={option.percentage} className="h-2" />
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {activePolls.length === 0 && closedPolls.length === 0 && (
          <Card className="border-0 bg-card/30">
            <CardContent className="text-center py-16">
              <img src="/assets/generated/community-voting-icon.png" alt="Voting" className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No polls available
              </h3>
              <p className="text-muted-foreground">
                Check back soon for new community polls and voting opportunities.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
