import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { LoginForm } from './auth/LoginForm';
import { RegisterForm } from './auth/RegisterForm';
import { Brain, Users, Trophy, Zap, Sparkles, Rocket } from 'lucide-react';

export function HomePage() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const features = [
    {
      icon: Brain,
      title: 'Create Quizzes',
      description: 'Build engaging quizzes with multiple-choice questions and instant feedback.',
    },
    {
      icon: Users,
      title: 'Share & Collaborate',
      description: 'Share your quizzes with others and discover new quizzes from the community.',
    },
    {
      icon: Trophy,
      title: 'Track Progress',
      description: 'Monitor your quiz performance and see detailed results with explanations.',
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get immediate feedback on your answers with comprehensive scoring.',
    },
  ];

  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    duration: 3 + Math.random() * 2,
  }));

  if (showAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Cosmic background elements with enhanced motion */}
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute w-32 h-32 rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 100%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(2px)',
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut"
            }}
          />
        ))}
        
        <motion.div 
          className="w-full max-w-md relative z-10"
          initial={{ opacity: 0, scale: 0.8, rotateY: -15, y: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ 
                type: 'spring', 
                duration: 1.5,
                delay: 0.3 
              }}
              className="relative float-animation"
            >
              <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-full opacity-40 pulse-glow" />
              <Brain className="h-20 w-20 text-indigo-400 mx-auto mb-6 relative z-10 glow pulse-glow" />
            </motion.div>
            <motion.h1 
              className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 shimmer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              QuizMaster
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Create and take engaging quizzes in the cosmic realm
            </motion.p>
          </div>

          <motion.div
            className="cosmic-glass rounded-2xl p-1 interactive-3d"
            initial={{ rotateX: -20, opacity: 0, y: 20 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {authMode === 'login' ? (
              <LoginForm onToggleMode={() => setAuthMode('register')} />
            ) : (
              <RegisterForm onToggleMode={() => setAuthMode('login')} />
            )}
          </motion.div>

          <div className="text-center mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                onClick={() => setShowAuth(false)}
                className="text-muted-foreground hover:text-foreground transition-all duration-300 interactive-3d"
              >
                ← Back to Cosmic Home
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute w-64 h-64 rounded-full opacity-5"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <div className="relative">
              <Brain className="h-10 w-10 text-indigo-400 glow" />
              <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              QuizMaster
            </span>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => {
                  setAuthMode('login');
                  setShowAuth(true);
                }}
                className="glass border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300"
              >
                Sign In
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => {
                  setAuthMode('register');
                  setShowAuth(true);
                }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 glow transition-all duration-300"
              >
                <Rocket className="h-4 w-4 mr-2" />
                Get Started
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="text-center space-y-8"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
            style={{ 
              backgroundSize: '200% 200%' 
            }}
          >
            Create Amazing Quizzes
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Build interactive quizzes, share them with others, and test your knowledge. 
            Perfect for education, training, or just having fun with friends.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="text-lg px-12 py-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 glow pulse-glow"
                onClick={() => {
                  setAuthMode('register');
                  setShowAuth(true);
                }}
              >
                <Rocket className="h-5 w-5 mr-2" />
                Start Creating
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-12 py-6 glass border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300"
                onClick={() => {
                  setAuthMode('login');
                  setShowAuth(true);
                }}
              >
                Take a Quiz
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Everything you need for great quizzes
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Powerful features to create, share, and take quizzes with ease
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.1 * (index + 1),
                ease: [0.4, 0, 0.2, 1] 
              }}
              whileHover={{ 
                y: -10,
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="h-full"
            >
              <Card className="h-full card-3d rounded-2xl border-0 overflow-hidden">
                <CardHeader className="text-center pb-4 relative">
                  <motion.div
                    className="relative mx-auto mb-6"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="absolute inset-0 blur-xl bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-20" />
                    <feature.icon className="h-14 w-14 text-indigo-400 relative z-10 glow" />
                  </motion.div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          <Card className="border-0 card-3d rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 opacity-90" />
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
            <CardContent className="text-center py-20 px-8 relative z-10">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Ready to get started?
              </motion.h2>
              <motion.p 
                className="text-xl mb-10 text-white/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Join thousands of users creating and taking quizzes every day.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-12 py-6 bg-white text-indigo-600 hover:bg-white/90 border-0 font-semibold shadow-2xl"
                  onClick={() => {
                    setAuthMode('register');
                    setShowAuth(true);
                  }}
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Create Your First Quiz
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 text-center text-muted-foreground relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg"
        >
          &copy; 2024 QuizMaster. Built with ❤️ for learning.
        </motion.p>
      </footer>
    </div>
  );
}