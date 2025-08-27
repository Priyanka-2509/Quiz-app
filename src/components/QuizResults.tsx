import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { QuizResult } from './QuizTaker';
import { Trophy, Clock, CheckCircle, XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

interface QuizResultsProps {
  result: QuizResult;
  onBack: () => void;
  onRetake: () => void;
}

export function QuizResults({ result, onBack, onRetake }: QuizResultsProps) {
  const { quiz, answers, score, totalQuestions, timeTaken } = result;
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excellent! Outstanding performance!';
    if (percentage >= 80) return 'Great job! You did very well!';
    if (percentage >= 70) return 'Good work! Keep it up!';
    if (percentage >= 60) return 'Not bad! Room for improvement.';
    return 'Keep practicing! You\'ll do better next time.';
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <Trophy className={`h-16 w-16 mx-auto ${getScoreColor(percentage)}`} />
        </motion.div>
        <h1 className="text-3xl font-bold">Quiz Completed!</h1>
        <p className="text-muted-foreground">{getScoreMessage(percentage)}</p>
      </div>

      {/* Score Card */}
      <Card className="border-2">
        <CardHeader className="text-center pb-3">
          <CardTitle className="text-2xl">Your Score</CardTitle>
          <CardDescription>{quiz.title}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-6xl font-bold ${getScoreColor(percentage)}`}>
              {percentage}%
            </div>
            <p className="text-muted-foreground mt-2">
              {score} out of {totalQuestions} correct
            </p>
          </div>

          <Progress value={percentage} className="h-3" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-1" />
                <span className="font-medium">Correct</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{score}</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center text-red-600">
                <XCircle className="h-5 w-5 mr-1" />
                <span className="font-medium">Incorrect</span>
              </div>
              <div className="text-2xl font-bold text-red-600">{totalQuestions - score}</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center text-blue-600">
                <Clock className="h-5 w-5 mr-1" />
                <span className="font-medium">Time</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {timeTaken ? formatTime(timeTaken) : '--:--'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Results</CardTitle>
          <CardDescription>Review your answers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quiz.questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`p-4 border rounded-lg ${
                    isCorrect ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950' 
                              : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-medium">
                        Question {index + 1}: {question.question}
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-2">
                        {question.options.map((option, optionIndex) => {
                          const isUserChoice = userAnswer === optionIndex;
                          const isCorrectAnswer = question.correctAnswer === optionIndex;
                          
                          return (
                            <div
                              key={optionIndex}
                              className={`p-2 rounded text-sm flex items-center space-x-2 ${
                                isCorrectAnswer
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : isUserChoice
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                  : 'bg-muted'
                              }`}
                            >
                              <Badge
                                variant={isCorrectAnswer ? "default" : isUserChoice ? "destructive" : "secondary"}
                                className="w-6 h-6 p-0 flex items-center justify-center text-xs"
                              >
                                {String.fromCharCode(65 + optionIndex)}
                              </Badge>
                              <span>{option}</span>
                              {isCorrectAnswer && <CheckCircle className="h-4 w-4 ml-auto" />}
                              {isUserChoice && !isCorrectAnswer && <XCircle className="h-4 w-4 ml-auto" />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quizzes
        </Button>
        <Button onClick={onRetake}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Retake Quiz
        </Button>
      </div>
    </motion.div>
  );
}