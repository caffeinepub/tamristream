import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, CheckCircle2, PlayCircle, FileText, Video, Award } from 'lucide-react';

export function CreatorOnboardingProgram() {
  const modules = [
    {
      id: '1',
      title: 'Getting Started',
      description: 'Learn the basics of TamriStream and how to set up your creator profile',
      duration: '15 min',
      isCompleted: true,
      icon: PlayCircle
    },
    {
      id: '2',
      title: 'Content Guidelines',
      description: 'Understand our content policies and quality standards',
      duration: '20 min',
      isCompleted: true,
      icon: FileText
    },
    {
      id: '3',
      title: 'Upload & Distribution',
      description: 'Master the process of uploading and distributing your content',
      duration: '25 min',
      isCompleted: false,
      icon: Video
    },
    {
      id: '4',
      title: 'Revenue & Analytics',
      description: 'Learn how to track your earnings and understand your audience',
      duration: '30 min',
      isCompleted: false,
      icon: Award
    }
  ];

  const completedModules = modules.filter(m => m.isCompleted).length;
  const progressPercentage = (completedModules / modules.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Creator Learning Program</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Master the skills you need to succeed as a creator on TamriStream
          </p>
        </div>

        <Card className="border-0 bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Your Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedModules} of {modules.length} modules completed
                  </p>
                </div>
                <Badge className="text-lg px-4 py-2">
                  {Math.round(progressPercentage)}%
                </Badge>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {modules.map((module) => {
            const Icon = module.icon;
            
            return (
              <Card key={module.id} className={`border-l-4 ${module.isCompleted ? 'border-l-green-500' : 'border-l-primary'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${module.isCompleted ? 'bg-green-100 dark:bg-green-900' : 'bg-primary/10'}`}>
                        <Icon className={`w-5 h-5 ${module.isCompleted ? 'text-green-600' : 'text-primary'}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                    </div>
                    {module.isCompleted ? (
                      <Badge className="bg-green-600 text-white">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="outline">{module.duration}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    variant={module.isCompleted ? "outline" : "default"}
                    className="w-full"
                  >
                    {module.isCompleted ? 'Review Module' : 'Start Module'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-0 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <span>Certification</span>
            </CardTitle>
            <CardDescription>
              Complete all modules to earn your TamriStream Creator Certificate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Certified creators get priority support, featured placement, and exclusive opportunities.
            </p>
            <Button disabled={completedModules < modules.length}>
              {completedModules < modules.length ? 'Complete All Modules First' : 'Claim Certificate'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
