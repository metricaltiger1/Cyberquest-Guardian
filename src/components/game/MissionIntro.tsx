import { motion } from 'framer-motion';
import { Mission } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MissionIntroProps {
  mission: Mission;
  onStart: () => void;
}

export const MissionIntro = ({ mission, onStart }: MissionIntroProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-primary to-card">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <Card className="p-8 space-y-6 border-secondary/50 shadow-xl">
          <motion.div
            className="text-center space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-7xl mb-4 animate-float">{mission.icon}</div>
            <h2 className="text-3xl font-bold text-foreground">{mission.title}</h2>
            <p className="text-muted-foreground">{mission.description}</p>
          </motion.div>

          <motion.div
            className="bg-muted/30 p-6 rounded-lg border border-border"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-foreground leading-relaxed">{mission.intro}</p>
          </motion.div>

          <motion.div
            className="flex items-center justify-between pt-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-sm text-muted-foreground">
              Reward: <span className="text-accent font-bold">+{mission.xpReward} XP</span>
            </div>
            <Button
              onClick={onStart}
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold"
            >
              Begin Challenge
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};
