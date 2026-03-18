import { motion } from 'framer-motion';
import { PlayerProgress } from '@/types/game';
import { missions } from '@/data/missions';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BadgeGalleryProps {
  progress: PlayerProgress;
  onBack: () => void;
}

export const BadgeGallery = ({ progress, onBack }: BadgeGalleryProps) => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-primary via-card to-primary">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            Badge Gallery
          </motion.h1>
          <Button variant="outline" onClick={onBack} className="gap-2">
            <Home className="w-4 h-4" />
            Back
          </Button>
        </div>

        {/* Stats */}
        <Card className="p-6 bg-card/50 backdrop-blur-md border-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Collected Badges</div>
              <div className="text-2xl font-bold text-accent">{progress.badges.length} / {missions.length}</div>
            </div>
            <Badge variant={progress.badges.length === missions.length ? "default" : "secondary"}>
              {progress.badges.length === missions.length ? "Complete!" : "In Progress"}
            </Badge>
          </div>
        </Card>

        {/* Badge Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {missions.map((mission, index) => {
            const isEarned = progress.completedMissions.includes(mission.id);
            
            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-6 text-center transition-all ${
                  isEarned 
                    ? 'bg-gradient-to-br from-secondary/20 to-accent/20 border-2 border-accent/50 hover:border-accent hover:shadow-lg hover:shadow-accent/20' 
                    : 'bg-muted/50 border-2 border-muted opacity-60'
                }`}>
                  <motion.div
                    animate={isEarned ? {
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="relative"
                  >
                    {!isEarned && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lock className="w-12 h-12 text-muted-foreground/50" />
                      </div>
                    )}
                    <div className={`text-6xl mb-3 ${!isEarned && 'opacity-20 blur-sm'}`}>
                      {mission.badge.icon}
                    </div>
                  </motion.div>
                  <h3 className="font-bold mb-1">{mission.badge.name}</h3>
                  <p className="text-xs text-muted-foreground">{mission.title}</p>
                  {isEarned && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2"
                    >
                      <Badge variant="outline" className="text-xs">
                        +{mission.xpReward} XP
                      </Badge>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Completion Message */}
        {progress.badges.length === missions.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-6 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg border-2 border-accent/50"
          >
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold mb-2">Collection Complete!</h3>
            <p className="text-muted-foreground">
              You've earned all badges! You're a true Cyber Guardian!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
