import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider, useAuth, Quiz } from './contexts/AuthContext';
import { HomePage } from './components/HomePage';
import { Dashboard } from './components/Dashboard';
import { Navigation } from './components/Navigation';
import { QuizCreator } from './components/QuizCreator';
import { QuizList } from './components/QuizList';
import { QuizTaker, QuizResult } from './components/QuizTaker';
import { QuizResults } from './components/QuizResults';
import { ParticleBackground } from './components/ParticleBackground';
import { Toaster } from './components/ui/sonner';
import { ViewType } from './types/navigation';


const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 60,
    rotateX: -15,
    rotateY: -5,
    scale: 0.85,
    filter: 'blur(8px)'
  },
  in: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.1
    }
  },
  out: { 
    opacity: 0, 
    y: -40,
    rotateX: 10,
    rotateY: 5,
    scale: 1.15,
    filter: 'blur(4px)',
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.6, 1]
    }
  }
};

const containerVariants = {
  initial: { opacity: 0 },
  in: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  out: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1
    }
  }
};

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const { isAuthenticated } = useAuth();

  // Enable dark mode on app initialization
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    setSelectedQuiz(null);
    setQuizResult(null);
  };

  const handleTakeQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentView('take');
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setCurrentView('results');
  };

  const handleRetakeQuiz = () => {
    if (quizResult) {
      setSelectedQuiz(quizResult.quiz);
      setCurrentView('take');
      setQuizResult(null);
    }
  };

  // Redirect to dashboard if authenticated and on home page
  React.useEffect(() => {
    if (isAuthenticated && currentView === 'home') {
      setCurrentView('dashboard');
    }
  }, [isAuthenticated, currentView]);

  return (
    <div className="min-h-screen perspective-2000 relative">
      <ParticleBackground />
      
      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10"
        >
          <Navigation onNavigate={handleNavigate} currentView={currentView} />
        </motion.div>
      )}
      
      <main className={isAuthenticated ? 'container mx-auto px-4 py-8 relative z-10' : 'relative z-10'}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="preserve-3d"
          >
            <motion.div variants={containerVariants}>
              {currentView === 'home' && <HomePage />}
              
              {currentView === 'dashboard' && isAuthenticated && (
                <Dashboard
                  onCreateQuiz={() => handleNavigate('create')}
                  onTakeQuiz={() => handleNavigate('browse')}
                />
              )}
              
              {currentView === 'create' && isAuthenticated && (
                <QuizCreator onBack={() => handleNavigate('dashboard')} />
              )}
              
              {currentView === 'browse' && isAuthenticated && (
                <QuizList
                  onBack={() => handleNavigate('dashboard')}
                  onTakeQuiz={handleTakeQuiz}
                />
              )}
              
              {currentView === 'take' && selectedQuiz && (
                <QuizTaker
                  quiz={selectedQuiz}
                  onBack={() => handleNavigate('browse')}
                  onComplete={handleQuizComplete}
                />
              )}
              
              {currentView === 'results' && quizResult && (
                <QuizResults
                  result={quizResult}
                  onBack={() => handleNavigate('browse')}
                  onRetake={handleRetakeQuiz}
                />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}