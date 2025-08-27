import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useAuth } from '../contexts/AuthContext';
import {
  Moon,
  Sun,
  User,
  LogOut,
  Home,
  PlusCircle,
  BookOpen,
  Brain,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export function Navigation({ onNavigate, currentView }: NavigationProps) {
  const [isDark, setIsDark] = useState(true); // Force dark mode
  const { user, logout } = useAuth();

  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
  }, []);

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  if (!user) return null;

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'create', label: 'Create', icon: PlusCircle },
    { id: 'browse', label: 'Browse', icon: BookOpen },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -30, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="cosmic-glass border-b border-indigo-500/30 sticky top-0 z-50 relative backdrop-blur-xl"
    >
      {/* Enhanced gradient overlay with subtle animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-500/8 via-purple-500/6 to-pink-500/8"
        animate={{
          background: [
            'linear-gradient(90deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.06) 50%, rgba(236, 72, 153, 0.08) 100%)',
            'linear-gradient(90deg, rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.06) 50%, rgba(99, 102, 241, 0.08) 100%)',
            'linear-gradient(90deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.06) 50%, rgba(236, 72, 153, 0.08) 100%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <motion.button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center space-x-3 group interactive-3d"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="float-slow"
                >
                  <Brain className="h-10 w-10 text-indigo-400 glow-purple pulse-glow" />
                </motion.div>
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 shimmer" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                QuizMaster
              </span>
            </motion.button>

            <nav className="hidden md:flex items-center space-x-3">
              {navigationItems.map((item, index) => {
                const isActive = currentView === item.id;
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -15, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                    className="interactive-3d"
                  >
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => onNavigate(item.id)}
                      className={`relative overflow-hidden transition-all duration-300 rounded-xl ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg glow-purple scale-in'
                          : 'cosmic-glass border-indigo-500/30 hover:border-indigo-400/50 hover:bg-indigo-500/15'
                      }`}
                    >
                      <motion.div
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </motion.div>
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4 }}
                        />
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </nav>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.08, rotateY: 8 }}
                  whileTap={{ scale: 0.95 }}
                  className="interactive-3d"
                >
                  <Button
                    variant="ghost"
                    className="relative h-14 w-14 rounded-full cosmic-glass border-indigo-500/40 hover:border-indigo-400/60 group"
                  >
                    <Avatar className="h-11 w-11">
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold glow-purple">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-indigo-400/0 group-hover:border-indigo-400/60 transition-colors duration-300"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 cosmic-glass border-indigo-500/30 mt-2"
                align="end"
                forceMount
              >
                <motion.div
                  initial={{ opacity: 0, y: -15, scale: 0.9, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-start gap-3 p-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold text-lg">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-semibold text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="bg-indigo-500/30" />

                  <DropdownMenuItem
                    onClick={() => onNavigate('dashboard')}
                    className="cursor-pointer hover:bg-indigo-500/15 transition-all duration-200 m-1 rounded-lg interactive-3d"
                  >
                    <User className="mr-3 h-4 w-4 text-indigo-400" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-indigo-500/30" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/15 cursor-pointer transition-all duration-200 m-1 rounded-lg interactive-3d"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </motion.div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className="md:hidden mt-4 flex justify-center space-x-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {navigationItems.map((item, index) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.4 }}
                whileTap={{ scale: 0.95 }}
                className="interactive-3d"
              >
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onNavigate(item.id)}
                  className={`relative overflow-hidden transition-all duration-300 rounded-xl ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg glow-purple'
                      : 'cosmic-glass border-indigo-500/30 hover:border-indigo-400/50'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" /> {item.label}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.header>
  );
}
