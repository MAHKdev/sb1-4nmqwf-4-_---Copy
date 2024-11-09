export interface GrowthEntry {
  id: string;
  date: string;
  height: number;
  weight: number;
}

export interface ParentHeights {
  father: number;
  mother: number;
}

export interface Child {
  id: string;
  name: string;
  avatar: string;
  points: number;
  gender: 'male' | 'female' | 'neutral';
  birthDate: string;
  growthData: GrowthEntry[];
  parentHeights?: ParentHeights;
}

export interface Contract {
  id: string;
  childId: string;
  task: string;
  points: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  lastCompleted?: string;
  customChore?: boolean;
  isOptional?: boolean;
  isCollective?: boolean;
  scheduledDay?: number; // 0-6 for weekly, 1-31 for monthly
  mandatory?: boolean;
}

export interface WeeklySchedule {
  id: string;
  childId: string;
  contractId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  completed: boolean;
  week: string; // ISO week string (YYYY-WW)
}

export interface Penalty {
  id: string;
  childId: string;
  reason: string;
  points: number;
  frequency: 'daily' | 'weekly';
  lastTriggered?: string;
}

export interface RewardItem {
  id: string;
  name: string;
  points: number;
  image: string;
}

export interface ActivityLog {
  id: string;
  childId: string;
  type: 'chore' | 'penalty' | 'reward';
  description: string;
  points: number;
  timestamp: string;
}