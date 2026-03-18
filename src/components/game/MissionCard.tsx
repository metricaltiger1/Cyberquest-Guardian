import { motion } from 'framer-motion';
import { Mission } from '@/types/game';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface MissionCardProps {
  mission: Mission;
  index: number;
  isCompleted: boolean;
  isCurrent: boolean;
  onClick: () => void;
}

export const MissionCard = ({ 
  mission, 
  index, 
  isCompleted, 
  isCurrent,
  onClick 
}: MissionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateY: -10 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ 
        scale: 1.03, 
        y: -8,
        rotateY: 2,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.97 }}
      className="h-full"
      style={{ perspective: 1000 }}
    >
      <Card
        className={`p-6 cursor-pointer transition-all duration-300 relative overflow-hidden h-full group backdrop-blur-sm ${
          isCurrent 
            ? 'border-secondary border-2 shadow-[0_0_30px_rgba(246,139,30,0.5),0_0_60px_rgba(246,139,30,0.2)] bg-gradient-to-br from-card/95 via-card/90 to-secondary/20' 
            : isCompleted
            ? 'border-accent/50 border-2 shadow-[0_0_20px_rgba(255,215,0,0.2)] bg-card/95 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]'
            : 'border-border border-2 bg-card/90 hover:border-secondary/50 hover:shadow-[0_0_25px_rgba(246,139,30,0.25)]'
        }`}
        onClick={onClick}
      >
        {/* Animated glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {isCompleted && (
          <motion.div 
            className="absolute top-3 right-3"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <CheckCircle2 className="w-6 h-6 text-accent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
          </motion.div>
        )}

        {isCurrent && (
          <div className="absolute top-0 right-0 bg-secondary text-white text-xs px-3 py-1 rounded-bl-lg font-semibold">
            Active
          </div>
        )}

        <div className="flex items-start gap-4 relative z-10">
          <motion.div 
            className="text-5xl"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {mission.icon}
          </motion.div>
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors">
              {mission.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{mission.description}</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-accent font-semibold flex items-center gap-1">
                <span className="text-lg">⚡</span>
                +{mission.xpReward} XP
              </span>
              <span className="text-muted-foreground">
                {mission.badge.icon} {mission.badge.name}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
