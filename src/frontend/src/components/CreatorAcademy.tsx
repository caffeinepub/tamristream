import { useState } from 'react';
import { GraduationCap, Play, CheckCircle, Lock, Award, BookOpen, Video, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

export function CreatorAcademy() {
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);

  // Mock course data
  const courses = [
    {
      id: '1',
      title: 'Filmmaking Fundamentals',
      category: 'Filmmaking',
      level: 'Beginner',
      duration: '4 hours',
      lessons: 12,
      progress: 75,
      thumbnail: '/assets/generated/creator-academy-interface.dim_800x600.png',
      instructor: 'Kunle Afolayan',
      description: 'Learn the basics of filmmaking from script to screen',
      locked: false,
    },
    {
      id: '2',
      title: 'Music Production Mastery',
      category: 'Music',
      level: 'Intermediate',
      duration: '6 hours',
      lessons: 18,
      progress: 30,
      thumbnail: '/assets/generated/african-music-artist-studio.jpg',
      instructor: 'Burna Boy',
      description: 'Master the art of music production and mixing',
      locked: false,
    },
    {
      id: '3',
      title: 'Content Marketing Strategies',
      category: 'Business',
      level: 'Advanced',
      duration: '3 hours',
      lessons: 10,
      progress: 0,
      thumbnail: '/assets/generated/creator-onboarding-workshop.jpg',
      instructor: 'Marketing Expert',
      description: 'Learn how to market your content effectively',
      locked: false,
    },
    {
      id: '4',
      title: 'Advanced Cinematography',
      category: 'Filmmaking',
      level: 'Advanced',
      duration: '8 hours',
      lessons: 24,
      progress: 0,
      thumbnail: '/assets/generated/behind-the-scenes-filmmaking.jpg',
      instructor: 'Emmanuel Lubezki',
      description: 'Master advanced camera techniques and lighting',
      locked: true,
    },
  ];

  const achievements = [
    {
      id: '1',
      title: 'First Course Completed',
      description: 'Complete your first course',
      icon: '🎓',
      unlocked: true,
    },
    {
      id: '2',
      title: 'Quick Learner',
      description: 'Complete 3 courses in one month',
      icon: '⚡',
      unlocked: false,
    },
    {
      id: '3',
      title: 'Master Creator',
      description: 'Complete all advanced courses',
      icon: '👑',
      unlocked: false,
    },
  ];

  const handleStartCourse = (courseId: string) => {
    toast.success('Course started! Good luck with your learning journey.');
  };

  const handleCompleteCourse = (courseId: string) => {
    setCompletedCourses([...completedCourses, courseId]);
    toast.success('Congratulations! Course completed. Certificate awarded.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <img
              src="/assets/generated/creator-academy-interface.dim_800x600.png"
              alt="Creator Academy"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Creator Academy
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Master your craft with expert-led courses, tutorials, and resources for filmmakers and musicians
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-zinc-400">Courses Enrolled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">3</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-zinc-400">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{completedCourses.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-zinc-400">Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-500">{completedCourses.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-zinc-400">Learning Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">12.5</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-zinc-800">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id} className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-amber-500 transition-colors">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    {course.locked && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <Lock className="w-12 h-12 text-zinc-400" />
                      </div>
                    )}
                    <Badge className="absolute top-3 right-3 bg-amber-500 text-black">
                      {course.level}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                        {course.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-white text-lg">{course.title}</CardTitle>
                    <CardDescription className="text-zinc-400">
                      By {course.instructor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-zinc-300">{course.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Video className="w-4 h-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {course.progress > 0 && !course.locked && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-400">Progress</span>
                          <span className="text-white font-semibold">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}

                    {course.locked ? (
                      <Button className="w-full" disabled>
                        <Lock className="w-4 h-4 mr-2" />
                        Locked
                      </Button>
                    ) : course.progress === 0 ? (
                      <Button
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                        onClick={() => handleStartCourse(course.id)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Course
                      </Button>
                    ) : course.progress === 100 ? (
                      <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleStartCourse(course.id)}
                      >
                        Continue Learning
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Learning Progress</CardTitle>
                <CardDescription className="text-zinc-400">
                  Track your journey through the Creator Academy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {courses.filter(c => c.progress > 0).map((course) => (
                      <div key={course.id} className="p-4 bg-zinc-800 rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-white font-semibold">{course.title}</h3>
                            <p className="text-sm text-zinc-400">{course.category}</p>
                          </div>
                          <Badge className="bg-amber-500 text-black">{course.progress}%</Badge>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <div className="flex items-center justify-between text-sm text-zinc-400">
                          <span>{Math.floor(course.lessons * course.progress / 100)} of {course.lessons} lessons</span>
                          {course.progress === 100 && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleCompleteCourse(course.id)}
                            >
                              <Award className="w-4 h-4 mr-2" />
                              Get Certificate
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg text-center ${
                        achievement.unlocked ? 'bg-amber-500/20 border border-amber-500' : 'bg-zinc-800 opacity-50'
                      }`}
                    >
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <h3 className="text-white font-semibold mb-1">{achievement.title}</h3>
                      <p className="text-sm text-zinc-400">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Your Certificates</CardTitle>
                <CardDescription className="text-zinc-400">
                  Download and share your achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                {completedCourses.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {completedCourses.map((courseId) => {
                      const course = courses.find(c => c.id === courseId);
                      return course ? (
                        <div key={courseId} className="p-6 bg-zinc-800 rounded-lg border-2 border-amber-500">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
                              <GraduationCap className="w-8 h-8 text-black" />
                            </div>
                            <div>
                              <h3 className="text-white font-semibold">{course.title}</h3>
                              <p className="text-sm text-zinc-400">Completed</p>
                            </div>
                          </div>
                          <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                            <FileText className="w-4 h-4 mr-2" />
                            Download Certificate
                          </Button>
                        </div>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Award className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                    <p className="text-zinc-400 text-lg">Complete courses to earn certificates</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
