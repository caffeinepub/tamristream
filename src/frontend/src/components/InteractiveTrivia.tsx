import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Trophy, Clock, Star, Play, RotateCcw, Users, Zap, Target, Award } from 'lucide-react';
import { toast } from 'sonner';

interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  explanation?: string;
  timeLimit: number;
}

interface GameState {
  currentQuestion: number;
  score: number;
  timeLeft: number;
  isActive: boolean;
  isComplete: boolean;
  answers: number[];
  streak: number;
  multiplier: number;
}

interface Participant {
  id: string;
  username: string;
  score: number;
  currentAnswer?: number;
  isReady: boolean;
}

// Enhanced trivia questions with explanations and varied time limits
const triviaQuestions: TriviaQuestion[] = [
  {
    id: '1',
    question: 'Which country is known as the home of Nollywood?',
    options: ['Ghana', 'Nigeria', 'Kenya', 'South Africa'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Industry',
    explanation: 'Nigeria is home to Nollywood, the world\'s second-largest film industry by volume.',
    timeLimit: 15
  },
  {
    id: '2',
    question: 'What does "Nollywood" refer to?',
    options: ['A movie theater chain', 'Nigerian film industry', 'A film festival', 'A streaming platform'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Industry',
    explanation: 'Nollywood is the colloquial name for the Nigerian film industry, coined in the 1990s.',
    timeLimit: 15
  },
  {
    id: '3',
    question: 'Which African country hosted the first Pan African Film Festival?',
    options: ['Senegal', 'Morocco', 'Egypt', 'Burkina Faso'],
    correctAnswer: 3,
    difficulty: 'medium',
    category: 'History',
    explanation: 'FESPACO (Festival Panafricain du Cinéma et de la Télévision de Ouagadougou) was first held in Burkina Faso in 1969.',
    timeLimit: 20
  },
  {
    id: '4',
    question: 'The FESPACO film festival is held in which African country?',
    options: ['Mali', 'Burkina Faso', 'Niger', 'Ghana'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Festivals',
    explanation: 'FESPACO is held biennially in Ouagadougou, the capital of Burkina Faso.',
    timeLimit: 20
  },
  {
    id: '5',
    question: 'Which language is most commonly used in Nollywood films?',
    options: ['Yoruba', 'Igbo', 'English', 'Hausa'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'Language',
    explanation: 'English is the most common language in Nollywood films, though local languages are also widely used.',
    timeLimit: 15
  },
  {
    id: '6',
    question: 'Which African filmmaker directed "Yeelen" (1987)?',
    options: ['Ousmane Sembène', 'Souleymane Cissé', 'Haile Gerima', 'Djibril Diop Mambéty'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'Directors',
    explanation: 'Souleymane Cissé from Mali directed "Yeelen" (Brightness), which won the Jury Prize at Cannes in 1987.',
    timeLimit: 25
  },
  {
    id: '7',
    question: 'The term "Kumawood" refers to films from which country?',
    options: ['Nigeria', 'Ghana', 'Kenya', 'Tanzania'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Industry',
    explanation: 'Kumawood refers to the Ghanaian film industry, particularly films produced in the Akan language.',
    timeLimit: 20
  },
  {
    id: '8',
    question: 'Which film is considered the first major Nollywood success?',
    options: ['Living in Bondage', 'Glamour Girls', 'Rattlesnake', 'Checkmate'],
    correctAnswer: 0,
    difficulty: 'hard',
    category: 'History',
    explanation: '"Living in Bondage" (1992) is widely considered the film that launched modern Nollywood.',
    timeLimit: 25
  }
];

// Sample participants for multiplayer mode
const sampleParticipants: Participant[] = [
  { id: '1', username: 'TriviaKing', score: 0, isReady: true },
  { id: '2', username: 'MovieBuff', score: 0, isReady: true },
  { id: '3', username: 'CinemaExpert', score: 0, isReady: false },
  { id: '4', username: 'FilmFanatic', score: 0, isReady: true }
];

interface InteractiveTriviaProps {
  isMultiplayer?: boolean;
  onGameComplete?: (score: number, totalQuestions: number) => void;
}

export function InteractiveTrivia({ isMultiplayer = false, onGameComplete }: InteractiveTriviaProps) {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    timeLeft: 30,
    isActive: false,
    isComplete: false,
    answers: [],
    streak: 0,
    multiplier: 1
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>(sampleParticipants);
  const [currentUser] = useState({ id: 'user1', username: 'You' });

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
      timeLeft: triviaQuestions[0].timeLimit,
      isActive: true,
      isComplete: false,
      answers: [],
      streak: 0,
      multiplier: 1
    });
    setSelectedAnswer(null);
    setShowResult(false);
    setShowExplanation(false);
    
    // Reset participants scores in multiplayer
    if (isMultiplayer) {
      setParticipants(prev => prev.map(p => ({ ...p, score: 0, currentAnswer: undefined })));
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!gameState.isActive || showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newAnswers = [...gameState.answers, selectedAnswer];
    
    // Calculate score with streak multiplier and time bonus
    let points = 0;
    if (isCorrect) {
      const basePoints = getPointsForDifficulty(currentQuestion.difficulty);
      const timeBonus = Math.floor((gameState.timeLeft / currentQuestion.timeLimit) * 10);
      const streakMultiplier = Math.min(gameState.streak + 1, 3);
      points = (basePoints + timeBonus) * streakMultiplier;
    }

    const newStreak = isCorrect ? gameState.streak + 1 : 0;
    
    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
      answers: newAnswers,
      streak: newStreak,
      multiplier: Math.min(newStreak + 1, 3)
    }));

    setShowResult(true);

    if (isCorrect) {
      toast.success(`Correct! +${points} points (${newStreak > 0 ? `${newStreak}x streak!` : ''})`);
    } else {
      toast.error(`Incorrect. The answer was: ${currentQuestion.options[currentQuestion.correctAnswer]}`);
    }

    // Show explanation after a delay
    setTimeout(() => {
      setShowExplanation(true);
    }, 1500);

    // Auto-advance after showing explanation
    setTimeout(() => {
      nextQuestion();
    }, 4000);
  };

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer(-1); // Mark as no answer
    }
    setShowResult(true);
    toast.error('Time\'s up!');
    
    // Reset streak on timeout
    setGameState(prev => ({ ...prev, streak: 0, multiplier: 1 }));
    
    setTimeout(() => {
      setShowExplanation(true);
    }, 1000);

    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const nextQuestion = () => {
    if (gameState.currentQuestion + 1 >= totalQuestions) {
      // Game complete
      setGameState(prev => ({
        ...prev,
        isActive: false,
        isComplete: true
      }));
      
      if (onGameComplete) {
        onGameComplete(gameState.score, totalQuestions);
      }
    } else {
      // Next question
      const nextQ = triviaQuestions[gameState.currentQuestion + 1];
      setGameState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        timeLeft: nextQ.timeLimit
      }));
      setSelectedAnswer(null);
      setShowResult(false);
      setShowExplanation(false);
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
    if (percentage >= 90) return { rating: 'Legendary!', icon: '🏆', color: 'text-yellow-500' };
    if (percentage >= 80) return { rating: 'Excellent!', icon: '⭐', color: 'text-blue-500' };
    if (percentage >= 70) return { rating: 'Great!', icon: '👍', color: 'text-green-500' };
    if (percentage >= 50) return { rating: 'Good!', icon: '👌', color: 'text-orange-500' };
    return { rating: 'Keep trying!', icon: '💪', color: 'text-gray-500' };
  };

  const formatTime = (seconds: number) => {
    return `${seconds}s`;
  };

  if (!gameState.isActive && !gameState.isComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <Trophy className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Interactive Trivia Challenge</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Test your knowledge of African cinema with enhanced interactive features, streak multipliers, and real-time competition!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <img src="/assets/generated/interactive-badges-collection.png" alt="Interactive Features" className="w-6 h-6" />
                  <span>New Interactive Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="text-sm">Streak multipliers up to 3x</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-accent" />
                  <span className="text-sm">Time bonus points</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-accent" />
                  <span className="text-sm">Detailed explanations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-accent" />
                  <span className="text-sm">Multiplayer competition</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Enhanced Scoring System</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <Badge className="bg-green-500">Easy</Badge>
                  <span className="text-sm">10 + time bonus</span>
                </div>
                <div className="flex justify-between items-center">
                  <Badge className="bg-yellow-500">Medium</Badge>
                  <span className="text-sm">20 + time bonus</span>
                </div>
                <div className="flex justify-between items-center">
                  <Badge className="bg-red-500">Hard</Badge>
                  <span className="text-sm">30 + time bonus</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Streak Multiplier</span>
                    <span className="text-sm">Up to 3x</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {isMultiplayer && (
            <Card className="border-0 bg-card/50 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Players Ready</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {participant.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{participant.username}</div>
                        <Badge variant={participant.isReady ? "default" : "secondary"} className="text-xs">
                          {participant.isReady ? "Ready" : "Waiting"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="text-center">
            <Button onClick={startGame} size="lg" className="px-8">
              <Play className="w-5 h-5 mr-2" />
              {isMultiplayer ? 'Start Multiplayer Game' : 'Start Interactive Trivia'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState.isComplete) {
    const maxScore = triviaQuestions.reduce((sum, q) => sum + (getPointsForDifficulty(q.difficulty) + 10) * 3, 0); // Max possible with full streaks
    const { rating, icon, color } = getScoreRating(gameState.score, maxScore);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="text-6xl mb-4">{icon}</div>
          <h2 className="text-3xl font-bold text-foreground">Game Complete!</h2>
          <p className={`text-xl ${color}`}>{rating}</p>
          
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{gameState.score}</div>
                  <div className="text-sm text-muted-foreground">Total Points Earned</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {gameState.answers.filter((answer, index) => answer === triviaQuestions[index].correctAnswer).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Correct Answers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{Math.max(...gameState.answers.map((_, index) => {
                      let streak = 0;
                      for (let i = 0; i <= index; i++) {
                        if (gameState.answers[i] === triviaQuestions[i].correctAnswer) {
                          streak++;
                        } else {
                          streak = 0;
                        }
                      }
                      return streak;
                    }))}</div>
                    <div className="text-sm text-muted-foreground">Best Streak</div>
                  </div>
                </div>

                {isMultiplayer && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">Final Leaderboard</h4>
                    <div className="space-y-2">
                      {[...participants, { ...currentUser, score: gameState.score }]
                        .sort((a, b) => b.score - a.score)
                        .map((participant, index) => (
                          <div key={participant.id} className="flex items-center justify-between p-2 rounded bg-muted/50">
                            <div className="flex items-center space-x-2">
                              <Badge variant={index === 0 ? "default" : "secondary"}>
                                #{index + 1}
                              </Badge>
                              <span className={`font-medium ${participant.username === 'You' ? 'text-primary' : ''}`}>
                                {participant.username}
                              </span>
                            </div>
                            <span className="font-bold">{participant.score}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
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
      <div className="max-w-4xl mx-auto">
        {/* Game Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                {currentQuestion.difficulty.toUpperCase()}
              </Badge>
              <span className="text-sm text-muted-foreground">{currentQuestion.category}</span>
              {gameState.streak > 0 && (
                <Badge className="bg-orange-500 animate-pulse">
                  <Zap className="w-3 h-3 mr-1" />
                  {gameState.streak}x Streak!
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className={`text-lg font-bold ${gameState.timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-foreground'}`}>
                  {formatTime(gameState.timeLeft)}
                </span>
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

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Card */}
          <div className="lg:col-span-3">
            <Card className="border-0 bg-card/50 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
                {gameState.multiplier > 1 && (
                  <CardDescription className="text-orange-600 font-medium">
                    <Zap className="w-4 h-4 inline mr-1" />
                    {gameState.multiplier}x multiplier active!
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === index ? 'default' : 'outline'}
                      className={`justify-start text-left h-auto p-4 transition-all ${
                        showResult
                          ? index === currentQuestion.correctAnswer
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : selectedAnswer === index && index !== currentQuestion.correctAnswer
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : ''
                          : selectedAnswer === index
                          ? 'ring-2 ring-primary'
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

            {/* Explanation Card */}
            {showExplanation && currentQuestion.explanation && (
              <Card className="border-0 bg-blue-50 dark:bg-blue-950/20 backdrop-blur-sm mb-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Award className="w-5 h-5 text-blue-500" />
                    <span>Explanation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{currentQuestion.explanation}</p>
                </CardContent>
              </Card>
            )}

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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Score Breakdown */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Base Points</span>
                  <span className="font-semibold">{getPointsForDifficulty(currentQuestion.difficulty)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Time Bonus</span>
                  <span className="font-semibold">+{Math.floor((gameState.timeLeft / currentQuestion.timeLimit) * 10)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Multiplier</span>
                  <span className="font-semibold">{gameState.multiplier}x</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Potential Points</span>
                  <span className="text-primary">
                    {(getPointsForDifficulty(currentQuestion.difficulty) + Math.floor((gameState.timeLeft / currentQuestion.timeLimit) * 10)) * gameState.multiplier}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Multiplayer Leaderboard */}
            {isMultiplayer && (
              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Live Leaderboard</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[...participants, { ...currentUser, score: gameState.score }]
                    .sort((a, b) => b.score - a.score)
                    .map((participant, index) => (
                      <div key={participant.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant={index === 0 ? "default" : "secondary"} className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                            {index + 1}
                          </Badge>
                          <span className={`text-sm ${participant.username === 'You' ? 'font-bold text-primary' : ''}`}>
                            {participant.username}
                          </span>
                        </div>
                        <span className="font-semibold">{participant.score}</span>
                      </div>
                    ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
