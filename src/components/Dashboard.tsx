import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Trophy, Plus, BookOpen, Sparkles, TrendingUp, Users } from 'lucide-react';

interface DashboardProps {
  onCreateQuiz: () => void;
  onTakeQuiz: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -20, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export function Dashboard({ onCreateQuiz, onTakeQuiz }: DashboardProps) {
  const { user, getUserQuizzes, quizzes } = useAuth();
  const userQuizzes = getUserQuizzes();
  const totalQuizzes = quizzes.length;

  if (!user) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 perspective-1000"
    >
      {/* Welcome Section */}
      <motion.div 
        variants={itemVariants}
        className="text-center space-y-4 relative"
      >
        <div className="absolute inset-0 -z-10 blur-3xl opacity-20">
          <div className="w-full h-32 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-full" />
        </div>
        <motion.h1 
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        >
          Welcome back, {user.name}!
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Ready to create or take some amazing quizzes?
        </motion.p>
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="h-8 w-8 text-yellow-400 mx-auto glow" />
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.div
          whileHover={{ 
            scale: 1.05, 
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          className="interactive-3d"
        >
          <Card 
            className="cursor-pointer cosmic-glass overflow-hidden group relative border-indigo-500/20 hover:border-indigo-400/40"
            onClick={onCreateQuiz}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-purple-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="pb-6 relative z-10">
              <div className="flex items-center space-x-3 mb-2">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 glow-purple float-slow"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ duration: 0.4 }}
                >
                  <Plus className="h-6 w-6 text-white" />
                </motion.div>
                <CardTitle className="text-2xl shimmer">Create Quiz</CardTitle>
              </div>
              <CardDescription className="text-base">
                Build a new quiz with custom questions and share it with the cosmic community
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ 
            scale: 1.05, 
            rotateY: -5,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          className="interactive-3d"
        >
          <Card 
            className="cursor-pointer cosmic-glass overflow-hidden group relative border-purple-500/20 hover:border-purple-400/40"
            onClick={onTakeQuiz}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-pink-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="pb-6 relative z-10">
              <div className="flex items-center space-x-3 mb-2">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 glow-pink float-slow"
                  whileHover={{ scale: 1.15, rotate: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <BookOpen className="h-6 w-6 text-white" />
                </motion.div>
                <CardTitle className="text-2xl shimmer">Take Quiz</CardTitle>
              </div>
              <CardDescription className="text-base">
                Browse and take quizzes from the galaxy to test your cosmic knowledge
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div
          whileHover={{ y: -12, rotateX: 8 }}
          transition={{ duration: 0.3 }}
          className="interactive-3d"
        >
          <Card className="cosmic-glass overflow-hidden relative border-yellow-500/20 hover:border-yellow-400/40">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/15 to-orange-500/8" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground">Your Quizzes</CardTitle>
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="pulse-glow"
              >
                <Trophy className="h-5 w-5 text-yellow-500 glow" />
              </motion.div>
            </CardHeader>
            <CardContent className="relative z-10">
              <motion.div 
                className="text-3xl font-bold text-foreground"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                {userQuizzes.length}
              </motion.div>
              <p className="text-sm text-muted-foreground mt-1">
                Total quizzes created
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ y: -12, rotateX: 8 }}
          transition={{ duration: 0.3 }}
          className="interactive-3d"
        >
          <Card className="cosmic-glass overflow-hidden relative border-blue-500/20 hover:border-blue-400/40">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-indigo-500/8" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Questions</CardTitle>
              <motion.div
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="glow"
              >
                <BookOpen className="h-5 w-5 text-blue-500" />
              </motion.div>
            </CardHeader>
            <CardContent className="relative z-10">
              <motion.div 
                className="text-3xl font-bold text-foreground"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
              >
                {userQuizzes.reduce((total, quiz) => total + quiz.questions.length, 0)}
              </motion.div>
              <p className="text-sm text-muted-foreground mt-1">
                Questions you've created
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ y: -12, rotateX: 8 }}
          transition={{ duration: 0.3 }}
          className="interactive-3d"
        >
          <Card className="cosmic-glass overflow-hidden relative border-purple-500/20 hover:border-purple-400/40">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 to-pink-500/8" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available Quizzes</CardTitle>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="glow-purple"
              >
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </motion.div>
            </CardHeader>
            <CardContent className="relative z-10">
              <motion.div 
                className="text-3xl font-bold text-foreground"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
              >
                {totalQuizzes}
              </motion.div>
              <p className="text-sm text-muted-foreground mt-1">
                Total quizzes to explore
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Your Quizzes */}
      {userQuizzes.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="cosmic-glass overflow-hidden border-indigo-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/8 via-purple-500/8 to-pink-500/8" />
            <CardHeader className="relative z-10">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="float-animation"
                >
                  <Sparkles className="h-6 w-6 text-indigo-400 glow-purple" />
                </motion.div>
                <div>
                  <CardTitle className="text-2xl shimmer">Your Created Quizzes</CardTitle>
                  <CardDescription className="text-base mt-1">
                    Quizzes you've created and shared with the cosmic community
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                {userQuizzes.map((quiz, index) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, x: -40, rotateY: -20 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    whileHover={{ 
                      x: 15,
                      rotateY: 3,
                      transition: { duration: 0.3 }
                    }}
                    className="cosmic-glass rounded-xl p-5 border border-indigo-500/20 hover:border-indigo-400/50 transition-all duration-400 group interactive-3d"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <motion.div
                            className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full glow-purple"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                          />
                          <h3 className="font-semibold text-lg text-foreground shimmer">{quiz.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-3 leading-relaxed">{quiz.description}</p>
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant="secondary" 
                            className="bg-indigo-500/25 text-indigo-300 border-indigo-500/40 glow"
                          >
                            {quiz.questions.length} questions
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Created {new Date(quiz.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                      >
                        <Users className="h-6 w-6 text-indigo-400 glow" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}