'use client';

import React from 'react';
import { Copy, Pencil } from 'lucide-react';
import { Contract } from '../../types';

interface ChoresListProps {
  contracts: Contract[];
  onEdit: (index: number, contract: Omit<Contract, 'id' | 'childId' | 'lastCompleted'>) => void;
}

export function ChoresList({ contracts = [], onEdit }: ChoresListProps) {
  if (!contracts) return null;

  const templateChores = contracts.filter(contract => !contract.customChore);
  const customChores = contracts.filter(contract => contract.customChore);

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Template Chores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templateChores.map((contract, index) => (
            <div key={contract.id} className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h4 className="card-title">{contract.task}</h4>
                <p className="text-sm opacity-70">
                  {contract.points} points • {contract.frequency}
                </p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => onEdit(index, {
                      task: contract.task,
                      points: contract.points,
                      frequency: contract.frequency,
                      customChore: true
                    })}
                    className="btn btn-ghost btn-sm"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {customChores.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Custom Chores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customChores.map((contract, index) => (
              <div key={contract.id} className="card bg-base-100 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title">{contract.task}</h4>
                  <p className="text-sm opacity-70">
                    {contract.points} points • {contract.frequency}
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      onClick={() => onEdit(index, {
                        task: contract.task,
                        points: contract.points,
                        frequency: contract.frequency,
                        customChore: true
                      })}
                      className="btn btn-ghost btn-sm"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}