'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { RewardShop } from '../RewardShop';
import { ChildSelector } from '../ChildSelector';
import { useAppStore } from '../../store/useAppStore';
import { Modal } from '../ui/Modal';
import { PointsAnimation } from '../ui/PointsAnimation';
import { triggerConfetti } from '../../utils/confetti';
import { RewardItem } from '../../types';

export function RewardsScreen() {
  const { activeChild, updateChildPoints, addReward, rewards } = useAppStore();
  const [purchaseModal, setPurchaseModal] = useState<{
    isOpen: boolean;
    reward?: RewardItem;
    oldPoints?: number;
    newPoints?: number;
  }>({ isOpen: false });
  const [isAddingReward, setIsAddingReward] = useState(false);
  const [newReward, setNewReward] = useState<Partial<RewardItem>>({
    name: '',
    points: 0,
    image: '',
  });

  const handlePurchaseReward = (reward: RewardItem) => {
    if (!activeChild || activeChild.points < reward.points) return;
    
    const oldPoints = activeChild.points;
    const newPoints = oldPoints - reward.points;
    
    setPurchaseModal({
      isOpen: true,
      reward,
      oldPoints,
      newPoints,
    });

    triggerConfetti(window.innerWidth / 2, window.innerHeight / 2);
    updateChildPoints(activeChild.id, -reward.points);
  };

  const handleAddReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReward.name || !newReward.points || !newReward.image) return;

    addReward({
      id: Date.now().toString(),
      name: newReward.name,
      points: newReward.points,
      image: newReward.image,
    });

    setNewReward({ name: '', points: 0, image: '' });
    setIsAddingReward(false);
  };

  if (!activeChild) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <ChildSelector />
        <button
          onClick={() => setIsAddingReward(true)}
          className="btn btn-primary btn-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Reward
        </button>
      </div>
      
      <div className="card bg-base-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{activeChild.name}'s Balance</h2>
          <span className="text-2xl font-bold text-primary">{activeChild.points} points</span>
        </div>
      </div>

      <RewardShop
        rewards={rewards}
        userPoints={activeChild.points}
        onPurchase={handlePurchaseReward}
      />

      <Modal
        isOpen={purchaseModal.isOpen}
        onClose={() => setPurchaseModal({ isOpen: false })}
      >
        <div className="p-6 text-center">
          <img
            src={purchaseModal.reward?.image}
            alt={purchaseModal.reward?.name}
            className="w-32 h-32 object-cover mx-auto mb-4 rounded-xl"
          />
          <h3 className="text-2xl font-bold mb-2">Reward Redeemed!</h3>
          <p className="text-lg mb-4">
            You've successfully redeemed {purchaseModal.reward?.name}
          </p>
          
          {purchaseModal.oldPoints !== undefined && purchaseModal.newPoints !== undefined && (
            <PointsAnimation
              oldPoints={purchaseModal.oldPoints}
              newPoints={purchaseModal.newPoints}
            />
          )}

          <button
            className="btn btn-primary"
            onClick={() => setPurchaseModal({ isOpen: false })}
          >
            Awesome!
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isAddingReward}
        onClose={() => setIsAddingReward(false)}
      >
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-6">Add New Reward</h3>
          <form onSubmit={handleAddReward} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Reward Name</span>
              </label>
              <input
                type="text"
                value={newReward.name}
                onChange={(e) => setNewReward(prev => ({ ...prev, name: e.target.value }))}
                className="input input-bordered"
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Points Required</span>
              </label>
              <input
                type="number"
                value={newReward.points || ''}
                onChange={(e) => setNewReward(prev => ({ ...prev, points: Number(e.target.value) }))}
                className="input input-bordered"
                min="1"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="url"
                value={newReward.image}
                onChange={(e) => setNewReward(prev => ({ ...prev, image: e.target.value }))}
                className="input input-bordered"
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="btn"
                onClick={() => setIsAddingReward(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Add Reward
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}