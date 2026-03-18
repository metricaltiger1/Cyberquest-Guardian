import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, RefreshCw } from 'lucide-react';

const cyberFacts = [
  "🔐 Using multi-factor authentication makes your accounts 99.9% more secure!",
  "📧 Over 90% of cyber attacks start with a phishing email. Stay alert!",
  "🔑 The average person has 100 passwords to remember. Use a password manager!",
  "🌐 Cybercrime costs the world over $6 trillion annually. Be part of the defense!",
  "👁️ Check your privacy settings regularly — oversharing can expose you to threats.",
  "🛡️ Strong passwords are like strong walls — use 12+ characters with mixed types.",
  "⚡ Enable automatic updates to patch security vulnerabilities instantly.",
  "🎯 Social engineering tricks you into revealing sensitive info. Think before you share!",
  "🔒 HTTPS means secure — always look for the padlock icon when browsing.",
  "💡 Cyber awareness is your first line of defense. Stay curious and stay safe!"
];

export const CyberFact = () => {
  const [currentFact, setCurrentFact] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % cyberFacts.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRotating(true);
    setCurrentFact((prev) => (prev + 1) % cyberFacts.length);
    setTimeout(() => setIsRotating(false), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="relative max-w-3xl mx-auto"
    >
      <div className="bg-gradient-to-r from-card/60 via-card/40 to-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-xl">
        <div className="flex items-start gap-4">
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <Lightbulb className="w-8 h-8 text-accent flex-shrink-0" />
          </motion.div>
          
          <div className="flex-1 min-h-[60px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentFact}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-foreground text-base md:text-lg leading-relaxed"
              >
                {cyberFacts[currentFact]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.button
            onClick={handleRefresh}
            animate={{ rotate: isRotating ? 360 : 0 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 rounded-lg p-2 transition-all hover:scale-110"
            aria-label="Next fact"
          >
            <RefreshCw className="w-5 h-5 text-secondary" />
          </motion.button>
        </div>

        <div className="flex justify-center gap-1 mt-4">
          {cyberFacts.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-6 rounded-full transition-all ${
                index === currentFact
                  ? 'bg-accent'
                  : 'bg-muted-foreground/20'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
