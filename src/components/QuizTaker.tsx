import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Quiz, Question } from '../contexts/AuthContext';
import { ArrowLeft, ArrowRight, Clock, CheckCircle } from 'lucide-react';

interface QuizTakerProps {
  quiz: Quiz;
  onBack: () => void;
  onComplete: (results: QuizResult) => void;
}

export interface QuizResult {
  quiz: Quiz;
  answers: number[];
  score: number;
  totalQuestions: number;
  timeTaken?: number;
}

export function QuizTaker({ quiz, onBack, onComplete }: QuizTakerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1));
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
  const [startTime] = useState(Date.now());

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === -1) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate score
      const score = newAnswers.reduce((total, answer, index) => {
        return answer === quiz.questions[index].correctAnswer ? total + 1 : total;
      }, 0);

      const timeTaken = Math.round((Date.now() - startTime) / 1000);

      onComplete({
        quiz,
        answers: newAnswers,
        score,
        totalQuestions: quiz.questions.length,
        timeTaken,
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1] || -1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1] || -1);
    }
  };

  const answeredQuestions = answers.filter(answer => answer !== -1).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Quizzes
          </Button>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">
              {answeredQuestions}/{quiz.questions.length} answered
            </Badge>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {Math.floor((Date.now() - startTime) / 60000)}:
                {String(Math.floor(((Date.now() - startTime) % 60000) / 1000)).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <span className="text-muted-foreground">
              {currentQuestionIndex + 1} / {quiz.questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  {currentQuestion.question}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(index)}
                      className={`
                        p-4 text-left border-2 rounded-lg transition-all duration-200
                        ${selectedAnswer === index
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50 hover:bg-accent/50'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium
                          ${selectedAnswer === index
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-muted-foreground'
                          }
                        `}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                        {selectedAnswer === index && (
                          <CheckCircle className="h-5 w-5 text-primary ml-auto" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2">
            {quiz.questions.map((_, index) => (
              <div
                key={index}
                className={`
                  w-3 h-3 rounded-full transition-colors
                  ${index === currentQuestionIndex
                    ? 'bg-primary'
                    : answers[index] !== -1
                    ? 'bg-green-500'
                    : 'bg-muted'
                  }
                `}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={selectedAnswer === -1}
            className={isLastQuestion ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}