export interface XPTitle {
  title: string;
  minXP: number;
  maxXP: number;
  color: string;
}

export const XP_TITLES: XPTitle[] = [
  { title: 'Cyber Apprentice', minXP: 0, maxXP: 300, color: 'text-muted-foreground' },
  { title: 'Threat Analyst', minXP: 301, maxXP: 700, color: 'text-secondary' },
  { title: 'Digital Guardian', minXP: 701, maxXP: Infinity, color: 'text-accent' },
];

export const getTitleForXP = (xp: number): XPTitle => {
  return XP_TITLES.find(t => xp >= t.minXP && xp <= t.maxXP) || XP_TITLES[0];
};

export const getNextMilestone = (currentXP: number): { xp: number; title: string } | null => {
  const nextTitle = XP_TITLES.find(t => currentXP < t.minXP);
  if (nextTitle) {
    return { xp: nextTitle.minXP, title: nextTitle.title };
  }
  return null;
};
