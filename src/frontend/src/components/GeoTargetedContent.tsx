import { useState } from 'react';
import { MapPin, Globe, TrendingUp, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function GeoTargetedContent() {
  const [selectedRegion, setSelectedRegion] = useState('all');

  const regions = [
    { id: 'all', name: 'All Regions', flag: '🌍' },
    { id: 'west-africa', name: 'West Africa', flag: '🇳🇬' },
    { id: 'east-africa', name: 'East Africa', flag: '🇰🇪' },
    { id: 'southern-africa', name: 'Southern Africa', flag: '🇿🇦' },
    { id: 'north-africa', name: 'North Africa', flag: '🇪🇬' },
    { id: 'central-africa', name: 'Central Africa', flag: '🇨🇲' },
  ];

  const regionalContent = [
    {
      id: '1',
      title: 'Nollywood Blockbuster',
      region: 'West Africa',
      country: 'Nigeria',
      thumbnail: '/assets/generated/african-drama-poster.jpg',
      trending: true,
      views: '2.5M',
    },
    {
      id: '2',
      title: 'Kenyan Documentary',
      region: 'East Africa',
      country: 'Kenya',
      thumbnail: '/assets/generated/african-youth-watching.jpg',
      trending: false,
      views: '890K',
    },
    {
      id: '3',
      title: 'South African Thriller',
      region: 'Southern Africa',
      country: 'South Africa',
      thumbnail: '/assets/generated/african-thriller-poster.jpg',
      trending: true,
      views: '1.8M',
    },
  ];

  const trendingByRegion = [
    { region: 'West Africa', content: 'The Last Dance', views: '3.2M' },
    { region: 'East Africa', content: 'Nairobi Nights', views: '1.5M' },
    { region: 'Southern Africa', content: 'Cape Town Stories', views: '2.1M' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <img
              src="/assets/generated/geo-targeted-content-map.dim_800x600.png"
              alt="Geo-Targeted Content"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Regional Content Discovery
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Discover movies and music relevant to your region with personalized recommendations based on your location
          </p>
        </div>

        {/* Region Selector */}
        <Card className="mb-8 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Select Your Region
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Choose a region to see content popular in that area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              {regions.map((region) => (
                <Button
                  key={region.id}
                  variant={selectedRegion === region.id ? 'default' : 'outline'}
                  className={`h-auto py-4 flex flex-col items-center gap-2 ${
                    selectedRegion === region.id
                      ? 'bg-amber-500 hover:bg-amber-600 text-black'
                      : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                  }`}
                  onClick={() => setSelectedRegion(region.id)}
                >
                  <span className="text-3xl">{region.flag}</span>
                  <span className="text-sm font-medium">{region.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="movies" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-zinc-800">
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="movies" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">
                {selectedRegion === 'all' ? 'All Regions' : regions.find(r => r.id === selectedRegion)?.name}
              </h2>
              <Button variant="outline" className="border-zinc-700 text-zinc-300">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regionalContent.map((content) => (
                <Card key={content.id} className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-amber-500 transition-colors">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={content.thumbnail}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                    {content.trending && (
                      <Badge className="absolute top-3 right-3 bg-red-500">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-black/70 text-white">
                        <MapPin className="w-3 h-3 mr-1" />
                        {content.country}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{content.title}</CardTitle>
                    <CardDescription className="text-zinc-400">
                      {content.region} • {content.views} views
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                      Watch Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="music">
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">Regional music content coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Trending by Region</CardTitle>
                <CardDescription className="text-zinc-400">
                  Most popular content in each region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingByRegion.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold">
                          #{idx + 1}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{item.content}</h3>
                          <p className="text-sm text-zinc-400">{item.region}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{item.views}</div>
                        <div className="text-sm text-zinc-400">views</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Regional Insights */}
        <Card className="mt-8 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Regional Insights</CardTitle>
            <CardDescription className="text-zinc-400">
              Content performance across different regions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-4 bg-zinc-800 rounded-lg">
                <div className="text-3xl mb-2">🇳🇬</div>
                <h3 className="text-white font-semibold mb-1">West Africa</h3>
                <p className="text-sm text-zinc-400">Most active region</p>
                <div className="mt-3 text-2xl font-bold text-amber-500">45%</div>
              </div>
              <div className="p-4 bg-zinc-800 rounded-lg">
                <div className="text-3xl mb-2">🇿🇦</div>
                <h3 className="text-white font-semibold mb-1">Southern Africa</h3>
                <p className="text-sm text-zinc-400">Fastest growing</p>
                <div className="mt-3 text-2xl font-bold text-green-500">+32%</div>
              </div>
              <div className="p-4 bg-zinc-800 rounded-lg">
                <div className="text-3xl mb-2">🇰🇪</div>
                <h3 className="text-white font-semibold mb-1">East Africa</h3>
                <p className="text-sm text-zinc-400">Highest engagement</p>
                <div className="mt-3 text-2xl font-bold text-blue-500">8.5/10</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
