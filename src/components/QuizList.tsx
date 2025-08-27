import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useAuth, Quiz } from '../contexts/AuthContext';
import { Search, ArrowLeft, Play, Calendar, User, Sparkles, Trophy, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface QuizListProps {
  onBack: () => void;
  onTakeQuiz: (quiz: Quiz) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8, 
    x: 100,
    rotateY: -20,
    filter: 'blur(8px)'
  },
  visible: (index: number) => ({ 
    opacity: 1, 
    scale: 1, 
    x: 0,
    rotateY: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay: index * 0.1,
      ease: [0.25, 0.1, 0.25, 1],
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  })
};

const scrollButtonVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3 }
  },
  hover: { 
    scale: 1.1,
    rotateZ: 5,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

export function QuizList({ onBack, onTakeQuiz }: QuizListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { quizzes } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollButtons);
      return () => scrollElement.removeEventListener('scroll', checkScrollButtons);
    }
  }, [filteredQuizzes]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Width of card + gap
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 perspective-1000"
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-6">
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="glass border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </motion.div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 blur-2xl opacity-20">
              <div className="w-full h-16 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-full" />
            </div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Available Quizzes
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Scroll through amazing quizzes and choose your challenge
            </motion.p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <BookOpen className="h-8 w-8 text-indigo-400 glow" />
        </motion.div>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemVariants}>
        <Card className="card-3d overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
          <CardContent className="pt-6 relative z-10">
            <div className="relative">
              <motion.div
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Search className="text-indigo-400 h-5 w-5 glow" />
              </motion.div>
              <Input
                placeholder="Search for amazing quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 glass border-indigo-500/30 focus:border-indigo-400/50 transition-all duration-300 text-foreground placeholder:text-muted-foreground/70"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quiz Carousel */}
      <AnimatePresence mode="wait">
        {filteredQuizzes.length === 0 ? (
          <motion.div
            key="empty"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Card className="card-3d overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent" />
              <CardContent className="pt-12 pb-12 text-center relative z-10">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mb-6"
                >
                  <Trophy className="h-16 w-16 text-indigo-400 mx-auto glow" />
                </motion.div>
                <p className="text-muted-foreground text-lg mb-2">
                  {searchTerm ? 'No quizzes found matching your search.' : 'No quizzes available yet.'}
                </p>
                {!searchTerm && (
                  <motion.p 
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Be the first to create an amazing quiz! ✨
                  </motion.p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="carousel"
            variants={itemVariants}
            className="relative"
          >
            {/* Scroll Buttons */}
            <div className="flex justify-between items-center mb-6">
              <motion.div
                variants={scrollButtonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className={`glass border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 ${
                    !canScrollLeft ? 'opacity-30' : ''
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
              </motion.div>
              
              <motion.div
                className="flex items-center space-x-2 px-4 py-2 glass rounded-full border border-indigo-500/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Sparkles className="h-4 w-4 text-yellow-400 glow" />
                <span className="text-sm text-muted-foreground">
                  {filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'es' : ''} available
                </span>
                <Trophy className="h-4 w-4 text-indigo-400 glow" />
              </motion.div>

              <motion.div
                variants={scrollButtonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className={`glass border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 ${
                    !canScrollRight ? 'opacity-30' : ''
                  }`}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </motion.div>
            </div>

            {/* Horizontal Scrolling Cards Container */}
            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitScrollbar: { display: 'none' }
              }}
            >
              {filteredQuizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  variants={cardVariants}
                  custom={index}
                  whileHover={{ 
                    y: -12,
                    rotateX: 5,
                    rotateY: 3,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-shrink-0 w-80"
                  style={{ minWidth: '320px' }}
                >
                  <Card className="h-full flex flex-col card-3d overflow-hidden group cursor-pointer relative">
                    {/* Animated Background Gradient */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/15 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        background: [
                          'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(236, 72, 153, 0.1) 100%)',
                          'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(99, 102, 241, 0.15) 50%, rgba(139, 92, 246, 0.1) 100%)',
                          'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.15) 50%, rgba(99, 102, 241, 0.1) 100%)',
                          'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(236, 72, 153, 0.1) 100%)'
                        ]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                    
                    {/* Floating particles effect */}
                    <motion.div
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                    >
                      <Sparkles className="h-5 w-5 text-yellow-400 glow" />
                    </motion.div>

                    {/* Corner accent */}
                    <motion.div
                      className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity
                      }}
                    />

                    <CardHeader className="pb-4 relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <CardTitle className="line-clamp-2 text-foreground text-xl mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                              {quiz.title}
                            </CardTitle>
                          </motion.div>
                          {quiz.description && (
                            <motion.div
                              initial={{ opacity: 0.8 }}
                              whileHover={{ opacity: 1 }}
                            >
                              <CardDescription className="line-clamp-2 text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300">
                                {quiz.description}
                              </CardDescription>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col justify-between relative z-10">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge 
                              variant="secondary" 
                              className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30 transition-colors group-hover:glow"
                            >
                              <BookOpen className="h-3 w-3 mr-1" />
                              {quiz.questions.length} questions
                            </Badge>
                          </motion.div>
                          <motion.div 
                            className="text-sm text-muted-foreground flex items-center"
                            whileHover={{ scale: 1.05, x: -3 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Calendar className="h-3 w-3 mr-1 text-purple-400" />
                            {new Date(quiz.createdAt).toLocaleDateString()}
                          </motion.div>
                        </div>
                        
                        <motion.div 
                          className="flex items-center text-sm text-muted-foreground"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <User className="h-4 w-4 mr-2 text-pink-400" />
                          <span>Quiz Master</span>
                        </motion.div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6"
                      >
                        <Button 
                          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 glow transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-indigo-500/25" 
                          onClick={() => onTakeQuiz(quiz)}
                        >
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Play className="h-4 w-4 mr-2" />
                          </motion.div>
                          Take Quiz
                          <motion.div
                            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            animate={{ 
                              x: [0, 3, 0],
                              rotate: [0, 15, -15, 0]
                            }}
                            transition={{ 
                              x: { duration: 1.5, repeat: Infinity },
                              rotate: { duration: 2, repeat: Infinity }
                            }}
                          >
                            <Sparkles className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </motion.div>
                    </CardContent>

                    {/* Bottom glow effect */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        width: ['75%', '100%', '75%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="flex justify-center mt-4 space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {Array.from({ length: Math.ceil(filteredQuizzes.length / 3) }).map((_, index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 rounded-full bg-indigo-500/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.2,
                    repeat: Infinity
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Stats */}
      {filteredQuizzes.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="card-3d overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5"
              animate={{
                background: [
                  'linear-gradient(90deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(139, 92, 246, 0.05) 100%)',
                  'linear-gradient(90deg, rgba(139, 92, 246, 0.05) 0%, rgba(34, 197, 94, 0.05) 50%, rgba(59, 130, 246, 0.05) 100%)',
                  'linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(34, 197, 94, 0.05) 100%)',
                  'linear-gradient(90deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(139, 92, 246, 0.05) 100%)'
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            <CardContent className="pt-6 pb-6 relative z-10">
              <div className="text-center">
                <motion.div
                  className="flex items-center justify-center space-x-2 mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity 
                    }}
                  >
                    <Trophy className="h-5 w-5 text-yellow-400 glow" />
                  </motion.div>
                  <p className="text-muted-foreground text-lg">
                    {filteredQuizzes.length === 1 
                      ? '1 amazing quiz ready to challenge you' 
                      : `${filteredQuizzes.length} amazing quizzes ready to challenge you`
                    }
                    {searchTerm && ' matching your search'}
                  </p>
                  <motion.div
                    animate={{ 
                      rotate: [0, -15, 15, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity 
                    }}
                  >
                    <Sparkles className="h-5 w-5 text-pink-400 glow" />
                  </motion.div>
                </motion.div>
                <motion.p
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Scroll horizontally to explore all quizzes • Test your knowledge • Challenge yourself! 🚀
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}