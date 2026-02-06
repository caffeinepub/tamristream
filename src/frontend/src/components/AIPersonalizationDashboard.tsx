import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Languages, TrendingUp } from 'lucide-react';
import { AIIndieDiscovery } from './AIIndieDiscovery';
import { MultiLanguageSubtitles } from './MultiLanguageSubtitles';
import { TransparentRanking } from './TransparentRanking';
import { useGetAllMovies } from '../hooks/useQueries';

export function AIPersonalizationDashboard() {
  const { data: movies = [], isLoading } = useGetAllMovies();

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">AI + Personalization</h1>
              <p className="text-lg text-zinc-400 mt-2">
                Discover hidden gems, enjoy multi-language support, and understand our transparent ranking system
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="discovery" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-zinc-900">
            <TabsTrigger value="discovery" className="data-[state=active]:bg-purple-600">
              <Sparkles className="w-4 h-4 mr-2" />
              Indie Discovery
            </TabsTrigger>
            <TabsTrigger value="languages" className="data-[state=active]:bg-blue-600">
              <Languages className="w-4 h-4 mr-2" />
              Multi-Language
            </TabsTrigger>
            <TabsTrigger value="ranking" className="data-[state=active]:bg-green-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Transparent Ranking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discovery" className="space-y-6 mt-6">
            <AIIndieDiscovery movies={movies} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="languages" className="space-y-6 mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <MultiLanguageSubtitles />
              <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                  <CardTitle className="text-lg">Language Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">Supported Languages</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {['English', 'Swahili', 'Yoruba', 'Hausa', 'Amharic', 'Zulu', 'French', 'Portuguese', 'Arabic', 'Spanish'].map((lang) => (
                        <div key={lang} className="p-2 bg-zinc-800 rounded text-sm text-zinc-300">
                          {lang}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-zinc-800">
                    <h4 className="font-semibold text-white mb-2">AI Translation Benefits</h4>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400">•</span>
                        <span>Real-time subtitle generation</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400">•</span>
                        <span>Cultural context preservation</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400">•</span>
                        <span>Continuous quality improvement</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400">•</span>
                        <span>Interactive language learning</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ranking" className="space-y-6 mt-6">
            <TransparentRanking showDetailed={true} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
