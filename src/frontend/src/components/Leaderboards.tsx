import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Star, Users, Zap, Medal, Crown, Award } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  badge?: string;
  change?: 'up' | 'down' | 'same';
}

// Sample leaderboard data
const topReviewers: LeaderboardEntry[] = [
  { rank: 1, username: 'CinemaExpert', score: 127, badge: 'Top Reviewer', change: 'same' },
  { rank: 2, username: 'MovieBuff2024', score: 98, badge: 'Film Critic', change: 'up' },
  { rank: 3, username: 'AfricanCinemaFan', score: 87, badge: 'Review Master', change: 'down' },
  { rank: 4, username: 'NollywoodLover', score: 76, change: 'up' },
  { rank: 5, username: 'FilmEnthusiast', score: 65, change: 'same' },
  { rank: 6, username: 'MovieCritic101', score: 58, change: 'up' },
  { rank: 7, username: 'CinephileAfrica', score: 52, change: 'down' },
  { rank: 8, username: 'ReviewGuru', score: 47, change: 'same' },
  { rank: 9, username: 'FilmFanatic', score: 43, change: 'up' },
  { rank: 10, username: 'MovieMaster', score: 39, change: 'down' }
];

const mostActiveUsers: LeaderboardEntry[] = [
  { rank: 1, username: 'DailyWatcher', score: 245, badge: 'Super Active', change: 'same' },
  { rank: 2, username: 'StreamingKing', score: 198, badge: 'Always Online', change: 'up' },
  { rank: 3, username: 'MovieMarathon', score: 176, badge: 'Binge Master', change: 'same' },
  { rank: 4, username: 'CinemaAddict', score: 154, change: 'up' },
  { rank: 5, username: 'FilmJunkie', score: 142, change: 'down' },
  { rank: 6, username: 'WatchPartyHost', score: 128, change: 'up' },
  { rank: 7, username: 'MovieNightOwl', score: 115, change: 'same' },
  { rank: 8, username: 'StreamingPro', score: 103, change: 'up' },
  { rank: 9, username: 'CinemaExplorer', score: 97, change: 'down' },
  { rank: 10, username: 'FilmDiscoverer', score: 89, change: 'same' }
];

const watchPartyHosts: LeaderboardEntry[] = [
  { rank: 1, username: 'PartyMaster', score: 34, badge: 'Host Legend', change: 'same' },
  { rank: 2, username: 'GroupWatcher', score: 28, badge: 'Party Pro', change: 'up' },
  { rank: 3, username: 'SocialCinema', score: 23, badge: 'Community Builder', change: 'down' },
  { rank: 4, username: 'MovieNightHost', score: 19, change: 'up' },
  { rank: 5, username: 'WatchTogether', score: 16, change: 'same' },
  { rank: 6, username: 'CinemaConnector', score: 14, change: 'up' },
  { rank: 7, username: 'FilmFriends', score: 12, change: 'down' },
  { rank: 8, username: 'GroupViewing', score: 10, change: 'same' },
  { rank: 9, username: 'PartyPlanner', score: 8, change: 'up' },
  { rank: 10, username: 'SocialStreamer', score: 7, change: 'down' }
];

const triviaChampions: LeaderboardEntry[] = [
  { rank: 1, username: 'TriviaKing', score: 2450, badge: 'Trivia Master', change: 'same' },
  { rank: 2, username: 'QuizWhiz', score: 2180, badge: 'Knowledge Expert', change: 'up' },
  { rank: 3, username: 'BrainBox', score: 1950, badge: 'Smart Cookie', change: 'down' },
  { rank: 4, username: 'CinemaGenius', score: 1720, change: 'up' },
  { rank: 5, username: 'MovieTrivia', score: 1580, change: 'same' },
  { rank: 6, username: 'QuestionMaster', score: 1420, change: 'up' },
  { rank: 7, username: 'TriviaChamp', score: 1290, change: 'down' },
  { rank: 8, username: 'KnowledgeSeeker', score: 1150, change: 'same' },
  { rank: 9, username: 'QuizExpert', score: 1020, change: 'up' },
  { rank: 10, username: 'TriviaPro', score: 890, change: 'down' }
];

