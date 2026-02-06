import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, CreditCard, Play, Award, DollarSign, Globe } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Sign Up Free',
      description: 'Create your account in seconds with Internet Identity. No credit card required to start.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: CreditCard,
      title: 'Choose Your Plan',
      description: 'Pick from affordable options: Free with ads, Premium at $1-3/month, or Pay-Per-View.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Play,
      title: 'Start Streaming',
      description: 'Watch thousands of African movies and shows instantly on any device, anywhere.',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      description: 'Starting at just $1-3/month, or watch for free with ads. No hidden fees.',
      stat: '$1-3/mo'
    },
    {
      icon: Globe,
      title: 'Data Saver Mode',
      description: 'Optimized streaming for limited data plans. Watch more, use less data.',
      stat: '50% Less Data'
    },
    {
      icon: Award,
      title: 'Support Creators',
      description: '70% of revenue goes directly to African filmmakers and artists.',
      stat: '70% to Creators'
    }
  ];

  return (
    <div className="bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="space-y-20">
          {/* How It Works */}
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                How It Works
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Start streaming African cinema in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative">
                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-amber-500 to-transparent"></div>
                    )}
                    
                    <Card className="relative bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden group">
                      {/* Step Number */}
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-amber-500">{index + 1}</span>
                      </div>

                      <div className="p-8 space-y-4">
                        {/* Icon */}
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-white">
                            {step.title}
                          </h3>
                          <p className="text-zinc-400 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Why Choose TamriStream?
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Built specifically for African audiences with features that matter
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <Card key={benefit.title} className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 hover:border-amber-500/50 transition-all duration-300 group">
                    <div className="p-8 space-y-6">
                      {/* Icon and Stat */}
                      <div className="flex items-start justify-between">
                        <div className="w-16 h-16 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                          <Icon className="w-8 h-8 text-amber-500" />
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-amber-500">{benefit.stat}</div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">
                          {benefit.title}
                        </h3>
                        <p className="text-zinc-400 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 to-orange-500 p-12 md:p-16">
            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Ready to Start Streaming?
              </h2>
              <p className="text-xl text-black/80 max-w-2xl mx-auto">
                Join thousands of viewers enjoying the best of African cinema
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-black hover:bg-zinc-900 text-white font-bold text-lg px-10 py-7 h-auto rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-2 border-black/30 text-black hover:bg-white hover:text-black font-bold text-lg px-10 py-7 h-auto rounded-full transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
