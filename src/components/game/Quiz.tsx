import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Challenge } from '@/types/game';
import { Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

interface QuizProps {
  challenge: Challenge;
  onComplete: (totalAttempts: number, totalCorrect: number) => void;
}

export const Quiz = ({ challenge, onComplete }: QuizProps) => {
  const questions = challenge.questions || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState('');

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);
    setTotalAttempts(prev => prev + 1);
    setAttempts(prev => prev + 1);

    if (correct) {
      setTotalCorrect(prev => prev + 1);
    }

    // Set the appropriate explanation
    if (currentQuestion.optionExplanations && currentQuestion.optionExplanations[selectedOption]) {
      setCurrentExplanation(currentQuestion.optionExplanations[selectedOption]);
    } else if (correct) {
      setCurrentExplanation(currentQuestion.correctExplanation);
    } else {
      setCurrentExplanation(currentQuestion.explanation);
    }
  };

  const handleNext = () => {
    if (isCorrect || attempts >= 3) {
      // Move to next question or complete
      if (currentQuestionIndex + 1 >= questions.length) {
        onComplete(totalAttempts, totalCorrect);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowExplanation(false);
        setIsCorrect(false);
        setAttempts(0);
        setCurrentExplanation('');
      }
    } else {
      // Allow another attempt (up to 3 total)
      setSelectedOption(null);
      setShowExplanation(false);
      setCurrentExplanation('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-gradient-to-br from-primary via-card to-primary">
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="max-w-3xl w-full space-y-6"
      >
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="flex gap-2">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx < currentQuestionIndex
                    ? 'bg-accent'
                    : idx === currentQuestionIndex
                    ? 'bg-secondary w-3 h-3'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        <Card className="p-6 md:p-8 border-2 border-secondary/30 bg-card/95 backdrop-blur">
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-foreground">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3 md:space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrectAnswer = index === currentQuestion.correctAnswer;
              const showCorrect = showExplanation && isCorrectAnswer;
              const showIncorrect = showExplanation && isSelected && !isCorrectAnswer;

              return (
                <motion.button
                  key={index}
                  onClick={() => !showExplanation && setSelectedOption(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all relative overflow-hidden ${
                    showCorrect
                      ? 'border-accent bg-accent/20 shadow-[0_0_20px_rgba(255,215,0,0.4)]'
                      : showIncorrect
                      ? 'border-destructive bg-destructive/20'
                      : isSelected
                      ? 'border-secondary bg-secondary/10'
                      : 'border-border hover:border-muted-foreground bg-card'
                  } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  whileHover={!showExplanation ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!showExplanation ? { scale: 0.98 } : {}}
                  disabled={showExplanation}
                  animate={showCorrect ? {
                    boxShadow: [
                      '0 0 20px rgba(255,215,0,0.4)',
                      '0 0 30px rgba(255,215,0,0.6)',
                      '0 0 20px rgba(255,215,0,0.4)',
                    ]
                  } : {}}
                  transition={{ duration: 1.5, repeat: showCorrect ? Infinity : 0 }}
                >
                  {/* Glow effect for correct answer */}
                  {showCorrect && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  <div className="flex items-center gap-3 relative z-10">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      showCorrect
                        ? 'border-accent bg-accent'
                        : showIncorrect
                        ? 'border-destructive bg-destructive'
                        : isSelected
                        ? 'border-secondary bg-secondary'
                        : 'border-muted-foreground'
                    }`}>
                      {showCorrect && <CheckCircle className="w-4 h-4 text-white" />}
                      {showIncorrect && <AlertCircle className="w-4 h-4 text-white" />}
                      {!showExplanation && isSelected && (
                        <div className="w-3 h-3 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-foreground font-medium">{option}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {!showExplanation && (
            <Button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="w-full mt-6 bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white font-semibold"
              size="lg"
            >
              Submit Answer
            </Button>
          )}

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className={`mt-6 p-5 rounded-xl border-2 ${
                  isCorrect
                    ? 'bg-accent/10 border-accent shadow-[0_0_20px_rgba(255,215,0,0.3)]'
                    : attempts >= 3
                    ? 'bg-accent/5 border-accent/50 shadow-[0_0_15px_rgba(255,215,0,0.2)]'
                    : 'bg-destructive/10 border-destructive/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  ) : attempts >= 3 ? (
                    <Sparkles className="w-6 h-6 text-accent/70 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-2 flex-1">
                    <p className="text-foreground leading-relaxed">
                      {currentExplanation}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full mt-4 bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white font-semibold"
                  size="lg"
                >
                  {isCorrect || attempts >= 3
                    ? currentQuestionIndex + 1 >= questions.length 
                      ? 'Complete Mission' 
                      : 'Next Question'
                    : `Try Again (${3 - attempts} attempt${3 - attempts !== 1 ? 's' : ''} left)`}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
};
