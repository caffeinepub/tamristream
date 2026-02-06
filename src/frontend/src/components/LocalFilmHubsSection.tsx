import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, Users, Camera, Calendar, Globe, CheckCircle, Sparkles } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function LocalFilmHubsSection() {
  const navigate = useNavigate();

  const hubs = [
    {
      id: '1',
      name: 'Lagos Film Hub',
      location: 'University of Lagos, Nigeria',
      type: 'University Partnership',
      members: 450,
      equipment: 'Professional cameras, editing suites, sound stages',
      events: 12,
      thumbnail: '/assets/generated/local-film-hub-university.dim_800x600.jpg',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Accra Creator Center',
      location: 'Ghana Institute of Journalism',
      type: 'Media House Partnership',
      members: 320,
      equipment: 'Studio space, lighting kits, post-production facilities',
      events: 8,
      thumbnail: '/assets/generated/african-film-partnerships-banner.jpg',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Nairobi Innovation Hub',
      location: 'Kenyatta University, Kenya',
      type: 'University Partnership',
      members: 280,
      equipment: 'VR equipment, drones, 4K cameras, editing labs',
      events: 10,
      thumbnail: '/assets/generated/creator-onboarding-workshop.jpg',
      status: 'Active'
    }
  ];

  const partners = [
    { name: 'University of Lagos', type: 'University', country: 'Nigeria' },
    { name: 'Ghana Institute of Journalism', type: 'Media School', country: 'Ghana' },
    { name: 'Kenyatta University', type: 'University', country: 'Kenya' },
    { name: 'MultiChoice Africa', type: 'Media House', country: 'Pan-African' },
    { name: 'University of Cape Town', type: 'University', country: 'South Africa' },
    { name: 'Makerere University', type: 'University', country: 'Uganda' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-black to-zinc-900">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white">Local Film Hubs</h2>
        </div>
        <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-6">
          Regional creator centers partnering with African universities and media houses. 
          Access professional equipment, collaborative spaces, and networking opportunities across the continent.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Badge className="bg-green-600 text-white px-4 py-2">
            <Building2 className="w-4 h-4 mr-2" />
            University Partnerships
          </Badge>
          <Badge className="bg-emerald-600 text-white px-4 py-2">
            <Camera className="w-4 h-4 mr-2" />
            Professional Equipment
          </Badge>
          <Badge className="bg-teal-600 text-white px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            Community Access
          </Badge>
        </div>
      </div>

      {/* Interactive Map Placeholder */}
      <div className="mb-12 bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
        <div className="relative">
          <img
            src="/assets/generated/africa-film-hubs-map.dim_800x600.png"
            alt="Map of African film hubs"
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg flex items-end p-6">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-2">15+ Hubs Across Africa</h3>
              <p className="text-zinc-300">Growing network of creator centers in major cities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Hubs */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-6">Active Film Hubs</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {hubs.map((hub) => (
            <Card key={hub.id} className="bg-zinc-900 border-zinc-800 hover:border-green-500/50 transition-all">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={hub.thumbnail}
                    alt={hub.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {hub.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-3 text-xs">{hub.type}</Badge>
                <CardTitle className="text-xl text-white mb-2">{hub.name}</CardTitle>
                <CardDescription className="text-zinc-400 mb-4 flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  {hub.location}
                </CardDescription>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {hub.members} members
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {hub.events} events
                    </span>
                  </div>
                  <div className="text-sm text-zinc-400">
                    <Camera className="w-4 h-4 inline mr-2" />
                    {hub.equipment}
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Visit Hub
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Partnership Network */}
      <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-2xl p-8 border border-green-500/30 mb-12">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Our Partnership Network</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {partners.map((partner, index) => (
            <Card key={index} className="bg-black/40 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-600/20 rounded-lg shrink-0">
                    <Building2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm mb-1">{partner.name}</div>
                    <div className="text-xs text-zinc-400">{partner.type}</div>
                    <Badge variant="outline" className="mt-2 text-xs">
                      <Globe className="w-3 h-3 mr-1" />
                      {partner.country}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Hub Benefits */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-green-500" />
              Equipment & Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              'Professional cameras and lighting equipment',
              'Editing suites with industry-standard software',
              'Sound stages and recording studios',
              'Post-production facilities',
              'VR and drone equipment',
              'Equipment sharing programs'
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 text-zinc-300">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-500" />
              Community & Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              'Networking with local filmmakers and creators',
              'Regular workshops and masterclasses',
              'Community screening events',
              'Mentorship from industry professionals',
              'Collaborative project opportunities',
              'Cultural preservation initiatives'
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 text-zinc-300">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Impact Stats */}
      <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 mb-12">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Community Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Hubs', value: '15+', icon: Building2 },
            { label: 'Creators Trained', value: '3,200+', icon: Users },
            { label: 'Projects Completed', value: '850+', icon: Camera },
            { label: 'Partner Institutions', value: '25+', icon: Globe }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button
          onClick={() => navigate({ to: '/creator-portal' })}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 text-lg"
        >
          <Building2 className="w-5 h-5 mr-2" />
          Find a Hub Near You
        </Button>
        <p className="text-sm text-zinc-400 mt-4">Join our growing network of African creators</p>
      </div>
    </section>
  );
}
