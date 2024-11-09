'use client';

import React, { useState } from 'react';
import { Trophy, Star, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { triggerConfetti } from '../utils/confetti';
import { isTaskAvailable } from '../utils/dateHelpers';

export function ChildCard() {
  const { activeChild, contracts, penalties, completeContract, updateChildPoints, logActivity } = useAppStore();
  const [showPenalties, setShowPenalties] = useState(false);

  if (!activeChild) return null;

  // Filter available contracts
  const availableContracts = contracts.filter(c => {
    // Check if task is available based on last completion
    const isAvailable = isTaskAvailable(c.lastCompleted, c.frequency);
    
    // For collective tasks, show only if not completed by anyone
    if (c.isCollective) {
      return isAvailable;
    }
    
    // For individual tasks, show if assigned to this child or unassigned
    return isAvailable && (!c.childId || c.childId === activeChild.id);
  });

  // Filter penalties
  const availablePenalties = penalties.filter(p => 
    (!p.childId || p.childId === activeChild.id) && 
    isTaskAvailable(p.lastTriggered, p.frequency)
  );

  const handleCompleteTask = (contractId: string, event: React.MouseEvent) => {
    const contract = contracts.find(c => c.id === contractId);
    if (!contract) return;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX || (rect.left + rect.width / 2);
    const y = event.clientY || (rect.top + rect.height / 2);
    
    triggerConfetti(x, y);
    completeContract(contractId);
    updateChildPoints(activeChild.id, contract.points);
    logActivity({
      childId: activeChild.id,
      type: 'chore',
      description: `Completed: ${contract.task}${contract.isCollective ? ' (Collective)' : ''}`,
      points: contract.points,
    });
  };

  const handleTriggerPenalty = (penaltyId: string) => {
    const penalty = penalties.find(p => p.id === penaltyId);
    if (!penalty) return;

    updateChildPoints(activeChild.id, -penalty.points);
    logActivity({
      childId: activeChild.id,
      type: 'penalty',
      description: `Penalty: ${penalty.reason}`,
      points: -penalty.points,
    });
  };

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <h3 className="card-title">Available Tasks</h3>
          </div>
          <label className="label cursor-pointer">
            <span className="label-text mr-2">Show Penalties</span>
            <input
              type="checkbox"
              className="toggle toggle-error"
              checked={showPenalties}
              onChange={(e) => setShowPenalties(e.target.checked)}
            />
          </label>
        </div>

        <AnimatePresence mode="wait">
          {showPenalties ? (
            <motion.div
              key="penalties"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3 mt-4"
            >
              {availablePenalties.length === 0 ? (
                <p className="text-center opacity-50 py-4">No penalties available</p>
              ) : (
                availablePenalties.map(penalty => (
                  <motion.div
                    key={penalty.id}
                    layout
                    className="flex items-center justify-between p-3 bg-base-100 rounded-lg border-l-4 border-error"
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-error" />
                      <span>{penalty.reason}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-error font-medium">-{penalty.points}</span>
                      <button
                        onClick={() => handleTriggerPenalty(penalty.id)}
                        className="btn btn-error btn-sm"
                      >
                        Trigger
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3 mt-4"
            >
              {availableContracts.length === 0 ? (
                <p className="text-center opacity-50 py-4">No tasks available</p>
              ) : (
                availableContracts.map(contract => (
                  <motion.div
                    key={contract.id}
                    layout
                    className={`flex items-center justify-between p-3 bg-base-100 rounded-lg ${
                      contract.isCollective ? 'border-l-4 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Star className={`w-4 h-4 ${contract.isCollective ? 'text-primary' : ''}`} />
                      <div>
                        <span>{contract.task}</span>
                        {contract.isCollective && (
                          <span className="text-xs ml-2 text-primary">(Collective)</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-primary font-medium">+{contract.points}</span>
                      <button
                        onClick={(e) => handleCompleteTask(contract.id, e)}
                        className="btn btn-primary btn-sm"
                      >
                        Complete
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}