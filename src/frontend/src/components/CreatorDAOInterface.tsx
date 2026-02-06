import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Vote, TrendingUp, Users, CheckCircle, XCircle, Clock, Coins, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  category: 'platform' | 'royalty' | 'content' | 'feature';
  status: 'active' | 'passed' | 'rejected' | 'pending';
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  quorum: number;
  deadline: string;
  createdAt: string;
}

export function CreatorDAOInterface() {
  const [activeTab, setActiveTab] = useState('proposals');
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    category: 'platform' as const
  });

  // Mock governance data
  const proposals: Proposal[] = [
    {
      id: '1',
      title: 'Increase Creator Revenue Share to 85%',
      description: 'Proposal to increase the base creator revenue share from 70-90% to 75-95% across all content types to remain competitive and attract more creators.',
      proposer: 'Creator Guild',
      category: 'royalty',
      status: 'active',
      votesFor: 1247,
      votesAgainst: 342,
      totalVotes: 1589,
      quorum: 2000,
      deadline: '3 days',
      createdAt: '2 days ago'
    },
    {
      id: '2',
      title: 'Implement AI Content Moderation Standards',
      description: 'Establish clear guidelines for AI-powered content moderation to ensure fair treatment of all creators while maintaining platform quality.',
      proposer: 'Safety Committee',
      category: 'content',
      status: 'active',
      votesFor: 892,
      votesAgainst: 156,
      totalVotes: 1048,
      quorum: 2000,
      deadline: '5 days',
      createdAt: '1 day ago'
    },
    {
      id: '3',
      title: 'Add Multi-Currency Payout Support',
      description: 'Enable creators to receive payouts in additional currencies including EUR, GBP, and local African currencies beyond current crypto options.',
      proposer: 'Payment Working Group',
      category: 'feature',
      status: 'passed',
      votesFor: 2341,
      votesAgainst: 234,
      totalVotes: 2575,
      quorum: 2000,
      deadline: 'Ended',
      createdAt: '2 weeks ago'
    },
    {
      id: '4',
      title: 'Reduce Platform Fee to 5%',
      description: 'Lower the platform operational fee from 10-30% to 5-25% to increase creator earnings.',
      proposer: 'Creator Collective',
      category: 'royalty',
      status: 'rejected',
      votesFor: 876,
      votesAgainst: 1543,
      totalVotes: 2419,
      quorum: 2000,
      deadline: 'Ended',
      createdAt: '1 month ago'
    }
  ];

  const governanceStats = {
    totalProposals: 47,
    activeProposals: 2,
    passedProposals: 28,
    rejectedProposals: 17,
    totalVoters: 3456,
    votingPower: 12500,
    userVotingPower: 150
  };

  const handleVote = (proposalId: string, support: boolean) => {
    toast.success(`Vote recorded: ${support ? 'For' : 'Against'} proposal`);
  };

  const handleSubmitProposal = () => {
    if (!newProposal.title || !newProposal.description) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Proposal submitted for community review');
    setNewProposal({ title: '', description: '', category: 'platform' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-600';
      case 'passed': return 'bg-green-600';
      case 'rejected': return 'bg-red-600';
      case 'pending': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'royalty': return <Coins className="w-4 h-4" />;
      case 'content': return <FileText className="w-4 h-4" />;
      case 'feature': return <TrendingUp className="w-4 h-4" />;
      default: return <Vote className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl">
              <Vote className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Creator DAO</h1>
          </div>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-6">
            Democratic governance for TamriStream. Vote on platform policies, revenue models, 
            content standards, and feature development. Your voice shapes the future.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Badge className="bg-blue-600 text-white px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              {governanceStats.totalVoters.toLocaleString()} Active Voters
            </Badge>
            <Badge className="bg-purple-600 text-white px-4 py-2">
              <Vote className="w-4 h-4 mr-2" />
              {governanceStats.activeProposals} Active Proposals
            </Badge>
            <Badge className="bg-green-600 text-white px-4 py-2">
              <Coins className="w-4 h-4 mr-2" />
              {governanceStats.userVotingPower} Your Voting Power
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-zinc-400">Total Proposals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{governanceStats.totalProposals}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-zinc-400">Passed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{governanceStats.passedProposals}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-zinc-400">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">{governanceStats.activeProposals}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-zinc-400">Voting Power</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-500">{governanceStats.userVotingPower}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-zinc-800">
            <TabsTrigger value="proposals">Active Proposals</TabsTrigger>
            <TabsTrigger value="submit">Submit Proposal</TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="space-y-6">
            {/* Active Proposals */}
            <div className="space-y-4">
              {proposals.filter(p => p.status === 'active').map((proposal) => (
                <Card key={proposal.id} className="bg-zinc-900 border-zinc-800 hover:border-blue-500/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusColor(proposal.status)}>
                            {proposal.status.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="border-zinc-700">
                            {getCategoryIcon(proposal.category)}
                            <span className="ml-1 capitalize">{proposal.category}</span>
                          </Badge>
                        </div>
                        <CardTitle className="text-white text-xl mb-2">{proposal.title}</CardTitle>
                        <CardDescription className="text-zinc-400">
                          Proposed by {proposal.proposer} • {proposal.createdAt}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-zinc-400 text-sm mb-1">
                          <Clock className="w-4 h-4" />
                          <span>{proposal.deadline}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-zinc-300">{proposal.description}</p>

                    {/* Voting Progress */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-400">Votes: {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()} (Quorum)</span>
                        <span className="text-white font-semibold">
                          {((proposal.totalVotes / proposal.quorum) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={(proposal.totalVotes / proposal.quorum) * 100} className="h-2" />

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-green-400 flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              For
                            </span>
                            <span className="text-white font-semibold">{proposal.votesFor.toLocaleString()}</span>
                          </div>
                          <Progress value={(proposal.votesFor / proposal.totalVotes) * 100} className="h-1.5 bg-zinc-800" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-red-400 flex items-center gap-1">
                              <XCircle className="w-4 h-4" />
                              Against
                            </span>
                            <span className="text-white font-semibold">{proposal.votesAgainst.toLocaleString()}</span>
                          </div>
                          <Progress value={(proposal.votesAgainst / proposal.totalVotes) * 100} className="h-1.5 bg-zinc-800" />
                        </div>
                      </div>
                    </div>

                    {/* Voting Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleVote(proposal.id, true)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Vote For
                      </Button>
                      <Button
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => handleVote(proposal.id, false)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Vote Against
                      </Button>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-blue-300">
                        All votes are recorded on the blockchain and cannot be changed. Your voting power: {governanceStats.userVotingPower} tokens.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Past Proposals */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-4">Past Proposals</h3>
              <div className="space-y-4">
                {proposals.filter(p => p.status !== 'active').map((proposal) => (
                  <Card key={proposal.id} className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusColor(proposal.status)}>
                              {proposal.status === 'passed' ? (
                                <><CheckCircle className="w-3 h-3 mr-1" /> PASSED</>
                              ) : (
                                <><XCircle className="w-3 h-3 mr-1" /> REJECTED</>
                              )}
                            </Badge>
                            <Badge variant="outline" className="border-zinc-700">
                              {getCategoryIcon(proposal.category)}
                              <span className="ml-1 capitalize">{proposal.category}</span>
                            </Badge>
                          </div>
                          <CardTitle className="text-white text-lg">{proposal.title}</CardTitle>
                          <CardDescription className="text-zinc-400">
                            {proposal.proposer} • {proposal.createdAt}
                          </CardDescription>
                        </div>
                        <div className="text-right text-sm">
                          <div className="text-green-400 font-semibold">{proposal.votesFor.toLocaleString()} For</div>
                          <div className="text-red-400 font-semibold">{proposal.votesAgainst.toLocaleString()} Against</div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="submit" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Submit New Proposal</CardTitle>
                <CardDescription className="text-zinc-400">
                  Create a proposal for the community to vote on. Requires 100 voting power to submit.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">Proposal Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Increase Creator Revenue Share"
                    value={newProposal.title}
                    onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white">Category</Label>
                  <select
                    id="category"
                    value={newProposal.category}
                    onChange={(e) => setNewProposal({ ...newProposal, category: e.target.value as any })}
                    className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                  >
                    <option value="platform">Platform Policy</option>
                    <option value="royalty">Royalty & Revenue</option>
                    <option value="content">Content Standards</option>
                    <option value="feature">Feature Development</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed explanation of your proposal, including rationale and expected impact..."
                    value={newProposal.description}
                    onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-white min-h-[150px]"
                  />
                </div>

                <div className="flex items-start gap-2 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                  <div className="text-sm text-amber-300">
                    <p className="font-semibold mb-1">Submission Requirements:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Minimum 100 voting power required</li>
                      <li>Proposals undergo 7-day voting period</li>
                      <li>Quorum of 2,000 votes needed to pass</li>
                      <li>Simple majority (50%+1) required for approval</li>
                    </ul>
                  </div>
                </div>

                <Button
                  onClick={handleSubmitProposal}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={governanceStats.userVotingPower < 100}
                >
                  <Vote className="w-4 h-4 mr-2" />
                  Submit Proposal
                </Button>

                {governanceStats.userVotingPower < 100 && (
                  <p className="text-sm text-red-400 text-center">
                    You need at least 100 voting power to submit proposals. Current: {governanceStats.userVotingPower}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* How Governance Works */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">How DAO Governance Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white flex items-center gap-2">
                      <Coins className="w-5 h-5 text-blue-400" />
                      Voting Power
                    </h4>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <span>Earned through platform activity and content creation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <span>1 token = 1 vote on all proposals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <span>Tokens are non-transferable governance rights</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-white flex items-center gap-2">
                      <Vote className="w-5 h-5 text-purple-400" />
                      Proposal Process
                    </h4>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <span>7-day voting period for all proposals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <span>2,000 vote quorum required</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <span>Simple majority (50%+1) to pass</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
