import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Map, Globe, Gamepad2, BookOpen, Music, Trophy, Star, Play, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

interface GameProgress {
  gameId: string;
  score: number;
  questionsAnswered: number;
  correctAnswers: number;
}

export function InteractiveLearningGames() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameProgress, setGameProgress] = useState<GameProgress>({
    gameId: '',
    score: 0,
    questionsAnswered: 0,
    correctAnswers: 0
  });

  const geographyQuestions: QuizQuestion[] = [
    {
      id: 'geo1',
      question: 'What is the capital city of Nigeria?',
      options: ['Lagos', 'Abuja', 'Kano', 'Port Harcourt'],
      correctAnswer: 1,
      explanation: 'Abuja is the capital city of Nigeria, located in the center of the country.',
      category: 'Geography'
    },
    {
      id: 'geo2',
      question: 'Which is the largest country in Africa by area?',
      options: ['Nigeria', 'Egypt', 'Algeria', 'South Africa'],
      correctAnswer: 2,
      explanation: 'Algeria is the largest country in Africa, covering over 2.3 million square kilometers.',
      category: 'Geography'
    },
    {
      id: 'geo3',
      question: 'What is the longest river in Africa?',
      options: ['Congo River', 'Niger River', 'Nile River', 'Zambezi River'],
      correctAnswer: 2,
      explanation: 'The Nile River is the longest river in Africa and the world, flowing over 6,650 kilometers.',
      category: 'Geography'
    }
  ];

  const cultureQuestions: QuizQuestion[] = [
    {
      id: 'cul1',
      question: 'What does "Ubuntu" mean in African philosophy?',
      options: ['I am because we are', 'Strength in unity', 'Respect for elders', 'Love for nature'],
      correctAnswer: 0,
      explanation: 'Ubuntu means "I am because we are" - emphasizing community and interconnectedness.',
      category: 'Culture'
    },
    {
      id: 'cul2',
      question: 'Which traditional African instrument is known as the "thumb piano"?',
      options: ['Djembe', 'Mbira', 'Kora', 'Balafon'],
      correctAnswer: 1,
      explanation: 'The Mbira, also called the thumb piano, is played by plucking metal tines with the thumbs.',
      category: 'Culture'
    }
  ];

  const wildlifeQuestions: QuizQuestion[] = [
    {
      id: 'wild1',
      question: 'What is the fastest land animal in Africa?',
      options: ['Lion', 'Cheetah', 'Leopard', 'Gazelle'],
      correctAnswer: 1,
      explanation: 'The cheetah can run up to 70 mph, making it the fastest land animal on Earth!',
      category: 'Wildlife'
    },
    {
      id: 'wild2',
      question: 'Which African animal is known as the "King of the Jungle"?',
      options: ['Elephant', 'Lion', 'Gorilla', 'Leopard'],
      correctAnswer: 1,
      explanation: 'The lion is called the "King of the Jungle" because of its strength and majestic appearance.',
      category: 'Wildlife'
    }
  ];

  const games = [
    {
      id: 'geography',
      title: 'African Geography Quest',
      description: 'Explore African countries, capitals, and landmarks',
      icon: Map,
      color: 'from-blue-500 to-cyan-500',
      questions: geographyQuestions
    },
    {
      id: 'culture',
      title: 'Cultural Heritage Explorer',
      description: 'Learn about African traditions and customs',
      icon: Globe,
      color: 'from-purple-500 to-pink-500',
      questions: cultureQuestions
    },
    {
      id: 'wildlife',
      title: 'Wildlife Discovery',
      description: 'Meet amazing African animals',
      icon: Trophy,
      color: 'from-green-500 to-emerald-500',
      questions: wildlifeQuestions
    }
  ];

  const startGame = (gameId: string) => {
    setActiveGame(gameId);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameProgress({
      gameId,
      score: 0,
      questionsAnswered: 0,
      correctAnswers: 0
    });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) {
      toast.error('Please select an answer!');
      return;
    }

    const game = games.find(g => g.id === activeGame);
    if (!game) return;

    const question = game.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;

    setShowResult(true);
    setGameProgress(prev => ({
      ...prev,
      questionsAnswered: prev.questionsAnswered + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      score: prev.score + (isCorrect ? 10 : 0)
    }));

    if (isCorrect) {
      toast.success('Correct! Well done! 🎉');
    } else {
      toast.error('Not quite right. Try again next time!');
    }
  };

  const nextQuestion = () => {
    const game = games.find(g => g.id === activeGame);
    if (!game) return;

    if (currentQuestion < game.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Game completed
      toast.success(`Game completed! You scored ${gameProgress.score + (selectedAnswer === game.questions[currentQuestion].correctAnswer ? 10 : 0)} points!`);
      setActiveGame(null);
    }
  };

  const exitGame = () => {
    setActiveGame(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (activeGame) {
    const game = games.find(g => g.id === activeGame);
    if (!game) return null;

    const question = game.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / game.questions.length) * 100;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${game.color} rounded-xl flex items-center justify-center`}>
                    <game.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>{game.title}</CardTitle>
                    <CardDescription>Question {currentQuestion + 1} of {game.questions.length}</CardDescription>
                  </div>
                </div>
                <Button variant="outline" onClick={exitGame}>Exit Game</Button>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Score: {gameProgress.score} points</span>
                <span>Correct: {gameProgress.correctAnswers}/{gameProgress.questionsAnswered}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-4">{question.question}</h3>
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === index
                          ? showResult
                            ? index === question.correctAnswer
                              ? 'border-green-500 bg-green-50 dark:bg-green-950'
                              : 'border-red-500 bg-red-50 dark:bg-red-950'
                            : 'border-primary bg-primary/5'
                          : showResult && index === question.correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-950'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {showResult && index === question.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                        {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {showResult && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-2">
                    <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Did you know?</h4>
                      <p className="text-sm text-blue-800 dark:text-blue-200">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                {!showResult ? (
                  <Button onClick={submitAnswer} size="lg" disabled={selectedAnswer === null}>
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={nextQuestion} size="lg">
                    {currentQuestion < game.questions.length - 1 ? 'Next Question' : 'Finish Game'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Interactive Learning Games</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about African culture, geography, and wildlife through fun educational games!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <Card key={game.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => startGame(game.id)}>
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${game.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{game.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{game.questions.length} Questions</Badge>
                    <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Learning Benefits</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">Educational Content</h4>
                <p className="text-sm text-muted-foreground">Learn real facts about African culture and geography</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">Earn Rewards</h4>
                <p className="text-sm text-muted-foreground">Get points and achievements for completing games</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gamepad2 className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Fun Learning</h4>
                <p className="text-sm text-muted-foreground">Interactive quizzes make learning enjoyable</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
