import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mission } from '@/types/game';
import { Sparkles } from 'lucide-react';

interface RewardModalProps {
  mission: Mission;
  onContinue: () => void;
}

export const RewardModal = ({ mission, onContinue }: RewardModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20 
        }}
        className="max-w-md w-full bg-gradient-to-br from-card to-primary p-8 rounded-2xl border-2 border-accent shadow-2xl"
      >
        <div className="text-center space-y-6">
          {/* Badge Animation */}
          <motion.div
            className="relative"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-8xl mb-4 relative">
              {mission.badge.icon}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity 
                }}
              >
                <Sparkles className="w-16 h-16 text-accent" />
              </motion.div>
            </div>
          </motion.div>

          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-accent">Mission Complete!</h3>
            <p className="text-xl text-foreground">Badge Unlocked:</p>
            <p className="text-2xl font-semibold text-secondary">{mission.badge.name}</p>
          </div>

          <div className="bg-accent/20 p-4 rounded-lg border border-accent">
            <p className="text-accent font-bold text-xl">+{mission.xpReward} XP</p>
          </div>

          <Button
            onClick={onContinue}
            size="lg"
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold text-lg"
          >
            Continue Quest
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
