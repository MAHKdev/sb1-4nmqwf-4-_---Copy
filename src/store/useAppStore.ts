import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Child, Contract, Penalty, ActivityLog, RewardItem, WeeklySchedule } from '../types';
import { initialChildren, contractTemplates, penaltyTemplates, rewardItems } from '../data';
import { generateRandomAvatar } from '../utils/avatarGenerator';
import { startOfWeek, format } from 'date-fns';

interface AppState {
  children: Child[];
  activeChild: Child | null;
  contracts: Contract[];
  penalties: Penalty[];
  activityLog: ActivityLog[];
  rewards: RewardItem[];
  weeklySchedules: WeeklySchedule[];
  setActiveChild: (child: Child) => void;
  addChild: (child: Pick<Child, 'name' | 'avatar' | 'gender'>) => void;
  updateChild: (childId: string, updates: Partial<Child>) => void;
  removeChild: (childId: string) => void;
  updateChildPoints: (childId: string, points: number) => void;
  addContract: (contract: Omit<Contract, 'id'>) => void;
  updateContract: (contractId: string, updates: Partial<Contract>) => void;
  completeContract: (contractId: string) => void;
  addPenalty: (penalty: Omit<Penalty, 'id'>) => void;
  updatePenalty: (penaltyId: string, updates: Partial<Penalty>) => void;
  triggerPenalty: (penaltyId: string) => void;
  addReward: (reward: RewardItem) => void;
  logActivity: (activity: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
  addWeeklySchedule: (schedule: Omit<WeeklySchedule, 'id'>) => void;
  updateWeeklySchedule: (scheduleId: string, updates: Partial<WeeklySchedule>) => void;
  completeWeeklyTask: (scheduleId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      children: initialChildren,
      activeChild: initialChildren[0],
      contracts: createInitialContracts(),
      penalties: createInitialPenalties(),
      activityLog: [],
      rewards: rewardItems,
      weeklySchedules: [],

      setActiveChild: (child) =>
        set({ activeChild: child }),

      addChild: (child) => {
        const newChild = {
          ...child,
          id: Date.now().toString(),
          points: 0,
          growthData: [],
          avatar: child.avatar || generateRandomAvatar(child.gender),
          birthDate: new Date().toISOString(),  // Add a default or actual birthDate here
        };
        set((state) => ({
          children: [...state.children, newChild],
          activeChild: newChild,
        }));
      },

      updateChild: (childId, updates) =>
        set((state) => {
          const updatedChildren = state.children.map((child) =>
            child.id === childId ? { ...child, ...updates } : child
          );
          return {
            children: updatedChildren,
            activeChild: state.activeChild?.id === childId
              ? { ...state.activeChild, ...updates }
              : state.activeChild,
          };
        }),

      removeChild: (childId) =>
        set((state) => ({
          children: state.children.filter((child) => child.id !== childId),
          activeChild: state.activeChild?.id === childId
            ? state.children.find((child) => child.id !== childId) || null
            : state.activeChild,
          contracts: state.contracts.filter((contract) => contract.childId !== childId),
          penalties: state.penalties.filter((penalty) => penalty.childId !== childId),
          weeklySchedules: state.weeklySchedules.filter((schedule) => schedule.childId !== childId),
        })),

      updateChildPoints: (childId, points) =>
        set((state) => {
          const updatedChildren = state.children.map((child) =>
            child.id === childId
              ? { ...child, points: Math.max(0, child.points + points) }
              : child
          );
          return {
            children: updatedChildren,
            activeChild: state.activeChild?.id === childId
              ? { ...state.activeChild, points: Math.max(0, state.activeChild.points + points) }
              : state.activeChild,
          };
        }),

      addContract: (contract) =>
        set((state) => ({
          contracts: [
            ...state.contracts,
            { ...contract, id: Date.now().toString() },
          ],
        })),

      updateContract: (contractId, updates) =>
        set((state) => ({
          contracts: state.contracts.map((contract) =>
            contract.id === contractId ? { ...contract, ...updates } : contract
          ),
        })),

      completeContract: (contractId) => {
        const state = get();
        const contract = state.contracts.find((c) => c.id === contractId);
        if (!contract || !state.activeChild) return;

        // Calculate bonus points based on streak
        let bonusPoints = 0;
        const streakBonus = calculateStreakBonus(state.contracts, contract.frequency);
        if (streakBonus > 0) {
          bonusPoints = Math.floor(contract.points * (streakBonus / 100));
        }

        set((state) => ({
          contracts: state.contracts.map((c) =>
            c.id === contractId
              ? { ...c, lastCompleted: new Date().toISOString() }
              : c
          ),
        }));

        const totalPoints = contract.points + bonusPoints;
        state.updateChildPoints(state.activeChild.id, totalPoints);
        
        // Log the activity with streak bonus if applicable
        state.logActivity({
          childId: state.activeChild.id,
          type: 'chore',
          description: bonusPoints > 0
            ? `Completed: ${contract.task} (+${bonusPoints} streak bonus!)`
            : `Completed: ${contract.task}`,
          points: totalPoints,
        });

        // Show streak bonus toast if applicable
        if (bonusPoints > 0) {
          window.showToast?.({
            message: `Streak Bonus: +${bonusPoints} points!`,
            type: 'success',
            icon: '🔥',
          });
        }
      },

      addPenalty: (penalty) =>
        set((state) => ({
          penalties: [
            ...state.penalties,
            { ...penalty, id: Date.now().toString() },
          ],
        })),

      updatePenalty: (penaltyId, updates) =>
        set((state) => ({
          penalties: state.penalties.map((penalty) =>
            penalty.id === penaltyId ? { ...penalty, ...updates } : penalty
          ),
        })),

      triggerPenalty: (penaltyId) => {
        const state = get();
        const penalty = state.penalties.find((p) => p.id === penaltyId);
        if (!penalty || !state.activeChild) return;

        set((state) => ({
          penalties: state.penalties.map((p) =>
            p.id === penaltyId
              ? { ...p, lastTriggered: new Date().toISOString() }
              : p
          ),
        }));

        state.updateChildPoints(state.activeChild.id, -penalty.points);
        state.logActivity({
          childId: state.activeChild.id,
          type: 'penalty',
          description: `Penalty: ${penalty.reason}`,
          points: -penalty.points,
        });
      },

      addReward: (reward) =>
        set((state) => ({
          rewards: [...state.rewards, reward],
        })),

      logActivity: (activity) =>
        set((state) => ({
          activityLog: [
            {
              ...activity,
              id: Date.now().toString(),
              timestamp: new Date().toISOString(),
            },
            ...state.activityLog,
          ],
        })),

      addWeeklySchedule: (schedule) =>
        set((state) => ({
          weeklySchedules: [
            ...state.weeklySchedules,
            {
              ...schedule,
              id: Date.now().toString(),
              week: getISOWeek(new Date()),
            },
          ],
        })),

      updateWeeklySchedule: (scheduleId, updates) =>
        set((state) => ({
          weeklySchedules: state.weeklySchedules.map((schedule) =>
            schedule.id === scheduleId ? { ...schedule, ...updates } : schedule
          ),
        })),

      completeWeeklyTask: (scheduleId) => {
        const state = get();
        const schedule = state.weeklySchedules.find((s) => s.id === scheduleId);
        if (!schedule) return;

        const contract = state.contracts.find((c) => c.id === schedule.contractId);
        if (!contract) return;

        set((state) => ({
          weeklySchedules: state.weeklySchedules.map((s) =>
            s.id === scheduleId ? { ...s, completed: true } : s
          ),
        }));

        if (schedule.childId) {
          state.updateChildPoints(schedule.childId, contract.points);
          state.logActivity({
            childId: schedule.childId,
            type: 'chore',
            description: `Completed weekly task: ${contract.task}`,
            points: contract.points,
          });
        }
      },
    }),
    {
      name: 'kids-reward-storage',
    }
  )
);

