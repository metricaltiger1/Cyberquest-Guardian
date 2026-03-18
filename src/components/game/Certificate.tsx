import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlayerProgress } from '@/types/game';
import { Trophy, Shield, Award } from 'lucide-react';
import { getUserName } from '@/lib/storage';

interface CertificateProps {
  progress: PlayerProgress;
  onRestart: () => void;
}

export const Certificate = ({ progress, onRestart }: CertificateProps) => {
  const playerName = getUserName() || 'Cyber Hero';
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-primary via-card to-primary">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full"
      >
        <Card className="p-8 md:p-12 border-4 border-accent shadow-2xl bg-gradient-to-br from-card to-primary">
          {/* Header Icons */}
          <div className="flex justify-center gap-8 mb-8">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Shield className="w-16 h-16 text-accent" />
            </motion.div>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Trophy className="w-20 h-20 text-secondary" />
            </motion.div>
            <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Award className="w-16 h-16 text-accent" />
            </motion.div>
          </div>

          {/* Certificate Content */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent">
              Cyber Guardian Certificate
            </h1>

            <div className="space-y-2">
              <p className="text-muted-foreground text-lg">This certifies that</p>
              <p className="text-3xl font-bold text-foreground">{playerName}</p>
              <p className="text-muted-foreground text-lg">has successfully completed</p>
            </div>

            <h2 className="text-3xl font-bold text-secondary">CyberQuest Training</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
              <div className="bg-muted/30 p-6 rounded-lg border border-border">
                <div className="text-4xl font-bold text-accent">{progress.completedMissions.length}</div>
                <div className="text-sm text-muted-foreground mt-2">Missions Complete</div>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg border border-border">
                <div className="text-4xl font-bold text-secondary">{progress.totalXP}</div>
                <div className="text-sm text-muted-foreground mt-2">Total XP Earned</div>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg border border-border">
                <div className="text-4xl font-bold text-accent">{progress.badges.length}</div>
                <div className="text-sm text-muted-foreground mt-2">Badges Unlocked</div>
              </div>
            </div>

            {/* Badges Display */}
            <div className="bg-muted/20 p-6 rounded-lg border border-accent/50">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Earned Badges</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {progress.badges.map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="bg-card p-4 rounded-lg border border-border"
                  >
                    <div className="text-4xl">{badge}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-sm text-muted-foreground pt-6 border-t border-border">
              Completed on {completionDate}
            </div>

            <div className="space-y-4 pt-6">
              <p className="text-foreground font-semibold">
                {playerName}, you are now equipped to defend yourself in the digital world!
              </p>
              <Button
                onClick={onRestart}
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white font-bold"
              >
                Start New Quest
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
