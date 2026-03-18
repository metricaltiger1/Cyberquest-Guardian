import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Mail, Eye, Bug, ChevronLeft, ChevronRight } from 'lucide-react';
import passwordIcon from '@/assets/password-icon.jpg';
import phishingIcon from '@/assets/phishing-icon.jpg';
import mfaIcon from '@/assets/mfa-icon.jpg';
import privacyIcon from '@/assets/privacy-icon.jpg';
import deviceIcon from '@/assets/device-icon.jpg';

const slides = [
  {
    icon: Shield,
    title: "Become a Cyber Guardian",
    description: "Master cybersecurity through interactive missions and challenges",
    gradient: "from-secondary via-accent to-secondary",
    image: null
  },
  {
    icon: Lock,
    title: "Password Fortress",
    description: "Build unbreakable passwords and secure your digital vault",
    gradient: "from-accent via-secondary to-accent",
    image: passwordIcon
  },
  {
    icon: Mail,
    title: "Phishing Trap Defense",
    description: "Train your eye to catch phishing, malware, and social engineering",
    gradient: "from-secondary to-accent",
    image: phishingIcon
  },
  {
    icon: Eye,
    title: "Privacy Patrol",
    description: "Take control of your data and digital footprint",
    gradient: "from-accent to-secondary",
    image: privacyIcon
  },
  {
    icon: Bug,
    title: "Powered by Chryntox",
    description: "Smart Defense. Seamless Protection.",
    gradient: "from-secondary via-accent to-secondary",
    link: "http://chryntox.web.app/",
    isPartner: true,
    image: null
  }
];

const transitionTypes = ['fade', 'slide', 'zoom'];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [transitionType, setTransitionType] = useState('fade');

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setTransitionType(transitionTypes[Math.floor(Math.random() * transitionTypes.length)]);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setTransitionType(transitionTypes[Math.floor(Math.random() * transitionTypes.length)]);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setTransitionType(transitionTypes[Math.floor(Math.random() * transitionTypes.length)]);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setTransitionType(transitionTypes[Math.floor(Math.random() * transitionTypes.length)]);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getVariants = () => {
    switch (transitionType) {
      case 'fade':
        return {
          enter: { opacity: 0, scale: 1 },
          center: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1 }
        };
      case 'zoom':
        return {
          enter: { opacity: 0, scale: 0.8 },
          center: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.2 }
        };
      default: // slide
        return {
          enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
          }),
          center: { x: 0, opacity: 1, scale: 1 },
          exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
          })
        };
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative h-[300px] md:h-[350px] overflow-hidden rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 shadow-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={getVariants()}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 }
            }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          >
            {/* Icon or Image */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6 relative"
            >
              {slide.image ? (
                <div className="relative">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-2xl ring-4 ring-accent/30"
                  />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-accent/30 to-secondary/30 rounded-full blur-xl"
                  />
                </div>
              ) : (
                <div className={`bg-gradient-to-r ${slide.gradient} p-4 rounded-full shadow-lg ring-4 ring-accent/20`}>
                  <Icon className="w-16 h-16 md:w-20 md:h-20 text-primary" />
                </div>
              )}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}
            >
              {slide.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl"
            >
              {slide.description}
            </motion.p>

            {/* Chryntox Link */}
            {slide.isPartner && (
              <motion.a
                href={slide.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-accent hover:text-secondary transition-colors font-semibold underline decoration-2 underline-offset-4"
              >
                Visit Chryntox →
              </motion.a>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card border border-border rounded-full p-2 transition-all hover:scale-110 hover:shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card border border-border rounded-full p-2 transition-all hover:scale-110 hover:shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-gradient-to-r from-secondary to-accent'
                : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
