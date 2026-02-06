import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Leaf, 
  Heart, 
  GraduationCap, 
  TrendingUp, 
  Users,
  CheckCircle2,
  Clock,
  Target,
  Info,
  Vote,
  DollarSign,
  Award,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';

export function TamriGrantsPortal() {
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [fundingAmount, setFundingAmount] = useState('');

  const mockGrantsData = {
    activeGrants: [
      {
        id: '1',
        title: 'Solar-Powered Film Studio Initiative',
        category: 'eco-friendly',
        creator: 'Green Cinema Collective',
        fundingGoal: 50000,
        fundingRaised: 35000,
        votes: 245,
        status: 'active',
        impactScore: 92,
        completionProgress: 0,
        description: 'Building Africa\'s first solar-powered film production studio'
      },
      {
        id: '2',
        title: 'Traditional Storytelling Documentation',
        category: 'cultural',
        creator: 'Heritage Films Kenya',
        fundingGoal: 30000,
        fundingRaised: 28500,
        votes: 189,
        status: 'active',
        impactScore: 88,
        completionProgress: 0,
        description: 'Preserving oral traditions through documentary filmmaking'
      },
      {
        id: '3',
        title: 'Youth Filmmaking Workshops',
        category: 'educational',
        creator: 'Future Creators Academy',
        fundingGoal: 20000,
        fundingRaised: 20000,
        votes: 312,
        status: 'funded',
        impactScore: 95,
        completionProgress: 45,
        description: 'Free filmmaking education for underprivileged youth'
      },
    ],
    fundingRounds: [
      { round: 'Q1 2025', totalFunding: 150000, projectsFunded: 8, avgImpactScore: 87 },
      { round: 'Q4 2024', totalFunding: 120000, projectsFunded: 6, avgImpactScore: 84 },
      { round: 'Q3 2024', totalFunding: 95000, projectsFunded: 5, avgImpactScore: 82 },
    ],
    categories: [
      { name: 'Eco-Friendly', icon: Leaf, color: 'green', count: 12 },
      { name: 'Cultural', icon: Heart, color: 'purple', count: 18 },
      { name: 'Educational', icon: GraduationCap, color: 'blue', count: 15 },
    ]
  };

  const handleSubmitProposal = () => {
    if (!proposalTitle || !proposalDescription || !fundingAmount) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Grant proposal submitted for DAO review!');
    setProposalTitle('');
    setProposalDescription('');
    setFundingAmount('');
  };

  const handleVote = (grantId: string, support: boolean) => {
    toast.success(`Vote ${support ? 'for' : 'against'} grant recorded!`);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Tamri Grants Portal</h1>
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">DAO-Governed</Badge>
          </div>
          <p className="text-muted-foreground">
            Community-funded grants for eco-friendly, cultural, and educational projects
          </p>
        </div>

        {/* Demo Alert */}
        <Alert className="mb-6 border-green-500 bg-green-950/20">
          <Info className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-200">
            <strong>Grants Portal Preview:</strong> This on-chain grants system is governed by the Creator DAO. Submit proposals, vote on projects, and track impact metrics with full transparency.
          </AlertDescription>
        </Alert>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                Total Funding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$365K</div>
              <p className="text-xs text-muted-foreground mt-1">All-time distributed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                Active Grants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockGrantsData.activeGrants.filter(g => g.status === 'active').length}</div>
              <p className="text-xs text-muted-foreground mt-1">Currently funding</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">19</div>
              <p className="text-xs text-muted-foreground mt-1">Successfully funded</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-500" />
                Avg Impact Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground mt-1">Community rating</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">Active Grants</TabsTrigger>
            <TabsTrigger value="submit">Submit Proposal</TabsTrigger>
            <TabsTrigger value="rounds">Funding Rounds</TabsTrigger>
            <TabsTrigger value="impact">Impact Tracking</TabsTrigger>
          </TabsList>

          {/* Active Grants Tab */}
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {mockGrantsData.categories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 bg-${category.color}-500/10 rounded-lg`}>
                        <category.icon className={`w-6 h-6 text-${category.color}-500`} />
                      </div>
                      <div>
                        <h4 className="font-semibold">{category.name}</h4>
                        <p className="text-sm text-muted-foreground">{category.count} projects</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              {mockGrantsData.activeGrants.map((grant) => (
                <Card key={grant.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{grant.title}</CardTitle>
                          <Badge variant={grant.status === 'funded' ? 'default' : 'secondary'}>
                            {grant.status}
                          </Badge>
                        </div>
                        <CardDescription>{grant.description}</CardDescription>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {grant.creator}
                          </span>
                          <span className="flex items-center gap-1">
                            <Vote className="w-3 h-3" />
                            {grant.votes} votes
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {grant.impactScore}% impact
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Funding Progress</span>
                        <span className="font-medium">
                          ${grant.fundingRaised.toLocaleString()} / ${grant.fundingGoal.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={(grant.fundingRaised / grant.fundingGoal) * 100} className="h-2" />
                    </div>

                    {grant.status === 'funded' && grant.completionProgress > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Project Completion</span>
                          <span className="font-medium">{grant.completionProgress}%</span>
                        </div>
                        <Progress value={grant.completionProgress} className="h-2" />
                      </div>
                    )}

                    <div className="flex gap-2">
                      {grant.status === 'active' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleVote(grant.id, true)}
                          >
                            <Vote className="w-3 h-3 mr-1" />
                            Vote For
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleVote(grant.id, false)}
                          >
                            <Vote className="w-3 h-3 mr-1" />
                            Vote Against
                          </Button>
                        </>
                      )}
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        <DollarSign className="w-3 h-3 mr-1" />
                        Fund Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Submit Proposal Tab */}
          <TabsContent value="submit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Grant Proposal</CardTitle>
                <CardDescription>
                  Propose a project for community funding through the Creator DAO
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Title</label>
                  <Input
                    placeholder="Enter your project title"
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full p-2 border rounded-lg bg-background">
                    <option>Eco-Friendly</option>
                    <option>Cultural Preservation</option>
                    <option>Educational</option>
                    <option>Community Development</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Description</label>
                  <Textarea
                    placeholder="Describe your project, its goals, and expected impact..."
                    value={proposalDescription}
                    onChange={(e) => setProposalDescription(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Funding Amount (USD)</label>
                  <Input
                    type="number"
                    placeholder="Enter requested funding amount"
                    value={fundingAmount}
                    onChange={(e) => setFundingAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Timeline</label>
                  <Input
                    placeholder="e.g., 6 months"
                  />
                </div>

                <Alert className="border-blue-500 bg-blue-950/20">
                  <Info className="h-4 w-4 text-blue-400" />
                  <AlertDescription className="text-blue-200">
                    Your proposal will be reviewed by the Creator DAO. Community members will vote on funding allocation based on project merit and impact potential.
                  </AlertDescription>
                </Alert>

                <Button 
                  onClick={handleSubmitProposal}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Submit Proposal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Funding Rounds Tab */}
          <TabsContent value="rounds" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Funding Round History</CardTitle>
                <CardDescription>
                  Track funding distribution and project outcomes across quarters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockGrantsData.fundingRounds.map((round, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{round.round}</h4>
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                        ${round.totalFunding.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Projects Funded</p>
                        <p className="font-medium">{round.projectsFunded}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Impact Score</p>
                        <p className="font-medium">{round.avgImpactScore}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact Tracking Tab */}
          <TabsContent value="impact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Impact Metrics Dashboard</CardTitle>
                <CardDescription>
                  Measure the real-world impact of funded projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">Environmental</span>
                    </div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Eco-friendly projects</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-5 h-5 text-purple-500" />
                      <span className="font-semibold">Cultural</span>
                    </div>
                    <p className="text-2xl font-bold">18</p>
                    <p className="text-sm text-muted-foreground">Heritage projects</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold">Educational</span>
                    </div>
                    <p className="text-2xl font-bold">15</p>
                    <p className="text-sm text-muted-foreground">Learning initiatives</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Key Impact Indicators</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Community Reach</span>
                      <span className="font-medium">50,000+ people</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Jobs Created</span>
                      <span className="font-medium">230+ positions</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Cultural Content Preserved</span>
                      <span className="font-medium">1,200+ hours</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Carbon Offset</span>
                      <span className="font-medium">450 tons CO2</span>
                    </div>
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
