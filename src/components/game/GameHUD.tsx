import { motion, AnimatePresence } from 'framer-motion';
import { PlayerProgress } from '@/types/game';
import { Star, Trophy, Award, X } from 'lucide-react';
import { getTitleForXP, getNextMilestone } from '@/lib/xpTitles';
import { Button } from '@/components/ui/button';

interface GameHUDProps {
  progress: PlayerProgress;
  isVisible: boolean;
  onClose: () => void;
}

export const GameHUD = ({ progress, isVisible, onClose }: GameHUDProps) => {
  const currentTitle = getTitleForXP(progress.totalXP);
  const nextMilestone = getNextMilestone(progress.totalXP);
  const xpProgress = nextMilestone 
    ? ((progress.totalXP - currentTitle.minXP) / (nextMilestone.xp - currentTitle.minXP)) * 100
    : 100;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl"
        >
          <motion.div
            className="backdrop-blur-md bg-gradient-to-r from-card/90 via-card/95 to-card/90 border-2 border-accent/50 shadow-2xl rounded-xl p-4 relative overflow-hidden"
            animate={{
              boxShadow: [
                "0 0 20px rgba(var(--accent-rgb, 217, 170, 46), 0.3)",
                "0 0 40px rgba(var(--accent-rgb, 217, 170, 46), 0.5)",
                "0 0 20px rgba(var(--accent-rgb, 217, 170, 46), 0.3)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Gold glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 blur-xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-3">
                {/* Player Title */}
                <div className="flex items-center gap-2">
                  <Award className={`w-5 h-5 ${currentTitle.color}`} />
                  <div>
                    <div className="text-xs text-muted-foreground">Rank</div>
                    <div className={`text-sm font-bold ${currentTitle.color}`}>{currentTitle.title}</div>
                  </div>
                </div>

                {/* Mission Progress */}
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-secondary" />
                  <div>
                    <div className="text-xs text-muted-foreground">Missions</div>
                    <div className="text-sm font-bold">{progress.completedMissions.length}/5</div>
                  </div>
                </div>

                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-6 w-6 rounded-full hover:bg-accent/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* XP Progress */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">{progress.totalXP} XP</span>
                  </div>
                  {nextMilestone && (
                    <span className="text-xs text-muted-foreground">
                      Next: {nextMilestone.title} ({nextMilestone.xp} XP)
                    </span>
                  )}
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-secondary via-accent to-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
