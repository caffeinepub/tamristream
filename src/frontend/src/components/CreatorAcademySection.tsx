import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, Video, Award, Users, BookOpen, Sparkles, CheckCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function CreatorAcademySection() {
  const navigate = useNavigate();

  const courses = [
    {
      id: '1',
      title: 'Filmmaking Fundamentals',
      description: 'Master the basics of storytelling, cinematography, and production',
      duration: '8 weeks',
      level: 'Beginner',
      students: 2341,
      rating: 4.8,
      thumbnail: '/assets/generated/creator-academy-classroom.dim_800x600.jpg',
      modules: 24,
      certified: true
    },
    {
      id: '2',
      title: 'Professional Video Editing',
      description: 'Learn industry-standard editing techniques and software',
      duration: '6 weeks',
      level: 'Intermediate',
      students: 1876,
      rating: 4.9,
      thumbnail: '/assets/generated/behind-the-scenes-filmmaking.jpg',
      modules: 18,
      certified: true
    },
    {
      id: '3',
      title: 'Blockchain for Creators',
      description: 'Understand NFTs, smart contracts, and decentralized content distribution',
      duration: '4 weeks',
      level: 'Beginner',
      students: 1234,
      rating: 4.7,
      thumbnail: '/assets/generated/creator-academy-certification.dim_200x200.png',
      modules: 12,
      certified: true
    }
  ];

  const stats = [
    { label: 'Active Students', value: '12,500+', icon: Users },
    { label: 'Courses Available', value: '45+', icon: BookOpen },
    { label: 'Certifications Issued', value: '8,200+', icon: Award },
    { label: 'Success Rate', value: '94%', icon: TrendingUp }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-zinc-900 to-black">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white">Creator Academy</h2>
        </div>
        <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-6">
          Free online training platform for African youth. Learn filmmaking, video editing, and blockchain literacy 
          with progress tracking, certification, and career development support.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Badge className="bg-blue-600 text-white px-4 py-2">
            <Video className="w-4 h-4 mr-2" />
            100% Free
          </Badge>
          <Badge className="bg-cyan-600 text-white px-4 py-2">
            <Award className="w-4 h-4 mr-2" />
            Certified Courses
          </Badge>
          <Badge className="bg-green-600 text-white px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            African Youth Focus
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-zinc-900 border-zinc-800 text-center">
            <CardContent className="pt-6">
              <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-zinc-400">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Courses */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-6">Featured Courses</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="bg-zinc-900 border-zinc-800 hover:border-blue-500/50 transition-all">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                    {course.level}
                  </Badge>
                  {course.certified && (
                    <Badge className="absolute top-4 left-4 bg-amber-500 text-black">
                      <Award className="w-3 h-3 mr-1" />
                      Certified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl text-white mb-2">{course.title}</CardTitle>
                <CardDescription className="text-zinc-400 mb-4">
                  {course.description}
                </CardDescription>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Video className="w-4 h-4" />
                      {course.modules} modules
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">{course.duration}</span>
                    <span className="text-amber-500 font-semibold">★ {course.rating}</span>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-2xl p-8 border border-blue-500/30 mb-12">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Your Learning Journey</h3>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { step: 1, title: 'Enroll', icon: BookOpen, desc: 'Choose your courses' },
            { step: 2, title: 'Learn', icon: Video, desc: 'Watch video tutorials' },
            { step: 3, title: 'Practice', icon: Sparkles, desc: 'Complete assignments' },
            { step: 4, title: 'Certify', icon: Award, desc: 'Earn certification' },
            { step: 5, title: 'Create', icon: TrendingUp, desc: 'Build your career' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-semibold text-white mb-1">{item.step}. {item.title}</div>
              <div className="text-xs text-zinc-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              What You'll Get
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              'Comprehensive video tutorials from industry experts',
              'Hands-on projects and practical assignments',
              'Official TamriStream certifications',
              'Mentorship from experienced African filmmakers',
              'Career development and job placement support',
              'Access to professional equipment and software'
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 text-zinc-300">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Success Stories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-zinc-300 italic mb-2">
                "The Creator Academy changed my life. I went from knowing nothing about filmmaking to directing my first feature film in 6 months."
              </p>
              <p className="text-sm text-zinc-400">— Amara K., Lagos</p>
            </div>
            <div className="border-l-4 border-cyan-500 pl-4">
              <p className="text-zinc-300 italic mb-2">
                "The blockchain literacy course helped me understand how to protect my content and earn fair revenue. Game changer!"
              </p>
              <p className="text-sm text-zinc-400">— Kwame M., Accra</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button
          onClick={() => navigate({ to: '/creator-academy' })}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg"
        >
          <GraduationCap className="w-5 h-5 mr-2" />
          Start Learning for Free
        </Button>
        <p className="text-sm text-zinc-400 mt-4">No credit card required • 100% free forever</p>
      </div>
    </section>
  );
}
