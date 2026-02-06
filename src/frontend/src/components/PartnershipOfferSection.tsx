import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, Award, TrendingUp, Megaphone, CheckCircle, Clock, Users } from 'lucide-react';
import { useGetPartnershipOffers } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';

export function PartnershipOfferSection() {
  const { data: offers, isLoading } = useGetPartnershipOffers();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  const activeOffer = offers?.find(offer => offer.isActive);

  if (!activeOffer) {
    return null;
  }

  const slotsRemaining = Number(activeOffer.creatorLimit - activeOffer.currentCount);
  const percentageFilled = (Number(activeOffer.currentCount) / Number(activeOffer.creatorLimit)) * 100;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="partnership-heading">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-1">
        <div className="relative bg-black rounded-3xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" aria-hidden="true" />
              <Badge variant="secondary" className="text-lg px-4 py-1 bg-amber-500 text-black font-bold">
                LIMITED OFFER
              </Badge>
              <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" aria-hidden="true" />
            </div>
            
            <h2 id="partnership-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
              First 100 African Creators
            </h2>
            
            <p className="text-xl md:text-2xl text-amber-100 mb-6">
              Join TamriStream's Exclusive Launch Partnership Program
            </p>

            {/* Countdown */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-amber-300">
                <Users className="w-5 h-5" aria-hidden="true" />
                <span className="text-lg font-semibold">
                  {slotsRemaining} Spots Remaining
                </span>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <Clock className="w-5 h-5" aria-hidden="true" />
                <span className="text-lg font-semibold">
                  {Number(activeOffer.currentCount)} / {Number(activeOffer.creatorLimit)} Filled
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="w-full bg-zinc-800 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${percentageFilled}%` }}
                  role="progressbar"
                  aria-valuenow={percentageFilled}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${percentageFilled.toFixed(0)}% of partnership slots filled`}
                />
              </div>
              <p className="text-sm text-zinc-400 mt-2">
                {percentageFilled.toFixed(0)}% of partnership slots filled
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-zinc-900 border-amber-500/20 hover:border-amber-500/40 transition-colors">
              <CardHeader>
                <Award className="w-10 h-10 text-amber-500 mb-2" aria-hidden="true" />
                <CardTitle className="text-white">Featured Placement</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-300">
                  Guaranteed featured placement on TamriStream launch page with dedicated creator spotlight
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-amber-500/20 hover:border-amber-500/40 transition-colors">
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-amber-500 mb-2" aria-hidden="true" />
                <CardTitle className="text-white">Early Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-300">
                  Exclusive early access to advanced analytics tools before general platform release
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-amber-500/20 hover:border-amber-500/40 transition-colors">
              <CardHeader>
                <CheckCircle className="w-10 h-10 text-amber-500 mb-2" aria-hidden="true" />
                <CardTitle className="text-white">10% Platform Fee</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-300">
                  Lifetime reduced platform fee of only 10% - keep 90% of all revenue streams permanently
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-amber-500/20 hover:border-amber-500/40 transition-colors">
              <CardHeader>
                <Megaphone className="w-10 h-10 text-amber-500 mb-2" aria-hidden="true" />
                <CardTitle className="text-white">Marketing Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-300">
                  Comprehensive marketing support through TamriStream's official social media channels
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Alert className="max-w-2xl mx-auto mb-6 bg-amber-500/10 border-amber-500/30">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <AlertDescription className="text-amber-100 text-lg">
                This exclusive offer is only available to the first 100 African creators who join TamriStream. 
                Once all spots are filled, standard platform fees will apply.
              </AlertDescription>
            </Alert>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => navigate({ to: '/partnership-application' })}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold text-lg px-8 py-6 rounded-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Apply Now - Join the First 100
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: '/creator-portal' })}
                className="border-amber-500 text-amber-500 hover:bg-amber-500/10 font-semibold text-lg px-8 py-6 rounded-lg"
              >
                Learn More
              </Button>
            </div>

            <p className="text-sm text-zinc-400 mt-4">
              Already a creator? <button onClick={() => navigate({ to: '/partnership-application' })} className="text-amber-500 hover:underline">Check your application status</button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
