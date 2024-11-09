'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { RewardItem } from '../types';

interface RewardShopProps {
  rewards: RewardItem[];
  userPoints: number;
  onPurchase: (reward: RewardItem) => void;
}

export function RewardShop({ rewards, userPoints, onPurchase }: RewardShopProps) {
  return (
    <div className="card bg-base-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="w-5 h-5 text-primary" />
        <h2 className="card-title">Available Rewards</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map(reward => (
          <div key={reward.id} className="card bg-base-100">
            <figure className="px-4 pt-4">
              <img
                src={reward.image}
                alt={reward.name}
                className="rounded-xl h-40 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-base">{reward.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-primary font-medium">{reward.points} points</span>
                <button
                  onClick={() => onPurchase(reward)}
                  disabled={userPoints < reward.points}
                  className={`btn btn-sm ${
                    userPoints >= reward.points
                      ? 'btn-primary'
                      : 'btn-disabled'
                  }`}
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}