export function Leaderboards() {
  const [selectedTab, setSelectedTab] = useState('reviewers');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const getChangeIcon = (change?: 'up' | 'down' | 'same') => {
    switch (change) {
      case 'up': return <span className="text-green-500">↗</span>;
      case 'down': return <span className="text-red-500">↘</span>;
      case 'same': return <span className="text-gray-500">→</span>;
      default: return null;
    }
  };

  const getScoreLabel = (tab: string) => {
    switch (tab) {
      case 'reviewers': return 'Reviews';
      case 'active': return 'Activity Points';
      case 'hosts': return 'Parties Hosted';
      case 'trivia': return 'Trivia Points';
      default: return 'Score';
    }
  };

  const LeaderboardTable = ({ data, scoreLabel }: { data: LeaderboardEntry[], scoreLabel: string }) => (
    <div className="space-y-4">
      {data.map((entry) => (
        <Card key={entry.rank} className={`border-0 backdrop-blur-sm transition-all hover:scale-[1.02] ${
          entry.rank <= 3 ? 'bg-gradient-to-r from-primary/10 to-accent/10' : 'bg-card/50'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10">
                  {getRankIcon(entry.rank)}
                </div>
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {entry.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-foreground">{entry.username}</span>
                    {entry.badge && (
                      <Badge variant="outline" className="text-xs">
                        {entry.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{entry.score} {scoreLabel}</span>
                    {entry.change && getChangeIcon(entry.change)}
                  </div>
                </div>
              </div>
              
              {entry.rank <= 3 && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{entry.rank}</div>
                  <div className="text-xs text-muted-foreground">
                    {entry.rank === 1 ? 'Champion' : entry.rank === 2 ? 'Runner-up' : '3rd Place'}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-8">
          <div className="flex items-center justify-center space-x-3">
            <Trophy className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Leaderboards</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how you rank against other TamriStream community members across different activities.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">127</div>
                  <div className="text-xs text-muted-foreground">Top Reviews</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">245</div>
                  <div className="text-xs text-muted-foreground">Most Active</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Users className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">34</div>
                  <div className="text-xs text-muted-foreground">Parties Hosted</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">2450</div>
                  <div className="text-xs text-muted-foreground">Trivia Points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reviewers" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Top Reviewers</span>
              <span className="sm:hidden">Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Most Active</span>
              <span className="sm:hidden">Active</span>
            </TabsTrigger>
            <TabsTrigger value="hosts" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Party Hosts</span>
              <span className="sm:hidden">Hosts</span>
            </TabsTrigger>
            <TabsTrigger value="trivia" className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Trivia Champions</span>
              <span className="sm:hidden">Trivia</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reviewers" className="space-y-6">
            <Card className="border-0 bg-card/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-primary" />
                  <span>Top Reviewers</span>
                </CardTitle>
                <CardDescription>
                  Users with the most helpful and high-quality movie reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardTable data={topReviewers} scoreLabel={getScoreLabel('reviewers')} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <Card className="border-0 bg-card/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-accent" />
                  <span>Most Active Users</span>
                </CardTitle>
                <CardDescription>
                  Users with the highest overall platform engagement and activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardTable data={mostActiveUsers} scoreLabel={getScoreLabel('active')} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hosts" className="space-y-6">
            <Card className="border-0 bg-card/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <span>Frequent Watch Party Hosts</span>
                </CardTitle>
                <CardDescription>
                  Users who host the most watch parties and bring the community together
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardTable data={watchPartyHosts} scoreLabel={getScoreLabel('hosts')} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trivia" className="space-y-6">
            <Card className="border-0 bg-card/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span>Trivia Champions</span>
                </CardTitle>
                <CardDescription>
                  Users with the highest scores in African cinema trivia games
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardTable data={triviaChampions} scoreLabel={getScoreLabel('trivia')} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Your Ranking */}
        <Card className="border-0 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span>Your Current Rankings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Top Reviewers</span>
                  <Badge variant="outline">#15</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Most Active</span>
                  <Badge variant="outline">#8</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Party Hosts</span>
                  <Badge variant="outline">#23</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Trivia Champions</span>
                  <Badge variant="outline">#12</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
