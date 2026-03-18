export type MissionType = 'password' | 'phishing' | 'mfa' | 'privacy' | 'malware';

export interface Mission {
  id: MissionType;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  badge: {
    name: string;
    icon: string;
  };
  intro: string;
  challenge: Challenge;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string; // General explanation (fallback)
  correctExplanation: string; // Explanation for correct answer
  optionExplanations?: string[]; // Individual explanation for each option
}

export interface Challenge {
  type: 'quiz' | 'dragdrop' | 'tap' | 'builder';
  questions?: QuizQuestion[];
  items?: { id: string; label: string; correct?: boolean }[];
  buildItems?: string[];
  targetCount?: number;
}

export interface PlayerProgress {
  currentMission: number;
  completedMissions: MissionType[];
  totalXP: number;
  badges: string[];
  startedAt?: number;
  missionScores: Partial<Record<MissionType, { xp: number; attempts: number }>>;
}

export interface GameState {
  isPlaying: boolean;
  currentMissionIndex: number;
  showReward: boolean;
  showCertificate: boolean;
}
