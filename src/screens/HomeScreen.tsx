import React, { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { ChildCard } from '../components/ChildCard';
import { ChildSelector } from '../components/ChildSelector';
import { useChild } from '../contexts/ChildContext';
import { contractTemplates } from '../data';
import { Contract, Penalty } from '../types';

export function HomeScreen() {
  const { activeChild, updateChildPoints } = useChild();
  const [contracts, setContracts] = useState<Contract[]>([
    { id: '1', childId: '1', ...contractTemplates[0], completed: false },
    { id: '2', childId: '1', ...contractTemplates[1], completed: false },
    { id: '3', childId: '2', ...contractTemplates[2], completed: false },
  ]);
  const [penalties] = useState<Penalty[]>([
    { id: '1', childId: '1', reason: 'Not cleaning toys', points: 10, date: '2024-03-10', frequency: 'daily' },
  ]);

  const handleCompleteTask = (contractId: string) => {
    const contract = contracts.find(c => c.id === contractId);
    if (!contract || !activeChild) return;

    setContracts(prev =>
      prev.map(c => c.id === contractId ? { ...c, completed: true } : c)
    );

    updateChildPoints(activeChild.id, contract.points);
  };

  if (!activeChild) return null;

  return (
    <div className="space-y-8">
      <ChildSelector />

      <div className="flex justify-between items-center">
        <Link
          href="/chores"
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Settings className="w-5 h-5 mr-2" />
          Manage Chores
        </Link>

        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Child
        </button>
      </div>

      <ChildCard />
    </div>
  );
}