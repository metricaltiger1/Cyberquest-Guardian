import { motion, AnimatePresence } from 'framer-motion';
import { Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { XPTitle } from '@/lib/xpTitles';

interface LevelUpModalProps {
  newTitle: XPTitle;
  onClose: () => void;
}

export const LevelUpModal = ({ newTitle, onClose }: LevelUpModalProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="max-w-md w-full bg-gradient-to-br from-secondary/20 via-accent/20 to-secondary/20 rounded-2xl p-8 border-2 border-accent/50 relative overflow-hidden"
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0.5, rotate: 10 }}
        >
          {/* Sparkle Effects */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: [0, (i % 4 - 1.5) * 100],
                y: [0, (Math.floor(i / 4) - 0.5) * 100],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{ left: '50%', top: '50%' }}
            >
              <Sparkles className="w-6 h-6 text-accent" />
            </motion.div>
          ))}

          <div className="text-center space-y-6 relative z-10">
            {/* Animated Icon */}
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="relative inline-block"
            >
              <motion.div
                className="absolute inset-0 bg-accent/30 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <Award className={`w-24 h-24 ${newTitle.color} relative z-10`} />
            </motion.div>

            {/* Title */}
            <div>
              <motion.h2
                className="text-3xl font-bold mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Rank Up! 🎉
              </motion.h2>
              <motion.p
                className="text-muted-foreground mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                You've achieved a new rank!
              </motion.p>
              <motion.div
                className={`text-4xl font-bold ${newTitle.color}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                {newTitle.title}
              </motion.div>
            </div>

            {/* Continue Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={onClose}
                size="lg"
                className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-primary font-bold px-8"
              >
                Continue Quest
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
