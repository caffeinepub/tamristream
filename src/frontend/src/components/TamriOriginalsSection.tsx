import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Film, Users, TrendingUp, Vote, DollarSign, Calendar, CheckCircle, Play } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function TamriOriginalsSection() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Mock data for community-funded projects
  const projects = [
    {
      id: '1',
      title: 'The Last Kingdom of Kush',
      description: 'An epic historical drama exploring the ancient Kushite civilization and its powerful queens',
      creator: 'Amara Productions',
      fundingGoal: 50000,
      currentFunding: 38500,
      backers: 1247,
      daysLeft: 15,
      category: 'Historical Drama',
      thumbnail: '/assets/generated/tamri-originals-production.dim_800x600.jpg',
      status: 'funding',
      votes: 2341
    },
    {
      id: '2',
      title: 'Lagos Tech Revolution',
      description: 'A documentary series following young African tech entrepreneurs building the future',
      creator: 'NextGen Films',
      fundingGoal: 30000,
      currentFunding: 31200,
      backers: 892,
      daysLeft: 0,
      category: 'Documentary',
      thumbnail: '/assets/generated/african-youth-watching.jpg',
      status: 'funded',
      votes: 1876
    },
    {
      id: '3',
      title: 'Rhythms of the Sahel',
      description: 'Musical journey through West African cultures celebrating traditional and modern sounds',
      creator: 'Sahel Stories',
      fundingGoal: 25000,
      currentFunding: 12800,
      backers: 456,
      daysLeft: 22,
      category: 'Music Documentary',
      thumbnail: '/assets/generated/african-music-artist-studio.jpg',
      status: 'funding',
      votes: 1234
    }
  ];

  const fundingPercentage = (current: number, goal: number) => (current / goal) * 100;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-black to-zinc-900">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl">
            <Film className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white">Tamri Originals</h2>
        </div>
        <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-6">
          Community-funded African original series and films. Vote on projects, invest in creators, 
          and earn returns based on content performance through our decentralized funding platform.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Badge className="bg-purple-600 text-white px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            DAO Voting
          </Badge>
          <Badge className="bg-pink-600 text-white px-4 py-2">
            <DollarSign className="w-4 h-4 mr-2" />
            Community Funding
          </Badge>
          <Badge className="bg-blue-600 text-white px-4 py-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            Revenue Sharing
          </Badge>
        </div>
      </div>

      {/* Featured Project Banner */}
      <div className="mb-12 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-purple-500/30">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="bg-amber-500 text-black mb-4">Featured Project</Badge>
            <h3 className="text-3xl font-bold text-white mb-4">{projects[0].title}</h3>
            <p className="text-zinc-300 mb-6">{projects[0].description}</p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-zinc-400 mb-2">
                  <span>${projects[0].currentFunding.toLocaleString()} raised</span>
                  <span>${projects[0].fundingGoal.toLocaleString()} goal</span>
                </div>
                <Progress value={fundingPercentage(projects[0].currentFunding, projects[0].fundingGoal)} className="h-3" />
              </div>
              <div className="flex items-center gap-6 text-zinc-300">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span>{projects[0].backers} backers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-pink-400" />
                  <span>{projects[0].daysLeft} days left</span>
                </div>
                <div className="flex items-center gap-2">
                  <Vote className="w-5 h-5 text-blue-400" />
                  <span>{projects[0].votes} votes</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <DollarSign className="w-4 h-4 mr-2" />
                Fund This Project
              </Button>
              <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                <Vote className="w-4 h-4 mr-2" />
                Vote
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src={projects[0].thumbnail}
              alt={projects[0].title}
              className="rounded-xl shadow-2xl w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl flex items-end p-6">
              <Badge className="bg-green-600 text-white">
                {fundingPercentage(projects[0].currentFunding, projects[0].fundingGoal).toFixed(0)}% Funded
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* All Projects Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {projects.map((project) => (
          <Card key={project.id} className="bg-zinc-900 border-zinc-800 hover:border-purple-500/50 transition-all">
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className={`absolute top-4 right-4 ${project.status === 'funded' ? 'bg-green-600' : 'bg-purple-600'} text-white`}>
                  {project.status === 'funded' ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Funded
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Funding
                    </>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Badge variant="outline" className="mb-3 text-xs">{project.category}</Badge>
              <CardTitle className="text-xl text-white mb-2">{project.title}</CardTitle>
              <CardDescription className="text-zinc-400 mb-4 line-clamp-2">
                {project.description}
              </CardDescription>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm text-zinc-400 mb-2">
                    <span>${project.currentFunding.toLocaleString()}</span>
                    <span>${project.fundingGoal.toLocaleString()}</span>
                  </div>
                  <Progress value={fundingPercentage(project.currentFunding, project.fundingGoal)} className="h-2" />
                </div>
                <div className="flex items-center justify-between text-sm text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {project.backers}
                  </span>
                  <span className="flex items-center gap-1">
                    <Vote className="w-4 h-4" />
                    {project.votes}
                  </span>
                  {project.status === 'funding' && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.daysLeft}d
                    </span>
                  )}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                    {project.status === 'funded' ? 'View Project' : 'Fund'}
                  </Button>
                  <Button size="sm" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                    <Vote className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How It Works */}
      <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">How Tamri Originals Works</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Film className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">1. Submit Proposal</h4>
            <p className="text-sm text-zinc-400">Creators submit original content proposals with budgets and timelines</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Vote className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">2. Community Votes</h4>
            <p className="text-sm text-zinc-400">DAO members vote on which projects receive funding</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">3. Fund & Create</h4>
            <p className="text-sm text-zinc-400">Community funds approved projects through smart contracts</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">4. Earn Returns</h4>
            <p className="text-sm text-zinc-400">Funders earn returns based on content performance</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <Button
          onClick={() => navigate({ to: '/creator-portal' })}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg"
        >
          <Film className="w-5 h-5 mr-2" />
          Submit Your Original Project
        </Button>
      </div>
    </section>
  );
}
