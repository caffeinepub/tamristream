import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Vote, Clock, Users, TrendingUp, Zap, CheckCircle, Play } from 'lucide-react';
import { toast } from 'sonner';

interface LivePoll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  timeLeft: number;
  isActive: boolean;
  movieTitle: string;
  pollType: 'prediction' | 'opinion' | 'trivia' | 'reaction';
}

interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface PollParticipant {
  id: string;
  username: string;
  hasVoted: boolean;
  recentVote?: string;
}

// Sample live polls data for movie premieres
const sampleLivePolls: LivePoll[] = [
  {
    id: 'poll1',
    question: 'What do you think will happen to the main character in the next scene?',
    options: [
      { id: 'opt1', text: 'He will find the treasure', votes: 23, percentage: 45 },
      { id: 'opt2', text: 'He will face a betrayal', votes: 18, percentage: 35 },
      { id: 'opt3', text: 'He will meet an ally', votes: 10, percentage: 20 }
    ],
    totalVotes: 51,
    timeLeft: 45,
    isActive: true,
    movieTitle: 'Desert Warriors',
    pollType: 'prediction'
  },
  {
    id: 'poll2',
    question: 'How would you rate this dramatic scene?',
    options: [
      { id: 'opt4', text: 'Absolutely amazing! 🔥', votes: 34, percentage: 60 },
      { id: 'opt5', text: 'Pretty good 👍', votes: 15, percentage: 26 },
      { id: 'opt6', text: 'Could be better 🤔', votes: 8, percentage: 14 }
    ],
    totalVotes: 57,
    timeLeft: 30,
    isActive: true,
    movieTitle: 'Hearts of Gold',
    pollType: 'opinion'
  }
];

const sampleParticipants: PollParticipant[] = [
  { id: '1', username: 'MovieFan123', hasVoted: true, recentVote: 'opt1' },
  { id: '2', username: 'CinemaLover', hasVoted: true, recentVote: 'opt2' },
  { id: '3', username: 'FilmBuff', hasVoted: false },
  { id: '4', username: 'NollywoodFan', hasVoted: true, recentVote: 'opt1' },
  { id: '5', username: 'AfricanCinema', hasVoted: false }
];

interface LivePollsProps {
  movieTitle?: string;
  isPremiereActive?: boolean;
}

