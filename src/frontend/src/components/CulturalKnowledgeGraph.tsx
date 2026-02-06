import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Network, 
  Search, 
  Users, 
  Globe, 
  Music, 
  Film, 
  Languages,
  TrendingUp,
  Link2,
  Sparkles,
  Info,
  MapPin,
  Heart,
  Share2
} from 'lucide-react';

export function CulturalKnowledgeGraph() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const mockGraphData = {
    creators: [
      { id: '1', name: 'Genevieve Nnaji', type: 'filmmaker', region: 'Nigeria', genre: 'Drama', connections: 12 },
      { id: '2', name: 'Burna Boy', type: 'musician', region: 'Nigeria', genre: 'Afrobeats', connections: 18 },
      { id: '3', name: 'Lupita Nyong\'o', type: 'filmmaker', region: 'Kenya', genre: 'Drama', connections: 15 },
      { id: '4', name: 'Wizkid', type: 'musician', region: 'Nigeria', genre: 'Afrobeats', connections: 20 },
      { id: '5', name: 'Tsitsi Dangarembga', type: 'filmmaker', region: 'Zimbabwe', genre: 'Drama', connections: 8 },
    ],
    connections: [
      { from: '1', to: '2', type: 'collaboration', strength: 'strong' },
      { from: '2', to: '4', type: 'genre', strength: 'strong' },
      { from: '1', to: '3', type: 'cultural', strength: 'medium' },
      { from: '3', to: '5', type: 'regional', strength: 'medium' },
    ],
    culturalInfluences: [
      { name: 'Nollywood Storytelling', creators: ['1', '3'], impact: 'high' },
      { name: 'Afrobeats Movement', creators: ['2', '4'], impact: 'high' },
      { name: 'Pan-African Cinema', creators: ['1', '3', '5'], impact: 'medium' },
    ],
    collaborationSuggestions: [
      { creator1: 'Genevieve Nnaji', creator2: 'Tsitsi Dangarembga', reason: 'Similar storytelling styles and cultural themes', compatibility: 92 },
      { creator1: 'Burna Boy', creator2: 'Wizkid', reason: 'Complementary musical styles and shared audience', compatibility: 88 },
      { creator1: 'Lupita Nyong\'o', creator2: 'Genevieve Nnaji', reason: 'Cross-regional collaboration potential', compatibility: 85 },
    ]
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg">
              <Network className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Cultural Knowledge Graph</h1>
            <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">Semantic AI</Badge>
          </div>
          <p className="text-muted-foreground">
            Explore cross-cultural connections and discover collaboration opportunities
          </p>
        </div>

        {/* Demo Alert */}
        <Alert className="mb-6 border-blue-500 bg-blue-950/20">
          <Info className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            <strong>Knowledge Graph Preview:</strong> This semantic AI layer maps connections between films, artists, languages, and genres to help you discover cultural influences and collaboration opportunities.
          </AlertDescription>
        </Alert>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search creators, genres, languages, or cultural themes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Search className="w-4 h-4 mr-2" />
                Explore
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="graph" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="graph">Visual Graph</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="influences">Cultural Influences</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
          </TabsList>

          {/* Visual Graph Tab */}
          <TabsContent value="graph" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-blue-500" />
                  Interactive Knowledge Graph
                </CardTitle>
                <CardDescription>
                  Visualize connections between creators, content, and cultural influences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-blue-950/20 to-cyan-950/20 rounded-lg border-2 border-dashed border-blue-500/30 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-4 bg-blue-500/10 rounded-full">
                        <Network className="w-12 h-12 text-blue-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Interactive Graph Visualization</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        The interactive graph will display here, showing connections between creators, genres, languages, and cultural themes. Click nodes to explore relationships.
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center flex-wrap">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                        <Film className="w-3 h-3 mr-1" />
                        Filmmakers
                      </Badge>
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                        <Music className="w-3 h-3 mr-1" />
                        Musicians
                      </Badge>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        <Languages className="w-3 h-3 mr-1" />
                        Languages
                      </Badge>
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                        <Globe className="w-3 h-3 mr-1" />
                        Genres
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Connection Types</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Collaboration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Genre Similarity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Cultural Theme</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm">Regional Link</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Creators Tab */}
          <TabsContent value="creators" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockGraphData.creators.map((creator) => (
                <Card key={creator.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{creator.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {creator.region}
                        </CardDescription>
                      </div>
                      {creator.type === 'filmmaker' ? (
                        <Film className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Music className="w-5 h-5 text-purple-500" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Genre</span>
                      <Badge variant="outline">{creator.genre}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Connections</span>
                      <div className="flex items-center gap-1">
                        <Link2 className="w-3 h-3 text-blue-500" />
                        <span className="font-medium">{creator.connections}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Network className="w-3 h-3 mr-2" />
                      View Connections
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cultural Influences Tab */}
          <TabsContent value="influences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cultural Influence Mapping</CardTitle>
                <CardDescription>
                  Discover how cultural movements and traditions flow through African entertainment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockGraphData.culturalInfluences.map((influence, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          <Globe className="w-4 h-4 text-blue-500" />
                          {influence.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {influence.creators.length} creators connected
                        </p>
                      </div>
                      <Badge variant={influence.impact === 'high' ? 'default' : 'secondary'}>
                        {influence.impact} impact
                      </Badge>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {influence.creators.map((creatorId) => {
                        const creator = mockGraphData.creators.find(c => c.id === creatorId);
                        return creator ? (
                          <Badge key={creatorId} variant="outline" className="text-xs">
                            {creator.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collaborations Tab */}
          <TabsContent value="collaborations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  AI-Suggested Collaborations
                </CardTitle>
                <CardDescription>
                  Discover potential collaboration opportunities based on cultural connections and artistic compatibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockGraphData.collaborationSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{suggestion.creator1}</span>
                          <Link2 className="w-4 h-4 text-blue-500" />
                          <span className="font-semibold">{suggestion.creator2}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-medium">{suggestion.compatibility}% compatibility</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Heart className="w-3 h-3 mr-1" />
                          Save
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
                          <Share2 className="w-3 h-3 mr-1" />
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">How Collaboration Matching Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <p>AI analyzes artistic styles, cultural backgrounds, and audience overlap</p>
                </div>
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <p>Cultural context and regional influences are considered for authentic collaborations</p>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <p>Compatibility scores based on successful past collaborations and creative synergy</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
