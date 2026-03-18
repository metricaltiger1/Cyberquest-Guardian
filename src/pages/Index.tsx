import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LandingScreen } from '@/components/game/LandingScreen';
import { MissionCard } from '@/components/game/MissionCard';
import { MissionIntro } from '@/components/game/MissionIntro';
import { Quiz } from '@/components/game/Quiz';
import { RewardModal } from '@/components/game/RewardModal';
import { MissionSummary } from '@/components/game/MissionSummary';
import { Certificate } from '@/components/game/Certificate';
import { Scoreboard } from '@/components/game/Scoreboard';
import { ReplayConfirmDialog } from '@/components/game/ReplayConfirmDialog';
import { GameHUD } from '@/components/game/GameHUD';
import { BadgeGallery } from '@/components/game/BadgeGallery';
import { ProgressDashboard } from '@/components/game/ProgressDashboard';
import { LevelUpModal } from '@/components/game/LevelUpModal';
import { missions } from '@/data/missions';
import { getProgress, saveProgress, resetProgress, getUserName } from '@/lib/storage';
import { PlayerProgress, GameState } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Home, Shield, Lock, Eye, Smartphone, Trophy, BarChart3, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTitleForXP } from '@/lib/xpTitles';
import missionsBg from '@/assets/missions-bg.jpg';

type GameScreen = 'landing' | 'missions' | 'intro' | 'challenge' | 'summary' | 'certificate' | 'badges' | 'progress';

