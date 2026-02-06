import { useState, useEffect } from 'react';
import { Mic, MicOff, Search, Volume2, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export function VoiceSearchInterface() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const mockResults = [
    {
      id: '1',
      title: 'The Last Dance',
      type: 'Movie',
      thumbnail: '/assets/generated/african-drama-poster.jpg',
    },
    {
      id: '2',
      title: 'Burna Boy - Last Last',
      type: 'Music',
      thumbnail: '/assets/generated/african-music-albums.jpg',
    },
    {
      id: '3',
      title: 'African Football Highlights',
      type: 'Sports',
      thumbnail: '/assets/generated/african-football-match.jpg',
    },
  ];

  const handleVoiceSearch = () => {
    if (isListening) {
      setIsListening(false);
      toast.success('Voice search stopped');
      // Simulate search results
      setSearchResults(mockResults);
    } else {
      setIsListening(true);
      toast.info('Listening... Speak now');
      // Simulate voice recognition
      setTimeout(() => {
        setTranscript('Show me African movies');
        setIsListening(false);
        setSearchResults(mockResults);
      }, 3000);
    }
  };

  const voiceCommands = [
    'Show me African movies',
    'Play Burna Boy music',
    'Find sports highlights',
    'Open my profile',
    'What\'s trending today',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <img
              src="/assets/generated/voice-search-interface.dim_400x300.png"
              alt="Voice Search"
              className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Voice Search
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Search for content using your voice with natural language commands
          </p>
        </div>

        {/* Voice Search Interface */}
        <Card className="mb-8 bg-zinc-900 border-zinc-800">
          <CardContent className="pt-8">
            <div className="text-center space-y-6">
              <Button
                size="lg"
                className={`w-32 h-32 rounded-full ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                    : 'bg-amber-500 hover:bg-amber-600'
                } text-black`}
                onClick={handleVoiceSearch}
              >
                {isListening ? (
                  <MicOff className="w-16 h-16" />
                ) : (
                  <Mic className="w-16 h-16" />
                )}
              </Button>

              <div className="space-y-2">
                <p className="text-white text-lg font-semibold">
                  {isListening ? 'Listening...' : 'Tap to speak'}
                </p>
                {transcript && (
                  <div className="p-4 bg-zinc-800 rounded-lg">
                    <p className="text-zinc-300 text-lg">"{transcript}"</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 justify-center">
                <Input
                  placeholder="Or type your search..."
                  className="max-w-md bg-zinc-800 border-zinc-700 text-white"
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                />
                <Button variant="outline" className="border-zinc-700">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <Card className="mb-8 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Search Results</CardTitle>
              <CardDescription className="text-zinc-400">
                Found {searchResults.length} results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <div key={result.id} className="flex items-center gap-4 p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors cursor-pointer">
                    <img
                      src={result.thumbnail}
                      alt={result.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{result.title}</h3>
                      <Badge variant="outline" className="mt-1 border-zinc-700 text-zinc-400">
                        {result.type}
                      </Badge>
                    </div>
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black">
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Voice Commands */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Try These Commands
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Example voice commands you can use
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {voiceCommands.map((command, idx) => (
                <div key={idx} className="p-3 bg-zinc-800 rounded-lg">
                  <p className="text-zinc-300">"{command}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
