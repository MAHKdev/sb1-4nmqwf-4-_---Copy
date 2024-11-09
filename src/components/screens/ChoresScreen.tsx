'use client';

import React, { useState } from 'react';
import { Plus, AlertTriangle } from 'lucide-react';
import { ChoresList } from '../chores/ChoresList';
import { PenaltiesList } from '../chores/PenaltiesList';
import { ChoreForm } from '../ChoreForm';
import { PenaltyForm } from '../PenaltyForm';
import { Modal } from '../ui/Modal';
import { useAppStore } from '../../store/useAppStore';

export function ChoresScreen() {
  const { contracts, penalties, addContract, updateContract, addPenalty, updatePenalty } = useAppStore();
  const [isAddingChore, setIsAddingChore] = useState(false);
  const [isAddingPenalty, setIsAddingPenalty] = useState(false);
  const [editingChore, setEditingChore] = useState<{
    index: number;
    data: any;
  } | null>(null);
  const [editingPenalty, setEditingPenalty] = useState<{
    index: number;
    data: any;
  } | null>(null);

  const handleAddChore = (data: any) => {
    addContract({
      ...data,
      customChore: true,
    });
    setIsAddingChore(false);
  };

  const handleEditChore = (data: any) => {
    if (editingChore === null) return;
    const contract = contracts[editingChore.index];
    updateContract(contract.id, {
      ...data,
      customChore: true,
    });
    setEditingChore(null);
  };

  const handleAddPenalty = (data: any) => {
    addPenalty(data);
    setIsAddingPenalty(false);
  };

  const handleEditPenalty = (data: any) => {
    if (editingPenalty === null) return;
    const penalty = penalties[editingPenalty.index];
    updatePenalty(penalty.id, data);
    setEditingPenalty(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Chores & Penalties</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsAddingPenalty(true)}
            className="btn btn-error btn-outline"
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            Add Penalty
          </button>
          <button
            onClick={() => setIsAddingChore(true)}
            className="btn btn-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Chore
          </button>
        </div>
      </div>

      <ChoresList
        contracts={contracts}
        onEdit={(index, contract) => setEditingChore({ index, data: contract })}
      />

      <PenaltiesList
        penalties={penalties}
        onEdit={(index, penalty) => setEditingPenalty({ index, data: penalty })}
      />

      <Modal
        isOpen={isAddingChore || editingChore !== null}
        onClose={() => {
          setIsAddingChore(false);
          setEditingChore(null);
        }}
      >
        <ChoreForm
          initialData={editingChore?.data}
          onSubmit={editingChore ? handleEditChore : handleAddChore}
          onClose={() => {
            setIsAddingChore(false);
            setEditingChore(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={isAddingPenalty || editingPenalty !== null}
        onClose={() => {
          setIsAddingPenalty(false);
          setEditingPenalty(null);
        }}
      >
        <PenaltyForm
          initialData={editingPenalty?.data}
          onSubmit={editingPenalty ? handleEditPenalty : handleAddPenalty}
          onClose={() => {
            setIsAddingPenalty(false);
            setEditingPenalty(null);
          }}
        />
      </Modal>
    </div>
  );
}