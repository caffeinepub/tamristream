import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Star, Play, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

interface GameState {
  currentQuestion: number;
  score: number;
  timeLeft: number;
  isActive: boolean;
  isComplete: boolean;
  answers: number[];
}

// Sample trivia questions about African cinema
const triviaQuestions: TriviaQuestion[] = [
  {
    id: '1',
    question: 'Which country is known as the home of Nollywood?',
    options: ['Ghana', 'Nigeria', 'Kenya', 'South Africa'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Industry'
  },
  {
    id: '2',
    question: 'What does "Nollywood" refer to?',
    options: ['A movie theater chain', 'Nigerian film industry', 'A film festival', 'A streaming platform'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Industry'
  },
  {
    id: '3',
    question: 'Which African country hosted the first Pan African Film Festival?',
    options: ['Senegal', 'Morocco', 'Egypt', 'Burkina Faso'],
    correctAnswer: 3,
    difficulty: 'medium',
    category: 'History'
  },
  {
    id: '4',
    question: 'The FESPACO film festival is held in which African country?',
    options: ['Mali', 'Burkina Faso', 'Niger', 'Ghana'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Festivals'
  },
  {
    id: '5',
    question: 'Which language is most commonly used in Nollywood films?',
    options: ['Yoruba', 'Igbo', 'English', 'Hausa'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'Language'
  },
  {
    id: '6',
    question: 'What is the name of South Africa\'s film industry?',
    options: ['Sollywood', 'Hillywood', 'Mollywood', 'No specific name'],
    correctAnswer: 3,
    difficulty: 'hard',
    category: 'Industry'
  },
  {
    id: '7',
    question: 'Which African filmmaker is known for "Yeelen" (1987)?',
    options: ['Ousmane Sembène', 'Souleymane Cissé', 'Haile Gerima', 'Djibril Diop Mambéty'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'Directors'
  },
  {
    id: '8',
    question: 'The term "Kumawood" refers to films from which country?',
    options: ['Nigeria', 'Ghana', 'Kenya', 'Tanzania'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Industry'
  }
];

export function TriviaGame() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    timeLeft: 30,
    isActive: false,
    isComplete: false,
    answers: []
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = triviaQuestions[gameState.currentQuestion];
  const totalQuestions = triviaQuestions.length;
  const progress = ((gameState.currentQuestion + 1) / totalQuestions) * 100;

  // Timer effect
  useEffect(() => {
    if (gameState.isActive && gameState.timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState.timeLeft === 0 && gameState.isActive) {
      handleTimeUp();
    }
  }, [gameState.isActive, gameState.timeLeft, showResult]);

  const startGame = () => {
    setGameState({
      currentQuestion: 0,
      score: 0,
      timeLeft: 30,
      isActive: true,
      isComplete: false,
      answers: []
    });
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!gameState.isActive || showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newAnswers = [...gameState.answers, selectedAnswer];
    
    setGameState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + getPointsForDifficulty(currentQuestion.difficulty) : prev.score,
      answers: newAnswers
    }));

    setShowResult(true);

    if (isCorrect) {
      toast.success('Correct! Well done!');
    } else {
      toast.error(`Incorrect. The answer was: ${currentQuestion.options[currentQuestion.correctAnswer]}`);
    }

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer(-1); // Mark as no answer
    }
    setShowResult(true);
    toast.error('Time\'s up!');
    
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    if (gameState.currentQuestion + 1 >= totalQuestions) {
      // Game complete
      setGameState(prev => ({
        ...prev,
        isActive: false,
        isComplete: true
      }));
    } else {
      // Next question
      setGameState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        timeLeft: 30
      }));
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const getPointsForDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 10;
      case 'medium': return 20;
      case 'hard': return 30;
      default: return 10;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreRating = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return { rating: 'Excellent!', icon: '🏆' };
    if (percentage >= 70) return { rating: 'Great!', icon: '⭐' };
    if (percentage >= 50) return { rating: 'Good!', icon: '👍' };
    return { rating: 'Keep trying!', icon: '💪' };
  };

  if (!gameState.isActive && !gameState.isComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <Trophy className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Movie Trivia Challenge</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Test your knowledge of African cinema! Answer questions about Nollywood, directors, festivals, and more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <img src="/assets/generated/trivia-trophy-icon.png" alt="Trophy" className="w-6 h-6" />
                  <span>How It Works</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-sm">30 seconds per question</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-accent" />
                  <span className="text-sm">Points based on difficulty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-accent" />
                  <span className="text-sm">Earn badges for high scores</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Scoring System</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <Badge className="bg-green-500">Easy</Badge>
                  <span className="text-sm">10 points</span>
                </div>
                <div className="flex justify-between items-center">
                  <Badge className="bg-yellow-500">Medium</Badge>
                  <span className="text-sm">20 points</span>
                </div>
                <div className="flex justify-between items-center">
                  <Badge className="bg-red-500">Hard</Badge>
                  <span className="text-sm">30 points</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button onClick={startGame} size="lg" className="px-8">
              <Play className="w-5 h-5 mr-2" />
              Start Trivia Game
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState.isComplete) {
    const maxScore = triviaQuestions.reduce((sum, q) => sum + getPointsForDifficulty(q.difficulty), 0);
    const { rating, icon } = getScoreRating(gameState.score, maxScore);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="text-6xl mb-4">{icon}</div>
          <h2 className="text-3xl font-bold text-foreground">Game Complete!</h2>
          <p className="text-xl text-muted-foreground">{rating}</p>
          
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{gameState.score}</div>
                  <div className="text-sm text-muted-foreground">out of {maxScore} points</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {gameState.answers.filter((answer, index) => answer === triviaQuestions[index].correctAnswer).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{totalQuestions}</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center space-x-4">
            <Button onClick={startGame} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Game Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                {currentQuestion.difficulty.toUpperCase()}
              </Badge>
              <span className="text-sm text-muted-foreground">{currentQuestion.category}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-lg font-bold text-foreground">{gameState.timeLeft}s</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-lg font-bold text-foreground">{gameState.score}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {gameState.currentQuestion + 1} of {totalQuestions}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="border-0 bg-card/50 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? 'default' : 'outline'}
                  className={`justify-start text-left h-auto p-4 ${
                    showResult
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : selectedAnswer === index && index !== currentQuestion.correctAnswer
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : ''
                      : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        {!showResult && (
          <div className="text-center">
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              size="lg"
              className="px-8"
            >
              Submit Answer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