const Index = () => {
  const [screen, setScreen] = useState<GameScreen>('landing');
  const [progress, setProgress] = useState<PlayerProgress>(getProgress());
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [showReplayDialog, setShowReplayDialog] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newTitle, setNewTitle] = useState(getTitleForXP(0));
  const [currentMissionAttempts, setCurrentMissionAttempts] = useState(0);
  const [currentMissionCorrect, setCurrentMissionCorrect] = useState(0);
  const [showHUD, setShowHUD] = useState(false);
  const [hudTimeout, setHudTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Show HUD notification when progress updates
  useEffect(() => {
    if (progress.totalXP > 0 || progress.completedMissions.length > 0) {
      setShowHUD(true);
      
      // Clear existing timeout
      if (hudTimeout) {
        clearTimeout(hudTimeout);
      }
      
      // Auto-hide after 4 seconds
      const timeout = setTimeout(() => {
        setShowHUD(false);
      }, 4000);
      
      setHudTimeout(timeout);
    }
    
    return () => {
      if (hudTimeout) {
        clearTimeout(hudTimeout);
      }
    };
  }, [progress.totalXP, progress.completedMissions.length]);

  const handleCloseHUD = () => {
    setShowHUD(false);
    if (hudTimeout) {
      clearTimeout(hudTimeout);
    }
  };

  const handleStartQuest = () => {
    setScreen('missions');
  };

  const handleMissionClick = (index: number) => {
    if (index <= progress.completedMissions.length) {
      setCurrentMissionIndex(index);
      
      // Check if mission is already completed
      const mission = missions[index];
      if (progress.completedMissions.includes(mission.id)) {
        setShowReplayDialog(true);
      } else {
        setScreen('intro');
      }
    }
  };

  const handleReplayConfirm = () => {
    setShowReplayDialog(false);
    setScreen('intro');
  };

  const handleNextQuest = () => {
    setShowReplayDialog(false);
    // Find next uncompleted mission
    const nextIndex = missions.findIndex((m, i) => 
      i > currentMissionIndex && !progress.completedMissions.includes(m.id)
    );
    if (nextIndex !== -1) {
      setCurrentMissionIndex(nextIndex);
      setScreen('intro');
    } else {
      // All missions completed, go to certificate
      setScreen('certificate');
    }
  };

  const handleCancelReplay = () => {
    setShowReplayDialog(false);
  };

  const handleStartChallenge = () => {
    setScreen('challenge');
  };

  const handleChallengeComplete = (totalAttempts: number, totalCorrect: number) => {
    const mission = missions[currentMissionIndex];
    const numQuestions = mission.challenge.questions?.length || 1;
    const isAlreadyCompleted = progress.completedMissions.includes(mission.id);
    
    // Calculate XP based on performance
    const attemptRatio = totalAttempts / numQuestions;
    let xpMultiplier = 1;
    
    if (attemptRatio <= 1.2) {
      xpMultiplier = 1; // Almost perfect
    } else if (attemptRatio <= 1.5) {
      xpMultiplier = 0.8; // Good
    } else {
      xpMultiplier = 0.6; // Decent
    }
    
    const earnedXP = Math.floor(mission.xpReward * xpMultiplier);
    
    setCurrentMissionAttempts(totalAttempts);
    setCurrentMissionCorrect(totalCorrect);
    
    // Only update progress if this is a NEW completion
    if (!isAlreadyCompleted) {
      const oldTitle = getTitleForXP(progress.totalXP);
      const newTotalXP = progress.totalXP + earnedXP;
      const updatedTitle = getTitleForXP(newTotalXP);
      
      const newProgress: PlayerProgress = {
        ...progress,
        completedMissions: [...progress.completedMissions, mission.id],
        totalXP: newTotalXP,
        badges: [...progress.badges, mission.badge.icon],
        currentMission: Math.max(currentMissionIndex + 1, progress.currentMission),
        missionScores: {
          ...progress.missionScores,
          [mission.id]: { xp: earnedXP, attempts: totalAttempts }
        }
      };
      setProgress(newProgress);
      
      // Check for level up
      if (oldTitle.title !== updatedTitle.title) {
        setNewTitle(updatedTitle);
        setShowLevelUp(true);
      }
    }
    setShowReward(true);
  };

  const handleRewardContinue = () => {
    setShowReward(false);
    setScreen('summary');
  };

  const handleSummaryContinue = () => {
    if (currentMissionIndex + 1 >= missions.length) {
      setScreen('certificate');
    } else {
      setScreen('missions');
    }
  };

  const handleRestart = () => {
    resetProgress();
    setProgress({
      currentMission: 0,
      completedMissions: [],
      totalXP: 0,
      badges: [],
      missionScores: {},
    });
    setCurrentMissionIndex(0);
    setScreen('landing');
  };

  const playerName = getUserName() || 'Cyber Hero';

  const currentMission = missions[currentMissionIndex];

  return (
    <div className="min-h-screen">
      {/* Game HUD - popup notification */}
      {screen !== 'landing' && (
        <GameHUD 
          progress={progress} 
          isVisible={showHUD}
          onClose={handleCloseHUD}
        />
      )}
      
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingScreen onStart={handleStartQuest} />
          </motion.div>
        )}

        {screen === 'missions' && (
          <motion.div
            key="missions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-24 p-6 relative overflow-hidden"
          >
            {/* Background image with overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${missionsBg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
            
            {/* Animated floating icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[Shield, Lock, Eye, Smartphone].map((Icon, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ 
                    x: Math.random() * window.innerWidth,
                    y: -50,
                    opacity: 0.1,
                    rotate: 0
                  }}
                  animate={{
                    y: window.innerHeight + 50,
                    rotate: 360,
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 15 + i * 5,
                    repeat: Infinity,
                    delay: i * 3,
                    ease: "linear"
                  }}
                >
                  <Icon className="w-8 h-8 md:w-12 md:h-12 text-accent/30" />
                </motion.div>
              ))}
              
              {/* Glowing orbs */}
              <motion.div
                className="absolute w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
                animate={{
                  x: [0, 150, 0],
                  y: [0, -150, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ top: '20%', left: '5%' }}
              />
              <motion.div
                className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl"
                animate={{
                  x: [0, -150, 0],
                  y: [0, 150, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ bottom: '20%', right: '5%' }}
              />
            </div>

            <div className="max-w-7xl mx-auto space-y-6 relative z-10">
              {/* Header Section */}
              <div className="space-y-4 mb-8">
                <motion.div 
                  className="text-center"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent drop-shadow-lg px-2 break-words">
                    Choose Your Mission
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mt-2 px-4 break-words">
                    {playerName}
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setScreen('badges')}
                    className="gap-2 hover:bg-accent/10 hover:border-accent transition-all backdrop-blur-sm bg-card/30"
                  >
                    <Trophy className="w-4 h-4" />
                    <span className="hidden xs:inline">Badges</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setScreen('progress')}
                    className="gap-2 hover:bg-secondary/10 hover:border-secondary transition-all backdrop-blur-sm bg-card/30"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden xs:inline">Stats</span>
                  </Button>
                  <Link to="/about">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 hover:bg-accent/10 hover:border-accent transition-all backdrop-blur-sm bg-card/30"
                    >
                      <Info className="w-4 h-4" />
                      <span className="hidden xs:inline">About</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setScreen('landing')}
                    className="gap-2 hover:bg-secondary/10 hover:border-secondary transition-all backdrop-blur-sm bg-card/30"
                  >
                    <Home className="w-4 h-4" />
                    <span className="hidden xs:inline">Home</span>
                  </Button>
                </div>
              </div>

              <Scoreboard progress={progress} />

              {/* Mission Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-0">
                {missions.map((mission, index) => (
                  <MissionCard
                    key={mission.id}
                    mission={mission}
                    index={index}
                    isCompleted={progress.completedMissions.includes(mission.id)}
                    isCurrent={index === progress.currentMission}
                    onClick={() => handleMissionClick(index)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {screen === 'intro' && currentMission && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MissionIntro mission={currentMission} onStart={handleStartChallenge} />
          </motion.div>
        )}

        {screen === 'challenge' && currentMission && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Quiz challenge={currentMission.challenge} onComplete={handleChallengeComplete} />
          </motion.div>
        )}

        {screen === 'summary' && currentMission && (
          <motion.div
            key="summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MissionSummary 
              mission={currentMission} 
              xpEarned={progress.missionScores[currentMission.id]?.xp || 0}
              totalAttempts={currentMissionAttempts}
              onContinue={handleSummaryContinue} 
            />
          </motion.div>
        )}

        {screen === 'certificate' && (
          <motion.div
            key="certificate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Certificate progress={progress} onRestart={handleRestart} />
          </motion.div>
        )}

        {screen === 'badges' && (
          <motion.div
            key="badges"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20"
          >
            <BadgeGallery progress={progress} onBack={() => setScreen('missions')} />
          </motion.div>
        )}

        {screen === 'progress' && (
          <motion.div
            key="progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20"
          >
            <ProgressDashboard 
              progress={progress} 
              onBack={() => setScreen('missions')} 
              onReset={handleRestart}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showReward && currentMission && (
        <RewardModal mission={currentMission} onContinue={handleRewardContinue} />
      )}

      {showReplayDialog && (
        <ReplayConfirmDialog 
          onReplay={handleReplayConfirm}
          onNextQuest={handleNextQuest}
          onCancel={handleCancelReplay}
        />
      )}

      {showLevelUp && (
        <LevelUpModal 
          newTitle={newTitle}
          onClose={() => setShowLevelUp(false)}
        />
      )}
    </div>
  );
};

export default Index;
