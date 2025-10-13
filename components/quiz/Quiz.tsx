"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Award, 
  Users, 
  Calendar,
  Play,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Share2
} from "lucide-react";
import { type Quiz as QuizType } from "@/lib/mock-data/quizzes";
import ShareQuiz from "./ShareQuiz";
import Link from "next/link";

interface QuizProps {
  quiz: QuizType;
}

export default function Quiz({ quiz }: QuizProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'active': return <Play className="h-4 w-4 text-blue-500" />;
      case 'enrolled': return <Clock className="h-4 w-4 text-orange-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleStartQuiz = () => {
    setIsStarted(true);
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  if (isCompleted) {
    const score = calculateScore();
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
              <CardDescription>Congratulations on completing "{quiz.title}"</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{score}%</div>
                <p className="text-muted-foreground">Your Score</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="font-semibold">{Object.keys(selectedAnswers).filter(key => selectedAnswers[parseInt(key)] === quiz.questions[parseInt(key)].correctAnswer).length}</div>
                  <p className="text-sm text-muted-foreground">Correct Answers</p>
                </div>
                <div>
                  <div className="font-semibold">{quiz.questions.length}</div>
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <Link href="/quiz-catalog">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Catalog
                  </Button>
                </Link>
                <Button onClick={() => {
                  setIsStarted(false);
                  setCurrentQuestion(0);
                  setSelectedAnswers({});
                  setIsCompleted(false);
                }}>
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isStarted) {
    const question = quiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">{quiz.title}</h1>
              <Badge variant="outline">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestion, index)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswers[currentQuestion] === index && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                        )}
                      </div>
                      {option}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                >
                  {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/quiz-catalog">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            {getStatusIcon(quiz.status)}
            <Badge variant="outline" className="capitalize">
              {quiz.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">
                {quiz.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className={getDifficultyColor(quiz.difficulty)}>
                {quiz.difficulty}
              </Badge>
              <Badge variant="outline">
                {quiz.category}
              </Badge>
            </div>

            <Separator />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-2 mx-auto">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-semibold">{quiz.duration}</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-2 mx-auto">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-semibold">{quiz.questions.length}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-2 mx-auto">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-semibold">{quiz.attempts || 0}</div>
                <div className="text-sm text-muted-foreground">Attempts</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-2 mx-auto">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-semibold">{quiz.passingScore}%</div>
                <div className="text-sm text-muted-foreground">Pass Score</div>
              </div>
            </div>

            {quiz.status === 'completed' && (
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-lg text-green-800">Quiz Completed</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-700">Your Score: <span className="font-semibold">{quiz.progress}%</span></p>
                      <p className="text-sm text-green-600">Completed on {new Date().toLocaleDateString()}</p>
                    </div>
                    <Badge className="bg-green-600 hover:bg-green-700">Passed</Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quiz.status !== 'completed' && (
                  <Button onClick={handleStartQuiz} className="w-full" size="lg">
                    <Play className="mr-2 h-5 w-5" />
                    {quiz.status === 'active' ? 'Continue Quiz' : 'Start Quiz'}
                  </Button>
                )}
                
                {quiz.status === 'completed' && (
                  <Button onClick={handleStartQuiz} variant="outline" className="w-full" size="lg">
                    <Play className="mr-2 h-5 w-5" />
                    Retake Quiz
                  </Button>
                )}
                
                <ShareQuiz quiz={quiz} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quiz Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Read each question carefully before selecting an answer</p>
                <p>• You can navigate between questions using Previous/Next buttons</p>
                <p>• You need {quiz.passingScore}% to pass this quiz</p>
                <p>• The quiz has a time limit of {quiz.duration}</p>
                <p>• Make sure you have a stable internet connection</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}