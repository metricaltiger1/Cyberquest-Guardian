import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mission } from '@/types/game';
import { Trophy, Star, ChevronRight } from 'lucide-react';
import { getUserName } from '@/lib/storage';

interface MissionSummaryProps {
  mission: Mission;
  xpEarned: number;
  totalAttempts: number;
  onContinue: () => void;
}

export const MissionSummary = ({ mission, xpEarned, totalAttempts, onContinue }: MissionSummaryProps) => {
  const playerName = getUserName() || 'Cyber Hero';
  
  const motivationalQuotes = [
    `Well done, ${playerName}! You're one step closer to becoming a Cyber Guardian!`,
    `${playerName}, your digital fortress grows stronger!`,
    `Great work, ${playerName}! Knowledge is your greatest defense!`,
    `Another threat neutralized, ${playerName}!`,
    `${playerName}, cyber security mastery is within reach!`,
  ];
  
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  const performance = totalAttempts <= mission.challenge.questions!.length ? 'Perfect!' : totalAttempts <= mission.challenge.questions!.length * 1.5 ? 'Great!' : 'Good!';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="max-w-lg w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-card via-primary to-card p-6 md:p-8 rounded-2xl border-2 border-accent shadow-2xl scrollbar-hide"
      >
        <div className="text-center space-y-6">
          {/* Badge with glow effect */}
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <div className="text-9xl mb-4 filter drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
              {mission.badge.icon}
            </div>
          </motion.div>

          <div className="space-y-2">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Mission Complete!
            </h3>
            <p className="text-xl text-foreground font-semibold">{mission.badge.name}</p>
            <p className="text-lg text-secondary">{performance}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-accent/20 p-4 rounded-lg border border-accent">
              <Star className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-accent font-bold text-2xl">+{xpEarned} XP</p>
              <p className="text-xs text-muted-foreground">Experience Gained</p>
            </div>
            <div className="bg-secondary/20 p-4 rounded-lg border border-secondary">
              <Trophy className="w-6 h-6 text-secondary mx-auto mb-2" />
              <p className="text-secondary font-bold text-2xl">{totalAttempts}</p>
              <p className="text-xs text-muted-foreground">Total Attempts</p>
            </div>
          </div>

          {/* Motivational Quote */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-primary/50 p-4 rounded-lg border border-border"
          >
            <p className="text-foreground font-medium italic">"{quote}"</p>
          </motion.div>

          <Button
            onClick={onContinue}
            size="lg"
            className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white font-bold text-lg group"
          >
            Continue Quest
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
