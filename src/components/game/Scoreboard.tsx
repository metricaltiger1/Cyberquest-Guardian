import { motion } from 'framer-motion';
import { PlayerProgress } from '@/types/game';
import { Trophy, Star } from 'lucide-react';

interface ScoreboardProps {
  progress: PlayerProgress;
}

export const Scoreboard = ({ progress }: ScoreboardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-4 shadow-lg"
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-accent" />
          <div>
            <div className="text-xs text-muted-foreground">Total XP</div>
            <div className="text-lg font-bold text-accent">{progress.totalXP}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-secondary" />
          <div>
            <div className="text-xs text-muted-foreground">Badges</div>
            <div className="text-lg font-bold text-secondary">{progress.badges.length}/5</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <div className="text-xs text-muted-foreground">Progress</div>
            <div className="text-lg font-bold text-foreground">
              {progress.completedMissions.length}/5
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 w-full bg-muted rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(progress.completedMissions.length / 5) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};
