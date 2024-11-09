import React, { useState } from 'react';
import { Plus, Copy, Pencil, AlertTriangle } from 'lucide-react';
import { contractTemplates } from '../data';
import { Contract, Penalty } from '../types';
import { ChoreForm } from '../components/ChoreForm';
import { PenaltyForm } from '../components/PenaltyForm';

type EditingItem = {
  type: 'chore' | 'penalty';
  index: number;
  data: any;
} | null;

export function ChoresScreen() {
  const [customChores, setCustomChores] = useState<Omit<Contract, 'id' | 'childId' | 'completed'>[]>([]);
  const [penalties, setPenalties] = useState<Omit<Penalty, 'id' | 'childId' | 'date'>[]>([
    { reason: 'Not cleaning toys', points: 10, frequency: 'daily' },
    { reason: 'Fighting with siblings', points: 15, frequency: 'weekly' },
  ]);
  const [isAddingChore, setIsAddingChore] = useState(false);
  const [isAddingPenalty, setIsAddingPenalty] = useState(false);
  const [editingItem, setEditingItem] = useState<EditingItem>(null);

  const handleAddChore = (data: Omit<Contract, 'id' | 'childId' | 'completed'>) => {
    setCustomChores(prev => [...prev, data]);
    setIsAddingChore(false);
  };

  const handleEditChore = (data: Omit<Contract, 'id' | 'childId' | 'completed'>) => {
    if (editingItem?.type !== 'chore') return;
    setCustomChores(prev => prev.map((chore, i) => 
      i === editingItem.index ? data : chore
    ));
    setEditingItem(null);
  };

  const handleAddPenalty = (data: Omit<Penalty, 'id' | 'childId' | 'date'>) => {
    setPenalties(prev => [...prev, data]);
    setIsAddingPenalty(false);
  };

  const handleEditPenalty = (data: Omit<Penalty, 'id' | 'childId' | 'date'>) => {
    if (editingItem?.type !== 'penalty') return;
    setPenalties(prev => prev.map((penalty, i) => 
      i === editingItem.index ? data : penalty
    ));
    setEditingItem(null);
  };

  const handleUseTemplate = (template: typeof contractTemplates[0]) => {
    setCustomChores(prev => [...prev, template]);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Chores & Penalties</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsAddingPenalty(true)}
            className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            Add Penalty
          </button>
          <button
            onClick={() => setIsAddingChore(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Chore
          </button>
        </div>
      </div>

      {isAddingChore && (
        <ChoreForm
          onSubmit={handleAddChore}
          onCancel={() => setIsAddingChore(false)}
        />
      )}

      {isAddingPenalty && (
        <PenaltyForm
          onSubmit={handleAddPenalty}
          onCancel={() => setIsAddingPenalty(false)}
        />
      )}

      {editingItem?.type === 'chore' && (
        <ChoreForm
          initialData={editingItem.data}
          onSubmit={handleEditChore}
          onCancel={() => setEditingItem(null)}
        />
      )}

      {editingItem?.type === 'penalty' && (
        <PenaltyForm
          initialData={editingItem.data}
          onSubmit={handleEditPenalty}
          onCancel={() => setEditingItem(null)}
        />
      )}

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Template Chores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contractTemplates.map((template, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">{template.task}</h4>
                <p className="text-sm text-gray-500">
                  {template.points} points • {template.frequency}
                </p>
              </div>
              <button
                onClick={() => handleUseTemplate(template)}
                className="p-2 text-gray-400 hover:text-indigo-600"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {customChores.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Custom Chores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customChores.map((chore, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">{chore.task}</h4>
                  <p className="text-sm text-gray-500">
                    {chore.points} points • {chore.frequency}
                  </p>
                </div>
                <button
                  onClick={() => setEditingItem({ type: 'chore', index, data: chore })}
                  className="p-2 text-gray-400 hover:text-indigo-600"
                >
                  <Pencil className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {penalties.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Penalties</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {penalties.map((penalty, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center border-l-4 border-red-400">
                <div>
                  <h4 className="font-medium text-gray-900">{penalty.reason}</h4>
                  <p className="text-sm text-red-500">
                    -{penalty.points} points
                  </p>
                </div>
                <button
                  onClick={() => setEditingItem({ type: 'penalty', index, data: penalty })}
                  className="p-2 text-gray-400 hover:text-indigo-600"
                >
                  <Pencil className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}