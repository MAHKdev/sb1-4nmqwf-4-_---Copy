'use client';

import React from 'react';
import { Pencil } from 'lucide-react';
import { Penalty } from '../../types';

interface PenaltiesListProps {
  penalties: Penalty[];
  onEdit: (index: number, penalty: Omit<Penalty, 'id' | 'childId' | 'lastTriggered'>) => void;
}

export function PenaltiesList({ penalties = [], onEdit }: PenaltiesListProps) {
  if (!penalties?.length) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Penalties</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {penalties.map((penalty, index) => (
          <div key={penalty.id} className="card bg-base-100 shadow-sm border-l-4 border-error">
            <div className="card-body">
              <h4 className="card-title">{penalty.reason}</h4>
              <p className="text-sm text-error">
                -{penalty.points} points • {penalty.frequency}
              </p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => onEdit(index, {
                    reason: penalty.reason,
                    points: penalty.points,
                    frequency: penalty.frequency
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
  );
}