import { useState } from 'react';
import { Tv, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Circle, Play, Home } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function SmartTVInterface() {
  const [selectedItem, setSelectedItem] = useState(0);

  const featuredContent = [
    {
      id: '1',
      title: 'The Last Dance',
      type: 'Movie',
      thumbnail: '/assets/generated/african-drama-poster.jpg',
      duration: '2h 15m',
    },
    {
      id: '2',
      title: 'African Music Hits',
      type: 'Playlist',
      thumbnail: '/assets/generated/african-music-albums.jpg',
      duration: '45 tracks',
    },
    {
      id: '3',
      title: 'Football Highlights',
      type: 'Sports',
      thumbnail: '/assets/generated/african-football-match.jpg',
      duration: '1h 30m',
    },
  ];

  const handleNavigation = (direction: string) => {
    if (direction === 'up' && selectedItem > 0) {
      setSelectedItem(selectedItem - 1);
    } else if (direction === 'down' && selectedItem < featuredContent.length - 1) {
      setSelectedItem(selectedItem + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <img
              src="/assets/generated/smart-tv-interface.dim_800x600.png"
              alt="Smart TV Interface"
              className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Smart TV Experience
          </h1>
          <p className="text-2xl text-zinc-400 max-w-3xl mx-auto">
            Optimized for your living room with remote control navigation and large-screen UI
          </p>
        </div>

        {/* TV Interface Preview */}
        <div className="bg-zinc-900 rounded-2xl p-8 mb-8 border-4 border-zinc-800">
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
            <div className="h-full flex flex-col">
              {/* TV Header */}
              <div className="bg-zinc-900/50 backdrop-blur-sm p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src="/assets/generated/app-logo.png"
                    alt="TamriStream"
                    className="w-12 h-12"
                  />
                  <span className="text-white text-2xl font-bold">TamriStream</span>
                </div>
                <div className="flex items-center gap-6 text-white text-xl">
                  <span>Home</span>
                  <span>Movies</span>
                  <span>Music</span>
                  <span>Sports</span>
                </div>
              </div>

              {/* Featured Content */}
              <div className="flex-1 p-8">
                <h2 className="text-white text-3xl font-bold mb-6">Featured</h2>
                <div className="space-y-4">
                  {featuredContent.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-6 p-6 rounded-xl transition-all ${
                        selectedItem === idx
                          ? 'bg-amber-500 scale-105'
                          : 'bg-zinc-800/50'
                      }`}
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-32 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold mb-2 ${
                          selectedItem === idx ? 'text-black' : 'text-white'
                        }`}>
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-4">
                          <Badge className={selectedItem === idx ? 'bg-black text-white' : 'bg-zinc-700'}>
                            {item.type}
                          </Badge>
                          <span className={`text-lg ${
                            selectedItem === idx ? 'text-black' : 'text-zinc-400'
                          }`}>
                            {item.duration}
                          </span>
                        </div>
                      </div>
                      {selectedItem === idx && (
                        <Play className="w-12 h-12 text-black" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Remote Control Simulator */}
          <div className="flex justify-center">
            <Card className="bg-zinc-800 border-zinc-700 w-64">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-sm">Remote Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* D-Pad */}
                <div className="grid grid-cols-3 gap-2">
                  <div />
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-zinc-600 hover:bg-zinc-700"
                    onClick={() => handleNavigation('up')}
                  >
                    <ArrowUp className="w-6 h-6 text-white" />
                  </Button>
                  <div />
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-zinc-600 hover:bg-zinc-700"
                    onClick={() => handleNavigation('left')}
                  >
                    <ArrowLeft className="w-6 h-6 text-white" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-zinc-600 hover:bg-amber-500 hover:text-black"
                  >
                    <Circle className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-zinc-600 hover:bg-zinc-700"
                    onClick={() => handleNavigation('right')}
                  >
                    <ArrowRight className="w-6 h-6 text-white" />
                  </Button>
                  
                  <div />
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-zinc-600 hover:bg-zinc-700"
                    onClick={() => handleNavigation('down')}
                  >
                    <ArrowDown className="w-6 h-6 text-white" />
                  </Button>
                  <div />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </Button>
                  <Button variant="outline" className="border-zinc-600 text-white hover:bg-zinc-700">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">10-Foot Interface</CardTitle>
              <CardDescription className="text-zinc-400">
                Optimized for viewing from your couch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300">
                Large text, clear navigation, and comfortable viewing distance design
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Remote Navigation</CardTitle>
              <CardDescription className="text-zinc-400">
                Simple directional controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300">
                Navigate with your TV remote's directional pad and select button
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Voice Control</CardTitle>
              <CardDescription className="text-zinc-400">
                Hands-free operation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300">
                Use voice commands with your TV's built-in voice assistant
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Supported Platforms */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Supported Platforms</CardTitle>
            <CardDescription className="text-zinc-400">
              Available on major Smart TV platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Samsung Tizen', 'LG webOS', 'Android TV', 'Roku'].map((platform) => (
                <div key={platform} className="p-4 bg-zinc-800 rounded-lg text-center">
                  <Tv className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-white font-semibold">{platform}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