export function LivePolls({ movieTitle, isPremiereActive = false }: LivePollsProps) {
  const [polls, setPolls] = useState<LivePoll[]>(sampleLivePolls);
  const [participants, setParticipants] = useState<PollParticipant[]>(sampleParticipants);
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});

  // Timer effect for active polls
  useEffect(() => {
    const timer = setInterval(() => {
      setPolls(prevPolls => 
        prevPolls.map(poll => {
          if (poll.isActive && poll.timeLeft > 0) {
            return { ...poll, timeLeft: poll.timeLeft - 1 };
          } else if (poll.isActive && poll.timeLeft === 0) {
            return { ...poll, isActive: false };
          }
          return poll;
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVote = (pollId: string, optionId: string) => {
    if (userVotes[pollId]) {
      toast.error('You have already voted on this poll!');
      return;
    }

    setPolls(prevPolls => 
      prevPolls.map(poll => {
        if (poll.id === pollId && poll.isActive) {
          const updatedOptions = poll.options.map(option => ({
            ...option,
            votes: option.id === optionId ? option.votes + 1 : option.votes
          }));
          
          const newTotalVotes = poll.totalVotes + 1;
          const optionsWithPercentage = updatedOptions.map(option => ({
            ...option,
            percentage: Math.round((option.votes / newTotalVotes) * 100)
          }));

          return {
            ...poll,
            options: optionsWithPercentage,
            totalVotes: newTotalVotes
          };
        }
        return poll;
      })
    );

    setUserVotes(prev => ({ ...prev, [pollId]: optionId }));
    toast.success('Vote submitted! Results updating in real-time.');
  };

  const getPollTypeIcon = (type: string) => {
    switch (type) {
      case 'prediction': return <TrendingUp className="w-4 h-4" />;
      case 'opinion': return <Vote className="w-4 h-4" />;
      case 'trivia': return <Zap className="w-4 h-4" />;
      case 'reaction': return <Play className="w-4 h-4" />;
      default: return <Vote className="w-4 h-4" />;
    }
  };

  const getPollTypeColor = (type: string) => {
    switch (type) {
      case 'prediction': return 'bg-blue-500';
      case 'opinion': return 'bg-green-500';
      case 'trivia': return 'bg-yellow-500';
      case 'reaction': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const activePolls = polls.filter(poll => poll.isActive);
  const recentPolls = polls.filter(poll => !poll.isActive).slice(0, 3);

  if (!isPremiereActive) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <Vote className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Live Polls</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join live polls during movie premieres to share your predictions and reactions in real-time!
          </p>
          
          <Card className="border-0 bg-card/30">
            <CardContent className="py-16">
              <img src="/assets/generated/live-poll-interface.png" alt="Live Polls" className="w-24 h-24 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No active premiere
              </h3>
              <p className="text-muted-foreground">
                Live polls will appear here during movie premiere events. Check back during scheduled premieres!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Vote className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Live Polls</h1>
              <p className="text-muted-foreground">
                {movieTitle ? `During ${movieTitle} Premiere` : 'Movie Premiere Event'}
              </p>
            </div>
          </div>
          <Badge className="bg-red-500 text-white animate-pulse">
            🔴 LIVE
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Polls */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold text-foreground">Active Polls</h2>
              <Badge variant="outline">{activePolls.length} active</Badge>
            </div>

            {activePolls.length === 0 ? (
              <Card className="border-0 bg-card/30">
                <CardContent className="text-center py-12">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Waiting for next poll
                  </h3>
                  <p className="text-muted-foreground">
                    New polls will appear as the movie progresses. Stay tuned!
                  </p>
                </CardContent>
              </Card>
            ) : (
              activePolls.map((poll) => (
                <Card key={poll.id} className="border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getPollTypeColor(poll.pollType)}>
                            {getPollTypeIcon(poll.pollType)}
                            <span className="ml-1 capitalize">{poll.pollType}</span>
                          </Badge>
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTime(poll.timeLeft)}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{poll.question}</CardTitle>
                      </div>
                      {userVotes[poll.id] && (
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Voted
                        </Badge>
                      )}
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
                          <TrendingUp className="w-4 h-4" />
                          <span>Live results</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {poll.options.map((option) => (
                          <div key={option.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{option.text}</span>
                              <span className="text-sm text-muted-foreground">
                                {option.votes} ({option.percentage}%)
                              </span>
                            </div>
                            <div className="relative">
                              <Progress value={option.percentage} className="h-3" />
                              {userVotes[poll.id] === option.id && (
                                <div className="absolute right-0 top-0 h-3 w-3 bg-green-500 rounded-full translate-x-1 -translate-y-0.5" />
                              )}
                            </div>
                            {!userVotes[poll.id] && poll.isActive && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleVote(poll.id, option.id)}
                                className="w-full"
                              >
                                Vote: {option.text}
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {/* Recent Poll Results */}
            {recentPolls.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Recent Results</h3>
                {recentPolls.map((poll) => (
                  <Card key={poll.id} className="border-0 bg-card/30 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-muted-foreground">{poll.question}</CardTitle>
                        <Badge className="bg-gray-500">Closed</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {poll.options
                          .sort((a, b) => b.votes - a.votes)
                          .slice(0, 2)
                          .map((option, index) => (
                            <div key={option.id} className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                {index === 0 && <TrendingUp className="w-4 h-4 text-yellow-500" />}
                                <span className={`text-sm ${index === 0 ? 'font-semibold text-yellow-600' : 'text-muted-foreground'}`}>
                                  {option.text}
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {option.percentage}%
                              </span>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Participants Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Live Participants</span>
                </CardTitle>
                <CardDescription>
                  {participants.length} viewers participating
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {participant.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{participant.username}</span>
                    </div>
                    {participant.hasVoted ? (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Voted
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Watching
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Poll Stats */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Session Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Polls</span>
                  <span className="font-semibold">{polls.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Votes</span>
                  <span className="font-semibold">
                    {polls.reduce((sum, poll) => sum + poll.totalVotes, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Participation Rate</span>
                  <span className="font-semibold">
                    {Math.round((participants.filter(p => p.hasVoted).length / participants.length) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Your Votes</span>
                  <span className="font-semibold">{Object.keys(userVotes).length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
