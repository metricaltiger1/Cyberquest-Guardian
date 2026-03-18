import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCcw, ArrowRight, Info } from 'lucide-react';

interface ReplayConfirmDialogProps {
  onReplay: () => void;
  onNextQuest: () => void;
  onCancel: () => void;
}

export const ReplayConfirmDialog = ({ onReplay, onNextQuest, onCancel }: ReplayConfirmDialogProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="max-w-md w-full bg-gradient-to-br from-card to-primary/50 p-6 md:p-8 rounded-2xl border-2 border-accent/50 shadow-2xl"
      >
        <div className="text-center space-y-6">
          {/* Icon */}
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="bg-secondary/20 p-4 rounded-full border-2 border-secondary">
              <Info className="w-12 h-12 text-secondary" />
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-foreground">
            Replay Mission?
          </h3>

          {/* Message */}
          <div className="space-y-3 text-muted-foreground">
            <p>
              You're about to replay this mission.
            </p>
            <div className="bg-accent/10 p-3 rounded-lg border border-accent/30">
              <p className="text-sm font-medium text-accent">
                ⚠️ XP will not increase for repeated missions
              </p>
            </div>
            <p className="text-sm">
              Do you want to continue or move to the next quest?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={onReplay}
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold gap-2 group"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Replay Mission
            </Button>
            <Button
              onClick={onNextQuest}
              className="w-full bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-white font-semibold gap-2 group"
              size="lg"
            >
              Next Quest
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              className="w-full hover:bg-card/50"
            >
              Cancel
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
