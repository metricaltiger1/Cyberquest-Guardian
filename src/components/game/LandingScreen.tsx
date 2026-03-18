import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Trophy, Sparkles, Lock, AlertTriangle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HeroCarousel } from './HeroCarousel';
import { CyberFact } from './CyberFact';
import { getUserName, saveUserName } from '@/lib/storage';
import heroBg from '@/assets/hero-bg.jpg';

interface LandingScreenProps {
  onStart: () => void;
}

export const LandingScreen = ({ onStart }: LandingScreenProps) => {
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const savedName = getUserName();
    if (!savedName) {
      setShowNamePrompt(true);
    }
  }, []);

  const handleStart = () => {
    if (showNamePrompt && userName.trim()) {
      saveUserName(userName.trim());
      setShowNamePrompt(false);
      onStart();
    } else if (!showNamePrompt) {
      onStart();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Hero Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroBg})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-card/95" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating Animated Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              rotate: [0, 360, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {i % 3 === 0 ? (
              <Lock className="w-8 h-8 text-secondary/30" />
            ) : i % 3 === 1 ? (
              <Shield className="w-8 h-8 text-accent/30" />
            ) : (
              <Eye className="w-8 h-8 text-secondary/30" />
            )}
          </motion.div>
        ))}

        {/* Glowing orbs */}
        <motion.div
          className="absolute w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      <motion.div
        className="text-center z-10 space-y-8 max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo/Icon with Pulse Effect */}
        <motion.div
          className="flex justify-center relative"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="absolute inset-0 flex justify-center items-center"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-24 h-24 text-accent/50" />
          </motion.div>
          <Shield className="w-24 h-24 text-accent drop-shadow-[0_0_30px_rgba(255,215,0,0.8)] relative z-10" />
        </motion.div>

        {/* Title */}
        <div className="space-y-2">
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            CyberQuest
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-sm md:text-base tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            by Chryntox
          </motion.p>
        </div>

        {/* Tagline */}
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Play. Learn. Defend.
        </motion.h2>

        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.div 
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card/70 backdrop-blur-md border-2 border-border hover:border-secondary hover:bg-card/90 transition-all group cursor-pointer shadow-lg hover:shadow-secondary/20"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <motion.div
                className="absolute inset-0 bg-secondary/20 rounded-full blur-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Zap className="w-10 h-10 text-secondary relative z-10" />
            </motion.div>
            <h3 className="font-bold text-lg group-hover:text-secondary transition-colors">Interactive Missions</h3>
            <p className="text-sm text-muted-foreground text-center">
              Learn through engaging challenges
            </p>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card/70 backdrop-blur-md border-2 border-border hover:border-accent hover:bg-card/90 transition-all group cursor-pointer shadow-lg hover:shadow-accent/20"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative"
              animate={{ 
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <motion.div
                className="absolute inset-0 bg-accent/20 rounded-full blur-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Trophy className="w-10 h-10 text-accent relative z-10" />
            </motion.div>
            <h3 className="font-bold text-lg group-hover:text-accent transition-colors">Earn Rewards</h3>
            <p className="text-sm text-muted-foreground text-center">
              Unlock badges and certificates
            </p>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card/70 backdrop-blur-md border-2 border-border hover:border-secondary hover:bg-card/90 transition-all group cursor-pointer shadow-lg hover:shadow-secondary/20"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative"
              animate={{ 
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity
              }}
            >
              <motion.div
                className="absolute inset-0 bg-secondary/20 rounded-full blur-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Shield className="w-10 h-10 text-secondary relative z-10" />
            </motion.div>
            <h3 className="font-bold text-lg group-hover:text-secondary transition-colors">Real Skills</h3>
            <p className="text-sm text-muted-foreground text-center">
              Protect yourself online
            </p>
          </motion.div>
        </motion.div>

        {/* Cyber Fact */}
        <CyberFact />

        {/* Name Input (if not set) */}
        {showNamePrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="w-full max-w-md"
          >
            <div className="bg-card/70 backdrop-blur-md border-2 border-accent/30 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2 text-center">Welcome, Cyber Hero!</h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Enter your name to personalize your journey
              </p>
              <Input
                placeholder="Your first name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                maxLength={20}
                className="text-center text-lg"
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              />
            </div>
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="relative"
        >
          {/* Button Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-secondary via-accent to-secondary rounded-xl blur-2xl opacity-50"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Button
              onClick={handleStart}
              disabled={showNamePrompt && !userName.trim()}
              size="lg"
              className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-primary font-bold text-xl px-16 py-7 rounded-xl shadow-2xl hover:shadow-accent/50 transition-all duration-300 relative overflow-hidden group border-2 border-accent/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Shimmer Effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Sparkle Particles */}
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [0, (i - 1) * 20],
                    y: [0, -20],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  style={{ left: '50%', top: '50%' }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.span>
              ))}
              
              <span className="relative flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                Start Quest
                <Sparkles className="w-6 h-6" />
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Footer text */}
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          No account needed • Progress saved locally • Play offline
        </motion.p>
      </motion.div>
    </div>
  );
};
