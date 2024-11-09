'use client';

import { Trophy, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { RadialProgress } from './ui/RadialProgress';
import { useAppStore } from '../store/useAppStore';
import { Contract, RewardItem } from '../types';
import { isTaskAvailable } from '../utils/dateHelpers';

export function GoalProgress() {
  const { activeChild, contracts, rewards, activityLog } = useAppStore();

  if (!activeChild) return null;

  const calculateStreakMultiplier = (): { streak: number; multiplier: number } => {
    if (!activeChild) return { streak: 0, multiplier: 1 };

    // Get all activities for this child, sorted by date
    const childActivities = activityLog
      .filter(log => log.childId === activeChild.id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Find the last penalty (if any)
    const lastPenalty = childActivities.find(log => log.type === 'penalty');
    const lastPenaltyDate = lastPenalty ? new Date(lastPenalty.timestamp) : new Date(0);

    // Count consecutive days with completed tasks after the last penalty
    const streakDays = new Set();
    for (const activity of childActivities) {
      if (new Date(activity.timestamp) <= lastPenaltyDate) break;
      if (activity.type === 'chore') {
        streakDays.add(new Date(activity.timestamp).toDateString());
      }
    }

    const streak = streakDays.size;
    // Calculate multiplier: base 1x + 0.1x per day, max 2x
    const multiplier = Math.min(2, 1 + (streak * 0.1));

    return { streak, multiplier };
  };

  const getDisplayRewards = (): RewardItem[] => {
    if (!activeChild || !rewards.length) return [];
    
    // Sort all rewards by points
    const sortedRewards = [...rewards].sort((a, b) => a.points - b.points);
    
    // Split into affordable and unaffordable rewards
    const affordable = sortedRewards.filter(r => r.points <= activeChild.points);
    const unaffordable = sortedRewards.filter(r => r.points > activeChild.points);
    
    let displayRewards: RewardItem[] = [];
    
    if (affordable.length === 0) {
      // If no affordable rewards, show the cheapest one and two next ones
      displayRewards = sortedRewards.slice(0, 3);
    } else if (affordable.length >= 3) {
      // If 3 or more affordable rewards, show the 3 most expensive affordable ones
      displayRewards = affordable.reverse().slice(0, 3);
    } else {
      // If 1-2 affordable rewards, fill the rest with cheapest unaffordable ones
      displayRewards = [
        ...affordable.reverse(),
        ...unaffordable.slice(0, 3 - affordable.length)
      ];
    }

    return displayRewards;
  };

  const calculateMultiplier = (rewardPoints: number): number => {
    if (!activeChild) return 0;
    return Math.floor(activeChild.points / rewardPoints);
  };

  const calculateNextMultiplierProgress = (reward: RewardItem): number => {
    if (!activeChild) return 0;
    const currentMultiplier = calculateMultiplier(reward.points);
    const remainingPoints = activeChild.points - (currentMultiplier * reward.points);
    return (remainingPoints / reward.points) * 100;
  };

  const { streak, multiplier } = calculateStreakMultiplier();
  const displayRewards = getDisplayRewards();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Streak Multiplier */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-base-100"
      >
        <div className="card-body">
          <h3 className="card-title text-lg">
            <Flame className="w-5 h-5 text-primary" />
            Streak Multiplier
          </h3>
          <div className="flex items-center justify-between">
            <RadialProgress
              value={(multiplier - 1) * 100}
              max={100}
              size="lg"
              color="primary"
              showLabel={false}
            >
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">{multiplier.toFixed(1)}x</span>
                <span className="text-xs opacity-70">{streak} days</span>
              </div>
            </RadialProgress>
            <div className="text-right">
              <p className="text-sm opacity-70">Current Streak</p>
              <p className="text-2xl font-bold">{streak} days</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Display Rewards */}
      {displayRewards.map((reward, index) => (
        <motion.div
          key={reward.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * (index + 1) }}
          className="card bg-base-100"
        >
          <div className="card-body relative">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-primary" />
              <h3 className="card-title text-lg truncate">{reward.name}</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                {calculateMultiplier(reward.points) > 1 && (
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-content w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    x{calculateMultiplier(reward.points)}
                  </div>
                )}
              </div>
              <div className="flex-1 flex justify-end">
                <div className="relative w-16 h-16">
                  <RadialProgress
                    value={100}
                    max={100}
                    size="md"
                    color="secondary"
                    className="absolute inset-0"
                    showLabel={false}
                  />
                  <RadialProgress
                    value={calculateMultiplier(reward.points) > 0 
                      ? calculateNextMultiplierProgress(reward)
                      : (activeChild.points / reward.points) * 100}
                    max={100}
                    size="md"
                    color="accent"
                    className="absolute inset-0"
                    showLabel={false}
                  >
                    <span className="text-sm font-bold">{reward.points}p</span>
                  </RadialProgress>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}