function createInitialContracts(): Contract[] {
  return contractTemplates.map((template, index) => ({
    ...template,
    id: `template-${index}`,
    childId: '',
    customChore: false,
  }));
}

function createInitialPenalties(): Penalty[] {
  return penaltyTemplates.map((template, index) => ({
    ...template,
    id: `template-${index}`,
    childId: '',
  }));
}

function calculateStreakBonus(contracts: Contract[], frequency: 'daily' | 'weekly' | 'monthly'): number {
  const relevantContracts = contracts.filter(c => c.frequency === frequency);
  if (relevantContracts.length === 0) return 0;

  let streak = 0;
  const now = new Date();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const oneWeekMs = 7 * oneDayMs;

  for (let i = 1; i <= 100; i++) {
    const checkDate = new Date(now.getTime() - (frequency === 'daily' ? i * oneDayMs : i * oneWeekMs));
    const allTasksCompletedForPeriod = relevantContracts.every(contract => {
      if (!contract.lastCompleted) return false;
      const completedDate = new Date(contract.lastCompleted);
      return completedDate.toDateString() === checkDate.toDateString();
    });

    if (allTasksCompletedForPeriod) {
      streak++;
    } else {
      break;
    }
  }

  if (frequency === 'daily') {
    if (streak >= 7) return 50;
    if (streak >= 3) return 25;
  } else if (frequency === 'weekly') {
    if (streak >= 4) return 100;
    if (streak >= 2) return 50;
  } else {
    if (streak >= 3) return 150;
    if (streak >= 2) return 75;
  }

  return 0;
}

function getISOWeek(date: Date): string {
  const year = date.getFullYear();
  const week = format(startOfWeek(date, { weekStartsOn: 1 }), 'ww');
  return `${year}-${week}`;
}