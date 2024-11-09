// Update Child interface to include parent heights
export interface Child {
  id: string;
  name: string;
  avatar: string;
  points: number;
  gender: 'male' | 'female' | 'neutral';
  birthDate: string;
  growthData: GrowthEntry[];
  parentHeights?: {
    father?: number;
    mother?: number;
  };
  avatarOptions?: Options;
}

export interface ParentHeights {
  father: number;
  mother: number;
}


export interface GrowthEntry {
  id: string;
  date: string;
  height: number;
  weight: number;
}


import { Options } from '@dicebear/avatars';

export interface Contract {
  id: string;
  childId: string;
  task: string;
  points: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  lastCompleted?: string;
  customChore?: boolean;
  lastTriggered?: string;
  completed?: boolean;
  isOptional?: boolean; // Add if missing
  isCollective?: boolean; // Add if missing
  mandatory?: boolean; // Add if missing
  scheduledDay?: number; // Add if missing for weekly or monthly scheduling
}

export interface Penalty {
  id: string;
  childId: string;
  reason: string;
  points: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  lastTriggered?: string;
  date?: string; // Add date as an optional property
  isOptional?: boolean; // Add if needed
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

export interface WeeklySchedule {
  id: string;
  childId: string;
  contractId: string;
  dayOfWeek: number;
  completed: boolean;
  week: string;
}