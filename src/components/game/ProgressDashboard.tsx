import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayerProgress } from '@/types/game';
import { missions } from '@/data/missions';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Trophy, Target, Award, RotateCcw, Edit, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getTitleForXP } from '@/lib/xpTitles';
import { Input } from '@/components/ui/input';
import { getUserName, saveUserName } from '@/lib/storage';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ProgressDashboardProps {
  progress: PlayerProgress;
  onBack: () => void;
  onReset: () => void;
}

export const ProgressDashboard = ({ progress, onBack, onReset }: ProgressDashboardProps) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(getUserName() || '');
  
  const currentTitle = getTitleForXP(progress.totalXP);
  const totalQuestions = missions.reduce((acc, m) => acc + (m.challenge.questions?.length || 0), 0);
  const totalAttempts = Object.values(progress.missionScores).reduce((acc, score) => acc + score.attempts, 0);
  const totalCorrect = progress.completedMissions.length * (totalQuestions / missions.length);
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  const avgAttempts = progress.completedMissions.length > 0 
    ? (totalAttempts / progress.completedMissions.length).toFixed(1) 
    : '0';

  const handleSaveName = () => {
    if (tempName.trim()) {
      saveUserName(tempName.trim());
      setIsEditingName(false);
    }
  };

  const handleCancelEdit = () => {
    setTempName(getUserName() || '');
    setIsEditingName(false);
  };

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
            Your Progress
          </motion.h1>
          <Button variant="outline" onClick={onBack} className="gap-2">
            <Home className="w-4 h-4" />
            Back
          </Button>
        </div>

        {/* Player Info Card */}
        <Card className="p-6 bg-gradient-to-br from-secondary/10 to-accent/10 border-2 border-accent/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Award className={`w-8 h-8 ${currentTitle.color}`} />
              <div>
                <div className="text-sm text-muted-foreground">Current Rank</div>
                <div className={`text-2xl font-bold ${currentTitle.color}`}>{currentTitle.title}</div>
              </div>
            </div>
            {!isEditingName ? (
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Player</div>
                  <div className="text-lg font-bold">{getUserName() || 'Cyber Hero'}</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsEditingName(true)}
                  className="gap-1"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input 
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Your name"
                  className="w-32"
                  maxLength={20}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                />
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleSaveName}
                >
                  <Check className="w-4 h-4 text-green-500" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleCancelEdit}
                >
                  <X className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4 text-center bg-card/50 backdrop-blur-md border-2 hover:border-accent/50 transition-all">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold text-accent">{progress.totalXP}</div>
              <div className="text-xs text-muted-foreground">Total XP</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 text-center bg-card/50 backdrop-blur-md border-2 hover:border-secondary/50 transition-all">
              <Target className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-bold text-secondary">{progress.completedMissions.length}/5</div>
              <div className="text-xs text-muted-foreground">Missions Complete</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4 text-center bg-card/50 backdrop-blur-md border-2 hover:border-accent/50 transition-all">
              <Award className="w-8 h-8 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold">{avgAttempts}</div>
              <div className="text-xs text-muted-foreground">Avg. Attempts</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-4 text-center bg-card/50 backdrop-blur-md border-2 hover:border-secondary/50 transition-all">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-bold text-secondary">{accuracy}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </Card>
          </motion.div>
        </div>

        {/* Mission Details */}
        <Card className="p-6 bg-card/50 backdrop-blur-md border-2">
          <h3 className="text-xl font-bold mb-4">Mission Details</h3>
          <div className="space-y-3">
            {missions.map((mission) => {
              const isCompleted = progress.completedMissions.includes(mission.id);
              const score = progress.missionScores[mission.id];
              
              return (
                <div 
                  key={mission.id}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 ${
                    isCompleted 
                      ? 'bg-secondary/10 border-secondary/30' 
                      : 'bg-muted/30 border-muted'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{mission.icon}</div>
                    <div>
                      <div className="font-medium">{mission.title}</div>
                      {isCompleted && score && (
                        <div className="text-xs text-muted-foreground">
                          {score.attempts} attempts • {score.xp} XP earned
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge variant={isCompleted ? "default" : "secondary"}>
                    {isCompleted ? "Complete" : "Locked"}
                  </Badge>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Reset Progress */}
        <Card className="p-6 bg-card/50 backdrop-blur-md border-2 border-destructive/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1">Reset Progress</h3>
              <p className="text-sm text-muted-foreground">
                Clear all progress and start fresh. This cannot be undone.
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your progress, including XP, badges, and mission completions. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onReset} className="bg-destructive hover:bg-destructive/90">
                    Reset Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      </div>
    </div>
  );
};
