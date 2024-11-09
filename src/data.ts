import { Child, Contract, RewardItem, Penalty } from './types';
import { subYears, subMonths, subDays } from 'date-fns';

// Demo data for testing and preview purposes
export const initialChildren: Child[] = [
  {
    id: 'demo-1',
    name: 'Emma',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    points: 150,
    gender: 'female',
    birthDate: subYears(new Date(), 4).toISOString(), // 4 years old
    growthData: [
      { 
        id: 'growth-1',
        date: subMonths(new Date(), 12).toISOString(),
        height: 95,
        weight: 15.2
      },
      { 
        id: 'growth-2',
        date: subMonths(new Date(), 9).toISOString(),
        height: 98,
        weight: 16.1
      },
      { 
        id: 'growth-3',
        date: subMonths(new Date(), 6).toISOString(),
        height: 101,
        weight: 16.8
      },
      { 
        id: 'growth-4',
        date: subMonths(new Date(), 3).toISOString(),
        height: 103,
        weight: 17.3
      },
      { 
        id: 'growth-5',
        date: subDays(new Date(), 7).toISOString(),
        height: 105,
        weight: 17.8
      }
    ],
    parentHeights: {
      father: 180,
      mother: 165
    }
  },
  {
    id: 'demo-2',
    name: 'Lucas',
    avatar: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=100&h=100&fit=crop',
    points: 200,
    gender: 'male',
    birthDate: subYears(new Date(), 5).toISOString(), // 5 years old
    growthData: [
      {
        id: 'growth-6',
        date: subMonths(new Date(), 12).toISOString(),
        height: 105,
        weight: 17.5
      },
      {
        id: 'growth-7',
        date: subMonths(new Date(), 9).toISOString(),
        height: 108,
        weight: 18.3
      },
      {
        id: 'growth-8',
        date: subMonths(new Date(), 6).toISOString(),
        height: 110,
        weight: 19.1
      },
      {
        id: 'growth-9',
        date: subMonths(new Date(), 3).toISOString(),
        height: 112,
        weight: 19.8
      },
      {
        id: 'growth-10',
        date: subDays(new Date(), 5).toISOString(),
        height: 114,
        weight: 20.4
      }
    ],
    parentHeights: {
      father: 185,
      mother: 170
    }
  },
];

export const contractTemplates: Omit<Contract, 'id' | 'childId' | 'lastCompleted'>[] = [
  { 
    task: 'Make your bed',
    points: 5,
    frequency: 'daily',
    customChore: false,
    isCollective: false
  },
  { 
    task: 'Clean your room',
    points: 10,
    frequency: 'weekly',
    customChore: false,
    isCollective: false
  },
  { 
    task: 'Do homework',
    points: 15,
    frequency: 'daily',
    customChore: false,
    isCollective: false
  },
  { 
    task: 'Help with dishes',
    points: 10,
    frequency: 'daily',
    customChore: false,
    isCollective: true // This is a collective chore
  },
  { 
    task: 'Take out trash',
    points: 8,
    frequency: 'daily',
    customChore: false,
    isCollective: true // This is a collective chore
  },
  { 
    task: 'Feed pets',
    points: 5,
    frequency: 'daily',
    customChore: false,
    isCollective: true // This is a collective chore
  }
];

export const penaltyTemplates: Omit<Penalty, 'id' | 'childId' | 'lastTriggered'>[] = [
  { 
    reason: 'Not cleaning toys',
    points: 10,
    frequency: 'daily'
  },
  { 
    reason: 'Fighting with siblings',
    points: 15,
    frequency: 'daily'
  },
  { 
    reason: 'Not completing homework',
    points: 20,
    frequency: 'daily'
  },
  { 
    reason: 'Breaking house rules',
    points: 25,
    frequency: 'daily'
  }
];

export const rewardItems: RewardItem[] = [
  {
    id: 'reward-1',
    name: 'Extra Screen Time (30min)',
    points: 50,
    image: 'https://images.unsplash.com/photo-1594735812909-09165f0d971e?w=300&h=200&fit=crop',
  },
  {
    id: 'reward-2',
    name: 'Choose Dinner Menu',
    points: 75,
    image: 'https://images.unsplash.com/photo-1576867757603-05b134ebc379?w=300&h=200&fit=crop',
  },
  {
    id: 'reward-3',
    name: 'New Book',
    points: 100,
    image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=200&fit=crop',
  },
  {
    id: 'reward-4',
    name: 'Movie Night',
    points: 150,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=200&fit=crop',
  },
  {
    id: 'reward-5',
    name: 'New Game',
    points: 300,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=300&h=200&fit=crop',
  },
  {
    id: 'reward-6',
    name: 'Theme Park Visit',
    points: 500,
    image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=300&h=200&fit=crop',
  }
];