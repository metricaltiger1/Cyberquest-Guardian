import { PlayerProgress } from '@/types/game';

const STORAGE_KEY = 'cyberquest_progress';
const NAME_KEY = 'cyberquest_username';

export const getProgress = (): PlayerProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure missionScores exists for backward compatibility
      if (!parsed.missionScores) {
        parsed.missionScores = {};
      }
      return parsed;
    }
  } catch (error) {
    console.error('Error reading progress:', error);
  }
  
  return {
    currentMission: 0,
    completedMissions: [],
    totalXP: 0,
    badges: [],
    missionScores: {},
  };
};

export const saveProgress = (progress: PlayerProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const resetProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting progress:', error);
  }
};

export const getUserName = (): string | null => {
  try {
    return localStorage.getItem(NAME_KEY);
  } catch (error) {
    console.error('Error reading username:', error);
    return null;
  }
};

export const saveUserName = (name: string): void => {
  try {
    localStorage.setItem(NAME_KEY, name);
  } catch (error) {
    console.error('Error saving username:', error);
  }
};
