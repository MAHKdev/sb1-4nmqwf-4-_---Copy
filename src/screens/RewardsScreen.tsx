import React from 'react';
import { RewardShop } from '../components/RewardShop';
import { ChildSelector } from '../components/ChildSelector';
import { useChild } from '../contexts/ChildContext';
import { rewardItems } from '../data';
import { RewardItem } from '../types';

export function RewardsScreen() {
  const { activeChild, updateChildPoints } = useChild();

  const handlePurchaseReward = (reward: RewardItem) => {
    if (!activeChild || activeChild.points < reward.points) return;
    updateChildPoints(activeChild.id, -reward.points);
    alert(`🎉 ${activeChild.name} has redeemed ${reward.name}!`);
  };

  if (!activeChild) return null;

  return (
    <div className="space-y-8">
      <ChildSelector />
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{activeChild.name}'s Balance</h2>
          <span className="text-2xl font-bold text-indigo-600">{activeChild.points} points</span>
        </div>
      </div>

      <RewardShop
        rewards={rewardItems}
        userPoints={activeChild.points}
        onPurchase={handlePurchaseReward}
      />
    </div>
  );
}