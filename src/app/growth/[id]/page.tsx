'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useChild } from '../../../contexts/ChildContext';
import { GrowthChart } from '../../../components/GrowthChart';
import { HeightScale } from '../../../components/HeightScale';
import { GrowthEntry } from '../../../types';

export default function GrowthPage() {
  const { id } = useParams();
  const { children, updateChildGrowth } = useChild();
  const child = children.find(c => c.id === String(id));
  
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<GrowthEntry>>({
    date: new Date().toISOString().split('T')[0],
    height: 0,
    weight: 0
  });

  if (!child) return null;

  const maxHeight = Math.max(...child.growthData.map(d => d.height)) + 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.date || !newEntry.height || !newEntry.weight) return;

    const entry: GrowthEntry = {
      id: Date.now().toString(),
      date: newEntry.date,
      height: newEntry.height,
      weight: newEntry.weight
    };

    updateChildGrowth(child.id, entry);
    setIsAddingEntry(false);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      height: 0,
      weight: 0
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{child.name}'s Growth Chart</h1>
        <button
          className="btn btn-primary"
          onClick={() => setIsAddingEntry(true)}
        >
          Add New Entry
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GrowthChart data={child.growthData} />
        <HeightScale entries={child.growthData} maxHeight={maxHeight} />
      </div>

      {isAddingEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-base-100 p-6 rounded-box max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Add Growth Entry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={newEntry.date}
                  onChange={e => setNewEntry(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Height (cm)</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={newEntry.height || ''}
                  onChange={e => setNewEntry(prev => ({ ...prev, height: Number(e.target.value) }))}
                  required
                  min="1"
                  step="0.1"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Weight (kg)</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={newEntry.weight || ''}
                  onChange={e => setNewEntry(prev => ({ ...prev, weight: Number(e.target.value) }))}
                  required
                  min="1"
                  step="0.1"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsAddingEntry(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}