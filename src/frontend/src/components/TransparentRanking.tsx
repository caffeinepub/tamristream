import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Eye, Users, Star, BarChart3, Info, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface RankingFactor {
  name: string;
  weight: number;
  description: string;
  icon: React.ElementType;
}

const RANKING_FACTORS: RankingFactor[] = [
  {
    name: 'View Count',
    weight: 25,
    description: 'Total number of views across all users',
    icon: Eye,
  },
  {
    name: 'Engagement Rate',
    weight: 30,
    description: 'User interactions including ratings, reviews, and watch time',
    icon: Users,
  },
  {
    name: 'Quality Score',
    weight: 25,
    description: 'Average rating and review sentiment analysis',
    icon: Star,
  },
  {
    name: 'Creator Activity',
    weight: 10,
    description: 'Creator engagement and community interaction',
    icon: TrendingUp,
  },
  {
    name: 'Recency',
    weight: 10,
    description: 'How recently the content was released or updated',
    icon: BarChart3,
  },
];

interface TransparentRankingProps {
  movieTitle?: string;
  showDetailed?: boolean;
}

export function TransparentRanking({ movieTitle, showDetailed = false }: TransparentRankingProps) {
  const [showExplanation, setShowExplanation] = useState(showDetailed);

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center space-x-2">
                <span>Transparent Ranking System</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                  Bias-Free
                </Badge>
              </CardTitle>
              <p className="text-sm text-zinc-400 mt-1">
                Open-source algorithm with complete transparency
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-zinc-400 hover:text-white"
          >
            <Info className="w-4 h-4 mr-2" />
            {showExplanation ? 'Hide' : 'Show'} Details
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Ranking Factors */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white">Ranking Factors</h4>
          {RANKING_FACTORS.map((factor) => {
            const IconComponent = factor.icon;
            return (
              <div key={factor.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-white">{factor.name}</span>
                  </div>
                  <span className="text-sm text-zinc-400">{factor.weight}%</span>
                </div>
                <Progress value={factor.weight} className="h-2" />
                {showExplanation && (
                  <p className="text-xs text-zinc-500 pl-6">{factor.description}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Explanation */}
        {showExplanation && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="bias-prevention" className="border-zinc-800">
              <AccordionTrigger className="text-sm font-semibold text-white hover:text-green-400">
                Bias Prevention Measures
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-zinc-400">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-white">Equal Visibility</p>
                      <p className="text-xs">
                        Indie and mainstream content receive equal algorithmic treatment based on quality metrics
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-white">Creator Diversity</p>
                      <p className="text-xs">
                        Algorithm actively promotes emerging creators and underrepresented voices
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-white">Continuous Monitoring</p>
                      <p className="text-xs">
                        Regular audits ensure no bias against specific genres or communities
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="trending-logic" className="border-zinc-800">
              <AccordionTrigger className="text-sm font-semibold text-white hover:text-green-400">
                Why Content is Trending
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-zinc-400">
                <p>
                  Content trends when it demonstrates strong performance across multiple factors:
                </p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400">•</span>
                    <span>High engagement rate (watch time, ratings, reviews)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400">•</span>
                    <span>Positive quality score from user feedback</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400">•</span>
                    <span>Growing view count with sustained interest</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400">•</span>
                    <span>Active creator engagement with community</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="user-control" className="border-zinc-800">
              <AccordionTrigger className="text-sm font-semibold text-white hover:text-green-400">
                User Control & Preferences
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-zinc-400">
                <p>
                  You have full control over your recommendations:
                </p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400">•</span>
                    <span>Adjust content preferences in your profile settings</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400">•</span>
                    <span>View algorithm explanations for each recommendation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400">•</span>
                    <span>Provide feedback to improve future suggestions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400">•</span>
                    <span>Opt out of personalization for neutral browsing</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* Fairness Guarantee */}
        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white">Fairness Guarantee</h4>
              <p className="text-xs text-zinc-400">
                Our ranking system is designed to be fair, transparent, and bias-free. All recommendations
                are based on content quality and user preferences, not popularity or promotional budgets.
                The algorithm is open-source and regularly audited for fairness.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
